import { BuyerContext, PropertyDetails } from '@/types';

// Stamp duty + registration is typically 6-8% in Maharashtra. Use 7% as conservative estimate.
export const TRANSACTION_COST_PERCENT = 0.07;

export function calculateEffectiveFunds(context: BuyerContext): number {
  const available = context.availableFunds ?? 0;
  const reserve = context.emergencyReserve ?? 0;
  return Math.max(0, available - reserve);
}

export function calculatePlannedLoan(
  property: PropertyDetails,
  context: BuyerContext
): number {
  const usesHomeLoan = context.expectedFinancing?.includes('Home loan') ?? false;
  if (!usesHomeLoan) return 0;

  // If user explicitly set a loan amount, use it
  if (context.plannedLoanAmount && context.plannedLoanAmount > 0) {
    return context.plannedLoanAmount;
  }

  // Auto-calculate: Price minus effective funds, capped at 80% LTV
  const effectiveFunds = calculateEffectiveFunds(context);
  const required = property.price - effectiveFunds;
  const maxLTV = property.price * 0.80;
  return Math.max(0, Math.min(required, maxLTV));
}

export function calculateEMI(
  principal: number,
  annualRate: number = 8.5,
  tenureYears: number = 20
): number {
  if (principal <= 0) return 0;
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return Math.round(principal / n);
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

export function calculateFundingGap(
  property: PropertyDetails,
  context: BuyerContext
): number {
  const effectiveFunds = calculateEffectiveFunds(context);
  const plannedLoan = calculatePlannedLoan(property, context);
  const totalCost = property.price * (1 + TRANSACTION_COST_PERCENT); // include transaction costs
  return Math.max(0, totalCost - (effectiveFunds + plannedLoan));
}

export function calculateTransactionCosts(propertyPrice: number): number {
  return Math.round(propertyPrice * TRANSACTION_COST_PERCENT);
}

export function calculateTotalMonthlyDebt(
  context: BuyerContext,
  property: PropertyDetails
): number {
  const existing = context.existingObligations ?? 0;
  const loan = calculatePlannedLoan(property, context);
  const emi = calculateEMI(
    loan,
    context.interestRate ?? 8.5,
    context.tenureYears ?? 20
  );
  return existing + emi;
}

export function calculateDebtToIncomeRatio(
  context: BuyerContext,
  property: PropertyDetails
): number {
  const income = context.monthlyIncome ?? 0;
  if (income === 0) return 0;
  const debt = calculateTotalMonthlyDebt(context, property);
  return Math.round((debt / income) * 100);
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
  if (amount === undefined || amount === null || typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
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
