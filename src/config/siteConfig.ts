export interface HeroBannerConfig {
  id: string;
  badge: string;
  badgeSub: string;
  titlePrefix: string;
  highlightAmount: string;
  titleSuffix?: string;
  description: string;
  docs: string[];
  quickAmounts?: string[];
  badges?: Array<{ title: string; subtitle: string }>;
  topPartners?: string[];
  ctaText: string;
  ctaDestination: string; // internal route (e.g., /offers/direct-credit-loan) or external URL
  bgGradient: string;
  accentColor: string;
  active: boolean;
  order: number;
}

export interface ExclusivePartnerOfferConfig {
  id: string;
  bankName: string;
  shortName: string;
  loanType: string;
  interestRate: string;
  rateValue: number;
  maxAmount: string;
  maxTenure: string;
  processingFee: string;
  highlightBadge: string;
  badgeColor: string;
  specialPerk: string;
  bgGradient: string;
  borderColor: string;
  ctaText: string; // 'Apply Now' or 'Claim Now'
  externalUrl: string; // Unique external partner URL
  active: boolean;
  order: number;
}

export interface PopularCategoryConfig {
  id: string;
  slug: string; // /personal-loan, /credit-card, /business-loan, /home-loan, /loan-against-property
  title: string;
  badge: string;
  subtitle: string;
  rateOrStat: string;
  iconName: string;
  gradient: string;
  exploreDestination: string; // internal product page
  startDestination: string; // external partner URL or internal page
  exploreCtaText: string;
  startCtaText: string;
  active: boolean;
  order: number;
}

export interface LoanOfferPartnerConfig {
  id: string;
  lender: string;
  tagline: string;
  badge: string;
  badgeType: 'fast' | 'preapproved' | 'sanction';
  amount: string;
  interestRate: string;
  tenure: string;
  ctaText: string; // 'Check Eligibility' or 'Apply Now'
  externalUrl: string; // Unique partner URL
  accentColor: string;
  bgLight: string;
  active: boolean;
  order: number;
}

export interface CardRewardOfferConfig {
  id: string;
  cardName: string;
  bankName: string;
  promotionalAmount: string;
  badgeLabel: string;
  title: string;
  messaging: string;
  tcText: string;
  ctaText: string;
  externalUrl: string; // Unique partner URL
  cardGradient: string;
  network: 'visa' | 'mastercard' | 'rupay';
  bannerGradient: string;
  borderColor: string;
  active: boolean;
  order: number;
}

export interface LendingOfferConfig {
  id: string;
  partner: string;
  tagline: string;
  amount: string;
  rate: string;
  tenure: string;
  badge: string;
  category: string;
  ctaText: string;
  externalUrl: string; // Unique partner URL
  color: string;
  badgeStyle: string;
  active: boolean;
  order: number;
}

export interface LandingPageContentConfig {
  slug: string;
  title: string;
  subtitle: string;
  heroBadge: string;
  maxAmount: string;
  interestRate: string;
  tenure: string;
  processingFee: string;
  overviewText: string;
  keyBenefits: string[];
  eligibility: string[];
  documents: string[];
  steps: Array<{ step: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
  partners: Array<{ name: string; rate: string; externalUrl: string; tag: string }>;
  primaryCtaText: string;
  primaryCtaUrl: string;
}

export interface CreditCardConfig {
  id: string;
  title: string;
  bank: string;
  promoted?: boolean;
  badge?: string;
  benefitText: string;
  annualFee: string;
  bestFor: string;
  network: 'visa' | 'mastercard' | 'rupay';
  gradient: string;
  chipColor?: string;
  ctaText?: string;
  externalUrl?: string;
  active: boolean;
  order: number;
}

export interface LendingPartnerConfig {
  id: string;
  name: string;
  code: string;
  logoUrl?: string;
  color: string;
  description: string;
  order: number;
  active: boolean;
}

export interface TestimonialConfig {
  id: string;
  name: string;
  location: string;
  loanType: string;
  bank: string;
  amount: string;
  testimonial: string;
  rating: number;
  avatarBg: string;
  order: number;
  active: boolean;
}

export interface FaqConfig {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  active: boolean;
}

export interface LapCalculatorConfig {
  headline: string;
  subheadline: string;
  maxLtvPercentage: number;
  minPropertyValue: number;
  maxPropertyValue: number;
  defaultPropertyValue: number;
  tenureYears: number;
  interestRate: number;
}

export interface SiteConfig {
  heroBanners: HeroBannerConfig[];
  exclusiveOffers: ExclusivePartnerOfferConfig[];
  popularCategories: PopularCategoryConfig[];
  loanOffers: LoanOfferPartnerConfig[];
  creditCards: CreditCardConfig[];
  cardRewards: CardRewardOfferConfig[];
  lendingOffers: LendingOfferConfig[];
  trendingOffers?: LendingOfferConfig[];
  lendingPartners: LendingPartnerConfig[];
  testimonials: TestimonialConfig[];
  faqs: FaqConfig[];
  lapCalculatorConfig: LapCalculatorConfig;
  landingPages: Record<string, LandingPageContentConfig>;
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  heroBanners: [
    {
      id: 'banner-direct-credit',
      badge: 'Direct Bank Credit',
      badgeSub: 'Paperless KYC',
      titlePrefix: 'Get Loans up to',
      highlightAmount: '₹10 Lakh',
      titleSuffix: '',
      description: 'Disbursed directly into bank account in 24 hrs with lowest interest rate guarantees.',
      docs: ['Aadhar Card', 'PAN Card', 'Income Proof'],
      quickAmounts: ['₹50K', '₹1 Lakh', '₹5 Lakh', '₹10 Lakh'],
      ctaText: 'Apply Now',
      ctaDestination: 'https://bitli.in/5OXZt6Z',
      bgGradient: 'from-[#0f2868] via-[#1e40af] to-[#2563eb]',
      accentColor: 'text-yellow-300',
      active: true,
      order: 1
    },
    {
      id: 'banner-multi-lender',
      badge: 'Multi-Lender Match',
      badgeSub: '30+ Lenders',
      titlePrefix: 'Loans from Lenders',
      highlightAmount: 'Upto ₹7 Lakhs',
      titleSuffix: '',
      description: 'Single instant application checked against 30+ top institutional lenders simultaneously.',
      docs: ['Instant KYC', 'Bank Statement', 'Zero Collateral'],
      badges: [
        { title: 'Fast Disbursal', subtitle: 'Direct credit' },
        { title: 'Instant Sanction', subtitle: 'Paperless approval' }
      ],
      topPartners: ['Moneyview', 'Poonawalla', 'KreditBee', 'L&T Fin'],
      ctaText: 'Apply Now',
      ctaDestination: 'https://bitli.in/VqSU8fF',
      bgGradient: 'from-[#a30948] via-[#e11d6e] to-[#ff4b82]',
      accentColor: 'text-yellow-300',
      active: true,
      order: 2
    }
  ],

