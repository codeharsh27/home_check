'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const DarkCTABannerSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-28 sm:py-36 bg-[#08090B] relative overflow-hidden">
      {/* Ambient Radial Spotlight Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-600/15 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center relative z-10 space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
            PROTECT YOUR LIFETIME INVESTMENT
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.12] max-w-3xl mx-auto">
          Ready to evaluate your shortlisted property?
        </h2>

        <p className="text-base sm:text-lg text-stone-400 font-sans max-w-xl mx-auto leading-relaxed">
          Paste any property listing URL, simulate the possession cash drain, and generate your stage-gated decision dossier in under 60 seconds.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleScrollToTop}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-stone-900 font-mono text-xs font-bold hover:bg-stone-200 transition-all shadow-xl hover:shadow-white/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Paste Listing Link Above</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-stone-200 font-mono text-xs transition-colors border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Interactive Demo (Pune 2BHK)</span>
          </button>
        </div>

        <p className="text-xs font-mono text-stone-500 pt-4">
          Free Instant Audit · No Broker Kickbacks · Works with Housing, NoBroker, 99acres & MagicBricks
        </p>

      </div>

      {/* Massive Typographic Watermark (Matching Kero AI) */}
      <div className="w-full select-none pointer-events-none mt-20 sm:mt-24 overflow-hidden flex items-center justify-center opacity-[0.035]">
        <span className="text-[18vw] font-serif font-bold text-white tracking-tighter leading-none whitespace-nowrap">
          HOMECHECK
        </span>
      </div>
    </section>
  );
};
