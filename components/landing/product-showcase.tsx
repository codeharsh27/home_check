'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, CheckCircle2, AlertCircle, FileText, IndianRupee, Layers, TrendingUp, Scale, Coins } from 'lucide-react';

export const ProductShowcaseSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            YOUR DECISION DOSSIER
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Everything you need before signing or paying token money.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Institutional financial intelligence, stage-gated document checklists, hyper-local comparables, and money-saving strategies unified into one printable dossier.
          </p>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-[28px] sm:rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/50 overflow-hidden">
          
          {/* Mockup Browser / Workspace Header */}
          <div className="px-6 py-4 border-b border-stone-200/80 bg-stone-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-stone-300"></span>
              <span className="w-3 h-3 rounded-full bg-stone-300"></span>
              <span className="w-3 h-3 rounded-full bg-stone-300"></span>
              <span className="text-xs font-mono text-stone-500 ml-2 hidden sm:inline">
                homecheck.in/evaluation/executive-decision-dossier
              </span>
            </div>
            <button
              onClick={handleOpenDemo}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Open Interactive Dossier</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Product UI View - Authentic Screenshot & Structured Layout */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top Row: Property Snapshot with Inner Bordered Containers */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/70 inline-block">
                  Property Intelligence Baseline
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  Green Valley Residency · 2 BHK
                </h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Wakad, Pune · 1,050 sq.ft Carpet · Quoted Base: ₹68,00,000 (₹6,476/sq.ft)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm text-left sm:text-right shrink-0">
                <span className="text-[11px] font-medium text-stone-500 block">True Handover Cash Drain</span>
                <span className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">
                  ~₹22,86,000
                </span>
                <span className="text-[11px] text-amber-700 block font-medium mt-0.5">Down payment + Stamp Duty + Corpus + Fitouts</span>
              </div>
            </div>

            {/* Middle Grid: The 4 Evaluation Blocks with Inner Content Borders & Hover Lift */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Block 1: Handover Cash Drain Ladder */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-stone-200/90 bg-white space-y-3 shadow-sm hover:border-blue-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-100">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                  <span>Cash Drain Ladder</span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="p-2 rounded-lg bg-stone-50/80 border border-stone-100 flex justify-between">
                    <span>Base Value:</span>
                    <span className="font-semibold text-stone-900 font-mono">₹68.0L</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-100 flex justify-between">
                    <span className="text-blue-900 font-medium">Bank Loan (80%):</span>
                    <span className="font-semibold text-blue-700 font-mono">(₹54.4L)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50/50 border border-amber-100 flex justify-between">
                    <span className="text-amber-900 font-medium">Down Pay + Taxes:</span>
                    <span className="font-semibold text-amber-900 font-mono">₹18.36L</span>
                  </div>
                </div>
              </div>

              {/* Block 2: Hyper-Local Comparables */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-stone-200/90 bg-white space-y-3 shadow-sm hover:border-emerald-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-100">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span>Nearby Comparables</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between text-emerald-900 font-medium">
                    <span>Locality Median:</span>
                    <span className="font-mono font-bold">₹5,980/sq.ft</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-50 border border-stone-100 text-stone-600">
                    <span>VTP Bellissimo:</span>
                    <span className="font-mono font-semibold text-stone-800 float-right">₹6,200/sq.ft</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-50 border border-stone-100 text-stone-600">
                    <span>Kolte Patil Life:</span>
                    <span className="font-mono font-semibold text-stone-800 float-right">₹5,750/sq.ft</span>
                  </div>
                </div>
              </div>

              {/* Block 3: Stage-Gated Verification */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-stone-200/90 bg-white space-y-3 shadow-sm hover:border-amber-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-100">
                  <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <span>Stage-Gated Checks</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/70 flex items-center gap-2 text-emerald-900 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>Stage 1: Pre-Token Cleared</span>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-200/70 flex items-center gap-2 text-rose-900 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                    <span>Stage 2: Lawyer EC Search</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-200/70 flex items-center gap-2 text-amber-900 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                    <span>Stage 3: Snagging Audit</span>
                  </div>
                </div>
              </div>

              {/* Block 4: Money-Saving Strategies */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-stone-200/90 bg-white space-y-3 shadow-sm hover:border-purple-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-100">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                  <span>Money-Saving Engine</span>
                </div>
                <div className="space-y-1.5 text-xs text-stone-700">
                  <div className="p-2 rounded-lg bg-purple-50/40 border border-purple-200/60 flex justify-between">
                    <span>Tax Saved/Yr:</span>
                    <span className="font-semibold text-purple-900 font-mono">~₹1.05L/yr</span>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-50/40 border border-purple-200/60 flex justify-between">
                    <span>Female Concession:</span>
                    <span className="font-semibold text-purple-900 font-mono">Save ₹68,000</span>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-50/40 border border-purple-200/60 flex justify-between">
                    <span>1-Extra-EMI Hack:</span>
                    <span className="font-semibold text-purple-900 font-mono">Save ~₹7.2L</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Real Mockup Image Preview */}
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-stone-200/90 shadow-md aspect-[16/8] sm:aspect-[21/9] group">
              <Image
                src="/product-mockup.jpg"
                alt="HomeCheck Evaluation Dashboard Interface"
                fill
                className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
