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
    <div className="bg-[#121212] border border-[#252525] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#202020] pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#5B8BDF]" />
          <h3 className="text-base font-semibold text-[#EDEDED]">Estimated Monthly Obligation</h3>
        </div>
        <StatusBadge status="estimated" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#181818] p-3.5 rounded-lg border border-[#262626] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">
            Existing EMIs
          </span>
          <p className="text-lg font-bold font-mono text-[#EDEDED]">
            ₹{existingObligations.toLocaleString("en-IN")}/mo
          </p>
          <span className="text-[11px] text-[#666666]">Declared obligations</span>
        </div>

        <div className="bg-[#181818] p-3.5 rounded-lg border border-[#262626] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B8BDF] block">
            Estimated New EMI
          </span>
          <p className="text-lg font-bold font-mono text-[#5B8BDF]">
            ~₹{estimatedNewEmi.toLocaleString("en-IN")}/mo
          </p>
          <span className="text-[11px] text-[#666666]">
            @ {interestRate}% for {tenureYears} yrs
          </span>
        </div>

        <div className="bg-[#181818] p-3.5 rounded-lg border border-[#262626] space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">
            Total Monthly Debt
          </span>
          <p className="text-lg font-bold font-mono text-[#EDEDED]">
            ~₹{totalMonthlyDebt.toLocaleString("en-IN")}/mo
          </p>
          <span className="text-[11px] text-[#888888]">
            {debtToIncomeRatio}% of take-home income
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-[#777777] bg-[#141414] p-3 rounded-lg border border-[#222222]">
        <Info className="w-3.5 h-3.5 text-[#555555] shrink-0" />
        <span>
          Estimates are based on standard benchmark interest rates ({interestRate}% p.a.). Actual EMI will depend on bank eligibility and loan sanction terms.
        </span>
      </div>
    </div>
  );
};
