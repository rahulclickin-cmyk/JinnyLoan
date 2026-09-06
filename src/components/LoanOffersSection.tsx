import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { BankLogo } from './BankLogos';

export interface LoanOfferItem {
  id: string;
  lender: string;
  tagline: string;
  badge: string;
  badgeType: 'fast' | 'preapproved' | 'sanction';
  amount: string;
  interestRate: string;
  tenure: string;
  accentColor: string;
  bgLight: string;
}

interface LoanOffersSectionProps {
  onOpenApplyModal: (offerInfo?: string) => void;
}

const LOAN_OFFERS: LoanOfferItem[] = [
  {
    id: 'loan-creditsea',
    lender: 'CreditSea',
    tagline: 'Instant Micro Cash',
    badge: 'Fast Disbursal',
    badgeType: 'fast',
    amount: 'Amount upto ₹1 Lakhs',
    interestRate: 'Int. rate 2.00%',
    tenure: 'Upto 12m',
    accentColor: 'border-sky-200 hover:border-sky-400',
    bgLight: 'from-sky-50/50 to-white'
  },
  {
    id: 'loan-aditya-birla',
    lender: 'Aditya Birla Capital',
    tagline: 'Express Personal Loan',
    badge: 'Fast Disbursal',
    badgeType: 'fast',
    amount: 'Amount upto ₹5 Lakhs',
    interestRate: 'Int. rate 10.49%',
    tenure: 'Upto 36m',
    accentColor: 'border-red-200 hover:border-red-400',
    bgLight: 'from-red-50/40 to-white'
  },
  {
    id: 'loan-poonawalla',
    lender: 'Poonawalla Fincorp',
    tagline: 'Instant Cash Loan',
    badge: 'Instant Sanction',
    badgeType: 'sanction',
    amount: 'Amount upto ₹30 Lakhs',
    interestRate: 'Int. rate 9.99%',
    tenure: 'Upto 60m',
    accentColor: 'border-emerald-200 hover:border-emerald-400',
    bgLight: 'from-emerald-50/40 to-white'
  },
  {
    id: 'loan-tata-capital',
    lender: 'Tata Capital',
    tagline: 'Quick Disbursal Loan',
    badge: 'Fast Disbursal',
    badgeType: 'fast',
    amount: 'Amount upto ₹15 Lakhs',
    interestRate: 'Int. rate 10.99%',
    tenure: 'Upto 48m',
    accentColor: 'border-blue-200 hover:border-blue-400',
    bgLight: 'from-blue-50/40 to-white'
  },
  {
    id: 'loan-hdfc',
    lender: 'HDFC Bank',
    tagline: 'Pre-Approved Salaried',
    badge: 'Pre-Approved',
    badgeType: 'preapproved',
    amount: 'Amount upto ₹40 Lakhs',
    interestRate: 'Int. rate 10.50%',
    tenure: 'Upto 60m',
    accentColor: 'border-indigo-200 hover:border-indigo-400',
    bgLight: 'from-indigo-50/40 to-white'
  },
  {
    id: 'loan-icici',
    lender: 'ICICI Bank',
    tagline: 'Paperless Digital Sanction',
    badge: 'Instant Sanction',
    badgeType: 'sanction',
    amount: 'Amount upto ₹25 Lakhs',
    interestRate: 'Int. rate 10.65%',
    tenure: 'Upto 60m',
    accentColor: 'border-amber-200 hover:border-amber-400',
    bgLight: 'from-amber-50/40 to-white'
  }
];

export const LoanOffersSection: React.FC<LoanOffersSectionProps> = ({
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

  const getBadgeStyle = (badgeType: string) => {
    switch (badgeType) {
      case 'fast':
        return 'bg-pink-100 text-[#E81E76] border-pink-200';
      case 'preapproved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sanction':
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <section id="loan-offers" className="py-6 sm:py-12 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5">
              <Zap className="w-3 h-3 fill-current" />
              <span>Instant Approvals</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
              Loan Offers
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
              Pre-qualified digital loans with lightning-fast sanction & minimal paperwork
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous loan offers"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-xs' 
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next loan offers"
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight 
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-xs' 
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Left-to-Right Offers Scroll Track */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-0.5 scrollbar-none"
        >
          {LOAN_OFFERS.map((offer) => (
            <div
              key={offer.id}
              id={`loan-offer-${offer.id}`}
              className={`w-[260px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start bg-gradient-to-b ${offer.bgLight} rounded-2xl border-2 ${offer.accentColor} p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
            >
              {/* Card Header: Bank Logo + Badge */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block truncate">
                      {offer.tagline}
                    </span>
                    <div className="mt-1 h-7 flex items-center">
                      <BankLogo name={offer.lender} size="sm" showText={true} />
                    </div>
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold border flex-shrink-0 whitespace-nowrap ${getBadgeStyle(offer.badgeType)}`}>
                    {offer.badge}
                  </span>
                </div>

                {/* 3 Metric Points matching screenshot reference */}
                <div className="bg-white/95 rounded-xl border border-slate-200/80 p-3 space-y-1.5 my-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">Max Quantum</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                      {offer.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">Interest</span>
                    <span className="text-xs sm:text-sm font-bold text-[#E81E76] font-['Outfit',sans-serif]">
                      {offer.interestRate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 font-medium">Tenure</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 font-['Outfit',sans-serif]">
                      {offer.tenure}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary CTA: "Check Eligibility" */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenApplyModal(`${offer.lender} - ${offer.tagline}`)}
                  className="w-full py-2.5 sm:py-3 px-4 bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer group-hover:bg-[#E81E76]"
                  id={`btn-check-eligibility-${offer.id}`}
                >
                  <span>Check Eligibility</span>
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
