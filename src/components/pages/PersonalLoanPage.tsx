import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { CuratedOffersModal } from '../CuratedOffersModal';
import { BankLogo } from '../BankLogos';

interface PersonalLoanPageProps {
  onOpenApplyModal?: (categoryName?: string) => void;
}

export const PersonalLoanPage: React.FC<PersonalLoanPageProps> = ({ onOpenApplyModal }) => {
  const { navigate } = useRouter();

  // Tab state for Required Documents: 'salaried' | 'selfEmployed'
  const [activeDocTab, setActiveDocTab] = useState<'salaried' | 'selfEmployed'>('salaried');

  // Accordion state for FAQs (first one open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Testimonials carousel active slide index
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  // Modal state for Lender Selection ("Apply" button below 3 steps)
  const [showLenderModal, setShowLenderModal] = useState<boolean>(false);

  const lendingPartners = [
    { name: 'KreditBee', src: '/assets/personal-loan/image-10-300x86.webp', url: 'https://kreditbee.in' },
    { name: 'moneyview', bankKey: 'moneyview', url: 'https://moneyview.in' },
    { name: 'IndusInd Bank', bankKey: 'indusind', url: 'https://www.indusind.com' },
    { name: 'Axis Bank', bankKey: 'axis', url: 'https://www.axisbank.com' },
    { name: 'Cashe', src: '/assets/personal-loan/image-51-1-300x79.webp', url: 'https://cashe.co.in' },
    { name: 'PaySense', src: '/assets/personal-loan/image-50-1-300x83.webp', url: 'https://www.gopaysense.com' },
    { name: 'Prefr', src: '/assets/personal-loan/image-49-1-300x77.webp', url: 'https://prefr.com' },
    { name: 'Fibe', src: '/assets/personal-loan/image-52-1-300x88.webp', url: 'https://fibe.in' },
    { name: 'Zype', src: '/assets/personal-loan/image-53-1-300x50.webp', url: 'https://getzype.com' },
    { name: 'MoneyTap', src: '/assets/personal-loan/image-12-300x52.webp', url: 'https://moneytap.com' },
    { name: 'Tata Capital', bankKey: 'tatacapital', url: 'https://bitli.in/H5QN6Tz' },
    { name: 'Poonawalla Fincorp', bankKey: 'poonawalla', url: 'https://bitli.in/VqSU8fF' },
    { name: 'Aditya Birla', bankKey: 'aditya birla', url: 'https://bitli.in/5OXZt6Z' }
  ];

  const testimonials = [
    {
      author: 'Ritik Kumar',
      quote: 'Thanks to jinnyLoan. I was able to consolidate my debt and lower my monthly payments.'
    },
    {
      author: 'Aman Kumar',
      quote: 'Applying for a personal loan with jinnyLoan was seamless. The team provided great support.'
    },
    {
      author: 'Amit Dixit',
      quote: 'I needed funds for a home renovation project, & jinnyLoan provided personalized loan options.'
    },
    {
      author: 'Ritik Kumar',
      quote: 'Thanks to jinnyLoan. I was able to consolidate my debt and lower my monthly payments.'
    },
    {
      author: 'Aman Kumar',
      quote: 'Applying for a personal loan with jinnyLoan was seamless. The team provided great support.'
    },
    {
      author: 'Abhijit Singh',
      quote: 'I needed funds for a home renovation project, & jinnyLoan provided personalized loan options.'
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    if (onOpenApplyModal) {
      onOpenApplyModal('Personal Loan');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-slate-900 font-['Poppins',sans-serif] selection:bg-[#FF617A] selection:text-white pb-24 md:pb-12">
      
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-1 hover:text-[#FF617A] transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Personal Loan</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO CONTAINER (elementor-element-f8f123f)                     */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6" id="personal-loan-hero">
        <div className="flex flex-col items-start gap-1 sm:gap-2">
          
          {/* Subtitle */}
          <h2 className="text-[#54595F] text-[16px] sm:text-[20px] md:text-[30px] font-normal leading-snug">
            Loans for every Credit Profile.
          </h2>

          {/* Main Title */}
          <h1 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium leading-snug mb-3">
            Get Instant Personal Loans – Low Interest Rates
          </h1>

          {/* 3 Top Feature Boxes (Upto 15Lakhs, Interest 9.90%, Disbursal 5 min) */}
          <div className="w-full grid grid-cols-3 gap-2 sm:gap-6 my-3 sm:my-5">
            {/* Box 1 */}
            <div className="flex flex-col items-center justify-start text-center">
              <div className="w-[70px] sm:w-[110px] md:w-[140px] aspect-square flex items-center justify-center mb-1">
                <img 
                  src="/assets/personal-loan/b55d38e9-e177-4a4f-a3b9-ca4b83f3d3a9.png" 
                  alt="Upto ₹15 lakhs" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[#4A4A4A] text-[13px] sm:text-[18px] font-medium leading-tight">
                Upto ₹15 lakhs
              </h3>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center justify-start text-center">
              <div className="w-[70px] sm:w-[110px] md:w-[140px] aspect-square flex items-center justify-center mb-1">
                <img 
                  src="/assets/personal-loan/786f2906-3a51-449c-863a-d396f312cf19.png" 
                  alt="Interest from 9.90%" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[#4A4A4A] text-[13px] sm:text-[18px] font-medium leading-tight">
                Interest from 9.90%
              </h3>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center justify-start text-center">
              <div className="w-[70px] sm:w-[110px] md:w-[140px] aspect-square flex items-center justify-center mb-1">
                <img 
                  src="/assets/personal-loan/b002a54e-5c52-4a7b-8f38-238f2b049ddf.png" 
                  alt="Disbursal in 5 mints" 
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[#4A4A4A] text-[13px] sm:text-[18px] font-medium leading-tight">
                Disbursal in 5 mints
              </h3>
            </div>
          </div>

          {/* Stats Pill (Total Disbursed ₹650 Crore | Trusted by 4 lakh+ Indians) */}
          <div className="w-full mt-2 sm:mt-4">
            <div className="w-full border-2 border-[#C5DDF6] rounded-[30px] py-1.5 sm:py-2 px-2 sm:px-4 flex items-center justify-around bg-white">
              
              {/* Stat 1 */}
              <div className="w-1/2 text-center border-r-2 border-[#C5DDF6] pr-2">
                <p className="text-[#111111] text-[12px] sm:text-[16px] font-normal leading-tight">
                  Total Loan Disbursed
                </p>
                <h4 className="text-[#555555] text-[14px] sm:text-[16px] font-medium leading-tight mt-0.5">
                  ₹650 Crore
                </h4>
              </div>

              {/* Stat 2 */}
              <div className="w-1/2 text-center pl-2">
                <p className="text-[#111111] text-[12px] sm:text-[16px] font-normal leading-tight">
                  Trusted by
                </p>
                <h4 className="text-[#555555] text-[14px] sm:text-[16px] font-medium leading-tight mt-0.5">
                  4 lakh + Indians
                </h4>
              </div>

            </div>
          </div>

          {/* Desktop Call to Action Button */}
          <div className="hidden md:flex justify-center w-full mt-5">
            <a
              href="https://loan4u.banksupport.in/brands/9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className="bg-[#FF617A] hover:bg-[#e84e67] text-white font-medium text-[17px] py-2.5 px-8 rounded-[20px] transition-all transform hover:scale-[1.02] shadow-sm flex items-center gap-2"
            >
              <span>Check Offers Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: LENDING PARTNERS CONTINUOUS NONSTOP SLIDER                      */}
      {/* ========================================================================= */}
      <section 
        className="bg-white py-4 sm:py-6 border-y border-slate-100 overflow-hidden relative" 
        id="personal-loan-partners"
      >
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="w-full overflow-hidden">
          <div className="animate-marquee-continuous flex items-center gap-8 sm:gap-12 md:gap-14 py-1">
            {/* Render partner list duplicated twice for continuous seamless infinite loop without stopping */}
            {[...lendingPartners, ...lendingPartners].map((partner, index) => (
              <div 
                key={index}
                onClick={() => {
                  if (partner.url) {
                    window.open(partner.url, '_blank', 'noopener,noreferrer');
                  } else {
                    setShowLenderModal(true);
                  }
                }}
                className="flex-shrink-0 h-10 sm:h-12 min-w-[110px] sm:min-w-[135px] flex items-center justify-center filter-none hover:grayscale hover:opacity-75 transition-all duration-300 cursor-pointer hover:scale-105"
                title={`View ${partner.name} Personal Loan Offers`}
              >
                {partner.src ? (
                  <img 
                    src={partner.src} 
                    alt={partner.name} 
                    className="max-h-7 sm:max-h-9 max-w-[110px] sm:max-w-[130px] object-contain"
                  />
                ) : partner.bankKey ? (
                  <BankLogo 
                    name={partner.bankKey} 
                    size="sm" 
                    showText={true} 
                  />
                ) : (
                  <span className="font-bold text-slate-800 text-sm">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: 3 EASY STEPS (elementor-element-269ad1c)                       */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10" id="personal-loan-steps">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6 sm:mb-8">
          Get your loan in 3 easy steps
        </h2>

        <div className="space-y-4 sm:space-y-6">
          
          {/* Step 1 */}
          <div className="flex items-start gap-4 sm:gap-6 bg-white p-3 sm:p-4 rounded-xl border border-slate-100 hover:shadow-xs transition-shadow">
            <div className="w-10 sm:w-12 md:w-14 flex-shrink-0 flex items-center justify-center pt-1">
              <img 
                src="/assets/personal-loan/image-33-1.webp" 
                alt="Apply and Verify" 
                className="w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-snug">
                Apply and Verify:
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] leading-relaxed mt-1">
                Fill the form. then verify your mobile number with the OTP
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 sm:gap-6 bg-white p-3 sm:p-4 rounded-xl border border-slate-100 hover:shadow-xs transition-shadow">
            <div className="w-10 sm:w-12 md:w-14 flex-shrink-0 flex items-center justify-center pt-1">
              <img 
                src="/assets/personal-loan/image-31-1.webp" 
                alt="Fill Details and View Offers" 
                className="w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-snug">
                Fill Details and View Offers:
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] leading-relaxed mt-1">
                Enter your personal. and income details. agree to the terms, and click 'See All Offers' to view eligible lenders.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 sm:gap-6 bg-white p-3 sm:p-4 rounded-xl border border-slate-100 hover:shadow-xs transition-shadow">
            <div className="w-10 sm:w-12 md:w-14 flex-shrink-0 flex items-center justify-center pt-1">
              <img 
                src="/assets/personal-loan/image-32-1.webp" 
                alt="Choose Lender & Get Disbursal" 
                className="w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-snug">
                Choose Lender &amp; Get Disbursal:
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] leading-relaxed mt-1">
                Select a lender and once approved, the loan amount will be disbursed instantly.
              </p>
            </div>
          </div>

        </div>

        {/* Apply CTA Button below 3 Steps */}
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => setShowLenderModal(true)}
            className="w-full sm:w-auto px-10 py-3.5 bg-[#FF617A] hover:bg-[#e84e67] text-white font-medium text-[16px] sm:text-[18px] rounded-[30px] shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
            id="steps-apply-now-btn"
          >
            <span>Apply Now &amp; View Available Lenders</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-500 mt-2.5 font-normal">
            ✓ Check instant pre-approved offers across 6+ top banks &amp; NBFCs
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHY CHOOSE JINNYLOAN ? (elementor-element-21d3811)              */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-why">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Why choose jinnyLoan ?
        </h2>

        {/* Card with soft grey shadow and 20px border radius */}
        <div className="bg-white rounded-[20px] shadow-[0px_0px_10px_0px_rgba(150.91,150.91,150.91,0.5)] p-5 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Row 1 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                Your Money, Our Expertise
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                jinnyLoan: India's Trusted Financial Expert
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                100% Digital Loans
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                No Paperwork. No Collateral
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                Best Loan Offers
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                Lowest Rate, Flexible tenures
              </p>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                RBI Registered Partners
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                Borrow securely from Reliable lenders
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: REQUIRED DOCUMENTS (elementor-element-af1f8c3)                  */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-documents">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Required Documents
        </h2>

        {/* Tab Buttons */}
        <div className="flex items-center justify-start gap-3 mb-3">
          <button
            onClick={() => setActiveDocTab('salaried')}
            className={`px-6 py-2 rounded-[30px] text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer ${
              activeDocTab === 'salaried'
                ? 'bg-[#FF617A] text-white shadow-xs'
                : 'bg-[#1e293b] text-white hover:bg-[#334155]'
            }`}
          >
            Salaried
          </button>

          <button
            onClick={() => setActiveDocTab('selfEmployed')}
            className={`px-6 py-2 rounded-[30px] text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer ${
              activeDocTab === 'selfEmployed'
                ? 'bg-[#FF617A] text-white shadow-xs'
                : 'bg-[#1e293b] text-white hover:bg-[#334155]'
            }`}
          >
            Self Employed
          </button>
        </div>

        {/* Mint / Cyan Box (#EDFFFD) with 20px radius */}
        <div className="bg-[#EDFFFD] rounded-[20px] p-5 sm:p-7 space-y-4">
          {activeDocTab === 'salaried' ? (
            <>
              {/* Salaried Item 1 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Identitv Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  PAN. Aadhaar, Passport. or Voter ID
                </p>
              </div>

              {/* Salaried Item 2 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Address Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  utility bill. Aadhaar. Passport. or Rent Agreement
                </p>
              </div>

              {/* Salaried Item 3 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Income Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  Last 3-6 months' salary slips and bank
                </p>
              </div>

              {/* Salaried Item 4 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Employment Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  Company ID or Appointment LetterPassport-size Photo
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Self-Employed Item 1 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Identitv Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  PAN. Aadhaar, Passport. or Voter ID
                </p>
              </div>

              {/* Self-Employed Item 2 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Address Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  utility bill. Aadhaar. Passport. or Rent Agreement
                </p>
              </div>

              {/* Self-Employed Item 3 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Income Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  Last 3-6 months' and bank
                </p>
              </div>

              {/* Self-Employed Item 4 */}
              <div>
                <span className="font-semibold text-black text-[14px] sm:text-[16px]">
                  Additional Proof:
                </span>
                <p className="text-black text-[13px] sm:text-[15px] mt-0.5">
                  You may require additional documents depending on the type ofprofession you practice and your organizational set-up.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PERSONAL LOAN COMPARISON TABLE (elementor-element-1e86daa)      */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-comparison">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Personal Loan Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black bg-white text-left">
            <thead>
              <tr className="bg-white">
                <th className="border border-black p-3 sm:p-4 text-[14px] sm:text-[17px] font-medium text-black w-1/3">
                  Feature
                </th>
                <th className="border border-black p-3 sm:p-4 text-[14px] sm:text-[17px] font-medium text-black w-1/3">
                  jinnyLoan
                </th>
                <th className="border border-black p-3 sm:p-4 text-[14px] sm:text-[17px] font-medium text-black w-1/3">
                  Other Aggregators
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Interest Rate
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  0.83% per month
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  1.2%+ per month
                </td>
              </tr>
              <tr>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Approval Time
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Within minutes
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  24-48 Hours
                </td>
              </tr>
              <tr>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Processing Fees
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  upto 2%
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Upto 3.5%
                </td>
              </tr>
              <tr>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  PrepaymentCharges
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  0 - 5%
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  0 - 7%
                </td>
              </tr>
              <tr>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Late Payment Charges
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Up to ₹250 for physical copy
                </td>
                <td className="border border-black p-3 sm:p-4 text-[13px] sm:text-[15px] font-normal text-black">
                  Up to ₹250 for physical copy
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: TESTIMONIALS (elementor-element-4b5a7ed)                         */}
      {/* ========================================================================= */}
      <section 
        className="py-10 sm:py-14 my-4 bg-cover bg-center relative" 
        style={{ backgroundImage: "url('/assets/personal-loan/testimonials-bg.webp')" }}
        id="personal-loan-testimonials"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-8">
            Testimonials
          </h2>

          {/* Testimonial slider / cards container */}
          <div className="relative">
            
            {/* 1 Single Card Per Slide On All Screens */}
            <div className="max-w-2xl mx-auto">
              <div
                className="rounded-[20px] p-6 sm:p-10 min-h-[200px] sm:min-h-[230px] flex flex-col justify-between border border-slate-200/80 shadow-md bg-cover bg-no-repeat bg-bottom-left transition-all duration-300"
                style={{ 
                  backgroundImage: "url('/assets/personal-loan/image-24-1.webp')",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  <span className="text-sm tracking-widest">★★★★★</span>
                </div>
                <p className="text-black text-[15px] sm:text-[18px] leading-relaxed font-normal italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-black text-[16px] sm:text-[19px] font-semibold">
                      {testimonials[activeTestimonial].author}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">Verified JinnyLoan Borrower</span>
                  </div>
                  <span className="text-xs text-[#FF617A] font-bold bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                    Loan Disbursed
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#FF617A] hover:border-[#FF617A] transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <span 
                    key={i} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeTestimonial ? 'bg-[#FF617A] w-6' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#FF617A] hover:border-[#FF617A] transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: LOAN REPAYMENT TERMS (elementor-element-a2a4da8)                 */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-terms">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Loan Repayment Terms
        </h2>

        {/* Card with 2px solid #C5DDF6 and 20px border radius */}
        <div className="border-2 border-[#C5DDF6] rounded-[20px] p-5 sm:p-8 space-y-6 bg-white">
          
          {/* Term 1 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-33-1.webp" 
                alt="Repayment Period" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Repayment Period .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                Min: 3 Months, Max: 60 Months
              </p>
            </div>
          </div>

          {/* Term 2 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-33-1.webp" 
                alt="APR Range" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                APR Range .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                2% to 35%, with a maximum APR of 20%, depending on loan amount and repayment period
              </p>
            </div>
          </div>

          {/* Term 3 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-33-1.webp" 
                alt="Representative Example" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Representative Example .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                For a ₹ 10,00,000 loan with an 18% APR over 60 months, the monthly repayment is totaling ₹17,81,079 with interest and processing fees.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: ELIGIBILITY CRITERIA (elementor-element-dd0291b)                */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-eligibility">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Eligibility Criteria
        </h2>

        {/* Card with 2px solid #C5DDF6 and 20px border radius */}
        <div className="border-2 border-[#C5DDF6] rounded-[20px] p-5 sm:p-8 space-y-6 bg-white">
          
          {/* Criteria 1 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-31-1.webp" 
                alt="Age" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Age .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                Most lenders accept applicants between 21 to 60 years of age. Note: Some lenders may have a higher minimum age (like 23) or a lower maximum limit depending on employment type.
              </p>
            </div>
          </div>

          {/* Criteria 2 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-31-1.webp" 
                alt="Employment Type" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Employment Type .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                You must be either a salaried employee or a self-employed professional.
              </p>
            </div>
          </div>

          {/* Criteria 3 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-31-1.webp" 
                alt="Minimum Monthly Income" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Minimum Monthly Income .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                A steady monthly Income of Rs 15000 or more is usually required.
              </p>
            </div>
          </div>

          {/* Criteria 4 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-31-1.webp" 
                alt="Credit Score" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Credit Score .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                A CIBIL Score of 680 or above is often preferred
              </p>
            </div>
          </div>

          {/* Criteria 5 */}
          <div className="flex items-start gap-4">
            <div className="w-6 sm:w-8 flex-shrink-0 pt-1">
              <img 
                src="/assets/personal-loan/image-31-1.webp" 
                alt="Work Experience" 
                className="w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-black text-[15px] sm:text-[17px] leading-tight">
                Work Experience .
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-1 leading-snug">
                Typically. you should have at least 1 year of continuousemployment.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: INTEREST RATES & PENALTY CHARGES (elementor-element-4666bd7)  */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-rates">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Interest Rates &amp; Penalty Charges
        </h2>

        {/* Card with soft grey shadow and 20px border radius */}
        <div className="bg-white rounded-[20px] shadow-[0px_0px_10px_0px_rgba(150.91,150.91,150.91,0.5)] p-5 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Row 1 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                Monthly ROI
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                0.9% to 3%
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                Annual APR
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                10.5% to 45% other charges
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                Cheque Bounce
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                ₹500 per instance
              </p>
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 pt-0.5">
              <img 
                src="/assets/personal-loan/sparkle_only_ff617a.webp" 
                alt="sparkle" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-black text-[15px] sm:text-[17px] leading-tight">
                Late Payment
              </h3>
              <p className="text-[#444444] text-[13px] sm:text-[15px] mt-0.5 leading-snug">
                2% per month on overdue EMI
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: FREQUENTLY ASKED QUESTIONS (elementor-element-3a8642f)         */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8" id="personal-loan-faqs">
        <h2 className="text-[#FF617A] text-[18px] sm:text-[25px] md:text-[30px] font-medium text-center mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          
          {/* FAQ 1 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleFaq(0)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-medium text-[15px] sm:text-[17px] text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Q. Top reason to choose Personal Loans through JinnyLoan</span>
              <span className="text-slate-600 flex-shrink-0 ml-2">
                {openFaqIndex === 0 ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            {openFaqIndex === 0 && (
              <div className="p-4 sm:p-5 pt-0 text-[14px] sm:text-[15px] text-slate-700 space-y-2 border-t border-slate-100 bg-slate-50/50">
                <p>JinnyLoan through its Digital lending Partner offer unique benefits to users as given below –</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Get any amount from Rs. 5,000 to Rs. 15,00,000 instantly</li>
                  <li>Check your loan eligibility in just 2 minutes</li>
                  <li>Flexible repayment options that can extend up to 5 years</li>
                  <li>Instant loan amount disbursement directly to your account in just a few minutes after application approval</li>
                  <li>Affordable and economical interest rates, starting at just 1.16% per month (14% Annually*)</li>
                  <li>Hassle-free digital application process allowing you to apply for instant personal loans from anywhere</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-medium text-[15px] sm:text-[17px] text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Q.  Eligibility Criteria For Personal Loans ?</span>
              <span className="text-slate-600 flex-shrink-0 ml-2">
                {openFaqIndex === 1 ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            {openFaqIndex === 1 && (
              <div className="p-4 sm:p-5 pt-0 text-[14px] sm:text-[15px] text-slate-700 space-y-2 border-t border-slate-100 bg-slate-50/50">
                <p>Personal loans have simple eligibility criteria. To qualify for a loan –</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The applicant’s age should be 21-57 years.</li>
                  <li>They must be salaried or self-employed.</li>
                  <li>A monthly household income of Rs. 15000 or more.</li>
                  <li>The income must be credited directly to the bank account.</li>
                  <li>A minimum CIBIL score of 650 is required.</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleFaq(2)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-medium text-[15px] sm:text-[17px] text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Q.  What Can you Use Personal Loans For ?</span>
              <span className="text-slate-600 flex-shrink-0 ml-2">
                {openFaqIndex === 2 ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            {openFaqIndex === 2 && (
              <div className="p-4 sm:p-5 pt-0 text-[14px] sm:text-[15px] text-slate-700 space-y-2 border-t border-slate-100 bg-slate-50/50">
                <p>Personal loans are versatile and have no restrictions on end usage. Listed below are some of the most popular reasons why people take our instant loans:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Weddings</li>
                  <li>Medical emergencies</li>
                  <li>Travel expenses</li>
                  <li>Home Renovation projects</li>
                  <li>Education purposes</li>
                  <li>Business ventures</li>
                  <li>Big purchases</li>
                  <li>Household expenses</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleFaq(3)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-medium text-[15px] sm:text-[17px] text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Q. What are the Benefit of Choosing JinnyLoan .</span>
              <span className="text-slate-600 flex-shrink-0 ml-2">
                {openFaqIndex === 3 ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            {openFaqIndex === 3 && (
              <div className="p-4 sm:p-5 pt-0 text-[14px] sm:text-[15px] text-slate-700 space-y-2 border-t border-slate-100 bg-slate-50/50">
                <p>Here’s why JinnyLoan.com website .</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Quick Disbursement – </strong>Any financial emergencies need to be addressed instantly. Hence, we ensure the funds are credited to your account within a few minutes of loan approval.</li>
                  <li><strong>Hassle-free Application Process – </strong>We aim to make borrowing simple. That’s why our loan application process, from start to finish, is entirely digital, giving you the freedom to complete all the steps from the comfort of your home.</li>
                  <li><strong>Minimal Documentation – </strong>We mainly require your PAN, a selfie, and a mobile number linked to your Aadhaar. We may ask for additional documentation, depending on your profile.</li>
                </ul>
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleFaq(4)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-medium text-[15px] sm:text-[17px] text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span>Q. Will there Be a credit Report inquiry when I Apply For an Instant Loans.</span>
              <span className="text-slate-600 flex-shrink-0 ml-2">
                {openFaqIndex === 4 ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            {openFaqIndex === 4 && (
              <div className="p-4 sm:p-5 pt-0 text-[14px] sm:text-[15px] text-slate-700 border-t border-slate-100 bg-slate-50/50">
                <p>Yes. Our Digital Lending Partners do a credit report inquiry of every borrower applying for an instant loan. It is a quick process to assess the credit profile of the applicant.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: MOBILE STICKY BUTTON (elementor-element-7d8bcd1)               */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl">
        <a
          href="https://loan4u.banksupport.in/brands/9"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleApplyClick}
          className="w-full bg-[#FF617A] hover:bg-[#e84e67] text-white font-medium text-[17px] py-3 px-6 rounded-[20px] text-center block transition-all shadow-md active:scale-98"
        >
          Check Offers Now
        </a>
      </div>

      {/* Multi-Lender Selection Modal for Personal Loan */}
      <CuratedOffersModal
        isOpen={showLenderModal}
        type="personal-loan"
        onClose={() => setShowLenderModal(false)}
        onOpenApplyModal={onOpenApplyModal}
      />

    </div>
  );
};
