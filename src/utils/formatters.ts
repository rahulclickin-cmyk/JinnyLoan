export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumberIndian(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(2)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount}`;
}

/**
 * Standard Equated Monthly Installment (EMI) Formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * P = Principal loan amount
 * r = Monthly interest rate (annual rate / 12 / 100)
 * n = Number of monthly installments (tenure in years * 12)
 */
export function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
  if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: 0,
      principalPercentage: 100,
      interestPercentage: 0
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  const totalPayment = emi * numberOfMonths;
  const totalInterest = totalPayment - principal;

  const principalPercentage = Math.round((principal / totalPayment) * 100);
  const interestPercentage = 100 - principalPercentage;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalPercentage,
    interestPercentage
  };
}

export interface AmortizationYear {
  year: number;
  openingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalEmiPaid: number;
  closingBalance: number;
}

export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  tenureYears: number
): AmortizationYear[] {
  const schedule: AmortizationYear[] = [];
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let currentBalance = principal;

  for (let y = 1; y <= tenureYears; y++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    const yearOpening = currentBalance;

    for (let m = 1; m <= 12; m++) {
      if (currentBalance <= 0) break;
      const monthInterest = currentBalance * monthlyRate;
      const monthPrincipal = Math.min(emi - monthInterest, currentBalance);

      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      currentBalance -= monthPrincipal;
    }

    schedule.push({
      year: y,
      openingBalance: Math.round(yearOpening),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalEmiPaid: Math.round(yearPrincipal + yearInterest),
      closingBalance: Math.max(0, Math.round(currentBalance))
    });
  }

  return schedule;
}
