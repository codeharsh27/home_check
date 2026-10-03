'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const ShowcaseSpacesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenShowcase = () => {
    const id = startNewEvaluation({
      ...DEMO_PROPERTY,
      name: 'Lavender Hill Residency',
      location: 'Baner, Pune, Maharashtra',
      price: 8400000,
      bhk: '3 BHK',
      type: 'Apartment',
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              Inspect Every Living Space Before Signing
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md font-normal leading-relaxed">
            Step into negotiations with verified carpet area, sanction plans, and structural due diligence before paying any non-refundable amount.
          </p>
        </div>

        {/* Large Wide Showcase Photo with Overlaid Detail Card */}
        <div className="relative w-full rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] min-h-[380px] bg-stone-900 shadow-xl">
          <Image
            src="/images/showcase.jpg"
            alt="Verified Living Space Showcase"
            fill
            className="object-cover"
          />

          {/* Soft dark gradient at bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Overlaid Floating Card - Bottom Left matching Roofin */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-200/80">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Lavender Hill Residency
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                This verified 3 BHK residence features RERA-compliant carpet area, dual-side ventilation, municipal water supply sanction, and zero encumbrance.
              </p>
            </div>

            {/* Spec Divider Grid */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Size</span>
                <span className="text-xs font-bold text-slate-800">1,450 sqft</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</span>
                <span className="text-xs font-bold text-slate-800 truncate block">Baner, Pune</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Verification</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>5.0 (Passed)</span>
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated EMI</span>
                <span className="text-xs font-bold text-blue-600">₹58,400 / Mo</span>
              </div>
            </div>

            {/* Bottom Card Action and Arrows */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleOpenShowcase}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-4 cursor-pointer"
              >
                Inspect Full Due Diligence File →
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous Showcase"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Next Showcase"
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
