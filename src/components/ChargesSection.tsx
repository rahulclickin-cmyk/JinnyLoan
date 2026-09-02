import React from 'react';
import { 
  ReceiptText, 
  ShieldCheck, 
  CheckCircle2, 
  Percent, 
  Info,
  BadgeAlert,
  ArrowRight,
  HandCoins
} from 'lucide-react';
import { CHARGES_DATA } from '../data/mockData';

interface ChargesSectionProps {
  onOpenApplyModal: () => void;
}

export const ChargesSection: React.FC<ChargesSectionProps> = ({ onOpenApplyModal }) => {
  return (
    <section id="charges" className="py-6 sm:py-14 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <ReceiptText className="w-3 h-3" />
            <span>100% Transparency</span>
          </div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Loan Charges & Processing Fees Breakdown
          </h2>
          <p className="mt-1 text-[11px] sm:text-sm text-slate-600 leading-relaxed">
            No hidden clauses. Zero broker fees across our top partner banks
          </p>
        </div>

        {/* Charges Table / Cards Container */}
        <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
          
          {/* Table for Desktop & Tablet */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white text-xs uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Fee Category / Component</th>
                  <th className="py-4 px-6">Standard Bank Charges</th>
                  <th className="py-4 px-6">JinnyLoan Benefit & Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {CHARGES_DATA.map((item, idx) => (
                  <tr 
                    key={item.type}
                    className={`transition-colors ${
                      item.highlight 
                        ? 'bg-pink-50/50 font-medium hover:bg-pink-50' 
                        : 'hover:bg-slate-100/60'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      {item.highlight ? (
                        <ShieldCheck className="w-4 h-4 text-[#E81E76] flex-shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      )}
                      <span>{item.type}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block font-extrabold px-3 py-1 rounded-lg text-xs ${
                        item.highlight 
                          ? 'bg-[#E81E76] text-white font-["Outfit",sans-serif]' 
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {item.fee}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm">
                      {item.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile View */}
          <div className="md:hidden divide-y divide-slate-200">
            {CHARGES_DATA.map((item) => (
              <div 
                key={item.type}
                className={`p-3 space-y-1 ${item.highlight ? 'bg-pink-50/70' : 'bg-white'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {item.type}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    item.highlight ? 'bg-[#E81E76] text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {item.fee}
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* RBI Policy & Zero Brokerage Note */}
        <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-emerald-900 uppercase tracking-wider">
                RBI Compliant Zero Prepayment Policy
              </h4>
              <p className="text-[10px] sm:text-xs text-emerald-800 mt-0.5 leading-relaxed">
                As per Reserve Bank of India mandates, banks cannot charge any foreclosure penalty or part-prepayment fees on floating rate loans.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-2.5">
            <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 text-[#1e40af] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-blue-900 uppercase tracking-wider">
                100% Free Service For Customers
              </h4>
              <p className="text-[10px] sm:text-xs text-blue-800 mt-0.5 leading-relaxed">
                JinnyLoan charges ₹0 consulting fee from borrowers. We are directly remunerated by the lending institutions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
