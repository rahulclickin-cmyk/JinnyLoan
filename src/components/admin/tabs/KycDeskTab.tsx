import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Eye, 
  Download, 
  FileText, 
  Lock,
  Sparkles,
  Check,
  X
} from 'lucide-react';

interface KycRecord {
  id: string;
  applicant: string;
  mobile: string;
  loanType: string;
  amount: string;
  panStatus: 'verified' | 'pending' | 'mismatch';
  aadhaarStatus: 'verified' | 'pending';
  bankStatement: 'analyzed' | 'pending' | 'upload_required';
  cibilScore: number;
  overallStatus: 'approved' | 'in_review' | 'rejected' | 'reupload_needed';
}

const INITIAL_KYC_RECORDS: KycRecord[] = [
  {
    id: 'KYC-801',
    applicant: 'Ramesh Chandra',
    mobile: '9810123456',
    loanType: 'Personal Loan',
    amount: '₹5,00,000',
    panStatus: 'verified',
    aadhaarStatus: 'verified',
    bankStatement: 'analyzed',
    cibilScore: 782,
    overallStatus: 'approved'
  },
  {
    id: 'KYC-802',
    applicant: 'Deepak Sharma',
    mobile: '9820234567',
    loanType: 'Home Loan',
    amount: '₹45,00,000',
    panStatus: 'verified',
    aadhaarStatus: 'verified',
    bankStatement: 'analyzed',
    cibilScore: 745,
    overallStatus: 'in_review'
  },
  {
    id: 'KYC-803',
    applicant: 'Meenakshi Sundaram',
    mobile: '9830345678',
    loanType: 'Loan Against Property',
    amount: '₹35,00,000',
    panStatus: 'verified',
    aadhaarStatus: 'verified',
    bankStatement: 'upload_required',
    cibilScore: 710,
    overallStatus: 'reupload_needed'
  },
  {
    id: 'KYC-804',
    applicant: 'Kunal Singhania',
    mobile: '9840456789',
    loanType: 'Business Loan',
    amount: '₹25,00,000',
    panStatus: 'verified',
    aadhaarStatus: 'pending',
    bankStatement: 'analyzed',
    cibilScore: 765,
    overallStatus: 'in_review'
  },
  {
    id: 'KYC-805',
    applicant: 'Vicky Rajput',
    mobile: '9850567890',
    loanType: 'Personal Loan',
    amount: '₹3,00,000',
    panStatus: 'mismatch',
    aadhaarStatus: 'pending',
    bankStatement: 'pending',
    cibilScore: 620,
    overallStatus: 'rejected'
  }
];

