'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore } from '@/store/evaluation';
import { Building2, Home, Landmark, ArrowRight, ListChecks } from 'lucide-react';

interface CategoryCard {
  id: string;
  title: string;
  type: 'Apartment' | 'Villa' | 'Plot';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  buttonText: string;
  checksCount: string;
  checks: string[];
}

const categories: CategoryCard[] = [
  {
    id: 'cat-apartments',
    title: 'Apartments & Societies',
    type: 'Apartment',
    description: 'Tracks society Occupancy Certificate (OC), RERA carpet area audit, undivided share of land (UDS), and maintenance fund provisions.',
    icon: Building2,
    buttonText: 'Start Apartment Checklist',
    checksCount: '24 Checkpoints',
    checks: ['RERA Carpet Area vs Built-up Audit', 'Society OC & Building Sanctions', 'Undivided Land Share (UDS) Ratio', 'Maintenance & Advance Dues Check'],
  },
  {
    id: 'cat-villas',
    title: 'Villas & Row Houses',
    type: 'Villa',
    description: 'Focuses on individual plot boundary survey, sanctioned structural plans, mutation extract, and independent utility meter rights.',
    icon: Home,
    buttonText: 'Start Villa Checklist',
    checksCount: '28 Checkpoints',
    checks: ['Plot Demarcation & Survey Boundary', 'Sanctioned Floor Construction Drawings', 'Mutation Extract in Buyer Name', 'Independent Water & Power Meters'],
  },
  {
    id: 'cat-plots',
    title: 'Residential Plots & Land',
    type: 'Plot',
    description: 'Validates Non-Agricultural (NA) conversion order, 30-year 7/12 land history chain, encumbrance status, and master plan zoning.',
    icon: Landmark,
    buttonText: 'Start Plot Checklist',
    checksCount: '22 Checkpoints',
    checks: ['NA Conversion Order (NA-47/Collector)', '30-Year Encumbrance History', 'Town Planning Sanctioned Layout', 'Zonal Master Plan Road Widening Check'],
  },
];

export const PropertyCategoriesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleSelectCategory = (type: 'Apartment' | 'Villa' | 'Plot') => {
    const id = startNewEvaluation({
      name: `Shortlisted ${type}`,
      location: 'Pune, Maharashtra',
      type: type,
      price: type === 'Plot' ? 3500000 : type === 'Villa' ? 12000000 : 7000000,
      sourceName: `${type} Due Diligence Checklist`,
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="categories" className="py-20 md:py-28 bg-[#F5F2EB] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold mb-2">
              <ListChecks className="w-3.5 h-3.5 text-blue-600" />
              <span>STAGE-AWARE DUE DILIGENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              Different Properties. Completely Different Checklists.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md font-normal leading-relaxed">
            A high-rise flat has completely different legal requirements than an open plot or standalone bungalow. HomeCheck configures your checklist to match the exact property type.
          </p>
        </div>

        {/* 3 Clean Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Architectural Visual Block */}
                  <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-stone-50 to-blue-50/40 border border-stone-100 flex flex-col items-center justify-center p-6 relative overflow-hidden mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-stone-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 stroke-[1.75]" />
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-stone-700 shadow-sm border border-stone-100">
                      <span>{cat.checksCount}</span>
                    </div>

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-normal mb-5">
                    {cat.description}
                  </p>

                  {/* Check list pills */}
                  <div className="space-y-2 mb-6">
                    {cat.checks.map((check, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outline Action Button */}
                <button
                  type="button"
                  onClick={() => handleSelectCategory(cat.type)}
                  className="w-full py-3 px-4 rounded-xl border border-stone-200 text-stone-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/30 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{cat.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
