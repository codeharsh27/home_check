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

        {/* ONE Sample Evaluation Card */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/40 p-6 sm:p-10 space-y-8">
          
          {/* Top Property Identification & Disclaimer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                Sample Property Evaluation
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mt-1">
                2 BHK Apartment · Wakad, Pune
              </h3>
              <p className="text-sm text-stone-500 mt-0.5">
                1,050 sqft carpet area · Under-construction society
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-stone-500 block font-medium">Quoted Base Price</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">
                ₹68,00,000
              </span>
              <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium">
                <Info className="w-3 h-3 text-stone-400" />
                <span>Sample data shown for demonstration purposes.</span>
              </div>
            </div>
          </div>

          {/* 3 Columns: Financials, Documents, Next Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Financial Summary */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-4">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
                <IndianRupee className="w-4 h-4 text-blue-600" />
                <span>Financial Summary</span>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between pb-1.5 border-b border-stone-200/50">
                  <span>Base Price:</span>
                  <span className="font-semibold text-stone-900 font-mono">₹68,00,000</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-stone-200/50">
                  <span>Estimated Additional Costs:</span>
                  <span className="font-semibold text-stone-900 font-mono">+ ₹4,76,000</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-stone-200/50">
                  <span>Expected Bank Loan (80%):</span>
                  <span className="font-semibold text-blue-600 font-mono">₹54,40,000</span>
                </div>
                <div className="pt-2 flex justify-between font-bold text-stone-900 text-sm">
                  <span>Amount to Arrange:</span>
                  <span className="text-stone-900 font-mono">~₹18,36,000</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Includes mandatory 7% stamp duty and registration which cannot be funded by home loans.
              </p>
            </div>

            {/* Column 2: Documents to Verify & Missing */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-4">
              <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Documents &amp; Checks</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
                    Documents Provided
                  </span>
                  <div className="space-y-1 text-stone-700">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      RERA Registration Certificate
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Sanctioned Building Plan
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Commencement Certificate (CC)
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block mb-1">
                    Missing Information
                  </span>
                  <div className="space-y-1 text-stone-700">
                    <p className="flex items-center gap-1.5 text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Draft Agreement for Sale not yet shared
                    </p>
                    <p className="flex items-center gap-1.5 text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      Advance maintenance deposit unconfirmed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Next Steps */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
                  <ListChecks className="w-4 h-4 text-purple-600" />
                  <span>Next Steps</span>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700">
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 space-y-0.5">
                    <span className="font-bold text-stone-900 block">1. Ask seller for draft agreement</span>
                    <span className="text-[11px] text-stone-500">Review payment milestones and penalty clauses.</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 space-y-0.5">
                    <span className="font-bold text-stone-900 block">2. Involve property lawyer</span>
                    <span className="text-[11px] text-stone-500">Conduct 30-year title search on parent land deed.</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 space-y-0.5">
                    <span className="font-bold text-stone-900 block">3. Verify bank project approval</span>
                    <span className="text-[11px] text-stone-500">Confirm your lender will finance this specific tower.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleOpenSample}
                  className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Explore This Sample in Full Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
