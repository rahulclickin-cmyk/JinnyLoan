import React, { useRef, useState, useEffect } from 'react';
import { 
  CreditCard, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Gift,
  CheckCircle2
} from 'lucide-react';
import { CreditCardVisual } from './CreditCardVisual';

export interface CreditCardItem {
  id: string;
  title: string;
  bank: string;
  promoted?: boolean;
  badge?: string;
  benefitText: string;
  annualFee: string;
  bestFor: string;
  network: 'visa' | 'mastercard' | 'rupay';
  gradient: string;
  chipColor?: string;
}

interface ExploreCreditCardsSectionProps {
  onOpenApplyModal: (cardName?: string) => void;
}

const CREDIT_CARDS: CreditCardItem[] = [
  {
    id: 'hdfc-millennia',
    title: 'HDFC Millennia Credit Card',
    bank: 'HDFC Bank',
    promoted: true,
    badge: 'PROMOTED',
    benefitText: '5% Cashback on Amazon, Flipkart, Myntra, Swiggy & Zomato spends.',
    annualFee: '₹1,000 (Waived on ₹1L spend)',
    bestFor: 'Shopping & Dining',
    network: 'visa',
    gradient: 'bg-gradient-to-tr from-[#002f6c] via-[#004c8f] to-[#1e3a8a]',
    chipColor: '#fcd34d'
  },
  {
    id: 'axis-ace',
    title: 'Axis Bank ACE Credit Card',
    bank: 'Axis Bank',
    promoted: false,
    badge: 'BEST CASHBACK',
    benefitText: '2% Unlimited Cashback on all spends & 5% on Google Pay Bill Payments.',
    annualFee: '₹499 (Waived on ₹10k spend in 45d)',
    bestFor: 'Utility & Bills',
    network: 'visa',
    gradient: 'bg-gradient-to-tr from-[#54021e] via-[#97144D] to-[#380214]',
    chipColor: '#fef08a'
  },
  {
    id: 'sbi-simplyclick',
    title: 'SBI SimplyCLICK Credit Card',
    bank: 'State Bank of India',
    promoted: true,
    badge: 'PROMOTED',
    benefitText: '10X Reward Points on partner online shopping + ₹500 Amazon Gift Voucher.',
    annualFee: '₹499 (Reversed on ₹1L spend)',
    bestFor: 'Online Spends',
    network: 'visa',
    gradient: 'bg-gradient-to-tr from-[#003756] via-[#0080BD] to-[#01253a]',
    chipColor: '#e2e8f0'
  },
  {
    id: 'icici-amazon-pay',
    title: 'Amazon Pay ICICI Card',
    bank: 'ICICI Bank',
    promoted: false,
    badge: 'LIFETIME FREE',
    benefitText: 'Lifetime Free card with 5% Unlimited Cashback on Amazon Prime purchases.',
    annualFee: '₹0 (Zero Joining & Annual Fee)',
    bestFor: 'Amazon & Travel',
    network: 'visa',
    gradient: 'bg-gradient-to-tr from-[#18181b] via-[#27272a] to-[#09090b]',
    chipColor: '#fbbf24'
  },
  {
    id: 'kotak-league',
    title: 'Kotak League Platinum Card',
    bank: 'Kotak Mahindra Bank',
    promoted: false,
    badge: 'REWARD SPECIAL',
    benefitText: '8X Reward Points on apparel, travel & 4 free PVR movie tickets every quarter.',
    annualFee: '₹500 (Free for salary account)',
    bestFor: 'Movies & Apparel',
    network: 'rupay',
    gradient: 'bg-gradient-to-tr from-[#7f1d1d] via-[#ED1C24] to-[#450a0a]',
    chipColor: '#fef08a'
  }
];

export const ExploreCreditCardsSection: React.FC<ExploreCreditCardsSectionProps> = ({
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
      const distance = window.innerWidth < 640 ? 280 : 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section id="credit-cards" className="py-6 sm:py-12 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1e40af] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5">
              <CreditCard className="w-3 h-3" />
              <span>Lifestyle & Rewards</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
              Explore Credit Cards
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
              Apply for India's best cashback, airport lounge, and lifetime-free credit cards
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous credit cards"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs' 
                  : 'bg-slate-200/60 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next credit cards"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs' 
                  : 'bg-slate-200/60 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Left-to-Right Credit Cards Track */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-0.5 scrollbar-none"
        >
          {CREDIT_CARDS.map((card) => (
            <div
              key={card.id}
              id={`credit-card-${card.id}`}
              className="w-[260px] sm:w-[320px] md:w-[330px] flex-shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {card.bank}
                  </span>
                  
                  {card.promoted ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                      {card.badge}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Card Visual / Image representation */}
                <div className="mb-4 transform group-hover:scale-[1.02] transition-transform duration-300">
                  <CreditCardVisual 
                    cardName={card.title}
                    bankName={card.bank}
                    gradient={card.gradient}
                    network={card.network}
                    chipColor={card.chipColor}
                  />
                </div>

                {/* Card Title */}
                <h3 className="text-xs sm:text-base font-bold text-slate-900 font-['Outfit',sans-serif] group-hover:text-[#1e40af] transition-colors leading-snug">
                  {card.title}
                </h3>

                {/* Short Benefit / Reward Text */}
                <p className="mt-1.5 text-[10px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {card.benefitText}
                </p>

                {/* Meta details */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px]">
                  <span className="text-slate-400 font-medium">Fee:</span>
                  <span className="font-semibold text-slate-700 text-right truncate max-w-[170px]">
                    {card.annualFee}
                  </span>
                </div>
              </div>

              {/* CTA Button: "Get now" */}
              <div className="pt-4">
                <button
                  onClick={() => onOpenApplyModal(`Credit Card - ${card.title}`)}
                  className="w-full py-2 sm:py-2.5 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
                  id={`btn-get-now-${card.id}`}
                >
                  <span>Get now</span>
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