  exclusiveOffers: [
    {
      id: 'sbi-special',
      bankName: 'State Bank of India',
      shortName: 'SBI',
      loanType: 'Festive Home Loan',
      interestRate: 'From 7.10% p.a.',
      rateValue: 7.10,
      maxAmount: 'Up to ₹10 Crores',
      maxTenure: '30 Years',
      processingFee: 'Zero Processing Fee',
      highlightBadge: 'Lowest Gov Rate',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      specialPerk: 'Special 0.05% interest concession for women borrowers & Green buildings',
      bgGradient: 'from-blue-50/90 via-white to-slate-50',
      borderColor: 'border-blue-200 hover:border-blue-400',
      ctaText: 'Apply Now',
      externalUrl: 'https://homeloans.sbi/',
      active: true,
      order: 1
    },
    {
      id: 'hdfc-instant',
      bankName: 'HDFC Bank',
      shortName: 'HDFC',
      loanType: 'Express Home & Top-up',
      interestRate: 'From 7.35% p.a.',
      rateValue: 7.35,
      maxAmount: 'Up to ₹25 Crores',
      maxTenure: '30 Years',
      processingFee: 'Flat ₹3,000 + GST',
      highlightBadge: 'Top Lender',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      specialPerk: 'Instant in-principle digital sanction with zero branch visits required',
      bgGradient: 'from-indigo-50/90 via-white to-slate-50',
      borderColor: 'border-indigo-200 hover:border-indigo-400',
      ctaText: 'Apply Now',
      externalUrl: 'https://www.hdfcbank.com/personal/borrow/popular-loans/home-loan',
      active: true,
      order: 2
    },
    {
      id: 'icici-digital',
      bankName: 'ICICI Bank',
      shortName: 'ICICI',
      loanType: 'Pre-Approved Home Loan',
      interestRate: 'From 7.25% p.a.',
      rateValue: 7.25,
      maxAmount: 'Up to ₹15 Crores',
      maxTenure: '30 Years',
      processingFee: '0.25% or Min ₹2,500',
      highlightBadge: 'Fast Disbursal',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      specialPerk: 'Express video KYC sanction in just 3 business days for salaried applicants',
      bgGradient: 'from-orange-50/90 via-white to-slate-50',
      borderColor: 'border-orange-200 hover:border-orange-400',
      ctaText: 'Apply Now',
      externalUrl: 'https://www.icicibank.com/personal-banking/loans/home-loan',
      active: true,
      order: 3
    },
    {
      id: 'bob-advantage',
      bankName: 'Bank of Baroda',
      shortName: 'BOB',
      loanType: 'Baroda Max Overdraft Loan',
      interestRate: 'From 7.20% p.a.',
      rateValue: 7.20,
      maxAmount: 'Up to ₹20 Crores',
      maxTenure: '30 Years',
      processingFee: 'Nil (Limited Period)',
      highlightBadge: 'Overdraft Benefit',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      specialPerk: 'Park surplus savings into loan account to reduce overall monthly interest',
      bgGradient: 'from-emerald-50/90 via-white to-slate-50',
      borderColor: 'border-emerald-200 hover:border-emerald-400',
      ctaText: 'Apply Now',
      externalUrl: 'https://www.bankofbaroda.in/personal-banking/loans/home-loan',
      active: true,
      order: 4
    },
    {
      id: 'kotak-prime',
      bankName: 'Kotak Mahindra Bank',
      shortName: 'Kotak',
      loanType: 'Kotak Digi Home Loan',
      interestRate: 'From 7.30% p.a.',
      rateValue: 7.30,
      maxAmount: 'Up to ₹10 Crores',
      maxTenure: '25 Years',
      processingFee: 'Flat ₹5,000 + GST',
      highlightBadge: 'Quick Sanction',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      specialPerk: 'Fastest turn-around time with complete doorstep concierge assistance',
      bgGradient: 'from-red-50/90 via-white to-slate-50',
      borderColor: 'border-red-200 hover:border-red-400',
      ctaText: 'Apply Now',
      externalUrl: 'https://www.kotak.com/en/personal-banking/loans/home-loan.html',
      active: true,
      order: 5
    }
  ],

