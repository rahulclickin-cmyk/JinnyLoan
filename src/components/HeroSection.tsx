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
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-3">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight font-['Outfit',sans-serif]">
            Your Trusted Marketplace for{' '}
            <span className="text-[#1e40af]">Financial Solutions</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-bold text-[#E81E76]">
            Instant Online Loans — Personal, Business & Fast Approval at JinnyLoan
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs">
            <Clock className="w-4 h-4 text-[#1e40af]" />
            <span><strong className="text-slate-900">24 hrs</strong> Avg loan processing time</span>
          </div>
        </div>

        {/* Dual Visual Feature Banners (Matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Card: Blue App Mockup & ₹10 Lakh Direct Disbursal */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0f2868] via-[#1e40af] to-[#2563eb] text-white p-6 sm:p-8 shadow-xl shadow-blue-900/10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background circle */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-xs">
                  Direct Bank Credit
                </span>
                <span className="text-xs font-semibold text-blue-200">
                  Paperless KYC
                </span>
              </div>

              {/* Main Titles */}
              <div className="my-5">
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight">
                  Get Loans up to <span className="text-yellow-300">₹10 Lakh</span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
                  Disbursed directly into your bank account within 24 hours
                </p>
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/20 mb-6">
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">
                  Minimal Documentation Required
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold text-white">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Aadhar Card</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Pan Card</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Income Proof</span>
                  </div>
                </div>
              </div>

              {/* Quick Loan Amount Slabs */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-blue-200">
                  Select Quick Loan Amount:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['₹50,000', '₹1 Lakh', '₹5 Lakh', '₹10 Lakh'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => onOpenApplyModal(`Personal Loan - ${amt}`)}
                      className="py-2 px-3 bg-white/15 hover:bg-white text-white hover:text-[#1e40af] border border-white/30 rounded-xl text-xs font-bold transition-all text-center"
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
              <span className="text-xs text-blue-200">
                100% Secure Digital Process
              </span>
              <button
                onClick={() => onOpenApplyModal('₹10 Lakh Instant Disbursal')}
                className="px-6 py-3 bg-white text-[#1e40af] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                id="hero-apply-left-card"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Card: Magenta JinnyLoan Multi-Lender Card (₹7 Lakhs & Multiple Lenders) */}
          <div className="rounded-3xl bg-gradient-to-br from-[#a30948] via-[#e11d6e] to-[#ff4b82] text-white p-6 sm:p-8 shadow-xl shadow-pink-900/10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-60 h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Card Header with JinnyLogo white variant */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <JinnyLogo size="sm" variant="white" />
                <div className="flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
                  <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span>Instant Match</span>
                </div>
              </div>

              {/* Title */}
              <div className="my-5">
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] tracking-tight">
                  Get Loans from Multiple lenders <br />
                  <span className="text-yellow-300">Upto ₹7 Lakhs</span>
                </h2>
                <p className="text-xs sm:text-sm text-pink-100 font-medium mt-1">
                  Single application sent to 30+ top lenders for guaranteed best approval
                </p>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs p-3 rounded-xl border border-white/20">
                  <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-black block">Quick Disbursal</span>
                    <span className="text-[10px] text-pink-200">Direct to account</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xs p-3 rounded-xl border border-white/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-black block">Instant Approval</span>
                    <span className="text-[10px] text-pink-200">Paperless sanction</span>
                  </div>
                </div>
              </div>

              {/* Lending Partners Grid */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-pink-200">
                  Powered by Leading Lending Partners:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Moneyview', 'Poonawalla Fincorp', 'KreditBee', 'L&T Finance'].map((partner) => (
                    <div
                      key={partner}
                      className="py-2 px-2 bg-white text-slate-800 rounded-xl text-center text-xs font-bold shadow-2xs"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/20 flex items-center justify-between gap-4">
              <span className="text-xs text-pink-100 font-medium">
                Visit: <strong>www.JinnyLoan.com</strong>
              </span>
              <button
                onClick={() => onOpenApplyModal('Multiple Lender ₹7 Lakhs')}
                className="px-6 py-3 bg-white text-[#E81E76] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                id="hero-apply-right-card"
              >
                <span>Get Instant Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
