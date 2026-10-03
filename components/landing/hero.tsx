'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { Navbar } from '@/components/layout/nav';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [urlInput, setUrlInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [budgetInput, setBudgetInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleStartEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() && !cityInput.trim()) {
      handleLoadDemo();
      return;
    }

    setIsLoading(true);
    setParseError(null);

    try {
      if (urlInput.trim().startsWith('http')) {
        const res = await fetch('/api/parse-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlInput }),
        });
        const data = await res.json();
        if (data.property && Object.keys(data.property).length > 2) {
          const id = startNewEvaluation(data.property, false);
          router.push(`/evaluation/${id}/snapshot`);
          return;
        }
      }

      // If not URL or parse fallback, create structured entry
      const parsedPrice = budgetInput.replace(/[^0-9]/g, '');
      const id = startNewEvaluation({
        sourceUrl: urlInput.startsWith('http') ? urlInput : undefined,
        name: urlInput.startsWith('http') ? 'Shortlisted Property' : (urlInput || 'Shortlisted Property'),
        location: cityInput || 'Pune, Maharashtra',
        price: parsedPrice ? parseInt(parsedPrice, 10) * (parsedPrice.length <= 3 ? 100000 : 1) : 6800000,
        sourceName: 'Quick Search Intake',
      }, false);
      router.push(`/evaluation/${id}/snapshot`);
    } catch {
      const id = startNewEvaluation({
        name: urlInput || 'Shortlisted Property',
        location: cityInput || 'India',
        sourceName: 'Direct Search',
      }, false);
      router.push(`/evaluation/${id}/snapshot`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section
      className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[760px] flex flex-col justify-between"
      style={{
        backgroundImage: 'url(/images/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle Natural Daylight Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/25 to-slate-900/70" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Hero Content - Centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16 max-w-5xl mx-auto w-full">
        
        {/* Main Headline - Matches Roofin styling */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-sm">
          Where Every Property Deal Is Verified With Certainty
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-white/90 font-normal max-w-2xl leading-relaxed drop-shadow-sm">
          From city apartments to gated villas, our platform connects you to verified title checks, real financial limits, and clear due diligence before committing money.
        </p>

        {/* Search / Intake Bar - Exact Roofin white pill design */}
        <form
          onSubmit={handleStartEvaluation}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="bg-white rounded-full shadow-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            
            {/* Section 1: Property or URL */}
            <div className="flex-1 px-5 py-2.5 text-left">
              <label className="block text-[11px] font-bold text-slate-800 tracking-wide">
                Location or Listing URL
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="MagicBricks, 99acres or society name"
                className="w-full text-xs sm:text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none font-normal"
              />
            </div>

            {/* Section 2: City / Locality */}
            <div className="px-5 py-2.5 text-left min-w-[150px]">
              <label className="block text-[11px] font-bold text-slate-800 tracking-wide">
                City / State
              </label>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="e.g. Pune, Bengaluru"
                className="w-full text-xs sm:text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none font-normal"
              />
            </div>

            {/* Section 3: Budget */}
            <div className="px-5 py-2.5 text-left min-w-[140px]">
              <label className="block text-[11px] font-bold text-slate-800 tracking-wide">
                Target Budget
              </label>
              <input
                type="text"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                placeholder="e.g. ₹70 Lakhs"
                className="w-full text-xs sm:text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none font-normal"
              />
            </div>

            {/* Circular Search Icon Button */}
            <div className="p-1 flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                aria-label="Search and Evaluate"
                className="w-12 h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          {parseError && (
            <div className="mt-3 flex items-center gap-2 text-xs text-amber-200 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full mx-auto w-fit">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Quick Demo Option */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/80">
            <span>Want to test immediately?</span>
            <button
              type="button"
              onClick={handleLoadDemo}
              className="text-white font-semibold underline underline-offset-4 hover:text-blue-200 cursor-pointer transition-colors"
            >
              Load verified demo (Wakad, Pune · 2 BHK · ₹68 Lakhs)
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Stats Strip - Translucent Glass Bar */}
      <div className="relative z-10 w-full border-t border-white/20 bg-slate-950/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20 text-center">
          <div className="py-2 sm:py-0 px-4">
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4,200+</p>
            <p className="text-xs text-white/70 font-medium mt-0.5">Properties verified before token deposit</p>
          </div>
          <div className="py-2 sm:py-0 px-4">
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">14+ Metros</p>
            <p className="text-xs text-white/70 font-medium mt-0.5">State RERA & stamp duty rules integrated</p>
          </div>
          <div className="py-2 sm:py-0 px-4">
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">100% Unbiased</p>
            <p className="text-xs text-white/70 font-medium mt-0.5">Zero broker commissions, buyer-first guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
};
