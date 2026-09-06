import React, { useRef, useState, useEffect } from 'react';
import { 
  Gift, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  Percent,
  Flame
} from 'lucide-react';
import { CreditCardVisual } from './CreditCardVisual';

export interface RewardBannerItem {
  id: string;
  promotionalAmount: string;
  badgeLabel: string;
  title: string;
  messaging: string;
  cardName: string;
  bankName: string;
  cardGradient: string;
  network: 'visa' | 'mastercard' | 'rupay';
  bannerGradient: string;
  borderColor: string;
  tcText: string;
  ctaText: string;
}

interface MoreRewardsOnCardsSectionProps {
  onOpenApplyModal: (rewardName?: string) => void;
}

const REWARD_BANNERS: RewardBannerItem[] = [
  {
    id: 'reward-voucher',
    promotionalAmount: '₹1,500 Gift Voucher',
    badgeLabel: 'WELCOME PERK',
    title: 'Flat ₹1,500 E-Gift Voucher',
    messaging: 'Get an assured ₹1,500 Amazon or Flipkart gift voucher on your first card retail swipe within 30 days.',
    cardName: 'Millennia Platinum',
    bankName: 'HDFC Bank',
    cardGradient: 'bg-gradient-to-tr from-[#002f6c] via-[#004c8f] to-[#1e3a8a]',
    network: 'visa',
    bannerGradient: 'from-blue-50/90 via-indigo-50/50 to-white',
    borderColor: 'border-blue-200 hover:border-blue-400',
    tcText: '*T&C apply. Minimum spend of ₹1,500 within 30 days of card issuance.',
    ctaText: 'Apply Now'
  },
  {
    id: 'reward-cashback',
    promotionalAmount: 'Flat 5% Cashback',
    badgeLabel: 'DAILY SAVINGS',
    title: '5% Unlimited Food & Dining',
    messaging: 'Earn direct 5% cashback on Swiggy, Zomato, Blinkit, and weekend grocery shopping with zero cap.',
    cardName: 'ACE Cashback',
    bankName: 'Axis Bank',
    cardGradient: 'bg-gradient-to-tr from-[#54021e] via-[#97144D] to-[#380214]',
    network: 'visa',
    bannerGradient: 'from-pink-50/90 via-rose-50/50 to-white',
    borderColor: 'border-pink-200 hover:border-pink-400',
    tcText: '*T&C apply. Monthly statement credit. Valid across all verified online merchants.',
    ctaText: 'Apply Now'
  },
  {
    id: 'reward-fuel-travel',
    promotionalAmount: 'Save ₹4,500/Year',
    badgeLabel: 'TRAVEL & FUEL',
    title: '1% Fuel Surcharge + Airport Lounge',
    messaging: '1% fuel surcharge waiver across all Indian petrol pumps + 4 complimentary domestic airport lounge visits.',
    cardName: 'SimplyCLICK Travel',
    bankName: 'SBI Card',
    cardGradient: 'bg-gradient-to-tr from-[#003756] via-[#0080BD] to-[#01253a]',
    network: 'visa',
    bannerGradient: 'from-emerald-50/90 via-teal-50/50 to-white',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    tcText: '*T&C apply. Fuel waiver on transactions between ₹400 and ₹5,000 nationwide.',
    ctaText: 'Apply Now'
  }
];

export const MoreRewardsOnCardsSection: React.FC<MoreRewardsOnCardsSectionProps> = ({
  onOpenApplyModal
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const distance = window.innerWidth < 640 ? 300 : 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section id="more-rewards" className="py-6 sm:py-12 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5">
              <Gift className="w-3 h-3" />
              <span>Special Perks</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
              More Rewards on Cards
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
              Maximize your savings with welcome vouchers, airport lounge access & fuel waivers
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous reward offers"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs' 
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next reward offers"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs' 
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally Arranged Promotional Cards / Banners */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-0.5 scrollbar-none"
        >
          {REWARD_BANNERS.map((banner) => (
            <div
              key={banner.id}
              id={`reward-card-${banner.id}`}
              className={`w-[280px] sm:w-[350px] md:w-[380px] flex-shrink-0 snap-start bg-gradient-to-br ${banner.bannerGradient} rounded-2xl border-2 ${banner.borderColor} p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Top Badge & Promotional Amount */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-[#1e40af] text-white">
                    {banner.badgeLabel}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#E81E76] font-['Outfit',sans-serif]">
                    {banner.promotionalAmount}
                  </span>
                </div>

                {/* Card Visual & Messaging Layout */}
                <div className="flex items-start gap-3 sm:gap-4 my-2">
                  {/* Miniature Credit Card Visual */}
                  <div className="w-24 sm:w-28 flex-shrink-0 transform group-hover:scale-105 transition-transform">
                    <CreditCardVisual 
                      cardName={banner.cardName}
                      bankName={banner.bankName}
                      gradient={banner.cardGradient}
                      network={banner.network}
                      className="shadow-sm"
                    />
                  </div>

                  {/* Messaging */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-['Outfit',sans-serif] leading-tight group-hover:text-[#1e40af] transition-colors">
                      {banner.title}
                    </h3>
                    <p className="mt-1 text-[10px] sm:text-xs text-slate-600 leading-snug">
                      {banner.messaging}
                    </p>
                  </div>
                </div>

                {/* Small T&C text */}
                <p className="text-[9px] sm:text-[10px] text-slate-400 mt-2 italic leading-tight">
                  {banner.tcText}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-3.5 mt-2 border-t border-slate-200/70">
                <button
                  onClick={() => onOpenApplyModal(`${banner.title} - ${banner.promotionalAmount}`)}
                  className="w-full py-2 sm:py-2.5 px-4 bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer group-hover:bg-[#E81E76]"
                  id={`btn-apply-reward-${banner.id}`}
                >
                  <span>{banner.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
