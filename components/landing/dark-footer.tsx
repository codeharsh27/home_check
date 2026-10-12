'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { BrandMark } from '@/components/layout/nav';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

type LegalDocKey = 'privacy' | 'terms' | 'disclaimer' | null;

const legalContent: Record<
  Exclude<LegalDocKey, null>,
  { title: string; updated: string; paragraphs: string[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    paragraphs: [
      'HomeCheck is built with a strict buyer-first privacy architecture. We do not sell, rent, or share your shortlisted property URLs, financial assumptions, or personal contact details with real estate brokers, developers, or telemarketing agencies.',
      'By default, your property evaluation workspace is stored locally in your browser session. If you choose to sign in for cloud sync, your evaluations are stored securely under your private account.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'October 2026',
    paragraphs: [
      'HomeCheck provides structured property due-diligence software, financial stress-testing calculators, and stage-gated legal verification checklists for Indian residential homebuyers.',
      'You retain full ownership of all notes, documents, and evaluation dossiers generated within your workspace.',
    ],
  },
  disclaimer: {
    title: 'Legal & Underwriting Disclaimer',
    updated: 'October 2026',
    paragraphs: [
      'HomeCheck is an independent quantitative decision-support tool and does not constitute formal legal representation or a certified Title Search Report by a Bar Council advocate.',
      'Before releasing significant booking funds or signing an Agreement for Sale, always have a qualified property advocate verify the physical 30-year Encumbrance Certificate (Form 15/16) and Municipal Commencement Certificate.',
    ],
  },
};

export const DarkFooter: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalDocKey>(null);

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#fafafa0f] relative overflow-hidden pt-14 sm:pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Top Row: Left Brand + Right 3 Columns (1:1 Kero AI) */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12">
          {/* Left Column */}
          <div className="flex-1 max-w-[300px]">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <BrandMark className="w-7 h-7" />
            </Link>
            <p className="text-[13px] text-[#a1a1a1] leading-[1.6]">
              Structured property diligence, built for buyers.
            </p>
          </div>

          {/* Right 3 Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-16">
            <div>
              <h4 className="text-[12px] font-medium text-[#fafafa] mb-3.5">Product</h4>
              <ul className="space-y-2.5 text-[13px] text-[#a1a1a1]">
                <li>
                  <a href="#pricing" className="hover:text-[#fafafa] transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#what-we-check" className="hover:text-[#fafafa] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLoadDemo}
                    className="hover:text-[#fafafa] transition-colors cursor-pointer"
                  >
                    Decision Dossier
                  </button>
                </li>
                <li>
                  <a href="#hero-intake" className="hover:text-[#fafafa] transition-colors">
                    Try for Free
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-medium text-[#fafafa] mb-3.5">Utility</h4>
              <ul className="space-y-2.5 text-[13px] text-[#a1a1a1]">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('privacy')}
                    className="hover:text-[#fafafa] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('terms')}
                    className="hover:text-[#fafafa] transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('disclaimer')}
                    className="hover:text-[#fafafa] transition-colors cursor-pointer"
                  >
                    Legal Disclaimer
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[12px] font-medium text-[#fafafa] mb-3.5">Company &amp; Case Study</h4>
              <ul className="space-y-2.5 text-[13px] text-[#a1a1a1]">
                <li>
                  <a
                    href="https://harshmule.vercel.app/project/homecheck?lens=pm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fafafa] hover:text-[#bda96d] transition-colors font-medium"
                  >
                    PM Case Study ↗
                  </a>
                </li>
                <li>
                  <a href="#guides" className="hover:text-[#fafafa] transition-colors">
                    Buyer Guides
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLoadDemo}
                    className="hover:text-[#fafafa] transition-colors cursor-pointer"
                  >
                    Sample Audit
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant Hedvig Letters Serif Wordmark (1:1 Kero AI Footer Centerpiece) */}
        <div className="w-full overflow-hidden flex items-center justify-center py-2 sm:py-4 select-none pointer-events-none">
          <span
            className="font-serif font-normal text-[#1c1c1c] leading-[0.88] tracking-[-0.04em] text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(4.2rem, 15.5vw, 13.5rem)' }}
          >
            HomeCheck
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#fafafa0f] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#828282]">
          <span>© 2026 HomeCheck. Built by Harsh Mule.</span>
          <div className="flex items-center gap-6">
            <a
              href="https://harshmule.vercel.app/project/homecheck?lens=pm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4d4d4] hover:text-[#fafafa] transition-colors"
            >
              Read PM Case Study ↗
            </a>
            <button
              type="button"
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#fafafa] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-[#fafafa] transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
        </div>
      </div>

      {/* Exact Kero AI Bottom Blur Glow (width: 467px, height: 234px, blur(100px)) */}
      <div
        className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -bottom-28 w-[467px] h-[234px] rounded-full opacity-55"
        style={{
          background:
            'linear-gradient(124deg, rgba(102, 145, 163, 0.8) 0%, rgba(189, 169, 109, 0.32) 68.9%, #d7cb94 100%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Legal Reader Modal */}
      {activeLegalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-lg bg-[#171717] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 text-[#fafafa] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#ffffff14] mb-4">
              <div>
                <h3 className="font-serif text-xl text-[#fafafa]">
                  {legalContent[activeLegalModal].title}
                </h3>
                <span className="text-[11px] text-[#828282]">
                  Last updated: {legalContent[activeLegalModal].updated}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="w-8 h-8 rounded-full bg-[#262626] hover:bg-white/15 flex items-center justify-center text-[#a1a1a1] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3.5 text-[13px] text-[#a1a1a1] leading-[1.65]">
              {legalContent[activeLegalModal].paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
