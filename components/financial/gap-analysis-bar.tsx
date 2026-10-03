import React from "react";
import { AlertTriangle, CheckCircle2, Info, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";
import { formatCurrency, TRANSACTION_COST_PERCENT } from "@/lib/calculations";

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
  const estimatedStampDuty = Math.round(propertyPrice * TRANSACTION_COST_PERCENT);
  const totalOutlay = propertyPrice + estimatedStampDuty;
  const totalPlannedCoverage = effectiveFunds + plannedLoan;
  const fundingGap = Math.max(0, totalOutlay - totalPlannedCoverage);

  const safeTotalOutlay = Math.max(totalOutlay, 1);
  const fundsPct = Math.min(100, Math.round((effectiveFunds / safeTotalOutlay) * 100));
  const loanPct = Math.min(100 - fundsPct, Math.round((plannedLoan / safeTotalOutlay) * 100));
  const gapPct = Math.max(0, 100 - (fundsPct + loanPct));

  return (
    <div className="bg-[#121212] border border-[#252525] rounded-xl p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#202020] pb-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#5B8BDF]">
            Total Acquisition & Funding Gap Breakdown
          </span>
          <h3 className="text-base font-semibold text-[#EDEDED] mt-0.5">
            Total Capital Outlay: {formatCurrency(totalOutlay)}
          </h3>
          <p className="text-xs text-[#777777]">
            Base Agreement: {formatCurrency(propertyPrice)} + ~7% Stamp Duty & Reg: {formatCurrency(estimatedStampDuty)}
          </p>
        </div>
        <StatusBadge status="estimated" />
      </div>

      {/* Visual Multi-Segment Bar */}
      <div className="space-y-2">
        <div className="w-full h-4 bg-[#222222] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#5B8BDF] transition-all duration-300"
            style={{ width: `${fundsPct}%` }}
            title={`Direct Funds (Net of Reserve): ${formatCurrency(effectiveFunds)}`}
          />
          <div
            className="h-full bg-[#3F9E6C] transition-all duration-300"
            style={{ width: `${loanPct}%` }}
            title={`Planned Bank Loan: ${formatCurrency(plannedLoan)}`}
          />
          {fundingGap > 0 && (
            <div
              className="h-full bg-[#D94F4F] transition-all duration-300"
              style={{ width: `${gapPct}%` }}
              title={`True Capital Shortfall: ${formatCurrency(fundingGap)}`}
            />
          )}
        </div>

        {/* Bar Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#888888] pt-1">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B8BDF]" />
              Down Payment: <strong className="text-[#EDEDED] font-mono">{formatCurrency(effectiveFunds)}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F9E6C]" />
              Bank Loan: <strong className="text-[#EDEDED] font-mono">{formatCurrency(plannedLoan)}</strong>
            </span>
          </div>
          {fundingGap > 0 ? (
            <span className="flex items-center gap-1.5 font-semibold text-[#D94F4F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D94F4F]" />
              Unfunded Shortfall: <strong className="font-mono">{formatCurrency(fundingGap)}</strong>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-semibold text-[#3F9E6C]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Capital Covered
            </span>
          )}
        </div>
      </div>

      {/* Itemized Reality Table */}
      <div className="p-3.5 bg-[#0F0F0F] border border-[#222222] rounded-xl space-y-2 text-xs">
        <span className="text-[10px] uppercase font-mono tracking-wider text-[#888888] font-semibold block">
          Transparent Capital Flow Summary
        </span>
        <div className="space-y-1.5 font-mono">
          <div className="flex justify-between text-[#CCCCCC]">
            <span>1. Listed Agreement Price</span>
            <span>{formatCurrency(propertyPrice)}</span>
          </div>
          <div className="flex justify-between text-[#D4A017]">
            <span>2. Government Stamp Duty & Registration (~7%)</span>
            <span>+ {formatCurrency(estimatedStampDuty)}</span>
          </div>
          <div className="flex justify-between text-white font-semibold pt-1 border-t border-[#1C1C1C]">
            <span>Total Capital Needed to Take Possession</span>
            <span className="text-[#5B8BDF]">{formatCurrency(totalOutlay)}</span>
          </div>
          <div className="flex justify-between text-[#888888] pt-1 border-t border-[#1C1C1C]">
            <span>Less: Personal Savings Committed (Net of {formatCurrency(emergencyReserve)} reserve)</span>
            <span className="text-[#EDEDED]">- {formatCurrency(effectiveFunds)}</span>
          </div>
          <div className="flex justify-between text-[#888888]">
            <span>Less: Bank Home Loan (Capped at 80% LTV Agreement Value)</span>
            <span className="text-[#EDEDED]">- {formatCurrency(plannedLoan)}</span>
          </div>
          <div className="flex justify-between font-bold pt-1.5 border-t border-[#262626]">
            <span className={fundingGap > 0 ? 'text-[#D94F4F]' : 'text-[#3F9E6C]'}>
              Net Funding Gap / Shortfall to Arrange
            </span>
            <span className={fundingGap > 0 ? 'text-[#D94F4F]' : 'text-[#3F9E6C]'}>
              {fundingGap > 0 ? formatCurrency(fundingGap) : '₹0 (Fully Covered)'}
            </span>
          </div>
        </div>
      </div>

      {/* Decision-Ready Outcome Callout */}
      {fundingGap > 0 ? (
        <div className="bg-[#D94F4F]/10 border border-[#D94F4F]/30 rounded-lg p-3.5 flex items-start gap-3 text-xs text-[#E58888]">
          <AlertTriangle className="w-4 h-4 text-[#D94F4F] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-[#EDEDED]">
              Estimated {formatCurrency(fundingGap)} capital shortfall identified before booking
            </p>
            <p className="text-[#AAAAAA] leading-relaxed">
              <strong>Crucial Buyer Decision Factor:</strong> Under RBI guidelines, Indian banks only fund up to 80% of the base agreement value ({formatCurrency(plannedLoan)} max here). Banks <strong>do not finance government stamp duty and registration fees</strong> ({formatCurrency(estimatedStampDuty)}). You must arrange this additional {formatCurrency(fundingGap)} from personal reserves, family funds, or negotiate price before paying token money.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#3F9E6C]/10 border border-[#3F9E6C]/30 rounded-lg p-3.5 flex items-start gap-3 text-xs text-[#7BC59C]">
          <CheckCircle2 className="w-4 h-4 text-[#3F9E6C] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-[#EDEDED]">
              Planned capital fully covers base price and transaction costs
            </p>
            <p className="text-[#AAAAAA] leading-relaxed">
              Your committed personal funds ({formatCurrency(effectiveFunds)}) plus planned home loan ({formatCurrency(plannedLoan)}) safely cover the full {formatCurrency(totalOutlay)} acquisition outlay while safeguarding your {formatCurrency(emergencyReserve)} emergency reserve.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
