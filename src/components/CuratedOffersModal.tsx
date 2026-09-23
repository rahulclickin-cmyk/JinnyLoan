import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Percent, 
  CreditCard, 
  Briefcase, 
  Coins, 
  Building2,
  ChevronRight,
  Filter,
  Flame,
  Award
} from 'lucide-react';
import { BankLogo } from './BankLogos';
import { useSiteConfig } from '../context/ConfigContext';

export type OfferModalType = 'personal-loan' | 'credit-card' | 'business-loan' | null;

interface CuratedOffersModalProps {
  isOpen: boolean;
  type: OfferModalType;
  onClose: () => void;
  onOpenApplyModal?: (lenderName: string) => void;
}

export interface CuratedOfferItem {
  id: string;
  name: string;
  bankLogoName: string;
  badge: string;
  rateOrReward: string;
  maxAmountOrFee: string;
  tenureOrGrace: string;
  approvalSpeed: string;
  features: string[];
  externalUrl?: string;
  specialPerk?: string;
  recommended?: boolean;
}

export const PERSONAL_LOAN_LENDERS: CuratedOfferItem[] = [
  {
    id: 'pl-poonawalla',
    name: 'Poonawalla Fincorp',
    bankLogoName: 'Poonawalla',
    badge: 'Lowest Interest Rate',
    rateOrReward: '9.99% p.a.',
    maxAmountOrFee: 'Up to ₹30 Lakhs',
    tenureOrGrace: '12 to 60 Months',
    approvalSpeed: 'Instant 10-Min Sanction',
    recommended: true,
    features: ['100% digital paperless approval', 'Zero physical branch visits', 'Lowest processing charges'],
    specialPerk: 'Special interest rebate for salaried borrowers earning ₹25k+',
    externalUrl: 'https://bitli.in/VqSU8fF'
  },
  {
    id: 'pl-aditya-birla',
    name: 'Aditya Birla Capital',
    bankLogoName: 'Aditya Birla',
    badge: 'Fastest Account Disbursal',
    rateOrReward: '10.49% p.a.',
    maxAmountOrFee: 'Up to ₹5 Lakhs',
    tenureOrGrace: '12 to 36 Months',
    approvalSpeed: 'Same Day NEFT Credit',
    features: ['Minimal documentation', 'Instant Aadhaar e-KYC', 'Transparent charges'],
    specialPerk: 'Instant approval on WhatsApp & digital app',
    externalUrl: 'https://bitli.in/5OXZt6Z'
  },
  {
    id: 'pl-tata-capital',
    name: 'Tata Capital',
    bankLogoName: 'Tata Capital',
    badge: 'Top Corporate Trust',
    rateOrReward: '10.99% p.a.',
    maxAmountOrFee: 'Up to ₹15 Lakhs',
    tenureOrGrace: '12 to 48 Months',
    approvalSpeed: 'Within 24 Hours',
    features: ['Flexible bullet prepayment', 'Overdraft credit line facility', 'Trusted Tata backing'],
    specialPerk: 'Concessional rates for MNC & government employees',
    externalUrl: 'https://bitli.in/H5QN6Tz'
  },
  {
    id: 'pl-kreditbee',
    name: 'KreditBee',
    bankLogoName: 'KreditBee',
    badge: 'Emergency Cash / Small Ticket',
    rateOrReward: '1.25% per month',
    maxAmountOrFee: 'Up to ₹4 Lakhs',
    tenureOrGrace: '3 to 24 Months',
    approvalSpeed: '15-Minute Disbursal',
    features: ['Approval for freshers & first-time borrowers', 'Direct UPI / IMPS payout', 'No collateral'],
    specialPerk: 'Instant disbursal directly to any Indian bank savings account',
    externalUrl: 'https://kreditbee.in'
  },
  {
    id: 'pl-fibe',
    name: 'Fibe (EarlySalary)',
    bankLogoName: 'Fibe',
    badge: 'Young Salaried Special',
    rateOrReward: '12.00% p.a.',
    maxAmountOrFee: 'Up to ₹5 Lakhs',
    tenureOrGrace: '3 to 36 Months',
    approvalSpeed: '10-Minute Sanction',
    features: ['Zero foreclosure fees after 6 EMIs', 'Salary advance & flexible limits', '100% in-app journey'],
    specialPerk: 'Instant credit card alternative with flexible EMI tenures',
    externalUrl: 'https://fibe.in'
  },
  {
    id: 'pl-cashe',
    name: 'CASHe',
    bankLogoName: 'CASHe',
    badge: 'AI Social Loan Quotient',
    rateOrReward: '1.50% per month',
    maxAmountOrFee: 'Up to ₹4 Lakhs',
    tenureOrGrace: '3 to 18 Months',
    approvalSpeed: 'Instant Disbursal',
    features: ['Proprietary SLQ credit score evaluation', 'No traditional credit score required', 'Quick KYC'],
    specialPerk: 'Buy now pay later on top ecommerce stores',
    externalUrl: 'https://cashe.co.in'
  }
];

