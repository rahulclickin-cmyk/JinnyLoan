import { BankOffer, BenefitItem, FaqItem, Testimonial } from '../types';

export const BANK_OFFERS: BankOffer[] = [
  {
    id: 'central-bank',
    name: 'Central Bank of India Home Loan',
    shortName: 'Central Bank',
    rate: 'From 7.10% p.a.',
    minRateNumber: 7.10,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '0.25% (Max ₹10,000)',
    maxLoanAmount: 'Up to ₹10 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: 'Lowest interest rates for high CIBIL scores',
    description: 'Cent Home Loan offers one of the lowest ROI in the banking sector with flexible repayment terms and nil prepayment penalties.',
    eligibility: [
      'Age: 21 to 70 years',
      'Min Income: ₹15,000/month',
      'CIBIL Score: 700 and above for best rate'
    ],
    perks: [
      'Zero prepayment charges on floating rate',
      'Special concession for women co-applicants',
      'Quick in-principle digital sanction'
    ],
    popularTag: 'Lowest Rate',
    rating: 4.8,
    reviewsCount: 1420
  },
  {
    id: 'canara-bank',
    name: 'Canara Bank Home Loan',
    shortName: 'Canara Bank',
    rate: 'From 7.15% p.a.',
    minRateNumber: 7.15,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '0.25% (Min ₹1,500, Max ₹10,000)',
    maxLoanAmount: 'Up to ₹15 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: 'Instant digital approval with minimal paperwork',
    description: 'Canara Housing Loan provides high eligibility calculation, attractive interest concessions, and simplified doorstep documentation.',
    eligibility: [
      'Age: 21 to 70 years',
      'Min Income: ₹20,000/month',
      'Salaried & Self-Employed both eligible'
    ],
    perks: [
      'Concession of 0.05% for women borrowers',
      'Higher loan quantum up to 90% of property cost',
      'Low processing charges'
    ],
    popularTag: 'Top Value',
    rating: 4.7,
    reviewsCount: 1890
  },
  {
    id: 'bank-of-baroda',
    name: 'Bank of Baroda Home Loan',
    shortName: 'Bank of Baroda',
    rate: 'From 7.20% p.a.',
    minRateNumber: 7.20,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '₹2,500 to ₹7,500 + GST',
    maxLoanAmount: 'Up to ₹20 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: 'Baroda Home Loan Advantage (Overdraft facility)',
    description: 'Bank of Baroda offers customized home loan schemes with Baroda Max savings account linkage to reduce interest burden.',
    eligibility: [
      'Age: 21 to 70 years',
      'Salaried min income ₹25,000 / Self-employed turnover ₹3L+',
      'CIBIL 675+'
    ],
    perks: [
      'Interest linked to BRLLR',
      'Top-up loan availability after 6 months',
      'No prepayment or part-payment penalty'
    ],
    rating: 4.8,
    reviewsCount: 2240
  },
  {
    id: 'hdfc-bank',
    name: 'HDFC Bank Home Loan',
    shortName: 'HDFC Bank',
    rate: 'From 7.35% p.a.',
    minRateNumber: 7.35,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '0.50% or ₹3,000 (whichever is higher)',
    maxLoanAmount: 'Up to ₹25 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: 'India’s most popular home loan with fastest turnaround',
    description: 'HDFC Bank offers trusted home loan solutions with an extensive property search directory, online tracking, and dedicated loan managers.',
    eligibility: [
      'Age: 21 to 65 years for Salaried, up to 70 for Self-Employed',
      'Min Income: ₹15,000/month',
      'Resident Indians and Non-Resident Indians (NRIs)'
    ],
    perks: [
      'Customized repayment options (Step Up / Telescopic)',
      'Digital property legal and technical evaluation',
      'Pre-approved loans for verified properties'
    ],
    popularTag: 'Most Popular',
    rating: 4.9,
    reviewsCount: 5410
  },
  {
    id: 'sbi-home-loan',
    name: 'State Bank of India (SBI) Home Loan',
    shortName: 'SBI',
    rate: 'From 7.35% p.a.',
    minRateNumber: 7.35,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '0.35% of loan amount + GST (Min ₹2,000)',
    maxLoanAmount: 'No Upper Limit (Subject to eligibility)',
    maxLTV: 'Up to 90%',
    specialFeature: 'SBI Regular Home Loan with transparent pricing',
    description: 'SBI is India’s largest mortgage provider offering the highest safety, government subsidy processing, and extensive nationwide network.',
    eligibility: [
      'Age: 18 to 70 years',
      'Min Net Monthly Income: ₹15,000',
      'Indian Resident / NRI / PIO'
    ],
    perks: [
      'Interest calculated on Daily Reducing Balance',
      'Special 0.05% interest discount for women',
      'SBI Maxgain overdraft scheme available'
    ],
    popularTag: 'Trusted Leader',
    rating: 4.9,
    reviewsCount: 8900
  },
  {
    id: 'lic-housing',
    name: 'LIC Housing Finance',
    shortName: 'LIC Housing',
    rate: 'From 7.35% p.a.',
    minRateNumber: 7.35,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '₹2,500 to ₹5,000 + GST',
    maxLoanAmount: 'Up to ₹15 Crore',
    maxLTV: 'Up to 85%',
    specialFeature: 'Griha Suvidha scheme with flexible eligibility norms',
    description: 'LIC HFL offers easy financing for purchase, construction, extension, and renovation of homes with transparent documentation.',
    eligibility: [
      'Age: 21 to 70 years',
      'Min Income: ₹18,000/month',
      'Pensioners and non-standard income profiles supported'
    ],
    perks: [
      'Higher tenure for near-retirement borrowers',
      'Low processing charges and no hidden fee',
      'Direct doorstep executive support'
    ],
    rating: 4.7,
    reviewsCount: 3120
  },
  {
    id: 'pnb-housing',
    name: 'Punjab National Bank (PNB) Home Loan',
    shortName: 'PNB',
    rate: 'From 7.35% p.a.',
    minRateNumber: 7.35,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '0.35% (Max ₹15,000)',
    maxLoanAmount: 'Up to ₹10 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: 'PNB Max-Saver with attractive overdraft limit',
    description: 'PNB provides competitive home financing across Tier 1, Tier 2, and Tier 3 cities with relaxed documentation and quick sanction.',
    eligibility: [
      'Age: 21 to 70 years',
      'Min Income: ₹15,000/month',
      'Salaried, businessmen, professionals, agriculturists'
    ],
    perks: [
      'Concessional rates for green home certifications',
      'Easy balance transfer with top-up options',
      'Zero fee on digital application'
    ],
    rating: 4.6,
    reviewsCount: 1750
  },
  {
    id: 'icici-bank',
    name: 'ICICI Bank Home Loan',
    shortName: 'ICICI Bank',
    rate: 'From 7.50% p.a.',
    minRateNumber: 7.50,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: '0.50% + GST (Min ₹3,000)',
    maxLoanAmount: 'Up to ₹20 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: '3-click express digital sanction for pre-approved users',
    description: 'ICICI Bank delivers seamless digital home loan processing with doorstep assistance, express sanctions, and flexible tenure.',
    eligibility: [
      'Age: 21 to 65 years',
      'Min monthly income: ₹25,000',
      'CIBIL score 700+ for instant sanction'
    ],
    perks: [
      'Fast sanction within 24 to 48 hours',
      'Express balance transfer facility',
      'No branch visit required for digital applicants'
    ],
    popularTag: 'Fast Sanction',
    rating: 4.8,
    reviewsCount: 4180
  },
  {
    id: 'axis-bank',
    name: 'Axis Bank Home Loan',
    shortName: 'Axis Bank',
    rate: 'From 7.60% p.a.',
    minRateNumber: 7.60,
    tenure: 'Upto 30 Years',
    maxTenureYears: 30,
    processingFee: 'Up to 1% or ₹10,000 (whichever is lower)',
    maxLoanAmount: 'Up to ₹15 Crore',
    maxLTV: 'Up to 90%',
    specialFeature: 'Shubh Aarambh (12 EMIs waived off on regular repayments)',
    description: 'Axis Bank offers innovative home loan products with EMI waiver rewards, quick approvals, and transparent digital journey.',
    eligibility: [
      'Age: 21 to 65 years',
      'Min Salary: ₹20,000/month',
      'Self-employed minimum turnover ₹3 Lakh/yr'
    ],
    perks: [
      '12 EMIs off on regular repayments with Shubh Aarambh',
      'Flexible floating and fixed interest options',
      'Instant sanction letter via mobile app'
    ],
    rating: 4.7,
    reviewsCount: 3600
  }
];

