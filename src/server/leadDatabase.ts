import fs from 'fs';
import path from 'path';

export interface StoredLead {
  id: string;
  leadType: 'home-loan' | 'loan-against-property' | 'partner-inquiry' | 'general-loan';
  name: string;
  phone: string;
  email: string;
  city: string;
  loanAmount?: number;
  employmentType?: string;
  income?: string;
  propertyDetails?: {
    identified?: string;
    type?: string;
    estimatedValue?: number;
    location?: string;
  } | string;
  partnerDetails?: {
    partnerType?: string;
    monthlyVolume?: string;
    firmName?: string;
  };
  message?: string;
  sourcePage: string;
  status: 'new' | 'contacted' | 'in_review' | 'approved' | 'rejected';
  crmStatus: 'pending' | 'sent' | 'failed' | 'not_configured';
  crmResponse?: string;
  emailStatus: 'sent' | 'pending' | 'failed' | 'simulated';
  whatsappStatus?: 'pending' | 'queued' | 'not_configured';
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

export function getLeads(): StoredLead[] {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

export function saveLead(leadData: Omit<StoredLead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { id?: string }): StoredLead {
  ensureDataDir();
  const leads = getLeads();

  const id = leadData.id || `LEAD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const newLead: StoredLead = {
    ...leadData,
    id,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };

  leads.unshift(newLead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  return newLead;
}

export function updateLead(id: string, updates: Partial<StoredLead>): StoredLead | null {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
  return leads[index];
}
