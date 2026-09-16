import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sparkles
} from 'lucide-react';
import { JinnyLogo } from './JinnyLogo';
import { useSiteConfig } from '../context/ConfigContext';
import { useRouter } from '../context/RouterContext';

interface HeroSectionProps {
  onOpenApplyModal: (loanType?: string) => void;
  onNavigateToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApplyModal,
  onNavigateToCalculator
}) => {
  const { config, handleActionUrl } = useSiteConfig();
  const { navigate } = useRouter();

  const banner1 = config?.heroBanners?.[0] || {
    id: 'banner-direct-credit',
    badge: 'Direct Bank Credit',
    badgeSub: 'Paperless KYC',
    titlePrefix: 'Get Loans up to',
    highlightAmount: '₹10 Lakh',
    description: 'Disbursed directly into bank account in 24 hrs with lowest interest rate guarantees.',
    docs: ['Aadhar Card', 'PAN Card', 'Income Proof'],
    quickAmounts: ['₹50K', '₹1 Lakh', '₹5 Lakh', '₹10 Lakh'],
    ctaText: 'Apply Now',
    ctaDestination: '/offers/direct-credit-loan',
    bgGradient: 'from-[#0f2868] via-[#1e40af] to-[#2563eb]',
    accentColor: 'text-yellow-300',
    active: true,
    order: 1
  };
  const banner2 = config?.heroBanners?.[1] || banner1;

  const handleBannerCta = (destination: string, fallbackTitle: string) => {
    if (destination.startsWith('/')) {
      navigate(destination);
    } else {
      handleActionUrl(destination, () => onOpenApplyModal(fallbackTitle));
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-14 border-b border-slate-200">
      
      {/* Background soft ambient blurs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Hero Titles matching WordPress Screenshot */}
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-8 space-y-1.5 sm:space-y-3">
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-['Outfit',sans-serif]">
            Your Trusted Marketplace for{' '}
            <span className="text-[#1e40af]">Financial Solutions</span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg font-bold text-[#E81E76]">
            Instant Online Loans — Personal, Business & Fast Approval at JinnyLoan
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#1e40af]" />
            <span><strong className="text-slate-900">24 hrs</strong> Avg loan processing time</span>
          </div>
        </div>

        {/* Dual Visual Feature Banners: 2 Columns Side-by-Side on Both Mobile & Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Left Card: Banner 1 */}
          {banner1 && banner1.active && (
            <div className={`rounded-2xl sm:rounded-3xl bg-gradient-to-br ${banner1.bgGradient || 'from-[#0f2868] via-[#1e40af] to-[#2563eb]'} text-white p-4 sm:p-6 md:p-8 shadow-xl shadow-blue-900/10 flex flex-col justify-between relative overflow-hidden`}>
              
              {/* Background circle */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 sm:w-60 h-40 sm:h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/15">
                  <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white backdrop-blur-xs">
                    {banner1.badge}
                  </span>
                  <span className="text-[9px] sm:text-xs font-semibold text-blue-200 hidden xs:inline">
                    {banner1.badgeSub || 'Paperless KYC'}
                  </span>
                </div>

                {/* Main Titles */}
                <div className="my-2.5 sm:my-5">
                  <h2 className="text-base sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
                    {banner1.titlePrefix}{' '}
                    <span className={banner1.accentColor || 'text-yellow-300'}>{banner1.highlightAmount}</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-sm text-blue-100 font-medium mt-1 line-clamp-2">
                    {banner1.description}
                  </p>
                </div>

                {/* Required Documents Checklist */}
                <div className="bg-white/10 backdrop-blur-xs rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 mb-2.5 sm:mb-5">
                  <div className="text-[9px] sm:text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                    Minimal Docs
                  </div>
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold text-white">
                    {(banner1.docs || ['Aadhar Card', 'PAN Card', 'Income Proof']).map((doc, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Loan Amount Slabs */}
                <div className="space-y-1.5 mb-3 sm:mb-5">
                  <div className="text-[9px] sm:text-xs font-bold text-blue-200">
                    Quick Amount:
                  </div>
                  <div className="grid grid-cols-4 gap-1 sm:gap-2">
                    {(banner1.quickAmounts || ['₹50K', '₹1 Lakh', '₹5 Lakh', '₹10 Lakh']).map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleBannerCta(banner1.ctaDestination, `Personal Loan - ${amt}`)}
                        className="py-1 sm:py-2 px-1 bg-white/15 hover:bg-white text-white hover:text-[#1e40af] border border-white/30 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center truncate cursor-pointer"
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 sm:pt-4 border-t border-white/15 flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs text-blue-200">
                  100% Digital Processing
                </span>
                <button
                  onClick={() => handleBannerCta(banner1.ctaDestination, `${banner1.titlePrefix} ${banner1.highlightAmount}`)}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-[#1e40af] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  id="hero-apply-banner-1"
                >
                  <span>{banner1.ctaText || 'Apply Now'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* Right Card: Banner 2 */}
          {banner2 && banner2.active && (
            <div className={`rounded-2xl sm:rounded-3xl bg-gradient-to-br ${banner2.bgGradient || 'from-[#a30948] via-[#e11d6e] to-[#ff4b82]'} text-white p-4 sm:p-6 md:p-8 shadow-xl shadow-pink-900/10 flex flex-col justify-between relative overflow-hidden`}>
              
              {/* Background glow */}
              <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-40 sm:w-60 h-40 sm:h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />

              <div>
                {/* Card Header with JinnyLogo white variant */}
                <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/20">
                  <JinnyLogo size="sm" variant="white" />
                  <div className="flex items-center gap-1 text-[9px] sm:text-xs font-bold bg-white/20 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-xs">
                    <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    <span>{banner2.badge}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="my-2.5 sm:my-5">
                  <h2 className="text-base sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
                    {banner2.titlePrefix}{' '}
                    <span className={banner2.accentColor || 'text-yellow-300'}>{banner2.highlightAmount}</span>
                  </h2>
                  <p className="text-[11px] sm:text-xs md:text-sm text-pink-100 font-medium mt-1 line-clamp-2">
                    {banner2.description}
                  </p>
                </div>

                {/* Badges */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2.5 sm:mb-5">
                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs p-2 sm:p-3 rounded-xl border border-white/20">
                    <Zap className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] sm:text-xs font-black block leading-none">Fast Disbursal</span>
                      <span className="text-[9px] sm:text-[10px] text-pink-200">Direct credit</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs p-2 sm:p-3 rounded-xl border border-white/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] sm:text-xs font-black block leading-none">Instant Sanction</span>
                      <span className="text-[9px] sm:text-[10px] text-pink-200">Paperless</span>
                    </div>
                  </div>
                </div>

                {/* Lending Partners Grid */}
                <div className="space-y-1.5 mb-3 sm:mb-5">
                  <div className="text-[9px] sm:text-xs font-bold text-pink-200">
                    Top Partners:
                  </div>
                  <div className="grid grid-cols-4 gap-1 sm:gap-2">
                    {(banner2.topPartners || ['Moneyview', 'Poonawalla', 'KreditBee', 'L&T Fin']).map((partner) => (
                      <div
                        key={partner}
                        className="py-1 sm:py-2 px-1 bg-white text-slate-800 rounded-lg sm:rounded-xl text-center text-[9px] sm:text-xs font-bold shadow-2xs truncate"
                      >
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 sm:pt-4 border-t border-white/20 flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs text-pink-100 font-medium">
                  jinnyloan.com
                </span>
                <button
                  onClick={() => handleBannerCta(banner2.ctaDestination, `${banner2.titlePrefix} ${banner2.highlightAmount}`)}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-[#E81E76] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  id="hero-apply-banner-2"
                >
                  <span>{banner2.ctaText || 'Get Offer'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

