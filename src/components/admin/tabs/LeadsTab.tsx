import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  Plus, 
  MessageSquare, 
  Phone, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MapPin,
  ChevronRight,
  Trash2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { StoredLead } from '../../../server/leadDatabase';

interface LeadsTabProps {
  leads: StoredLead[];
  onUpdateStatus: (leadId: string, status: StoredLead['status']) => void;
  onOpenAddLead: () => void;
  onExportCSV: () => void;
  onSelectLead: (lead: StoredLead) => void;
  isLoading: boolean;
}

export const LeadsTab: React.FC<LeadsTabProps> = ({
  leads,
  onUpdateStatus,
  onOpenAddLead,
  onExportCSV,
  onSelectLead,
  isLoading
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [minAmountFilter, setMinAmountFilter] = useState<string>('all');

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        !searchTerm ||
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesType = typeFilter === 'all' || lead.leadType === typeFilter;

      let matchesAmount = true;
      if (minAmountFilter === '5l') {
        matchesAmount = (lead.loanAmount || 0) >= 500000;
      } else if (minAmountFilter === '15l') {
        matchesAmount = (lead.loanAmount || 0) >= 1500000;
      } else if (minAmountFilter === '50l') {
        matchesAmount = (lead.loanAmount || 0) >= 5000000;
      }

      return matchesSearch && matchesStatus && matchesType && matchesAmount;
    });
  }, [leads, searchTerm, statusFilter, typeFilter, minAmountFilter]);

  const pipelineCounts = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      in_review: leads.filter(l => l.status === 'in_review').length,
      approved: leads.filter(l => l.status === 'approved').length,
      rejected: leads.filter(l => l.status === 'rejected').length,
    };
  }, [leads]);

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Header with Title & Quick Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              Leads & Pipeline CRM Desk
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              {leads.length} Active Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time pipeline tracking, credit qualification, direct borrower communications & status transitions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddLead}
            className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lead</span>
          </button>
          <button
            onClick={onExportCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* PIPELINE STAGE PILL TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>All Stages</span>
          <span className="text-[10px] bg-slate-700 text-white px-1.5 py-0.2 rounded-full">
            {pipelineCounts.all}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('new')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'new'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <span>🟡 New Leads</span>
          <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.2 rounded-full">
            {pipelineCounts.new}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('contacted')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'contacted'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-purple-800 hover:bg-purple-50 border border-purple-200'
          }`}
        >
          <span>🟣 Contacted</span>
          <span className="text-[10px] bg-purple-700 text-white px-1.5 py-0.2 rounded-full">
            {pipelineCounts.contacted}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('in_review')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'in_review'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-blue-800 hover:bg-blue-50 border border-blue-200'
          }`}
        >
          <span>🔵 In Review / Verification</span>
          <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.2 rounded-full">
            {pipelineCounts.in_review}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('approved')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'approved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          <span>🟢 Bank Sanctioned</span>
          <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded-full">
            {pipelineCounts.approved}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('rejected')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            statusFilter === 'rejected'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-rose-800 hover:bg-rose-50 border border-rose-200'
          }`}
        >
          <span>🔴 Rejected / Ineligible</span>
          <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded-full">
            {pipelineCounts.rejected}
          </span>
        </button>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, 10-digit mobile, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Loan Products</option>
            <option value="general-loan">Personal Loan</option>
            <option value="home-loan">Home Loan</option>
            <option value="loan-against-property">Loan Against Property</option>
            <option value="partner-inquiry">DSA Referral Partner</option>
          </select>

          <select
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">Any Amount</option>
            <option value="5l">₹5 Lakhs+</option>
            <option value="15l">₹15 Lakhs+</option>
            <option value="50l">₹50 Lakhs+ (HNI)</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Applicant Profile</th>
                <th className="p-3">Contact & City</th>
                <th className="p-3">Loan Amount</th>
                <th className="p-3">Employment / Income</th>
                <th className="p-3">Stage Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No loan applications match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{lead.name}</p>
                      <p className="text-[10px] text-slate-500 capitalize">
                        {(lead.leadType || 'general-loan').replace(/-/g, ' ')}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{lead.phone}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[140px]">
                        {lead.email}
                      </p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{lead.city || 'Delhi NCR'}</span>
                      </p>
                    </td>

                    <td className="p-3">
                      <p className="font-black text-[#E81E76] text-sm font-['Outfit',sans-serif]">
                        ₹{(lead.loanAmount || 0).toLocaleString('en-IN')}
                      </p>
                      <span className="text-[9px] font-bold text-slate-400">Estimated</span>
                    </td>

                    <td className="p-3">
                      <p className="font-semibold text-slate-800">
                        {lead.employmentType || 'Salaried'}
                      </p>
                      {lead.income && (
                        <p className="text-[10px] text-slate-500">
                          ₹{lead.income}/mo
                        </p>
                      )}
                    </td>

                    <td className="p-3">
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          lead.status === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          lead.status === 'in_review' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          lead.status === 'contacted' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                          lead.status === 'rejected' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                          'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="new">🟡 New Lead</option>
                        <option value="contacted">🟣 Contacted</option>
                        <option value="in_review">🔵 In Review</option>
                        <option value="approved">🟢 Sanctioned</option>
                        <option value="rejected">🔴 Rejected</option>
                      </select>
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/91${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)},%20we%20have%20received%20your%20loan%20inquiry%20on%20JinnyLoan%20for%20%E2%82%B9${lead.loanAmount || 500000}.%20Can%20we%20proceed%20with%20your%20best%20bank%20offer?`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Direct Call"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => onSelectLead(lead)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          View Full Dossier
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