export const CREDIT_CARD_OFFERS: CuratedOfferItem[] = [
  {
    id: 'cc-hdfc-millennia',
    name: 'HDFC Millennia Platinum Card',
    bankLogoName: 'HDFC',
    badge: '🔥 #1 Most Popular Cashback Card',
    rateOrReward: '5% Unlimited Cashback',
    maxAmountOrFee: 'Lifetime Free Offer Available',
    tenureOrGrace: 'Up to 50 Days Interest Free',
    approvalSpeed: 'Instant Virtual Issuance',
    recommended: true,
    features: ['5% cashback on Amazon, Flipkart, Swiggy, Zomato, Uber & Myntra', '1% flat cashback on all other online & offline spends', '4 Complimentary Domestic Airport Lounge visits/year'],
    specialPerk: '₹1,000 gift voucher upon spending ₹1 Lakh in calendar quarter',
    externalUrl: 'https://bitli.in/I9ySv3I'
  },
  {
    id: 'cc-axis-ace',
    name: 'Axis Bank ACE Credit Card',
    bankLogoName: 'Axis Bank',
    badge: 'Best Utility Bill Saver',
    rateOrReward: '5% on Google Pay Bills',
    maxAmountOrFee: '₹499 (Waived on Spends)',
    tenureOrGrace: 'Up to 50 Days Grace Period',
    approvalSpeed: 'Instant In-Principle',
    features: ['5% cashback on DTH, electricity & mobile bills via Google Pay', '4% on Swiggy, Zomato & Ola', '2% uncapped cashback on all other purchases'],
    specialPerk: '4 complimentary domestic airport lounge visits per calendar year',
    externalUrl: 'https://bitli.in/ZTidWoV'
  },
  {
    id: 'cc-sbi-simplyclick',
    name: 'SBI SimplyCLICK Card',
    bankLogoName: 'SBI',
    badge: 'Best Online Shopping Rewards',
    rateOrReward: '10X Reward Points',
    maxAmountOrFee: '₹499 Annual Fee (Reversible)',
    tenureOrGrace: 'Up to 50 Days Interest Free',
    approvalSpeed: 'Fast Digital KYC',
    features: ['10X reward points on partner apps (Amazon, BookMyShow, Cleartrip)', '5X reward points on all other online spends', '1% fuel surcharge waiver across India'],
    specialPerk: '₹500 Amazon Gift e-voucher instantly upon welcome fee payment',
    externalUrl: 'https://bitli.in/Q9vpVjd'
  },
  {
    id: 'cc-amazon-icici',
    name: 'Amazon Pay ICICI Credit Card',
    bankLogoName: 'ICICI',
    badge: 'Zero Fee Forever (LTF)',
    rateOrReward: '5% Amazon Pay Cashback',
    maxAmountOrFee: '₹0 Joining & ₹0 Annual Fee',
    tenureOrGrace: 'Up to 50 Days Interest Free',
    approvalSpeed: '100% Paperless Digital',
    features: ['5% cashback for Amazon Prime members directly to wallet', '2% cashback on 100+ partner merchants', '1% flat cashback on all offline spends'],
    specialPerk: 'No minimum spends required to keep card free for lifetime',
    externalUrl: 'https://bitli.in/tz5iKIO'
  },
  {
    id: 'cc-kotak-league',
    name: 'Kotak League Platinum Card',
    bankLogoName: 'Kotak',
    badge: 'Entertainment & Free PVR Tickets',
    rateOrReward: '8X Reward Points',
    maxAmountOrFee: 'Free for Salary Account Holders',
    tenureOrGrace: 'Up to 48 Days Grace',
    approvalSpeed: 'Instant Video KYC',
    features: ['4 Free PVR movie tickets or 10,000 reward points every 6 months', '8X reward points on apparel, travel, grocery & dining', 'Fuel surcharge waiver'],
    specialPerk: 'Complimentary priority pass airport lounge access programs',
    externalUrl: 'https://bitli.in/xtG7uh9'
  }
];

