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
    <section id="how-it-works" className="py-20 md:py-24 bg-[#F5F2EB] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            HOW IT WORKS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            From shortlisted property to clear next steps.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Start with what you already know. Add more information as you get it. HomeCheck organizes the evaluation around your purchase.
          </p>
        </div>

        {/* 4 Product Workflow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between relative group hover:border-blue-300 transition-colors"
              >
                <div>
                  {/* Step Number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-200/60">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-[11px] font-semibold text-stone-400">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
