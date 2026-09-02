import React, { useState } from 'react';
import { 
  UserCheck, 
  Globe, 
  Wallet, 
  Briefcase, 
  TrendingUp, 
  Coins, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Calculator
} from 'lucide-react';
import { ELIGIBILITY_SALARIED, ELIGIBILITY_SELF_EMPLOYED } from '../data/mockData';
import { formatCompactINR, formatINR } from '../utils/formatters';

interface EligibilitySectionProps {
  onOpenApplyModal: () => void;
}

export const EligibilitySection: React.FC<EligibilitySectionProps> = ({ onOpenApplyModal }) => {
  const [activeTab, setActiveTab] = useState<'salaried' | 'self-employed'>('salaried');
  
  // Interactive mini eligibility estimator
  const [userIncome, setUserIncome] = useState<number>(60000);
  const [existingEmi, setExistingEmi] = useState<number>(5000);

  // Approximate eligible loan calculation (FOIR: 50-60% of net income available for EMI)
  const disposableEmi = Math.max(0, (userIncome * 0.55) - existingEmi);
  // Estimate loan assuming 7.35% for 20 years (EMI per Lakh is approx ₹797)
  const estimatedEligibleAmount = Math.round((disposableEmi / 797) * 100000);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return Globe;
      case 'UserCheck':
        return UserCheck;
      case 'Wallet':
        return Wallet;
      case 'Briefcase':
        return Briefcase;
      case 'TrendingUp':
        return TrendingUp;
      case 'Coins':
        return Coins;
      case 'Building2':
        return Building2;
      default:
        return CheckCircle2;
    }
  };

  const currentCriteria = activeTab === 'salaried' ? ELIGIBILITY_SALARIED : ELIGIBILITY_SELF_EMPLOYED;

  return (
    <section id="eligibility" className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Eligibility Requirements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Loan Eligibility Criteria & Estimator
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Transparent and straightforward eligibility requirements for both salaried professionals and self-employed business owners.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-5 sm:mb-8">
          <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 max-w-md w-full">
            <button
              onClick={() => setActiveTab('salaried')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'salaried'
                  ? 'bg-[#1e40af] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              id="eligibility-tab-salaried"
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Salaried</span>
            </button>

            <button
              onClick={() => setActiveTab('self-employed')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'self-employed'
                  ? 'bg-[#E81E76] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              id="eligibility-tab-self-employed"
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Self-Employed</span>
            </button>
          </div>
        </div>

        {/* Criteria Grid & Mini-Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          
          {/* Left: Criteria List (7 Cols) - 2x2 Grid on Mobile */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-slate-100">
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                Key Qualification Norms ({activeTab === 'salaried' ? 'Salaried' : 'Self-Employed'})
              </h3>
              <span className="text-[10px] sm:text-xs font-semibold text-[#1e40af] bg-blue-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                RBI Norms
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3">
              {currentCriteria.map((item) => {
                const IconComp = getIcon(item.icon);
                return (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-pink-200 transition-colors"
                  >
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-slate-200 text-[#E81E76] flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <IconComp className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                        {item.label}
                      </div>
                      <div className="text-xs sm:text-base font-bold text-slate-900 mt-0.5 font-['Outfit',sans-serif] leading-tight">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-1.5 sm:pt-3">
              <div className="p-2.5 sm:p-4 rounded-xl bg-pink-50 border border-pink-100 text-[#9d0248] text-[11px] sm:text-xs flex items-start gap-2 sm:gap-3">
                <ShieldAlert className="w-4 h-4 text-[#E81E76] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Pro-Tip:</strong> Having a co-applicant (spouse or parent) increases your eligible loan amount and may qualify for women borrower interest discounts (0.05%).
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick Eligibility Amount Estimator (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-700 shadow-xl space-y-3 sm:space-y-6">
            
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-pink-300 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Estimator</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold text-white font-['Outfit',sans-serif]">
                How Much Loan Can You Get?
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Based on monthly income and existing ongoing EMIs
              </p>
            </div>

            {/* Income Slider */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">
                  {activeTab === 'salaried' ? 'Net Monthly Salary' : 'Monthly Profit'}
                </span>
                <span className="text-pink-300 font-bold font-['Outfit',sans-serif]">
                  {formatINR(userIncome)}/mo
                </span>
              </div>
              <input
                type="range"
                min={15000}
                max={300000}
                step={5000}
                value={userIncome}
                onChange={(e) => setUserIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E81E76]"
                id="eligibility-income-slider"
              />
            </div>

            {/* Existing EMI Slider */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Existing Monthly EMIs</span>
                <span className="text-blue-300 font-bold font-['Outfit',sans-serif]">
                  {formatINR(existingEmi)}/mo
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100000}
                step={2000}
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                id="eligibility-emi-slider"
              />
            </div>

            {/* Estimated Eligibility Result Box */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium">
                Estimated Maximum Eligible Loan Amount
              </span>
              <div className="text-2xl sm:text-3xl font-black text-pink-400 font-['Outfit',sans-serif]">
                {formatCompactINR(estimatedEligibleAmount)}
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                Max Monthly Affordable EMI: ~{formatINR(Math.round(disposableEmi))}
              </p>
            </div>

            <button
              onClick={onOpenApplyModal}
              className="w-full py-2.5 sm:py-3.5 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              id="eligibility-check-instant-cta"
            >
              <span>Apply for {formatCompactINR(estimatedEligibleAmount)} Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
