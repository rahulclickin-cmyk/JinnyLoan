import React from 'react';
import { 
  ArrowRight, 
  CreditCard, 
  Briefcase, 
  Home, 
  Building2, 
  Coins, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface LoanProductsGridProps {
  onOpenApplyModal: (loanType: string) => void;
}

export const LoanProductsGrid: React.FC<LoanProductsGridProps> = ({
  onOpenApplyModal
}) => {
  return (
    <section id="loan-products" className="py-6 sm:py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-3xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Popular Loan Categories
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-500 mt-1">
            Choose tailored financing solutions with instant sanction & minimal paperwork
          </p>
        </div>

        {/* Top 3 Products: 2 Cols on Mobile, 3 Cols on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6 mb-3 sm:mb-6">
          
          {/* 1. Personal Loan */}
          <div 
            onClick={() => onOpenApplyModal('Personal Loan')}
            className="group relative bg-gradient-to-br from-[#E81E76] via-[#d61266] to-[#9d0248] rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[200px]"
            id="product-card-personal-loan"
          >
            <div className="absolute -right-6 -bottom-6 w-24 sm:w-36 h-24 sm:h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-1 sm:mb-2">
                  Instant Cash
                </span>
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-tight">
                  Personal Loan
                </h3>
                <p className="text-[10px] sm:text-xs text-pink-100 mt-0.5 sm:mt-1 hidden sm:block max-w-[200px]">
                  Funds up to ₹10 Lakhs for medical, wedding or emergency needs.
                </p>
              </div>

              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-inner flex-shrink-0">
                <Coins className="w-4 h-4 sm:w-7 sm:h-7 text-yellow-300" />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-between border-t border-white/15 relative z-10 mt-2">
              <span className="text-[9px] sm:text-xs font-semibold text-pink-100">
                From <strong className="text-white">10.49%</strong>
              </span>
              <button 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-[#E81E76] flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-slate-900 transition-colors shadow-xs"
                aria-label="Apply for Personal Loan"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* 2. Credit Cards */}
          <div 
            onClick={() => onOpenApplyModal('Credit Card')}
            className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[200px] border border-slate-700/60"
            id="product-card-credit-card"
          >
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 mb-1 sm:mb-2">
                  Rewards
                </span>
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-tight">
                  Credit Cards
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5 sm:mt-1 hidden sm:block max-w-[200px]">
                  Lifetime free cards with airport lounge access & 5% cashback.
                </p>
              </div>

              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <CreditCard className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-between border-t border-slate-700/80 relative z-10 mt-2">
              <span className="text-[9px] sm:text-xs font-semibold text-slate-300">
                <strong className="text-white">40+ Cards</strong>
              </span>
              <button 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-700 text-white group-hover:bg-[#E81E76] transition-colors flex items-center justify-center shadow-xs"
                aria-label="Apply for Credit Cards"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* 3. Business Loan */}
          <div 
            onClick={() => onOpenApplyModal('Business Loan')}
            className="group relative bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#0284c7] rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[200px] col-span-2 md:col-span-1"
            id="product-card-business-loan"
          >
            <div className="absolute -right-6 -bottom-6 w-24 sm:w-36 h-24 sm:h-36 bg-blue-300/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-1 sm:mb-2">
                  MSME Growth
                </span>
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-tight">
                  Business Loan
                </h3>
                <p className="text-[10px] sm:text-xs text-blue-100 mt-0.5 sm:mt-1 hidden sm:block max-w-[200px]">
                  Collateral-free working capital & machinery loans up to ₹50 Lakhs.
                </p>
              </div>

              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-inner flex-shrink-0">
                <Briefcase className="w-4 h-4 sm:w-7 sm:h-7 text-emerald-300" />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-between border-t border-white/15 relative z-10 mt-2">
              <span className="text-[9px] sm:text-xs font-semibold text-blue-100">
                In <strong className="text-white">48 Hours</strong>
              </span>
              <button 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-[#1d4ed8] flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-slate-900 transition-colors shadow-xs"
                aria-label="Apply for Business Loan"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom 2 Products Row: 2 Cols on Both Mobile & Desktop */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6" id="home-loan-details">
          
          {/* Home Loan Card */}
          <div 
            onClick={() => onOpenApplyModal('Home Loan')}
            className="group relative bg-white border-2 border-slate-100 hover:border-pink-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 cursor-pointer"
            id="product-card-home-loan"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E81E76] flex-shrink-0">
                <Home className="w-4 h-4 sm:w-7 sm:h-7 text-[#E81E76]" />
              </div>
              <div>
                <span className="text-[8px] sm:text-[11px] font-bold text-[#E81E76] uppercase tracking-wider block">
                  Lowest Rates
                </span>
                <h4 className="text-xs sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif] leading-tight">
                  Home Loan
                </h4>
                <p className="text-[10px] sm:text-xs font-bold text-slate-700 mt-0.5">
                  <span className="text-[#E81E76] font-extrabold text-[11px] sm:text-sm">7.75%*</span>
                </p>
              </div>
            </div>

            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#E81E76] transition-all self-end sm:self-center shadow-xs">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

          {/* Loan Against Property (LAP) */}
          <div 
            onClick={() => onOpenApplyModal('Loan Against Property')}
            className="group relative bg-white border-2 border-slate-100 hover:border-blue-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 cursor-pointer"
            id="product-card-lap"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4ed8] flex-shrink-0">
                <Building2 className="w-4 h-4 sm:w-7 sm:h-7 text-[#1d4ed8]" />
              </div>
              <div>
                <span className="text-[8px] sm:text-[11px] font-bold text-[#1d4ed8] uppercase tracking-wider block">
                  Secured Loan
                </span>
                <h4 className="text-xs sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif] leading-tight">
                  Against Property
                </h4>
                <p className="text-[10px] sm:text-xs font-bold text-slate-700 mt-0.5">
                  <span className="text-[#1d4ed8] font-extrabold text-[11px] sm:text-sm">7.75%*</span>
                </p>
              </div>
            </div>

            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#1d4ed8] transition-all self-end sm:self-center shadow-xs">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
