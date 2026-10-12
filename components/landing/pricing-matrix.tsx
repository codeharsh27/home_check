'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const PricingMatrixSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleLaunch = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#0A0B0E] relative overflow-hidden border-b border-white/[0.06]">
      {/* Ambient background glow behind featured tier */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
              TRANSPARENT DUE DILIGENCE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.12]">
            Simple, predictable pricing.
          </h2>

          <p className="text-stone-400 font-sans text-sm sm:text-base">
            Protecting a ₹1 Crore lifetime decision shouldn’t come with hidden fees. Start free or unlock comprehensive underwriting.
          </p>
        </div>

        {/* 3 Sculpted Dark Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 items-stretch">
          
          {/* Tier 1: Free Self-Audit */}
          <div className="rounded-3xl bg-[#121316] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-stone-400 block mb-2">TIER // 01</span>
                <h3 className="text-xl font-serif text-white">Self-Audit</h3>
                <p className="text-xs text-stone-400 mt-1">For quick listing sanity checks and basic rate comparison.</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">₹ 0</span>
                <span className="text-xs font-mono text-stone-500 ml-2">/ free forever</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/[0.06] text-xs font-sans text-stone-300">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant portal listing intake (Housing, NoBroker, 99acres)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Base rate ₹/sq.ft and carpet efficiency calculation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard 10-point Pre-Token document checklist</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Local browser session persistence</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={handleLaunch}
                className="w-full py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-mono transition-colors border border-white/10 cursor-pointer"
              >
                Start Free Audit
              </button>
            </div>
          </div>

          {/* Tier 2: Decision Dossier (Featured with Glow) */}
          <div className="rounded-3xl bg-[#141720] border-2 border-blue-500/50 p-7 sm:p-8 flex flex-col justify-between relative shadow-[0_0_50px_-15px_rgba(59,130,246,0.3)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-[10px] font-mono text-white tracking-widest uppercase font-bold shadow-md">
              MOST POPULAR
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-400 block mb-2">TIER // 02</span>
                <h3 className="text-xl font-serif text-white">Decision Dossier</h3>
                <p className="text-xs text-stone-300 mt-1">Full financial stress testing, micro-market benchmarks, and printable PDF dossier.</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">₹ 999</span>
                <span className="text-xs font-mono text-stone-400 ml-2">/ property evaluation</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/[0.08] text-xs font-sans text-stone-200">
                <li className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Everything in Free Self-Audit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Comprehensive Handover Cash Drain Ladder</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Floating Rate Hike Stress Test (+1.25% RBI Repo)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Locality median transaction radar & 3 active comps</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Printable Executive Decision Dossier (PDF Export)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={handleLaunch}
                className="w-full py-3 rounded-full bg-white text-stone-900 hover:bg-stone-200 text-xs font-mono font-bold transition-all shadow-lg cursor-pointer"
              >
                Generate Decision Dossier →
              </button>
            </div>
          </div>

          {/* Tier 3: Advocate Briefing Pack */}
          <div className="rounded-3xl bg-[#121316] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-stone-400 block mb-2">TIER // 03</span>
                <h3 className="text-xl font-serif text-white">Advocate Briefing Pack</h3>
                <p className="text-xs text-stone-400 mt-1">For buyers hiring legal counsel or preparing for final possession snags.</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">₹ 2,499</span>
                <span className="text-xs font-mono text-stone-500 ml-2">/ property evaluation</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/[0.06] text-xs font-sans text-stone-300">
                <li className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Everything in Decision Dossier</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>12-Point Independent Lawyer Scrutiny Briefing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Joint Snagging Defect Audit Handover Checklist</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>State-specific regional document guidelines (MH, KA, DL, TS)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={handleLaunch}
                className="w-full py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-mono transition-colors border border-white/10 cursor-pointer"
              >
                Inspect Advocate Pack
              </button>
            </div>
          </div>

        </div>

        {/* Feature Comparison Matrix (Matching Kero AI) */}
        <div className="pt-12 border-t border-white/[0.06]">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-serif text-white">Compare evaluation capabilities</h3>
            <p className="text-xs font-mono text-stone-400 mt-1">Detailed feature breakdown across all diligence tiers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-stone-300 min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.08] text-stone-500">
                  <th className="py-3.5 px-4 font-normal">AUDIT CAPABILITY</th>
                  <th className="py-3.5 px-4 font-normal text-center">SELF-AUDIT</th>
                  <th className="py-3.5 px-4 font-normal text-center text-blue-400">DECISION DOSSIER</th>
                  <th className="py-3.5 px-4 font-normal text-center">ADVOCATE PACK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr>
                  <td className="py-3.5 px-4 text-white">Multi-Portal Listing Decomposition</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Carpet Area & Rate / sq.ft Analysis</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Handover Possession Cash Drain Ladder</td>
                  <td className="py-3.5 px-4 text-center text-stone-600">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Floating Rate Hike Stress Test (+1.25%)</td>
                  <td className="py-3.5 px-4 text-center text-stone-600">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Micro-Market Sub-Registrar Comps Radar</td>
                  <td className="py-3.5 px-4 text-center text-stone-600">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Printable Executive Dossier (PDF Export)</td>
                  <td className="py-3.5 px-4 text-center text-stone-600">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Lawyer Briefing Notes & Questionnaire</td>
                  <td className="py-3.5 px-4 text-center text-stone-600">—</td>
                  <td className="py-3.5 px-4 text-center text-stone-600 font-bold">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white">Defect Snagging Possession Checklist</td>
                  <td className="py-3.5 px-4 text-center text-stone-600">—</td>
                  <td className="py-3.5 px-4 text-center text-stone-600 font-bold">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