export const KycDeskTab: React.FC = () => {
  const [records, setRecords] = useState<KycRecord[]>(INITIAL_KYC_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<KycRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleUpdateStatus = (id: string, status: KycRecord['overallStatus']) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, overallStatus: status } : r));
    showToast(`KYC Record ${id} status updated to ${status}!`);
    if (selectedRecord?.id === id) {
      setSelectedRecord(prev => prev ? { ...prev, overallStatus: status } : null);
    }
  };

  const filtered = records.filter(r => {
    const matchesSearch = 
      !searchTerm ||
      r.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.mobile.includes(searchTerm) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || r.overallStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              KYC & Document Verification Desk
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              AES-256 Encrypted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated PAN NSDL check, Aadhaar XML DigiLocker sync, 6-month bank statement analytics & CIBIL bureau pull.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>DPDP Compliant Data Vault</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Documents Verified</span>
          <p className="text-2xl font-black text-emerald-600 font-['Outfit',sans-serif] mt-1">
            {records.filter(r => r.overallStatus === 'approved').length} Dossiers
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">100% Pan + Aadhaar Valid</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Under Underwriter Review</span>
          <p className="text-2xl font-black text-blue-600 font-['Outfit',sans-serif] mt-1">
            {records.filter(r => r.overallStatus === 'in_review').length} Files
          </p>
          <span className="text-[10px] text-slate-400">Bank statement analysis stage</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Requires Re-upload</span>
          <p className="text-2xl font-black text-amber-600 font-['Outfit',sans-serif] mt-1">
            {records.filter(r => r.overallStatus === 'reupload_needed').length} Requests
          </p>
          <span className="text-[10px] text-slate-400">Password protected PDF / Blur</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Average CIBIL Score</span>
          <p className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
            742
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">Prime Borrower Segment</span>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by applicant name, mobile, or dossier ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E81E76]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
        >
          <option value="all">All Verification Stages</option>
          <option value="approved">Approved & Disbursal Ready</option>
          <option value="in_review">Under Review</option>
          <option value="reupload_needed">Action / Re-upload Required</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Dossier ID & Applicant</th>
                <th className="p-3">Product & Amount</th>
                <th className="p-3">PAN & Aadhaar Check</th>
                <th className="p-3">6-Mo Bank Statement</th>
                <th className="p-3">CIBIL Bureau</th>
                <th className="p-3">KYC Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(record => (
                <tr key={record.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="p-3">
                    <span className="font-mono text-[10px] text-slate-500 font-bold block mb-0.5">
                      {record.id}
                    </span>
                    <p className="font-bold text-slate-900">{record.applicant}</p>
                    <p className="text-[10px] text-slate-500">{record.mobile}</p>
                  </td>

                  <td className="p-3">
                    <p className="font-semibold text-slate-800">{record.loanType}</p>
                    <p className="font-black text-[#E81E76] font-['Outfit',sans-serif]">{record.amount}</p>
                  </td>

                  <td className="p-3">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit ${
                        record.panStatus === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        PAN: {record.panStatus.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit ${
                        record.aadhaarStatus === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        Aadhaar: {record.aadhaarStatus.toUpperCase()}
                      </span>
                    </div>
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      record.bankStatement === 'analyzed' ? 'bg-blue-50 text-blue-700' :
                      record.bankStatement === 'upload_required' ? 'bg-amber-50 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {record.bankStatement === 'analyzed' ? '✓ Analyzed (FOIR 42%)' :
                       record.bankStatement === 'upload_required' ? '⚠ Re-upload Needed' : 'Pending Upload'}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-black font-['Outfit',sans-serif] ${
                        record.cibilScore >= 750 ? 'text-emerald-600' :
                        record.cibilScore >= 700 ? 'text-blue-600' : 'text-rose-600'
                      }`}>
                        {record.cibilScore}
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                        record.cibilScore >= 750 ? 'bg-emerald-100 text-emerald-800' :
                        record.cibilScore >= 700 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {record.cibilScore >= 750 ? 'Excellent' : record.cibilScore >= 700 ? 'Good' : 'High Risk'}
                      </span>
                    </div>
                  </td>

                  <td className="p-3">
                    <select
                      value={record.overallStatus}
                      onChange={(e) => handleUpdateStatus(record.id, e.target.value as any)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        record.overallStatus === 'approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        record.overallStatus === 'in_review' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        record.overallStatus === 'reupload_needed' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      <option value="approved">Approved ✓</option>
                      <option value="in_review">In Review ⏱</option>
                      <option value="reupload_needed">Re-upload Needed ⚠</option>
                      <option value="rejected">Rejected ✕</option>
                    </select>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOSSIER MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#E81E76] bg-pink-50 px-2.5 py-0.5 rounded-full">
                {selectedRecord.id}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                CIBIL {selectedRecord.cibilScore} Verified
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {selectedRecord.applicant}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Applicant Mobile: {selectedRecord.mobile} • Requested: {selectedRecord.amount} ({selectedRecord.loanType})
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">PAN Card Status (NSDL API):</span>
                <span className="font-bold text-emerald-700">Verified & Active</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">Aadhaar XML (DigiLocker):</span>
                <span className="font-bold text-emerald-700">Biometric Authenticated</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-600 font-medium">Bank Statement (6 Months):</span>
                <span className="font-bold text-blue-700">Average Balance ₹48,500/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Underwriting FOIR (Fixed Obligation):</span>
                <span className="font-bold text-purple-700">38.5% (Safe Zone &lt; 50%)</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  handleUpdateStatus(selectedRecord.id, 'approved');
                  setSelectedRecord(null);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Approve KYC & Sanction
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(selectedRecord.id, 'reupload_needed');
                  setSelectedRecord(null);
                }}
                className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 cursor-pointer transition-colors"
              >
                Request Re-upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
