'use client';

import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Clock, X, ChevronRight } from 'lucide-react';

const guides = [
  {
    tag: 'FINANCIAL UNDERWRITING',
    readTime: '6 min read',
    title: 'The ₹18 Lakh Handover Surprise: Why 80% Bank Loans Fall Short at Possession',
    excerpt: 'Banks strictly cap loans at 80% of the Base Agreement Value. Why statutory duties, advance society corpus, and fitouts cause a severe liquidity crunch at possession.',
    content: `When calculating home affordability, most buyers focus on the 20% down payment (e.g., ₹14L on a ₹70L flat) and assume their bank's 80% sanction handles the rest.

However, RBI lending guidelines prohibit commercial banks from funding statutory registration costs, society deposits, or interior fitouts. Here is what comes due in liquid cash between booking and key handover:

1. Stamp Duty & Registration (6.5% - 7.5%): ₹4.5L - ₹5.2L
2. Society Sinking Fund & 2-Year Advance Maintenance: ₹1.8L - ₹2.5L
3. Mandatory Clubhouse & Infrastructure Cess: ₹2.5L - ₹4L
4. Essential Interior Fitouts (Kitchen, electricals, wardrobes): ₹6L - ₹10L

Total unfinanceable cash required: ₹14.8L - ₹21.7L. Without structured planning, buyers are forced into high-interest personal loans or delaying registration.`,
  },
  {
    tag: 'LEGAL SCRUTINY',
    readTime: '8 min read',
    title: 'How to Verify a 30-Year Encumbrance Certificate (Form 15) in Maharashtra & Karnataka',
    excerpt: 'Why a 10-year search is legally insufficient, how to distinguish Form 15 from Form 16, and the critical steps to uncover unreleased bank consortium mortgages.',
    content: `An Encumbrance Certificate (EC) proves whether a property has any registered financial or legal liabilities.

Form 15 vs. Form 16:
- Form 15 (Nil Encumbrance): Issued when the sub-registrar verifies there are NO registered mortgages, liens, or court attachments during the search window.
- Form 16: Issued when encumbrances DO exist, detailing the lender and outstanding claims.

The 30-Year Rule:
Under the Indian Limitation Act, certain ancestral title claims and government recovery actions can be litigated within 30 years. Any legal search covering only 10 to 12 years leaves you exposed to pre-existing partition disputes or unpaid developer mortgage liens.`,
  },
  {
    tag: 'REGULATORY COMPLIANCE',
    readTime: '5 min read',
    title: 'Commencement Certificate vs Sanction Plan: How to Spot Unsanctioned Floors',
    excerpt: 'Developers frequently sell penthouses and upper floors before municipal sanction is granted. Learn how to verify the CC floor sanction schedule.',
    content: `A Commencement Certificate (CC) issued by the local municipal body (e.g., PMC, BBMP, BMC) is typically released in phases:

Phase 1: Plinth level CC
Phase 2: Up to 10th floor CC
Phase 3: Final terrace floor CC

The Warning Sign:
Builders often market and collect booking advances for units on the 16th floor while their municipal CC is currently sanctioned only up to the 10th floor. If the municipal corporation denies future floor height permissions, buyers face stalled possession or demolition notices.

Always cross-check the exact CC sanction letter Annexure against your specific tower and unit floor number.`,
  },
];

export const BuyerGuidesSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<typeof guides[0] | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-[#08090B] relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
                INSTITUTIONAL FIELD NOTES
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.12]">
              Our most recent articles.
            </h2>
          </div>

          <p className="text-stone-400 font-sans text-sm max-w-sm">
            Due diligence briefs and legal field playbooks written specifically for Indian property buyers.
          </p>
        </div>

        {/* 3 Editorial Cards (Matching Kero AI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {guides.map((guide, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedGuide(guide)}
              className="rounded-3xl bg-[#121316] border border-white/[0.08] hover:border-white/20 p-6 sm:p-7 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Micro thumbnail / header */}
                <div className="h-36 rounded-2xl bg-gradient-to-br from-[#1C1E26] to-[#0E1015] border border-white/[0.04] p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span className="text-blue-400">{guide.tag}</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-stone-300 group-hover:bg-white group-hover:text-stone-900 transition-colors self-end">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-serif text-white group-hover:text-blue-300 transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-stone-400 font-sans leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between text-xs font-mono text-stone-400 group-hover:text-white transition-colors">
                <span>Read Field Guide</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121316] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedGuide(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <span>{selectedGuide.tag}</span>
                <span>·</span>
                <span>{selectedGuide.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight">
                {selectedGuide.title}
              </h2>
            </div>

            <div className="text-sm text-stone-300 font-sans leading-relaxed whitespace-pre-line space-y-4 pt-4 border-t border-white/[0.08]">
              {selectedGuide.content}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs font-mono font-bold hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Close Field Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
