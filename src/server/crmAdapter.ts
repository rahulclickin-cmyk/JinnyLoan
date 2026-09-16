import { StoredLead } from './leadDatabase';

export interface CrmDispatchResult {
  success: boolean;
  status: 'sent' | 'not_configured' | 'failed';
  message: string;
  response?: any;
}

export class CrmAdapter {
  private apiUrl: string | undefined;
  private apiKey: string | undefined;
  private apiSecret: string | undefined;

  constructor() {
    this.apiUrl = process.env.CRM_API_URL;
    this.apiKey = process.env.CRM_API_KEY;
    this.apiSecret = process.env.CRM_API_SECRET;
  }

  public isConfigured(): boolean {
    return Boolean(this.apiUrl && this.apiUrl.trim().length > 0);
  }

  public getConfigurationInfo() {
    return {
      isConfigured: this.isConfigured(),
      apiUrl: this.apiUrl ? `${this.apiUrl.substring(0, 15)}...` : 'Not Configured',
      hasApiKey: Boolean(this.apiKey),
      hasApiSecret: Boolean(this.apiSecret),
    };
  }

  /**
   * Dispatches a standardized lead payload to the client's configured CRM endpoint.
   * If the CRM URL is not yet configured, gracefully marks as ready without throwing.
   */
  public async dispatchLead(lead: StoredLead): Promise<CrmDispatchResult> {
    if (!this.isConfigured()) {
      console.log(`[CRM Adapter] CRM_API_URL not configured. Lead ${lead.id} queued as 'ready_for_crm'.`);
      return {
        success: true,
        status: 'not_configured',
        message: 'CRM integration is pending client CRM credentials. Lead stored in secure database.',
      };
    }

    try {
      const payload = {
        event: 'new_lead_received',
        leadId: lead.id,
        leadType: lead.leadType,
        source: 'JinnyLoan Web Portal',
        sourcePage: lead.sourcePage,
        contact: {
          fullName: lead.name,
          phone: lead.phone,
          email: lead.email,
          city: lead.city,
        },
        financialRequirements: {
          loanAmount: lead.loanAmount,
          employmentType: lead.employmentType,
          monthlyIncome: lead.income,
          propertyDetails: lead.propertyDetails,
          partnerDetails: lead.partnerDetails,
        },
        notes: lead.message,
        createdAt: lead.createdAt,
        systemMetadata: {
          platform: 'JinnyLoan Enterprise Node Server',
          version: '2.0.0',
        },
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'JinnyLoan-CRM-Adapter/2.0',
      };

      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
        headers['X-API-Key'] = this.apiKey;
      }

      if (this.apiSecret) {
        headers['X-Client-Secret'] = this.apiSecret;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(this.apiUrl!, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text().catch(() => 'No response body');
        console.warn(`[CRM Adapter] CRM responded with HTTP ${res.status}: ${errorText}`);
        return {
          success: false,
          status: 'failed',
          message: `CRM responded with status ${res.status}`,
          response: errorText,
        };
      }

      const responseData = await res.json().catch(() => ({ status: 'ok' }));
      console.log(`[CRM Adapter] Lead ${lead.id} successfully synchronized with client CRM.`);

      return {
        success: true,
        status: 'sent',
        message: 'Synchronized with client CRM successfully.',
        response: responseData,
      };
    } catch (err: any) {
      console.error(`[CRM Adapter] Network error dispatching lead ${lead.id}:`, err?.message || err);
      return {
        success: false,
        status: 'failed',
        message: err?.message || 'Network error communicating with CRM',
      };
    }
  }
}

export const crmAdapter = new CrmAdapter();
