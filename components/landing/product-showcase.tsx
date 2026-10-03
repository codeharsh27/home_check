'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, CheckCircle2, AlertCircle, FileText, IndianRupee, Layers } from 'lucide-react';

export const ProductShowcaseSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            YOUR PROPERTY EVALUATION
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Everything you need to evaluate one property.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Keep the property&apos;s financial picture, document checklist and next steps together in one place.
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
                homecheck.in/evaluation/sample-property
              </span>
            </div>
            <button
              onClick={handleOpenDemo}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Open Interactive Demo</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Product UI View - Authentic Screenshot & Structured Layout */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top Row: Property Snapshot */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
              <div>
                <span className="text-[11px] font-mono font-semibold text-stone-500 uppercase tracking-wider block">
                  Property Snapshot
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  Green Valley Residency · 2 BHK
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Wakad, Pune · 1,050 sqft Carpet · Quoted: ₹68,00,000
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] font-medium text-stone-500 block">Expected Amount to Arrange</span>
                <span className="text-xl font-extrabold text-stone-900 font-mono">
                  ~₹18,36,000
                </span>
                <span className="text-[11px] text-amber-700 block font-medium">Down payment + Stamp duty</span>
              </div>
            </div>

            {/* Middle Grid: The 4 Evaluation Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Block 1: Financial Summary */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                  <span>Financial Picture</span>
                </div>
                <div className="space-y-1 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span className="font-semibold text-stone-900">₹68.0L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stamp Duty &amp; Reg:</span>
                    <span className="font-semibold text-stone-900">~₹4.76L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Loan (80%):</span>
                    <span className="font-semibold text-blue-600">₹54.4L</span>
                  </div>
                </div>
              </div>

              {/* Block 2: Documents & Checks */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Documents Checked</span>
                </div>
                <div className="space-y-1 text-xs text-stone-600">
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> RERA Registration
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Sanctioned Plan
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Commencement Cert (CC)
                  </p>
                </div>
              </div>

              {/* Block 3: Missing Information */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Still Missing</span>
                </div>
                <div className="space-y-1 text-xs text-stone-600">
                  <p className="flex items-center gap-1.5 text-amber-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Occupancy Cert (OC)
                  </p>
                  <p className="flex items-center gap-1.5 text-amber-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Encumbrance Cert
                  </p>
                  <p className="flex items-center gap-1.5 text-amber-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Society Maintenance Dues
                  </p>
                </div>
              </div>

              {/* Block 4: Next Steps */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>Next Actions</span>
                </div>
                <div className="space-y-1 text-xs text-stone-600">
                  <p className="text-stone-700">1. Ask seller for draft Agreement</p>
                  <p className="text-stone-700">2. Request lawyer for title search</p>
                  <p className="text-stone-700">3. Check lender pre-approval</p>
                </div>
              </div>

            </div>

            {/* Bottom Real Mockup Image Preview */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200 aspect-[16/8] sm:aspect-[21/9]">
              <Image
                src="/product-mockup.jpg"
                alt="HomeCheck Evaluation Dashboard Interface"
                fill
                className="object-cover object-top"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
