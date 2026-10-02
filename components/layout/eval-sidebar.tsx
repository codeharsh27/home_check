"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, CheckCircle, Circle, ChevronRight } from "lucide-react";

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
      completed: true,
    },
    {
      id: "financial",
      label: "02 Financial Picture",
      href: `/evaluation/${evaluationId}/financial`,
      completed: false,
    },
    {
      id: "investigation",
      label: "03 Investigation Plan",
      href: `/evaluation/${evaluationId}/investigation`,
      completed: false,
    },
    {
      id: "questions",
      label: "04 Open Questions",
      href: `/evaluation/${evaluationId}/questions`,
      completed: false,
    },
    {
      id: "dashboard",
      label: "05 Decision Readiness",
      href: `/evaluation/${evaluationId}/dashboard`,
      completed: false,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#121418] border-r border-[#23262D] flex flex-col shrink-0 min-h-screen">
      {/* Top Brand */}
      <div className="p-4 border-b border-[#23262D]">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-[#8A8F9E] hover:text-white transition-colors">
          <ShieldCheck className="w-4 h-4 text-[#D97706]" />
          <span className="text-sm tracking-tight text-[#F0F2F5]">homecheck</span>
        </Link>
      </div>

      {/* Property Context Header */}
      <div className="p-4 border-b border-[#23262D] bg-[#16181D]">
        <p className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280]">Active Workspace</p>
        <p className="text-xs font-medium text-[#F0F2F5] truncate mt-0.5">{propertyName}</p>
      </div>

      {/* Steps Nav */}
      <nav className="p-3 space-y-1 flex-1">
        {steps.map((step) => {
          const isActive = pathname.includes(step.id);

          return (
            <Link
              key={step.id}
              href={step.href}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                isActive
                  ? "bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/30 font-semibold"
                  : "text-[#8A8F9E] hover:text-[#F0F2F5] hover:bg-[#1A1D24]"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {step.completed && !isActive ? (
                  <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                ) : isActive ? (
                  <div className="w-2 h-2 rounded-full bg-[#D97706] shrink-0 animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-[#4B5563] shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-[#D97706]" : "text-[#4B5563] opacity-0 group-hover:opacity-100"}`} />
            </Link>
          );
        })}
      </nav>

      {/* Progress Footer */}
      <div className="p-4 border-t border-[#23262D] bg-[#0F1115] space-y-2">
        <div className="flex justify-between items-center text-[11px] text-[#6B7280]">
          <span>Stage progress</span>
          <span className="font-mono text-[#F0F2F5]">Linear Workflow</span>
        </div>
        <div className="w-full h-1 bg-[#1E2128] rounded-full overflow-hidden">
          <div className="h-full bg-[#D97706] rounded-full w-[20%]" />
        </div>
      </div>
    </aside>
  );
};