  popularCategories: [
    {
      id: 'cat-personal-loan',
      slug: '/personal-loan',
      title: 'Personal Loan',
      badge: 'Instant Cash',
      subtitle: 'Funds up to ₹10 Lakhs for medical, wedding or emergency needs.',
      rateOrStat: 'From 10.49%',
      iconName: 'Coins',
      gradient: 'from-[#E81E76] via-[#d61266] to-[#9d0248]',
      exploreDestination: '/personal-loan',
      startDestination: 'https://bitli.in/5OXZt6Z',
      exploreCtaText: 'Explore',
      startCtaText: 'Apply Now',
      active: true,
      order: 1
    },
    {
      id: 'cat-credit-card',
      slug: '/credit-card',
      title: 'Credit Cards',
      badge: 'Rewards & Travel',
      subtitle: 'Lifetime free cards with airport lounge access & 5% cashback.',
      rateOrStat: '40+ Cards Available',
      iconName: 'CreditCard',
      gradient: 'from-slate-900 via-slate-800 to-black',
      exploreDestination: '/credit-card',
      startDestination: 'https://bitli.in/I9ySv3I',
      exploreCtaText: 'Explore',
      startCtaText: 'Apply Now',
      active: true,
      order: 2
    },
    {
      id: 'cat-business-loan',
      slug: '/business-loan',
      title: 'Business Loan',
      badge: 'MSME Growth',
      subtitle: 'Collateral-free working capital & machinery loans up to ₹50 Lakhs.',
      rateOrStat: 'Disbursal in 48 Hrs',
      iconName: 'Briefcase',
      gradient: 'from-[#1e40af] via-[#1d4ed8] to-[#0284c7]',
      exploreDestination: '/business-loan',
      startDestination: 'https://www.tatacapital.com/business-loan.html',
      exploreCtaText: 'Explore',
      startCtaText: 'Apply Now',
      active: true,
      order: 3
    },
    {
      id: 'cat-home-loan',
      slug: '/home-loan',
      title: 'Home Loan',
      badge: 'Lowest Rates',
      subtitle: 'Dream home financing with interest starting at 7.10% and zero foreclosure fees.',
      rateOrStat: 'Starting 7.10%*',
      iconName: 'Home',
      gradient: 'from-blue-600 via-indigo-600 to-blue-900',
      exploreDestination: '/home-loan',
      startDestination: '/home-loan',
      exploreCtaText: 'Explore',
      startCtaText: 'Check Rates',
      active: true,
      order: 4
    },
    {
      id: 'cat-lap',
      slug: '/loan-against-property',
      title: 'Loan Against Property',
      badge: 'Secured Loan',
      subtitle: 'Unlock maximum property equity up to ₹15 Crores at lowest commercial interest.',
      rateOrStat: 'Starting 7.75%*',
      iconName: 'Building2',
      gradient: 'from-pink-600 via-rose-600 to-indigo-800',
      exploreDestination: '/loan-against-property',
      startDestination: '/loan-against-property',
      exploreCtaText: 'Explore',
      startCtaText: 'Check Equity',
      active: true,
      order: 5
    }
  ],

