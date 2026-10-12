'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  IndianRupee, 
  Scale, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Coins, 
  Printer, 
  TrendingUp, 
  Building2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const InteractiveDossierSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);
  const [activeTab, setActiveTab] = useState<'intake' | 'cash' | 'market' | 'legal' | 'report'>('cash');

  const handleOpenInteractiveDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="sample-evaluation" className="py-24 sm:py-32 bg-[#0A0B0E] relative overflow-hidden border-b border-white/[0.06]">
      {/* Centered subtle spotlight glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-amber-500/10 to-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Mid-page Manifesto / Pull Quote */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
              INTERACTIVE DECISION TERMINAL
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[46px] font-serif font-normal tracking-tight text-white leading-[1.14]">
            &ldquo;From property listing to final possession, analyze any deal without losing sleep over hidden liabilities.&rdquo;
          </h2>

          <p className="text-stone-400 font-sans text-sm sm:text-base max-w-xl mx-auto">
            Test the live 5-step evaluation engine below. Switch between audit layers to inspect real underwriting outputs.
          </p>
        </div>

        {/* Tab Pill Controller */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-full bg-[#121316] border border-white/10 backdrop-blur-xl">
            {[
              { id: 'intake', label: '1. Intake & Rate' },
              { id: 'cash', label: '2. Cash Drain' },
              { id: 'market', label: '3. Market Reality' },
              { id: 'legal', label: '4. Legal Shield' },
              { id: 'report', label: '5. Executive Dossier' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-stone-900 font-semibold shadow-lg shadow-white/10'
                    : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Centerpiece Preview Terminal */}
        <div className="rounded-3xl bg-[#0E1014] border border-white/10 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Terminal Top Bar */}
          <div className="px-6 py-4 bg-[#14161B] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
              </div>
              <span className="text-xs font-mono text-stone-400 hidden sm:inline">
                homecheck.in / audit / wakad-pune / {activeTab}
              </span>
            </div>

            <button
              onClick={handleOpenInteractiveDemo}
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>Launch Full Interactive Screen</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Terminal Screen Body */}
          <div className="p-6 sm:p-10 min-h-[380px] flex flex-col justify-center">
            
            {/* Tab 1: Intake & Scan */}
            {activeTab === 'intake' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono text-blue-400 block mb-1">AUDIT ASSET</span>
                    <h3 className="text-2xl font-serif text-white">Green Valley Residency</h3>
                    <p className="text-xs text-stone-400 font-mono">Wakad, Pune · 2 BHK (1,050 sq.ft) · Under Construction</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-stone-400 block">BASE QUOTED PRICE</span>
                    <span className="text-2xl font-serif font-bold text-white">₹ 68,00,000</span>
                    <span className="text-xs font-mono text-stone-400 block">₹ 6,476 / sq.ft</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">RERA IDENTIFIER</span>
                    <span className="text-xs font-mono text-white">P52100012345</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">POSSESSION TARGET</span>
                    <span className="text-xs font-mono text-white">December 2026</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">CARPET EFFICIENCY</span>
                    <span className="text-xs font-mono text-emerald-400">72.4% (Healthy)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">INTAKE CONFIDENCE</span>
                    <span className="text-xs font-mono text-blue-400">98% Verified</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Cash Drain */}
            {activeTab === 'cash' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono text-amber-400 block">LIQUIDITY REALITY</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white">Actual Possession Cash Drain</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-stone-400 block">NON-LOAN CASH NEEDED</span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400">₹ 18,24,000</span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-stone-400">
                    <span>Base Value: ₹68L</span>
                    <span>Total Real Possession Cost: ₹76.24L</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/[0.05] overflow-hidden flex">
                    <div className="w-[71%] bg-blue-500" title="Home Loan 80% (₹54.4L)" />
                    <div className="w-[18%] bg-amber-500" title="Down Payment (₹13.6L)" />
                    <div className="w-[11%] bg-rose-500" title="Unfinanceable Duties & Fitouts (₹8.24L)" />
                  </div>
                  <div className="flex flex-wrap gap-4 pt-1 text-[11px] font-mono text-stone-400">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Bank Home Loan (80%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> 20% Down Payment</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Statutory & Fitouts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center justify-between">
                  <span>Buyer Available Liquid Reserves: ₹15.00 Lakhs</span>
                  <span className="text-rose-400 font-bold">Unfunded Shortfall: -₹3.24 Lakhs</span>
                </div>
              </div>
            )}

            {/* Tab 3: Market Reality */}
            {activeTab === 'market' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 block">MICRO-MARKET ANALYSIS</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white">Wakad Locality Benchmark</h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    5.8% Premium Over Locality Median
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">BUILDER QUOTE</span>
                    <span className="text-xl font-bold text-white">₹ 6,476 /sq.ft</span>
                    <span className="text-[11px] text-stone-500 block mt-1">₹68 Lakhs base</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-[10px] font-mono text-stone-500 block">SUB-REGISTRAR MEDIAN</span>
                    <span className="text-xl font-bold text-stone-300">₹ 6,100 /sq.ft</span>
                    <span className="text-[11px] text-stone-500 block mt-1">Registered closes 2025-26</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20">
                    <span className="text-[10px] font-mono text-emerald-400 block">TARGET NEGOTIATION</span>
                    <span className="text-xl font-bold text-emerald-400">₹ 64.05 Lakhs</span>
                    <span className="text-[11px] text-emerald-300/80 block mt-1">Potential savings: ₹3.95L</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Legal Shield */}
            {activeTab === 'legal' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono text-emerald-400 block">LEGAL GATEWAY</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white">Pre-Token Diligence Checklist</h3>
                  </div>
                  <span className="text-xs font-mono text-stone-400">3 of 5 Gates Cleared</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <span className="text-stone-200">1. RERA Project Registration & Escrow Account</span>
                    <span className="text-emerald-400 font-mono">VERIFIED ✓</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <span className="text-stone-200">2. Commencement Certificate (CC) Floor Sanction Plan</span>
                    <span className="text-emerald-400 font-mono">SANCTIONED (18 Fl) ✓</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 flex items-center justify-between">
                    <span className="text-amber-200">3. 30-Year Nil Encumbrance Certificate (Form 15)</span>
                    <span className="text-amber-400 font-mono">INSPECT BEFORE TOKEN ⚠️</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 flex items-center justify-between">
                    <span className="text-rose-200">4. Bank Consortium Mortgage NOC Letter</span>
                    <span className="text-rose-400 font-mono">MORTGAGE RECORDED ⛔</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Executive Dossier */}
            {activeTab === 'report' && (
              <div className="space-y-6 animate-fadeIn text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                  <div>
                    <span className="text-xs font-mono text-stone-400 block">FINAL DELIVERABLE</span>
                    <h3 className="text-2xl font-serif text-white">Executive Decision Dossier</h3>
                    <p className="text-xs text-stone-400 font-mono">Complete printable briefing package for buyer advocate & negotiations</p>
                  </div>
                  <button
                    onClick={handleOpenInteractiveDemo}
                    className="px-5 py-2.5 rounded-xl bg-white text-stone-900 font-mono text-xs font-bold hover:bg-stone-200 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Printable Report Demo</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
                  <div className="space-y-1">
                    <span className="font-mono text-stone-500 text-[10px] block">SECTION A</span>
                    <p className="font-semibold text-white">Underwriting Memo</p>
                    <p className="text-[11px] text-stone-400">Total possession cash drain + floating rate hike impact</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-stone-500 text-[10px] block">SECTION B</span>
                    <p className="font-semibold text-white">Stage-Gated Legal Protocol</p>
                    <p className="text-[11px] text-stone-400">Pre-token, pre-agreement, and handover defect snag lists</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-stone-500 text-[10px] block">SECTION C</span>
                    <p className="font-semibold text-white">Negotiation Leverage Guide</p>
                    <p className="text-[11px] text-stone-400">4 micro-market counter-offer tactics with locality comps</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 3 Understated Micro-Stats Below (Matching Kero AI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 sm:pt-16 border-t border-white/[0.06] mt-12 sm:mt-16 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-2xl sm:text-3xl font-serif text-white font-normal block">₹12.4 Lakhs</span>
            <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">Median Uncovered Cash Gap</p>
            <p className="text-xs text-stone-500 leading-relaxed">Average unfinanceable statutory duties and fitout charges discovered before token deposit.</p>
          </div>

          <div className="space-y-2">
            <span className="text-2xl sm:text-3xl font-serif text-white font-normal block">30-Year Audit</span>
            <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">Encumbrance & Title Depth</p>
            <p className="text-xs text-stone-500 leading-relaxed">Stage-gated verification protocols checking sub-registrar Form 15 and municipal CC sanctions.</p>
          </div>

          <div className="space-y-2">
            <span className="text-2xl sm:text-3xl font-serif text-white font-normal block">0% Broker Affiliation</span>
            <p className="text-xs font-mono text-stone-400 uppercase tracking-wider">Pure Buyer-Side Advocacy</p>
            <p className="text-xs text-stone-500 leading-relaxed">No developer sponsorships or kickbacks. Every evaluation is built purely to safeguard the buyer.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
