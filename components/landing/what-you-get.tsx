import React from "react";

const anxieties = [
  {
    fear: "\"Can I actually afford this?\"",
    clarity: "Funding gap, loan eligibility, and monthly EMI burden — calculated from your real numbers.",
    tag: "Financial Picture",
    tagColor: "text-[#5B8BDF] bg-[#5B8BDF]/10 border-[#5B8BDF]/20",
  },
  {
    fear: "\"What documents should I even ask for?\"",
    clarity: "A complete RERA-aware checklist, tailored to apartments, plots, or under-construction projects.",
    tag: "Investigation Plan",
    tagColor: "text-[#3F9E6C] bg-[#3F9E6C]/10 border-[#3F9E6C]/20",
  },
  {
    fear: "\"Is the title clean? Did I miss something?\"",
    clarity: "Every data point carries a verification badge. Missing documents are flagged, not hidden.",
    tag: "Evidence Tracking",
    tagColor: "text-[#E6832A] bg-[#E6832A]/10 border-[#E6832A]/20",
  },
  {
    fear: "\"I don't know what to do next.\"",
    clarity: "One prioritized next action at all times — whether it's calling the builder, the bank, or a lawyer.",
    tag: "Next-Action Engine",
    tagColor: "text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20",
  },
];

export const WhatYouGetSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF]">
            What Gets Cleared Up
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED]">
            Every doubt a home buyer carries — resolved
          </h2>
          <p className="text-sm text-[#666666] max-w-sm mx-auto">
            HomeCheck is built around the specific fears of an Indian property buyer.
          </p>
        </div>

        {/* Anxiety → Clarity cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {anxieties.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl p-6 hover:border-[#2A2A2A] hover:bg-[#111111] transition-all duration-200"
            >
              {/* Fear */}
              <p className="text-sm font-medium text-[#777777] mb-3 italic leading-snug">
                😰 {item.fear}
              </p>

              {/* Divider arrow */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-[#1E1E1E]" />
                <span className="text-[#333333] text-xs">→</span>
                <div className="h-px flex-1 bg-[#1E1E1E]" />
              </div>

              {/* Clarity */}
              <p className="text-sm text-[#CCCCCC] leading-relaxed mb-4">
                {item.clarity}
              </p>

              {/* Feature tag */}
              <span className={`inline-block px-2.5 py-1 rounded-md border text-[11px] font-mono font-medium ${item.tagColor}`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
