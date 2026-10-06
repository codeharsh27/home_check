import React from "react";
import { Calculator, Info } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface MonthlyObligationCardProps {
  monthlyIncome: number;
  existingObligations: number;
  plannedLoanAmount: number;
  interestRate?: number; // default 8.5%
  tenureYears?: number; // default 20 yrs
}

export const MonthlyObligationCard: React.FC<MonthlyObligationCardProps> = ({
  monthlyIncome,
  existingObligations,
  plannedLoanAmount,
  interestRate = 8.5,
  tenureYears = 20,
}) => {
  // Standard EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  const estimatedNewEmi =
    plannedLoanAmount > 0
      ? Math.round((plannedLoanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
      : 0;

  const totalMonthlyDebt = existingObligations + estimatedNewEmi;
  const debtToIncomeRatio = monthlyIncome > 0 ? Math.round((totalMonthlyDebt / monthlyIncome) * 100) : 0;

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-blue-600" />
          <h3 className="text-base font-semibold text-stone-900">Estimated Monthly Obligation</h3>
        </div>
        <StatusBadge status="estimated" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80 space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
            Existing EMIs
          </span>
          <p className="text-lg font-bold text-stone-900">
            ₹{existingObligations.toLocaleString("en-IN")}<span className="text-xs font-normal text-stone-500">/mo</span>
          </p>
          <span className="text-xs text-stone-500">Declared obligations</span>
        </div>

        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-blue-700 font-semibold block">
            Estimated New EMI
          </span>
          <p className="text-lg font-bold text-blue-900">
            ~₹{estimatedNewEmi.toLocaleString("en-IN")}<span className="text-xs font-normal text-blue-600">/mo</span>
          </p>
          <span className="text-xs text-blue-600/80">
            @ {interestRate}% for {tenureYears} yrs
          </span>
        </div>

        <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80 space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
            Total Monthly Debt
          </span>
          <p className="text-lg font-bold text-stone-900">
            ~₹{totalMonthlyDebt.toLocaleString("en-IN")}<span className="text-xs font-normal text-stone-500">/mo</span>
          </p>
          <span className={`text-xs font-semibold ${debtToIncomeRatio > 50 ? 'text-amber-700' : 'text-emerald-700'}`}>
            {debtToIncomeRatio}% FOIR / DTI ratio
          </span>
        </div>
      </div>

      {/* Lender FOIR Risk Guidance */}
      {monthlyIncome > 0 && (
        <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 ${
          debtToIncomeRatio > 50
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            {debtToIncomeRatio > 50 ? (
              <span>
                <strong className="text-amber-900">High Obligation Notice:</strong> At {debtToIncomeRatio}% of take-home income, your total monthly debt exceeds the standard 45–50% lender threshold (FOIR). Most banks (SBI, HDFC, ICICI) may reduce your loan sanction or ask for a co-applicant.
              </span>
            ) : (
              <span>
                <strong className="text-emerald-900">Comfortable Loan Eligibility:</strong> Your total monthly debt is within the recommended 50% FOIR threshold, qualifying for standard bank home loan processing.
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200/70">
        <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span>
          Estimates are based on benchmark interest rates ({interestRate}% p.a.). Actual EMI depends on the bank's final sanction and your credit profile.
        </span>
      </div>
    </div>
  );
};
