'use client';

import React from 'react';
import { ShieldCheck, Scale, Landmark, BarChart2 } from 'lucide-react';

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'NOT A BROKER',
    description: "We don't sell properties or influence which property you choose.",
  },
  {
    icon: Scale,
    title: 'NOT A LAWYER',
    description: 'We organize checks, but legal verification should be done by a qualified professional.',
  },
  {
    icon: Landmark,
    title: 'NOT A BANK',
    description: 'Loan calculations are estimates. Final eligibility comes from your lender.',
  },
  {
    icon: BarChart2,
    title: 'NOT A PROPERTY RATING',
    description: "We don't tell you \"buy\" or \"don't buy.\"",
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 md:py-26 bg-[#091526] relative overflow-hidden border-y border-blue-950/80">
      {/* Ambient background light */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-400 bg-blue-950/90 px-3.5 py-1 rounded-full border border-blue-600/40 inline-block mb-3 backdrop-blur-sm">
            BUILT FOR BETTER DECISIONS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-[1.12]">
            We help you prepare. We don&apos;t make the decision for you.
          </h2>
        </div>

        {/* 4 Concise Points Grid with Blue Theme and Inner Content Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="bg-[#0F223D]/90 rounded-3xl p-6 sm:p-7 border-2 border-blue-800/60 shadow-xl shadow-black/30 space-y-4 flex flex-col justify-between group hover:border-blue-400/80 hover:bg-[#132A4B] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon Box with Crisp Border */}
                  <div className="w-12 h-12 rounded-2xl bg-[#091526] border border-blue-600/40 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:border-blue-400 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300 pb-2 border-b border-blue-800/60 group-hover:text-white transition-colors">
                    {point.title}
                  </h3>

                  {/* Inner Box with Distinct Border */}
                  <div className="p-3.5 rounded-xl bg-[#091526]/70 border border-blue-900/60 text-xs sm:text-sm text-blue-100/80 leading-relaxed font-normal">
                    {point.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Trust Statement Banner */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-[#0E1F36] border-2 border-blue-700/60 text-center max-w-2xl mx-auto shadow-2xl backdrop-blur-sm">
          <p className="text-sm sm:text-base font-bold text-white tracking-wide">
            You make the decision. HomeCheck helps you make it with better information.
          </p>
        </div>

      </div>
    </section>
  );
};
