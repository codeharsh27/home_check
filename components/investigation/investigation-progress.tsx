import React from "react";
import { ChecklistItem } from "@/types";

interface InvestigationProgressProps {
  checklist: ChecklistItem[];
}

export const InvestigationProgress: React.FC<InvestigationProgressProps> = ({ checklist }) => {
  const total = checklist.length;
  const verifiedCount = checklist.filter((i) => i.status === "verified" || i.received).length;
  const requestedCount = checklist.filter((i) => i.requested && !i.received).length;
  const missingCount = checklist.filter((i) => i.status === "missing" && !i.requested).length;
  const needsProCount = checklist.filter((i) => i.status === "needs-pro").length;
  const safeTotal = Math.max(total, 1);
  const progressPct = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 block mb-0.5">
            Due Diligence Status
          </span>
          <h3 className="text-base font-bold text-stone-900">
            {verifiedCount} of {total} checks completed
          </h3>
        </div>
        <span className="text-xs text-stone-500 font-medium">
          {progressPct}% completed
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${total > 0 ? (verifiedCount / safeTotal) * 100 : 0}%` }}
            title={`Verified/Received: ${verifiedCount}`}
          />
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${total > 0 ? (requestedCount / safeTotal) * 100 : 0}%` }}
            title={`Requested: ${requestedCount}`}
          />
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${total > 0 ? (needsProCount / safeTotal) * 100 : 0}%` }}
            title={`Needs Pro Review: ${needsProCount}`}
          />
          <div
            className="h-full bg-stone-200 transition-all duration-300"
            style={{ width: `${total > 0 ? (missingCount / safeTotal) * 100 : 0}%` }}
            title={`Missing: ${missingCount}`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 pt-1 gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            Received ({verifiedCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Requested ({requestedCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Needs Pro ({needsProCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            Missing ({missingCount})
          </span>
        </div>
      </div>
    </div>
  );
};