  loanOffers: [
    {
      id: 'loan-aditya-birla',
      lender: 'Aditya Birla Capital',
      tagline: 'Express Personal Loan',
      badge: 'Fast Disbursal',
      badgeType: 'fast',
      amount: 'Amount upto ₹5 Lakhs',
      interestRate: 'Int. rate 10.49%',
      tenure: 'Upto 36m',
      ctaText: 'Check Eligibility',
      externalUrl: 'https://bitli.in/5OXZt6Z',
      accentColor: 'border-red-200 hover:border-red-400',
      bgLight: 'from-red-50/40 to-white',
      active: true,
      order: 1
    },
    {
      id: 'loan-poonawalla',
      lender: 'Poonawalla Fincorp',
      tagline: 'Instant Cash Loan',
      badge: 'Instant Sanction',
      badgeType: 'sanction',
      amount: 'Amount upto ₹30 Lakhs',
      interestRate: 'Int. rate 9.99%',
      tenure: 'Upto 60m',
      ctaText: 'Check Eligibility',
      externalUrl: 'https://bitli.in/VqSU8fF',
      accentColor: 'border-emerald-200 hover:border-emerald-400',
      bgLight: 'from-emerald-50/40 to-white',
      active: true,
      order: 2
    },
    {
      id: 'loan-tata-capital',
      lender: 'Tata Capital',
      tagline: 'Quick Disbursal Loan',
      badge: 'Fast Disbursal',
      badgeType: 'fast',
      amount: 'Amount upto ₹15 Lakhs',
      interestRate: 'Int. rate 10.99%',
      tenure: 'Upto 48m',
      ctaText: 'Check Eligibility',
      externalUrl: 'https://bitli.in/H5QN6Tz',
      accentColor: 'border-blue-200 hover:border-blue-400',
      bgLight: 'from-blue-50/40 to-white',
      active: true,
      order: 3
    },
    {
      id: 'loan-creditsea',
      lender: 'CreditSea',
      tagline: 'Instant Micro Cash',
      badge: 'Fast Disbursal',
      badgeType: 'fast',
      amount: 'Amount upto ₹1 Lakhs',
      interestRate: 'Int. rate 2.00%',
      tenure: 'Upto 12m',
      ctaText: 'Check Eligibility',
      externalUrl: 'https://bitli.in/5OXZt6Z',
      accentColor: 'border-sky-200 hover:border-sky-400',
      bgLight: 'from-sky-50/50 to-white',
      active: true,
      order: 4
    },
    {
      id: 'loan-hdfc',
      lender: 'HDFC Bank',
      tagline: 'Pre-Approved Salaried',
      badge: 'Pre-Approved',
      badgeType: 'preapproved',
      amount: 'Amount upto ₹40 Lakhs',
      interestRate: 'Int. rate 10.50%',
      tenure: 'Upto 60m',
      ctaText: 'Check Eligibility',
      externalUrl: 'https://bitli.in/VqSU8fF',
      accentColor: 'border-indigo-200 hover:border-indigo-400',
      bgLight: 'from-indigo-50/40 to-white',
      active: true,
      order: 5
    },
    {
      id: 'loan-icici',
      lender: 'ICICI Bank',
      tagline: 'Paperless Digital Sanction',
      badge: 'Instant Sanction',
      badgeType: 'sanction',
      amount: 'Amount upto ₹25 Lakhs',
      interestRate: 'Int. rate 10.65%',
      tenure: 'Upto 60m',
      ctaText: 'Check Eligibility',
      externalUrl: 'https://bitli.in/H5QN6Tz',
      accentColor: 'border-amber-200 hover:border-amber-400',
      bgLight: 'from-amber-50/40 to-white',
      active: true,
      order: 6
    }
  ],

  creditCards: [
    {
      id: 'hdfc-millennia',
      title: 'HDFC Millennia Credit Card',
      bank: 'HDFC Bank',
      promoted: true,
      badge: 'PROMOTED',
      benefitText: '5% Cashback on Amazon, Flipkart, Myntra, Swiggy & Zomato spends.',
      annualFee: '₹1,000 (Waived on ₹1L spend)',
      bestFor: 'Shopping & Dining',
      network: 'visa',
      gradient: 'bg-gradient-to-tr from-[#002f6c] via-[#004c8f] to-[#1e3a8a]',
      chipColor: '#fcd34d',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/I9ySv3I',
      active: true,
      order: 1
    },
    {
      id: 'axis-ace',
      title: 'Axis Bank ACE Credit Card',
      bank: 'Axis Bank',
      promoted: false,
      badge: 'BEST CASHBACK',
      benefitText: '2% Unlimited Cashback on all spends & 5% on Google Pay Bill Payments.',
      annualFee: '₹499 (Waived on ₹10k spend in 45d)',
      bestFor: 'Utility & Bills',
      network: 'visa',
      gradient: 'bg-gradient-to-tr from-[#54021e] via-[#97144D] to-[#380214]',
      chipColor: '#fef08a',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/ZTidWoV',
      active: true,
      order: 2
    },
    {
      id: 'sbi-simplyclick',
      title: 'SBI SimplyCLICK Credit Card',
      bank: 'State Bank of India',
      promoted: true,
      badge: 'PROMOTED',
      benefitText: '10X Reward Points on partner online shopping + ₹500 Amazon Gift Voucher.',
      annualFee: '₹499 (Reversed on ₹1L spend)',
      bestFor: 'Online Spends',
      network: 'visa',
      gradient: 'bg-gradient-to-tr from-[#003756] via-[#0080BD] to-[#01253a]',
      chipColor: '#e2e8f0',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/Q9vpVjd',
      active: true,
      order: 3
    },
    {
      id: 'icici-amazon-pay',
      title: 'Amazon Pay ICICI Card',
      bank: 'ICICI Bank',
      promoted: false,
      badge: 'LIFETIME FREE',
      benefitText: 'Lifetime Free card with 5% Unlimited Cashback on Amazon Prime purchases.',
      annualFee: '₹0 (Zero Joining & Annual Fee)',
      bestFor: 'Amazon & Travel',
      network: 'visa',
      gradient: 'bg-gradient-to-tr from-[#18181b] via-[#27272a] to-[#09090b]',
      chipColor: '#fbbf24',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/tz5iKIO',
      active: true,
      order: 4
    },
    {
      id: 'kotak-league',
      title: 'Kotak League Platinum Card',
      bank: 'Kotak Mahindra Bank',
      promoted: false,
      badge: 'REWARD SPECIAL',
      benefitText: '8X Reward Points on apparel, travel & 4 free PVR movie tickets every quarter.',
      annualFee: '₹500 (Free for salary account)',
      bestFor: 'Movies & Apparel',
      network: 'rupay',
      gradient: 'bg-gradient-to-tr from-[#7f1d1d] via-[#ED1C24] to-[#450a0a]',
      chipColor: '#fef08a',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/xtG7uh9',
      active: true,
      order: 5
    }
  ],

