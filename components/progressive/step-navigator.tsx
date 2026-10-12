'use client';

import React from 'react';

interface StepNavigatorProps {
  currentStep: number;
  totalSteps?: number;
  onSelectStep: (step: number) => void;
  completedSteps?: number[];
}

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep,
  totalSteps = 5,
  onSelectStep,
  completedSteps = [],
}) => {
  const steps = [
    { num: 1, code: '01', name: 'Baseline' },
    { num: 2, code: '02', name: 'Intent & Wallet' },
    { num: 3, code: '03', name: 'True Cost & Stress' },
    { num: 4, code: '04', name: 'Legal & RERA' },
    { num: 5, code: '05', name: 'Decision Dossier' },
  ];

  return (
    <div className="w-full bg-[#0a0a0a] border-b border-[#ffffff14] px-4 sm:px-6 py-3 sticky top-0 z-30 print:hidden">
      <div className="max-w-[1136px] mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isDone = completedSteps.includes(s.num) || currentStep > s.num;

          return (
            <button
              key={s.num}
              onClick={() => onSelectStep(s.num)}
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-[12px] transition-colors shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#fafafa] text-[#0a0a0a] font-medium'
                  : isDone
                  ? 'bg-[#141414] text-[#e5e5e5] border border-[#ffffff14] hover:border-[#ffffff28]'
                  : 'text-[#666666] hover:text-[#a1a1a1]'
              }`}
            >
              <span
                className={`font-mono text-[11px] ${
                  isActive
                    ? 'text-[#0a0a0a]'
                    : isDone
                    ? 'text-[#96a766]'
                    : 'text-[#666666]'
                }`}
              >
                {s.code}
              </span>
              <span>{s.name}</span>
            </button>
          );
        })}

        <span className="hidden lg:inline-block text-[11px] font-mono uppercase tracking-wider text-[#666666]">
          STEP 0{currentStep} OF 0{totalSteps}
        </span>
      </div>
    </div>
  );
};
