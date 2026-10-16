import React, { useState } from 'react';
import { 
  Sliders, 
  Percent, 
  Coins, 
  Building2, 
  CheckCircle2, 
  RotateCcw, 
  Save, 
  HelpCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { useSiteConfig } from '../../../context/ConfigContext';

export const CalculatorsTab: React.FC = () => {
  const { config, updateLapCalculator } = useSiteConfig();
  const [toast, setToast] = useState<string | null>(null);

  const lapConfig = config.lapCalculatorConfig || {
    headline: 'Estimate Your Loan Against Property (LAP) Eligibility',
    subheadline: 'Borrow up to 75% of your registered commercial or residential property market value.',
    maxLtvPercentage: 75,
    minPropertyValue: 1000000,
    maxPropertyValue: 100000000,
    defaultPropertyValue: 5000000,
    tenureYears: 15,
    interestRate: 8.75
  };

  const [formData, setFormData] = useState({ ...lapConfig });
  const [personalLoanRate, setPersonalLoanRate] = useState(10.5);
  const [homeLoanRate, setHomeLoanRate] = useState(7.10);
  const [gstPercentage, setGstPercentage] = useState(18);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateLapCalculator({
      ...formData,
      maxLtvPercentage: Number(formData.maxLtvPercentage),
      defaultPropertyValue: Number(formData.defaultPropertyValue),
      tenureYears: Number(formData.tenureYears),
      interestRate: Number(formData.interestRate)
    });
    setToast('Calculator configuration updated & live on website!');
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
              EMI Calculators & Pricing Engine Rules
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E81E76] text-white">
              Dynamic Slabs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure default interest rate assumptions, Loan-to-Value (LTV) limits, and GST fees across all public tools.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* LAP CALCULATOR SETTINGS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#E81E76]" />
              <h3 className="text-sm font-bold text-slate-900">
                Loan Against Property (LAP) Estimator Rules
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">Live Component #calculator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Maximum LTV Cap (Loan-to-Value %)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={40}
                  max={80}
                  step={1}
                  value={formData.maxLtvPercentage}
                  onChange={e => setFormData({ ...formData, maxLtvPercentage: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">RBI guidelines cap LAP LTV up to 75% for residential.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Benchmark LAP Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={6}
                  max={20}
                  step={0.05}
                  value={formData.interestRate}
                  onChange={e => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">% p.a.</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Used for EMI estimation computation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Default Property Market Value (₹)
              </label>
              <input
                type="number"
                step={500000}
                value={formData.defaultPropertyValue}
                onChange={e => setFormData({ ...formData, defaultPropertyValue: Number(e.target.value) })}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">Initial slider starting position (₹50 Lakhs default).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Max Tenure Assumption (Years)
              </label>
              <input
                type="number"
                min={1}
                max={25}
                value={formData.tenureYears}
                onChange={e => setFormData({ ...formData, tenureYears: Number(e.target.value) })}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">Typical tenure is 15 years for property mortgage.</p>
            </div>
          </div>
        </div>

        {/* PERSONAL & HOME LOAN EMI DEFAULTS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                General EMI Calculator Default Rates
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600">Auto-calculated</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Personal Loan Benchmark</label>
              <div className="relative">
                <input
                  type="number"
                  step={0.1}
                  value={personalLoanRate}
                  onChange={e => setPersonalLoanRate(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Home Loan Sovereign Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step={0.05}
                  value={homeLoanRate}
                  onChange={e => setHomeLoanRate(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Statutory GST on Fees</label>
              <div className="relative">
                <input
                  type="number"
                  value={gstPercentage}
                  onChange={e => setGstPercentage(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#E81E76] hover:bg-[#d01566] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Calculator Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
