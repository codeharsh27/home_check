import React from "react";
import Image from "next/image";
import { IntakeWidget } from "./intake-widget";
import { ShieldCheck, Sparkles, Building2, Lock, CheckCircle2 } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-[#1F2937]">
      {/* Background Imagery with Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_property.jpg"
          alt="Modern property architectural background"
          fill
          className="object-cover object-center opacity-20 filter blur-[1px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/90 via-[#0B0F17]/95 to-[#0B0F17]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
        {/* Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2937]/80 backdrop-blur-md border border-[#374151] text-xs font-semibold text-[#9CA3AF] shadow-md">
          <Building2 className="w-4 h-4 text-[#3B82F6]" />
          <span>India&apos;s Dedicated Property Due-Diligence & Decision Workspace</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-[#F9FAFB] leading-[1.12]">
          Know what you know, what you don&apos;t, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#34D399]">
            and what to do next before paying booking money.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-normal">
          You&apos;ve shortlisted a property. HomeCheck helps you organize your financial position, track verified information, identify missing legal details, and execute the exact next action — without replacing your lawyer or bank.
        </p>

        {/* Hero Intake Widget */}
        <div className="pt-2 max-w-3xl mx-auto text-left shadow-2xl">
          <IntakeWidget />
        </div>

        {/* Trust highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#9CA3AF] font-medium pt-2">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> No login required to evaluate
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#3B82F6]" /> Private & stored locally
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" /> Stage-aware Indian property checklist
          </span>
        </div>
      </div>
    </section>
  );
};
