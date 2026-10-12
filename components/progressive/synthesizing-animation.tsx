'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Check } from 'lucide-react';
import { PropertyDetails, BuyerContext } from '@/types';

interface SynthesizingAnimationProps {
  locality: string;
  property?: PropertyDetails;
  buyerContext?: BuyerContext;
  onComplete: () => void;
}

const AUDIT_STEPS = [
  'Calculating state stamp duty, registration, and society corpus',
  'Comparing quoted ₹/sq.ft against locality median closes',
  'Stress-testing EMI against a +1.25% floating rate increase',
  'Computing upfront non-loanable handover cash requirement',
];

export const SynthesizingAnimation: React.FC<SynthesizingAnimationProps> = ({
  locality,
  property,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const stepDuration = 420;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < AUDIT_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 280);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const targetName = property?.name || 'Property';
  const displayLocality = locality || property?.location || 'Locality';

  return (
    <div className="max-w-lg mx-auto py-16 px-4 space-y-6">
      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
          BUILDING FINANCIAL MODEL
        </p>
        <h2 className="font-serif text-[28px] text-[#fafafa] tracking-[-0.02em]">
          Auditing {targetName}
        </h2>
        <p className="text-[13px] text-[#a1a1a1]">{displayLocality}</p>
      </div>

      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 space-y-3.5">
        {AUDIT_STEPS.map((label, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-[13px] transition-opacity ${
                idx > currentStepIndex ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-[#96a766]" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#fafafa]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#666666]" />
                )}
              </div>
              <span className={isCurrent ? 'text-[#fafafa]' : 'text-[#a1a1a1]'}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
