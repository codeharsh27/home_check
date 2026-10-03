import React from "react";
import { Search, IndianRupee, ClipboardList } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Tell us about the property",
    description: "Paste a listing URL, upload a brochure, or type the address. We build a complete structured snapshot.",
    example: "e.g. Lodha Palava, 2BHK, ₹72L, Dombivli East",
    color: "text-[#5B8BDF]",
    bg: "bg-[#5B8BDF]/10",
    border: "border-[#5B8BDF]/20",
  },
  {
    step: "02",
    icon: IndianRupee,
    title: "Map your real financial picture",
    description: "Income, savings, existing EMIs, and all financing sources — we calculate your funding gap instantly.",
    example: "e.g. You need ₹11.8L more than your current savings",
    color: "text-[#3F9E6C]",
    bg: "bg-[#3F9E6C]/10",
    border: "border-[#3F9E6C]/20",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Investigate before you commit",
    description: "A RERA-aware checklist tailored to your property type. Track what's verified, what's missing, and what to ask.",
    example: "e.g. RERA ✓ — Encumbrance certificate missing ⚠️",
    color: "text-[#E6832A]",
    bg: "bg-[#E6832A]/10",
    border: "border-[#E6832A]/20",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-b border-[#1A1A1A] bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF]">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED]">
            From shortlisted property to confident decision
          </h2>
          <p className="text-sm text-[#666666] max-w-md mx-auto">
            Three steps. Usually under 15 minutes.
          </p>
        </div>

        {/* Steps — connected timeline */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-px bg-gradient-to-r from-[#5B8BDF]/40 via-[#888888]/20 to-[#E6832A]/40" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  {/* Step number + icon circle */}
                  <div className={`relative w-16 h-16 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                    {/* Step badge */}
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                      <span className="text-[9px] font-mono font-bold text-[#888888]">{item.step}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-2.5 max-w-[240px]">
                    <h3 className="text-base font-semibold text-[#EDEDED] leading-snug">{item.title}</h3>
                    <p className="text-xs text-[#888888] leading-relaxed">{item.description}</p>

                    {/* Example callout */}
                    <div className={`inline-block px-3 py-1.5 rounded-lg ${item.bg} border ${item.border} text-[11px] ${item.color} font-mono leading-snug`}>
                      {item.example}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
