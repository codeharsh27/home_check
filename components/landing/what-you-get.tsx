import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, ClipboardCheck, FileCheck, Compass } from "lucide-react";

export const WhatYouGetSection: React.FC = () => {
  const features = [
    {
      icon: PieChart,
      title: "Financial Picture & Funding Gap",
      description:
        "Understand your exact financial position relative to the property. Clear breakdown of available funds, loan dependency, and funding gaps before paying booking amounts.",
    },
    {
      icon: ClipboardCheck,
      title: "Contextual Investigation Plan",
      description:
        "A stage-aware checklist tailored to apartments, plots, or under-construction projects. Distinguishes what needs to be requested from what needs checking.",
    },
    {
      icon: FileCheck,
      title: "Evidence Tracking & Documents",
      description:
        "Every data point carries an evidence badge (Verified, User-provided, Source-derived, Missing). Store documents linked directly to specific checklist criteria.",
    },
    {
      icon: Compass,
      title: "Next-Action Engine & Readiness",
      description:
        "Maintains a clear list of unresolved questions and tells you the exact next step required — whether contacting the seller, lender, or engaging a lawyer.",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF]">
            Core Capabilities
          </h2>
          <p className="text-2xl sm:text-3xl font-semibold text-[#EDEDED]">
            Everything you need for complete due diligence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} hoverable className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#5B8BDF]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-[#EDEDED]">{feat.title}</h3>
                <p className="text-xs text-[#888888] leading-relaxed">{feat.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
