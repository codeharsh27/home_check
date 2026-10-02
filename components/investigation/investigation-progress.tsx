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

  return (
    <div className="bg-[#16181D] border border-[#262930] rounded-lg p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#23262D] pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D97706]">
            Due Diligence Status Tracker
          </span>
          <h3 className="text-base font-semibold text-[#F0F2F5] mt-0.5">
            {verifiedCount} of {total} verification items completed
          </h3>
        </div>
        <span className="text-xs font-mono text-[#8A8F9E]">
          {Math.round((verifiedCount / total) * 100)}% overall progress
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-2.5 bg-[#121418] rounded-full overflow-hidden flex border border-[#23262D]">
          <div
            className="h-full bg-[#10B981] transition-all duration-300"
            style={{ width: `${(verifiedCount / total) * 100}%` }}
            title={`Verified/Received: ${verifiedCount}`}
          />
          <div
            className="h-full bg-[#3B82F6] transition-all duration-300"
            style={{ width: `${(requestedCount / total) * 100}%` }}
            title={`Requested: ${requestedCount}`}
          />
          <div
            className="h-full bg-[#F97316] transition-all duration-300"
            style={{ width: `${(needsProCount / total) * 100}%` }}
            title={`Needs Pro Review: ${needsProCount}`}
          />
          <div
            className="h-full bg-[#2B2F38] transition-all duration-300"
            style={{ width: `${(missingCount / total) * 100}%` }}
            title={`Missing: ${missingCount}`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#8A8F9E] pt-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            Received ({verifiedCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            Requested ({requestedCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
            Needs Pro ({needsProCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B2F38]" />
            Missing ({missingCount})
          </span>
        </div>
      </div>
    </div>
  );
};
