'use client';

import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does HomeCheck calculate my actual funding gap?',
    answer: 'We compute your total capital requirement — adding mandatory 7% stamp duty and registration fees on top of the base agreement value — and cross-reference it against your liquid funds and the RBI maximum 80% home loan ceiling. This pinpoints your exact out-of-pocket deficit before you pay any token money.',
  },
  {
    id: 'faq-2',
    question: 'Does HomeCheck replace my property lawyer or banker?',
    answer: 'No. HomeCheck is a structured due-diligence workspace built to empower you during those discussions. We identify missing title papers, regulatory flags, and lending barriers so that your lawyer and bank can focus on verification rather than starting from scratch.',
  },
  {
    id: 'faq-3',
    question: 'What documents should I ask the seller before paying a booking deposit?',
    answer: 'Always obtain the official RERA registration certificate, sanctioned architectural plan, Commencement Certificate (CC), title search report, draft agreement for sale, and an encumbrance certificate. HomeCheck tracks these directly in your tailored checklist.',
  },
  {
    id: 'faq-4',
    question: 'How does the platform handle regional document differences?',
    answer: 'Property documentation varies significantly across India. HomeCheck automatically swaps checklist parameters — tracking 7/12 extracts and Index II in Maharashtra, A-Khata/B-Khata in Karnataka, or Patta Chitta in Tamil Nadu.',
  },
  {
    id: 'faq-5',
    question: 'Is my personal and financial information secure?',
    answer: 'Yes. All evaluations and financial numbers are stored in your secure workspace with row-level security. We never sell your contact details or shortlisted properties to real estate developers, brokers, or telecallers.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Title & Have other question button */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 font-normal leading-relaxed">
              Clear answers regarding our property verification methodology, lending formulas, and data privacy.
            </p>

            <div className="pt-2">
              <a
                href="#full-intake"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all shadow-sm"
              >
                <span>Have other question?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Accordion matching Roofin */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
