import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Flame, 
  Calculator, 
  Building2, 
  Sparkles, 
  PhoneCall, 
  MessageSquare, 
  Share2,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenApplyModal: (loanType?: string) => void;
  onOpenContactModal: () => void;
  onOpenAboutModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenApplyModal,
  onOpenContactModal,
  onOpenAboutModal
}) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll detection to highlight active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const offersEl = document.getElementById('bank-offers-slider');
      const calcEl = document.getElementById('calculator');
      const banksEl = document.getElementById('bank-comparison');

      if (banksEl && scrollPos >= banksEl.offsetTop) {
        setActiveTab('banks');
      } else if (calcEl && scrollPos >= calcEl.offsetTop) {
        setActiveTab('calculator');
      } else if (offersEl && scrollPos >= offersEl.offsetTop) {
        setActiveTab('offers');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'JinnyLoan - Compare & Apply for Loans at 7.10% p.a.',
      text: 'Check your loan eligibility and compare 30+ top banks on JinnyLoan with instant approval & zero foreclosure fee!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Toast Notification for Mobile */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Strip for Mobile (Call & WhatsApp Fast Action) */}
      <div className="md:hidden fixed bottom-[72px] right-3 z-40 flex flex-col gap-2 items-end pointer-events-auto">
        <button
          onClick={handleShareApp}
          className="w-10 h-10 rounded-full bg-white/95 text-slate-700 shadow-lg border border-slate-200 flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Share App Link"
          id="mobile-quick-share"
        >
          <Share2 className="w-4 h-4 text-[#1e40af]" />
        </button>

        <a
          href="https://wa.me/918006488006?text=Hi%20JinnyLoan,%20I%20want%20to%20apply%20for%20a%20loan%20at%20best%20interest%20rates."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#22c55e] text-white px-3 py-2 rounded-full shadow-lg shadow-green-600/30 active:scale-95 transition-transform text-xs font-bold"
          id="mobile-quick-whatsapp"
        >
          <MessageSquare className="w-4 h-4 fill-white/20" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Fixed Native App Bottom Navigation Dock */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="grid grid-cols-5 items-center justify-between text-center relative max-w-md mx-auto">
          
          {/* 1. Home */}
          <button
            onClick={() => scrollToSection('top', 'home')}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
              activeTab === 'home' ? 'text-[#E81E76]' : 'text-slate-500 hover:text-slate-800'
            }`}
            id="mobile-nav-home"
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-pink-50' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Home</span>
          </button>

          {/* 2. Offers */}
          <button
            onClick={() => scrollToSection('bank-offers-slider', 'offers')}
            className={`flex flex-col items-center justify-center py-1 relative transition-all active:scale-90 ${
              activeTab === 'offers' ? 'text-[#E81E76]' : 'text-slate-500 hover:text-slate-800'
            }`}
            id="mobile-nav-offers"
          >
            <span className="absolute -top-1 right-2 bg-[#E81E76] text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
              HOT
            </span>
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'offers' ? 'bg-pink-50' : ''}`}>
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Offers</span>
          </button>

          {/* 3. Central Prominent Apply Button (Elevated Circle) */}
          <div className="flex flex-col items-center justify-center -mt-6">
            <button
              onClick={() => onOpenApplyModal('Mobile App Instant Apply')}
              className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#E81E76] via-[#f03b87] to-[#ff659b] text-white flex items-center justify-center shadow-lg shadow-pink-500/40 border-4 border-white active:scale-90 transition-transform cursor-pointer group"
              id="mobile-nav-apply-center"
              aria-label="Instant Loan Application"
            >
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin-slow" />
            </button>
            <span className="text-[10px] font-extrabold text-[#E81E76] tracking-tight mt-0.5">Apply</span>
          </div>

          {/* 4. Calculator */}
          <button
            onClick={() => scrollToSection('calculator', 'calculator')}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
              activeTab === 'calculator' ? 'text-[#E81E76]' : 'text-slate-500 hover:text-slate-800'
            }`}
            id="mobile-nav-calc"
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'calculator' ? 'bg-pink-50' : ''}`}>
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">EMI Calc</span>
          </button>

          {/* 5. Banks / Compare */}
          <button
            onClick={() => scrollToSection('bank-comparison', 'banks')}
            className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
              activeTab === 'banks' ? 'text-[#E81E76]' : 'text-slate-500 hover:text-slate-800'
            }`}
            id="mobile-nav-banks"
          >
            <div className={`p-1 rounded-xl transition-colors ${activeTab === 'banks' ? 'bg-pink-50' : ''}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5">Banks</span>
          </button>

        </div>
      </nav>
    </>
  );
};
