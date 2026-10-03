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
    <section id="full-intake" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[220px] sm:min-h-[240px] flex items-center shadow-xl">
          
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase.jpg"
              alt="HomeCheck Banner Background"
              fill
              className="object-cover brightness-95"
            />
            {/* Ambient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/50 to-slate-950/60 backdrop-blur-[2px]" />
          </div>

          {/* Banner Content - Left Title, Right Input Pill */}
          <div className="relative z-10 w-full px-6 sm:px-12 py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Title */}
            <div className="max-w-lg">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                Join HomeCheck For Updates On Verified Properties.
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-normal mt-1.5">
                Check funding caps, RERA status, and document authenticity for free.
              </p>
            </div>

            {/* Input Pill matching Roofin */}
            <form
              onSubmit={handleSubmit}
              className="w-full lg:max-w-md bg-white rounded-full p-1.5 shadow-xl flex items-center justify-between"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter listing URL or property name"
                className="flex-1 px-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Start Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
};
