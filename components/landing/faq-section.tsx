'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the property link extraction work?',
    answer:
      'Paste any property listing URL from Housing.com, NoBroker, 99acres, MagicBricks, or SquareYards. Our multi-tiered extraction pipeline decodes the project name, developer, quoted price, RERA carpet area, BHK, micro-market locality, and RERA registration ID automatically. You can review and adjust any details in Step 1.',
  },
  {
    id: 'faq-2',
    question: 'Why is the true handover cash outflow higher than the quoted down payment?',
    answer:
      'Banks cap home loans at 80% of the Base Agreement Value only. Banks NEVER fund stamp duty, registration fees, 1–2 years of advance society maintenance corpus, or interior fitouts. These statutory and developer charges require ₹15L–₹25L in liquid savings on top of your loan down payment.',
  },
  {
    id: 'faq-3',
    question: 'What is the stage-gated document verification roadmap?',
    answer:
      'Real estate transactions in India operate in 3 distinct risk stages: Stage 1 (Pre-Token advance under ₹50k), Stage 2 (Pre-Agreement execution before paying 10%–20%), and Stage 3 (Pre-Possession and key handover). HomeCheck specifies which documents to inspect at each milestone and highlights when an independent advocate or structural engineer is mandatory.',
  },
  {
    id: 'faq-4',
    question: 'When should I hire an independent property advocate?',
    answer:
      'At Stage 2, before signing the registered Agreement for Sale. Never rely on the builder’s legal team or the home loan bank’s advocate. Bank advocates only verify whether the land can be mortgaged to recover bank funds; they do not audit unfair one-sided possession delay clauses or consumer protections for the buyer.',
  },
  {
    id: 'faq-5',
    question: 'How does HomeCheck find nearby comparable properties?',
    answer:
      'We isolate your exact micro-market and search verified residential developments strictly within a 2–4 km radius. We benchmark asking ₹/sq.ft against live locality transaction closes, providing verified listings so you can negotiate down floor-rise and preferred location charges (PLC).',
  },
  {
    id: 'faq-6',
    question: 'Can I print or save the final evaluation report as a PDF?',
    answer:
      'Yes. Step 5 produces an Executive Property Decision Dossier styled specifically for desktop printing or saving as a PDF. It includes the stage-gated document checklist, independent lawyer briefing notes, floating rate hike stress test, and 5 exact negotiation questions for the builder sales manager.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Questions before you evaluate a property?
          </h2>
        </div>

        {/* Accordion List with Inner Content Borders & Transitions */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border-2 transition-all duration-300 bg-white shadow-sm overflow-hidden ${
                  isOpen
                    ? 'border-blue-500/80 shadow-md ring-2 ring-blue-500/10'
                    : 'border-stone-200/90 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-stone-50/60 transition-colors cursor-pointer group"
                >
                  <span className={`text-sm sm:text-base font-bold pr-4 transition-colors ${
                    isOpen ? 'text-blue-700' : 'text-stone-900 group-hover:text-blue-600'
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-blue-600 border-blue-600 text-white rotate-180'
                      : 'bg-stone-50 border-stone-200 text-stone-600 group-hover:border-blue-300'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
