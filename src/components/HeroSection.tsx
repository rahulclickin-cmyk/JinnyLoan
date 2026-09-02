import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Building,
  TrendingDown,
  Coins
} from 'lucide-react';
import { JinnyLogo } from './JinnyLogo';
import { BankLogo } from './BankLogos';

interface HeroSectionProps {
  onOpenApplyModal: (loanType?: string) => void;
  onNavigateToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApplyModal,
  onNavigateToCalculator
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-14 border-b border-slate-200">
      
      {/* Background soft ambient blurs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Hero Titles matching WordPress Screenshot */}
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-8 space-y-1.5 sm:space-y-3">
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-['Outfit',sans-serif]">
            Your Trusted Marketplace for{' '}
            <span className="text-[#1e40af]">Financial Solutions</span>
          </h1>

          <p className="text-xs sm:text-base md:text-lg font-bold text-[#E81E76]">
            Instant Online Loans — Personal, Business & Fast Approval at JinnyLoan
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-semibold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#1e40af]" />
            <span><strong className="text-slate-900">24 hrs</strong> Avg loan processing time</span>
          </div>
        </div>

        {/* Dual Visual Feature Banners: 2 Columns Side-by-Side on Both Mobile & Desktop */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* Left Card: Blue App Mockup & ₹10 Lakh Direct Disbursal */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0f2868] via-[#1e40af] to-[#2563eb] text-white p-3 sm:p-6 md:p-8 shadow-xl shadow-blue-900/10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background circle */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 sm:w-60 h-40 sm:h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/15">
                <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white backdrop-blur-xs">
                  Direct Bank Credit
                </span>
                <span className="text-[9px] sm:text-xs font-semibold text-blue-200 hidden xs:inline">
                  Paperless KYC
                </span>
              </div>

              {/* Main Titles */}
              <div className="my-2.5 sm:my-5">
                <h2 className="text-sm sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
                  Get Loans up to <br className="hidden sm:inline" />
                  <span className="text-yellow-300">₹10 Lakh</span>
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-blue-100 font-medium mt-0.5 line-clamp-2">
                  Disbursed directly into bank account in 24 hrs
                </p>
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-white/10 backdrop-blur-xs rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-white/20 mb-2.5 sm:mb-5">
                <div className="text-[9px] sm:text-xs font-bold text-blue-200 uppercase tracking-wider mb-1.5">
                  Minimal Docs
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 text-[10px] sm:text-xs font-bold text-white">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Aadhar Card</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>PAN Card</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Income Proof</span>
                  </div>
                </div>
              </div>

              {/* Quick Loan Amount Slabs */}
              <div className="space-y-1.5 mb-3 sm:mb-5">
                <div className="text-[9px] sm:text-xs font-bold text-blue-200">
                  Quick Amount:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                  {['₹50K', '₹1 Lakh', '₹5 Lakh', '₹10 Lakh'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => onOpenApplyModal(`Personal Loan - ${amt}`)}
                      className="py-1 sm:py-2 px-1 sm:px-2 bg-white/15 hover:bg-white text-white hover:text-[#1e40af] border border-white/30 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center truncate"
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 sm:pt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <span className="text-[9px] sm:text-xs text-blue-200 hidden sm:inline">
                100% Digital
              </span>
              <button
                onClick={() => onOpenApplyModal('₹10 Lakh Instant Disbursal')}
                className="w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 bg-white text-[#1e40af] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-[11px] sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                id="hero-apply-left-card"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Card: Magenta JinnyLoan Multi-Lender Card (₹7 Lakhs & Multiple Lenders) */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#a30948] via-[#e11d6e] to-[#ff4b82] text-white p-3 sm:p-6 md:p-8 shadow-xl shadow-pink-900/10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-40 sm:w-60 h-40 sm:h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Card Header with JinnyLogo white variant */}
              <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-white/20">
                <JinnyLogo size="sm" variant="white" />
                <div className="flex items-center gap-1 text-[9px] sm:text-xs font-bold bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-xs">
                  <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                  <span>Match</span>
                </div>
              </div>

              {/* Title */}
              <div className="my-2.5 sm:my-5">
                <h2 className="text-sm sm:text-2xl md:text-3xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight">
                  Loans from Lenders <br className="hidden sm:inline" />
                  <span className="text-yellow-300">Upto ₹7 Lakhs</span>
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-pink-100 font-medium mt-0.5 line-clamp-2">
                  Single application sent to 30+ top lenders
                </p>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 mb-2.5 sm:mb-5">
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs p-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/20">
                  <Zap className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-yellow-300 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] sm:text-xs font-black block leading-none">Fast Disbursal</span>
                    <span className="text-[8px] sm:text-[10px] text-pink-200">Direct credit</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs p-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/20">
                  <CheckCircle2 className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-emerald-300 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] sm:text-xs font-black block leading-none">Instant Sanction</span>
                    <span className="text-[8px] sm:text-[10px] text-pink-200">Paperless</span>
                  </div>
                </div>
              </div>

              {/* Lending Partners Grid */}
              <div className="space-y-1.5 mb-3 sm:mb-5">
                <div className="text-[9px] sm:text-xs font-bold text-pink-200">
                  Top Partners:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                  {['Moneyview', 'Poonawalla', 'KreditBee', 'L&T Fin'].map((partner) => (
                    <div
                      key={partner}
                      className="py-1 sm:py-2 px-1 bg-white text-slate-800 rounded-lg sm:rounded-xl text-center text-[9px] sm:text-xs font-bold shadow-2xs truncate"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 sm:pt-4 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              <span className="text-[9px] sm:text-xs text-pink-100 font-medium hidden sm:inline">
                jinnyloan.com
              </span>
              <button
                onClick={() => onOpenApplyModal('Multiple Lender ₹7 Lakhs')}
                className="w-full sm:w-auto px-3 sm:px-6 py-2 sm:py-3 bg-white text-[#E81E76] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-[11px] sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                id="hero-apply-right-card"
              >
                <span>Get Offer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
