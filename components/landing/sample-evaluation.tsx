'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, IndianRupee, FileText, AlertCircle, CheckCircle2, Scale, Info, Sparkles, TrendingUp } from 'lucide-react';

export const SampleEvaluationSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenSample = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="sample-evaluation" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            SAMPLE DOSSIER OUTPUT
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            What a HomeCheck decision dossier looks like.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            See how your true handover cash drain, stage-gated legal verification roadmap, and money-saving strategies come together in one clear report.
          </p>
        </div>

        {/* ONE Sample Evaluation Card with Crisp Borders */}
        <div className="bg-white rounded-3xl border-2 border-stone-200/90 shadow-xl shadow-stone-200/40 p-6 sm:p-10 space-y-8">
          
          {/* Top Property Identification & Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-100">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/70 inline-block">
                Sample Property Dossier
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mt-2">
                2 BHK Apartment · Wakad, Pune
              </h3>
              <p className="text-sm text-stone-500 mt-0.5">
                1,050 sq.ft carpet area · Under-construction gated development · RERA: P52100029801
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border-2 border-stone-200 text-left sm:text-right shrink-0">
              <span className="text-xs text-stone-500 block font-medium">Quoted Base Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">
                ₹68,00,000
              </span>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-600 text-[11px] font-medium">
                <Info className="w-3 h-3 text-stone-400" />
                <span>₹6,476/sq.ft carpet area</span>
              </div>
            </div>
          </div>

          {/* 3 Columns: Financials, Documents, Next Steps with Distinct Inner Borders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Handover Cash Drain Ladder */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-4 hover:border-blue-400/80 transition-all duration-300">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-200/70">
                <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-3.5 h-3.5" />
                </div>
                <span>True Handover Cash Drain</span>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Base Quoted Price:</span>
                  <span className="font-semibold text-stone-900 font-mono">₹68,00,000</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Max Bank Loan (80%):</span>
                  <span className="font-semibold text-blue-600 font-mono">(₹54,40,000)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Min Down Payment:</span>
                  <span className="font-semibold text-amber-700 font-mono">₹13,60,000</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Stamp Duty &amp; Reg:</span>
                  <span className="font-semibold text-stone-900 font-mono">+ ₹4,76,000</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/80 border-2 border-blue-200 flex justify-between font-bold text-stone-900 text-sm">
                  <span>Total Handover Outflow:</span>
                  <span className="text-blue-900 font-mono">~₹22,86,000</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80 text-[11px] text-stone-500 leading-relaxed">
                Includes mandatory non-loan costs: Stamp Duty, 2-yr maintenance corpus, and basic interior buffers.
              </div>
            </div>

            {/* Column 2: Stage-Gated Documents */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-4 hover:border-emerald-400/80 transition-all duration-300">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-200/70">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Stage-Gated Roadmap</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border-2 border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      Stage 1 • Pre-Token Check
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">Cleared</span>
                  </div>
                  <p className="text-stone-700 text-[11px]">
                    ✓ RERA Active filing &amp; Sanctioned Building Plan up to 12th floor confirmed.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border-2 border-rose-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">
                      Stage 2 • Pre-Agreement
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-semibold">Lawyer Needed</span>
                  </div>
                  <p className="text-stone-700 text-[11px]">
                    ⚠ 30-Year Nil Encumbrance Certificate &amp; bank mortgage release NOC pending.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border-2 border-amber-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                      Stage 3 • Key Handover
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">Future Step</span>
                  </div>
                  <p className="text-stone-700 text-[11px]">
                    Occupancy Certificate (OC) &amp; 150-point structural snag audit before final payment.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Money-Saving & Negotiation Action */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-4 hover:border-purple-400/80 transition-all duration-300">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-200/70">
                <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Money-Saving &amp; Strategy</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border-2 border-purple-200/80 space-y-1">
                  <div className="font-semibold text-purple-900 flex justify-between">
                    <span>1. Tax Deductions:</span>
                    <span className="font-mono text-emerald-700 font-bold">~₹1.05L/yr</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Dual claim under Sec 24(b) (₹2L interest) + Sec 80C (₹1.5L principal).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border-2 border-purple-200/80 space-y-1">
                  <div className="font-semibold text-purple-900 flex justify-between">
                    <span>2. Female Co-Owner Rebate:</span>
                    <span className="font-mono text-emerald-700 font-bold">Save ₹68,000</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    1% stamp duty concession applied directly on base registration value.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border-2 border-purple-200/80 space-y-1">
                  <div className="font-semibold text-purple-900 flex justify-between">
                    <span>3. 1-Extra-EMI Prepayment:</span>
                    <span className="font-mono text-emerald-700 font-bold">Save ₹7.2L</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Shaves 4.2 years off loan tenure and eliminates compounding interest.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Action Footer with Open Full Dossier */}
          <div className="pt-4 border-t-2 border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              Want to see the complete 5-step evaluation for this property?
            </div>
            <button
              onClick={handleOpenSample}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Interactive Decision Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
