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
        <div className="relative rounded-[32px] sm:rounded-[36px] overflow-hidden min-h-[260px] sm:min-h-[280px] flex items-center shadow-2xl border border-stone-200/80">
          
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase.jpg"
              alt="HomeCheck Evaluation Backdrop"
              fill
              className="object-cover brightness-90"
            />
            {/* Ambient Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-950/80 backdrop-blur-[2px]" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 w-full px-6 sm:px-12 py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Copy */}
            <div className="max-w-xl space-y-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-400 bg-blue-950/60 border border-blue-500/30 px-3.5 py-1 rounded-full backdrop-blur-md inline-block">
                READY TO START?
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                Have a property shortlisted? Start there.
              </h2>

              <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
                Add the listing or basic property details and start building your evaluation.
              </p>
            </div>

            {/* Right Action / Input */}
            <div className="w-full lg:max-w-md space-y-2">
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white rounded-full p-1.5 shadow-xl flex items-center justify-between border border-white/60"
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
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Evaluate My Property</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center sm:text-left text-[11px] sm:text-xs text-white/60 pl-4 font-normal">
                Start with the information you already have.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
