'use client';

import React from 'react';
import { IndianRupee, FileSearch, Compass } from 'lucide-react';

const problemCards = [
  {
    icon: IndianRupee,
    title: 'Can I actually afford it?',
    description: 'Understand your expected down payment, loan requirement and additional purchase costs.',
  },
  {
    icon: FileSearch,
    title: 'What do I need to verify?',
    description: 'Know which documents, approvals and property details still need to be checked.',
  },
  {
    icon: Compass,
    title: 'What should I do next?',
    description: 'See what is missing, who you may need help from, and what to do before committing.',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            BUYING A PROPERTY IS MORE THAN THE PRICE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            You found the property. Now what?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            A listing can tell you the price, area and amenities. It doesn&apos;t tell you whether you can comfortably fund the purchase, what documents you still need, or what should happen before you pay.
          </p>
        </div>

        {/* 3 Simple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problemCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
