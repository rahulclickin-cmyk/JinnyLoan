import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';
import { BankLogo } from './BankLogos';

interface TrendingOffersSectionProps {
  onOpenApplyModal: (offerName?: string) => void;
}

export const TrendingOffersSection: React.FC<TrendingOffersSectionProps> = ({
  onOpenApplyModal
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const offers = [
    {
      id: 'offer-creditsea',
      partner: 'CreditSea',
      tagline: 'Lending Genie - Always Ready to Help!',
      amount: 'Upto 1 Lakhs',
      rate: 'From 2.00% pm',
      tenure: 'Upto 60 M',
      badge: 'Instant Sanction',
      category: 'Micro Cash & Quick Loan',
      color: 'border-sky-200 hover:border-sky-400',
      badgeStyle: 'bg-sky-100 text-sky-800 border-sky-200'
    },
    {
      id: 'offer-aditya-birla',
      partner: 'Aditya Birla Capital',
      tagline: 'Express Digital Approval Online',
      amount: 'Upto 5 Lakhs',
      rate: 'From 10.49% pa',
      tenure: 'Upto 60 M',
      badge: 'Pre-Approved',
      category: 'Express Personal Loan',
      color: 'border-red-200 hover:border-red-400',
      badgeStyle: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      id: 'offer-sbi',
      partner: 'State Bank of India',
      tagline: 'India\'s Most Trusted Housing Finance',
      amount: 'Upto 5 Crores',
      rate: 'From 7.35% pa',
      tenure: 'Upto 360 M',
      badge: 'Zero Prepayment Fee',
      category: 'Regular Home Loan',
      color: 'border-blue-200 hover:border-blue-400',
      badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'offer-hdfc',
      partner: 'HDFC Bank',
      tagline: 'Special Festive Discount on Processing Fee',
      amount: 'Upto 10 Crores',
      rate: 'From 7.35% pa',
      tenure: 'Upto 360 M',
      badge: 'Instant In-Principle',
      category: 'Reach Home Loan',
      color: 'border-indigo-200 hover:border-indigo-400',
      badgeStyle: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    },
    {
      id: 'offer-icici',
      partner: 'ICICI Bank',
      tagline: 'Speedy Disbursal with Minimal Paperwork',
      amount: 'Upto 5 Crores',
      rate: 'From 7.50% pa',
      tenure: 'Upto 360 M',
      badge: 'Digital Sanction',
      category: 'Home Loan & LAP',
      color: 'border-orange-200 hover:border-orange-400',
      badgeStyle: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      id: 'offer-kotak',
      partner: 'Kotak Mahindra Bank',
      tagline: 'Special Concession for Salaried Women Borrowers',
      amount: 'Upto 7.5 Crores',
      rate: 'From 7.40% pa',
      tenure: 'Upto 300 M',
      badge: '0.05% Women Rebate',
      category: 'Custom Mortgage Plan',
      color: 'border-pink-200 hover:border-pink-400',
      badgeStyle: 'bg-pink-100 text-[#E81E76] border-pink-200'
    }
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Compute active dot
      const cardWidth = window.innerWidth < 640 ? 290 : 360;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveDotIndex(Math.min(index, offers.length - 1));
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const distance = window.innerWidth < 640 ? 290 : 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  const scrollToDot = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 640 ? 290 : 360;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setActiveDotIndex(index);
    }
  };

  return (
    <section id="trending-offers" className="py-6 sm:py-12 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header with Left-to-Right Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5">
              <Flame className="w-3 h-3 fill-current" />
              <span>Exclusive Deals</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-extrabold text-[#1e3a8a] font-['Outfit',sans-serif] tracking-tight">
              Trending Offers
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-500 mt-0.5">
              Instant digital approvals and curated sanction offers from top institutional partners
            </p>
          </div>

          {/* Left / Right Carousel Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous trending offers"
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
              aria-label="Next trending offers"
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

        {/* Horizontal Left-to-Right Row / Slider */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 px-0.5 scrollbar-none"
        >
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`w-[270px] sm:w-[340px] md:w-[360px] flex-shrink-0 snap-start bg-white rounded-2xl border-2 ${offer.color} p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
              id={offer.id}
            >
              {/* Card Header with Partner Logo & Badge */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#E81E76] block truncate">
                    {offer.tagline}
                  </span>
                  <div className="mt-1 h-7 flex items-center">
                    <BankLogo name={offer.partner} size="sm" showText={true} />
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold border flex-shrink-0 whitespace-nowrap ${offer.badgeStyle}`}>
                  {offer.badge}
                </span>
              </div>

              {/* 3 Metric Columns: Amount, Int. Rate, Tenure */}
              <div className="grid grid-cols-3 gap-2 py-3 my-2 text-center bg-slate-50/90 rounded-xl px-1.5 border border-slate-100">
                <div className="border-r border-slate-200/80">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">Amount</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-['Outfit',sans-serif] block truncate">
                    {offer.amount}
                  </span>
                </div>

                <div className="border-r border-slate-200/80">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">Int. Rate</span>
                  <span className="text-xs sm:text-sm font-black text-[#E81E76] font-['Outfit',sans-serif] block truncate">
                    {offer.rate}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 block uppercase">Tenure</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-['Outfit',sans-serif] block truncate">
                    {offer.tenure}
                  </span>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 truncate">
                  {offer.category}
                </span>
                <button
                  onClick={() => onOpenApplyModal(`${offer.partner} - ${offer.category}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer group-hover:bg-[#E81E76] flex-shrink-0"
                  id={`apply-btn-${offer.id}`}
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {offers.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeDotIndex === i 
                  ? 'w-6 bg-[#E81E76]' 
                  : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

