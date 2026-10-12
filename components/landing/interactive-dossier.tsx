'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUp,
  Check,
  Layers,
  ShieldCheck,
  Sparkles,
  FileText,
  Compass,
  Scale,
} from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

type ShowcaseTab = 'intake' | 'cost' | 'legal' | 'report';

const tabContent: Record<
  ShowcaseTab,
  {
    label: string;
    prompt: string;
    agentTag: string;
    metricBadge: string;
    bgImage: string;
  }
> = {
  intake: {
    label: '1. Intake & Budget',
    prompt:
      'Step 1 & 2: Paste your shortlisted listing URL or enter property details manually, then add your liquid savings, monthly income, and co-owner preferences.',
    agentTag: 'Steps 1–2 · Property & Wallet',
    metricBadge: 'STEP 1–2',
    bgImage: '/images/landing/bento-villa.jpg',
  },
  cost: {
    label: '2. True Cost & EMI',
    prompt:
      'Step 3: See your True Acquisition Cost (Base + Stamp Duty + GST + Society Corpus), liquid cash shortfall or surplus, and +1.25% RBI rate-hike stress test.',
    agentTag: 'Step 3 · Financial Reality',
    metricBadge: 'STEP 3',
    bgImage: '/images/landing/engine-courtyard.jpg',
  },
  legal: {
    label: '3. State Legal Gates',
    prompt:
      'Step 4: Review a state-specific checklist (MH, KA, TN, Delhi-NCR) separating free documents to demand from the builder vs. what requires a property lawyer.',
    agentTag: 'Step 4 · Regional Checklist',
    metricBadge: 'STEP 4',
    bgImage: '/images/hero_property.jpg',
  },
  report: {
    label: '4. Printable Report',
    prompt:
      'Step 5: Generate a stage-gated verification roadmap (Pre-Token, Pre-Agreement, Possession Snagging) and print or save your PDF decision brief.',
    agentTag: 'Step 5 · Decision Report',
    metricBadge: 'STEP 5',
    bgImage: '/images/landing/engine-skyline.jpg',
  },
};

const sixGridFeatures = [
  {
    icon: Layers,
    title: 'URL & Manual Intake',
    description:
      'Start by pasting a listing link from major property portals or entering project details directly.',
  },
  {
    icon: Sparkles,
    title: 'Co-Owner & Loan Setup',
    description:
      'Account for joint applicants, female co-owner stamp-duty concessions, and personal vs. loan funds.',
  },
  {
    icon: FileText,
    title: 'Cash Shortfall Alert',
    description:
      'Compare your available liquid savings against the non-loanable down payment and statutory duties.',
  },
  {
    icon: Compass,
    title: 'Locality Alternatives',
    description:
      'View comparable residential projects in the same locality and budget alongside your shortlisted unit.',
  },
  {
    icon: ShieldCheck,
    title: 'State-Aware Checklists',
    description:
      'Tailored document guides for Maharashtra (7/12 Utara), Karnataka (A-Khata), Tamil Nadu (Patta), and NCR.',
  },
  {
    icon: Scale,
    title: 'Print-Ready PDF Brief',
    description:
      'Export a clean, structured checklist to carry to the builder sales office or share with your property lawyer.',
  },
];

export const InteractiveDossierSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('intake');

  const handleOpenDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  const current = tabContent[activeTab];

  return (
    <section id="sample-evaluation" className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 1. Top Decorative Monochrome Architectural Horizon Vignette */}
        <div className="max-w-[760px] mx-auto mb-10 sm:mb-12 flex justify-center">
          <img
            src="/images/landing/vignette-top.jpg"
            alt="Monochrome architectural roof silhouette and misty horizon"
            className="w-full max-w-[680px] h-auto object-contain opacity-95 select-none pointer-events-none rounded-full"
          />
        </div>

        {/* 2. 4-Line Editorial Manifesto in Hedvig Letters Serif */}
        <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-[28px] sm:text-[38px] md:text-[42px] font-normal tracking-[-0.02em] text-[#fafafa] leading-[1.22]">
            Buying a home shouldn’t mean guessing across scattered spreadsheets, WhatsApp PDFs, and broker promises. We built a structured 5-step workspace to help you evaluate any property clearly.
          </h2>
        </div>

        {/* 3. 4 Interactive Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 sm:mb-12">
          {(Object.keys(tabContent) as ShowcaseTab[]).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#fafafa] text-[#0a0a0a] shadow-sm'
                    : 'bg-[#171717] hover:bg-[#262626] text-[#a1a1a1] hover:text-[#fafafa] border border-[#ffffff14]'
                }`}
              >
                {tabContent[key].label}
              </button>
            );
          })}
        </div>

        {/* 4. Centered Twilight Architectural Showcase Card */}
        <div className="max-w-[820px] mx-auto">
          <div
            onClick={handleOpenDemo}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden border border-[#ffffff14] flex flex-col items-center justify-center p-6 sm:p-10 cursor-pointer group"
          >
            {/* Local Twilight Architectural Background */}
            <img
              src={current.bgImage}
              alt={current.label}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/35" />

            {/* Floating Glassmorphic Step Seal */}
            <div className="relative z-10 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full mb-5 bg-[#171717]/80 backdrop-blur-2xl border border-white/30 shadow-[0_14px_40px_rgba(0,0,0,0.65)] flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#fafafa] to-[#d4d4d4] text-[#0a0a0a] flex flex-col items-center justify-center shadow-inner">
                <span className="font-serif text-[11px] sm:text-[12px] font-bold tracking-tight leading-none">
                  {current.metricBadge}
                </span>
                <span className="text-[7px] font-mono uppercase tracking-wider mt-0.5 text-[#0a0a0a]/70">
                  WORKSPACE
                </span>
              </div>
            </div>

            {/* Frosted Glass Interactive Bar */}
            <div className="relative z-10 w-full max-w-[460px] rounded-2xl bg-[#171717]/80 backdrop-blur-2xl border border-white/15 p-4 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
              <p className="text-[13px] sm:text-[14px] text-[#e5e5e5] leading-[1.5] mb-4">
                {current.prompt}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-[11px] font-medium text-[#fafafa]">
                  <span>{current.agentTag}</span>
                  <Check className="w-3 h-3 text-[#96a766]" />
                </div>

                <div
                  title="Open live sample workspace"
                  className="w-7 h-7 rounded-full bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform"
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 6-Item Feature Grid Below (2 Rows × 3 Columns) */}
        <div className="max-w-[980px] mx-auto mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {sixGridFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="flex flex-col items-center text-center px-2"
              >
                <div className="w-9 h-9 rounded-lg bg-[#171717] border border-[#262626] flex items-center justify-center text-[#e5e5e5] mb-3.5 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-[14px] font-medium text-[#fafafa] tracking-[-0.01em] mb-1.5">
                  {feat.title}
                </h4>
                <p className="text-[13px] text-[#828282] leading-[1.55] max-w-[260px]">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
