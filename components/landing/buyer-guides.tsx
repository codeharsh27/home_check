'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight, BookOpen } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

interface Article {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  tag: string;
  readTime: string;
  summary: string;
  sections: { heading: string; body: string }[];
}

const articles: Article[] = [
  {
    id: 'handover-cash-drain-2026',
    title: 'The ₹18L Handover Surprise: Why 80% Bank Loans Fall Short at Possession',
    category: 'Financial Diligence Guide',
    thumbnail: '/images/landing/engine-courtyard.jpg',
    tag: 'Possession Liquidity',
    readTime: '6 min read',
    summary:
      'Why your bank’s 80% LTV sanction letter only covers the base agreement value — leaving Stamp Duty, GST, Society Corpus, and Meter Deposits 100% out-of-pocket.',
    sections: [
      {
        heading: '1. The Illusion of "20% Down Payment"',
        body: 'When a developer quotes ₹68 Lakhs for a 2BHK and your banker promises an 80% home loan (₹54.40 Lakhs), most first-time buyers assume they only need ₹13.60 Lakhs in savings. In reality, RBI guidelines strictly prohibit banks from financing statutory taxes and builder possession levies.',
      },
      {
        heading: '2. The Non-Loanable Possession Stack',
        body: 'Before the keys are handed over, you must pay 6%–7% Stamp Duty & Registration (₹4.76 Lakhs), 24-month Advance Maintenance & Sinking Corpus (₹1.80 Lakhs), Legal & MSEB Transformer charges (₹85,000), and basic modular woodwork/appliances (₹3.50 Lakhs+). Your true liquid cash requirement jumps from ₹13.6L to over ₹18.24 Lakhs.',
      },
      {
        heading: '3. Stress-Testing Before You Pay Token',
        body: 'Always model the full possession cash ladder and a +1.25% RBI repo-rate hike before handing over a non-refundable booking cheque.',
      },
    ],
  },
  {
    id: 'verify-30-year-ec',
    title: 'How to Verify a 30-Year Encumbrance Certificate (Form 15) Before Token',
    category: 'Legal Verification Guide',
    thumbnail: '/images/landing/engine-skyline.jpg',
    tag: 'Title & EC Protocol',
    readTime: '8 min read',
    summary:
      'A step-by-step protocol for reading Sub-Registrar Form 15/Form 16 records, spotting unreleased project finance mortgages, and protecting your booking money.',
    sections: [
      {
        heading: '1. Form 15 vs Form 16: The Critical Difference',
        body: 'When you apply for an Encumbrance Certificate at the Sub-Registrar portal (IGR Maharashtra, Kaveri Online in Karnataka, or TNREGINET), a clean Nil-Encumbrance is issued on Form 16. If the property has registered charges, liens, or developer mortgages, they appear chronologically in Form 15.',
      },
      {
        heading: '2. Project Finance NOCs Are Mandatory',
        body: 'Most builders mortgage the underlying land to an NBFC or bank to fund construction. Even if you pay 100% of your flat cost, the lender holds first charge unless you obtain a specific unit-level Release NOC before registration.',
      },
    ],
  },
  {
    id: 'cc-vs-sanction-plan',
    title: 'Commencement Certificate vs Sanction Plan: Spotting Unsanctioned Floors',
    category: 'RERA & Municipal Guide',
    thumbnail: '/images/landing/bento-villa.jpg',
    tag: 'Municipal Approvals',
    readTime: '5 min read',
    summary:
      'Why a 22-storey marketing brochure means nothing if the Municipal Commencement Certificate (CC) only covers up to the 12th floor.',
    sections: [
      {
        heading: '1. Proposed Layout vs Sanctioned CC',
        body: 'Sales galleries routinely display 25-storey tower models marked "Proposed." However, municipal authorities grant Commencement Certificates (CC) in phases tied to FSI and road-width clearances.',
      },
      {
        heading: '2. Never Book Above the Active CC Slab',
        body: 'Before signing an Allotment Letter for a higher-floor apartment, verify the latest Municipal CC on the state RERA portal to confirm your exact floor slab is legally authorized for construction.',
      },
    ],
  },
];

export const BuyerGuidesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleOpenDemo = () => {
    setSelectedArticle(null);
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="guides" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered Header */}
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="font-serif text-[34px] sm:text-[44px] font-normal tracking-[-0.02em] text-[#fafafa] leading-[1.12]">
            Buyer field notes &amp; guides
          </h2>
          <p className="mt-3 text-[15px] text-[#a1a1a1] max-w-[460px] mx-auto">
            Practical due-diligence playbooks for verifying title chains, RERA filings, and true handover costs.
          </p>
        </div>

        {/* 3-Column Blog Grid — Clean Full-Bleed Architectural Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Full-Bleed Thumbnail Image Container (1089 x 600 aspect ratio) */}
              <div className="relative w-full aspect-[1089/600] rounded-2xl overflow-hidden border border-[#ffffff14] mb-4 bg-[#171717]">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Subtle top-left category pill */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[11px] text-[#e5e5e5]">
                    {article.tag}
                  </span>
                </div>
              </div>

              {/* Article Title */}
              <h3 className="text-[15px] sm:text-[16px] font-medium text-[#fafafa] group-hover:text-[#d4d4d4] transition-colors leading-[1.45] tracking-[-0.01em] mb-3">
                {article.title}
              </h3>

              {/* Honest Guide Metadata Row (No Fictional People) */}
              <div className="flex items-center gap-2 text-[12px] text-[#a1a1a1] mt-auto">
                <span className="w-5 h-5 rounded-full bg-[#171717] border border-white/15 text-[#fafafa] flex items-center justify-center shrink-0">
                  <BookOpen className="w-2.5 h-2.5" />
                </span>
                <span className="text-[#d4d4d4]">{article.category}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#171717] border border-[#ffffff14] rounded-2xl shadow-2xl text-[#fafafa]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[1089/480] w-full overflow-hidden border-b border-[#ffffff14]">
              <img
                src={selectedArticle.thumbnail}
                alt={selectedArticle.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-[#fafafa] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs text-[#a1a1a1] mb-4">
                <span className="w-5 h-5 rounded-full bg-[#262626] border border-white/15 text-[#fafafa] flex items-center justify-center">
                  <BookOpen className="w-2.5 h-2.5" />
                </span>
                <span className="text-[#e5e5e5] font-medium">{selectedArticle.category}</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h2 className="font-serif text-[24px] sm:text-[30px] text-[#fafafa] leading-[1.2] mb-4">
                {selectedArticle.title}
              </h2>

              <p className="text-[14px] text-[#a1a1a1] leading-[1.65] pb-6 border-b border-[#ffffff14]">
                {selectedArticle.summary}
              </p>

              <div className="space-y-6 py-6">
                {selectedArticle.sections.map((sec) => (
                  <div key={sec.heading} className="space-y-2">
                    <h4 className="text-[15px] font-medium text-[#fafafa]">{sec.heading}</h4>
                    <p className="text-[14px] text-[#a1a1a1] leading-[1.7]">{sec.body}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#ffffff14] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#a1a1a1]">
                  Ready to run these checks on your shortlisted property?
                </span>
                <button
                  type="button"
                  onClick={handleOpenDemo}
                  className="px-5 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Run Live Property Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
