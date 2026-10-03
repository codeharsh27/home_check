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

        {/* 3 Simple Cards with Inner Content Borders and Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problemCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-stone-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Icon Box with Crisp Border */}
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 border-2 border-stone-200 text-stone-800 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  {/* Inner Content Box with Distinct Border */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-sm text-stone-600 leading-relaxed font-normal">
                    {card.description}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-400 group-hover:text-blue-600 transition-colors">
                  <span>Key Consideration</span>
                  <span className="font-mono text-[11px] bg-stone-100 px-2 py-0.5 rounded border border-stone-200 text-stone-600">0{i + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
