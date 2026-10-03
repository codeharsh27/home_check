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
    question: 'Do I need property documents to get started?',
    answer: 'No. You can start with a property listing or basic property information. As you receive documents from the seller or developer, you can add them to continue your evaluation.',
  },
  {
    id: 'faq-2',
    question: 'Can I use a property listing from a real estate portal?',
    answer: "Yes. You can start with a listing URL or manually enter the property's basic details.",
  },
  {
    id: 'faq-3',
    question: 'Does HomeCheck verify whether a property is legally safe?',
    answer: 'No. HomeCheck helps organize the checks and identify missing information. Legal verification should be performed by a qualified property lawyer or appropriate professional.',
  },
  {
    id: 'faq-4',
    question: 'Does HomeCheck replace a property lawyer or bank?',
    answer: 'No. HomeCheck is a decision-support workspace. It helps you prepare questions, information and next steps before speaking with professionals.',
  },
  {
    id: 'faq-5',
    question: 'Does HomeCheck tell me whether I should buy?',
    answer: 'No. HomeCheck helps you understand affordability, missing information, verification needs and next steps. The final decision remains with the buyer.',
  },
  {
    id: 'faq-6',
    question: 'Can HomeCheck guarantee my home loan?',
    answer: "No. Financing calculations are estimates. Final eligibility, loan amount, interest rate and approval depend on the lender and the buyer's application.",
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
            FAQ
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-stone-900 leading-[1.12]">
            Questions before you start?
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-stone-200/90 overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-stone-50/60 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-stone-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-600">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
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
