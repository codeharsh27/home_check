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
    <section className="py-20 md:py-26 bg-[#EAF3FC] relative overflow-hidden border-y border-blue-200/70">
      {/* Ambient background light */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-white/90 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
            BUILT FOR BETTER DECISIONS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            We help you prepare. We don&apos;t make the decision for you.
          </h2>
        </div>

        {/* 4 Concise Points Grid with Light Blue Theme and Inner Content Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-200/90 shadow-md shadow-blue-900/5 space-y-4 flex flex-col justify-between group hover:border-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Icon Box with Crisp Border */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 pb-2 border-b border-blue-100 group-hover:text-blue-900 transition-colors">
                    {point.title}
                  </h3>

                  {/* Inner Box with Distinct Border */}
                  <div className="p-3.5 rounded-xl bg-[#F4F9FE] border border-blue-100 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {point.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Trust Statement Banner */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-white border-2 border-blue-300 text-center max-w-2xl mx-auto shadow-md">
          <p className="text-sm sm:text-base font-bold text-stone-900 tracking-wide">
            You make the decision. HomeCheck helps you make it with better information.
          </p>
        </div>

      </div>
    </section>
  );
};
