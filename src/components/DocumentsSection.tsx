import React, { useState } from 'react';
import { 
  FileText, 
  ReceiptText, 
  Landmark, 
  Home, 
  FileSpreadsheet, 
  FileCheck, 
  CheckCircle2, 
  Download, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { DOCUMENTS_LIST } from '../data/mockData';

export const DocumentsSection: React.FC = () => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const toggleDoc = (title: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ReceiptText':
        return ReceiptText;
      case 'Landmark':
        return Landmark;
      case 'Home':
        return Home;
      case 'FileSpreadsheet':
        return FileSpreadsheet;
      case 'FileCheck':
        return FileCheck;
      default:
        return FileText;
    }
  };

  const handleDownloadChecklist = () => {
    const checklistContent = `JINNY LOAN - LOAN DOCUMENT CHECKLIST
Website: jinnyloan.com | Helpline: +91 8006488006

1. Proof of Income:
   - Salaried: Latest 3 months salary slips, Form 16 (Part A & B)
   - Self-Employed: Last 2-3 years ITR with computation sheets, Profit & Loss statement

2. Primary Bank Account Statement:
   - Last 6 months bank statement showing salary/business credits

3. Proof of Identity & Permanent Residence:
   - Aadhaar Card, PAN Card, Passport, Voter ID or Utility Bill

4. Property / Collateral Documents (For Home Loans & LAP):
   - Agreement to Sell / Allotment Letter
   - Title Deeds / Chain of ownership
   - Approved building layout plan and Builder NOC

5. Business Verification Documents (For Business Loans):
   - GST Registration & returns (last 12 months)
   - Business PAN & Partnership Deed / MOA-AOA
   - Passport size photographs (2 copies)`;

    const blob = new Blob([checklistContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JinnyLoan_Document_Checklist.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="documents" className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Paperwork Made Easy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            List of Documents Needed
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Keep these primary documents handy for instant paperless upload or free doorstep verification.
          </p>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS_LIST.map((doc, idx) => {
            const IconComp = getIcon(doc.icon);
            const isChecked = !!checkedDocs[doc.title];

            return (
              <div
                key={doc.title}
                onClick={() => toggleDoc(doc.title)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isChecked
                    ? 'bg-pink-50/70 border-[#E81E76] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-pink-300 hover:shadow-2xs'
                }`}
                id={`doc-card-${idx}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#E81E76] text-white'
                        : 'bg-pink-50 text-[#E81E76] border border-pink-100'
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {doc.category}
                      </span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[#E81E76] border-[#E81E76] text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                    {doc.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{isChecked ? 'Marked Ready' : 'Click to mark as ready'}</span>
                  {isChecked && (
                    <span className="text-[#E81E76] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ready
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick Download Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col justify-between border border-slate-700">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400 flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif]">
                Download Offline Checklist
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Save the complete official documentation checklist for all 100+ partner banks in a handy format.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDownloadChecklist}
                className="w-full py-3 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="documents-download-btn"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Checklist Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Checklist (.TXT)</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
