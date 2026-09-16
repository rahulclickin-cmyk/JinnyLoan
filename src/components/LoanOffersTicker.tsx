import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface LoanOffersTickerProps {
  onOpenApplyModal?: (loanType?: string) => void;
}

export const LoanOffersTicker: React.FC<LoanOffersTickerProps> = ({ onOpenApplyModal }) => {
  const { navigate } = useRouter();

  const offers = [
    {
      id: 'personal',
      badge: 'PERSONAL LOAN',
      badgeColor: 'bg-emerald-500 text-white',
      title: 'Personal Loan starting @ 9.99% p.a.',
      highlight: 'Up to ₹40 Lakhs with 24-Hour Express Disbursal',
      path: '/personal-loan',
      loanType: 'Personal Loan'
    },
    {
      id: 'home',
      badge: 'HOME LOAN',
      badgeColor: 'bg-blue-600 text-white',
      title: 'Home Loan starting @ 7.10% p.a.',
      highlight: 'Up to ₹5 Cr with Zero Foreclosure Fees & PMAY Subsidy',
      path: '/home-loan',
      loanType: 'Home Loan'
    },
    {
      id: 'business',
      badge: 'BUSINESS LOAN',
      badgeColor: 'bg-purple-600 text-white',
      title: 'Business Loan up to ₹50 Lakhs',
      highlight: 'Zero Collateral Required • Approved within 48 Hours',
      path: '/business-loan',
      loanType: 'Business Loan'
    },
    {
      id: 'credit-card',
      badge: 'CREDIT CARDS',
      badgeColor: 'bg-amber-500 text-white',
      title: 'Lifetime Free Credit Cards',
      highlight: 'Up to 5% Unlimited Cashback & Free Airport Lounge Access',
      path: '/credit-card',
      loanType: 'Credit Cards'
    },
    {
      id: 'dsa-agent',
      badge: 'BECOME DSA AGENT',
      badgeColor: 'bg-pink-600 text-white',
      title: 'Earn up to 2.5% Commission as Loan Agent',
      highlight: 'Zero Investment • Instant ID • 100+ Partner Banks Network',
      path: '/loan-agent',
      loanType: 'DSA Partner'
    },
    {
      id: 'instant-cash',
      badge: 'INSTANT CASH',
      badgeColor: 'bg-cyan-600 text-white',
      title: 'Digital Micro Loans from ₹10,000 to ₹5 Lakhs',
      highlight: 'Low CIBIL options available • 100% Paperless e-KYC',
      path: '/personal-loan',
      loanType: 'Personal Loan'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, offers.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const activeOffer = offers[currentIndex];

  const handleOfferClick = () => {
    if (onOpenApplyModal) {
      onOpenApplyModal(activeOffer.loanType);
    } else {
      navigate(activeOffer.path);
    }
  };

  return (
    <div 
      className="bg-slate-900 text-white border-b border-slate-800 text-xs select-none relative z-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="top-loan-offers-ticker"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between gap-2">
        
        {/* Left: Offers Badge Indicator */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            <Tag className="w-3 h-3 animate-pulse" />
            <span className="hidden sm:inline">EXCLUSIVE</span> OFFERS
          </span>
        </div>

        {/* Center: Sliding Offer Text */}
        <div className="flex-1 overflow-hidden min-w-0 flex items-center justify-center">
          <div 
            onClick={handleOfferClick}
            className="flex items-center justify-center gap-2 text-center cursor-pointer group hover:opacity-90 transition-opacity w-full"
            title="Click to apply for this offer"
          >
            <span className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide flex-shrink-0 hidden xs:inline ${activeOffer.badgeColor}`}>
              {activeOffer.badge}
            </span>
            <span className="font-bold text-slate-100 truncate text-[11px] sm:text-xs">
              {activeOffer.title}
            </span>
            <span className="text-slate-400 hidden md:inline text-[11px] truncate">
              — {activeOffer.highlight}
            </span>
            <span className="inline-flex items-center gap-0.5 text-amber-400 group-hover:text-amber-300 font-bold text-[10px] sm:text-xs flex-shrink-0 ml-1 underline decoration-amber-400/50">
              Apply <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Right: Controls & Indicators */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-1 mr-1">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-3.5 bg-amber-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            aria-label="Previous Offer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            {currentIndex + 1}/{offers.length}
          </span>
          <button
            onClick={handleNext}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            aria-label="Next Offer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
