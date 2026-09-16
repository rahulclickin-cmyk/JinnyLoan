import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  FileText, 
  HelpCircle, 
  Send, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  Coins,
  Percent
} from 'lucide-react';
import { LandingPageContentConfig } from '../../config/siteConfig';
import { BankLogo } from '../BankLogos';
import { useRouter } from '../../context/RouterContext';

interface LoanLandingPageProps {
  content: LandingPageContentConfig;
  onOpenApplyModal: (loanType?: string) => void;
}

export const LoanLandingPage: React.FC<LoanLandingPageProps> = ({
  content,
  onOpenApplyModal
}) => {
  const { navigate } = useRouter();

  // Quick Application Form state inside the landing page
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    employmentType: 'Salaried',
    monthlyIncome: '₹40,000',
    loanAmount: '₹3,00,000'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-1 hover:text-[#E81E76] transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{content.title}</span>
        </div>

        {/* 1. HERO SECTION WITH EMBEDDED APPLICATION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Hero Content & Key Product Highlights */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#0a1931] via-[#153462] to-[#1e40af] rounded-3xl text-white p-6 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-pink-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-4 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>{content.heroBadge}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight mb-4">
                {content.title}
              </h1>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6 max-w-2xl">
                {content.subtitle}
              </p>

              {/* 4 Essential Product Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                  <span className="text-[10px] text-blue-200 uppercase font-bold block">Max Amount</span>
                  <span className="text-sm sm:text-lg font-black text-yellow-300 font-['Outfit',sans-serif]">
                    {content.maxAmount}
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                  <span className="text-[10px] text-blue-200 uppercase font-bold block">Interest Rate</span>
                  <span className="text-sm sm:text-lg font-black text-emerald-300 font-['Outfit',sans-serif]">
                    {content.interestRate}
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                  <span className="text-[10px] text-blue-200 uppercase font-bold block">Tenure</span>
                  <span className="text-sm sm:text-lg font-black text-white font-['Outfit',sans-serif]">
                    {content.tenure}
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 border border-white/15">
                  <span className="text-[10px] text-blue-200 uppercase font-bold block">Processing Fee</span>
                  <span className="text-sm sm:text-lg font-black text-pink-300 font-['Outfit',sans-serif]">
                    {content.processingFee}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between gap-4 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>RBI-Regulated Lenders Only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-yellow-300" />
                <span>Instant In-Principle Approval</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Instant Application Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-[#E81E76] uppercase tracking-wider block">Express Application</span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    Check Your Eligibility in 2 Mins
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#E81E76] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Eligibility Check Complete!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Your preliminary profile is approved for <strong className="text-slate-900">{content.maxAmount}</strong>. A dedicated relationship manager will contact you with pre-approved rate quotes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Check Another Amount
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="As on PAN Card"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E81E76] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-xs font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          className="w-full px-3 py-2.5 rounded-r-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E81E76] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Required Amount</label>
                      <select
                        value={formData.loanAmount}
                        onChange={e => setFormData({ ...formData, loanAmount: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E81E76] focus:border-transparent bg-white"
                      >
                        <option value="₹1,00,000">₹1 Lakh</option>
                        <option value="₹3,00,000">₹3 Lakhs</option>
                        <option value="₹5,00,000">₹5 Lakhs</option>
                        <option value="₹10,00,000">₹10 Lakhs</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Employment</label>
                      <select
                        value={formData.employmentType}
                        onChange={e => setFormData({ ...formData, employmentType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E81E76] focus:border-transparent bg-white"
                      >
                        <option value="Salaried">Salaried</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Business Owner">Business Owner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Income</label>
                      <input
                        type="text"
                        required
                        placeholder="₹35,000"
                        value={formData.monthlyIncome}
                        onChange={e => setFormData({ ...formData, monthlyIncome: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E81E76] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#E81E76] to-[#f43f8e] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <span>Analyzing Profile...</span>
                    ) : (
                      <>
                        <span>{content.primaryCtaText}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">
                    🔒 256-bit Bank Grade Encryption. Won't affect your CIBIL score.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* 2. OVERVIEW & KEY BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Overview */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-3">
              Overview & Product Features
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {content.overviewText}
            </p>
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1e40af] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 leading-relaxed">
                JinnyLoan partners strictly with RBI-authorized NBFCs and schedule commercial banks, ensuring full transparency in annual percentage rates (APR) and zero undisclosed charges.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-4">
              Why Choose This Solution
            </h2>
            <div className="space-y-3">
              {content.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. ELIGIBILITY & DOCUMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Eligibility Criteria */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E81E76]" />
              <span>Eligibility Criteria</span>
            </h3>
            <div className="space-y-3">
              {content.eligibility.map((crit, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-[#E81E76] mt-1.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{crit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1e40af]" />
              <span>Required Documents Checklist</span>
            </h3>
            <div className="space-y-3">
              {content.documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-[#1e40af] mt-1.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. HOW IT WORKS (4 STEPS) */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#E81E76] uppercase tracking-wider block">Fast & Paperless</span>
            <h3 className="text-xl sm:text-3xl font-black text-[#1e3a8a] font-['Outfit',sans-serif]">
              How the Disbursal Process Works
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.steps.map((step, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#1e40af] text-white flex items-center justify-center font-black text-sm font-['Outfit',sans-serif] mb-3">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1 font-['Outfit',sans-serif]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. MATCHED PARTNERS WITH DIRECT UNIQUE URLS */}
        <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-white rounded-2xl p-6 sm:p-10 border border-blue-200 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#1e40af] uppercase tracking-wider block">Top Lenders for this product</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                Recommended Partner Lenders
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.partners.map((partner, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-[#E81E76] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                      {partner.tag}
                    </span>
                    <span className="text-xs font-black text-slate-900">
                      From {partner.rate}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Direct online application with fast processing.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100">
                  <a
                    href={partner.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Apply with Partner</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. FAQS */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#E81E76]" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-4">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
