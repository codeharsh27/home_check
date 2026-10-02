import React from "react";
import { EvidenceStatus } from "@/types";

interface BadgeProps {
  status: EvidenceStatus;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className = "" }) => {
  switch (status) {
    case "verified":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          Verified
        </span>
      );
    case "user-provided":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/25 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
          User-provided
        </span>
      );
    case "source-derived":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#8B5CF6]/10 text-[#C4B5FD] border border-[#8B5CF6]/25 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5FD]" />
          Source-derived
        </span>
      );
    case "estimated":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F59E0B]/10 text-[#FBBF24] border border-[#F59E0B]/25 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
          Estimated
        </span>
      );
    case "missing":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#1E2128] text-[#8A8F9E] border border-[#2B2F38] ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
          Missing
        </span>
      );
    case "needs-pro":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F97316]/10 text-[#FB923C] border border-[#F97316]/25 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
          Needs pro review
        </span>
      );
    case "potential-issue":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#EF4444]/10 text-[#F87171] border border-[#EF4444]/25 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
          Potential issue
        </span>
      );
    default:
      return null;
  }
};
