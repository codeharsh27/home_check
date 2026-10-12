'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUp, Plus, Globe, SlidersHorizontal, CheckCircle2, FileCheck2 } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const CoreEnginesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleOpenDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section id="what-we-check" className="pt-20 sm:pt-28 pb-16 bg-[#0a0a0a] relative">
      {/* Centered Section Header */}
      <div className="max-w-[680px] mx-auto px-6 text-center mb-14 sm:mb-20">
        <h2 className="font-serif text-[34px] sm:text-[44px] font-normal tracking-[-0.02em] text-[#fafafa] leading-[1.12]">
          What we check in every evaluation
        </h2>
        <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#a1a1a1] font-sans leading-[1.6] max-w-[520px] mx-auto">
          Our 5-step workspace looks beyond the builder’s marketing brochure to calculate your real financial commitment and organize your legal verification.
        </p>
      </div>

      {/* 3 Alternating Rows inside 1px solid #ffffff14 Grid Container (max-w-[1200px]) */}
      <div className="max-w-[1200px] mx-auto border-t border-b border-[#ffffff14]">
        {/* ── ROW 1: Visual Card Left, Copy Right (Steps 2 & 3: Financial Reality) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#ffffff14]">
          {/* Left Visual Column */}
          <div className="p-5 sm:p-8 lg:p-10 lg:border-r border-[#ffffff14] flex items-center justify-center">
            <div
              onClick={handleOpenDemo}
              className="relative w-full aspect-[1584/1360] rounded-2xl overflow-hidden border border-[#ffffff14] flex items-center justify-center p-5 sm:p-8 cursor-pointer group"
            >
              <img
                src="/images/landing/engine-courtyard.jpg"
                alt="Minimalist architectural courtyard at dusk"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/25" />

              {/* Frosted-Glass Window Overlay */}
              <div className="relative z-10 w-full max-w-[390px] rounded-2xl bg-[#171717]/75 backdrop-blur-2xl border border-white/15 p-4 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                  </div>
                  <span className="w-2.5 h-[1.5px] bg-white/30 rounded-full" />
                </div>

                <div className="text-center mb-4">
                  <span className="text-[16px] sm:text-[18px] font-medium text-[#fafafa] tracking-[-0.01em]">
                    Step 2 &amp; 3 · True Cost Model
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                  {['20% Down Payment', 'Stamp Duty & Reg', 'Society Corpus', '+1.25% EMI Stress'].map((chip) => (
                    <span
                      key={chip}
                      className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[11px] text-[#e5e5e5]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="rounded-xl bg-black/40 border border-white/10 p-3.5">
                  <p className="text-[12px] sm:text-[13px] text-[#d4d4d4] leading-[1.5] mb-4">
                    ₹68L Quoted Base → ₹76.84L True Acquisition Cost · Requires ₹18.24L liquid savings before handover
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#a1a1a1]">
                      <Plus className="w-3.5 h-3.5" />
                      <Globe className="w-3.5 h-3.5" />
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center shadow-md">
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy Column */}
          <div className="p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            <span className="text-[12px] font-mono text-[#a1a1a1] tracking-[0.01em] mb-2">
              Steps 2 &amp; 3 · Financial Reality
            </span>
            <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#fafafa] tracking-[-0.02em] leading-[1.15]">
              True Cost &amp; Cash Shortfall Calculator
            </h3>
            <p className="mt-3.5 text-[14px] sm:text-[15px] text-[#a1a1a1] leading-[1.65] max-w-[420px]">
              Enter your actual liquid savings, monthly income, and co-owner details. We calculate the full non-loanable cash required for Stamp Duty, Registration, GST, and Society Corpus — plus how your EMI holds up under a +1.25% RBI rate hike.
            </p>
            <button
              type="button"
              onClick={handleOpenDemo}
              className="mt-6 px-4 py-2 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#ffffff14] text-[13px] font-medium text-[#e5e5e5] transition-colors cursor-pointer"
            >
              Try Calculator in Sample
            </button>
          </div>
        </div>

        {/* ── ROW 2: Copy Left, Visual Card Right (Step 4: State-Specific Legal Checklist) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#ffffff14]">
          {/* Left Copy Column */}
          <div className="p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-start order-2 lg:order-1 lg:border-r border-[#ffffff14]">
            <span className="text-[12px] font-mono text-[#a1a1a1] tracking-[0.01em] mb-2">
              Step 4 · Regional Legal Gating
            </span>
            <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#fafafa] tracking-[-0.02em] leading-[1.15]">
              State-Aware Document Checklists
            </h3>
            <p className="mt-3.5 text-[14px] sm:text-[15px] text-[#a1a1a1] leading-[1.65] max-w-[420px]">
              Get a tailored document checklist for Maharashtra (7/12 Utara &amp; Index II), Karnataka (A-Khata &amp; Mother Deed), Tamil Nadu (Patta/Chitta), or Delhi-NCR. Clearly see what to demand from the builder for free vs. what needs a property lawyer.
            </p>
            <button
              type="button"
              onClick={handleOpenDemo}
              className="mt-6 px-4 py-2 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#ffffff14] text-[13px] font-medium text-[#e5e5e5] transition-colors cursor-pointer"
            >
              View Regional Checklist
            </button>
          </div>

          {/* Right Visual Column */}
          <div className="p-5 sm:p-8 lg:p-10 flex items-center justify-center order-1 lg:order-2">
            <div
              onClick={handleOpenDemo}
              className="relative w-full aspect-[1584/1360] rounded-2xl overflow-hidden border border-[#ffffff14] flex items-center justify-center p-5 sm:p-8 cursor-pointer group"
            >
              <img
                src="/images/hero_property.jpg"
                alt="Twilight residential facade"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/45" />

              {/* Composite 2-Card Overlay */}
              <div className="relative z-10 w-full max-w-[420px] grid grid-cols-12 gap-3 items-center">
                <div className="col-span-5 rounded-2xl bg-[#171717]/85 backdrop-blur-xl border border-white/15 p-3.5 shadow-2xl flex flex-col justify-between h-[185px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#a1a1a1]">STEP 4 // GATES</span>
                    <FileCheck2 className="w-3.5 h-3.5 text-[#96a766]" />
                  </div>
                  <div className="my-auto py-2">
                    <div className="text-[11px] text-[#a1a1a1]">Free vs. Lawyer</div>
                    <div className="text-[15px] font-serif text-[#fafafa] mt-0.5">State Guide</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#96a766]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>MH · KA · TN · NCR</span>
                  </div>
                </div>

                <div className="col-span-7 rounded-2xl bg-[#171717]/80 backdrop-blur-2xl border border-white/15 p-4 shadow-2xl flex flex-col justify-between h-[185px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/25" />
                      <span className="w-2 h-2 rounded-full bg-white/25" />
                      <span className="w-2 h-2 rounded-full bg-white/25" />
                    </div>
                    <span className="w-2.5 h-[1.5px] bg-white/30 rounded-full" />
                  </div>

                  <p className="text-[12px] text-[#e5e5e5] leading-[1.45] my-auto">
                    Ask builder for RERA ID, Sanction Plan &amp; CC first — hire an advocate for 30-Yr EC &amp; Bank NOC before agreement
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[#a1a1a1]">
                      <Plus className="w-3.5 h-3.5" />
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center">
                      <ArrowUp className="w-3 h-3 stroke-[2.2]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Visual Card Left, Copy Right (Steps 3 & 5: Alternatives & Printable Report) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Visual Column */}
          <div className="p-5 sm:p-8 lg:p-10 lg:border-r border-[#ffffff14] flex items-center justify-center">
            <div
              onClick={handleOpenDemo}
              className="relative w-full aspect-[1584/1360] rounded-2xl overflow-hidden border border-[#ffffff14] flex items-center justify-center p-5 sm:p-8 cursor-pointer group"
            >
              <img
                src="/images/landing/engine-skyline.jpg"
                alt="Aerial twilight residential towers in misty valley"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/25" />

              {/* Frosted-Glass Window Overlay */}
              <div className="relative z-10 w-full max-w-[390px] rounded-2xl bg-[#171717]/75 backdrop-blur-2xl border border-white/15 p-4 sm:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                    <span className="w-2 h-2 rounded-full bg-white/25" />
                  </div>
                  <span className="w-2.5 h-[1.5px] bg-white/30 rounded-full" />
                </div>

                <div className="flex flex-col items-center text-center mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-lg border border-white/20"
                    style={{
                      background:
                        'linear-gradient(135deg, #6691a3 0%, #96a766 50%, #bda96d 100%)',
                    }}
                  >
                    <span className="text-[11px] font-mono font-bold text-[#0a0a0a]">PDF</span>
                  </div>
                  <span className="text-[14px] font-medium text-[#fafafa]">
                    Step 5 · Printable Decision Dossier
                  </span>
                  <span className="text-[12px] text-[#a1a1a1] mt-0.5">
                    Pre-Token · Pre-Agreement · Possession Snagging
                  </span>
                </div>

                <div className="rounded-xl bg-black/40 border border-white/10 p-3 flex items-center justify-between">
                  <span className="text-[12px] text-[#d4d4d4] pl-1">
                    Export 12-point brief for your site visit &amp; lawyer
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#fafafa] text-[#0a0a0a] flex items-center justify-center shrink-0">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy Column */}
          <div className="p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
            <span className="text-[12px] font-mono text-[#a1a1a1] tracking-[0.01em] mb-2">
              Steps 3 &amp; 5 · Alternatives &amp; Report
            </span>
            <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#fafafa] tracking-[-0.02em] leading-[1.15]">
              Locality Alternatives &amp; Printable Brief
            </h3>
            <p className="mt-3.5 text-[14px] sm:text-[15px] text-[#a1a1a1] leading-[1.65] max-w-[420px]">
              Compare your shortlisted unit’s per-sq.ft carpet rate against similar residential options in the same locality, and export a structured, print-ready PDF decision report to take to the builder sales office or your advocate.
            </p>
            <button
              type="button"
              onClick={handleOpenDemo}
              className="mt-6 px-4 py-2 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#ffffff14] text-[13px] font-medium text-[#e5e5e5] transition-colors cursor-pointer"
            >
              Preview Printable Dossier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