  cardRewards: [
    {
      id: 'reward-voucher',
      promotionalAmount: '₹1,500 Gift Voucher',
      badgeLabel: 'WELCOME PERK',
      title: 'Flat ₹1,500 E-Gift Voucher',
      messaging: 'Get an assured ₹1,500 Amazon or Flipkart gift voucher on your first card retail swipe within 30 days.',
      cardName: 'Millennia Platinum',
      bankName: 'HDFC Bank',
      cardGradient: 'bg-gradient-to-tr from-[#002f6c] via-[#004c8f] to-[#1e3a8a]',
      network: 'visa',
      bannerGradient: 'from-blue-50/90 via-indigo-50/50 to-white',
      borderColor: 'border-blue-200 hover:border-blue-400',
      tcText: '*T&C apply. Minimum spend of ₹1,500 within 30 days of card issuance.',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/I9ySv3I',
      active: true,
      order: 1
    },
    {
      id: 'reward-cashback',
      promotionalAmount: 'Flat 5% Cashback',
      badgeLabel: 'DAILY SAVINGS',
      title: '5% Unlimited Food & Dining',
      messaging: 'Earn direct 5% cashback on Swiggy, Zomato, Blinkit, and weekend grocery shopping with zero cap.',
      cardName: 'ACE Cashback',
      bankName: 'Axis Bank',
      cardGradient: 'bg-gradient-to-tr from-[#54021e] via-[#97144D] to-[#380214]',
      network: 'visa',
      bannerGradient: 'from-pink-50/90 via-rose-50/50 to-white',
      borderColor: 'border-pink-200 hover:border-pink-400',
      tcText: '*T&C apply. Monthly statement credit. Valid across all verified online merchants.',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/ZTidWoV',
      active: true,
      order: 2
    },
    {
      id: 'reward-fuel-travel',
      promotionalAmount: 'Save ₹4,500/Year',
      badgeLabel: 'TRAVEL & FUEL',
      title: '1% Fuel Surcharge + Airport Lounge',
      messaging: '1% fuel surcharge waiver across all Indian petrol pumps + 4 complimentary domestic airport lounge visits.',
      cardName: 'SimplyCLICK Travel',
      bankName: 'SBI Card',
      cardGradient: 'bg-gradient-to-tr from-[#003756] via-[#0080BD] to-[#01253a]',
      network: 'visa',
      bannerGradient: 'from-emerald-50/90 via-teal-50/50 to-white',
      borderColor: 'border-emerald-200 hover:border-emerald-400',
      tcText: '*T&C apply. Fuel waiver on transactions between ₹400 and ₹5,000 nationwide.',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/Q9vpVjd',
      active: true,
      order: 3
    }
  ],