export const BUSINESS_LOAN_LENDERS: CuratedOfferItem[] = [
  {
    id: 'bl-tata-capital',
    name: 'Tata Capital Business Loan',
    bankLogoName: 'Tata Capital',
    badge: '🔥 Highest Approval Limit',
    rateOrReward: 'From 11.25% p.a.',
    maxAmountOrFee: 'Up to ₹75 Lakhs Collateral-Free',
    tenureOrGrace: '12 to 60 Months',
    approvalSpeed: 'Sanction in 48 Hours',
    recommended: true,
    features: ['Zero collateral or property pledge required', 'Overdraft & term loan facilities available', 'Flexible EMI & bullet repayment options'],
    specialPerk: 'Subsidized interest concessions for GST-registered MSME manufacturers',
    externalUrl: 'https://www.tatacapital.com/business-loan.html'
  },
  {
    id: 'bl-aditya-birla',
    name: 'Aditya Birla MSME Finance',
    bankLogoName: 'Aditya Birla',
    badge: 'Best Revolving Line of Credit',
    rateOrReward: 'From 11.49% p.a.',
    maxAmountOrFee: 'Up to ₹50 Lakhs',
    tenureOrGrace: '12 to 48 Months',
    approvalSpeed: 'Fast Digital Assessment',
    features: ['Interest charged only on the exact funds utilized', 'Seamless net banking and GST portal sync', 'Quick collateral-free sanction'],
    specialPerk: 'Ideal for seasonal retailers needing working capital liquidity',
    externalUrl: 'https://www.adityabirlacapital.com/business-loan'
  },
  {
    id: 'bl-poonawalla',
    name: 'Poonawalla Fincorp Business Loan',
    bankLogoName: 'Poonawalla',
    badge: 'Minimal Documentation',
    rateOrReward: 'From 10.99% p.a.',
    maxAmountOrFee: 'Up to ₹50 Lakhs',
    tenureOrGrace: '12 to 48 Months',
    approvalSpeed: 'Direct Bank NEFT Credit',
    features: ['No audited balance sheet needed for loans up to ₹25 Lakhs', 'Simple 12-month bank statement & GST assessment', 'Quick turnaround time'],
    specialPerk: 'Same-day in-principle approval with doorstep concierge',
    externalUrl: 'https://poonawallafincorp.com/business-loan'
  },
  {
    id: 'bl-bajaj-finserv',
    name: 'Bajaj Finserv Flexi Business Loan',
    bankLogoName: 'Bajaj Finserv',
    badge: 'Flexi Hybrid Facility',
    rateOrReward: 'From 11.99% p.a.',
    maxAmountOrFee: 'Up to ₹50 Lakhs',
    tenureOrGrace: '12 to 60 Months',
    approvalSpeed: '24-Hour Approval',
    features: ['Withdraw and prepay anytime with zero prepayment penalty', 'Dropline overdraft facility to reduce overall interest burden', '100% digital portal'],
    specialPerk: 'Lower your initial EMIs by up to 45% with interest-only periods',
    externalUrl: 'https://www.bajajfinserv.in/business-loan'
  }
];

