import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  Building2, 
  Home, 
  Calculator, 
  Sparkles,
  TrendingUp,
  Percent,
  Coins,
  CreditCard,
  Briefcase,
  Users,
  Handshake,
  PhoneCall,
  Check
} from 'lucide-react';
import { ProductPageData } from '../../data/productPagesData';
import { useRouter } from '../../context/RouterContext';
import { useSiteConfig } from '../../context/ConfigContext';
import { BankLogo } from '../BankLogos';
import { LapLoanEstimator } from '../LapLoanEstimator';
import { BenefitsSection } from '../BenefitsSection';
import { EligibilitySection } from '../EligibilitySection';
import { ChargesSection } from '../ChargesSection';
import { DocumentsSection } from '../DocumentsSection';
import { StepsSection } from '../StepsSection';
import { BankComparisonSection } from '../BankComparisonSection';

interface ProductPageProps {
  data: ProductPageData;
  onOpenApplyModal: (categoryName?: string) => void;
  onOpenPartnerModal?: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ 
  data, 
  onOpenApplyModal,
  onOpenPartnerModal 
}) => {
  const { navigate } = useRouter();
  const { handleActionUrl } = useSiteConfig();

  // State for DSA Commission Calculator on /loan-agent
  const [dsaVolume, setDsaVolume] = useState<number>(5000000); // 50 Lakhs
  const [dsaRate, setDsaRate] = useState<number>(2.0); // 2% average commission

  // For Home Loan / LAP interactive calculator widget on page
  const [calcAmount, setCalcAmount] = useState(
    data.slug === '/home-loan' ? 5000000 : data.slug === '/loan-against-property' ? 7500000 : 500000
  );
  const [calcTenure, setCalcTenure] = useState(data.slug === '/home-loan' ? 20 : data.slug === '/loan-against-property' ? 15 : 3);
  const [calcRate, setCalcRate] = useState(
    data.slug === '/home-loan' ? 7.10 : data.slug === '/loan-against-property' ? 7.75 : 10.49
  );

  // EMI formula
  const monthlyRate = calcRate / (12 * 100);
  const totalMonths = calcTenure * 12;
  const emi = Math.round(
    (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - calcAmount;

  const isSecuredProduct = data.slug === '/home-loan' || data.slug === '/loan-against-property';

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-1 hover:text-[#E81E76] transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate">{data.categoryName}</span>
        </div>

        {/* Popular Loan Categories Switcher Bar (5 Popular Options: Personal Loan, Credit Cards, Business Loan, Loan Agent, Home Loan) */}
        <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200/80 shadow-xs mb-6 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Popular Services:
            </span>
            {[
              { slug: '/personal-loan', en: 'Personal Loan', subtitle: 'Instant Cash', icon: Coins },
              { slug: '/credit-card', en: 'Credit Cards', subtitle: '5% Cashback', icon: CreditCard },
              { slug: '/business-loan', en: 'Business Loan', subtitle: 'MSME Growth', icon: Briefcase },
              { slug: '/loan-agent', en: 'Loan Agent', subtitle: 'DSA Partner', icon: Users },
              { slug: '/home-loan', en: 'Home Loan', subtitle: 'Lowest Rates', icon: Home }
            ].map((cat) => {
              const isActive = data.slug === cat.slug;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => navigate(cat.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1e40af] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-pink-50 hover:text-[#E81E76] border border-slate-200/60'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300' : 'text-slate-500'}`} />
                  <span>{cat.en}</span>
                  <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>({cat.subtitle})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12 mb-10 text-white shadow-xl bg-gradient-to-br ${data.heroGradient}`}>
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-pink-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-4 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>{data.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-['Outfit',sans-serif] tracking-tight leading-tight mb-4">
              {data.heroTagline}
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-8">
              {data.heroDescription}
            </p>

            {/* Quick 4 Stats Banners */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-white/15">
                <span className="text-[11px] text-blue-200 uppercase font-bold block">Starting Rate</span>
                <span className={`text-base sm:text-xl font-black font-['Outfit',sans-serif] ${data.heroAccent}`}>
                  {data.startingRate}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-white/15">
                <span className="text-[11px] text-blue-200 uppercase font-bold block">Maximum Loan</span>
                <span className="text-base sm:text-xl font-black text-white font-['Outfit',sans-serif]">
                  {data.maxAmount}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-white/15">
                <span className="text-[11px] text-blue-200 uppercase font-bold block">Tenure Range</span>
                <span className="text-base sm:text-xl font-black text-white font-['Outfit',sans-serif]">
                  {data.maxTenure}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 sm:p-4 border border-white/15">
                <span className="text-[11px] text-blue-200 uppercase font-bold block">Processing Fee</span>
                <span className="text-base sm:text-xl font-black text-pink-300 font-['Outfit',sans-serif]">
                  {data.processingFee}
                </span>
              </div>
            </div>

            {/* Hero Action CTA */}
            <div className="flex flex-wrap items-center gap-3">
              {data.slug === '/loan-agent' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (onOpenPartnerModal) {
                        onOpenPartnerModal();
                      } else {
                        onOpenApplyModal('Loan Agent');
                      }
                    }}
                    className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                    id="hero-apply-btn-loan-agent"
                  >
                    <Users className="w-4 h-4" />
                    <span>Register as Loan Agent (Free Registration)</span>
                  </button>
                  <a
                    href="https://wa.me/918006488006?text=Hi%2C%20I%20want%20to%20become%20a%20JinnyLoan%20Loan%20Agent%20%2F%20DSA%20Partner."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-xl backdrop-blur-xs border border-white/30 transition-all flex items-center gap-2"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : isSecuredProduct ? (
                <button
                  onClick={() => onOpenApplyModal(data.categoryName)}
                  className="px-6 py-3.5 bg-[#E81E76] hover:bg-[#c2145e] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                  id={`hero-apply-btn-${data.slug.replace('/', '')}`}
                >
                  <span>Apply / Request Callback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    const firstPartnerUrl = data.partners[0]?.externalUrl;
                    if (firstPartnerUrl) {
                      handleActionUrl(firstPartnerUrl, () => onOpenApplyModal(data.categoryName));
                    } else {
                      onOpenApplyModal(data.categoryName);
                    }
                  }}
                  className="px-6 py-3.5 bg-white text-slate-900 hover:bg-[#E81E76] hover:text-white font-extrabold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                  id={`hero-apply-btn-${data.slug.replace('/', '')}`}
                >
                  <span>Check Instant Offers</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              <span className="text-xs text-blue-200 font-medium">
                {data.slug === '/loan-agent' 
                  ? '✓ Zero investment • Instant mobile activation • Dedicated payout desk'
                  : isSecuredProduct ? '✓ Zero commission • Dedicated Relationship Manager' : '✓ 100% Paperless • Direct approval'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. FOR SECURED PRODUCTS (HOME LOAN & LAP): COLORFUL & ATTRACTIVE HIGHLIGHT PANELS */}
        {isSecuredProduct && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500/10 via-indigo-50/70 to-white rounded-3xl p-6 border-2 border-blue-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <Percent className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 block">Repo Rate Benchmark</span>
              <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif] mt-1 mb-2">
                Lowest External Benchmark (EBLR)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct repo-rate linked transmission guarantees immediate interest drops whenever RBI cuts policy rates.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 via-rose-50/70 to-white rounded-3xl p-6 border-2 border-pink-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#E81E76] text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#E81E76] block">High LTV Ratio</span>
              <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif] mt-1 mb-2">
                Up to 90% Valuation Financing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maximum funding against property cost minimizes out-of-pocket down payment, with flexible co-applicant pooling.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 via-teal-50/70 to-white rounded-3xl p-6 border-2 border-emerald-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block">Zero Hidden Burden</span>
              <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif] mt-1 mb-2">
                Zero Foreclosure Charges
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay off lump-sum amounts anytime or prepay partially without paying a single rupee in penalty or early termination fees.
              </p>
            </div>
          </div>
        )}

        {/* 3. VERIFIED PARTNERS COMPARISON GRID WITH UNIQUE EXTERNAL REDIRECTIONS */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#E81E76] uppercase tracking-wider block">
                {data.isDirectRedirect ? 'Direct Partner Application (No Internal Form)' : 'Compare & Choose'}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                Verified Partner Institutions for {data.categoryName}
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              {data.isDirectRedirect ? 'Click Apply Now to jump directly to the partner’s official portal.' : 'Select a partner or apply directly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.partners.map((partner, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs hover:border-[#1e40af] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-extrabold text-[#E81E76] bg-pink-50 px-3 py-1 rounded-full border border-pink-100 whitespace-nowrap">
                      {partner.badge}
                    </span>
                    <span className="text-xs font-black text-slate-900 font-['Outfit',sans-serif] text-right">
                      {partner.rate}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 shadow-2xs flex-shrink-0">
                      <BankLogo 
                        name={partner.logoName || partner.name} 
                        size="sm" 
                        showText={false} 
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif] leading-snug">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                        {partner.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Details stats */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 mb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Max Quantum:</span>
                      <span className="font-bold text-slate-800">{partner.maxAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Max Tenure:</span>
                      <span className="font-bold text-slate-800">{partner.tenure}</span>
                    </div>
                  </div>

                  {/* Feature bullet points */}
                  <div className="space-y-2 mb-6">
                    {partner.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partner CTA button: Lead Gen for Home Loan & LAP, Registration for Loan Agent, Direct Partner URL for Personal/Cards/Business */}
                <div>
                  {data.slug === '/loan-agent' ? (
                    <button
                      onClick={() => {
                        if (onOpenPartnerModal) {
                          onOpenPartnerModal();
                        } else {
                          onOpenApplyModal(`${partner.name} - Loan Agent`);
                        }
                      }}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Users className="w-4 h-4" />
                      <span>Register to Sell ({partner.name})</span>
                    </button>
                  ) : isSecuredProduct ? (
                    <button
                      onClick={() => onOpenApplyModal(`${partner.name} - ${data.categoryName}`)}
                      className="w-full py-3 px-4 bg-[#E81E76] hover:bg-[#c2145e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Apply via JinnyLoan</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={partner.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#1e40af] hover:bg-[#E81E76] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Apply on Partner Site</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                  <p className="text-[10px] text-slate-400 text-center mt-2 truncate">
                    {data.slug === '/loan-agent'
                      ? 'Partner registration is 100% free • No joining fee'
                      : isSecuredProduct ? 'Priority processing with dedicated RM' : `Official Partner Portal: ${partner.name}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DSA COMMISSION ESTIMATOR (FOR /loan-agent) */}
        {data.slug === '/loan-agent' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-200 shadow-md mb-12">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    DSA Commission Payout Estimator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculate your estimated monthly payout based on client loan disbursal volume.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Monthly Disbursed Loan Volume</label>
                    <span className="text-base font-black text-emerald-700 font-['Outfit',sans-serif]">
                      ₹{(dsaVolume / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={20000000}
                    step={250000}
                    value={dsaVolume}
                    onChange={e => setDsaVolume(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹5 Lakhs</span>
                    <span>₹2 Crores</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Average Commission Payout Rate</label>
                    <span className="text-base font-black text-emerald-700 font-['Outfit',sans-serif]">
                      {dsaRate}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Home Loan (0.6%)', rate: 0.6 },
                      { label: 'Business (1.8%)', rate: 1.8 },
                      { label: 'Personal Loan (2.5%)', rate: 2.5 }
                    ].map(item => (
                      <button
                        key={item.rate}
                        type="button"
                        onClick={() => setDsaRate(item.rate)}
                        className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          dsaRate === item.rate
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg">
                <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider block mb-1">
                  Estimated Monthly Earning
                </span>
                <div className="text-3xl sm:text-5xl font-black text-yellow-300 font-['Outfit',sans-serif] my-2">
                  ₹{Math.round((dsaVolume * dsaRate) / 100).toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-emerald-100 mb-6">
                  Direct credit into your bank account on every 10th of the month.
                </p>
                <button
                  onClick={() => {
                    if (onOpenPartnerModal) {
                      onOpenPartnerModal();
                    } else {
                      onOpenApplyModal('Loan Agent');
                    }
                  }}
                  className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Start Earning Today (Free Registration)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. DYNAMIC EMI CALCULATOR (SPECIALLY HIGHLIGHTED FOR HOME LOAN & LAP) */}
        {isSecuredProduct && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-md mb-12">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1e40af] flex items-center justify-center font-bold">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    Live {data.categoryName} EMI Estimator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adjust principal, tenure and rate to simulate your monthly outflow.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Loan Amount</label>
                    <span className="text-base font-black text-[#1e40af] font-['Outfit',sans-serif]">
                      ₹{(calcAmount / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000000}
                    max={20000000}
                    step={100000}
                    value={calcAmount}
                    onChange={e => setCalcAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e40af]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹10 Lakhs</span>
                    <span>₹2 Crores</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Tenure</label>
                    <span className="text-base font-black text-[#1e40af] font-['Outfit',sans-serif]">
                      {calcTenure} Years ({calcTenure * 12} Months)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    step={1}
                    value={calcTenure}
                    onChange={e => setCalcTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1e40af]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>3 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Interest Rate</label>
                    <span className="text-base font-black text-[#E81E76] font-['Outfit',sans-serif]">
                      {calcRate}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={7.0}
                    max={15.0}
                    step={0.05}
                    value={calcRate}
                    onChange={e => setCalcRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E81E76]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>7.0%</span>
                    <span>15.0%</span>
                  </div>
                </div>
              </div>

              {/* Calculated EMI Display Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-[#1e40af] text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center">
                <span className="text-xs text-blue-200 uppercase font-bold tracking-wider block mb-1">
                  Estimated Monthly Outflow
                </span>
                <div className="text-3xl sm:text-4xl font-black text-yellow-300 font-['Outfit',sans-serif] mb-6">
                  ₹{emi.toLocaleString('en-IN')} <span className="text-xs text-white font-normal">/ month</span>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-2 text-xs mb-6">
                  <div className="flex justify-between text-blue-100">
                    <span>Principal Amount:</span>
                    <span className="font-bold text-white">₹{calcAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Total Interest Payable:</span>
                    <span className="font-bold text-emerald-300">₹{totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-blue-100 pt-2 border-t border-white/15">
                    <span>Total Amount Payable:</span>
                    <span className="font-bold text-yellow-200">₹{totalPayment.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenApplyModal(`${data.categoryName} - Estimated EMI ₹${emi.toLocaleString('en-IN')}`)}
                  className="w-full py-3 bg-[#E81E76] hover:bg-[#d61266] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Apply for this Loan Amount
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4B. DEDICATED LAP LOAN ESTIMATOR: "How Much Can You Get Loan Against Your Property?" */}
        {data.slug === '/loan-against-property' && (
          <LapLoanEstimator onOpenApplyModal={onOpenApplyModal} />
        )}

        {/* 4C. DEDICATED BANK COMPARISON FOR SECURED PRODUCTS */}
        {isSecuredProduct && (
          <div className="mb-12">
            <BankComparisonSection onOpenApplyModal={onOpenApplyModal} />
          </div>
        )}

        {/* 5. OVERVIEW & BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-3">
              About {data.categoryName}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {data.overview}
            </p>
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1e40af] flex-shrink-0" />
              <p className="text-xs text-blue-900 font-medium">
                100% compliant with RBI consumer lending directives and fair practice guidelines.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-4">
              Key Highlights & Advantages
            </h3>
            <div className="space-y-3">
              {data.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-['Outfit',sans-serif]">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. ELIGIBILITY & REQUIRED DOCUMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Eligibility */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E81E76]" />
              <span>Eligibility Norms</span>
            </h3>
            <div className="space-y-3">
              {data.eligibility.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block mb-0.5">{item.criterion}</span>
                  <span className="text-xs text-slate-600">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1e40af]" />
              <span>Required Checklist</span>
            </h3>
            <div className="space-y-4">
              {data.documents.map((cat, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-bold text-[#1e40af] uppercase tracking-wider mb-2">
                    {cat.category}
                  </h4>
                  <ul className="space-y-1.5 pl-2 border-l-2 border-slate-200">
                    {cat.docs.map((doc, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6B. DEDICATED COMPREHENSIVE PRODUCT SECTIONS (For Home Loan & Loan Against Property) */}
        {isSecuredProduct && (
          <div className="space-y-12 mb-12">
            <BenefitsSection onOpenApplyModal={() => onOpenApplyModal(data.categoryName)} />
            <EligibilitySection onOpenApplyModal={() => onOpenApplyModal(data.categoryName)} />
            <ChargesSection onOpenApplyModal={() => onOpenApplyModal(data.categoryName)} />
            <DocumentsSection />
            <StepsSection onOpenApplyModal={() => onOpenApplyModal(data.categoryName)} />
          </div>
        )}

        {/* 7. HOW IT WORKS (STEP-BY-STEP) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#E81E76] uppercase tracking-wider block">Simplified Sanction Journey</span>
            <h3 className="text-xl sm:text-3xl font-black text-[#1e3a8a] font-['Outfit',sans-serif]">
              How to Apply for {data.categoryName}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.howItWorks.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
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

        {/* 8. FAQS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] font-['Outfit',sans-serif] mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#E81E76]" />
            <span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
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
