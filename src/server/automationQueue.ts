import { StoredLead } from './leadDatabase';

export interface AutomationTask {
  id: string;
  leadId: string;
  channel: 'whatsapp' | 'ai_agent' | 'sms';
  status: 'queued' | 'dispatched' | 'pending_integration';
  payload: Record<string, any>;
  scheduledAt: string;
}

export type AutomationHook = (lead: StoredLead) => Promise<void>;

/**
 * Future-ready hook and dispatcher layer for WhatsApp Business API and AI Agent auto-followups.
 */
class AutomationQueueService {
  private hooks: AutomationHook[] = [];
  private whatsappWebhookUrl: string | undefined;

  constructor() {
    this.whatsappWebhookUrl = process.env.WHATSAPP_API_URL;
  }

  /**
   * Register future AI / WhatsApp automation handler
   */
  public registerHook(hook: AutomationHook) {
    this.hooks.push(hook);
  }

  /**
   * Called when a lead is captured. Prepares data for WhatsApp / AI follow-up.
   */
  public async queueLeadAutomation(lead: StoredLead): Promise<{ status: string; channel: string }> {
    console.log(`[Automation Queue] Lead ${lead.id} queued for WhatsApp/AI follow-up pipeline.`);

    // Execute registered hooks if any are attached
    for (const hook of this.hooks) {
      try {
        await hook(lead);
      } catch (err) {
        console.error('[Automation Queue] Hook execution error:', err);
      }
    }

    // If external WhatsApp Webhook is provided in environment:
    if (this.whatsappWebhookUrl) {
      try {
        fetch(this.whatsappWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'lead.created',
            phone: lead.phone,
            name: lead.name,
            leadType: lead.leadType,
            amount: lead.loanAmount,
            message: `Hi ${lead.name}, thank you for choosing JinnyLoan for your ${lead.leadType.replace('-', ' ')}. Our credit specialist is reviewing your file.`,
          }),
        }).catch(e => console.warn('[Automation Queue] WhatsApp trigger warning:', e.message));
        
        return { status: 'queued_webhook', channel: 'whatsapp' };
      } catch (e) {
        // Safe fallback
      }
    }

    return {
      status: 'ready_for_automation',
      channel: 'whatsapp_and_ai_agent',
    };
  }
}

export const automationQueue = new AutomationQueueService();
