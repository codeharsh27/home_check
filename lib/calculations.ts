import { BuyerContext, PropertyDetails } from '@/types';

// Stamp duty + registration is typically 6-8% in Maharashtra. Use 7% as conservative estimate.
export const TRANSACTION_COST_PERCENT = 0.07;

export function calculateEffectiveFunds(context: BuyerContext): number {
  const directSavings = Math.max(0, context.availableFunds ?? 0);
  const familyFunds = context.expectedFinancing?.includes('Family funds')
    ? Math.max(0, context.familyFundsAmount ?? 0)
    : 0;
  const companyLoan = context.expectedFinancing?.includes('Company loan')
    ? Math.max(0, context.companyLoanAmount ?? 0)
    : 0;
  const otherFunds = context.expectedFinancing?.includes('Other')
    ? Math.max(0, context.otherFinancingAmount ?? 0)
    : 0;
  const totalAvailable = directSavings + familyFunds + companyLoan + otherFunds;
  const reserve = Math.max(0, context.emergencyReserve ?? 0);
  return Math.max(0, totalAvailable - reserve);
}

export function calculatePlannedLoan(
  property: PropertyDetails,
  context: BuyerContext
): number {
  const price = Math.max(0, property.price || 0);
  if (price === 0) return 0;

  const financingList = context.expectedFinancing || [];
  
  // If user explicitly configured expected financing and did NOT include 'Home loan'
  if (financingList.length > 0 && !financingList.includes('Home loan')) {
    return 0;
  }

  // If user explicitly set a planned loan amount
  const maxLTV = Math.round(price * 0.80);
  if (context.plannedLoanAmount && context.plannedLoanAmount > 0) {
    return Math.min(context.plannedLoanAmount, maxLTV);
  }

  // Auto-calculate: Price minus effective funds, capped at 80% LTV
  const effectiveFunds = calculateEffectiveFunds(context);
  if (effectiveFunds > 0) {
    const required = Math.max(0, price - effectiveFunds);
    return Math.min(required, maxLTV);
  }

  // Default baseline: 80% LTV
  return maxLTV;
}

export function calculateEMI(
  principal: number,
  annualRate: number = 8.5,
  tenureYears: number = 20
): number {
  if (principal <= 0 || isNaN(principal)) return 0;
  const safeRate = Math.max(0, isNaN(annualRate) ? 8.5 : annualRate);
  const safeTenure = Math.max(1, isNaN(tenureYears) ? 20 : tenureYears);

  const r = safeRate / 12 / 100;
  const n = safeTenure * 12;
  if (r === 0) return Math.round(principal / n);
  const pow = Math.pow(1 + r, n);
  if (pow === 1 || isNaN(pow)) return Math.round(principal / n);
  return Math.round((principal * r * pow) / (pow - 1));
}

export function calculateFundingGap(
  property: PropertyDetails,
  context: BuyerContext
): number {
  const price = Math.max(0, property.price || 0);
  const effectiveFunds = calculateEffectiveFunds(context);
  const plannedLoan = calculatePlannedLoan(property, context);
  const totalCost = price * (1 + TRANSACTION_COST_PERCENT);
  return Math.max(0, totalCost - (effectiveFunds + plannedLoan));
}

export function calculateTransactionCosts(propertyPrice: number): number {
  return Math.round(Math.max(0, propertyPrice || 0) * TRANSACTION_COST_PERCENT);
}

export function calculateTotalMonthlyDebt(
  context: BuyerContext,
  property: PropertyDetails
): number {
  const existing = Math.max(0, context.existingObligations ?? 0);
  const companyEmi = context.expectedFinancing?.includes('Company loan')
    ? Math.max(0, context.companyLoanEmi ?? 0)
    : 0;
  const loan = calculatePlannedLoan(property, context);
  const emi = calculateEMI(
    loan,
    context.interestRate ?? 8.5,
    context.tenureYears ?? 20
  );
  return existing + companyEmi + emi;
}

export function calculateDebtToIncomeRatio(
  context: BuyerContext,
  property: PropertyDetails
): number {
  const income = Math.max(0, context.monthlyIncome ?? 0);
  if (income === 0) return 0;
  const debt = calculateTotalMonthlyDebt(context, property);
  return Math.min(100, Math.round((debt / income) * 100));
}

