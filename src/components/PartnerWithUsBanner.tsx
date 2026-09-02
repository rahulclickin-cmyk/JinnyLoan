import React from 'react';
import { ArrowRight, Handshake, ShieldCheck, Users, Building, Briefcase } from 'lucide-react';

interface PartnerWithUsBannerProps {
  onOpenPartnerModal: () => void;
}

export const PartnerWithUsBanner: React.FC<PartnerWithUsBannerProps> = ({
  onOpenPartnerModal
}) => {
  return (
    <section className="py-4 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0f2868] via-[#1e40af] to-[#2563eb] text-white p-4 sm:p-12 shadow-xl shadow-blue-900/15">
          
          {/* Decorative geometric patterns */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
            
            {/* Left Content */}
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-pink-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Handshake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-300" />
                <span>DSA & Channel Program</span>
              </div>

              <h2 className="text-xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                Partner With Us
              </h2>

              <p className="text-xs sm:text-base text-blue-100 font-medium leading-relaxed">
                Connect Your Customers To Our Digital Loan Marketplace. Earn highest channel payouts with real-time CRM tracking.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 pt-1 text-[11px] sm:text-xs text-blue-200">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant Payouts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>10,000+ DSAs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Partner Portal</span>
                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="w-full md:w-auto flex-shrink-0">
              <button
                onClick={onOpenPartnerModal}
                className="w-full md:w-auto px-5 sm:px-8 py-2.5 sm:py-4 bg-white text-[#1e40af] hover:bg-yellow-300 hover:text-slate-900 font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="become-a-partner-btn"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
