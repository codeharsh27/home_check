import React from "react";
import { ShieldCheck } from "lucide-react";

const stances = [
  {
    emoji: "🤝",
    title: "We're on your side — no commissions",
    body: "HomeCheck is not a property marketplace. We take no broker fees or developer commissions. Our only job is to make you better informed.",
  },
  {
    emoji: "⚖️",
    title: "We flag legal concerns. Your lawyer decides.",
    body: "We surface missing title documents and RERA gaps. A qualified lawyer makes the final legal call. We prepare you for that conversation.",
  },
  {
    emoji: "💸",
    title: "Your money, your decision. We give you the numbers.",
    body: "HomeCheck doesn't approve loans or say \"Buy / Don't Buy\". We give you the exact funding gap and monthly obligation so you decide.",
  },
  {
    emoji: "🧠",
    title: "AI parses data. Humans make decisions.",
    body: "No hallucinating chatbots. AI is used strictly to parse listing data into structured fields. Every output is traceable to a source.",
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-b border-[#1A1A1A] bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF]">
              Our Commitment
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED]">
              Transparent by design
            </h2>
          </div>
          <p className="text-sm text-[#666666] max-w-xs leading-relaxed">
            A ₹50+ lakh decision deserves honest tools, not optimistic pitches.
          </p>
        </div>

        {/* Stance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stances.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 bg-[#0F0F0F] border border-[#1E1E1E] rounded-xl p-5 hover:border-[#272727] transition-colors"
            >
              <span className="text-xl shrink-0 mt-0.5">{item.emoji}</span>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-[#DDDDDD]">{item.title}</p>
                <p className="text-xs text-[#888888] leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-8 flex items-center gap-3 bg-[#0F1A2E] border border-[#1A3A6B]/40 rounded-xl px-5 py-4">
          <ShieldCheck className="w-5 h-5 text-[#5B8BDF] shrink-0" />
          <p className="text-xs text-[#7EAAEE] leading-relaxed">
            <span className="font-semibold">HomeCheck is a structured workspace</span>, not an automated advisor. We organize information, surface gaps, and help you ask the right questions — so you walk into every conversation with a builder, bank, or lawyer fully prepared.
          </p>
        </div>
      </div>
    </section>
  );
};
