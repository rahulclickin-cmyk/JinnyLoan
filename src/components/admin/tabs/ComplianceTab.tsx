import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  Activity, 
  Clock, 
  Search, 
  UserCheck, 
  Key,
  Shield
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ip: string;
  status: 'success' | 'warning' | 'info';
}

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-4091',
    timestamp: '2026-10-16 10:48:12',
    user: 'Super Admin (SA)',
    action: 'Partner URL Update',
    details: 'Modified target redirection URL for HDFC Bank Personal Loan',
    ip: '103.212.145.88',
    status: 'success'
  },
  {
    id: 'LOG-4090',
    timestamp: '2026-10-16 09:32:05',
    user: 'Admin Desk',
    action: 'Lead Status Changed',
    details: 'Updated lead #JL-9810 status to Bank Sanctioned',
    ip: '103.212.145.88',
    status: 'success'
  },
  {
    id: 'LOG-4089',
    timestamp: '2026-10-16 08:15:40',
    user: 'Underwriter-02',
    action: 'KYC Document Verified',
    details: 'Completed PAN & Aadhaar OCR validation for Ramesh Chandra',
    ip: '182.74.12.19',
    status: 'success'
  },
  {
    id: 'LOG-4088',
    timestamp: '2026-10-15 19:40:22',
    user: 'System Bot',
    action: 'Leads CSV Export',
    details: 'Exported pipeline data (42 records) to secure encrypted CSV',
    ip: '127.0.0.1 (Internal)',
    status: 'info'
  },
  {
    id: 'LOG-4087',
    timestamp: '2026-10-15 14:10:09',
    user: 'Super Admin (SA)',
    action: 'Admin Authentication',
    details: 'Successful secure passcode sign-in to Enterprise CMS',
    ip: '103.212.145.88',
    status: 'success'
  }
];

export const ComplianceTab: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(l => 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Security, RBI Governance & Audit Trail
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white">
              100% Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time compliance monitoring under RBI Digital Lending Guidelines, DPDP Act 2023, and immutable system audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL/TLS Active</span>
          </div>
        </div>
      </div>

      {/* RBI COMPLIANCE CHECKLIST */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#E81E76]" />
          <span>RBI Digital Lending Guidelines (DLG) Compliance Status</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Direct Borrower-Bank Redirection (Rule 6 & 8)</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                All loan disbursement and repayments flow directly through borrower bank accounts with zero intermediary pool accounts.
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Zero Advance Fee Policy (Fair Practice)</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                JinnyLoan strictly never demands upfront fees, insurance premiums, or file charges prior to lender sanction.
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Key Fact Statement (KFS) Transparency</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Complete APR (Annual Percentage Rate), processing fee matrices, and foreclosure schedules clearly shown prior to apply.
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">DPDP Act 2023 Explicit Consent Capture</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Every application records explicit borrower consent checkbox, timestamp, and IP address for audit verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Administrative Audit Log & Access Trail
            </h3>
            <p className="text-xs text-slate-500">
              Immutable ledger tracking all operator logins, rate updates, status revisions, and export events.
            </p>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Log ID & Timestamp</th>
                <th className="p-3">User / Identity</th>
                <th className="p-3">Action Performed</th>
                <th className="p-3">Details / Description</th>
                <th className="p-3">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="p-3">
                    <span className="font-mono text-[10px] text-slate-500 font-bold block mb-0.5">
                      {log.id}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono">
                      {log.timestamp}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="font-bold text-slate-800">{log.user}</span>
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3 max-w-[320px]">
                    <p className="text-slate-700 leading-snug">{log.details}</p>
                  </td>

                  <td className="p-3 font-mono text-[11px] text-slate-500">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
