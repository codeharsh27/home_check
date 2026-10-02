import React from "react";
import { Calculator, Info } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface MonthlyObligationCardProps {
  monthlyIncome: number;
  existingObligations: number;
  plannedLoanAmount: number;
  interestRate?: number;
  tenureYears?: number;
}

export const MonthlyObligationCard: React.FC<MonthlyObligationCardProps> = ({
  monthlyIncome,
  existingObligations,
  plannedLoanAmount,
  interestRate = 8.5,
  tenureYears = 20,
}) => {
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;
  const estimatedNewEmi =
    plannedLoanAmount > 0
      ? Math.round((plannedLoanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
      : 0;

  const totalMonthlyDebt = existingObligations + estimatedNewEmi;
  const debtToIncomeRatio = monthlyIncome > 0 ? Math.round((totalMonthlyDebt / monthlyIncome) * 100) : 0;

  return (
    <div className="bg-[#16181D] border border-[#262930] rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#23262D] pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#D97706]" />
          <h3 className="text-base font-semibold text-[#F0F2F5]">Estimated Monthly Obligation</h3>
        </div>
        <StatusBadge status="estimated" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#121418] p-3.5 rounded border border-[#262930] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E] block">
            Existing EMIs
          </span>
          <p className="text-lg font-bold font-mono text-[#F0F2F5]">
            ₹{existingObligations.toLocaleString("en-IN")}/mo
          </p>
          <span className="text-[11px] text-[#6B7280]">Declared obligations</span>
        </div>

        <div className="bg-[#121418] p-3.5 rounded border border-[#262930] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D97706] block">
            Estimated New EMI
          </span>
          <p className="text-lg font-bold font-mono text-[#D97706]">
            ~₹{estimatedNewEmi.toLocaleString("en-IN")}/mo
          </p>
          <span className="text-[11px] text-[#6B7280]">
            @ {interestRate}% for {tenureYears} yrs
          </span>
        </div>

        <div className="bg-[#121418] p-3.5 rounded border border-[#262930] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E] block">
            Total Monthly Debt
          </span>
          <p className="text-lg font-bold font-mono text-[#F0F2F5]">
            ~₹{totalMonthlyDebt.toLocaleString("en-IN")}/mo
          </p>
          <span className="text-[11px] text-[#8A8F9E]">
            {debtToIncomeRatio}% of take-home income
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-[#8A8F9E] bg-[#121418] p-3 rounded border border-[#23262D]">
        <Info className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
        <span>
          Estimates are based on standard benchmark interest rates ({interestRate}% p.a.). Actual EMI will depend on bank eligibility and loan sanction terms.
        </span>
      </div>
    </div>
  );
};