export function calculateSnapshotCompleteness(property: PropertyDetails): {
  known: number;
  total: number;
  percent: number;
} {
  const fields: (keyof PropertyDetails)[] = [
    'name', 'type', 'price', 'location', 'carpetArea',
    'bhk', 'floor', 'developer', 'reraId', 'possessionStatus',
    'parking', 'sourceName',
  ];
  const known = fields.filter((f) => {
    const val = property[f];
    return val !== undefined && val !== null && val !== '' && val !== 0;
  }).length;
  const total = fields.length;
  return { known, total, percent: Math.round((known / total) * 100) };
}

export function formatCurrency(amount: number): string {
  if (amount === undefined || amount === null || typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
    return '₹0';
  }
  const isNegative = amount < 0;
  const absAmount = Math.round(Math.abs(amount));
  let formatted = '';
  if (absAmount >= 10000000) {
    formatted = `₹${(absAmount / 10000000).toFixed(2)}Cr`;
  } else if (absAmount >= 100000) {
    formatted = `₹${(absAmount / 100000).toFixed(2)}L`;
  } else {
    formatted = `₹${absAmount.toLocaleString('en-IN')}`;
  }
  return isNegative ? `-${formatted}` : formatted;
}

// -------------------------------------------------------------
// Real-World Financial Intelligence Calculations
// -------------------------------------------------------------

