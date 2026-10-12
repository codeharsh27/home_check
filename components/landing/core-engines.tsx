'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  IndianRupee, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  Building2,
  Scale,
  Landmark,
  FileSpreadsheet
} from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const CoreEnginesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenDemoWithStep = (stepIndex: number) => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#08090B] relative overflow-hidden border-b border-white/[0.06]">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/4 left-[-150px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-[-150px] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
              DEEP UNDERWRITING ENGINES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.12]">
            Audits that feel like having an institutional team.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
            Listing sites show marketing brochures and quoted base rates. HomeCheck deconstructs the non-financeable cash requirements, stage-gated title risks, and locality negotiation gaps before you sign.
          </p>
        </div>

        {/* ── Feature 01: Alternating Row (Visual Left, Narrative Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 sm:mb-36">
          
          {/* Visual Left: Dark Glassmorphic Cash Drain Terminal */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-6 sm:p-8 shadow-[0_0_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden group">
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              
              {/* Window header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-stone-400 ml-2">ENGINE // HANDOVER_CASH_DRAIN</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  STRESS_CALCULATED
                </span>
              </div>

              {/* Realistic Visual Artifact: Cash Drain Ladder */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block font-mono">BASE AGREEMENT VALUE</span>
                    <span className="text-lg sm:text-xl font-semibold text-white">₹ 68,00,000</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block font-mono">MAX BANK LTV (80%)</span>
                    <span className="text-lg sm:text-xl font-semibold text-blue-400">₹ 54,40,000</span>
                  </div>
                </div>

                {/* The Unfinanceable Possession Cash Drain */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/[0.06] to-transparent border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                        Liquid Out-Of-Pocket Drain
                      </span>
                    </div>
                    <span className="text-base sm:text-lg font-mono font-bold text-amber-300">
                      ₹ 18,24,000
                    </span>
                  </div>

                  {/* Micro Breakdown rows */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono text-stone-400">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                      <span className="block text-[10px] text-stone-500">20% DOWN PMT</span>
                      <span className="text-stone-200">₹ 13,60,000</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                      <span className="block text-[10px] text-stone-500">STAMP & REG</span>
                      <span className="text-stone-200">₹ 4,76,000</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                      <span className="block text-[10px] text-stone-500">2-YR CORPUS</span>
                      <span className="text-stone-200">₹ 1,88,000</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                      <span className="block text-[10px] text-stone-500">FITOUT BASIC</span>
                      <span className="text-stone-200">₹ 8,00,000</span>
                    </div>
                  </div>
                </div>

                {/* Floating Rate Hike Stress Indicator */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs">
                  <div className="flex items-center gap-2 text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>RBI +1.25% Repo Hike Impact:</span>
                  </div>
                  <span className="font-mono text-stone-200 font-medium">
                    +₹4,420/mo <span className="text-stone-500">(or +48 mos tenure)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Right */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-mono uppercase tracking-[2px] text-blue-400">
              01 // FINANCIAL UNDERWRITING
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white leading-tight">
              Banks finance the agreement. You finance possession.
            </h3>

            <p className="text-stone-400 leading-relaxed text-sm sm:text-base">
              Buyers budget for the 20% down payment and assume the home loan handles the rest. In reality, mandatory non-financeable obligations — stamp duty, registration, advance society maintenance corpus, infrastructure cess, and basic interiors — demand ₹15L–₹25L in liquid cash right at possession.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleOpenDemoWithStep(2)}
                className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-blue-400 transition-colors group cursor-pointer"
              >
                <span>Simulate your possession liquidity gap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Feature 02: Alternating Row (Narrative Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 sm:mb-36">
          
          {/* Narrative Left */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono uppercase tracking-[2px] text-emerald-400">
              02 // LEGAL RISK CONTAINMENT
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white leading-tight">
              Never release token advances before municipal CC validation.
            </h3>

            <p className="text-stone-400 leading-relaxed text-sm sm:text-base">
              Builders routinely rush buyers into signing non-refundable booking applications with ₹50,000–₹2,00,000 token cheques before the 30-year Nil Encumbrance Certificate (EC), municipal Commencement Certificate (CC) floor sanction, or lender Bank NOC are produced. HomeCheck enforces a stage-gated document barrier.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleOpenDemoWithStep(4)}
                className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-emerald-400 transition-colors group cursor-pointer"
              >
                <span>Inspect stage-gated legal protocols</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Visual Right: Dark Glassmorphic Stage-Gated Document Shield */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-6 sm:p-8 shadow-[0_0_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-stone-400 ml-2">AUDIT // STAGE_GATED_TITLE_SHIELD</span>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                  STAGE_1_ACTIVE
                </span>
              </div>

              {/* Realistic Document Checklist Rows */}
              <div className="space-y-3">
                {/* Item 1: RERA Registered */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-white block">MahaRERA Project ID P52100012345</span>
                      <span className="text-[11px] text-stone-500 font-mono">Quarterly compliances updated · Escrow active</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    VERIFIED
                  </span>
                </div>

                {/* Item 2: Commencement Certificate Floor Check */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-white block">Municipal Commencement Cert (CC)</span>
                      <span className="text-[11px] text-stone-500 font-mono">Sanctioned up to 18th floor · Unit on 12th floor</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    SANCTIONED
                  </span>
                </div>

                {/* Item 3: 30-Year Encumbrance Form 15 */}
                <div className="p-3.5 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-white block">30-Year Nil Encumbrance Certificate (Form 15)</span>
                      <span className="text-[11px] text-amber-300/80 font-mono">Sub-registrar record pending buyer advocate inspection</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    MANDATORY_PRE_TOKEN
                  </span>
                </div>

                {/* Item 4: Construction Lender Bank NOC */}
                <div className="p-3.5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-white block">Construction Lender Bank NOC</span>
                      <span className="text-[11px] text-rose-300/80 font-mono">Land is mortgaged to HDFC Ltd · Specific unit release letter required</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    RELEASE_REQUIRED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature 03: Alternating Row (Visual Left, Narrative Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Visual Left: Micro-Market Price Radar */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-6 sm:p-8 shadow-[0_0_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-stone-400 ml-2">RADAR // LOCALITY_MEDIAN_BENCHMARK</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                  WAKAD_PUNE_2KM
                </span>
              </div>

              {/* Price comparison card */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">BUILDER ASKING RATE</span>
                    <span className="text-lg font-bold text-white">₹ 6,476 <span className="text-xs font-normal text-stone-400">/sq.ft</span></span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">LOCALITY MEDIAN CLOSE</span>
                    <span className="text-lg font-bold text-stone-300">₹ 6,100 <span className="text-xs font-normal text-stone-400">/sq.ft</span></span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20">
                    <span className="text-[10px] font-mono text-emerald-400 block">NEGOTIATION ROOM</span>
                    <span className="text-lg font-bold text-emerald-400">₹ 3.95 Lakhs</span>
                  </div>
                </div>

                {/* Nearby Active Alternatives within 2.5 km */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.05] space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                    ACTIVE MICRO-MARKET ALTERNATIVES (WITHIN 2.5 KM)
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-stone-200">Rohan Tarang · 2 BHK (1,020 sq.ft)</span>
                      </div>
                      <span className="font-mono text-stone-300">₹ 64.5 Lakhs <span className="text-[10px] text-stone-500">(₹6,323/sq.ft)</span></span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-stone-200">Kolte Patil Western Avenue · 2 BHK</span>
                      </div>
                      <span className="font-mono text-stone-300">₹ 69.0 Lakhs <span className="text-[10px] text-stone-500">(₹6,570/sq.ft)</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Right */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-mono uppercase tracking-[2px] text-cyan-400">
              03 // VALUATION INTELLIGENCE
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white leading-tight">
              Walk into the sales office with real sub-registrar benchmarks.
            </h3>

            <p className="text-stone-400 leading-relaxed text-sm sm:text-base">
              Developers artificially inflate base prices by padding floor rise, premium location charges (PLC), and clubhouse fees. HomeCheck cross-references actual registered transaction ranges in the exact micro-market and scans active nearby inventory within 2–4 km.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleOpenDemoWithStep(3)}
                className="inline-flex items-center gap-2 text-sm font-mono text-white hover:text-cyan-400 transition-colors group cursor-pointer"
              >
                <span>Compare micro-market pricing radar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
