import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ShieldCheck, 
  Clock, 
  Percent, 
  Flame,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { BankLogo } from './BankLogos';

export interface BankOfferSlide {
  id: string;
  bankName: string;
  shortName: string;
  loanType: string;
  interestRate: string;
  rateValue: number;
  maxAmount: string;
  maxTenure: string;
  processingFee: string;
  highlightBadge: string;
  badgeColor: string;
  specialPerk: string;
  bgGradient: string;
  borderColor: string;
}

interface BankOffersSliderProps {
  onOpenApplyModal: (bankName?: string, loanType?: string) => void;
}

export const BANK_SLIDER_OFFERS: BankOfferSlide[] = [
  {
    id: 'sbi-special',
    bankName: 'State Bank of India',
    shortName: 'SBI',
    loanType: 'Festive Home Loan',
    interestRate: 'From 7.10% p.a.',
    rateValue: 7.10,
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: '30 Years',
    processingFee: 'Zero Processing Fee',
    highlightBadge: '🔥 Lowest Gov Rate',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    specialPerk: 'Special 0.05% interest concession for women borrowers & Green buildings',
    bgGradient: 'from-blue-50/90 via-white to-slate-50',
    borderColor: 'border-blue-200 hover:border-blue-400'
  },
  {
    id: 'hdfc-instant',
    bankName: 'HDFC Bank',
    shortName: 'HDFC',
    loanType: 'Express Home & Top-up',
    interestRate: 'From 7.35% p.a.',
    rateValue: 7.35,
    maxAmount: 'Up to ₹25 Crores',
    maxTenure: '30 Years',
    processingFee: 'Flat ₹3,000 Special',
    highlightBadge: '⚡ 24-Hr Sanction',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    specialPerk: 'In-principle digital sanction letter in just 24 hours with doorstep KYC',
    bgGradient: 'from-indigo-50/90 via-white to-slate-50',
    borderColor: 'border-indigo-200 hover:border-indigo-400'
  },
  {
    id: 'axis-shubh',
    bankName: 'Axis Bank',
    shortName: 'Axis Bank',
    loanType: 'Shubh Aarambh Home Loan',
    interestRate: 'From 7.25% p.a.',
    rateValue: 7.25,
    maxAmount: 'Up to ₹15 Crores',
    maxTenure: '30 Years',
    processingFee: '50% Discount on Fee',
    highlightBadge: '🎁 12 EMIs Waived Off',
    badgeColor: 'bg-pink-100 text-[#E81E76] border-pink-200',
    specialPerk: 'Get 12 monthly installments waived off on timely repayments throughout tenure',
    bgGradient: 'from-pink-50/90 via-white to-slate-50',
    borderColor: 'border-pink-200 hover:border-pink-400'
  },
  {
    id: 'icici-express',
    bankName: 'ICICI Bank',
    shortName: 'ICICI Bank',
    loanType: 'Smart Home & Balance Transfer',
    interestRate: 'From 7.30% p.a.',
    rateValue: 7.30,
    maxAmount: 'Up to ₹20 Crores',
    maxTenure: '30 Years',
    processingFee: 'Zero Prepayment Fee',
    highlightBadge: '⭐ 3-Click Sanction',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    specialPerk: 'Instant online pre-approval with zero physical documentation for pre-qualified users',
    bgGradient: 'from-amber-50/90 via-white to-slate-50',
    borderColor: 'border-amber-200 hover:border-amber-400'
  },
  {
    id: 'bob-advantage',
    bankName: 'Bank of Baroda',
    shortName: 'Bank of Baroda',
    loanType: 'Baroda Max Advantage',
    interestRate: 'From 7.15% p.a.',
    rateValue: 7.15,
    maxAmount: 'Up to ₹20 Crores',
    maxTenure: '30 Years',
    processingFee: 'NIL Processing Fee',
    highlightBadge: '💰 Overdraft Linked',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    specialPerk: 'Link your savings account to reduce daily loan interest and withdraw surplus anytime',
    bgGradient: 'from-orange-50/90 via-white to-slate-50',
    borderColor: 'border-orange-200 hover:border-orange-400'
  },
  {
    id: 'canara-housing',
    bankName: 'Canara Bank',
    shortName: 'Canara Bank',
    loanType: 'Canara Housing Loan',
    interestRate: 'From 7.15% p.a.',
    rateValue: 7.15,
    maxAmount: 'Up to ₹15 Crores',
    maxTenure: '30 Years',
    processingFee: 'Min ₹1,500 Only',
    highlightBadge: '💎 90% LTV High Funding',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    specialPerk: 'Highest loan-to-value ratio funding up to 90% of total property purchase cost',
    bgGradient: 'from-cyan-50/90 via-white to-slate-50',
    borderColor: 'border-cyan-200 hover:border-cyan-400'
  },
  {
    id: 'aditya-birla-lap',
    bankName: 'Aditya Birla Capital',
    shortName: 'Aditya Birla',
    loanType: 'Express Loan Against Property',
    interestRate: 'From 8.50% p.a.',
    rateValue: 8.50,
    maxAmount: 'Up to ₹7.5 Crores',
    maxTenure: '15 Years',
    processingFee: '0.50% Flat',
    highlightBadge: '🏢 Commercial & Residential',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    specialPerk: 'Unlock high equity value from residential, commercial or industrial real estate properties',
    bgGradient: 'from-rose-50/90 via-white to-slate-50',
    borderColor: 'border-rose-200 hover:border-rose-400'
  },
  {
    id: 'poonawalla-business',
    bankName: 'Poonawalla Fincorp',
    shortName: 'Poonawalla',
    loanType: 'Instant Business & MSME Growth',
    interestRate: 'From 9.99% p.a.',
    rateValue: 9.99,
    maxAmount: 'Up to ₹50 Lakhs',
    maxTenure: '5 Years',
    processingFee: 'Nominal 1%',
    highlightBadge: '🚀 No Collateral Required',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    specialPerk: '100% paperless digital sanction for business owners with minimum 1-year GST history',
    bgGradient: 'from-emerald-50/90 via-white to-slate-50',
    borderColor: 'border-emerald-200 hover:border-emerald-400'
  }
];

