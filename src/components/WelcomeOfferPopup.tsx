import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Percent, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface WelcomeOfferPopupProps {
  onOpenApplyModal: (loanType?: string) => void;
}

const STORAGE_KEY = 'jinnyloan_welcome_popup_dismissed_v1';

export const WelcomeOfferPopup: React.FC<WelcomeOfferPopupProps> = ({ onOpenApplyModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if previously dismissed on this computer / browser
    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY);
      if (isDismissed === 'true') {
        return; // Never show again on refresh or revisit
      }
    } catch {
      // LocalStorage access restricted (e.g. private browsing)
    }

    // Display after brief 1.2s delay for pleasant entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // In case localStorage is blocked
    }
    setIsVisible(false);
  };

  const handleClaimOffer = (loanType: string = 'Personal Loan') => {
    handleDismiss();
    onOpenApplyModal(loanType);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      id="welcome-offer-modal"
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Gradient Header */}
        <div className="bg-gradient-to-r from-[#E81E76] via-[#c2185b] to-[#1e40af] text-white p-5 sm:p-6 relative">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close popup"
            id="close-welcome-popup-btn"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Special Loan Advisory & Notice
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif] leading-tight">
            Exclusive Pre-Approved Loan Offers
          </h3>
          <p className="text-xs sm:text-sm text-pink-100 mt-1 font-medium">
            RBI-Regulated Bank Partners • Lowest Interest Rates Guaranteed
          </p>
        </div>

        {/* Modal Body & Instructions */}
        <div className="p-5 sm:p-6 space-y-4 text-slate-700 text-xs sm:text-sm">
          
          {/* Important Notice Alert Box */}
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-2.5 text-amber-900 text-xs leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Fraud Prevention Advisory:</strong> JinnyLoan never charges any advance processing fees, registration charges, or cash commission. All our financial comparison and loan application services are 100% free of charge.
            </div>
          </div>

          {/* Key Loan Benefits / Offers */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-pink-50/50 rounded-xl border border-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  Personal Loans from 9.99% p.a.
                </p>
                <p className="text-[11px] text-slate-500">
                  Instant digital sanction up to ₹40 Lakhs with 24-hr disbursal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-pink-50/50 rounded-xl border border-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  Business Loans up to ₹50 Lakhs
                </p>
                <p className="text-[11px] text-slate-500">
                  Zero collateral required • Direct approval for MSMEs & traders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-pink-50/50 rounded-xl border border-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-xs sm:text-sm">
                  100+ Verified RBI-Approved Partners
                </p>
                <p className="text-[11px] text-slate-500">
                  SBI, HDFC, ICICI, Poonawalla, mPokket, Hero Fincorp, Moneyview & more
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => handleClaimOffer('Personal Loan')}
              className="flex-1 bg-gradient-to-r from-[#E81E76] to-[#1e40af] hover:from-[#d01566] hover:to-[#17338e] text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm active:scale-95"
              id="popup-claim-offer-btn"
            >
              <span>Check Pre-Approved Offers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer text-xs sm:text-sm text-center"
              id="popup-dismiss-btn"
            >
              Don't Show Again
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            *This notice will not appear again on this device after dismissal.
          </p>

        </div>
      </div>
    </div>
  );
};
