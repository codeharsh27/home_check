'use client';

import React from "react";
import Image from "next/image";
import { IntakeWidget } from "./intake-widget";
import { Shield, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-14 pb-0 md:pt-20 overflow-hidden border-b border-[#1A1A1A]">
      {/* Radial glow — left side behind copy */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[#5B8BDF]/6 blur-[130px] pointer-events-none rounded-full -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Copy + CTA ── */}
          <div className="space-y-6 pt-4 pb-10 lg:pb-20">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] border border-[#2A2A2A] text-xs font-medium text-[#888888]">
              <Shield className="w-3.5 h-3.5 text-[#5B8BDF]" />
              <span>Property Due Diligence · India · Free to start</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#EDEDED] leading-[1.1]">
                Before you sign anything,
              </h1>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EAAEE] via-[#5B8BDF] to-[#4A78C8]">
                  know exactly where you stand.
                </span>
              </h1>
            </div>

            {/* Sub-headline — ONE sentence only */}
            <p className="text-base text-[#888888] leading-relaxed max-w-lg">
              Your funding gap, missing documents, and exact next step —<br className="hidden sm:inline" /> all in one structured workspace.
            </p>

            {/* CTA block */}
            <div className="max-w-xl">
              <IntakeWidget simplified />
              <p className="mt-3 text-xs text-[#555555]">
                No login required · Data stays on your device
              </p>
            </div>

            {/* Trust micro-signals */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#555555] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F9E6C]" />
                RERA-aware checklists
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F9E6C]" />
                RBI home loan rules built-in
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F9E6C]" />
                7% stamp duty auto-calculated
              </span>
            </div>
          </div>

          {/* ── Right: Product Screenshot ── */}
          <div className="relative hidden lg:flex items-end justify-center self-end">
            {/* Glow under the mockup */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-[#5B8BDF]/20 blur-3xl rounded-full" />

            {/* Screenshot frame */}
            <div className="relative w-full max-w-[540px] rounded-t-2xl overflow-hidden border border-[#2A2A2A] shadow-[0_0_60px_rgba(91,139,223,0.08)] ring-1 ring-white/5">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#222222]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#2E2E2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#2E2E2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#2E2E2E]" />
                </div>
                <div className="flex-1 mx-3 h-6 bg-[#1A1A1A] rounded border border-[#2A2A2A] flex items-center px-3">
                  <span className="text-[10px] font-mono text-[#444444]">homecheck.in/evaluation/…/financial</span>
                </div>
              </div>

              {/* Screenshot */}
              <Image
                src="/product-mockup.jpg"
                alt="HomeCheck financial analysis dashboard showing funding gap, monthly obligation, and capital breakdown"
                width={540}
                height={340}
                className="w-full object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
