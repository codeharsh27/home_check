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
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 block mb-0.5">
            Total Acquisition & Funding Gap
          </span>
          <h3 className="text-lg font-bold text-stone-900">
            Total Capital Outlay: {formatCurrency(totalOutlay)}
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Base Agreement: {formatCurrency(propertyPrice)} + ~7% Stamp Duty & Reg: {formatCurrency(estimatedStampDuty)}
          </p>
        </div>
        <StatusBadge status="estimated" />
      </div>

      {/* Visual Multi-Segment Bar */}
      <div className="space-y-2">
        <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${fundsPct}%` }}
            title={`Direct Funds (Net of Reserve): ${formatCurrency(effectiveFunds)}`}
          />
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${loanPct}%` }}
            title={`Planned Bank Loan: ${formatCurrency(plannedLoan)}`}
          />
          {fundingGap > 0 && (
            <div
              className="h-full bg-rose-500 transition-all duration-300"
              style={{ width: `${gapPct}%` }}
              title={`True Capital Shortfall: ${formatCurrency(fundingGap)}`}
            />
          )}
        </div>

        {/* Bar Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 pt-1 gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Down Payment: <strong className="text-stone-900 font-mono">{formatCurrency(effectiveFunds)}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Bank Loan: <strong className="text-stone-900 font-mono">{formatCurrency(plannedLoan)}</strong>
            </span>
          </div>
          {fundingGap > 0 ? (
            <span className="flex items-center gap-1.5 font-semibold text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Unfunded Shortfall: <strong className="font-mono">{formatCurrency(fundingGap)}</strong>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Capital Covered
            </span>
          )}
        </div>
      </div>

      {/* Itemized Reality Table */}
      <div className="p-4 bg-stone-50/80 border border-stone-200/80 rounded-xl space-y-2.5 text-xs">
        <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
          Transparent Capital Flow Summary
        </span>
        <div className="space-y-2 font-mono">
          <div className="flex justify-between text-stone-700">
            <span>1. Listed Agreement Price</span>
            <span className="font-semibold text-stone-900">{formatCurrency(propertyPrice)}</span>
          </div>
          <div className="flex justify-between text-amber-800">
            <span>2. Government Stamp Duty & Registration (~7%)</span>
            <span className="font-semibold">+ {formatCurrency(estimatedStampDuty)}</span>
          </div>
          <div className="flex justify-between text-stone-900 font-bold pt-2 border-t border-stone-200">
            <span>Total Capital Needed for Possession</span>
            <span className="text-blue-700 font-bold">{formatCurrency(totalOutlay)}</span>
          </div>
          <div className="flex justify-between text-stone-600 pt-1.5 border-t border-stone-200">
            <span>Less: Personal Savings (Net of {formatCurrency(emergencyReserve)} reserve)</span>
            <span className="text-stone-900 font-semibold">- {formatCurrency(effectiveFunds)}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Less: Bank Loan (Capped at 80% LTV Agreement Value)</span>
            <span className="text-stone-900 font-semibold">- {formatCurrency(plannedLoan)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-stone-300">
            <span className={fundingGap > 0 ? 'text-rose-700' : 'text-emerald-700'}>
              Net Funding Gap / Shortfall to Arrange
            </span>
            <span className={fundingGap > 0 ? 'text-rose-700' : 'text-emerald-700'}>
              {fundingGap > 0 ? formatCurrency(fundingGap) : '₹0 (Fully Covered)'}
            </span>
          </div>
        </div>
      </div>

      {/* Decision-Ready Outcome Callout */}
      {fundingGap > 0 ? (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-950">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-rose-900">
              Estimated {formatCurrency(fundingGap)} capital shortfall identified before booking
            </p>
            <p className="text-rose-800/90 leading-relaxed font-sans">
              <strong>Crucial Buyer Decision Factor:</strong> Under RBI guidelines, Indian banks only fund up to 80% of the base agreement value ({formatCurrency(plannedLoan)} max here). Banks <strong>do not finance government stamp duty and registration fees</strong> ({formatCurrency(estimatedStampDuty)}). You must arrange this additional {formatCurrency(fundingGap)} from personal reserves, family funds, or negotiate price before paying token money.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-950">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-emerald-900">
              Planned capital fully covers base price and transaction costs
            </p>
            <p className="text-emerald-800/90 leading-relaxed font-sans">
              Your committed personal funds ({formatCurrency(effectiveFunds)}) plus planned home loan ({formatCurrency(plannedLoan)}) safely cover the full {formatCurrency(totalOutlay)} acquisition outlay while safeguarding your {formatCurrency(emergencyReserve)} emergency reserve.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
