'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const DarkCTABannerSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section className="pt-20 sm:pt-28 pb-16 bg-[#0a0a0a] border-t border-[#ffffff14] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        {/* Centered Heading in Hedvig Letters Serif */}
        <h2 className="font-serif text-[34px] sm:text-[46px] font-normal tracking-[-0.02em] text-[#fafafa] leading-[1.1]">
          Turn property listings into insight
        </h2>

        <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#a1a1a1] font-sans leading-[1.6] max-w-[460px] mx-auto">
          A professional workspace designed to support complex property underwriting, legal analysis, and reliable decision dossiers.
        </p>

        {/* 2 Centered Pill Buttons Side-by-Side */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/dashboard?new=true"
            className="px-5 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Try for Free
          </a>
          <button
            type="button"
            onClick={handleLoadDemo}
            className="px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#e5e5e5] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Load Sample Demo
          </button>
        </div>

        {/* Bespoke Monochrome Architectural Skyline Vignette (100% Local & IP-Safe) */}
        <div className="mt-12 sm:mt-14 max-w-[780px] mx-auto flex justify-center">
          <img
            src="/images/landing/vignette-bottom.jpg"
            alt="Monochrome residential tower silhouette emerging from mist"
            className="w-full max-w-[680px] h-auto object-contain opacity-95 select-none pointer-events-none rounded-full"
          />
        </div>
      </div>
    </section>
  );
};
