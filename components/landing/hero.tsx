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
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleStartWithUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setIsLoading(true);
    setParseError(null);
    try {
      const res = await fetch('/api/parse-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });
      const data = await res.json();
      if (data.property && Object.keys(data.property).length > 2) {
        const id = startNewEvaluation(data.property, false);
        router.push(`/evaluation/${id}/snapshot`);
      } else {
        if (data.error) setParseError(`${data.error} — fill in details on the next screen.`);
        const id = startNewEvaluation({ sourceUrl: urlInput, sourceName: 'Listing URL' }, false);
        router.push(`/evaluation/${id}/snapshot`);
      }
    } catch {
      setParseError('Could not reach the URL. Fill in details manually on the next screen.');
      const id = startNewEvaluation({ sourceUrl: urlInput, sourceName: 'Listing URL' }, false);
      router.push(`/evaluation/${id}/snapshot`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  const stats = [
    { value: '127+', label: 'Properties evaluated' },
    { value: '12+', label: 'Cities across India' },
    { value: '₹50L+', label: 'Avg. property size evaluated' },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url(/images/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Floating navbar sits inside hero to overlay the background image */}
      <Navbar />

      {/* Dark gradient overlay — heavier at top (for nav readability) lighter at center */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Content — centered vertically */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-10">

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight max-w-3xl drop-shadow-2xl">
          Know What You Know, Before You Commit.
        </h1>

        {/* Sub-headline */}
        <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl leading-relaxed drop-shadow">
          Paste a property listing, get your funding gap, missing documents, and exact next step — before signing anything.
        </p>

        {/* Glassmorphism Search Bar */}
        <form
          onSubmit={handleStartWithUrl}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/40">

            {/* Property URL field */}
            <div className="flex-1 flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200/60">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Property URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste listing (MagicBricks, 99acres…)"
                className="text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none font-medium w-full"
              />
            </div>

            {/* Property type hint field */}
            <div className="flex-1 flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200/60">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                City / Area
              </label>
              <input
                type="text"
                placeholder="e.g. Wakad, Pune"
                className="text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none font-medium w-full"
                readOnly
                tabIndex={-1}
              />
            </div>

            {/* Budget hint field */}
            <div className="flex-1 flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200/60">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Your Budget
              </label>
              <input
                type="text"
                placeholder="e.g. ₹75 Lakhs"
                className="text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none font-medium w-full"
                readOnly
                tabIndex={-1}
              />
            </div>

            {/* Submit button */}
            <div className="px-3 py-3 flex items-center justify-center sm:justify-end">
              <button
                type="submit"
                disabled={isLoading || !urlInput.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3B6FE8] hover:bg-[#2E5FD4] text-white font-semibold rounded-xl px-6 py-3 text-sm shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {parseError && (
            <div className="mt-3 flex items-center gap-2 text-sm text-amber-200 bg-black/30 backdrop-blur-sm border border-amber-400/30 px-4 py-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Demo link */}
          <p className="mt-4 text-sm text-white/50">
            Don&apos;t have a URL?{' '}
            <button
              type="button"
              onClick={handleLoadDemo}
              className="text-white/80 hover:text-white underline underline-offset-2 cursor-pointer transition-colors"
            >
              Load demo — Wakad, Pune · 2BHK · ₹68L
            </button>
          </p>
        </form>
      </div>

      {/* Stats bar — pinned to bottom of hero */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center sm:px-10 py-1 sm:py-0 w-full sm:w-auto">
              <span className="text-2xl sm:text-3xl font-bold text-white drop-shadow">{stat.value}</span>
              <span className="text-xs text-white/55 mt-0.5 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
