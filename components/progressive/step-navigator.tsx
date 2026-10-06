'use client';

import React from 'react';
import { Check, ArrowRight, Shield, TrendingUp, Compass, FileCheck, Layers } from 'lucide-react';

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
    {
      num: 1,
      name: 'Intake & Scan',
      desc: 'Property data',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      num: 2,
      name: 'Intent & Wallet',
      desc: 'Budget & goals',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      num: 3,
      name: 'Market Reality',
      desc: 'Price, alternatives, true cost',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      num: 4,
      name: 'Investigation',
      desc: 'RERA & legal gates',
      icon: <Shield className="w-4 h-4" />,
    },
    {
      num: 5,
      name: 'Decision Report',
      desc: 'Brief & negotiation',
      icon: <FileCheck className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full bg-white border-b border-stone-200/80 px-3 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Mobile-only Progress Indicator Banner */}
      <div className="sm:hidden flex items-center justify-between pb-2 mb-1.5 border-b border-stone-100 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-stone-900">
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px]">
            {currentStep}
          </span>
          <span className="truncate max-w-[200px]">{steps[currentStep - 1]?.name}</span>
        </div>
        <span className="text-[11px] text-stone-400 font-medium">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-1.5 sm:gap-4 py-0.5">
        {steps.map((s, idx) => {
          const isActive = currentStep === s.num;
          const isDone = completedSteps.includes(s.num) || currentStep > s.num;

          return (
            <React.Fragment key={s.num}>
              <button
                onClick={() => onSelectStep(s.num)}
                className={`group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-left transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-500/20 shadow-xs'
                    : isDone
                    ? 'text-stone-700 hover:bg-stone-50'
                    : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50/50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'
                  }`}
                >
                  {isDone && !isActive ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </div>
                {/* On mobile: show text for active step or on tablet/desktop: show all */}
                <div className={`${isActive ? 'block' : 'hidden'} sm:block`}>
                  <div className="text-xs font-medium leading-tight flex items-center gap-1.5">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-stone-600 font-normal truncate max-w-[110px] hidden sm:block">
                    {s.desc}
                  </div>
                </div>
              </button>

              {idx < steps.length - 1 && (
                <div className="hidden md:flex items-center text-stone-300 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
