import React from "react";
import { Card } from "@/components/ui/card";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Bring your shortlisted property",
      description:
        "Paste a listing URL, upload a brochure, or enter details manually. HomeCheck constructs a structured, complete property snapshot with source tracking.",
    },
    {
      step: "02",
      title: "Map your financial context",
      description:
        "Enter approximate income, available funds, and financing plan. Instantly see your estimated funding gap and required monthly obligation.",
    },
    {
      step: "03",
      title: "Investigate systematically",
      description:
        "Execute a stage-aware due diligence checklist based on property type. Track requested vs received documents and unresolved open questions.",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[#23262D] bg-[#121418]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-1.5 mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#D97706]">
            Evaluation Journey
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold text-[#F0F2F5]">
            From shortlisted property to decision readiness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((item, idx) => (
            <Card key={idx} className="relative flex flex-col justify-between space-y-3 bg-[#16181D]">
              <div className="space-y-2.5">
                <span className="inline-block font-mono text-[11px] text-[#D97706] bg-[#D97706]/10 px-2.5 py-0.5 rounded border border-[#D97706]/20">
                  STEP {item.step}
                </span>
                <h3 className="text-base font-semibold text-[#F0F2F5]">{item.title}</h3>
                <p className="text-xs text-[#8A8F9E] leading-relaxed">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
