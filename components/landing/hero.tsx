'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  ShieldCheck,
  BarChart3,
  FileText,
} from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { HeroNavbar } from '@/components/layout/nav';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0a0a0a]">
      {/* Bespoke Twilight Architectural Horizon Background Image (100% Local & IP-Safe) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src="/images/landing/hero-twilight.jpg"
          alt="Modern twilight hillside residence overlooking misty valley"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle top vignette for navbar legibility + seamless bottom fade into #0a0a0a */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.38) 0%, rgba(10,10,10,0.22) 42%, rgba(10,10,10,0.82) 78%, #0a0a0a 100%)',
          }}
        />
      </div>

      {/* Top Navbar */}
      <HeroNavbar />

      {/* Centered Hero Copy & CTA */}
      <div
        id="hero-intake"
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 max-w-[840px] mx-auto w-full"
      >
        <h1 className="font-serif text-[40px] sm:text-[56px] md:text-[66px] font-normal tracking-[-0.025em] text-[#fafafa] leading-[1.06] max-w-[760px]">
          Don’t bet your life savings on a builder’s brochure.
        </h1>

        <p className="mt-5 text-[15px] sm:text-[17px] text-[#d4d4d4] font-sans font-normal max-w-[630px] leading-[1.55] tracking-[-0.01em]">
          Listing portals only show base prices — hiding non-loanable handover cash and legal traps. Uncover the true cost, EMI stress, and state title checks before you pay token.
        </p>

        {/* Primary White Pill CTA -> Goes to /dashboard?new=true where Property Intake Popup opens */}
        <div className="mt-8 w-full flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard?new=true"
              className="px-6 py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[14px] font-medium tracking-[-0.01em] transition-all shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer"
            >
              Start Free Property Audit
            </Link>
            <button
              type="button"
              onClick={handleLoadDemo}
              className="px-5 py-3 rounded-full bg-[#171717]/80 hover:bg-[#262626] text-[#e5e5e5] text-[14px] font-normal tracking-[-0.01em] border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            >
              Explore Sample Audit (Wakad 2BHK)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hero 4-Item Horizontal Strip */}
      <div className="relative z-10 w-full pb-12 pt-4 px-6">
        <div className="max-w-[960px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          <Link
            href="/dashboard?new=true"
            className="flex items-center justify-center gap-2.5 py-2 text-[#e5e5e5] hover:text-[#fafafa] transition-colors cursor-pointer group"
          >
            <Calculator className="w-4 h-4 text-[#a1a1a1] group-hover:text-[#fafafa] transition-colors" />
            <span className="text-[13px] sm:text-[14px] font-normal tracking-[-0.01em]">
              True Cash Outflow
            </span>
          </Link>

          <Link
            href="/dashboard?new=true"
            className="flex items-center justify-center gap-2.5 py-2 text-[#e5e5e5] hover:text-[#fafafa] transition-colors cursor-pointer group"
          >
            <BarChart3 className="w-4 h-4 text-[#a1a1a1] group-hover:text-[#fafafa] transition-colors" />
            <span className="text-[13px] sm:text-[14px] font-normal tracking-[-0.01em]">
              EMI &amp; Rate Stress Test
            </span>
          </Link>

          <Link
            href="/dashboard?new=true"
            className="flex items-center justify-center gap-2.5 py-2 text-[#e5e5e5] hover:text-[#fafafa] transition-colors cursor-pointer group"
          >
            <ShieldCheck className="w-4 h-4 text-[#a1a1a1] group-hover:text-[#fafafa] transition-colors" />
            <span className="text-[13px] sm:text-[14px] font-normal tracking-[-0.01em]">
              State Legal Checklist
            </span>
          </Link>

          <Link
            href="/dashboard?new=true"
            className="flex items-center justify-center gap-2.5 py-2 text-[#e5e5e5] hover:text-[#fafafa] transition-colors cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-[#a1a1a1] group-hover:text-[#fafafa] transition-colors" />
            <span className="text-[13px] sm:text-[14px] font-normal tracking-[-0.01em]">
              Printable Buyer Dossier
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
