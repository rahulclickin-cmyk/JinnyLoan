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
    <section id="loan-products" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
            Popular Loan Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Choose from a wide variety of tailored financing solutions with instant sanction & minimal paperwork
          </p>
        </div>

        {/* Top 3 Products Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* 1. Personal Loan */}
          <div 
            onClick={() => onOpenApplyModal('Personal Loan')}
            className="group relative bg-gradient-to-br from-[#E81E76] via-[#d61266] to-[#9d0248] rounded-2xl p-7 text-white shadow-lg shadow-pink-500/15 hover:shadow-xl hover:shadow-pink-500/25 transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
            id="product-card-personal-loan"
          >
            {/* Background pattern */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-2">
                  Instant Cash
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                  Personal Loan
                </h3>
                <p className="text-xs text-pink-100 mt-1 max-w-[200px]">
                  Instant funds up to ₹10 Lakhs for medical, travel, wedding, or emergency needs.
                </p>
              </div>

              {/* 3D-styled Coin/Cash Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                <Coins className="w-8 h-8 text-yellow-300" />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/15 relative z-10">
              <span className="text-xs font-semibold text-pink-100">
                Rates starting from <strong className="text-white">10.49% p.a.</strong>
              </span>
              <button 
                className="w-9 h-9 rounded-full bg-white text-[#E81E76] flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-slate-900 transition-colors shadow-sm"
                aria-label="Apply for Personal Loan"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Credit Cards */}
          <div 
            onClick={() => onOpenApplyModal('Credit Card')}
            className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl p-7 text-white shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/35 transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px] border border-slate-700/60"
            id="product-card-credit-card"
          >
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 mb-2">
                  Rewards & Cashback
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                  Credit Cards
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-[200px]">
                  Lifetime free cards with airport lounge access, 5% cashback & reward points.
                </p>
              </div>

              {/* Glowing card icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-700/80 relative z-10">
              <span className="text-xs font-semibold text-slate-300">
                Over <strong className="text-white">40+ Premium Cards</strong>
              </span>
              <button 
                className="w-9 h-9 rounded-full bg-slate-700 text-white group-hover:bg-[#E81E76] transition-colors flex items-center justify-center shadow-sm"
                aria-label="Apply for Credit Cards"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. Business Loan */}
          <div 
            onClick={() => onOpenApplyModal('Business Loan')}
            className="group relative bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#0284c7] rounded-2xl p-7 text-white shadow-lg shadow-blue-600/15 hover:shadow-xl hover:shadow-blue-600/25 transition-all transform hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[220px]"
            id="product-card-business-loan"
          >
            <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-blue-300/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-2">
                  MSME & SME Growth
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
                  Business Loan
                </h3>
                <p className="text-xs text-blue-100 mt-1 max-w-[200px]">
                  Collateral-free working capital & machinery loans up to ₹50 Lakhs.
                </p>
              </div>

              {/* Briefcase Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-emerald-300" />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/15 relative z-10">
              <span className="text-xs font-semibold text-blue-100">
                Disbursal in <strong className="text-white">48 Hours</strong>
              </span>
              <button 
                className="w-9 h-9 rounded-full bg-white text-[#1d4ed8] flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-slate-900 transition-colors shadow-sm"
                aria-label="Apply for Business Loan"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom 2 Wide Products Row (Home Loan & Loan Against Property) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="home-loan-details">
          
          {/* Home Loan Card */}
          <div 
            onClick={() => onOpenApplyModal('Home Loan')}
            className="group relative bg-white border-2 border-slate-100 hover:border-pink-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
            id="product-card-home-loan"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#E81E76] flex-shrink-0 group-hover:scale-105 transition-transform">
                <Home className="w-8 h-8 text-[#E81E76]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#E81E76] uppercase tracking-wider">
                  Lowest Rates in India
                </span>
                <h4 className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  Home Loan
                </h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  Starting <span className="text-[#E81E76] font-extrabold text-sm">7.75%* p.a.</span>
                </p>
                <span className="text-[11px] text-slate-400">Up to 30 Years Tenure • Zero Prepayment Penalty</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#1e40af] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#E81E76] group-hover:scale-110 transition-all shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Loan Against Property (LAP) */}
          <div 
            onClick={() => onOpenApplyModal('Loan Against Property')}
            className="group relative bg-white border-2 border-slate-100 hover:border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer"
            id="product-card-lap"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1d4ed8] flex-shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-8 h-8 text-[#1d4ed8]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#1d4ed8] uppercase tracking-wider">
                  High Value Secured Loan
                </span>
                <h4 className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
                  Loan Against Property
                </h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  Starting <span className="text-[#1d4ed8] font-extrabold text-sm">7.75%* p.a.</span>
                </p>
                <span className="text-[11px] text-slate-400">Residential & Commercial Properties Funded</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#1e40af] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#1d4ed8] group-hover:scale-110 transition-all shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