export const PARTNER_BANKS_BANNER = [
  { name: 'HDFC Bank', code: 'HDFC', color: '#004c8f' },
  { name: 'State Bank of India', code: 'SBI', color: '#280071' },
  { name: 'ICICI Bank', code: 'ICICI', color: '#b02a30' },
  { name: 'Axis Bank', code: 'AXIS', color: '#97144d' },
  { name: 'LIC Housing Finance', code: 'LIC HFL', color: '#005f73' },
  { name: 'Canara Bank', code: 'CANARA', color: '#0072ce' },
  { name: 'Bank of Baroda', code: 'BOB', color: '#f26522' },
  { name: 'Punjab National Bank', code: 'PNB', color: '#a2003c' },
  { name: 'Central Bank of India', code: 'CBI', color: '#003366' },
  { name: 'Aditya Birla Capital', code: 'AB CAPITAL', color: '#c9151b' },
  { name: 'CreditSea', code: 'CreditSea', color: '#0ea5e9' },
  { name: 'Poonawalla Fincorp', code: 'Poonawalla', color: '#047857' },
  { name: 'Kotak Mahindra', code: 'KOTAK', color: '#ed1c24' },
  { name: 'L&T Finance', code: 'L&T', color: '#1d4ed8' }
];

export const BENEFITS: BenefitItem[] = [
  {
    title: 'Get Up to 90% of Property Value',
    description: 'Maximum Loan-to-Value (LTV) ratio ensures minimal down payment from your pocket so you can buy your dream house comfortably.',
    iconName: 'Percent',
    badge: 'High LTV'
  },
  {
    title: 'Repayment Tenures up to 30 years',
    description: 'Choose flexible repayment tenures extending up to 30 years, resulting in affordable monthly EMIs tailored to your budget.',
    iconName: 'CalendarClock',
    badge: 'Flexible'
  },
  {
    title: 'Quick Approval & Processing',
    description: 'Get in-principle digital sanction within 24 hours with streamlined legal and technical verification through partner banks.',
    iconName: 'Zap',
    badge: '24-48 Hrs'
  },
  {
    title: 'Zero Foreclosure Charges',
    description: 'Pay off your home loan or make prepayments anytime with zero penalty fees on all floating rate home loans as per RBI norms.',
    iconName: 'ShieldCheck',
    badge: '₹0 Penalty'
  },
  {
    title: 'Real Agent Support',
    description: 'A dedicated relationship manager assists you at every step: document collection, bank negotiation, site valuation, and disbursement.',
    iconName: 'Headphones',
    badge: 'Dedicated'
  },
  {
    title: '100% Online Application',
    description: 'Compare offers, upload documents, track status, and get loan sanctions from the comfort of your home without visiting bank branches.',
    iconName: 'Smartphone',
    badge: 'Paperless'
  }
];

