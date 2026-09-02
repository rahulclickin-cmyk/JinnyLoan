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
    <section id="charges" className="py-14 sm:py-18 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2">
            <ReceiptText className="w-3.5 h-3.5" />
            <span>100% Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Loan Charges & Processing Fees Breakdown
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            No hidden clauses. Zero broker fees. Here is the complete breakdown of applicable charges across our top partner banks.
          </p>
        </div>

        {/* Charges Table / Cards Container */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
          
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
                className={`p-5 space-y-2 ${item.highlight ? 'bg-pink-50/70' : 'bg-white'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {item.type}
                  </span>
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded ${
                    item.highlight ? 'bg-[#E81E76] text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {item.fee}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {item.note}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* RBI Policy & Zero Brokerage Note */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                RBI Compliant Zero Prepayment Policy
              </h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                As per Reserve Bank of India mandates, banks cannot charge any foreclosure penalty or part-prepayment fees on floating rate loans taken by individual borrowers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <HandCoins className="w-5 h-5 text-[#1e40af] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                100% Free Service For Customers
              </h4>
              <p className="text-xs text-blue-800 mt-1 leading-relaxed">
                JinnyLoan charges ₹0 consulting fee from borrowers. We are directly remunerated by the lending institutions upon successful loan disbursement.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
