'use client';

import React from 'react';
import { PlusCircle, Wallet, FileCheck, CheckCircle2 } from 'lucide-react';

const workflowSteps = [
  {
    step: '01',
    icon: PlusCircle,
    title: 'Add your property',
    description: 'Paste a listing or enter the basic property details.',
  },
  {
    step: '02',
    icon: Wallet,
    title: 'Tell us about your finances',
    description: 'Add your available funds, income, existing commitments and expected financing.',
  },
  {
    step: '03',
    icon: FileCheck,
    title: 'Review what needs checking',
    description: 'See the documents, costs and property-specific checks relevant to your situation.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Get your next steps',
    description: "See what's missing, what needs professional verification and what to do before committing.",
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
            HOW IT WORKS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            From shortlisted property to clear next steps.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Start with what you already know. Add more information as you get it. HomeCheck organizes the evaluation around your purchase.
          </p>
        </div>

        {/* 4 Product Workflow Steps with Light Blue & Crisp Inner Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200/90 shadow-md shadow-blue-900/5 flex flex-col justify-between relative group hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  {/* Step Number + Icon with Crisp Inner Borders */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-[#EBF4FE] text-blue-800 border border-blue-200/80 shadow-2xs">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  {/* Inner Box with Distinct Border for Description */}
                  <div className="p-3.5 rounded-xl bg-[#F4F9FE] border border-blue-100 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-[11px] font-semibold text-blue-700">
                  <span>Step {idx + 1} of 4</span>
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
