'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore } from '@/store/evaluation';
import { Building2, Home, Landmark, ArrowRight } from 'lucide-react';

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
    description: 'Verify Occupancy Certificate (OC), RERA carpet area ratio, undivided share of land (UDS), and builder-buyer maintenance covenants.',
    icon: Building2,
    buttonText: 'Browse Apartment Checklist',
    checksCount: '24 Checkpoints',
    checks: ['RERA Carpet Audit', 'Society OC & Fire NOC', 'UDS Ratio Check', 'Lift & Water Sanctions'],
  },
  {
    id: 'cat-villas',
    title: 'Villas & Row Houses',
    type: 'Villa',
    description: 'Inspect independent plot demarcation, sanctioned structural drawings, municipal mutation extract, and dedicated utility meters.',
    icon: Home,
    buttonText: 'Browse Villa Checklist',
    checksCount: '28 Checkpoints',
    checks: ['Plot Demarcation Boundary', 'Sanctioned Floor Plans', 'Mutation Extract', 'Water / Borewell Rights'],
  },
  {
    id: 'cat-plots',
    title: 'Plots & Land Parcells',
    type: 'Plot',
    description: 'Validate Non-Agricultural (NA-47) conversion order, 30-year 7/12 extract chain, encumbrance certificate, and master zoning compliance.',
    icon: Landmark,
    buttonText: 'Browse Plot Checklist',
    checksCount: '22 Checkpoints',
    checks: ['NA Conversion Order', '30-Year Encumbrance', 'Zonal Master Plan Check', 'Layout Sanction Map'],
  },
];

export const PropertyCategoriesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleSelectCategory = (type: 'Apartment' | 'Villa' | 'Plot') => {
    const id = startNewEvaluation({
      name: `Sample ${type} Evaluation`,
      location: 'Pune, Maharashtra',
      type: type,
      price: type === 'Plot' ? 3500000 : type === 'Villa' ? 12000000 : 7000000,
      sourceName: `${type} Due Diligence`,
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="categories" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Tailored Due Diligence by Property Type
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md font-normal leading-relaxed">
            Different property types carry entirely different financial and legal risks. Our engine selects the exact checklist automatically.
          </p>
        </div>

        {/* 3 Clean Architectural Cards - Matching Roofin Isometric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Architectural Visual Block */}
                  <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 stroke-[1.75]" />
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
                      <span>{cat.checksCount}</span>
                    </div>

                    {/* Subtle grid lines in background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-5">
                    {cat.description}
                  </p>

                  {/* Check list pills */}
                  <div className="space-y-1.5 mb-6">
                    {cat.checks.map((check, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
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
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/30 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
