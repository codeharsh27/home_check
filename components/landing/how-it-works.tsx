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
    <section id="how-it-works" className="py-20 md:py-26 bg-[#0B1528] relative overflow-hidden border-y border-blue-950/80">
      {/* Ambient background glow for high-end SaaS feel */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-400 bg-blue-950/90 px-3.5 py-1 rounded-full border border-blue-600/40 inline-block mb-3 backdrop-blur-sm shadow-sm">
            HOW IT WORKS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-[1.12]">
            From shortlisted property to clear next steps.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-blue-200/80 font-normal leading-relaxed">
            Start with what you already know. Add more information as you get it. HomeCheck organizes the evaluation around your purchase.
          </p>
        </div>

        {/* 4 Product Workflow Steps with Blue Theme & Inner Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#0F223D]/90 rounded-3xl p-6 sm:p-7 border-2 border-blue-800/60 shadow-xl shadow-black/30 flex flex-col justify-between relative group hover:border-blue-400/80 hover:bg-[#132A4B] hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  {/* Step Number + Icon with Crisp Inner Borders */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-[#091526] text-blue-300 border border-blue-700/60 shadow-inner">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>

                  {/* Inner Box with Distinct Border for Description */}
                  <div className="p-3.5 rounded-xl bg-[#091526]/80 border border-blue-900/70 text-xs sm:text-sm text-blue-100/80 leading-relaxed font-normal">
                    {item.description}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-800/50 flex items-center justify-between text-[11px] font-semibold text-blue-400/80">
                  <span>Step {idx + 1} of 4</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500/60 group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
