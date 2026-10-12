'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

const earlyAccessFeatures = [
  'Portal URL parsing or manual property entry',
  'True acquisition cost & hidden charges breakdown',
  'Liquid cash shortfall / surplus calculator',
  'EMI affordability & +1.25% rate-hike stress test',
  'Same-locality alternative property suggestions',
  'State-specific checklists (MH, KA, TN, Delhi-NCR)',
  'Free builder checks vs. lawyer review separation',
  'Printable PDF decision report & site-visit checklist',
];

export const PricingMatrixSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleLoadSample = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered Section Header */}
        <div className="text-center mb-12 sm:mb-14 max-w-[560px] mx-auto">
          <h2 className="font-serif text-[34px] sm:text-[44px] font-normal tracking-[-0.02em] text-[#fafafa] leading-[1.12]">
            Open &amp; free during Early Access
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#a1a1a1] leading-[1.6]">
            We built HomeCheck to help Indian homebuyers make safer property decisions. Use the complete 5-step evaluation workspace for free — no subscription or credit card required.
          </p>
        </div>

        {/* Single Centered Early Access Card */}
        <div className="max-w-[580px] mx-auto">
          <div
            className="rounded-2xl p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            style={{
              background:
                'linear-gradient(180deg, #171717 35%, rgba(122, 98, 67, 0.48) 100%)',
              border: '1px solid rgba(189, 169, 109, 0.35)',
            }}
          >
            {/* Top Header Row */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[18px] font-medium text-[#fafafa]">
                      Early Access Workspace
                    </span>
                    <span className="w-6 h-6 rounded-lg bg-white/10 border border-white/15 inline-flex items-center justify-center text-[#bda96d]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Sage-Green Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/35 border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-[#96a766]" />
                    <span className="text-[11px] font-medium text-[#fafafa]">
                      100% Free · No Login Required to Start
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-left sm:text-right">
                  <div className="flex items-baseline sm:justify-end gap-1.5">
                    <span className="font-serif text-[44px] sm:text-[50px] text-[#fafafa] leading-none tracking-[-0.02em]">
                      ₹0
                    </span>
                    <span className="text-[13px] text-[#d4d4d4]">/ unlimited audits</span>
                  </div>
                  <p className="text-[12px] text-[#a1a1a1] mt-1">
                    Full 5-step workspace unlocked
                  </p>
                </div>
              </div>

              {/* Divider + 8 Real Product Capabilities */}
              <div className="border-t border-white/15 pt-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] mb-4">
                  WHAT YOU CAN DO RIGHT NOW IN YOUR AUDIT:
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {earlyAccessFeatures.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] text-[#fafafa] leading-[1.45]"
                    >
                      <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#fafafa]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col items-center gap-3">
              <a
                href="/dashboard?new=true"
                className="w-full py-3.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[14px] font-medium text-center transition-colors shadow-lg cursor-pointer"
              >
                Start Evaluating a Property — Free
              </a>

              <button
                type="button"
                onClick={handleLoadSample}
                className="inline-flex items-center gap-1.5 text-[12px] text-[#d4d4d4] hover:text-[#fafafa] transition-colors cursor-pointer pt-1"
              >
                <span>Or explore with our pre-loaded Wakad 2BHK sample</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
