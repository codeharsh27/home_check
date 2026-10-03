'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, IndianRupee, FileText, AlertCircle, CheckCircle2, ListChecks, Info } from 'lucide-react';

export const SampleEvaluationSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenSample = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="sample-evaluation" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            SEE AN EXAMPLE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Here&apos;s what a HomeCheck evaluation looks like.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            A sample evaluation showing how financial planning, document checks and next steps come together.
          </p>
        </div>

        {/* ONE Sample Evaluation Card with Crisp Borders */}
        <div className="bg-white rounded-3xl border-2 border-stone-200/90 shadow-xl shadow-stone-200/40 p-6 sm:p-10 space-y-8">
          
          {/* Top Property Identification & Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-stone-100">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/70 inline-block">
                Sample Property Evaluation
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mt-2">
                2 BHK Apartment · Wakad, Pune
              </h3>
              <p className="text-sm text-stone-500 mt-0.5">
                1,050 sqft carpet area · Under-construction society
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border-2 border-stone-200 text-left sm:text-right shrink-0">
              <span className="text-xs text-stone-500 block font-medium">Quoted Base Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">
                ₹68,00,000
              </span>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-stone-200 text-stone-600 text-[11px] font-medium">
                <Info className="w-3 h-3 text-stone-400" />
                <span>Sample data shown for demonstration purposes.</span>
              </div>
            </div>
          </div>

          {/* 3 Columns: Financials, Documents, Next Steps with Distinct Inner Borders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Financial Summary */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-4 hover:border-blue-400/80 transition-all duration-300">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-200/70">
                <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                  <IndianRupee className="w-3.5 h-3.5" />
                </div>
                <span>Financial Summary</span>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Base Price:</span>
                  <span className="font-semibold text-stone-900 font-mono">₹68,00,000</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Additional Costs (Stamp+Reg):</span>
                  <span className="font-semibold text-stone-900 font-mono">+ ₹4,76,000</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                  <span>Expected Bank Loan (80%):</span>
                  <span className="font-semibold text-blue-600 font-mono">₹54,40,000</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/80 border-2 border-blue-200 flex justify-between font-bold text-stone-900 text-sm">
                  <span>Amount to Arrange:</span>
                  <span className="text-blue-900 font-mono">~₹18,36,000</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80 text-[11px] text-stone-500 leading-relaxed">
                Includes mandatory 7% stamp duty and registration which cannot be funded by home loans.
              </div>
            </div>

            {/* Column 2: Documents to Verify & Missing */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-4 hover:border-emerald-400/80 transition-all duration-300">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-200/70">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Documents &amp; Checks</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border-2 border-emerald-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block pb-1 border-b border-emerald-100">
                    Documents Provided
                  </span>
                  <div className="space-y-1.5 text-stone-700">
                    <p className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      RERA Registration Certificate
                    </p>
                    <p className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Sanctioned Building Plan
                    </p>
                    <p className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Commencement Certificate (CC)
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border-2 border-amber-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block pb-1 border-b border-amber-100">
                    Missing Information
                  </span>
                  <div className="space-y-1.5 text-stone-700">
                    <p className="flex items-center gap-1.5 text-amber-900 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Draft Agreement for Sale not yet shared
                    </p>
                    <p className="flex items-center gap-1.5 text-amber-900 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Advance maintenance deposit unconfirmed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Next Steps */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-4 flex flex-col justify-between hover:border-purple-400/80 transition-all duration-300">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider pb-2 border-b border-stone-200/70">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
                    <ListChecks className="w-3.5 h-3.5" />
                  </div>
                  <span>Next Steps</span>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700">
                  <div className="p-3 rounded-xl bg-white border-2 border-stone-200 shadow-2xs hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 space-y-0.5">
                    <span className="font-bold text-stone-900 block">1. Ask seller for draft agreement</span>
                    <span className="text-[11px] text-stone-500">Review payment milestones and penalty clauses.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border-2 border-stone-200 shadow-2xs hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 space-y-0.5">
                    <span className="font-bold text-stone-900 block">2. Involve property lawyer</span>
                    <span className="text-[11px] text-stone-500">Conduct 30-year title search on parent land deed.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border-2 border-stone-200 shadow-2xs hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 space-y-0.5">
                    <span className="font-bold text-stone-900 block">3. Verify bank project approval</span>
                    <span className="text-[11px] text-stone-500">Confirm your lender will finance this specific tower.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleOpenSample}
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg group"
                >
                  <span>Explore This Sample in Full Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
