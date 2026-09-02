export interface BankOffer {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  rate: string;
  minRateNumber: number;
  tenure: string;
  maxTenureYears: number;
  processingFee: string;
  maxLoanAmount: string;
  maxLTV: string;
  specialFeature: string;
  description: string;
  eligibility: string[];
  perks: string[];
  popularTag?: string;
  rating: number;
  reviewsCount: number;
}

export interface CalculatorState {
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
}

export interface CalculationResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalPercentage: number;
  interestPercentage: number;
}

export interface LeadApplicationData {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  employmentType: 'salaried' | 'self-employed' | 'professional';
  monthlyIncome: string;
  loanAmount: number;
  tenureYears: number;
  preferredBank: string;
  propertyIdentified: 'yes' | 'no' | 'in-progress';
  message?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  loanType: string;
  bank: string;
  amount: string;
  quote: string;
  rating: number;
  avatarBg: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface EligibilityRequirement {
  type: 'salaried' | 'self-employed';
  title: string;
  age: string;
  income: string;
  experience: string;
  cibil: string;
  citizenship: string;
  highlights: string[];
}
