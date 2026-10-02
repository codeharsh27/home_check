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
    <div className="bg-[#121212] border border-[#252525] rounded-xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#202020] pb-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Funding Plan & Gap Analysis
          </span>
          <h3 className="text-base font-semibold text-[#EDEDED] mt-0.5">
            Property Price: ₹{(propertyPrice / 100000).toFixed(2)}L
          </h3>
        </div>
        <StatusBadge status="estimated" />
      </div>

      {/* Visual Bar */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-[#222222] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#5B8BDF] transition-all duration-300"
            style={{ width: `${Math.min(100, (effectiveFunds / propertyPrice) * 100)}%` }}
            title={`Effective Funds: ₹${(effectiveFunds / 100000).toFixed(2)}L`}
          />
          <div
            className="h-full bg-[#3F9E6C] transition-all duration-300"
            style={{ width: `${Math.min(100 - (effectiveFunds / propertyPrice) * 100, (plannedLoan / propertyPrice) * 100)}%` }}
            title={`Planned Loan: ₹${(plannedLoan / 100000).toFixed(2)}L`}
          />
          {fundingGap > 0 && (
            <div
              className="h-full bg-[#D94F4F] transition-all duration-300"
              style={{ width: `${gapPercent}%` }}
              title={`Funding Gap: ₹${(fundingGap / 100000).toFixed(2)}L`}
            />
          )}
        </div>

        {/* Bar Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#888888] pt-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B8BDF]" />
              Direct Funds: <strong className="text-[#EDEDED] font-mono">₹{(effectiveFunds / 100000).toFixed(2)}L</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F9E6C]" />
              Planned Loan: <strong className="text-[#EDEDED] font-mono">₹{(plannedLoan / 100000).toFixed(2)}L</strong>
            </span>
          </div>
          {fundingGap > 0 && (
            <span className="flex items-center gap-1.5 font-semibold text-[#D94F4F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D94F4F]" />
              Funding Gap: <strong className="font-mono">₹{(fundingGap / 100000).toFixed(2)}L</strong>
            </span>
          )}
        </div>
      </div>

      {/* Neutral Outcome Callout */}
      {fundingGap > 0 ? (
        <div className="bg-[#D94F4F]/10 border border-[#D94F4F]/30 rounded-lg p-3.5 flex items-start gap-3 text-xs text-[#E58888]">
          <AlertTriangle className="w-4 h-4 text-[#D94F4F] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#EDEDED]">
              Estimated ₹{(fundingGap / 100000).toFixed(2)}L funding gap identified
            </p>
            <p className="mt-0.5 text-[#AAAAAA]">
              Based on the information provided, your current cash + loan plan leaves an estimated ₹{(fundingGap / 100000).toFixed(2)}L gap before transaction costs (stamp duty, registration).
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#3F9E6C]/10 border border-[#3F9E6C]/30 rounded-lg p-3.5 flex items-start gap-3 text-xs text-[#7BC59C]">
          <CheckCircle2 className="w-4 h-4 text-[#3F9E6C] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#EDEDED]">
              Current planned sources cover listed property price
            </p>
            <p className="mt-0.5 text-[#AAAAAA]">
              Your specified funds and home loan plan cover the listed ₹{(propertyPrice / 100000).toFixed(2)}L base price. Additional transaction costs still require verification.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