  lendingOffers: [
    {
      id: 'offer-creditsea',
      partner: 'CreditSea',
      tagline: 'Instant Direct Credit to Account',
      amount: 'Upto 1 Lakh',
      rate: 'From 2.00% pm',
      tenure: 'Upto 60 M',
      badge: 'Instant Sanction',
      category: 'Micro Cash & Quick Loan',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/5OXZt6Z',
      color: 'border-sky-200 hover:border-sky-400',
      badgeStyle: 'bg-sky-100 text-sky-800 border-sky-200',
      active: true,
      order: 1
    },
    {
      id: 'offer-aditya-birla',
      partner: 'Aditya Birla Capital',
      tagline: 'Express Digital Approval Online',
      amount: 'Upto 5 Lakhs',
      rate: 'From 10.49% pa',
      tenure: 'Upto 60 M',
      badge: 'Instant Sanction',
      category: 'Express Personal Loan',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/5OXZt6Z',
      color: 'border-red-200 hover:border-red-400',
      badgeStyle: 'bg-red-100 text-red-800 border-red-200',
      active: true,
      order: 2
    },
    {
      id: 'offer-poonawalla',
      partner: 'Poonawalla Fincorp',
      tagline: 'Zero Collateral Digital Loan',
      amount: 'Upto 30 Lakhs',
      rate: 'From 9.99% pa',
      tenure: 'Upto 60 M',
      badge: 'Fast Disbursal',
      category: 'Instant Personal Loan',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/VqSU8fF',
      color: 'border-emerald-200 hover:border-emerald-400',
      badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      active: true,
      order: 3
    },
    {
      id: 'offer-tata-capital',
      partner: 'Tata Capital',
      tagline: 'Flexible Working Capital & Personal',
      amount: 'Upto 15 Lakhs',
      rate: 'From 10.99% pa',
      tenure: 'Upto 48 M',
      badge: 'Fast Disbursal',
      category: 'Quick Loan',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/H5QN6Tz',
      color: 'border-blue-200 hover:border-blue-400',
      badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
      active: true,
      order: 4
    },
    {
      id: 'offer-hdfc',
      partner: 'HDFC Bank',
      tagline: 'Reach Home & Salaried Loans',
      amount: 'Upto 50 Lakhs',
      rate: 'From 10.50% pa',
      tenure: 'Upto 60 M',
      badge: 'Instant In-Principle',
      category: 'Express Loan',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/VqSU8fF',
      color: 'border-indigo-200 hover:border-indigo-400',
      badgeStyle: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      active: true,
      order: 5
    },
    {
      id: 'offer-icici',
      partner: 'ICICI Bank',
      tagline: 'Digital Sanction in Minutes',
      amount: 'Upto 25 Lakhs',
      rate: 'From 10.65% pa',
      tenure: 'Upto 60 M',
      badge: 'Digital Sanction',
      category: 'Personal & LAP',
      ctaText: 'Apply Now',
      externalUrl: 'https://bitli.in/H5QN6Tz',
      color: 'border-orange-200 hover:border-orange-400',
      badgeStyle: 'bg-orange-100 text-orange-800 border-orange-200',
      active: true,
      order: 6
    }
  ],

