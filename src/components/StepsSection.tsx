import React from 'react';
import { 
  FileEdit, 
  PhoneCall, 
  MapPinCheck, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { APPLICATION_STEPS } from '../data/mockData';

interface StepsSectionProps {
  onOpenApplyModal: () => void;
}

export const StepsSection: React.FC<StepsSectionProps> = ({ onOpenApplyModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileEdit':
        return FileEdit;
      case 'PhoneCall':
        return PhoneCall;
      case 'MapPinCheck':
        return MapPinCheck;
      case 'CheckCircle2':
        return CheckCircle2;
      default:
        return CheckCircle2;
    }
  };

  return (
    <section id="steps" className="py-6 sm:py-14 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <Clock className="w-3 h-3" />
            <span>Fast-Track Roadmap</span>
          </div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Steps to Apply for a Loan through JinnyLoan
          </h2>
          <p className="mt-1 text-[11px] sm:text-sm text-slate-600 leading-relaxed">
            From online application to final disbursement in 4 simple stages
          </p>
        </div>

        {/* 4-Step Flow Grid: 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 relative">
          {APPLICATION_STEPS.map((item, idx) => {
            const IconComp = getIcon(item.icon);
            return (
              <div
                key={item.step}
                className="bg-slate-50/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-6 border border-slate-200 hover:border-pink-300 hover:bg-white transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col justify-between relative group"
                id={`step-card-${idx + 1}`}
              >
                <div>
                  {/* Step Number Badge & Timeline Pill */}
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-lg sm:text-2xl font-black text-pink-300 group-hover:text-[#E81E76] font-['Outfit',sans-serif] transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full bg-pink-50 text-[#E81E76] border border-pink-200 line-clamp-1">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#1e40af] to-[#2563eb] flex items-center justify-center text-white shadow-xs mb-2 sm:mb-4 group-hover:scale-105 transition-transform">
                    <IconComp className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-[#1e40af] transition-colors font-['Outfit',sans-serif] leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] sm:text-xs text-slate-600 leading-snug line-clamp-2 sm:line-clamp-none">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-2 sm:mt-6 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[9px] sm:text-[11px] text-[#E81E76] font-semibold">
                  <span>Stage {idx + 1} of 4</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Start Application CTA */}
        <div className="mt-4 sm:mt-10 text-center">
          <button
            onClick={onOpenApplyModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 bg-[#E81E76] hover:bg-[#c2145e] text-white font-extrabold text-xs sm:text-base rounded-xl sm:rounded-2xl shadow-xl shadow-pink-600/30 transition-all cursor-pointer"
            id="steps-start-application-btn"
          >
            <span>Start Your Online Loan Application</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5">
            Takes under 2 minutes • 100% Paperless • Zero impact on credit score
          </p>
        </div>

      </div>
    </section>
  );
};
