import React from "react";
import { IntakeWidget } from "./intake-widget";
import { ShieldCheck } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#23262D] bg-[#0F1115]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Overline Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A20] border border-[#2B2F38] text-[11px] font-mono text-[#8A8F9E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
          <span>PROPERTY EVALUATION & DUE-DILIGENCE WORKSPACE · INDIA</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#F0F2F5] leading-[1.15]">
          Know what you know, what you don&apos;t, <br className="hidden sm:inline" />
          <span className="text-[#D97706]">
            and what to do next before committing money.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-base text-[#8A8F9E] max-w-2xl mx-auto leading-relaxed">
          You&apos;ve shortlisted a property. HomeCheck organizes your financial position, tracks verified evidence, highlights missing details, and defines your exact next action — without replacing your lawyer or bank.
        </p>

        {/* Intake Widget Container */}
        <div className="pt-4 max-w-2xl mx-auto text-left">
          <IntakeWidget />
          <p className="mt-3 text-center text-xs text-[#6B7280]">
            No account required to start evaluating · Data saved locally
          </p>
        </div>
      </div>
    </section>
  );
};
