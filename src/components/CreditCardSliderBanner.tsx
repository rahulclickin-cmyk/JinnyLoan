import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  Plane, 
  Fuel, 
  Gift, 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';

interface CreditCardSliderBannerProps {
  onCheckInstantOffer: () => void;
}

interface CardSlide {
  id: string;
  tag: string;
  tagBg: string;
  title: string;
  highlight: string;
  desc: string;
  stats: Array<{ label: string; val: string }>;
  accentColor: string;
  gradient: string;
  badge: string;
  icon: any;
}

export const CreditCardSliderBanner: React.FC<CreditCardSliderBannerProps> = ({
  onCheckInstantOffer
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: CardSlide[] = [
    {
      id: 'cashback-slide',
      tag: '🔥 Top Cashback Category',
      tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      title: 'Get 5% Direct Cashback on Every Online Order',
      highlight: 'Amazon, Flipkart, Swiggy & Zomato',
      desc: 'Never pay full price again. Auto-credited statement cashbacks every month with zero minimum spend threshold.',
      stats: [
        { label: 'Cashback Rate', val: '5% Flat' },
        { label: 'Annual Savings', val: '₹18,000+' },
        { label: 'Joining Fee', val: '₹0 / LTF' },
        { label: 'Grace Period', val: '50 Days' }
      ],
      accentColor: 'text-emerald-400',
      gradient: 'from-slate-950 via-slate-900 to-emerald-950',
      badge: 'Cashback Special',
      icon: ShoppingBag
    },
    {
      id: 'travel-slide',
      tag: '✈️ Airport Lounge & Travel Special',
      tagBg: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      title: 'Complimentary Airport Lounge Access Nationwide',
      highlight: '8 Free Domestic & Intl Visits',
      desc: 'Relax before your flights with free gourmet buffet, high-speed Wi-Fi, and plush lounge seating at all major Indian airports.',
      stats: [
        { label: 'Lounge Visits', val: '8 / Year' },
        { label: 'Flight Milestone', val: 'Free Ticket' },
        { label: 'Forex Markup', val: 'Low 1.99%' },
        { label: 'Travel Insurance', val: '₹1 Crore' }
      ],
      accentColor: 'text-purple-400',
      gradient: 'from-slate-950 via-indigo-950 to-purple-950',
      badge: 'Travel Privilege',
      icon: Plane
    },
    {
      id: 'fuel-slide',
      tag: '⛽ Fuel Surcharge Waiver',
      tagBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      title: 'Save on Daily Commute with 1% Fuel Surcharge Waiver',
      highlight: 'Valid at HPCL, BPCL & IndianOil',
      desc: 'Commute without extra transaction surcharges at over 30,000 fuel stations nationwide plus earn accelerated points.',
      stats: [
        { label: 'Surcharge Fee', val: '100% Waived' },
        { label: 'Reward Points', val: '4X Points' },
        { label: 'Welcome Bonus', val: '₹500 Voucher' },
        { label: 'Activation', val: 'Instant App' }
      ],
      accentColor: 'text-amber-400',
      gradient: 'from-slate-950 via-neutral-900 to-amber-950',
      badge: 'Commute Saver',
      icon: Fuel
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const slide = slides[currentSlide];
  const IconComp = slide.icon;

  return (
    <div 
      className="mb-10 relative overflow-hidden rounded-3xl text-white shadow-xl border border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient */}
      <div className={`bg-gradient-to-br ${slide.gradient} p-6 sm:p-10 transition-all duration-700 relative`}>
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Text */}
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-xs ${slide.tagBg}`}>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{slide.tag}</span>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Live Special Promotion</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
              {slide.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className={slide.accentColor}>{slide.highlight}:</strong> {slide.desc}
            </p>

            {/* Quick 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {slide.stats.map((st, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xs rounded-xl p-2.5 border border-white/10 text-center sm:text-left">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">{st.label}</span>
                  <span className="text-xs sm:text-sm font-extrabold text-white">{st.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action & Visual Card */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-center gap-4 flex-shrink-0">
            <div className="w-full sm:w-64 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center hidden sm:block">
              <div className="w-12 h-12 rounded-xl bg-white/20 mx-auto flex items-center justify-center mb-2">
                <IconComp className="w-6 h-6 text-yellow-300" />
              </div>
              <span className="text-xs font-bold text-slate-200 block">Featured Promotion</span>
              <span className="text-sm font-black text-white font-['Outfit',sans-serif]">{slide.badge}</span>
            </div>

            <button
              onClick={onCheckInstantOffer}
              className="w-full sm:w-auto lg:w-full px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              id="credit-card-banner-instant-offer-btn"
            >
              <span>Check 5 Instant Card Offers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10 relative z-10 text-xs">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'bg-yellow-300 w-6' : 'bg-white/30 w-2 hover:bg-white/50'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev <= 0 ? slides.length - 1 : prev - 1))}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous card promo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next card promo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
