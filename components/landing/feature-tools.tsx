'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, SlidersHorizontal, Check } from 'lucide-react';

export const FeatureToolsSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [selectedType, setSelectedType] = useState<'Apartments' | 'Villas' | 'Plots'>('Apartments');
  const [minBudget, setMinBudget] = useState('₹45,00,000');
  const [maxBudget, setMaxBudget] = useState('₹95,00,000');

  const handleExplore = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="smart-tools" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading + Copy + Action */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Verify Your Shortlisted Property with Intuitive Tools and Guidance
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Get quick and easy access to institutional-grade due diligence tailored to your budget. Our smart checks identify bank lending limits, stamp duty requirements, and critical checklist gaps before you commit non-refundable booking money.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 cursor-pointer"
              >
                <span>Explore Live Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Light UI Filter & Analysis Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-slate-800 tracking-tight">Due Diligence Filter</span>
                </div>
                <span className="text-xs font-medium text-slate-400">Step 1 of 3</span>
              </div>

              {/* Property Type Pills */}
              <div className="mt-6 space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Property Category</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-200/70 p-1.5 rounded-2xl">
                  {(['Apartments', 'Villas', 'Plots'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        selectedType === type
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Capital Distribution Histogram / Bar preview */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 uppercase tracking-wider">Lending &amp; Capital Flow</span>
                  <span className="text-blue-600 font-semibold">80% Max Bank LTV</span>
                </div>
                
                {/* Visual SVG Bar Histogram */}
                <div className="h-20 w-full flex items-end justify-between gap-1.5 pt-4 pb-1 px-1">
                  {[28, 45, 62, 35, 80, 52, 95, 70, 48, 88, 64, 90, 75, 58, 42, 68].map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-sm transition-all ${
                        i >= 4 && i <= 11 ? 'bg-[#2563EB]' : 'bg-blue-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range Inputs */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Minimum Budget</label>
                  <input
                    type="text"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Maximum Budget</label>
                  <input
                    type="text"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => { setMinBudget('₹40,00,000'); setMaxBudget('₹80,00,000'); }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
                >
                  Reset Defaults
                </button>
                <button
                  type="button"
                  onClick={handleExplore}
                  className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  Show Analysis Report
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