export const CuratedOffersModal: React.FC<CuratedOffersModalProps> = ({
  isOpen,
  type,
  onClose,
  onOpenApplyModal
}) => {
  const { handleActionUrl } = useSiteConfig();
  const [filter, setFilter] = useState<string>('all');

  if (!isOpen || !type) return null;

  let title = '';
  let subtitle = '';
  let items: CuratedOfferItem[] = [];
  let headerGradient = '';
  let accentColor = '';

  if (type === 'personal-loan') {
    title = 'Choose Your Preferred Personal Loan Lender';
    subtitle = 'Compare verified instant cash loan offers from India’s top RBI-approved banks and NBFCs. Direct paperless application.';
    items = PERSONAL_LOAN_LENDERS;
    headerGradient = 'from-[#0f2868] via-[#1e40af] to-[#2563eb]';
    accentColor = 'text-[#FF617A]';
  } else if (type === 'credit-card') {
    title = 'Handpicked Credit Card Offers & Bank Details';
    subtitle = 'Select your ideal credit card variant. Compare lifetime-free perks, 5% cashback, lounge access, and apply instantly.';
    items = CREDIT_CARD_OFFERS;
    headerGradient = 'from-slate-900 via-[#1e1b4b] to-black';
    accentColor = 'text-pink-400';
  } else if (type === 'business-loan') {
    title = 'Exclusive Business & MSME Loan Offers';
    subtitle = 'Fuel business operations with collateral-free working capital up to ₹75 Lakhs from verified commercial lending partners.';
    items = BUSINESS_LOAN_LENDERS;
    headerGradient = 'from-[#0b3c5d] via-[#1d2731] to-[#328cc1]';
    accentColor = 'text-emerald-400';
  }

  const handleApplyClick = (item: CuratedOfferItem) => {
    if (item.externalUrl) {
      handleActionUrl(item.externalUrl, () => {
        if (onOpenApplyModal) onOpenApplyModal(item.name);
      });
    } else {
      if (onOpenApplyModal) onOpenApplyModal(item.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
        
        {/* Header Bar */}
        <div className={`p-4 sm:p-6 bg-gradient-to-r ${headerGradient} text-white relative flex-shrink-0`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Verified Multi-Lender Portal</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black font-['Outfit',sans-serif] leading-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Offer Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span className="font-semibold text-slate-700">
              Showing {items.length} verified available options
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="w-4 h-4" />
              100% RBI Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all hover:shadow-md ${
                  item.recommended 
                    ? 'border-[#1e40af] ring-1 ring-[#1e40af]/20 shadow-xs' 
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left: Logo & Details */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-2xs">
                      <BankLogo name={item.bankLogoName} size="sm" showText={false} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-900 font-['Outfit',sans-serif]">
                          {item.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-[#E81E76] border border-pink-200">
                          {item.badge}
                        </span>
                        {item.recommended && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-[#1e40af] border border-blue-200">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Rate / Return</span>
                          <span className="font-bold text-slate-900 text-sm">{item.rateOrReward}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Limit / Fee</span>
                          <span className="font-bold text-slate-900 text-sm">{item.maxAmountOrFee}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Tenure / Grace</span>
                          <span className="font-bold text-slate-700">{item.tenureOrGrace}</span>
                        </div>
                        <div className="hidden sm:block">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Disbursal Time</span>
                          <span className="font-bold text-emerald-600">{item.approvalSpeed}</span>
                        </div>
                      </div>

                      {/* Features bullets */}
                      <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {item.features.map((feat, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>

                      {item.specialPerk && (
                        <p className="text-[11px] text-blue-700 font-medium pt-1">
                          ★ {item.specialPerk}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Apply CTA */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => handleApplyClick(item)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#1e40af] hover:bg-[#E81E76] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <span className="text-[10px] text-slate-400 text-right whitespace-nowrap">
                      100% Free • Direct
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer note */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted 256-bit secure bank redirection. JinnyLoan never charges any application fees.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
