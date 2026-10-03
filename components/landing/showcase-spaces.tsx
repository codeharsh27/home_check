'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ChevronLeft, ChevronRight, CheckCircle, ShieldAlert } from 'lucide-react';

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>BEYOND SALES BROCHURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              Brochures Highlight Amenities. HomeCheck Tracks What’s Missing.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md font-normal leading-relaxed">
            A developer brochure will show swimming pools and Italian marble, but rarely reveals unconfirmed completion certificates or pending municipal water lines. We track what actually matters.
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Overlaid Floating Card - Bottom Left */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-200/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready-to-Move Society
                </span>
                <span className="text-[11px] text-stone-500 font-mono">ID: HC-PUNE-84</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Lavender Hill Residency (3 BHK Sample Audit)
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                Clear Occupancy Certificate (OC) received, 7% stamp duty calculated at ₹5,88,000, and 16 of 20 legal title documents cataloged and checked.
              </p>
            </div>

            {/* Spec Divider Grid */}
            <div className="mt-4 pt-3 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Price</span>
                <span className="text-xs font-bold text-stone-800">₹84,00,000</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Stamp Duty (7%)</span>
                <span className="text-xs font-bold text-stone-800">₹5,88,000</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Paperwork Status</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>16/20 Checked</span>
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Est. Bank EMI</span>
                <span className="text-xs font-bold text-blue-600">₹58,400 / Mo</span>
              </div>
            </div>

            {/* Bottom Card Action and Arrows */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleOpenShowcase}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-4 cursor-pointer"
              >
                Inspect Sample Due Diligence Workspace →
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous Showcase"
                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Next Showcase"
                  className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
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
