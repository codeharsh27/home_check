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
    <section className="py-16 md:py-24 border-b border-[#1A1A1A] bg-[#0C0C0C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF]">
            Evaluation Journey
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold text-[#EDEDED]">
            From shortlisted property to decision readiness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <Card key={idx} className="relative flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-block font-mono text-xs text-[#5B8BDF] bg-[#5B8BDF]/10 px-2.5 py-1 rounded border border-[#5B8BDF]/20">
                  STEP {item.step}
                </span>
                <h3 className="text-base font-semibold text-[#EDEDED]">{item.title}</h3>
                <p className="text-xs text-[#888888] leading-relaxed">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