  landingPages: {
    '/offers/direct-credit-loan': {
      slug: '/offers/direct-credit-loan',
      title: 'Direct Bank Credit Instant Loan',
      subtitle: 'Get loans up to ₹10 Lakhs disbursed directly into your bank account in 24 hours with paperless KYC and zero hidden fees.',
      heroBadge: 'Direct Bank Credit',
      maxAmount: 'Up to ₹10 Lakh',
      interestRate: 'From 10.49% p.a.',
      tenure: '12 to 60 Months',
      processingFee: '0.5% to 1.5%',
      overviewText: 'Our Direct Bank Credit Loan is designed for urgent liquidity needs. Whether you are addressing an emergency medical bill, consolidating higher-cost debts, or funding a family milestone, get rapid assessment and direct account transfers within 24 hours of approval.',
      keyBenefits: [
        '100% Digital application with instant paperless KYC verification',
        'Direct credit to any bank account in India within 24 hours',
        'Flexible repayment tenures starting from 12 up to 60 months',
        'Transparent interest calculation with zero prepayment penalty options',
        'No physical bank visits or doorstep physical document collection needed'
      ],
      eligibility: [
        'Age: 21 to 58 years at the time of loan maturity',
        'Employment: Salaried with verified corporate employer or self-employed professional',
        'Minimum Monthly Income: ₹20,000 per month credited to bank',
        'Credit Score: Minimum CIBIL score of 650+'
      ],
      documents: [
        'PAN Card (mandatory identity proof)',
        'Aadhaar Card with linked mobile number for instant DigiLocker e-KYC',
        'Latest 3 months bank statement showing salary or business credits',
        'Latest 3 salary slips or ITR acknowledgment (for self-employed)'
      ],
      steps: [
        { step: '01', title: 'Submit Details', desc: 'Fill out your basic employment and identity details online in under 2 minutes.' },
        { step: '02', title: 'Instant Sanction', desc: 'Our algorithmic engine checks multiple RBI-regulated lenders to find your top offer.' },
        { step: '03', title: 'e-KYC & Agreement', desc: 'Complete paperless Aadhaar verification and digitally sign loan terms.' },
        { step: '04', title: 'Direct Disbursal', desc: 'Funds are transferred directly into your designated bank account in 24 hours.' }
      ],
      faqs: [
        { q: 'How fast will the loan amount be credited?', a: 'Once your e-KYC and digital verification are successfully validated, funds are credited within 24 business hours.' },
        { q: 'Can I repay my loan early without penalty?', a: 'Yes, most of our institutional lending partners allow partial prepayments and full foreclosure with nominal or zero charges after 6 completed EMIs.' },
        { q: 'Is physical inspection required?', a: 'No. This is a 100% digital unsecured personal loan requiring zero collateral and zero physical inspection.' }
      ],
      partners: [
        { name: 'Aditya Birla Capital', rate: '10.49%', externalUrl: 'https://bitli.in/5OXZt6Z', tag: 'Fast Sanction' },
        { name: 'Poonawalla Fincorp', rate: '9.99%', externalUrl: 'https://bitli.in/VqSU8fF', tag: 'Lowest Rate' },
        { name: 'Tata Capital', rate: '10.99%', externalUrl: 'https://bitli.in/H5QN6Tz', tag: 'Quick Disbursal' }
      ],
      primaryCtaText: 'Apply for Direct Credit Loan',
      primaryCtaUrl: 'https://bitli.in/5OXZt6Z'
    },

    '/offers/multi-lender-match': {
      slug: '/offers/multi-lender-match',
      title: 'Multi-Lender Loan Marketplace Match',
      subtitle: 'Apply once and get matched with 30+ top RBI-registered banks and NBFCs up to ₹7 Lakhs with pre-approved rates.',
      heroBadge: '30+ Lenders Match',
      maxAmount: 'Up to ₹7 Lakh',
      interestRate: 'From 9.99% p.a.',
      tenure: '6 to 48 Months',
      processingFee: 'From 1%',
      overviewText: 'Stop filling out dozens of bank forms that hurt your CIBIL score with hard inquiries. Our Multi-Lender Match platform runs a single soft check and instantly matches you with pre-qualified offers from 30+ leading NBFCs and banks, maximizing your approval probability.',
      keyBenefits: [
        'Single application eliminates repetitive form filling across banks',
        'Soft eligibility inquiry preserves your credit score integrity',
        'Compare interest rates, processing fees, and tenures side by side',
        'High approval probability with customized algorithms matching your profile',
        'Access to specialized partners for low CIBIL and first-time borrowers'
      ],
      eligibility: [
        'Age: 19 to 62 years',
        'Income: ₹15,000+ monthly net salary or business turnover of ₹3L+ annually',
        'Indian citizen with active bank account in India',
        'Valid PAN and mobile-linked Aadhaar card'
      ],
      documents: [
        'PAN Card',
        'Aadhaar Card',
        'Bank statements (net banking fetch or PDF upload)',
        'Address proof if current address differs from Aadhaar'
      ],
      steps: [
        { step: '01', title: 'Enter Requirements', desc: 'Specify your desired loan amount and basic income parameters.' },
        { step: '02', title: 'Compare Offers', desc: 'View live matched offers from 30+ partner lenders ranked by best rate.' },
        { step: '03', title: 'Choose & Accept', desc: 'Select the lender with optimal EMI and complete paperless digital verification.' },
        { step: '04', title: 'Swift Transfer', desc: 'Direct disbursement to your account with digital NACH e-mandate.' }
      ],
      faqs: [
        { q: 'Will checking multiple offers hurt my CIBIL score?', a: 'No! Our initial matching system conducts a soft eligibility inquiry that does not negatively impact your credit profile.' },
        { q: 'Which partners participate in the matching network?', a: 'Our network includes Moneyview, Poonawalla Fincorp, KreditBee, L&T Finance, Tata Capital, and over 25 other verified lenders.' },
        { q: 'Can self-employed individuals apply?', a: 'Yes! Self-employed proprietors, freelancers, and small business owners are fully supported with customized scoring.' }
      ],
      partners: [
        { name: 'Poonawalla Fincorp', rate: '9.99%', externalUrl: 'https://bitli.in/VqSU8fF', tag: 'Featured' },
        { name: 'Moneyview', rate: '11.50%', externalUrl: 'https://bitli.in/5OXZt6Z', tag: 'Fast Digital' },
        { name: 'KreditBee', rate: '12.00%', externalUrl: 'https://bitli.in/H5QN6Tz', tag: 'Micro Loan' }
      ],
      primaryCtaText: 'Get Matched Offers Now',
      primaryCtaUrl: 'https://bitli.in/VqSU8fF'
    }
  },
  lendingPartners: [
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC', color: '#004c8f', description: 'Premier Housing & Personal Finance', order: 1, active: true },
    { id: 'sbi', name: 'State Bank of India', code: 'SBI', color: '#280071', description: 'Largest Public Sector Bank', order: 2, active: true },
    { id: 'icici', name: 'ICICI Bank', code: 'ICICI', color: '#b02a30', description: 'Instant Digital Sanctions', order: 3, active: true },
    { id: 'axis', name: 'Axis Bank', code: 'AXIS', color: '#97144d', description: 'Affordable Floating & Fixed Rates', order: 4, active: true },
    { id: 'lic', name: 'LIC Housing Finance', code: 'LIC HFL', color: '#005f73', description: 'Trusted Long Tenure Mortgages', order: 5, active: true },
    { id: 'canara', name: 'Canara Bank', code: 'CANARA', color: '#0072ce', description: 'High LTV Ratio Schemes', order: 6, active: true },
    { id: 'bob', name: 'Bank of Baroda', code: 'BOB', color: '#f26522', description: 'Baroda Max Overdraft Benefit', order: 7, active: true },
    { id: 'pnb', name: 'Punjab National Bank', code: 'PNB', color: '#a2003c', description: 'Competitive Public Bank Rates', order: 8, active: true },
    { id: 'cbi', name: 'Central Bank of India', code: 'CBI', color: '#003366', description: 'Lowest Starting ROI at 7.10%', order: 9, active: true },
    { id: 'abcapital', name: 'Aditya Birla Capital', code: 'AB CAPITAL', color: '#c9151b', description: 'Digital Express Business Loans', order: 10, active: true },
    { id: 'poonawalla', name: 'Poonawalla Fincorp', code: 'Poonawalla', color: '#047857', description: 'Fast Turnaround NBFC Lending', order: 11, active: true },
    { id: 'kotak', name: 'Kotak Mahindra Bank', code: 'KOTAK', color: '#ed1c24', description: 'Concierge Customer Support', order: 12, active: true }
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Aman Kumar',
      location: 'Delhi NCR',
      loanType: 'Home Loan',
      bank: 'HDFC Bank',
      amount: '₹45 Lakhs',
      testimonial: 'Applying for a home loan with Jinny Loan was completely seamless. The dedicated team assisted with property verification and got my sanction in 3 days!',
      rating: 5,
      avatarBg: 'bg-emerald-600',
      order: 1,
      active: true
    },
    {
      id: 't2',
      name: 'Abhijit Singh',
      location: 'Mumbai',
      loanType: 'Home Loan Balance Transfer',
      bank: 'SBI',
      amount: '₹62 Lakhs',
      testimonial: 'I needed lower monthly EMIs and Jinny Loan helped me transfer my loan to SBI at 7.35% with zero foreclosure penalty. Saved over ₹4.5 Lakhs in interest!',
      rating: 5,
      avatarBg: 'bg-rose-500',
      order: 2,
      active: true
    },
    {
      id: 't3',
      name: 'Rithik Kumar',
      location: 'Bengaluru',
      loanType: 'Apartment Purchase',
      bank: 'Canara Bank',
      amount: '₹80 Lakhs',
      testimonial: 'Thanks to JinnyLoan, I was able to get 90% LTV approved for my dream 3BHK flat. The real agent support was available on WhatsApp throughout.',
      rating: 5,
      avatarBg: 'bg-indigo-600',
      order: 3,
      active: true
    }
  ],
  faqs: [
    {
      id: 'f1',
      question: 'What is JinnyLoan.com?',
      answer: 'JinnyLoan is a digital platform providing accessible financial services to all. It leverages technology to offer customized financial products like Home Loans, Personal Loans, Business Loans, and Loan Against Property through its lending partners. We have tie-ups with more than 30+ leading Banks and NBFCs across India.',
      category: 'General',
      order: 1,
      active: true
    },
    {
      id: 'f2',
      question: 'What are the features & benefits of JinnyLoan digital lending platform?',
      answer: 'JinnyLoan offers 100% digital applications, comparison across 30+ top banks, lowest interest rates starting at 7.10% p.a., transparent charges with zero hidden fees, fast in-principle approval within 24 hours, and dedicated human loan assistance from application to disbursement.',
      category: 'Benefits',
      order: 2,
      active: true
    },
    {
      id: 'f3',
      question: 'What are the documents required to apply for a Home Loan?',
      answer: 'Basic documents include: Identity & Address proof (Aadhaar, PAN, Passport), Income proof (3 months salary slips or 2-3 years ITR), last 6 months bank statement, and property documents (Agreement to sell, Allotment letter, Title deeds, Approved plan).',
      category: 'Documents',
      order: 3,
      active: true
    },
    {
      id: 'f4',
      question: 'Can I borrow any amount that I require up to ₹10 Crore?',
      answer: 'Yes! Loan amounts range from ₹5 Lakhs up to ₹10 Crores (and higher for qualified profiles) depending on your income, repayment capacity, property market valuation, and CIBIL credit score.',
      category: 'Eligibility',
      order: 4,
      active: true
    },
    {
      id: 'f5',
      question: 'What is the minimum credit score requirement to avail a home loan?',
      answer: 'A credit score (CIBIL) of 650 or higher is generally required. Scores above 750 unlock the lowest promotional interest rates starting at 7.10% - 7.35% p.a. with reduced processing charges.',
      category: 'Eligibility',
      order: 5,
      active: true
    },
    {
      id: 'f6',
      question: 'How do I contact JinnyLoan if I face any issue with the website or application?',
      answer: 'You can reach out directly via phone at +91 8006488006, email at info@jinnyloan.com, or visit our office at R 123 Gali No 06 Laxminagar Delhi 110092 (Mon-Sat 10:00 AM - 7:00 PM). You can also click the WhatsApp Loan Inquiry button for instant assistance.',
      category: 'Support',
      order: 6,
      active: true
    }
  ],
  lapCalculatorConfig: {
    headline: 'How Much Loan Can You Get Against Your Property?',
    subheadline: 'Calculate your borrowing capacity based on property market value (up to 70% LTV) and monthly income.',
    maxLtvPercentage: 70,
    minPropertyValue: 2500000,
    maxPropertyValue: 100000000,
    defaultPropertyValue: 12500000,
    tenureYears: 15,
    interestRate: 7.75
  }
};
