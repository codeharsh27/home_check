'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, Loader2 } from 'lucide-react';

export const CTABannerSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      const id = startNewEvaluation(DEMO_PROPERTY, true);
      router.push(`/evaluation/${id}/snapshot`);
      return;
    }

    setIsLoading(true);
    const isUrl = inputVal.startsWith('http');
    const id = startNewEvaluation({
      sourceUrl: isUrl ? inputVal : undefined,
      name: isUrl ? 'Shortlisted Property' : inputVal,
      sourceName: 'Footer CTA Intake',
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="full-intake" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-[32px] sm:rounded-[36px] overflow-hidden min-h-[280px] flex items-center shadow-xl border border-stone-200/80">
          
          {/* Background Image Container - Kept Natural */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase.jpg"
              alt="HomeCheck Evaluation Backdrop"
              fill
              className="object-cover brightness-95 scale-100"
            />
            {/* Natural Neutral Dark Overlay for text legibility without any blue tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/60 to-black/35 backdrop-blur-[1px]" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 w-full px-6 sm:px-12 py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Copy */}
            <div className="max-w-xl space-y-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-white/90 bg-white/15 border border-white/25 px-3.5 py-1 rounded-full backdrop-blur-md inline-block shadow-sm">
                READY TO START?
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                Have a property shortlisted? Start there.
              </h2>

              <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed">
                Add the listing or basic property details and start building your evaluation.
              </p>
            </div>

            {/* Right Action / Input with Clean Neutral Form */}
            <div className="w-full lg:max-w-md space-y-2.5">
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center justify-between border border-stone-200 focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-400/20 transition-all"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Paste a property listing URL..."
                  className="flex-1 px-4 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none bg-transparent font-normal"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] shrink-0 cursor-pointer flex items-center gap-1.5 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Evaluate My Property</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-2 pl-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                <p className="text-[11px] sm:text-xs text-white/80 font-normal">
                  Start with the information you already have.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
