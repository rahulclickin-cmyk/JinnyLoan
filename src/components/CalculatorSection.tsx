import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  PieChart, 
  Table, 
  Info, 
  TrendingUp, 
  Coins, 
  Calendar, 
  Percent,
  CheckCircle2,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { 
  formatINR, 
  formatCompactINR, 
  calculateEMI, 
  generateAmortizationSchedule 
} from '../utils/formatters';

interface CalculatorSectionProps {
  onOpenApplyModalWithDetails: (amount: number, tenureYears: number, bank?: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onOpenApplyModalWithDetails
}) => {
  // Calculator state
  const [loanAmount, setLoanAmount] = useState<number>(3500000); // 35 Lakhs
  const [interestRate, setInterestRate] = useState<number>(7.35); // 7.35%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Quick preset shortcuts
  const amountPresets = [
    { label: '₹10L', val: 1000000 },
    { label: '₹25L', val: 2500000 },
    { label: '₹40L', val: 4000000 },
    { label: '₹60L', val: 6000000 },
    { label: '₹1 Cr', val: 10000000 },
    { label: '₹2 Cr', val: 20000000 }
  ];

  const tenurePresets = [
    { label: '5 Yrs', val: 5 },
    { label: '10 Yrs', val: 10 },
    { label: '15 Yrs', val: 15 },
    { label: '20 Yrs', val: 20 },
    { label: '25 Yrs', val: 25 },
    { label: '30 Yrs', val: 30 }
  ];

  const emiResult = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

  const schedule = useMemo(() => {
    if (!showSchedule) return [];
    return generateAmortizationSchedule(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears, showSchedule]);

  const handleCopySummary = () => {
    const text = `JinnyLoan Home EMI Summary: Loan Amount: ${formatINR(loanAmount)}, Rate: ${interestRate}%, Tenure: ${tenureYears} Years, Monthly EMI: ${formatINR(emiResult.monthlyEmi)}, Total Interest: ${formatINR(emiResult.totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="calculator" className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#E81E76] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Loan EMI Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] tracking-tight font-['Outfit',sans-serif]">
            Calculate Your Monthly Installment (EMI)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Estimate your exact monthly repayment installments, total interest burden, and amortization breakdown across top bank interest rates.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Sliders and Inputs (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-7 border-b lg:border-b-0 lg:border-r border-slate-200">
              
              {/* 1. Loan Amount */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#E81E76]" />
                    <span>Loan Amount Required</span>
                  </label>
                  <div className="flex items-center gap-1 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-xl">
                    <span className="text-xs text-[#E81E76] font-bold">₹</span>
                    <input
                      type="number"
                      min={50000}
                      max={100000000}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Math.max(50000, Number(e.target.value)))}
                      className="w-32 text-sm sm:text-base font-black text-slate-900 bg-transparent focus:outline-none text-right font-['Outfit',sans-serif]"
                      id="calc-input-loan-amount"
                    />
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={100000}
                  max={50000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E81E76]"
                  id="calc-slider-loan-amount"
                />

                {/* Amount Quick Presets */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {amountPresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setLoanAmount(preset.val)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                          loanAmount === preset.val
                            ? 'bg-[#E81E76] text-white border-[#E81E76] shadow-2xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Max: ₹10 Cr</span>
                </div>
              </div>

              {/* 2. Interest Rate */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-[#1e40af]" />
                    <span>Interest Rate (% per annum)</span>
                  </label>
                  <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
                    <input
                      type="number"
                      min={6.5}
                      max={24}
                      step={0.05}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(6.5, Number(e.target.value)))}
                      className="w-16 text-sm sm:text-base font-black text-slate-900 bg-transparent focus:outline-none text-right font-['Outfit',sans-serif]"
                      id="calc-input-interest-rate"
                    />
                    <span className="text-xs text-[#1e40af] font-bold">% p.a.</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={6.5}
                  max={18}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e40af]"
                  id="calc-slider-interest-rate"
                />

                <div className="flex justify-between text-xs text-slate-500 pt-0.5">
                  <span className="text-[#1e40af] font-semibold">Min: 7.10% (Public Sector)</span>
                  <span>7.35% (SBI / HDFC)</span>
                  <span>Max: 18%</span>
                </div>
              </div>

              {/* 3. Loan Tenure */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Loan Tenure (Years)</span>
                  </label>
                  <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Math.min(30, Math.max(1, Number(e.target.value))))}
                      className="w-14 text-sm sm:text-base font-black text-slate-900 bg-transparent focus:outline-none text-right font-['Outfit',sans-serif]"
                      id="calc-input-tenure"
                    />
                    <span className="text-xs text-emerald-700 font-bold">Years ({tenureYears * 12} Mos)</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  id="calc-slider-tenure"
                />

                {/* Tenure Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tenurePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setTenureYears(preset.val)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        tenureYears === preset.val
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Calculated Results Summary (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
              
              <div className="space-y-6 relative z-10">
                
                {/* Result Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-300 bg-pink-900/40 px-2.5 py-1 rounded-md border border-pink-500/30">
                    Repayment Summary
                  </span>
                  <button
                    onClick={handleCopySummary}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
                    title="Copy calculation summary"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Big EMI Highlight Box */}
                <div className="bg-pink-900/30 border border-pink-500/40 rounded-2xl p-5 backdrop-blur-xs">
                  <div className="text-xs text-pink-200 font-semibold">
                    Monthly Loan Installment (EMI)
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 font-['Outfit',sans-serif]">
                    {formatINR(emiResult.monthlyEmi)}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Based on {interestRate}% p.a. for {tenureYears} Years ({tenureYears * 12} months)
                  </div>
                </div>

                {/* Key Metrics Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E81E76]"></span>
                      Principal Loan Amount:
                    </span>
                    <span className="font-bold text-white font-['Outfit',sans-serif]">
                      {formatINR(loanAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                      Total Interest Payable:
                    </span>
                    <span className="font-bold text-blue-300 font-['Outfit',sans-serif]">
                      {formatINR(emiResult.totalInterest)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-200 font-semibold">
                      Total Amount Payable:
                    </span>
                    <span className="font-extrabold text-pink-300 text-base font-['Outfit',sans-serif]">
                      {formatINR(emiResult.totalPayment)}
                    </span>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                    <div
                      className="h-full bg-[#E81E76] transition-all duration-300"
                      style={{ width: `${emiResult.principalPercentage}%` }}
                      title={`Principal: ${emiResult.principalPercentage}%`}
                    ></div>
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${emiResult.interestPercentage}%` }}
                      title={`Interest: ${emiResult.interestPercentage}%`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="text-pink-300 font-medium">Principal: {emiResult.principalPercentage}%</span>
                    <span className="text-blue-300 font-medium">Interest: {emiResult.interestPercentage}%</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3 pt-6 border-t border-slate-800/80 relative z-10">
                <button
                  onClick={() => onOpenApplyModalWithDetails(loanAmount, tenureYears)}
                  className="w-full py-3.5 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  id="calc-apply-for-this-loan-btn"
                >
                  <span>Apply for this Loan (₹{formatCompactINR(loanAmount)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  id="calc-toggle-schedule-btn"
                >
                  <Table className="w-3.5 h-3.5 text-pink-400" />
                  <span>{showSchedule ? 'Hide Repayment Schedule' : 'View Yearly Amortization Schedule'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Amortization Table Accordion (if toggled) */}
          {showSchedule && (
            <div className="p-6 sm:p-8 bg-slate-900 text-slate-200 border-t border-slate-700 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-white">Year-by-Year Repayment Schedule</h4>
                  <p className="text-xs text-slate-400">Detailed breakdown of principal reduction and interest amortized annually</p>
                </div>
                <span className="text-xs text-pink-300 font-semibold bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  {tenureYears} Years Projection
                </span>
              </div>

              <div className="overflow-x-auto max-h-80 overflow-y-auto border border-slate-800 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-800/90 text-slate-300 sticky top-0 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Year</th>
                      <th className="py-3 px-4">Opening Balance</th>
                      <th className="py-3 px-4">Principal Paid (₹)</th>
                      <th className="py-3 px-4">Interest Paid (₹)</th>
                      <th className="py-3 px-4">Total Paid in Year</th>
                      <th className="py-3 px-4">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {schedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-white">Year {row.year}</td>
                        <td className="py-2.5 px-4">{formatINR(row.openingBalance)}</td>
                        <td className="py-2.5 px-4 text-pink-400 font-medium">{formatINR(row.principalPaid)}</td>
                        <td className="py-2.5 px-4 text-blue-300 font-medium">{formatINR(row.interestPaid)}</td>
                        <td className="py-2.5 px-4 font-semibold text-white">{formatINR(row.totalEmiPaid)}</td>
                        <td className="py-2.5 px-4 font-mono text-slate-400">{formatINR(row.closingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
