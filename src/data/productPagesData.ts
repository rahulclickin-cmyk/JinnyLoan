export interface ProductPagePartner {
  name: string;
  logoName: string;
  tagline: string;
  rate: string;
  maxAmount: string;
  tenure: string;
  badge: string;
  externalUrl: string;
  features: string[];
}

export interface ProductPageData {
  slug: string;
  title: string;
  categoryName: string;
  badge: string;
  heroTagline: string;
  heroDescription: string;
  startingRate: string;
  maxAmount: string;
  maxTenure: string;
  processingFee: string;
  heroGradient: string;
  heroAccent: string;
  overview: string;
  benefits: Array<{ title: string; desc: string }>;
  eligibility: Array<{ criterion: string; detail: string }>;
  documents: Array<{ category: string; docs: string[] }>;
  howItWorks: Array<{ step: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
  partners: ProductPagePartner[];
  isDirectRedirect: boolean; // True for Personal Loan, Credit Card, Business Loan (Rule #7)
}

export const PRODUCT_PAGES_DATA: Record<string, ProductPageData> = {
  '/personal-loan': {
    slug: '/personal-loan',
    title: 'Personal Loan Online',
    categoryName: 'Personal Loan',
    badge: '100% Paperless Approval',
    heroTagline: 'Instant Unsecured Cash Loans up to ₹40 Lakhs',
    heroDescription: 'Compare verified offers from top RBI-regulated banks & NBFCs with interest rates starting at 9.99% p.a. Zero collateral, minimal paperwork, and same-day bank transfer.',
    startingRate: '9.99% p.a.',
    maxAmount: 'Up to ₹40 Lakhs',
    maxTenure: '1 to 5 Years',
    processingFee: '0.5% - 2.5%',
    heroGradient: 'from-[#0f2868] via-[#1e40af] to-[#2563eb]',
    heroAccent: 'text-yellow-300',
    overview: 'A personal loan is an all-purpose unsecured loan that requires no collateral or security pledge. At JinnyLoan, we connect you directly with over 30 verified institutional lenders, ensuring instant eligibility checks, competitive interest rates, and seamless online disbursal directly into your bank account.',
    benefits: [
      { title: 'Zero Collateral Required', desc: 'No need to pledge any property, gold, or shares. Approval is based on your income and credit profile.' },
      { title: 'Rapid Same-Day Disbursal', desc: 'Once your KYC and bank statements are digitally verified, funds are credited within 24 business hours.' },
      { title: 'Flexible Repayment Tenures', desc: 'Repay comfortably with affordable EMIs spread across 12 to 60 months tailored to your salary.' },
      { title: 'Pre-Approved Special Rates', desc: 'Exclusive concessions for corporate employees, government staff, and borrowers with CIBIL score of 720+.' }
    ],
    eligibility: [
      { criterion: 'Age Limit', detail: '21 to 58 years for salaried, up to 65 years for self-employed professionals' },
      { criterion: 'Minimum Income', detail: '₹20,000 net monthly salary credited via bank account (₹25,000 for Metro cities)' },
      { criterion: 'Work Experience', detail: 'Minimum 6 months with current employer or 2 years total work experience' },
      { criterion: 'Credit Score', detail: 'CIBIL score of 650 or higher preferred for fastest digital approvals' }
    ],
    documents: [
      { category: 'Identity & Address Proof', docs: ['Aadhaar Card (linked to mobile for e-KYC)', 'PAN Card (mandatory)', 'Valid Passport or Voter ID'] },
      { category: 'Income Proof (Salaried)', docs: ['Latest 3 months salary slips', 'Latest 6 months bank statement showing salary credits', 'Form 16 or Appointment Letter'] },
      { category: 'Income Proof (Self-Employed)', docs: ['Previous 2 years ITR with computation', '6 to 12 months primary current/savings account statement', 'Business registration certificate / GSTIN'] }
    ],
    howItWorks: [
      { step: '01', title: 'Compare Partners', desc: 'Explore top lending partners below and select the rate that fits your monthly budget.' },
      { step: '02', title: 'Direct Partner Apply', desc: 'Click Apply Now to jump directly to the verified partner portal with pre-filled JinnyLoan priority codes.' },
      { step: '03', title: 'Digital e-KYC', desc: 'Complete Aadhaar OTP verification and upload your digital bank statement.' },
      { step: '04', title: 'Instant Account Credit', desc: 'Loan agreement is e-signed and money is disbursed directly to your account.' }
    ],
    faqs: [
      { q: 'Can I get a personal loan with a CIBIL score below 650?', a: 'Yes! We partner with specialized NBFCs such as Poonawalla Fincorp and CreditSea that consider overall banking history and salary cash flows for approval.' },
      { q: 'Are there any prepayment or foreclosure penalties?', a: 'Under RBI regulations, floating rate personal loans cannot carry foreclosure charges. For fixed-rate loans, lenders typically allow foreclosure after 6 to 12 EMIs with minimal fees (0-3%).' },
      { q: 'How is the interest rate decided?', a: 'Your interest rate depends on your credit score, monthly income, employer category, and existing debt obligations (FOIR).' }
    ],
    isDirectRedirect: true,
    partners: [
      {
        name: 'Aditya Birla Capital',
        logoName: 'Aditya Birla',
        tagline: 'Express Personal Loan',
        rate: 'From 10.49% p.a.',
        maxAmount: 'Up to ₹5 Lakhs',
        tenure: 'Upto 36 Months',
        badge: 'Instant Sanction',
        externalUrl: 'https://bitli.in/5OXZt6Z',
        features: ['100% Online process', 'Zero documentation collection', 'Direct NEFT transfer']
      },
      {
        name: 'Poonawalla Fincorp',
        logoName: 'Poonawalla',
        tagline: 'Instant Cash Loan',
        rate: 'From 9.99% p.a.',
        maxAmount: 'Up to ₹30 Lakhs',
        tenure: 'Upto 60 Months',
        badge: 'Lowest Rate',
        externalUrl: 'https://bitli.in/VqSU8fF',
        features: ['Minimal documentation', 'No hidden processing fees', 'High sanction limit']
      },
      {
        name: 'Tata Capital',
        logoName: 'Tata Capital',
        tagline: 'Quick Disbursal Personal Loan',
        rate: 'From 10.99% p.a.',
        maxAmount: 'Up to ₹15 Lakhs',
        tenure: 'Upto 48 Months',
        badge: 'Top Corporate',
        externalUrl: 'https://bitli.in/H5QN6Tz',
        features: ['Trusted Tata governance', 'Overdraft option available', 'Special rates for women']
      },
      {
        name: 'CreditSea',
        logoName: 'CreditSea',
        tagline: 'Micro Cash & Quick Loan',
        rate: 'From 2.00% p.m.',
        maxAmount: 'Up to ₹1 Lakh',
        tenure: 'Upto 12 Months',
        badge: 'Fast Disbursal',
        externalUrl: 'https://bitli.in/5OXZt6Z',
        features: ['Instant micro-credit', 'Emergency medical cash', 'Quick 15-min approval']
      }
    ]
  },

  '/credit-card': {
    slug: '/credit-card',
    title: 'Credit Cards Comparison & Apply',
    categoryName: 'Credit Card',
    badge: 'Lifetime Free & 5% Cashback',
    heroTagline: 'Maximize Your Rewards on Every Rupee Spent',
    heroDescription: 'Find the ideal credit card matching your lifestyle. Compare complimentary airport lounge access, dining cashback, fuel waivers, and zero joining fees from India’s leading card issuers.',
    startingRate: 'Lifetime Free Options',
    maxAmount: 'Credit Limit to ₹10 Lakhs',
    maxTenure: 'Up to 50 Days Interest-Free',
    processingFee: '₹0 Joining Fee Offers',
    heroGradient: 'from-slate-900 via-[#1e1b4b] to-black',
    heroAccent: 'text-pink-400',
    overview: 'Credit cards offer a revolving line of credit with up to 50 days of interest-free liquidity, lucrative reward points, milestone flight tickets, and fraud protection. Browse handpicked cards and apply directly on the bank’s official portal for instant digital issuance.',
    benefits: [
      { title: 'Unlimited 5% Cashback', desc: 'Direct statement credits on popular shopping apps like Swiggy, Zomato, Flipkart, and Amazon.' },
      { title: 'Airport Lounge Access', desc: 'Enjoy up to 8 complimentary domestic and international airport lounge entries per calendar year.' },
      { title: '1% Fuel Surcharge Waiver', desc: 'Save on everyday commutes across all HPCL, BPCL, and Indian Oil petrol pumps nationwide.' },
      { title: 'Zero Joining & Annual Fee', desc: 'Multiple Lifetime Free (LTF) variants with no spend threshold conditions.' }
    ],
    eligibility: [
      { criterion: 'Age Criteria', detail: 'Primary applicant: 18 to 65 years. Add-on cardholder: 15 years and above.' },
      { criterion: 'Monthly Income', detail: 'Salaried: ₹25,000+ monthly salary. Self-employed: ₹3.5 Lakhs annual ITR.' },
      { criterion: 'Credit Profile', detail: 'Credit score of 720+ recommended. Freshers with fixed deposits can apply for secured cards.' }
    ],
    documents: [
      { category: 'KYC & Verification', docs: ['PAN Card copy', 'Aadhaar Card with address proof', 'Recent passport-size photograph'] },
      { category: 'Financial Proof', docs: ['Salary slip for last 2 months', 'Bank statement with salary credit', 'Existing active credit card statement (card-to-card application)'] }
    ],
    howItWorks: [
      { step: '01', title: 'Choose Your Card', desc: 'Select from cashback, travel, or fuel reward cards below.' },
      { step: '02', title: 'Direct Partner Redirection', desc: 'Click Apply Now to navigate to the official bank application portal.' },
      { step: '03', title: 'Video KYC', desc: 'Perform a 2-minute video KYC on your phone with your original PAN card.' },
      { step: '04', title: 'Instant Virtual Card', desc: 'Receive your virtual credit card immediately for online transactions, physical card delivered in 4 days.' }
    ],
    faqs: [
      { q: 'What is a Lifetime Free (LTF) credit card?', a: 'A Lifetime Free credit card charges ₹0 joining fee and ₹0 annual fee for life, without any minimum spend requirements.' },
      { q: 'How long is the interest-free credit period?', a: 'Most banks provide between 45 to 50 days of grace period between transaction date and payment due date.' },
      { q: 'Can I get a credit card without income proof?', a: 'Yes, through secured credit cards against a fixed deposit (FD), or via Card-to-Card applications if you hold a card with ₹50,000+ limit.' }
    ],
    isDirectRedirect: true,
    partners: [
      {
        name: 'HDFC Millennia Platinum',
        logoName: 'HDFC',
        tagline: '5% Cashback on Top Apps',
        rate: '5% Direct Cashback',
        maxAmount: 'Limit up to ₹5 Lakhs',
        tenure: 'Lifetime Free on Offer',
        badge: 'Best Cashback',
        externalUrl: 'https://bitli.in/I9ySv3I',
        features: ['5% cashback on Amazon & Flipkart', '₹1,000 welcome voucher', '4 Free lounge visits/yr']
      },
      {
        name: 'Axis Bank ACE Credit Card',
        logoName: 'Axis Bank',
        tagline: 'Highest Utility Bill Cashback',
        rate: '5% on Google Pay',
        maxAmount: 'Limit up to ₹6 Lakhs',
        tenure: '₹499 (Waived on Spends)',
        badge: 'Top Bill Pay',
        externalUrl: 'https://bitli.in/ZTidWoV',
        features: ['5% cashback on DTH, mobile & electricity', '2% flat on all other spends', '4 Domestic lounge visits']
      },
      {
        name: 'SBI SimplyCLICK Card',
        logoName: 'SBI',
        tagline: '10X Online Shopping Rewards',
        rate: '10X Reward Points',
        maxAmount: 'Limit up to ₹4 Lakhs',
        tenure: '₹499 (Reversed on ₹1L spend)',
        badge: 'Online Shopping',
        externalUrl: 'https://bitli.in/Q9vpVjd',
        features: ['₹500 Amazon gift voucher on joining', '10X points on BookMyShow & Cleartrip', '1% fuel surcharge waiver']
      },
      {
        name: 'Amazon Pay ICICI Card',
        logoName: 'ICICI',
        tagline: 'Lifetime Free Amazon Cashback',
        rate: '5% Unlimited Cashback',
        maxAmount: 'Limit up to ₹5 Lakhs',
        tenure: 'Lifetime Free',
        badge: 'Lifetime Free',
        externalUrl: 'https://bitli.in/tz5iKIO',
        features: ['5% Amazon reward points', 'Zero annual fee forever', 'Complimentary dining perks']
      },
      {
        name: 'Kotak League Platinum Card',
        logoName: 'Kotak',
        tagline: 'Movie & Reward Points Card',
        rate: '8X Reward Points',
        maxAmount: 'Limit up to ₹4 Lakhs',
        tenure: 'Free for Salary Account',
        badge: 'Reward Special',
        externalUrl: 'https://bitli.in/xtG7uh9',
        features: ['8X reward points on retail', '4 Free PVR tickets yearly', 'Fuel surcharge waiver']
      }
    ]
  },

  '/business-loan': {
    slug: '/business-loan',
    title: 'Business & MSME Loans',
    categoryName: 'Business Loan',
    badge: 'Collateral-Free MSME Funding',
    heroTagline: 'Fuel Your Business Growth with Capital up to ₹75 Lakhs',
    heroDescription: 'Empowering retailers, manufacturers, service providers, and startups with working capital, machinery financing, and expansion loans. Disbursal in 48 hours with minimal financial auditing.',
    startingRate: 'From 11.25% p.a.',
    maxAmount: 'Up to ₹75 Lakhs',
    maxTenure: '12 to 60 Months',
    processingFee: '1.0% to 2.0%',
    heroGradient: 'from-[#0b3c5d] via-[#1d2731] to-[#328cc1]',
    heroAccent: 'text-emerald-300',
    overview: 'A business loan provides collateral-free working capital, vendor financing, or capital expenditure liquidity for micro, small, and medium enterprises. JinnyLoan bridges commercial enterprises directly to financial institutions offering government CGTMSE scheme benefits and digital balance sheet assessments.',
    benefits: [
      { title: 'Zero Collateral Security', desc: 'Secure up to ₹75 Lakhs purely on banking turnover without pledging residential or commercial assets.' },
      { title: 'CGTMSE Scheme Benefit', desc: 'Access credit guarantee trust backed loan limits with subsidized interest for eligible MSME manufacturers.' },
      { title: 'Overdraft & Term Loan Options', desc: 'Choose between lump-sum term loans or revolving overdraft facilities where interest is paid only on utilized funds.' },
      { title: 'Speedy 48-Hour Sanction', desc: 'AI-driven GST and net banking analysis delivers sanction letters in 2 business days.' }
    ],
    eligibility: [
      { criterion: 'Business Vintage', detail: 'Minimum 1.5 to 2 years of active continuous commercial operations' },
      { criterion: 'Annual Turnover', detail: 'Minimum annual gross turnover of ₹25 Lakhs filed in GST / ITR' },
      { criterion: 'Applicant Age', detail: 'Promoter / proprietor age between 24 and 65 years' },
      { criterion: 'CIBIL / Commercial Bureau', detail: 'CIBIL score of 680+ with no major NPA defaults in past 24 months' }
    ],
    documents: [
      { category: 'Entity Proof', docs: ['GST Registration Certificate', 'Udyam Aadhaar Registration', 'Partnership deed / MOA & AOA'] },
      { category: 'Financial Documents', docs: ['Last 12 months GST returns (GSTR-3B & GSTR-1)', 'Last 12 months primary current bank statements in PDF', 'Last 2 years audited balance sheets with CA seal'] },
      { category: 'Promoter KYC', docs: ['PAN & Aadhaar of all partners/directors', 'Business premises address ownership proof or lease agreement'] }
    ],
    howItWorks: [
      { step: '01', title: 'Select Lending Partner', desc: 'Review partner credit parameters below suited for MSME scale.' },
      { step: '02', title: 'Direct Partner Application', desc: 'Redirect to partner business portal with exclusive digital rate concessions.' },
      { step: '03', title: 'GST & Bank Sync', desc: 'Authenticate via GST portal and digital account aggregator for fast assessment.' },
      { step: '04', title: 'Direct Bank Disbursal', desc: 'Sanction letter issued, legal terms e-signed, and funds disbursed to current account.' }
    ],
    faqs: [
      { q: 'Can a newly incorporated business apply?', a: 'Businesses need at least 12-18 months of operating track record with valid GST returns to qualify for unsecured loans.' },
      { q: 'What is the maximum collateral-free loan amount?', a: 'Most partner NBFCs provide up to ₹50 to ₹75 Lakhs collateral-free. Larger amounts above ₹1 Crore can be availed under CGTMSE or with property collateral.' },
      { q: 'Is GST registration mandatory?', a: 'Yes, for unsecured business loans above ₹10 Lakhs, active GST registration and filings are mandatory.' }
    ],
    isDirectRedirect: true,
    partners: [
      {
        name: 'Tata Capital Business Loan',
        logoName: 'Tata Capital',
        tagline: 'Collateral-Free MSME Capital',
        rate: 'From 11.25% p.a.',
        maxAmount: 'Up to ₹75 Lakhs',
        tenure: 'Upto 60 Months',
        badge: 'Fast Sanction',
        externalUrl: 'https://www.tatacapital.com/business-loan.html',
        features: ['Flexible bullet repayment options', 'Zero collateral', 'Doorstep document assistance']
      },
      {
        name: 'Aditya Birla MSME Finance',
        logoName: 'Aditya Birla',
        tagline: 'Working Capital & Line of Credit',
        rate: 'From 11.49% p.a.',
        maxAmount: 'Up to ₹50 Lakhs',
        tenure: 'Upto 48 Months',
        badge: 'Digital MSME',
        externalUrl: 'https://www.adityabirlacapital.com/business-loan',
        features: ['Revolving credit limit', 'Interest only on amount used', 'Quick digital onboarding']
      },
      {
        name: 'Poonawalla Fincorp Business',
        logoName: 'Poonawalla',
        tagline: 'Express Commercial Disbursal',
        rate: 'From 10.99% p.a.',
        maxAmount: 'Up to ₹50 Lakhs',
        tenure: 'Upto 48 Months',
        badge: 'Competitive Rate',
        externalUrl: 'https://poonawallafincorp.com/business-loan',
        features: ['Minimal financials required', 'Fast turnaround time', 'High approval ratio']
      }
    ]
  },

  '/home-loan': {
    slug: '/home-loan',
    title: 'Home Loan Marketplace',
    categoryName: 'Home Loan',
    badge: 'Lowest Interest Rates in Banking',
    heroTagline: 'Turn Your Dream Home into Reality with Rates from 7.10% p.a.',
    heroDescription: 'Compare India’s leading public and private banks. Enjoy zero foreclosure charges, maximum 90% loan-to-value (LTV), 30-year repayment terms, and doorstep legal concierge.',
    startingRate: '7.10% p.a.',
    maxAmount: 'Up to ₹25 Crores',
    maxTenure: 'Up to 30 Years',
    processingFee: '0.25% - 0.50% (Max ₹10,000)',
    heroGradient: 'from-[#002f6c] via-[#004c8f] to-[#1e3a8a]',
    heroAccent: 'text-amber-300',
    overview: 'A Home Loan empowers you to purchase ready-to-move apartments, under-construction builder flats, construct on a freehold plot, or transfer your existing loan for substantial interest savings. With JinnyLoan, compare 100+ RBI-regulated banks, assess your EMI dynamically, and get in-principle approval within hours.',
    benefits: [
      { title: 'Lowest Rates from 7.10% p.a.', desc: 'Tied to external benchmark lending rates (EBLR/Repo-rate) ensuring transparent rate transmission.' },
      { title: 'Maximum Loan Quantum (90% LTV)', desc: 'Finance up to 90% of property registration cost for loans up to ₹30 Lakhs (80% for larger amounts).' },
      { title: 'Extended 30-Year Repayment', desc: 'Lower your monthly EMI burden with comfortable extended tenures up to 360 months.' },
      { title: 'Substantial Tax Benefits', desc: 'Deduct up to ₹1.5 Lakhs on principal under Sec 80C and up to ₹2 Lakhs on interest under Sec 24(b).' }
    ],
    eligibility: [
      { criterion: 'Eligible Applicants', detail: 'Salaried employees, Self-employed professionals, Business owners, and NRIs' },
      { criterion: 'Age Bracket', detail: '18 to 70 years at loan maturity' },
      { criterion: 'Income Requirement', detail: 'Minimum net family income of ₹25,000/month (Co-applicants can be added to boost limit)' },
      { criterion: 'CIBIL Benchmark', detail: 'Score of 700+ qualifies for the absolute lowest interest rate tier' }
    ],
    documents: [
      { category: 'KYC & Personal', docs: ['PAN Card', 'Aadhaar Card with biometric verification', 'Passport or Voter ID', 'Passport photographs'] },
      { category: 'Income Proof', docs: ['Salary slips (last 3 months)', 'Form 16 (last 2 years)', 'Bank statement (last 6 months with salary credits)', 'ITR for self-employed'] },
      { category: 'Property Documents', docs: ['Allotment letter or Buyer Agreement (BBA)', 'Chain of previous title deeds (13 to 30 years)', 'Approved building plan & NOC from developer', 'Payment receipts made to seller'] }
    ],
    howItWorks: [
      { step: '01', title: 'Check Eligibility', desc: 'Calculate your maximum loan quantum using our dynamic EMI calculator below.' },
      { step: '02', title: 'Select Preferred Bank', desc: 'Choose from SBI, HDFC, ICICI, BOB, or Kotak with the lowest interest rate and fee.' },
      { step: '03', title: 'Legal & Technical Evaluation', desc: 'The bank inspects property deeds and valuation through authorized legal advocates.' },
      { step: '04', title: 'Sanction & Cheque Release', desc: 'Sanction letter issued, loan agreement signed, and disbursal cheque handed to builder.' }
    ],
    faqs: [
      { q: 'Can I add a co-applicant to increase my loan eligibility?', a: 'Yes! Adding an earning spouse, parent, or child allows the bank to combine both incomes, significantly raising your sanction amount.' },
      { q: 'Are there any prepayment penalties on home loans?', a: 'No. RBI mandates that zero prepayment or foreclosure penalty can be charged on floating rate home loans taken by individual borrowers.' },
      { q: 'What is the difference between fixed and floating rates?', a: 'Floating rates fluctuate with RBI repo rate changes and offer the lowest starting rate. Fixed rates remain constant for a specified lock-in period.' }
    ],
    isDirectRedirect: false,
    partners: [
      {
        name: 'State Bank of India (SBI)',
        logoName: 'SBI',
        tagline: 'Festive Home Loan Campaign',
        rate: '7.10% p.a.',
        maxAmount: 'Up to ₹10 Crores',
        tenure: '30 Years',
        badge: 'Lowest Gov Rate',
        externalUrl: 'https://homeloans.sbi/',
        features: ['Zero processing fee', '0.05% women concession', 'Overdraft MaxGain option']
      },
      {
        name: 'HDFC Bank Home Loan',
        logoName: 'HDFC',
        tagline: 'Express Digital In-Principle',
        rate: '7.35% p.a.',
        maxAmount: 'Up to ₹25 Crores',
        tenure: '30 Years',
        badge: 'Fastest Sanction',
        externalUrl: 'https://www.hdfcbank.com/personal/borrow/popular-loans/home-loan',
        features: ['Digital sanction in 24 hrs', 'Doorstep legal assistance', 'Wide builder network']
      },
      {
        name: 'Bank of Baroda (BOB)',
        logoName: 'Bank of Baroda',
        tagline: 'Baroda Max Overdraft Home Loan',
        rate: '7.20% p.a.',
        maxAmount: 'Up to ₹20 Crores',
        tenure: '30 Years',
        badge: 'Top Value',
        externalUrl: 'https://www.bankofbaroda.in/personal-banking/loans/home-loan',
        features: ['Link savings to reduce interest', 'No prepayment charges', 'Low processing fees']
      }
    ]
  },

  '/loan-against-property': {
    slug: '/loan-against-property',
    title: 'Loan Against Property (LAP)',
    categoryName: 'Loan Against Property',
    badge: 'Unlock High Property Value',
    heroTagline: 'Monetize Your Real Estate Equity at Lowest Commercial Rates',
    heroDescription: 'Unlock up to 75% of your residential, commercial, or industrial property’s market value. Ideal for large business investments, child higher education abroad, debt consolidation, or medical needs.',
    startingRate: '7.75% p.a.',
    maxAmount: 'Up to ₹15 Crores',
    maxTenure: 'Up to 20 Years',
    processingFee: '0.50% - 1.00%',
    heroGradient: 'from-[#4a0e4e] via-[#6d1b7b] to-[#1a237e]',
    heroAccent: 'text-yellow-300',
    overview: 'A Loan Against Property (LAP) is a secured mortgage loan where you pledge your self-occupied or rented residential, commercial, or industrial property as collateral. Because the loan is secured by valuable real estate, banks offer significantly lower interest rates and longer repayment tenures compared to unsecured personal or business loans.',
    benefits: [
      { title: 'Substantially Lower Interest Rates', desc: 'Enjoy rates starting from 7.75% p.a., saving up to 6-8% annually compared to unsecured commercial loans.' },
      { title: 'High Sanction Quantum up to ₹15 Cr', desc: 'Avail between 60% to 75% of fair market value assessed by independent government-approved valuers.' },
      { title: 'Long Repayment Tenure up to 20 Years', desc: 'Distribute large principal amounts across 15 to 20 years to maintain comfortable monthly cash flows.' },
      { title: 'Continue Using Your Property', desc: 'Retain 100% full possession, occupancy, or rental income from the mortgaged premises.' }
    ],
    eligibility: [
      { criterion: 'Eligible Property Types', detail: 'Fully constructed Residential houses, Freehold Apartments, Commercial offices, Rented showrooms, and Industrial sheds' },
      { criterion: 'Borrower Profile', detail: 'Salaried executives, Self-employed professionals (Doctors, CAs), Business proprietors, Partnerships & Pvt Ltd companies' },
      { criterion: 'Income Stability', detail: 'Minimum 3 years profitable track record for business; minimum ₹35,000 monthly salary for salaried borrowers' },
      { criterion: 'Property Ownership', detail: 'Clear and marketable title with all municipal property taxes up to date' }
    ],
    documents: [
      { category: 'Property Documents', docs: ['Registered Sale Deed / Conveyance Deed', 'Latest Property Tax assessment receipts and paid challans', 'Approved architectural building sanction plan', 'NOC from housing society or municipal body'] },
      { category: 'Financial Documents (Business)', docs: ['Audited Financial Statements with CA balance sheet for last 3 years', 'Last 12 months primary bank statement', 'GST returns for current financial year'] },
      { category: 'Identity & Address', docs: ['PAN & Aadhaar Card of all co-owners of the property', 'Proof of business operating address'] }
    ],
    howItWorks: [
      { step: '01', title: 'Property Assessment', desc: 'Enter your property type, city, and approximate market value in our valuation meter below.' },
      { step: '02', title: 'Bank Selection', desc: 'Compare mortgage rate quotes from our institutional bank partners.' },
      { step: '03', title: 'Technical & Legal Inspection', desc: 'Bank’s empanelled engineer evaluates structure while legal team conducts 30-year search.' },
      { step: '04', title: 'Mortgage & Disbursal', desc: 'Simple mortgage registration completed at sub-registrar office and loan amount credited.' }
    ],
    faqs: [
      { q: 'Can I get a loan on a rented commercial property?', a: 'Yes! Lease Rental Discounting (LRD) and standard LAP are both available on rented commercial spaces based on existing rental cash flows.' },
      { q: 'Who needs to be a co-applicant on a Loan Against Property?', a: 'All legal co-owners whose names appear on the registered title deed must join as co-applicants.' },
      { q: 'Can I use the funds for any legitimate purpose?', a: 'Yes. Funds can be utilized for business expansion, debt consolidation, medical treatments, or weddings. Speculative activities like stock trading are prohibited.' }
    ],
    isDirectRedirect: false,
    partners: [
      {
        name: 'HDFC Bank LAP',
        logoName: 'HDFC',
        tagline: 'High LTV Property Mortgage',
        rate: 'From 7.75% p.a.',
        maxAmount: 'Up to ₹15 Crores',
        tenure: 'Up to 15 Years',
        badge: 'Top Mortgage',
        externalUrl: 'https://www.hdfcbank.com/personal/borrow/popular-loans/loan-against-property',
        features: ['Up to 70% market valuation', 'Commercial & Residential allowed', 'Overdraft facility available']
      },
      {
        name: 'ICICI Bank LAP',
        logoName: 'ICICI',
        tagline: 'Quick Property Sanction',
        rate: 'From 7.85% p.a.',
        maxAmount: 'Up to ₹12 Crores',
        tenure: 'Up to 15 Years',
        badge: 'Fast Processing',
        externalUrl: 'https://www.icicibank.com/personal-banking/loans/loan-against-property',
        features: ['Fast legal vetting', 'Flexible EMI step-up plans', 'Nil prepayment after lock-in']
      },
      {
        name: 'Kotak Mahindra LAP',
        logoName: 'Kotak',
        tagline: 'Commercial & Industrial Mortgage',
        rate: 'From 7.90% p.a.',
        maxAmount: 'Up to ₹10 Crores',
        tenure: 'Up to 15 Years',
        badge: 'MSME Friendly',
        externalUrl: 'https://www.kotak.com/en/personal-banking/loans/loan-against-property.html',
        features: ['Minimal balance sheet hurdles', 'High evaluation ratios', 'Doorstep concierge']
      }
    ]
  },

  '/loan-agent': {
    slug: '/loan-agent',
    title: 'Loan Agent & DSA Channel Partner',
    categoryName: 'Loan Agent',
    badge: 'Zero Investment • Highest Payouts',
    heroTagline: 'Become an Authorized Loan Agent & Earn up to ₹1.5 Lakh+ Monthly',
    heroDescription: 'Join JinnyLoan’s digital DSA network to distribute Personal Loans, Home Loans, Business Loans, and Credit Cards from 100+ RBI-registered banks & NBFCs. Get dedicated CRM portal access, instant paperless onboarding, and weekly commission payouts.',
    startingRate: 'Up to 2.5% Payout',
    maxAmount: 'Zero Security Fee',
    maxTenure: 'Lifetime Code',
    processingFee: '₹0 Joining Fee',
    heroGradient: 'from-[#064e3b] via-[#047857] to-[#0f766e]',
    heroAccent: 'text-amber-300',
    overview: 'As an authorized JinnyLoan DSA Channel Partner and Loan Agent, you act as a trusted financial bridge connecting individual and business loan seekers with India’s top 100+ Banks and NBFCs. Whether you are an existing financial advisor, chartered accountant, insurance agent, real estate broker, or ambitious professional, our digital partner program empowers you to monetize loan leads with transparent real-time tracking, fast disbursals, and guaranteed highest market commissions.',
    benefits: [
      { title: 'Highest Market Commissions', desc: 'Earn up to 2.5% on Personal Loans, up to 2.0% on Business Loans, and 0.5% to 1.0% on Home Loans & LAP disbursals.' },
      { title: '100+ Banks & NBFCs on Single Code', desc: 'No need to tie up individually with multiple banks. Access SBI, HDFC, ICICI, Axis, Tata Capital, Poonawalla, and 90+ lenders in one dashboard.' },
      { title: 'Real-Time CRM & Lead Tracking', desc: 'Track customer application status digitally from submission, documentation, sanction, to fund credit with automated SMS & WhatsApp updates.' },
      { title: 'Dedicated Relationship Manager', desc: 'Get doorstep document collection assistance, credit underwriting support, and fast-track file approval from dedicated banking managers.' }
    ],
    eligibility: [
      { criterion: 'Eligible Profiles', detail: 'Financial Advisors, Insurance Agents (LIC/General), Chartered Accountants, Tax Consultants, Real Estate Brokers, DSA Staff, Freelancers' },
      { criterion: 'Age Requirement', detail: 'Minimum 21 years of age, Indian National with active Aadhaar & PAN' },
      { criterion: 'Educational Background', detail: 'Minimum 10+2 (Higher Secondary) or Graduate in any field; basic understanding of financial products' },
      { criterion: 'Office / Capital Requirement', detail: 'Zero initial capital or office required; operate flexibly from your home, mobile, or existing shop/office' }
    ],
    documents: [
      { category: 'Identity & Address Proof', docs: ['PAN Card (Mandatory for commission TDS reporting)', 'Aadhaar Card (Linked with active mobile for e-KYC)', 'Recent Passport Size Color Photograph'] },
      { category: 'Bank Account Details', docs: ['Cancelled Cheque or Bank Passbook showing Name & IFSC for direct commission credits', 'Bank statement for last 3 months'] },
      { category: 'Educational / Business Proof', docs: ['Highest qualification certificate (10+2/Degree)', 'Existing business visiting card / GST (Optional for firms)'] }
    ],
    howItWorks: [
      { step: '01', title: 'Free Online Registration', desc: 'Fill the partner registration form with your basic details and upload your KYC documents in under 2 minutes.' },
      { step: '02', title: 'Partner Code Generation', desc: 'Our team verifies your details and issues your official authorized JinnyLoan Partner Code and CRM login within 24 hours.' },
      { step: '03', title: 'Submit Customer Leads', desc: 'Punch customer loan requirements into the partner web portal or mobile CRM. Our central team assists with documentation.' },
      { step: '04', title: 'Disbursal & Payout Credit', desc: 'Partner bank verifies and disburses the loan amount. Your earned commission is transferred directly to your bank account.' }
    ],
    faqs: [
      { q: 'Is there any joining fee or security deposit to become a loan agent?', a: 'No, joining the JinnyLoan DSA partner network is 100% free of cost. There are zero hidden fees, security deposits, or registration charges.' },
      { q: 'What is the commission payout cycle?', a: 'Commissions are calculated on a transparent weekly or monthly cycle and disbursed directly via NEFT/IMPS to your registered bank account with formal payout statements.' },
      { q: 'Can I work as a loan agent on a part-time basis?', a: 'Yes! Over 60% of our partners work part-time alongside their regular employment, insurance agency, or tax consultancy practice.' },
      { q: 'What support is provided to new loan agents?', a: 'We provide comprehensive product training modules, marketing brochures, customer loan comparison calculators, and a dedicated Relationship Manager to clear customer files.' }
    ],
    isDirectRedirect: false,
    partners: [
      {
        name: 'JinnyLoan Direct Channel',
        logoName: 'JinnyLoan',
        tagline: 'Instant 24-Hr Partner Code Activation',
        rate: 'Up to 2.5% Payout',
        maxAmount: 'Zero Investment',
        tenure: 'Lifetime Partner Code',
        badge: 'Official Program',
        externalUrl: '#register-agent',
        features: ['Digital CRM dashboard access', 'Weekly payout cycle', 'Dedicated file clearance manager']
      },
      {
        name: 'Bank & NBFC Channel Pool',
        logoName: 'SBI',
        tagline: '100+ Institutional Lenders',
        rate: 'All Loan Products',
        maxAmount: 'Pan-India Coverage',
        tenure: 'Personal, Home, Business',
        badge: '100+ Lenders',
        externalUrl: '#register-agent',
        features: ['Top public & private banks', 'Special rates for salaried & self-employed', 'Fast sanction turnaround']
      },
      {
        name: 'Fast-Track Lead Desk',
        logoName: 'HDFC',
        tagline: 'Doorstep Pickup & e-KYC',
        rate: 'Highest Commission Tier',
        maxAmount: 'High Quantum Files',
        tenure: 'Weekly Account Settlement',
        badge: 'Full RM Support',
        externalUrl: '#register-agent',
        features: ['Customer document collection', 'Credit score check assistance', 'Transparent billing sheet']
      }
    ]
  }
};
