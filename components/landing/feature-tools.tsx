'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, AlertTriangle, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const FeatureToolsSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const breakdownItems = [
    {
      label: 'Advertised Builder Price',
      amount: '₹75,00,000',
      tag: 'Only number the broker quoted',
      isExtra: false,
      detail: 'The base agreement value shown on hoardings and listings.',
    },
    {
      label: 'Govt. Stamp Duty & Registration (7%)',
      amount: '+ ₹5,25,000',
      tag: 'Zero bank funding (100% Cash)',
      isExtra: true,
      detail: 'RBI strictly forbids banks from including stamp duty in home loans.',
    },
    {
      label: 'Advance Society Maintenance & Corpus',
      amount: '+ ₹2,50,000',
      tag: 'Payable before possession',
      isExtra: true,
      detail: '24-36 months mandatory advance maintenance & society sinking fund.',
    },
    {
      label: 'Covered Parking & Infrastructure Charges',
      amount: '+ ₹3,75,000',
      tag: 'Hidden in agreement fine print',
      isExtra: true,
      detail: 'Clubhouse, electricity substation, and dedicated car park fees.',
    },
  ];

  const handleStart = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="smart-tools" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bold Scannable Narrative */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Eyebrow with animated pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>THE ACQUISITION COST REALITY</span>
            </div>

            {/* Powerful, Scannable Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              Why a ₹75 Lakh Flat Really Costs <span className="underline decoration-blue-500 underline-offset-4">₹86.5 Lakhs</span>.
            </h2>

            {/* Short Scannable Core Truth */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
              Builders quote the base agreement rate. But RBI rules strictly prohibit banks from financing stamp duty, registration, or society deposits.
            </p>

            {/* 3 Quick-Scan Fact Chips */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  1
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Banks Only Loan 80% of Base Price</span>
                  <span className="text-xs text-stone-500">They never loan against stamp duty or amenities.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  2
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">7% Stamp Duty is 100% Cash</span>
                  <span className="text-xs text-stone-500">₹5.25L+ must leave your personal savings upfront.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  3
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Know Your Exact Gap in 60 Seconds</span>
                  <span className="text-xs text-stone-500">HomeCheck pools your savings, family help &amp; loan limits.</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Check Your True Capital Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual Teardown Receipt Card (No generic calculator, pure scannable intelligence) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-2xl shadow-stone-200/50 space-y-6 transition-all">
              
              {/* Card Header with Real Estate Context */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Acquisition Teardown · 2 BHK Example
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-stone-400">
                  Ref: Metro Market Standard
                </span>
              </div>

              {/* Itemized Scannable Rows */}
              <div className="space-y-3">
                {breakdownItems.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveItem(idx)}
                    onMouseLeave={() => setActiveItem(null)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-default ${
                      item.isExtra
                        ? activeItem === idx 
                          ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                          : 'bg-stone-50/70 border-stone-200/70 hover:bg-stone-50'
                        : 'bg-blue-50/40 border-blue-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${item.isExtra ? 'text-stone-800' : 'text-blue-950 font-extrabold'}`}>
                            {item.label}
                          </span>
                        </div>
                        <span className={`text-[10px] font-medium tracking-wide ${
                          item.isExtra ? 'text-amber-800 font-semibold' : 'text-blue-700'
                        }`}>
                          {item.tag}
                        </span>
                      </div>
                      <span className={`text-sm sm:text-base font-mono font-bold shrink-0 ${
                        item.isExtra ? 'text-stone-900' : 'text-blue-700'
                      }`}>
                        {item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashed Divider */}
              <div className="border-t-2 border-dashed border-stone-200 my-4"></div>

              {/* True Total Callout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-stone-900 text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 block">
                    Actual Cheque Outlay
                  </span>
                  <span className="text-2xl font-bold font-mono text-white">
                    ₹86,50,000
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    + ₹11,50,000 Extra Over Quote
                  </span>
                </div>
              </div>

              {/* Visual Gap Comparison: What You Expected vs What Actually Happens */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-600 font-medium">Bank Loan Coverage (80% of Base only):</span>
                  <span className="font-bold text-stone-900 font-mono">₹60,00,000</span>
                </div>
                
                {/* Visual Bar representation */}
                <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden flex">
                  <div style={{ width: '69%' }} className="bg-blue-600 h-full" title="Bank Loan (69%)"></div>
                  <div style={{ width: '31%' }} className="bg-amber-500 h-full" title="Your Cash Requirement (31%)"></div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200/60 font-semibold">
                  <span className="text-amber-900">Your Actual Cash Requirement:</span>
                  <span className="text-amber-900 font-bold font-mono text-sm">₹26,50,000 <span className="text-[10px] font-normal text-stone-500">(Not ₹15 Lakhs)</span></span>
                </div>
              </div>

              {/* Protective Takeaway note */}
              <div className="flex items-center gap-2.5 text-xs text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>HomeCheck catches this before you sign so you never face a cash emergency at registration.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
