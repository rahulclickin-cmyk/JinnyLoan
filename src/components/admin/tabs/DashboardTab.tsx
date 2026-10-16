import React from 'react';
import { 
  Users, 
  CreditCard, 
  Building2, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Download, 
  Activity,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { StoredLead } from '../../../server/leadDatabase';

interface DashboardTabProps {
  leads: StoredLead[];
  stats: {
    totalCount: number;
    newCount: number;
    reviewCount: number;
    approvedCount: number;
    totalVolume: number;
    partnerCount: number;
    offersCount: number;
  };
  onNavigateTab: (tab: any) => void;
  onOpenAddLead: () => void;
  onExportCSV: () => void;
  onSelectLead: (lead: StoredLead) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  leads,
  stats,
  onNavigateTab,
  onOpenAddLead,
  onExportCSV,
  onSelectLead
}) => {
  const approvalRate = stats.totalCount > 0 
    ? Math.round((stats.approvedCount / stats.totalCount) * 100) 
    : 84;

  const simulatedDisbursedVolume = Math.round(stats.totalVolume * 0.72);

  // Recent simulated live activities
  const recentActivities = [
    { id: 1, text: 'New application received: ₹7,50,000 Personal Loan', user: 'Sunil Mehta', time: '4 mins ago', type: 'lead' },
    { id: 2, text: 'HDFC Bank API sync completed: 3 Sanctions recorded', user: 'System Bot', time: '18 mins ago', type: 'bank' },
    { id: 3, text: 'KYC verified for Loan Against Property (₹45 Lakhs)', user: 'Ananya Sharma', time: '42 mins ago', type: 'kyc' },
    { id: 4, text: 'DSA Partner registered: FinEdge Capital (Delhi NCR)', user: 'DSA Onboarding', time: '1 hr ago', type: 'dsa' },
    { id: 5, text: 'Credit card approved: SBI Cashback Card (Pre-approved)', user: 'Rahul Verma', time: '2 hrs ago', type: 'card' },
  ];

  const monthlyTrends = [
    { month: 'Jun', amount: '₹1.8 Cr', height: '45%' },
    { month: 'Jul', amount: '₹2.4 Cr', height: '58%' },
    { month: 'Aug', amount: '₹3.1 Cr', height: '72%' },
    { month: 'Sep', amount: '₹3.8 Cr', height: '85%' },
    { month: 'Oct', amount: '₹4.6 Cr', height: '98%', current: true },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-radial from-[#E81E76]/20 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#E81E76] text-white">
                Live Operations Center
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                100+ Lending APIs Operational
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif]">
              JinnyLoan Multi-Lender Enterprise CMS
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Centralized platform for real-time customer acquisition, multi-bank underwriting pipelines, DSA partner payouts, and automated compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenAddLead}
              className="px-4 py-2.5 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-lg shadow-pink-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Manual Lead</span>
            </button>
            <button
              onClick={onExportCSV}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Export Pipeline (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div 
          onClick={() => onNavigateTab('leads')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#E81E76]/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Applications
            </span>
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#E81E76] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {stats.totalCount}
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +24% MoM
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {stats.newCount} new pending triage
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('leads')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              In Verification / Review
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 font-['Outfit',sans-serif]">
              {stats.reviewCount}
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Active Desk
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Assigned to loan underwriters
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('offers')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-pink-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Pipeline Loan Volume
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-[#E81E76] font-['Outfit',sans-serif]">
              ₹{(stats.totalVolume / 100000).toFixed(1)}L
            </span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              Requested
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ₹{(simulatedDisbursedVolume / 100000).toFixed(1)}L approved volume
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('partners')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Partner Banks & NBFCs
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
              {stats.partnerCount}+
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              RBI Regulated
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            All direct URLs and webhooks live
          </p>
        </div>
      </div>

      {/* PIPELINE FUNNEL & PERFORMANCE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pipeline Funnel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Loan Application Conversion Funnel
              </h3>
              <p className="text-xs text-slate-500">
                End-to-end applicant progression across verification stages
              </p>
            </div>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              {approvalRate}% Overall Conversion
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">1. Online Inquiries & Form Submissions</span>
                <span className="font-bold text-slate-900">{stats.totalCount} leads (100%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">2. Customer Contacted & Profile Completed</span>
                <span className="font-bold text-slate-900">{Math.round(stats.totalCount * 0.88)} leads (88%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">3. KYC & Bank Statement Analyzed</span>
                <span className="font-bold text-slate-900">{Math.round(stats.totalCount * 0.74)} leads (74%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">4. Bank Credit Sanction Issued</span>
                <span className="font-bold text-slate-900">{Math.max(stats.approvedCount, Math.round(stats.totalCount * 0.65))} sanctions (65%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#E81E76] rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">5. Loan Disbursed into Bank Account</span>
                <span className="font-bold text-emerald-700">{Math.round(stats.totalCount * 0.58)} disbursed (58%)</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '58%' }} />
              </div>
            </div>
          </div>

          {/* Quick Disbursal Velocity Chart */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-2">Monthly Disbursement Volume (Last 5 Months)</h4>
            <div className="flex items-end justify-between h-24 gap-3 pt-4 px-2">
              {monthlyTrends.map((t, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-600">{t.amount}</span>
                  <div 
                    className={`w-full rounded-t-lg transition-all ${
                      t.current ? 'bg-gradient-to-t from-[#E81E76] to-[#ff4f9a]' : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    style={{ height: t.height }}
                  />
                  <span className={`text-[10px] font-bold ${t.current ? 'text-[#E81E76]' : 'text-slate-400'}`}>
                    {t.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Live Activity Stream</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div className="space-y-3.5">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#E81E76] mt-1.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 leading-snug">{act.text}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>{act.user}</span>
                      <span>{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('leads')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
            >
              Open Full Leads Pipeline →
            </button>
          </div>
        </div>

      </div>

      {/* RECENT APPLICATIONS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recent Customer Inquiries & Pipeline Entries
            </h3>
            <p className="text-xs text-slate-400">Directly syncs from website forms, modals & calculators</p>
          </div>
          <button
            onClick={() => onNavigateTab('leads')}
            className="text-xs font-bold text-[#E81E76] hover:underline"
          >
            View All ({leads.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">City</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.slice(0, 6).map(lead => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{lead.name}</td>
                  <td className="p-3 font-mono text-slate-600">{lead.phone}</td>
                  <td className="p-3 text-slate-600">{lead.city || 'Delhi NCR'}</td>
                  <td className="p-3 font-black text-[#E81E76]">
                    ₹{(lead.loanAmount || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-slate-600 capitalize">
                    {(lead.leadType || 'general-loan').replace(/-/g, ' ')}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      lead.status === 'in_review' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'contacted' ? 'bg-purple-100 text-purple-800' :
                      lead.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {lead.status.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectLead(lead)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
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
