import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { saveLead, getLeads, updateLead, StoredLead } from './src/server/leadDatabase';
import { crmAdapter } from './src/server/crmAdapter';
import { emailService } from './src/server/emailService';
import { automationQueue } from './src/server/automationQueue';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  app.use(express.json({ limit: '2mb' }));

  // In-memory rate limiter for lead submissions
  const ipRateMap = new Map<string, { count: number; resetTime: number }>();
  const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
  const RATE_LIMIT_MAX_REQUESTS = 15; // Max 15 submissions per minute per IP

  function rateLimiter(req: Request, res: Response, next: () => void) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const clientData = ipRateMap.get(ip);

    if (!clientData || now > clientData.resetTime) {
      ipRateMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      return next();
    }

    if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
      return res.status(429).json({
        error: 'Too many submissions. Please wait a minute before trying again.',
      });
    }

    clientData.count++;
    next();
  }

  // Sanitization helper
  function sanitizeInput(str: any): string {
    if (typeof str !== 'string') return '';
    return str
      .trim()
      .replace(/[<>]/g, '') // strip < and >
      .substring(0, 1000);
  }

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'JinnyLoan API & Lead Engine',
      timestamp: new Date().toISOString(),
    });
  });

  // 2. CRM Configuration status check (never exposes secrets)
  app.get('/api/crm/status', (req, res) => {
    res.json({
      ...crmAdapter.getConfigurationInfo(),
      adminEmail: emailService.getAdminEmail(),
    });
  });

  // 3. Lead Submission Route (Protected with Rate Limiter & Input Validation)
  app.post('/api/leads', rateLimiter, async (req: Request, res: Response) => {
    try {
      const {
        leadType,
        name,
        phone,
        email,
        city,
        loanAmount,
        employmentType,
        income,
        propertyDetails,
        partnerDetails,
        message,
        sourcePage,
      } = req.body;

      // Validate required core fields
      const cleanName = sanitizeInput(name);
      const cleanPhone = sanitizeInput(phone).replace(/\D/g, ''); // Extract digits
      const cleanEmail = sanitizeInput(email).toLowerCase();
      const cleanCity = sanitizeInput(city) || 'Delhi NCR';
      const cleanLeadType = sanitizeInput(leadType) || 'general-loan';
      const cleanSource = sanitizeInput(sourcePage) || '/';
      const cleanMessage = sanitizeInput(message);

      if (!cleanName || cleanName.length < 2) {
        return res.status(400).json({ error: 'Please provide a valid full name (at least 2 characters).' });
      }

      if (!cleanPhone || cleanPhone.length < 10) {
        return res.status(400).json({ error: 'Please provide a valid 10-digit mobile phone number.' });
      }

      // Basic email regex test
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (cleanEmail && !emailRegex.test(cleanEmail)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      // Capture client IP and User-Agent
      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
      const userAgent = sanitizeInput(req.headers['user-agent']);

      // 1. Save Lead into Lead Database
      const savedLead = saveLead({
        leadType: cleanLeadType as any,
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        city: cleanCity,
        loanAmount: Number(loanAmount) || undefined,
        employmentType: sanitizeInput(employmentType),
        income: sanitizeInput(income),
        propertyDetails: propertyDetails || undefined,
        partnerDetails: partnerDetails || undefined,
        message: cleanMessage,
        sourcePage: cleanSource,
        crmStatus: 'pending',
        emailStatus: 'pending',
        ipAddress: clientIp,
        userAgent,
      });

      // 2. Dispatch to CRM Adapter asynchronously
      crmAdapter.dispatchLead(savedLead).then(crmRes => {
        updateLead(savedLead.id, {
          crmStatus: crmRes.status,
          crmResponse: typeof crmRes.response === 'string' ? crmRes.response : JSON.stringify(crmRes.response),
        });
      }).catch(err => {
        console.error('Asynchronous CRM dispatch failed:', err);
      });

      // 3. Dispatch Email Notification asynchronously
      emailService.sendLeadNotification(savedLead).then(emailRes => {
        updateLead(savedLead.id, {
          emailStatus: emailRes.status,
        });
      }).catch(err => {
        console.error('Asynchronous Email dispatch failed:', err);
      });

      // 4. Queue for Future WhatsApp / AI Agent follow-up
      automationQueue.queueLeadAutomation(savedLead).then(autoRes => {
        updateLead(savedLead.id, {
          whatsappStatus: autoRes.status as any,
        });
      }).catch(err => {
        console.error('Automation queue error:', err);
      });

      return res.status(201).json({
        success: true,
        referenceId: savedLead.id,
        leadType: savedLead.leadType,
        message: 'Application received successfully. Our dedicated advisor will connect with you shortly.',
      });
    } catch (err: any) {
      console.error('Error saving lead:', err);
      return res.status(500).json({
        error: 'An error occurred while processing your application. Please try again or reach out on WhatsApp.',
      });
    }
  });

  // 4. GET Leads (for Admin Panel)
  app.get('/api/leads', (req, res) => {
    const leads = getLeads();
    res.json({
      count: leads.length,
      leads,
    });
  });

  // 5. Update Lead Status
  app.patch('/api/leads/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const updated = updateLead(id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, lead: updated });
  });

  // 6. Vite Middleware Integration (Dev vs Prod)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JinnyLoan Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
