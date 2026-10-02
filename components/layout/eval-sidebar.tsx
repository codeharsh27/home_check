"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, CheckCircle2, Circle, ChevronRight } from "lucide-react";

interface EvalSidebarProps {
  evaluationId: string;
  propertyName?: string;
}

export const EvalSidebar: React.FC<EvalSidebarProps> = ({ evaluationId, propertyName = "Property" }) => {
  const pathname = usePathname();

  const steps = [
    {
      id: "snapshot",
      label: "01 Property Snapshot",
      href: `/evaluation/${evaluationId}/snapshot`,
    },
    {
      id: "financial",
      label: "02 Financial Picture",
      href: `/evaluation/${evaluationId}/financial`,
    },
    {
      id: "investigation",
      label: "03 Investigation Plan",
      href: `/evaluation/${evaluationId}/investigation`,
    },
    {
      id: "questions",
      label: "04 Open Questions",
      href: `/evaluation/${evaluationId}/questions`,
    },
    {
      id: "dashboard",
      label: "05 Decision Readiness",
      href: `/evaluation/${evaluationId}/dashboard`,
    },
  ];

  const currentStepIndex = steps.findIndex((s) => pathname.includes(s.id));
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <aside className="w-full md:w-64 bg-[#0B0F17] border-r border-[#1F2937] flex flex-col shrink-0 min-h-screen">
      {/* Top Brand */}
      <div className="p-4 border-b border-[#1F2937]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] group-hover:border-[#2563EB]/60 transition-colors shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight text-sm text-[#F9FAFB] group-hover:text-white transition-colors">
            homecheck
          </span>
        </Link>
      </div>

      {/* Property Context Header */}
      <div className="p-4 border-b border-[#1F2937] bg-[#111827]/60">
        <p className="text-[10px] uppercase font-mono tracking-wider text-[#9CA3AF] font-semibold">Active Evaluation</p>
        <p className="text-sm font-semibold text-[#F9FAFB] truncate mt-0.5">{propertyName}</p>
      </div>

      {/* Steps Nav */}
      <nav className="p-3 space-y-1 flex-1">
        {steps.map((step, idx) => {
          const isActive = pathname.includes(step.id);
          const isPassed = idx < currentStepIndex;

          return (
            <Link
              key={step.id}
              href={step.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? "bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/40 font-bold shadow-sm"
                  : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#111827]"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                ) : isActive ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shrink-0 animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-[#4B5563] shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? "text-[#60A5FA]" : "text-[#4B5563] opacity-0 group-hover:opacity-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Progress Footer */}
      <div className="p-4 border-t border-[#1F2937] bg-[#0B0F17] space-y-2">
        <div className="flex justify-between items-center text-[11px] text-[#9CA3AF]">
          <span>Evaluation Progress</span>
          <span className="font-mono text-[#F9FAFB] font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#10B981] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