export const ELIGIBILITY_SALARIED = [
  { label: 'Citizenship', value: 'Indian Citizen (Resident or NRI)', icon: 'Globe' },
  { label: 'Age Criteria', value: 'Between 21 and 70 years at loan maturity', icon: 'UserCheck' },
  { label: 'Monthly Income', value: 'Minimum in-hand salary of ₹15,000/month', icon: 'Wallet' },
  { label: 'Work Experience', value: 'Minimum 1 year total experience (6 months with current employer)', icon: 'Briefcase' },
  { label: 'Credit Score', value: 'Preferred CIBIL score of 650 or higher', icon: 'TrendingUp' }
];

export const ELIGIBILITY_SELF_EMPLOYED = [
  { label: 'Citizenship', value: 'Indian Citizen (Resident / Sole Proprietor / Partner / Director)', icon: 'Globe' },
  { label: 'Age Criteria', value: 'Between 21 and 70 years', icon: 'UserCheck' },
  { label: 'Annual Turnover', value: 'Minimum annual turnover ₹3 Lakh (ITR of last 2 years)', icon: 'Coins' },
  { label: 'Business Vintage', value: 'Minimum 2 to 3 years of active business operations', icon: 'Building2' },
  { label: 'Credit Score', value: 'Preferred CIBIL score of 650 or higher', icon: 'TrendingUp' }
];

export const CHARGES_DATA = [
  {
    type: 'Interest Rates',
    fee: 'Starting from 7.25% p.a.',
    note: 'Floating & Fixed options linked to repo rate (EBLR/RLLR)',
    highlight: true
  },
  {
    type: 'Processing Fee',
    fee: '₹1,000 to ₹7,000 + GST',
    note: 'One-time nominal fee charged by lender upon sanction',
    highlight: false
  },
  {
    type: 'Foreclosure / Prepayment Charges',
    fee: '₹0 (NIL Charges)',
    note: 'Zero penalty for individual floating rate home loans',
    highlight: true
  },
  {
    type: 'Legal & Technical Valuation',
    fee: 'At actuals / Included in package',
    note: 'Property inspection and title search by certified bank lawyers',
    highlight: false
  },
  {
    type: 'Stamp Duty & MODT',
    fee: 'As per State Government rules',
    note: 'Applicable based on property location and registration norms',
    highlight: false
  }
];

export const DOCUMENTS_LIST = [
  {
    title: 'Proof of Income',
    desc: 'Latest 3 months salary slips, Form 16, or last 2 years ITR with computation sheets',
    icon: 'ReceiptText',
    category: 'Income'
  },
  {
    title: 'Statement of primary bank account',
    desc: 'Last 6 months updated bank statement showing regular salary credit or business revenue',
    icon: 'Landmark',
    category: 'Banking'
  },
  {
    title: 'Proof of permanent residence',
    desc: 'Aadhaar Card, Passport, Voter ID, Driving License, or recent electricity/water bill',
    icon: 'Home',
    category: 'Identity & Address'
  },
  {
    title: 'Property documents',
    desc: 'Allotment letter, title deed, buyer agreement, builder NOC, and sanctioned layout plan',
    icon: 'FileSpreadsheet',
    category: 'Property'
  },
  {
    title: 'Latest Form 16',
    desc: 'Form 16 / appointment letter for salaried; Business registration certificate & GST for self-employed',
    icon: 'FileCheck',
    category: 'Verification'
  }
];

