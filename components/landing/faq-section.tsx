'use client';

import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Does HomeCheck replace my property lawyer or banker?',
    answer: 'No, absolutely not. HomeCheck is a structured decision-support workspace. We calculate your real funding gap, highlight unverified documents, and generate the exact questions you should ask. We prepare you so that when you consult a lawyer or apply to a bank, you walk in fully informed rather than relying blindly on the seller’s pitch.',
  },
  {
    id: 'faq-2',
    question: 'How does the funding gap calculation work?',
    answer: 'We compute your total acquisition cost — adding mandatory 7% government stamp duty and registration fees to the quoted agreement value — and cross-reference it against the RBI 80% maximum bank loan limit and your available savings. Any shortfall between your available funds and the required cash outlay is flagged as your funding gap.',
  },
  {
    id: 'faq-3',
    question: 'What if I only have a listing URL and no legal papers yet?',
    answer: 'That is where almost every buyer begins. Paste the listing link from MagicBricks, 99acres, NoBroker, or Housing. HomeCheck structures the property details and generates an itemized "What to Demand from the Builder" checklist so you know which documents to ask for before handing over a single rupee.',
  },
  {
    id: 'faq-4',
    question: 'Why doesn’t a bank home loan fund stamp duty and registration?',
    answer: 'Under Reserve Bank of India (RBI) prudential guidelines, banks are strictly prohibited from including stamp duty, registration charges, and statutory taxes in the Loan-to-Value (LTV) ratio calculation. Banks only fund up to 80% of the property value — the remaining 20% down payment plus the entire ~7% government fee must come directly from your pocket in cash.',
  },
  {
    id: 'faq-5',
    question: 'Is HomeCheck affiliated with any broker or developer?',
    answer: 'No. HomeCheck is 100% independent. We do not list properties for sale, accept developer advertising, or take broker referral cuts. We also never sell your contact information to pushy telecallers or marketing agencies.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Title & Have other question button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Straight Answers to Real Buyer Doubts
            </h2>
            <p className="text-sm text-stone-600 font-normal leading-relaxed">
              Clear, honest explanations about what our tool does, how our lending math works, and why we do not sell property.
            </p>

            <div className="pt-2">
              <a
                href="#full-intake"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 text-xs font-semibold text-stone-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all shadow-sm"
              >
                <span>Evaluate a Shortlisted Property</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Accordion */}
          <div className="lg:col-span-7 space-y-3">
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
      </div>
    </section>
  );
};
