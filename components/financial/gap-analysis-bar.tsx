import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface GapAnalysisBarProps {
  propertyPrice: number;
  availableFunds: number;
  emergencyReserve: number;
  plannedLoan: number;
}

export const GapAnalysisBar: React.FC<GapAnalysisBarProps> = ({
  propertyPrice,
  availableFunds,
  emergencyReserve,
  plannedLoan,
}) => {
  const effectiveFunds = Math.max(0, availableFunds - emergencyReserve);
  const totalPlannedCoverage = effectiveFunds + plannedLoan;
  const fundingGap = Math.max(0, propertyPrice - totalPlannedCoverage);

  const coveragePercent = Math.min(100, Math.round((totalPlannedCoverage / propertyPrice) * 100));
  const gapPercent = 100 - coveragePercent;

  return (
    <div className="bg-[#16181D] border border-[#262930] rounded-lg p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23262D] pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8F9E]">
            Funding Plan & Gap Analysis
          </span>
          <h3 className="text-base font-semibold text-[#F0F2F5] mt-0.5">
            Property Price: ₹{(propertyPrice / 100000).toFixed(2)}L
          </h3>
        </div>
        <StatusBadge status="estimated" />
      </div>

      {/* Visual Bar */}
      <div className="space-y-2">
        <div className="w-full h-3 bg-[#121418] rounded-full overflow-hidden flex border border-[#23262D]">
          <div
            className="h-full bg-[#3B82F6] transition-all duration-300"
            style={{ width: `${Math.min(100, (effectiveFunds / propertyPrice) * 100)}%` }}
            title={`Effective Funds: ₹${(effectiveFunds / 100000).toFixed(2)}L`}
          />
          <div
            className="h-full bg-[#10B981] transition-all duration-300"
            style={{ width: `${Math.min(100 - (effectiveFunds / propertyPrice) * 100, (plannedLoan / propertyPrice) * 100)}%` }}
            title={`Planned Loan: ₹${(plannedLoan / 100000).toFixed(2)}L`}
          />
          {fundingGap > 0 && (
            <div
              className="h-full bg-[#EF4444] transition-all duration-300"
              style={{ width: `${gapPercent}%` }}
              title={`Funding Gap: ₹${(fundingGap / 100000).toFixed(2)}L`}
            />
          )}
        </div>

        {/* Bar Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#8A8F9E] pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              Direct Funds: <strong className="text-[#F0F2F5] font-mono">₹{(effectiveFunds / 100000).toFixed(2)}L</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              Planned Loan: <strong className="text-[#F0F2F5] font-mono">₹{(plannedLoan / 100000).toFixed(2)}L</strong>
            </span>
          </div>
          {fundingGap > 0 && (
            <span className="flex items-center gap-1.5 font-semibold text-[#EF4444]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              Funding Gap: <strong className="font-mono">₹{(fundingGap / 100000).toFixed(2)}L</strong>
            </span>
          )}
        </div>
      </div>

      {/* Outcome Callout */}
      {fundingGap > 0 ? (
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/25 rounded-lg p-3.5 flex items-start gap-3 text-xs text-[#F87171]">
          <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#F0F2F5]">
              Estimated ₹{(fundingGap / 100000).toFixed(2)}L funding gap identified
            </p>
            <p className="mt-0.5 text-[#D1D5DB]">
              Based on the information provided, your current cash + loan plan leaves an estimated ₹{(fundingGap / 100000).toFixed(2)}L gap before transaction costs (stamp duty, registration).
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#10B981]/10 border border-[#10B981]/25 rounded-lg p-3.5 flex items-start gap-3 text-xs text-[#34D399]">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#F0F2F5]">
              Current planned sources cover listed property price
            </p>
            <p className="mt-0.5 text-[#D1D5DB]">
              Your specified funds and home loan plan cover the listed ₹{(propertyPrice / 100000).toFixed(2)}L base price. Additional transaction costs still require verification.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
