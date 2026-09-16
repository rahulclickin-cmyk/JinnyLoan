import React, { useState } from 'react';
import { Building, Calculator, ArrowRight, ShieldCheck, CheckCircle2, Percent, Sparkles } from 'lucide-react';
import { useSiteConfig } from '../context/ConfigContext';
import { formatCompactINR, formatINR } from '../utils/formatters';

interface LapLoanEstimatorProps {
  onOpenApplyModal: (details?: string) => void;
}

export const LapLoanEstimator: React.FC<LapLoanEstimatorProps> = ({ onOpenApplyModal }) => {
  const { config } = useSiteConfig();
  const lapConfig = config.lapCalculatorConfig || {
    headline: 'How Much Loan Can You Get Against Your Property?',
    subheadline: 'Calculate your borrowing capacity based on property market value (up to 70% LTV) and monthly income.',
    maxLtvPercentage: 70,
    minPropertyValue: 2500000,
    maxPropertyValue: 100000000,
    defaultPropertyValue: 12500000,
    tenureYears: 15,
    interestRate: 7.75
  };

  const [propertyValue, setPropertyValue] = useState<number>(lapConfig.defaultPropertyValue || 12500000);
  const [propertyType, setPropertyType] = useState<string>('Residential House / Flat');
  const [tenureYears, setTenureYears] = useState<number>(lapConfig.tenureYears || 15);

  // Maximum loan is based on LTV percentage
  const maxLtv = lapConfig.maxLtvPercentage || 70;
  const eligibleLoanAmount = Math.round(propertyValue * (maxLtv / 100));

  // EMI calculation at lapConfig.interestRate
  const annualRate = lapConfig.interestRate || 7.75;
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const monthlyEmi = Math.round(
    (eligibleLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  return (
    <section id="lap-loan-estimator" className="py-12 bg-white rounded-3xl border-2 border-slate-200 shadow-md my-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2 border border-pink-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Property Valuation & LTV Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
            {lapConfig.headline}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            {lapConfig.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Property Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Select Your Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Residential House / Flat',
                  'Commercial Shop / Office',
                  'Industrial Property',
                  'Approved Open Plot'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`p-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      propertyType === type
                        ? 'bg-[#1e40af] text-white border-[#1e40af] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Value Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Estimated Market Value of Property
                </label>
                <span className="text-lg font-black text-[#1e40af] font-['Outfit',sans-serif]">
                  {formatINR(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min={lapConfig.minPropertyValue || 2500000}
                max={lapConfig.maxPropertyValue || 100000000}
                step={500000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e40af]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>{formatCompactINR(lapConfig.minPropertyValue || 2500000)}</span>
                <span>{formatCompactINR(lapConfig.maxPropertyValue || 100000000)}</span>
              </div>
            </div>

            {/* Repayment Tenure Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Desired Loan Tenure
                </label>
                <span className="text-base font-black text-[#E81E76] font-['Outfit',sans-serif]">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={20}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E81E76]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>3 Years</span>
                <span>20 Years</span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Up to {maxLtv}% Loan-To-Value (LTV)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <Percent className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Competitive rate from {annualRate}% p.a.</span>
              </div>
            </div>

          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 text-center space-y-5">
            <div>
              <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider block mb-1">
                Estimated Borrowing Capacity ({maxLtv}% LTV)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-pink-400 font-['Outfit',sans-serif]">
                {formatCompactINR(eligibleLoanAmount)}
              </div>
              <span className="text-xs text-slate-300 mt-1 block">
                Against {propertyType} valued at {formatCompactINR(propertyValue)}
              </span>
            </div>

            {/* Monthly EMI Breakout */}
            <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-xs space-y-2">
              <div className="flex justify-between text-blue-100">
                <span>Indicative Monthly EMI:</span>
                <span className="font-bold text-yellow-300 font-['Outfit',sans-serif] text-sm">
                  {formatINR(monthlyEmi)}/mo
                </span>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Applicable Interest Rate:</span>
                <span className="font-bold text-white">{annualRate}% p.a.</span>
              </div>
              <div className="flex justify-between text-blue-100">
                <span>Repayment Tenure:</span>
                <span className="font-bold text-white">{tenureYears} Years</span>
              </div>
            </div>

            <button
              onClick={() => onOpenApplyModal(`Loan Against Property - Amount ₹${formatCompactINR(eligibleLoanAmount)} (Property Value ₹${formatCompactINR(propertyValue)})`)}
              className="w-full py-3.5 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="lap-calculator-apply-cta"
            >
              <span>Apply for {formatCompactINR(eligibleLoanAmount)} LAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-400">
              *Subject to legal and technical verification of the title deeds by partner banks.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
