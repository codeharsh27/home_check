'use client';

import React from 'react';
import { Search, Wallet, TrendingUp, ShieldCheck, FileCheck2 } from 'lucide-react';

const workflowSteps = [
  {
    step: '01',
    icon: Search,
    title: 'Automated Intake & Review',
    description: 'Paste a listing URL from Housing, NoBroker, or 99acres. Our engine decodes price, carpet area, BHK, developer, and RERA ID.',
  },
  {
    step: '02',
    icon: Wallet,
    title: 'Intent & Multi-Source Financing',
    description: 'Structure home loan, personal savings, family contributions, and company loans with automated DTI and debt capacity calibration.',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'Market Reality & Comparables',
    description: 'Benchmark asking ₹/sq.ft against locality closes. Inspect nearby alternative projects within 2–4 km and calculate the real handover cash drain.',
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Deep Stage-Gated Investigation',
    description: 'Audit 5 risk dimensions: Title ownership, municipal CC/OC approvals, financial stress, physical snags, and hidden escalations.',
  },
  {
    step: '05',
    icon: FileCheck2,
    title: 'Decision Dossier & Legal Briefing',
    description: 'Printable executive report with stage-gated document checklists, independent lawyer briefing notes, and smart tax-saving strategies.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-26 bg-[#EAF3FC] relative overflow-hidden border-y border-blue-200/70">
      {/* Soft daylight sky glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-white/90 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            THE 5-STEP EVALUATION WORKFLOW
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            From a shortlisted listing to an executive decision dossier.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            HomeCheck guides you through a progressive 5-stage institutional audit — transforming raw marketing claims into actionable legal checklists, cash drain realities, and negotiation power.
          </p>
        </div>

        {/* 5 Product Workflow Steps with Light Blue & Crisp Inner Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-blue-200/90 shadow-md shadow-blue-900/5 flex flex-col justify-between relative group hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  {/* Step Number + Icon with Crisp Inner Borders */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-[#EBF4FE] text-blue-800 border border-blue-200/80 shadow-2xs">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Inner Box with Distinct Border for Description */}
                  <div className="p-3 rounded-xl bg-[#F4F9FE] border border-blue-100 text-xs text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between text-[10px] font-semibold text-blue-700">
                  <span>Step {idx + 1} of 5</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-600 group-hover:scale-125 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
