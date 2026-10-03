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
    <section id="what-we-check" className="py-20 md:py-26 bg-[#EAF3FC] relative overflow-hidden border-y border-blue-200/70">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-white/90 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            WHAT WE HELP YOU CHECK
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            The right checks for the property you&apos;re buying.
          </h2>
        </div>

        {/* 3 Light Blue Theme Cards with Inner Content Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {propertyChecks.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-blue-200/90 shadow-md shadow-blue-900/5 flex flex-col justify-between group hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon Box with Crisp Border */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-900 tracking-tight group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    {/* Tags in Inner Bordered Container */}
                    <div className="mt-2 p-2 rounded-xl bg-[#F0F6FD] border border-blue-200/80 text-xs font-semibold text-blue-800">
                      {item.tags}
                    </div>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Highlights list with individual inner borders */}
                  <div className="pt-3 border-t border-blue-100 space-y-2">
                    {item.highlights.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#F8FAFD] border border-blue-100 flex items-center gap-2 text-xs text-stone-700 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => handleSelectType(item.type)}
                    className="w-full py-3 px-4 rounded-xl border-2 border-blue-200 bg-blue-50/70 hover:bg-blue-600 hover:border-blue-600 text-blue-700 hover:text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group-hover:border-blue-500"
                  >
                    <span>Check {item.type} Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

export const PropertyCategoriesSection = WhatWeCheckSection;
