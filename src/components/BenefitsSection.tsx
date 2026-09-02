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
    <section id="benefits" className="py-14 sm:py-18 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Benefits of a Loan through JinnyLoan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Experience a frictionless, transparent borrowing journey with lowest bank rates, zero broker commissions, and end-to-end guidance.
          </p>
        </div>

        {/* Benefits Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = getIcon(benefit.iconName);
            return (
              <div
                key={benefit.title}
                id={`benefit-card-${idx}`}
                className="bg-slate-50/90 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-pink-300 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#E81E76] via-[#d61266] to-[#a30948] flex items-center justify-center text-white shadow-md shadow-pink-600/20 group-hover:scale-110 transition-transform duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {benefit.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-pink-50 text-[#E81E76] border border-pink-200">
                        {benefit.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#E81E76] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-semibold text-[#1e40af]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed JinnyLoan Advantage</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-[#1e40af] to-[#0f2868] rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold font-['Outfit',sans-serif]">
              Ready to find your ideal loan interest rate?
            </h4>
            <p className="text-xs sm:text-sm text-blue-200">
              Apply in under 2 minutes. Free consultation and credit profile assessment.
            </p>
          </div>
          <button
            onClick={onOpenApplyModal}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            id="benefits-apply-cta"
          >
            <span>Apply Online Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
