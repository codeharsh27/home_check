import React from "react";
import { IntakeWidget } from "./intake-widget";
import { Shield, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#1A1A1A]">
      {/* Background subtle radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#5B8BDF]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        {/* Overline pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2A2A2A] text-xs font-medium text-[#888888]">
          <Shield className="w-3.5 h-3.5 text-[#5B8BDF]" />
          <span>Property evaluation & due-diligence workspace · India</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#EDEDED] leading-[1.15]">
          Know what you know, what you don't, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDEDED] via-[#CCCCCC] to-[#5B8BDF]">
            and what to do next before committing money.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-base text-[#888888] max-w-2xl mx-auto leading-relaxed">
          You&apos;ve shortlisted a property. HomeCheck helps you organize your financial position, track verified information, identify missing details, and execute the exact next action — without replacing your lawyer or bank.
        </p>

        {/* Intake Widget */}
        <div className="pt-4 max-w-2xl mx-auto text-left">
          <IntakeWidget />
          <p className="mt-3 text-center text-xs text-[#555555]">
            No login required to start evaluating · Data saved locally
          </p>
        </div>
      </div>
    </section>
  );
};
