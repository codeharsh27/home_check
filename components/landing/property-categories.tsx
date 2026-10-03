'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore } from '@/store/evaluation';
import { Building2, Home, Landmark, ArrowRight } from 'lucide-react';

const propertyChecks = [
  {
    title: 'APARTMENTS',
    type: 'Apartment' as const,
    tags: 'Ownership · RERA · Approvals · OC · Society',
    description: 'Understand the key information to collect and verify for an apartment or society property.',
    icon: Building2,
    highlights: [
      'Builder title & ownership chain',
      'RERA registration & sanctioned layout',
      'Commencement (CC) & Occupancy (OC) status',
      'Carpet area & society maintenance rules',
    ],
  },
  {
    title: 'VILLAS & ROW HOUSES',
    type: 'Villa' as const,
    tags: 'Land · Construction · Approvals · Utilities',
    description: 'Review the property and construction information relevant to an individual home.',
    icon: Home,
    highlights: [
      'Plot boundary & land demarcation',
      'Sanctioned architectural building plan',
      'Independent water & electricity connections',
      'Mutation extract in seller name',
    ],
  },
  {
    title: 'PLOTS & LAND',
    type: 'Plot' as const,
    tags: 'Title · Land records · Conversion · Zoning',
    description: 'Identify the information you need before evaluating a residential plot or land purchase.',
    icon: Landmark,
    highlights: [
      'Non-Agricultural (NA) conversion order',
      'Revenue records & 30-year ownership history',
      'Zonal master plan & road widening checks',
      'Encumbrance & dispute certificate',
    ],
  },
];

export const WhatWeCheckSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleSelectType = (type: 'Apartment' | 'Villa' | 'Plot') => {
    const id = startNewEvaluation({
      name: `Sample ${type} Evaluation`,
      location: 'Pune, Maharashtra',
      type: type,
      price: type === 'Plot' ? 3500000 : type === 'Villa' ? 12000000 : 6800000,
      sourceName: `${type} Evaluation`,
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="what-we-check" className="py-20 md:py-24 bg-[#F5F2EB] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            WHAT WE HELP YOU CHECK
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            The right checks for the property you&apos;re buying.
          </h2>
        </div>

        {/* 3 Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {propertyChecks.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-700 mt-1">
                      {item.tags}
                    </p>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    {item.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleSelectType(item.type)}
                    className="w-full py-3 px-4 rounded-xl border border-stone-200 text-stone-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/30 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Check {item.type} Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
