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
    question: 'How does the property link intake work?',
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

export const DarkFAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#0A0B0E] relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.12]">
            Questions serious buyers ask.
          </h2>

          <p className="text-stone-400 font-sans text-sm sm:text-base">
            Everything you need to know about our independent property diligence framework.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#121316] border border-white/[0.06] hover:border-white/10 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-serif text-white font-normal leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-stone-400 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-stone-400 font-sans leading-relaxed border-t border-white/[0.04]">
                    {faq.answer}
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
