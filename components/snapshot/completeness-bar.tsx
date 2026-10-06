import React from "react";
import { Info } from "lucide-react";

interface CompletenessBarProps {
  knownCount: number;
  totalCount: number;
}

export const CompletenessBar: React.FC<CompletenessBarProps> = ({ knownCount, totalCount }) => {
  const missingCount = Math.max(0, totalCount - knownCount);

  return (
    <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5">
        <div className={`w-2 h-2 rounded-full shrink-0 ${missingCount === 0 ? 'bg-emerald-500' : 'bg-blue-600'}`} />
        <p className="text-stone-700">
          {missingCount === 0 ? (
            <span className="font-medium text-stone-900">All core property details are filled in.</span>
          ) : (
            <span>
              <strong className="font-semibold text-stone-900">{missingCount} detail{missingCount > 1 ? 's' : ''}</strong> still need your input. You can edit them below or add them when needed.
            </span>
          )}
        </p>
      </div>

      <div className="text-stone-400 font-mono text-[11px] self-end sm:self-auto shrink-0">
        {knownCount}/{totalCount} details confirmed
      </div>
    </div>
  );
};
