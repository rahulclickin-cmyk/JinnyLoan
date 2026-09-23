import React from 'react';
import { ArrowRight, Handshake, ShieldCheck, Users, Building, Briefcase, ChevronRight, Award } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface PartnerWithUsBannerProps {
  onOpenPartnerModal: () => void;
}

export const PartnerWithUsBanner: React.FC<PartnerWithUsBannerProps> = ({
  onOpenPartnerModal
}) => {
  const { navigate } = useRouter();

  return (
    <section className="py-4 sm:py-12 bg-white" id="partner-with-us">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0f2868] via-[#1e40af] to-[#2563eb] text-white p-4 sm:p-12 shadow-xl shadow-blue-900/15">
          
          {/* Decorative geometric patterns */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            
            {/* Left Content */}
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pink-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Handshake className="w-3.5 h-3.5 text-pink-300" />
                <span>Loan Agent &amp; DSA Channel Program</span>
              </div>

              <h2 className="text-xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                Partner With Us as a Loan Agent
              </h2>

              <p className="text-xs sm:text-base text-blue-100 font-medium leading-relaxed">
                Connect your customers to India's top 100+ digital banks &amp; NBFCs. Earn up to <strong className="text-yellow-300 font-bold">2.5% commission payout</strong> on every disbursed personal, business, or home loan with real-time CRM tracking.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 text-[11px] sm:text-xs text-blue-200">
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Up to 2.5% Payout</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Joining Fee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>10,000+ Active Agents</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Partner CRM Portal</span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => navigate('/loan-agent')}
                className="w-full px-6 sm:px-8 py-3 sm:py-3.5 bg-yellow-400 text-slate-900 hover:bg-yellow-300 font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                id="explore-loan-agent-btn"
              >
                <Users className="w-4 h-4 text-slate-900" />
                <span>Explore Loan Agent Program</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenPartnerModal}
                className="w-full px-6 sm:px-8 py-3 sm:py-3.5 bg-white/15 hover:bg-white text-white hover:text-[#1e40af] border border-white/30 font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl backdrop-blur-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                id="become-a-partner-btn"
              >
                <span>Instant Partner Registration</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