export const BankOffersSlider: React.FC<BankOffersSliderProps> = ({ onOpenApplyModal }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const getScrollDistance = () => {
    return window.innerWidth < 640 ? 210 : 340;
  };

  // Gentle, slow automatic scrolling
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = getScrollDistance();
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 15) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
          setActiveSlideIndex(0);
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
          setActiveSlideIndex(prev => (prev + 1) % BANK_SLIDER_OFFERS.length);
        }
      }
    }, 3800); // Gentle 3.8s cadence for relaxing reading

    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = getScrollDistance();
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveSlideIndex(Math.min(index, BANK_SLIDER_OFFERS.length - 1));
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="bank-offers-slider" 
      className="py-6 sm:py-10 bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 text-white relative overflow-hidden border-y border-slate-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slider Header with Controls */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-6">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[9px] sm:text-xs font-bold uppercase tracking-wider border border-pink-500/30">
                <Flame className="w-3 h-3 text-pink-400 fill-pink-400" />
                <span>Live Bank Deals</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium hidden xs:inline">
                Auto-updated daily
              </span>
            </div>
            <h2 className="text-sm sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
              Exclusive Partner Bank Offers
            </h2>
          </div>

          {/* Interactive Slider Navigation & Play/Pause Controls */}
          <div className="flex items-center gap-1 sm:gap-2 bg-slate-800/80 p-1 rounded-lg sm:rounded-xl border border-slate-700 backdrop-blur-xs flex-shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 sm:p-2 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
              title={isPlaying ? 'Pause sliding' : 'Resume sliding'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <div className="w-[1px] h-3 sm:h-4 bg-slate-700" />
            <button
              onClick={scrollPrev}
              className="p-1 sm:p-2 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Previous Offer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-1 sm:p-2 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Next Offer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Gently Sliding Carousel Container: 2-3 Visible on Mobile */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-4 lg:gap-6 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BANK_SLIDER_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className={`flex-shrink-0 w-[180px] xs:w-[205px] sm:w-[280px] md:w-[330px] snap-start rounded-2xl sm:rounded-3xl bg-gradient-to-b ${offer.bgGradient} text-slate-900 p-3 sm:p-5 border-2 ${offer.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
              id={`offer-card-${offer.id}`}
            >
              {/* Highlight Badge Top */}
              <div className="flex items-start justify-between gap-1.5 mb-2 sm:mb-3">
                <div className="bg-white p-1.5 sm:p-2 rounded-xl shadow-xs border border-slate-100 flex items-center justify-center">
                  <BankLogo name={offer.bankName} size="sm" showText={false} />
                </div>
                <span className={`inline-block px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-extrabold border shadow-2xs truncate max-w-[110px] ${offer.badgeColor}`}>
                  {offer.highlightBadge}
                </span>
              </div>

              {/* Offer Details */}
              <div className="space-y-1.5 sm:space-y-2.5">
                <div>
                  <span className="text-[9px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider block truncate">
                    {offer.loanType}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#E81E76] font-['Outfit',sans-serif]">
                      {offer.interestRate}
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-1 bg-slate-100/90 rounded-xl p-1.5 sm:p-2 text-center border border-slate-200/60">
                  <div className="border-r border-slate-200 pr-0.5">
                    <span className="text-[8px] font-bold text-slate-500 uppercase block">Max</span>
                    <span className="text-[10px] sm:text-xs font-black text-slate-900 font-['Outfit',sans-serif] block truncate">
                      {offer.maxAmount}
                    </span>
                  </div>
                  <div className="border-r border-slate-200 px-0.5">
                    <span className="text-[8px] font-bold text-slate-500 uppercase block">Tenure</span>
                    <span className="text-[10px] sm:text-xs font-black text-slate-900 font-['Outfit',sans-serif] block truncate">
                      {offer.maxTenure}
                    </span>
                  </div>
                  <div className="pl-0.5">
                    <span className="text-[8px] font-bold text-slate-500 uppercase block">Fee</span>
                    <span className="text-[10px] sm:text-xs font-black text-emerald-700 font-['Outfit',sans-serif] block truncate">
                      {offer.processingFee}
                    </span>
                  </div>
                </div>

                {/* Special Perk Description */}
                <div className="flex items-start gap-1 sm:gap-1.5 bg-white/80 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-slate-200/80 text-[9px] sm:text-[11px] text-slate-700">
                  <Gift className="w-3 h-3 text-[#E81E76] flex-shrink-0 mt-0.5" />
                  <p className="line-clamp-1 leading-tight">
                    {offer.specialPerk}
                  </p>
                </div>
              </div>

              {/* Action Button: Claim Offer */}
              <div className="mt-2.5 sm:mt-4 pt-2 border-t border-slate-200/80 flex items-center justify-between gap-1">
                <span className="text-[9px] font-semibold text-slate-500 hidden sm:inline">
                  0 Consultation Fee
                </span>
                <button
                  onClick={() => onOpenApplyModal(offer.bankName, offer.loanType)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E81E76] hover:bg-[#c2145e] text-white font-extrabold text-[10px] sm:text-xs rounded-xl shadow-xs transition-all transform active:scale-95 cursor-pointer"
                  id={`claim-offer-${offer.id}`}
                >
                  <span>Claim</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center gap-1 mt-2.5 sm:mt-4">
          {BANK_SLIDER_OFFERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: idx * getScrollDistance(), behavior: 'smooth' });
                  setActiveSlideIndex(idx);
                }
              }}
              className={`h-1.5 rounded-full transition-all ${
                activeSlideIndex === idx 
                  ? 'w-5 bg-[#E81E76]' 
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
