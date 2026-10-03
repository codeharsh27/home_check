'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const FeatureToolsSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [selectedType, setSelectedType] = useState<'Apartment' | 'Villa' | 'Plot'>('Apartment');

  const handleStart = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="smart-tools" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Simple, Clean & Punchy */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block">
              Smart Due Diligence
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Evaluate Your Next Home with Intuitive Guidance
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-lg">
              Paste any listing link to get instant clarity on your true down payment, missing seller paperwork, and bank lending limits in one clean workspace.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Start Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean, Compact UI Preview Card (Matches Roofin Image 1) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xl shadow-stone-200/40 space-y-5 max-w-md mx-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-bold text-stone-800 tracking-tight">Property Diligence Check</span>
                </div>
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready
                </span>
              </div>

              {/* Property Type Pills */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Property Category</label>
                <div className="grid grid-cols-3 gap-1.5 bg-stone-100 p-1 rounded-xl">
                  {(['Apartment', 'Villa', 'Plot'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedType === type
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clean Blue Visual Histogram (Roofin signature look) */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-stone-500">
                  <span>Price &amp; Risk Range</span>
                  <span className="text-blue-600 font-semibold">100% Automated</span>
                </div>
                <div className="h-14 w-full flex items-end justify-between gap-1 pt-2 pb-1 px-1 bg-stone-50/70 rounded-xl border border-stone-100">
                  {[25, 40, 60, 35, 75, 50, 90, 65, 45, 85, 60, 80, 55, 70, 40, 65].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-sm transition-all ${
                        i >= 3 && i <= 10 ? 'bg-[#2563EB]' : 'bg-blue-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 2 Clean Summary Points */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Capital Check</span>
                  <span className="text-xs font-bold text-stone-800 mt-0.5 block">Full Down Payment</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Legal Papers</span>
                  <span className="text-xs font-bold text-stone-800 mt-0.5 block">20+ Checkpoints</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleStart}
                className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer text-center block"
              >
                Run On Your Property
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
