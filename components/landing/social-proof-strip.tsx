'use client';

import React from "react";

const pills = [
  "First-time buyers",
  "Second-home decisions",
  "Plot investments",
  "Under-construction evaluation",
  "Ready-to-move verification",
  "RERA compliance checks",
  "Home loan eligibility",
  "Stamp duty awareness",
  "₹ Indian rupee calculations",
  "Maharashtra · Karnataka · Tamil Nadu",
];

export const SocialProofStrip: React.FC = () => {
  const doubled = [...pills, ...pills];
  return (
    <div className="border-b border-[#1A1A1A] bg-[#0D0D0D] py-4 overflow-hidden">
      <div
        className="flex gap-3 whitespace-nowrap"
        style={{
          animation: "marquee-scroll 32s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((pill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414] border border-[#252525] text-[11px] text-[#888888] shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B8BDF]/60 flex-shrink-0" />
            {pill}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