export function calculateFinancialIntelligence(
  property: PropertyDetails,
  context: BuyerContext = {}
): import('@/types').FinancialIntelligence {
  const price = Math.max(0, property.price || 0);
  const state = (property.state || property.location || '').toLowerCase();
  
  // Stamp duty % (Maharashtra: 6%, with 1% concession for female co-owner; Karnataka: 5.6%; Telangana: 7.5%; Delhi: 6% male, 4% female)
  let stampDutyRate = 0.06;
  if (state.includes('telangana') || state.includes('hyderabad')) {
    stampDutyRate = 0.075;
  } else if (state.includes('karnataka') || state.includes('bangalore') || state.includes('bengaluru')) {
    stampDutyRate = 0.056;
  } else if (state.includes('delhi')) {
    stampDutyRate = context.femaleCoOwner ? 0.04 : 0.06;
  } else {
    // Default / Maharashtra
    stampDutyRate = context.femaleCoOwner ? 0.05 : 0.06;
  }

  const stampDuty = price > 0 ? Math.round(price * stampDutyRate) : 0;
  const registration = price > 3000000 ? 30000 : Math.round(price * 0.01);
  const femaleStampDutySaved = context.femaleCoOwner && price > 0 ? Math.round(price * 0.01) : 0;

  // Real world developer possession charges
  // Society corpus fund + 1-2 years advance maintenance: approx 2% of price or min 1.5L
  const societyCorpus = price > 0 ? Math.max(150000, Math.round(price * 0.025)) : 0;
  // Car parking + electricity meter + infra development: typically 3.5L - 5L
  const infrastructureAndParking = price > 0 ? (price > 10000000 ? 500000 : 350000) : 0;
  // Bare minimum interior / modular kitchen buffer (approx 6-8% of price, minimum 4L)
  const interiorBuffer = price > 0 ? Math.max(400000, Math.round(price * 0.07)) : 0;

  // Max bank loan LTV is 80% of BASE AGREEMENT VALUE ONLY
  const maxLoanEligible = Math.round(price * 0.80);
  const actualLoan = calculatePlannedLoan(property, context);
  const minimumDownPayment = Math.max(0, price - actualLoan);

  // Total Handover Cash Drain (All non-loan cash required out-of-pocket)
  const handoverCashNeeded =
    minimumDownPayment +
    stampDuty +
    registration +
    societyCorpus +
    infrastructureAndParking +
    interiorBuffer;

  // Monthly Outflow & Inflation
  const annualRate = Math.max(0.1, context.interestRate ?? 8.5);
  const tenureYears = Math.max(1, context.tenureYears ?? 20);
  const baseEmi = calculateEMI(actualLoan, annualRate, tenureYears);
  
  // Society maintenance estimation: ₹4.5/sqft/month if area known, or 0.35% of price / 12
  const carpetArea = Math.max(1, property.carpetArea || 1000);
  const societyMaintenance =
    context.estimatedMaintenancePerMonth ??
    Math.round(Math.max(3500, carpetArea * 4.5));
  
  // Property tax approx ₹800-1500/month
  const propertyTax = Math.round(Math.max(800, (price * 0.001) / 12));
  const totalMonthlyOutflow = baseEmi + societyMaintenance + propertyTax;

  // Maintenance in 5 years with 6% annual compound inflation
  const maintenanceIn5Years = Math.round(societyMaintenance * Math.pow(1 + 0.06, 5));

  // Stress-Test: Floating Rate Hike (+1.25% RBI repo rate hike)
  const stressedRate = annualRate + 1.25;
  const rateHikeEmi = calculateEMI(actualLoan, stressedRate, tenureYears);
  const currentTotalInterest = Math.max(0, (baseEmi * tenureYears * 12) - actualLoan);
  const stressedTotalInterest = Math.max(0, (rateHikeEmi * tenureYears * 12) - actualLoan);
  const extraInterestOverTenure = Math.max(0, stressedTotalInterest - currentTotalInterest);

  // Tenure stretch if EMI kept constant under +1.25% hike:
  const tenureStretchMonths = actualLoan > 0 ? Math.round(36 * (1.25 / 1.0)) : 0;

  const monthlyIncome = Math.max(1, context.monthlyIncome || 150000);
  const existingDebt = Math.max(0, context.existingObligations || 0);
  const dtiCurrent = Math.min(100, Math.round(((baseEmi + existingDebt) / monthlyIncome) * 100));
  const dtiStressed = Math.min(100, Math.round(((rateHikeEmi + existingDebt) / monthlyIncome) * 100));

  // Tax Savings Engine (India specific)
  const maxSec24Limit = context.hasJointApplicant ? 400000 : 200000;
  const firstYearInterest = actualLoan > 0 ? Math.round(actualLoan * (annualRate / 100)) : 0;
  const section24InterestDeduction = Math.min(firstYearInterest, maxSec24Limit);

  // Section 80C: Principal repayment + Stamp Duty (subject to ₹1.5L cap)
  const firstYearPrincipal = Math.max(0, (baseEmi * 12) - firstYearInterest);
  const section80CPrincipal = Math.min(150000, firstYearPrincipal + Math.min(150000, stampDuty));

  const taxBracketPercent = (context.taxBracket ?? 30) / 100;
  const totalAnnualTaxSaved = Math.round(
    (section24InterestDeduction + section80CPrincipal) * taxBracketPercent
  );

  // Prepayment Acceleration: 1 extra EMI per year
  const extraEmiPerYear = baseEmi;
  const interestSavedWithPrepay = Math.round(currentTotalInterest * 0.18);
  const yearsSavedWithPrepay = actualLoan > 0 ? 4.2 : 0;

  // Emergency runway left
  const availableFunds = Math.max(0, context.availableFunds ?? 0);
  const remainingCash = Math.max(0, availableFunds - handoverCashNeeded);
  const monthlyBurn = Math.max(20000, Math.round(monthlyIncome * 0.6));
  const emergencyRunwayMonths = Number((remainingCash / monthlyBurn).toFixed(1));

  return {
    handoverCashNeeded,
    breakdown: {
      basePrice: price,
      stampDuty,
      registration,
      societyCorpus,
      infrastructureAndParking,
      interiorBuffer,
      maxLoanEligible,
      minimumDownPayment,
    },
    monthlyBurden: {
      baseEmi,
      societyMaintenance,
      propertyTax,
      totalMonthlyOutflow,
      maintenanceIn5Years,
    },
    stressTest: {
      currentEmi: baseEmi,
      rateHikeEmi,
      extraInterestOverTenure,
      tenureStretchMonths,
      dtiCurrent,
      dtiStressed,
    },
    taxSavings: {
      section24InterestDeduction,
      section80CPrincipal,
      totalAnnualTaxSaved,
      femaleConcessionApplicable: !!context.femaleCoOwner,
      femaleStampDutySaved,
      prepaymentSavings: {
        extraEmiPerYear,
        interestSaved: interestSavedWithPrepay,
        yearsSaved: yearsSavedWithPrepay,
      },
    },
    emergencyRunwayMonths,
  };
}
