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
  Zap,
  ExternalLink,
  Users,
  Handshake
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useSiteConfig } from '../context/ConfigContext';

interface LoanProductsGridProps {
  onOpenApplyModal: (loanType: string) => void;
}

export const LoanProductsGrid: React.FC<LoanProductsGridProps> = ({
  onOpenApplyModal
}) => {
  const { navigate } = useRouter();
  const { config, handleActionUrl } = useSiteConfig();

  // Find dynamic category configs if available
  const personalLoanCat = config?.popularCategories?.find(c => c.slug === '/personal-loan');
  const creditCardCat = config?.popularCategories?.find(c => c.slug === '/credit-card');
  const businessLoanCat = config?.popularCategories?.find(c => c.slug === '/business-loan');
  const loanAgentCat = config?.popularCategories?.find(c => c.slug === '/loan-agent');
  const homeLoanCat = config?.popularCategories?.find(c => c.slug === '/home-loan');
  const lapCat = config?.popularCategories?.find(c => c.slug === '/loan-against-property');

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
            onClick={() => navigate('/personal-loan')}
            className="group relative bg-gradient-to-br from-[#E81E76] via-[#d61266] to-[#9d0248] rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[200px]"
            id="product-card-personal-loan"
          >
            <div className="absolute -right-6 -bottom-6 w-24 sm:w-36 h-24 sm:h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-1 sm:mb-2">
                  {personalLoanCat?.badge || 'Instant Cash'}
                </span>
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-tight">
                  {personalLoanCat?.title || 'Personal Loan'}
                </h3>
                <p className="text-[10px] sm:text-xs text-pink-100 mt-0.5 sm:mt-1 hidden sm:block max-w-[200px]">
                  {personalLoanCat?.subtitle || 'Funds up to ₹10 Lakhs for medical, wedding or emergency needs.'}
                </p>
              </div>

              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-inner flex-shrink-0">
                <Coins className="w-4 h-4 sm:w-7 sm:h-7 text-yellow-300" />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-between border-t border-white/15 relative z-10 mt-2">
              <span className="text-[9px] sm:text-xs font-semibold text-pink-100">
                From <strong className="text-white">{personalLoanCat?.rateOrStat || '10.49%'}</strong>
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/personal-loan');
                }}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-[#E81E76] flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-slate-900 transition-colors shadow-xs"
                aria-label="View Personal Loans"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* 2. Credit Cards */}
          <div 
            onClick={() => navigate('/credit-card')}
            className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[200px] border border-slate-700/60"
            id="product-card-credit-card"
          >
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 mb-1 sm:mb-2">
                  {creditCardCat?.badge || 'Rewards'}
                </span>
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-tight">
                  {creditCardCat?.title || 'Credit Cards'}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5 sm:mt-1 hidden sm:block max-w-[200px]">
                  {creditCardCat?.subtitle || 'Lifetime free cards with airport lounge access & 5% cashback.'}
                </p>
              </div>

              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <CreditCard className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-between border-t border-slate-700/80 relative z-10 mt-2">
              <span className="text-[9px] sm:text-xs font-semibold text-slate-300">
                <strong className="text-white">{creditCardCat?.rateOrStat || '40+ Cards'}</strong>
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/credit-card');
                }}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-700 text-white group-hover:bg-[#E81E76] transition-colors flex items-center justify-center shadow-xs"
                aria-label="View Credit Cards"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* 3. Business Loan */}
          <div 
            onClick={() => navigate(businessLoanCat?.exploreDestination || '/business-loan')}
            className="group relative bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#0284c7] rounded-xl sm:rounded-2xl p-3 sm:p-6 text-white shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[130px] sm:min-h-[200px] col-span-2 md:col-span-1"
            id="product-card-business-loan"
          >
            <div className="absolute -right-6 -bottom-6 w-24 sm:w-36 h-24 sm:h-36 bg-blue-300/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-white/20 text-white backdrop-blur-xs mb-1 sm:mb-2">
                  {businessLoanCat?.badge || 'MSME Growth'}
                </span>
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white font-['Outfit',sans-serif] leading-tight">
                  {businessLoanCat?.title || 'Business Loan'}
                </h3>
                <p className="text-[10px] sm:text-xs text-blue-100 mt-0.5 sm:mt-1 hidden sm:block max-w-[200px]">
                  {businessLoanCat?.subtitle || 'Collateral-free working capital & machinery loans up to ₹50 Lakhs.'}
                </p>
              </div>

              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-inner flex-shrink-0">
                <Briefcase className="w-4 h-4 sm:w-7 sm:h-7 text-emerald-300" />
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-between border-t border-white/15 relative z-10 mt-2">
              <span className="text-[9px] sm:text-xs font-semibold text-blue-100">
                In <strong className="text-white">{businessLoanCat?.rateOrStat || '48 Hours'}</strong>
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (businessLoanCat?.startDestination && businessLoanCat.startDestination.startsWith('http')) {
                    handleActionUrl(businessLoanCat.startDestination);
                  } else {
                    navigate(businessLoanCat?.exploreDestination || '/business-loan');
                  }
                }}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-[#1d4ed8] flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-slate-900 transition-colors shadow-xs"
                aria-label="Apply for Business Loan"
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom 2 Products Row: Home Loan & Loan Agent (The 4th and 5th Popular Categories requested by user) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6" id="home-loan-details">
          
          {/* 4. Home Loan Card: Attractive Pink/Rose Gradient Card */}
          <div 
            onClick={() => navigate(homeLoanCat?.exploreDestination || '/home-loan')}
            className="group relative bg-gradient-to-r from-pink-50 via-rose-50 to-white border-2 border-pink-200 hover:border-[#E81E76] rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer overflow-hidden"
            id="product-card-home-loan"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#E81E76]/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#E81E76] text-white flex items-center justify-center shadow-md shadow-pink-500/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Home className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-xs font-bold text-white bg-[#E81E76] px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    {homeLoanCat?.badge || 'Lowest Rates'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    Dedicated Expert Assistance
                  </span>
                </div>
                <h4 className="text-base sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] leading-tight mt-1">
                  {homeLoanCat?.title || 'Home Loan'}
                </h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  Interest starting from <span className="text-[#E81E76] font-extrabold text-sm sm:text-base">{homeLoanCat?.rateOrStat || '7.10%*'}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">
                  {homeLoanCat?.subtitle || 'Zero foreclosure charges & flexible tenure up to 30 years.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center relative z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/home-loan');
                }}
                className="px-3.5 py-2 bg-white hover:bg-[#E81E76] text-[#E81E76] hover:text-white border border-pink-300 font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                View Rates & Apply
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e40af] text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#E81E76] transition-all shadow-xs">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

          {/* 5. Loan Agent: Attractive Emerald Gradient Card */}
          <div 
            onClick={() => navigate(loanAgentCat?.exploreDestination || '/loan-agent')}
            className="group relative bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-2 border-emerald-200 hover:border-emerald-600 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer overflow-hidden"
            id="product-card-loan-agent"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-xs font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    {loanAgentCat?.badge || 'DSA Partner'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    Zero Investment Business
                  </span>
                </div>
                <h4 className="text-base sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif] leading-tight mt-1">
                  {loanAgentCat?.title || 'Loan Agent'}
                </h4>
                <p className="text-xs font-bold text-slate-700 mt-0.5">
                  Commission Payout <span className="text-emerald-700 font-extrabold text-sm sm:text-base">{loanAgentCat?.rateOrStat || 'Up to 2.5%'}</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-1 hidden sm:block">
                  {loanAgentCat?.subtitle || 'Join India’s top digital DSA network. Earn up to ₹1.5 Lakh+ monthly on loan disbursals.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center relative z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/loan-agent');
                }}
                className="px-3.5 py-2 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Become Partner (Free Registration)
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-all shadow-xs">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* Optional LAP Link Pill */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/loan-against-property')}
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#1e40af] font-medium transition-colors cursor-pointer"
          >
            <span>Also looking for high-ticket property mortgage?</span>
            <span className="font-bold underline text-slate-700 hover:text-[#E81E76]">Explore Loan Against Property (LAP) &rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
};
