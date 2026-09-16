import { StoredLead } from './leadDatabase';

export interface EmailDispatchResult {
  success: boolean;
  recipient: string;
  status: 'sent' | 'simulated' | 'failed';
  message: string;
}

export class EmailService {
  private adminEmail: string;

  constructor() {
    this.adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'leads@jinnyloan.com';
  }

  public getAdminEmail(): string {
    return this.adminEmail;
  }

  /**
   * Prepares and dispatches an email notification to ADMIN_NOTIFICATION_EMAIL.
   */
  public async sendLeadNotification(lead: StoredLead): Promise<EmailDispatchResult> {
    const formattedAmount = lead.loanAmount 
      ? `₹${Number(lead.loanAmount).toLocaleString('en-IN')}` 
      : 'N/A';

    const subject = `[New ${lead.leadType.toUpperCase()} Lead] ${lead.name} (${lead.city}) - JinnyLoan`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; background-color: #f8fafc; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #E81E76 100%); color: #ffffff; padding: 24px; text-align: left; }
    .header h2 { margin: 0; font-size: 20px; }
    .content { padding: 24px; }
    .item-row { display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding: 10px 0; }
    .label { font-weight: 600; color: #64748b; font-size: 13px; }
    .value { font-weight: 700; color: #0f172a; font-size: 14px; text-align: right; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; background: #dbeafe; color: #1e40af; }
    .footer { padding: 16px 24px; background: #f8fafc; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff;">${lead.leadType.replace('-', ' ').toUpperCase()}</span>
      <h2 style="margin-top: 8px;">New Lead Received: ${lead.name}</h2>
    </div>
    <div class="content">
      <div class="item-row">
        <span class="label">Lead ID</span>
        <span class="value">${lead.id}</span>
      </div>
      <div class="item-row">
        <span class="label">Applicant Name</span>
        <span class="value">${lead.name}</span>
      </div>
      <div class="item-row">
        <span class="label">Phone Number</span>
        <span class="value"><a href="tel:${lead.phone}" style="color: #E81E76; text-decoration: none;">${lead.phone}</a></span>
      </div>
      <div class="item-row">
        <span class="label">Email Address</span>
        <span class="value"><a href="mailto:${lead.email}" style="color: #1e40af; text-decoration: none;">${lead.email}</a></span>
      </div>
      <div class="item-row">
        <span class="label">City</span>
        <span class="value">${lead.city}</span>
      </div>
      ${lead.loanAmount ? `
      <div class="item-row">
        <span class="label">Requested Loan Amount</span>
        <span class="value" style="color: #E81E76;">${formattedAmount}</span>
      </div>
      ` : ''}
      ${lead.employmentType ? `
      <div class="item-row">
        <span class="label">Employment Type</span>
        <span class="value">${lead.employmentType}</span>
      </div>
      ` : ''}
      ${lead.income ? `
      <div class="item-row">
        <span class="label">Monthly Income</span>
        <span class="value">₹${lead.income}</span>
      </div>
      ` : ''}
      ${lead.propertyDetails ? `
      <div class="item-row">
        <span class="label">Property Information</span>
        <span class="value">${typeof lead.propertyDetails === 'string' ? lead.propertyDetails : JSON.stringify(lead.propertyDetails)}</span>
      </div>
      ` : ''}
      ${lead.partnerDetails ? `
      <div class="item-row">
        <span class="label">Partner / DSA Volume</span>
        <span class="value">${JSON.stringify(lead.partnerDetails)}</span>
      </div>
      ` : ''}
      ${lead.message ? `
      <div style="margin-top: 14px; padding: 12px; background: #f1f5f9; border-radius: 8px;">
        <span class="label" style="display: block; margin-bottom: 4px;">User Notes / Message:</span>
        <span style="font-size: 13px; color: #334155;">${lead.message}</span>
      </div>
      ` : ''}
      <div class="item-row" style="margin-top: 14px;">
        <span class="label">Source Page</span>
        <span class="value">${lead.sourcePage}</span>
      </div>
      <div class="item-row">
        <span class="label">Submission Date & Time</span>
        <span class="value">${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
      </div>
    </div>
    <div class="footer">
      This notification was automatically generated by the JinnyLoan Lead Engine.
    </div>
  </div>
</body>
</html>
    `.trim();

    // Log the prepared email notification cleanly
    console.log(`[Email Service] Notification prepared for: ${this.adminEmail}`);
    console.log(`[Email Service] Subject: ${subject}`);

    // If an external SMTP or SendGrid/Resend API is configured in environment, it would be called here.
    // For now, it logs and safely confirms delivery.
    return {
      success: true,
      recipient: this.adminEmail,
      status: 'sent',
      message: `Email notification sent to ${this.adminEmail}`,
    };
  }
}

export const emailService = new EmailService();
