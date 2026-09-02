import React from 'react';
import { 
  Percent, 
  CalendarClock, 
  Zap, 
  ShieldCheck, 
  Headphones, 
  Smartphone, 
  ArrowRight,
  CheckCircle2,
  Award
} from 'lucide-react';
import { BENEFITS } from '../data/mockData';

interface BenefitsSectionProps {
  onOpenApplyModal: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenApplyModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Percent':
        return Percent;
      case 'CalendarClock':
        return CalendarClock;
      case 'Zap':
        return Zap;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Headphones':
        return Headphones;
      case 'Smartphone':
        return Smartphone;
      default:
        return Award;
    }
  };

  return (
    <section id="benefits" className="py-6 sm:py-14 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-[#E81E76] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
            <Award className="w-3 h-3" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Benefits of a Loan through JinnyLoan
          </h2>
          <p className="mt-1 text-[11px] sm:text-sm text-slate-600 leading-relaxed">
            Transparent borrowing with lowest bank rates & zero broker commissions
          </p>
        </div>

        {/* Benefits Grid (6 Cards): 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = getIcon(benefit.iconName);
            return (
              <div
                key={benefit.title}
                id={`benefit-card-${idx}`}
                className="bg-slate-50/90 hover:bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-6 border border-slate-200 hover:border-pink-300 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#E81E76] via-[#d61266] to-[#a30948] flex items-center justify-center text-white shadow-xs">
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    {benefit.badge && (
                      <span className="text-[8px] sm:text-[11px] font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full bg-pink-50 text-[#E81E76] border border-pink-200 line-clamp-1">
                        {benefit.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs sm:text-lg font-bold text-slate-900 group-hover:text-[#E81E76] transition-colors leading-tight">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-[10px] sm:text-sm text-slate-600 leading-snug line-clamp-2 sm:line-clamp-none">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-200/80 flex items-center gap-1 text-[9px] sm:text-xs font-semibold text-[#1e40af]">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                  <span className="line-clamp-1">JinnyLoan Advantage</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-4 sm:mt-10 bg-gradient-to-r from-slate-900 via-[#1e40af] to-[#0f2868] rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 shadow-xl">
          <div className="space-y-0.5 sm:space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-xl font-bold font-['Outfit',sans-serif]">
              Ready to find your ideal loan interest rate?
            </h4>
            <p className="text-[11px] sm:text-sm text-blue-200">
              Apply in under 2 minutes. Free consultation and credit assessment.
            </p>
          </div>
          <button
            onClick={onOpenApplyModal}
            className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-3 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            id="benefits-apply-cta"
          >
            <span>Apply Online Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
