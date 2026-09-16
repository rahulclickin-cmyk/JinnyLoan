import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Zap, 
  Sparkles,
  Building2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { JinnyLogo } from './JinnyLogo';
import { useSiteConfig } from '../context/ConfigContext';
import { useRouter } from '../context/RouterContext';
import { HeroBannerConfig } from '../config/siteConfig';

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

  // Fallback banners if not yet in state
  const defaultBanners: HeroBannerConfig[] = [
    {
      id: 'banner-direct-credit',
      badge: 'Direct Bank Credit',
      badgeSub: 'Paperless KYC',
      titlePrefix: 'Get Loans up to',
      highlightAmount: '₹10 Lakh',
      description: 'Disbursed directly into bank account in 24 hrs with lowest interest rate guarantees.',
      docs: ['Aadhaar Card', 'PAN Card', 'Income Proof'],
      quickAmounts: ['₹50K', '₹1 Lakh', '₹5 Lakh', '₹10 Lakh'],
      ctaText: 'Apply Now',
      ctaDestination: 'https://bitli.in/5OXZt6Z',
      bgGradient: 'from-[#0f2868] via-[#1e40af] to-[#2563eb]',
      accentColor: 'text-yellow-300',
      active: true,
      order: 1
    },
    {
      id: 'banner-multi-lender',
      badge: 'Multi-Lender Match',
      badgeSub: '30+ Lenders',
      titlePrefix: 'Loans from Lenders',
      highlightAmount: 'Upto ₹7 Lakhs',
      description: 'Single instant application checked against 30+ top institutional lenders simultaneously.',
      docs: ['Instant KYC', 'Bank Statement', 'Zero Collateral'],
      badges: [
        { title: 'Fast Disbursal', subtitle: 'Direct credit' },
        { title: 'Instant Sanction', subtitle: 'Paperless approval' }
      ],
      topPartners: ['Moneyview', 'Poonawalla', 'KreditBee', 'L&T Fin'],
      ctaText: 'Apply Now',
      ctaDestination: 'https://bitli.in/VqSU8fF',
      bgGradient: 'from-[#a30948] via-[#e11d6e] to-[#ff4b82]',
      accentColor: 'text-yellow-300',
      active: true,
      order: 2
    },
    {
      id: 'banner-business-agent',
      badge: 'Business & Fast-Track Desk',
      badgeSub: 'Zero Collateral',
      titlePrefix: 'Fast-Track Funds up to',
      highlightAmount: '₹50 Lakhs',
      description: 'Collateral-free business expansion & personal credit with same-day institutional bank transfer.',
      docs: ['Instant e-KYC', 'PAN & Aadhaar', '6 Mo. Statements'],
      quickAmounts: ['₹2 Lakh', '₹5 Lakh', '₹15 Lakh', '₹50 Lakh'],
      badges: [
        { title: 'Zero Collateral', subtitle: 'Unsecured credit' },
        { title: 'Same-Day Credit', subtitle: 'Digital transfer' }
      ],
      topPartners: ['Tata Capital', 'Aditya Birla', 'Kotak Bank', 'L&T Finance'],
      ctaText: 'Check Eligibility',
      ctaDestination: 'https://bitli.in/H5QN6Tz',
      bgGradient: 'from-[#064e3b] via-[#047857] to-[#0f766e]',
      accentColor: 'text-yellow-300',
      active: true,
      order: 3
    },
    {
      id: 'banner-express-sanction',
      badge: 'Instant Pre-Approval',
      badgeSub: 'Rates from 9.99%',
      titlePrefix: 'Express Sanction up to',
      highlightAmount: '₹15 Lakhs',
      description: 'Pre-approved personal loan offers with automated online underwriting and zero collateral.',
      docs: ['Aadhaar e-KYC', 'PAN Card', 'NetBanking Verify'],
      quickAmounts: ['₹1 Lakh', '₹3 Lakh', '₹7 Lakh', '₹15 Lakh'],
      badges: [
        { title: 'Zero Foreclosure', subtitle: 'Floating terms' },
        { title: 'Lowest EMI', subtitle: 'From ₹1,999/Lakh' }
      ],
      topPartners: ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'CreditSea'],
      ctaText: 'Instant Apply',
      ctaDestination: 'https://bitli.in/5OXZt6Z',
      bgGradient: 'from-[#9a3412] via-[#ea580c] to-[#f97316]',
      accentColor: 'text-yellow-300',
      active: true,
      order: 4
    }
  ];

  const rawBanners = (config?.heroBanners && config.heroBanners.length >= 2) 
    ? config.heroBanners.filter(b => b.active) 
    : defaultBanners;

  const banners = rawBanners.length >= 3 ? rawBanners : defaultBanners;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gentle, slow auto-advance every 3 seconds (Right to Left sliding)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  const handleBannerCta = (destination: string, fallbackTitle: string) => {
    if (destination.startsWith('/')) {
      navigate(destination);
    } else {
      handleActionUrl(destination, () => onOpenApplyModal(fallbackTitle));
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  // Render individual banner card
  const renderCard = (banner: HeroBannerConfig, keySuffix: string | number) => {
    return (
      <div 
        key={`${banner.id}-${keySuffix}`}
        className={`w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br ${banner.bgGradient} text-white p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-900/10 flex flex-col justify-between relative overflow-hidden h-full min-h-[390px] sm:min-h-[430px] border border-white/20 select-none`}
      >
        {/* Ambient subtle glow inside card */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Card Header with badges */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-xs shadow-xs">
                {banner.badge}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-white/80 hidden xs:inline">
                {banner.badgeSub || 'Paperless KYC'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-300 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/10">
              <Zap className="w-3 h-3 fill-yellow-300" />
              <span>Instant</span>
            </div>
          </div>

          {/* Main Titles */}
          <div className="my-3 sm:my-5">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
              {banner.titlePrefix}{' '}
              <span className={banner.accentColor || 'text-yellow-300'}>{banner.highlightAmount}</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium mt-1.5 line-clamp-2">
              {banner.description}
            </p>
          </div>

          {/* Minimal Documents Required */}
          <div className="bg-white/15 backdrop-blur-xs rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-white/20 mb-3 sm:mb-4">
            <div className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Required Documents</span>
              <span className="text-[10px] text-emerald-300 lowercase font-medium">100% digital</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-xs font-bold text-white">
              {(banner.docs || ['Aadhaar Card', 'PAN Card', 'Bank Statement']).map((doc, i) => (
                <div key={i} className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
                  <span className="truncate">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges or Quick Amount Slabs */}
          {banner.badges && banner.badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3 sm:mb-4">
              {banner.badges.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl border border-white/15">
                  <Zap className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                  <div>
                    <span className="text-[11px] sm:text-xs font-black block leading-none">{b.title}</span>
                    <span className="text-[9px] sm:text-[10px] text-white/80">{b.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : banner.quickAmounts && banner.quickAmounts.length > 0 ? (
            <div className="space-y-1.5 mb-3 sm:mb-4">
              <div className="text-[10px] sm:text-xs font-bold text-white/80">
                Quick Loan Amounts:
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {banner.quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleBannerCta(banner.ctaDestination, `${banner.titlePrefix} ${amt}`)}
                    className="py-1.5 px-1 bg-white/15 hover:bg-white text-white hover:text-slate-900 border border-white/30 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center truncate cursor-pointer"
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Top Partners row if present */}
          {banner.topPartners && banner.topPartners.length > 0 && (
            <div className="space-y-1 mb-2">
              <div className="text-[10px] font-bold text-white/80">
                Top Lending Partners:
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {banner.topPartners.map((p) => (
                  <div key={p} className="py-1 px-1 bg-white/20 text-white rounded-lg text-center text-[10px] font-bold truncate">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/20 flex items-center justify-between gap-3 mt-2">
          <span className="text-[10px] sm:text-xs text-white/80 font-medium">
            100% Digital • Fast Sanction
          </span>
          <button
            onClick={() => handleBannerCta(banner.ctaDestination, `${banner.titlePrefix} ${banner.highlightAmount}`)}
            className="px-5 py-2.5 bg-white text-slate-900 hover:bg-yellow-300 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer transform hover:scale-105 active:scale-95"
            id={`hero-apply-btn-${banner.id}`}
          >
            <span>{banner.ctaText || 'Apply Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Determine cards to render based on currentIndex
  // On desktop, we show a side-by-side view with 2 cards visible, sliding smoothly through the 3 cards
  const nextIndex = (currentIndex + 1) % banners.length;

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-14 border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient blurs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Hero Titles */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-['Outfit',sans-serif]">
            Your Trusted Marketplace for{' '}
            <span className="text-[#1e40af]">Financial Solutions</span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg font-bold text-[#E81E76]">
            Instant Online Loans — Personal, Business & Fast Approval at JinnyLoan
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#1e40af]" />
              <span><strong className="text-slate-900">24 hrs</strong> Avg loan processing time</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% RBI Regulated Partners</span>
            </div>
          </div>
        </div>

        {/* Carousel Slider Navigation Bar: Tabs + Arrow Controls */}
        <div className="flex items-center justify-between mb-3 px-1">
          {/* Slide Indicator Tabs (3 Banners: Direct Bank Credit, Multi-Lender Match, Business Fast-Track) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {banners.map((b, idx) => {
              const isActive = isMobile ? currentIndex === idx : (currentIndex === idx || nextIndex === idx);
              return (
                <button
                  key={b.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentIndex === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : isActive 
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  aria-label={`Slide to ${b.badge}`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-orange-500' : 'bg-emerald-500'
                  }`} />
                  <span className="hidden sm:inline">{b.badge}</span>
                  <span className="sm:hidden">{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Slider Prev / Next controls */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Auto-sliding • Hover to pause
            </span>
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-xs transition-all cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-xs transition-all cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Sliding Carousel Track: Gentle & Slow Transition */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          
          {/* Mobile View: 1 Card at a time with smooth slide */}
          <div className="block md:hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {banners.map((banner, idx) => (
                <div key={banner.id} className="w-full flex-shrink-0">
                  {renderCard(banner, `mobile-${idx}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop & Tablet View: 2 Cards Side-by-Side with smooth sliding track from right to left */}
          <div className="hidden md:block overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 50}%)` }}
            >
              {[...banners, ...banners].map((banner, idx) => (
                <div key={`${banner.id}-${idx}`} className="w-1/2 flex-shrink-0 px-3">
                  {renderCard(banner, `desktop-${idx}`)}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Slide Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#1e40af]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
