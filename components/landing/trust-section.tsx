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
    <section className="py-20 md:py-24 bg-[#F5F2EB] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            BUILT FOR BETTER DECISIONS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            We help you prepare. We don&apos;t make the decision for you.
          </h2>
        </div>

        {/* 4 Concise Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    {point.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Trust Statement */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 text-center max-w-2xl mx-auto shadow-sm">
          <p className="text-sm sm:text-base font-bold text-stone-900">
            You make the decision. HomeCheck helps you make it with better information.
          </p>
        </div>

      </div>
    </section>
  );
};
