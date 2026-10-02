import React from "react";
import { Info } from "lucide-react";

interface CompletenessBarProps {
  knownCount: number;
  totalCount: number;
}

export const CompletenessBar: React.FC<CompletenessBarProps> = ({ knownCount, totalCount }) => {
  const percentage = Math.round((knownCount / totalCount) * 100);

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-[#5B8BDF] uppercase tracking-wider">
            Information Completeness
          </span>
          <div className="group relative cursor-pointer">
            <Info className="w-3.5 h-3.5 text-[#666666] hover:text-[#AAAAAA]" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-56 p-2 bg-[#222222] border border-[#333333] text-[11px] text-[#CCCCCC] rounded shadow-lg z-20">
              Tracks how many core property fields have available evidence. Not a quality or recommendation score.
            </div>
          </div>
        </div>
        <p className="text-xs text-[#888888]">
          <strong className="text-[#EDEDED] font-mono">{knownCount}</strong> of <strong className="text-[#EDEDED] font-mono">{totalCount}</strong> fields available from source / entry
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-48 shrink-0">
        <div className="flex-1 h-2 bg-[#222222] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5B8BDF] rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-mono font-medium text-[#888888] shrink-0">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
