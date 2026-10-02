import React from "react";
import { PieChart, ClipboardCheck, FileCheck, Compass, ArrowRight } from "lucide-react";

export const WhatYouGetSection: React.FC = () => {
  const features = [
    {
      icon: PieChart,
      badge: "Financial Analysis",
      title: "Smart Financial & Funding Gap Analysis",
      description:
        "Map your available funds, emergency reserves, and loan plans against listed property prices in seconds. Clear visual gap bar without hidden numbers.",
    },
    {
      icon: ClipboardCheck,
      badge: "Stage-Aware Checklist",
      title: "Contextual Due Diligence Plan",
      description:
        "Stage-aware checklist tailored specifically for Indian apartments, under-construction projects, or independent plots. Separates request from verify.",
    },
    {
      icon: FileCheck,
      badge: "Evidence System",
      title: "Evidence Model & Document Workspace",
      description:
        "Every piece of information carries a distinct status chip (Verified, User-provided, Source-derived, Missing). Upload brochures and legal title documents directly.",
    },
    {
      icon: Compass,
      badge: "Decision Engine",
      title: "Next-Action Engine & Readiness Dashboard",
      description:
        "Know the exact next step — whether contacting seller, bank lender, or lawyer. Aggregates readiness without artificial buy/don't-buy scores.",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[#1A1A1A] bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF] bg-[#5B8BDF]/10 px-3 py-1 rounded-full border border-[#5B8BDF]/20 inline-block">
            Workspace Tools
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#EDEDED] tracking-tight">
            Discover Due Diligence Tools Designed Around You
          </h2>
          <p className="text-xs sm:text-sm text-[#888888] max-w-xl mx-auto">
            Everything first-time buyers need to evaluate shortlisted properties before committing token money.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#121212] border border-[#232323] hover:border-[#333333] rounded-[24px] p-6 space-y-4 transition-all hover:bg-[#161616] group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-[#5B8BDF]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#888888] bg-[#181818] px-2.5 py-1 rounded-full border border-[#262626]">
                    {feat.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-[#EDEDED] group-hover:text-[#5B8BDF] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#888888] leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
