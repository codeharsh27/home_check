'use client';

import React from 'react';
import { Maximize2 } from 'lucide-react';

export const BentoTestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered Header — Honest Problem Statement (No Fake Testimonials) */}
        <div className="max-w-[660px] mx-auto text-center mb-14 sm:mb-16">
          <h2 className="font-serif text-[34px] sm:text-[44px] font-normal tracking-[-0.02em] text-[#fafafa] leading-[1.12]">
            Why buyers need structured diligence
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-[#a1a1a1] font-sans leading-[1.6] max-w-[500px] mx-auto">
            Property portals are built to help builders and brokers generate leads — leaving buyers to figure out the real costs and legal risks alone.
          </p>
        </div>

        {/* 2-Row × 3-Card Asymmetric Bento Grid (Row 1: 2fr 1fr 1fr, Row 2: 1fr 1fr 2fr) */}
        <div className="space-y-4">
          {/* ── ROW 1 (2 : 1 : 1) ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 1: Wide Blindspot 1 — The 20% Down-Payment Illusion (md:col-span-2) */}
            <div className="md:col-span-2 relative min-h-[340px] sm:min-h-[370px] rounded-2xl overflow-hidden border border-[#ffffff14] p-6 sm:p-7 flex flex-col justify-between group">
              <img
                src="/images/landing/engine-skyline.jpg"
                alt="Residential towers at dusk"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.88) 100%)',
                }}
              />

              {/* Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#fafafa] text-[14px] font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#fafafa] inline-block" />
                  <span>Blindspot 01 · The 20% Down-Payment Myth</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#e5e5e5]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Reality Explanation */}
              <p className="relative z-10 text-[15px] sm:text-[17px] text-[#fafafa] font-normal leading-[1.55] tracking-[-0.01em] max-w-[520px]">
                An 80% bank home loan only covers the base agreement value. Stamp Duty (6–7%), Registration, GST, 24-month Society Corpus, and meter deposits must be paid 100% out of your liquid savings.
              </p>
            </div>

            {/* Card 2: Solid #171717 Tile with Crisp White Square Metric Badge (md:col-span-1) */}
            <div className="md:col-span-1 relative min-h-[280px] sm:min-h-[370px] rounded-2xl bg-[#171717] border border-[#ffffff14] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#828282]">NON-LOANABLE</span>
                <div className="w-7 h-7 rounded-lg bg-[#262626] border border-[#ffffff14] flex items-center justify-center text-[#a1a1a1]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="my-auto flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#fafafa] text-[#0a0a0a] flex flex-col items-center justify-center shadow-lg mb-3">
                  <span className="font-serif text-[16px] font-bold tracking-tight leading-none">
                    +8–12%
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider mt-1 text-[#0a0a0a]/70">
                    EXTRA CASH
                  </span>
                </div>
                <p className="text-[12px] text-[#a1a1a1] max-w-[180px] leading-[1.45]">
                  Typical unfinanced statutory &amp; handover costs above base price
                </p>
              </div>

              <div className="h-2" />
            </div>

            {/* Card 3: Buyer Persona 1 — First-Time Homebuyers (md:col-span-1) */}
            <div className="md:col-span-1 relative min-h-[340px] sm:min-h-[370px] rounded-2xl overflow-hidden border border-[#ffffff14] p-6 flex flex-col justify-between group">
              <img
                src="/images/landing/portrait-rohit.jpg"
                alt="First-time homebuyer evaluating property"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0.88) 100%)',
                }}
              />

              <div className="relative z-10 flex items-center justify-end">
                <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#e5e5e5]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="relative z-10">
                <span className="text-[13px] text-[#fafafa] font-medium block">
                  Built for First-Time Buyers
                </span>
                <span className="text-[12px] text-[#d4d4d4] mt-0.5 block leading-[1.4]">
                  Walk into builder sales offices with a clear checklist instead of a brochure.
                </span>
              </div>
            </div>
          </div>

          {/* ── ROW 2 (1 : 1 : 2) ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 4: Buyer Persona 2 — Out-of-State & Salaried Buyers (md:col-span-1) */}
            <div className="md:col-span-1 relative min-h-[340px] sm:min-h-[370px] rounded-2xl overflow-hidden border border-[#ffffff14] p-6 flex flex-col justify-between group">
              <img
                src="/images/landing/portrait-aditya.jpg"
                alt="Salaried buyer checking regional land documents"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0.88) 100%)',
                }}
              />

              <div className="relative z-10 flex items-center justify-end">
                <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#e5e5e5]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="relative z-10">
                <span className="text-[13px] text-[#fafafa] font-medium block">
                  State-Specific Clarity
                </span>
                <span className="text-[12px] text-[#d4d4d4] mt-0.5 block leading-[1.4]">
                  Know whether to ask for 7/12 Utara (MH), A-Khata (KA), or Patta (TN).
                </span>
              </div>
            </div>

            {/* Card 5: Solid #171717 Tile with Crisp White Square Badge (md:col-span-1) */}
            <div className="md:col-span-1 relative min-h-[280px] sm:min-h-[370px] rounded-2xl bg-[#171717] border border-[#ffffff14] p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#828282]">WORKFLOW</span>
                <div className="w-7 h-7 rounded-lg bg-[#262626] border border-[#ffffff14] flex items-center justify-center text-[#a1a1a1]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="my-auto flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#fafafa] text-[#0a0a0a] flex flex-col items-center justify-center shadow-lg mb-3">
                  <span className="font-serif text-[16px] font-bold tracking-tight leading-none">
                    5 Steps
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider mt-1 text-[#0a0a0a]/70">
                    GUIDED
                  </span>
                </div>
                <p className="text-[12px] text-[#a1a1a1] max-w-[180px] leading-[1.45]">
                  From portal link intake to a printable site-visit &amp; lawyer brief
                </p>
              </div>

              <div className="h-2" />
            </div>

            {/* Card 6: Wide Blindspot 2 — Free Builder Checks vs Lawyer Review (md:col-span-2) */}
            <div className="md:col-span-2 relative min-h-[340px] sm:min-h-[370px] rounded-2xl overflow-hidden border border-[#ffffff14] p-6 sm:p-7 flex flex-col justify-between group">
              <img
                src="/images/landing/bento-villa.jpg"
                alt="Modern twilight residence"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.88) 100%)',
                }}
              />

              {/* Top Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#fafafa] text-[14px] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fafafa] inline-block" />
                  <span>Blindspot 02 · Knowing When to Hire a Lawyer</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#e5e5e5]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Reality Explanation */}
              <p className="relative z-10 text-[15px] sm:text-[17px] text-[#fafafa] font-normal leading-[1.55] tracking-[-0.01em] max-w-[520px]">
                Don’t pay legal fees on every shortlisted flat. HomeCheck separates what you can demand from the developer for free (RERA ID, Sanction Plan, CC) from what requires an independent advocate before signing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
