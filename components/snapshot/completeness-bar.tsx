import React from "react";
import { Info } from "lucide-react";

interface CompletenessBarProps {
  knownCount: number;
  totalCount: number;
}

export const CompletenessBar: React.FC<CompletenessBarProps> = ({ knownCount, totalCount }) => {
  const percentage = Math.round((knownCount / totalCount) * 100);

  return (
    <div className="bg-[#16181D] border border-[#262930] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-semibold text-[#D97706] uppercase tracking-wider">
            Information Completeness
          </span>
          <div className="group relative cursor-pointer">
            <Info className="w-3.5 h-3.5 text-[#6B7280] hover:text-[#AAAAAA]" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-56 p-2 bg-[#22252D] border border-[#2B2F38] text-[11px] text-[#D1D5DB] rounded shadow-lg z-20">
              Tracks how many core property fields have available evidence. Not a quality or recommendation score.
            </div>
          </div>
        </div>
        <p className="text-xs text-[#8A8F9E]">
          <strong className="text-[#F0F2F5] font-mono">{knownCount}</strong> of <strong className="text-[#F0F2F5] font-mono">{totalCount}</strong> fields available from source / entry
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-48 shrink-0">
        <div className="flex-1 h-2 bg-[#121418] rounded-full overflow-hidden border border-[#23262D]">
          <div
            className="h-full bg-[#D97706] rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-mono font-medium text-[#8A8F9E] shrink-0">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
