import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Coins, 
  Check,
  MessageSquare,
  FileCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeadApplicationData } from '../types';
import { formatCompactINR, formatINR } from '../utils/formatters';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBank?: string;
  defaultAmount?: number;
  defaultTenureYears?: number;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  defaultBank = 'Any Top Bank',
  defaultAmount = 4000000,
  defaultTenureYears = 20
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');

  const [formData, setFormData] = useState<LeadApplicationData>({
    fullName: '',
    mobile: '',
    email: '',
    city: 'Delhi NCR',
    employmentType: 'salaried',
    monthlyIncome: '65000',
    loanAmount: defaultAmount,
    tenureYears: defaultTenureYears,
    preferredBank: defaultBank,
    propertyIdentified: 'yes',
    message: ''
  });

  useEffect(() => {
    if (defaultBank) {
      setFormData(prev => ({ ...prev, preferredBank: defaultBank }));
    }
    if (defaultAmount) {
      setFormData(prev => ({ ...prev, loanAmount: defaultAmount }));
    }
    if (defaultTenureYears) {
      setFormData(prev => ({ ...prev, tenureYears: defaultTenureYears }));
    }
  }, [defaultBank, defaultAmount, defaultTenureYears, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loanAmount' || name === 'tenureYears' ? Number(value) : value
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.loanAmount || formData.loanAmount <= 0) return;
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant sanction match
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = 'JINNY-LN-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(generatedRef);
      setStep(3);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1000);
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#E81E76] text-white p-6 sm:p-7 rounded-t-3xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200 bg-white/20 px-2.5 py-0.5 rounded backdrop-blur-xs">
              {step === 3 ? 'Application Received' : 'Step ' + step + ' of 2'}
            </span>
            <span className="text-xs text-pink-200 font-semibold">
              Instant Bank Match
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
            {step === 3 
              ? 'Congratulations! Offer Matched' 
              : 'Apply Online with JinnyLoan'}
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            {step === 3 
              ? 'Your application has been assigned to our senior lending manager.' 
              : 'Compare rates from 100+ Banks & NBFCs with zero impact on credit score.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Loan Requirement Details */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4" id="apply-modal-step1">
              
              {/* Preferred Bank / Loan Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Bank / Lending Partner
                </label>
                <select
                  name="preferredBank"
                  value={formData.preferredBank}
                  onChange={handleInputChange}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                  id="apply-input-bank"
                >
                  <option value="Any Top Bank">Best Available Rate (Auto Match 100+ Banks)</option>
                  <option value="Axis Bank">Axis Bank (Lowest Private Rate)</option>
                  <option value="HDFC Bank">HDFC Bank (Fast Digital Disbursal)</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Aditya Birla Capital">Aditya Birla Capital</option>
                  <option value="CreditSea">CreditSea (Instant Loan)</option>
                  <option value="Moneyview">Moneyview Fintech</option>
                  <option value="Poonawalla Fincorp">Poonawalla Fincorp</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Canara Bank">Canara Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                </select>
              </div>

              {/* Loan Amount */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Required Loan Amount</span>
                  <span className="text-[#E81E76] font-extrabold">{formatINR(formData.loanAmount)}</span>
                </div>
                <input
                  type="range"
                  name="loanAmount"
                  min={50000}
                  max={50000000}
                  step={50000}
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E81E76] mb-1"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>₹50,000</span>
                  <span>₹50 Lakhs</span>
                  <span>₹5 Crores+</span>
                </div>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employment Nature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, employmentType: 'salaried' }))}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      formData.employmentType === 'salaried'
                        ? 'bg-blue-50 text-blue-800 border-blue-500 shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Salaried Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, employmentType: 'self-employed' }))}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      formData.employmentType === 'self-employed'
                        ? 'bg-pink-50 text-[#E81E76] border-[#E81E76] shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Self-Employed / Business
                  </button>
                </div>
              </div>

              {/* Property / Purpose Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loan Requirement Purpose
                </label>
                <select
                  name="propertyIdentified"
                  value={formData.propertyIdentified}
                  onChange={handleInputChange}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#E81E76] focus:outline-none"
                >
                  <option value="yes">New Home / Property Purchase</option>
                  <option value="personal">Personal Emergency / Travel / Wedding</option>
                  <option value="business">Business Expansion / Working Capital</option>
                  <option value="transfer">Balance Transfer & Top-up</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="apply-step1-next-btn"
                >
                  <span>Continue to Personal Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1e40af]" />
                <span>100% Data Confidentiality & 256-bit SSL Protection</span>
              </div>

            </form>
          )}

          {/* STEP 2: Personal & Contact Information */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4" id="apply-modal-step2">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (As per PAN / Aadhaar) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none text-slate-900"
                    id="apply-input-name"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (For Sanction SMS & WhatsApp update) *
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </div>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full text-xs font-semibold pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none text-slate-900"
                    id="apply-input-phone"
                  />
                </div>
              </div>

              {/* Email & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none text-slate-900"
                      id="apply-input-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Delhi NCR, Mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none text-slate-900"
                      id="apply-input-city"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Net Monthly In-Hand Income (₹)
                </label>
                <div className="relative">
                  <Coins className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    name="monthlyIncome"
                    min={10000}
                    step={5000}
                    placeholder="e.g. 65000"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E81E76] focus:outline-none text-slate-900"
                    id="apply-input-income"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  id="apply-submit-final-btn"
                >
                  {isSubmitting ? (
                    <span>Matching Banks...</span>
                  ) : (
                    <>
                      <span>Submit & Check Offers</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 3 && (
            <div className="text-center space-y-6 py-2" id="apply-success-view">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-pink-50 text-[#E81E76] text-xs font-bold border border-pink-200 mb-2">
                  Application ID: {referenceId}
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  Application Successfully Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName || 'Valued Customer'}</strong>. Your application for <strong>{formatCompactINR(formData.loanAmount)}</strong> under <strong>{formData.preferredBank}</strong> has been logged in the JinnyLoan portal.
                </p>
              </div>

              {/* What Happens Next Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  What Happens Next?
                </span>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>A senior JinnyLoan loan manager will call on <strong>+91 {formData.mobile}</strong> within 30 minutes to review eligibility.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Doorstep pickup / instant digital upload of your KYC documents.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Direct bank disbursal within 24 hours of approval.</span>
                  </div>
                </div>
              </div>

              {/* Direct Connect Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/918006488006?text=Hi%20JinnyLoan,%20I%20just%20submitted%20my%20loan%20application%20(Ref:%20${referenceId})%20for%20${formatCompactINR(formData.loanAmount)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Done / Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
