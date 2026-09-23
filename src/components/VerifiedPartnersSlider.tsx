import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Pause, 
  Play, 
  ShieldCheck,
  Building
} from 'lucide-react';
import { BankLogo } from './BankLogos';
import { ProductPagePartner } from '../data/productPagesData';
import { useSiteConfig } from '../context/ConfigContext';

interface VerifiedPartnersSliderProps {
  partners: ProductPagePartner[];
  categoryName: string;
  isDirectRedirect: boolean;
  slug: string;
  onOpenApplyModal: (bankName?: string) => void;
  onOpenPartnerModal?: () => void;
  title?: string;
  subtitle?: string;
}

export const VerifiedPartnersSlider: React.FC<VerifiedPartnersSliderProps> = ({
  partners,
  categoryName,
  isDirectRedirect,
  slug,
  onOpenApplyModal,
  onOpenPartnerModal,
  title,
  subtitle
}) => {
  const { handleActionUrl } = useSiteConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen width (< 768px: 1 card, >= 768px: 3 cards)
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const visibleCardsCount = isMobile ? 1 : Math.min(3, partners.length);
  const maxStartIndex = Math.max(0, partners.length - visibleCardsCount);

  // Auto sliding
  useEffect(() => {
    if (isPaused || partners.length <= visibleCardsCount) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, maxStartIndex, partners.length, visibleCardsCount]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
  };

  const isSecuredProduct = slug === '/home-loan' || slug === '/loan-against-property';

  // Visible items slice with fallback wrap
  const visiblePartners = [];
  for (let i = 0; i < visibleCardsCount; i++) {
    const index = (currentIndex + i) % partners.length;
    visiblePartners.push({ partner: partners[index], originalIndex: index });
  }

  return (
    <div 
      className="mb-12 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="verified-partners-slider-section"
    >
      {/* Header with Title and Slider Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[#E81E76] uppercase tracking-wider block">
            {isDirectRedirect ? 'Direct Partner Application (No Internal Form)' : 'Compare & Choose'}
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
            {title || `Verified Partner Institutions for ${categoryName}`}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {subtitle || (isDirectRedirect 
              ? 'Click Apply Now to jump directly to the partner’s official portal.' 
              : 'Select a partner or apply directly through our priority digital desk.')}
          </p>
        </div>

        {/* Controls: Prev/Next and Indicator */}
        <div className="flex items-center gap-3 self-start sm:self-auto flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium mr-2">
            <span>{currentIndex + 1}</span>
            <span>/</span>
            <span>{partners.length}</span>
          </div>

          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 hover:border-[#1e40af] hover:text-[#1e40af] text-slate-700 shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous partners"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 hover:border-[#1e40af] hover:text-[#1e40af] text-slate-700 shadow-xs flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next partners"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slider View Area */}
      <div className="relative overflow-hidden">
        <div 
          className={`grid gap-5 sm:gap-6 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
          } transition-all duration-500 ease-in-out`}
        >
          {visiblePartners.map(({ partner, originalIndex }, displayIdx) => (
            <div 
              key={`${originalIndex}-${displayIdx}`}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-slate-200/90 shadow-xs hover:border-[#1e40af] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badge & Rate Row */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                  <span className="text-[11px] sm:text-xs font-extrabold text-[#E81E76] bg-pink-50 px-2.5 sm:px-3 py-1 rounded-full border border-pink-100 whitespace-nowrap">
                    {partner.badge}
                  </span>
                  <span className="text-[11px] sm:text-xs font-black text-slate-900 font-['Outfit',sans-serif] text-right">
                    {partner.rate}
                  </span>
                </div>

                {/* Logo and Partner Name */}
                <div className="flex items-start gap-3 sm:gap-3.5 mb-3.5 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-1.5 sm:p-2 shadow-2xs flex-shrink-0">
                    <BankLogo 
                      name={partner.logoName || partner.name} 
                      size="sm" 
                      showText={false} 
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit',sans-serif] leading-snug">
                      {partner.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-normal">
                      {partner.tagline}
                    </p>
                  </div>
                </div>

                {/* Details stats */}
                <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-100 space-y-1 sm:space-y-1.5 mb-3.5 sm:mb-4 text-[11px] sm:text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Max Quantum:</span>
                    <span className="font-bold text-slate-800">{partner.maxAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Max Tenure:</span>
                    <span className="font-bold text-slate-800">{partner.tenure}</span>
                  </div>
                </div>

                {/* Feature bullet points */}
                <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
                  {partner.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner CTA button */}
              <div>
                {slug === '/loan-agent' ? (
                  <button
                    onClick={() => {
                      if (onOpenPartnerModal) {
                        onOpenPartnerModal();
                      } else {
                        onOpenApplyModal(`${partner.name} - Loan Agent`);
                      }
                    }}
                    className="w-full py-2.5 sm:py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Users className="w-4 h-4" />
                    <span>Register to Sell ({partner.name})</span>
                  </button>
                ) : isSecuredProduct ? (
                  <button
                    onClick={() => onOpenApplyModal(`${partner.name} - ${categoryName}`)}
                    className="w-full py-2.5 sm:py-3 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Apply via JinnyLoan</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <a
                    href={partner.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 sm:py-3 px-4 bg-[#1e40af] hover:bg-[#E81E76] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Apply on Partner Site</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}
                <p className="text-[10px] text-slate-400 text-center mt-2 truncate">
                  {slug === '/loan-agent'
                    ? 'Partner registration is 100% free'
                    : isSecuredProduct ? 'Priority processing with dedicated RM' : `Official Partner Portal: ${partner.name}`}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Desktop Dot Indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-5">
        {Array.from({ length: maxStartIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'bg-[#1e40af] w-6' : 'bg-slate-300 w-2 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