export const APPLICATION_STEPS = [
  {
    step: '01',
    title: 'Enter personal details & submit application',
    desc: 'Fill our simple 2-minute online form with your basic details, requirement, and preferred bank to check customized offers.',
    icon: 'FileEdit',
    badge: '2 Mins'
  },
  {
    step: '02',
    title: 'Lending partner calls you to confirm details',
    desc: 'Our certified loan advisor and bank representative contact you to review profile and pick the lowest interest rate scheme.',
    icon: 'PhoneCall',
    badge: 'Same Day'
  },
  {
    step: '03',
    title: 'Site visit & in-person discussion',
    desc: 'Convenient doorstep document collection and hassle-free property legal/technical valuation at zero upfront friction.',
    icon: 'MapPinCheck',
    badge: 'At Doorstep'
  },
  {
    step: '04',
    title: 'Loan approval & Get funds disbursed',
    desc: 'Receive formal loan sanction letter and fast fund disbursement directly to builder, seller, or your development account.',
    icon: 'CheckCircle2',
    badge: 'Instant Funds'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aman Kumar',
    location: 'Delhi NCR',
    loanType: 'Home Loan',
    bank: 'HDFC Bank',
    amount: '₹45 Lakhs',
    quote: 'Applying for a home loan with Jinny Loan was completely seamless. The dedicated team assisted with property verification and got my sanction in 3 days!',
    rating: 5,
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 't2',
    name: 'Abhijit Singh',
    location: 'Mumbai',
    loanType: 'Home Loan Balance Transfer',
    bank: 'SBI',
    amount: '₹62 Lakhs',
    quote: 'I needed lower monthly EMIs and Jinny Loan helped me transfer my loan to SBI at 7.35% with zero foreclosure penalty. Saved over ₹4.5 Lakhs in interest!',
    rating: 5,
    avatarBg: 'bg-rose-500'
  },
  {
    id: 't3',
    name: 'Rithik Kumar',
    location: 'Bengaluru',
    loanType: 'Apartment Purchase',
    bank: 'Canara Bank',
    amount: '₹80 Lakhs',
    quote: 'Thanks to JinnyLoan, I was able to get 90% LTV approved for my dream 3BHK flat. The real agent support was available on WhatsApp throughout.',
    rating: 5,
    avatarBg: 'bg-indigo-600'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What is JinnyLoan.com?',
    answer: 'JinnyLoan is a digital platform providing accessible financial services to all. It leverages technology to offer customized financial products like Home Loans, Personal Loans, Business Loans, and Loan Against Property through its lending partners. We have tie-ups with more than 30+ leading Banks and NBFCs across India.'
  },
  {
    question: 'What are the features & benefits of JinnyLoan digital lending platform?',
    answer: 'JinnyLoan offers 100% digital applications, comparison across 30+ top banks, lowest interest rates starting at 7.10% p.a., transparent charges with zero hidden fees, fast in-principle approval within 24 hours, and dedicated human loan assistance from application to disbursement.'
  },
  {
    question: 'What are the documents required to apply for a Home Loan?',
    answer: 'Basic documents include: Identity & Address proof (Aadhaar, PAN, Passport), Income proof (3 months salary slips or 2-3 years ITR), last 6 months bank statement, and property documents (Agreement to sell, Allotment letter, Title deeds, Approved plan).'
  },
  {
    question: 'Can I borrow any amount that I require up to ₹10 Crore?',
    answer: 'Yes! Loan amounts range from ₹5 Lakhs up to ₹10 Crores (and higher for qualified profiles) depending on your income, repayment capacity, property market valuation, and CIBIL credit score.'
  },
  {
    question: 'What is the minimum credit score requirement to avail a home loan?',
    answer: 'A credit score (CIBIL) of 650 or higher is generally required. Scores above 750 unlock the lowest promotional interest rates starting at 7.10% - 7.35% p.a. with reduced processing charges.'
  },
  {
    question: 'How do I contact JinnyLoan if I face any issue with the website or application?',
    answer: 'You can reach out directly via phone at +91 8006488006, email at info@jinnyloan.com, or visit our office at R 123 Gali No 06 Laxminagar Delhi 110092 (Mon-Sat 10:00 AM - 7:00 PM). You can also click the WhatsApp Loan Inquiry button for instant assistance.'
  }
];
