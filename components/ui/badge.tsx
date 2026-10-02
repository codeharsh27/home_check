import React from "react";
import { EvidenceStatus } from "@/types";
import { CheckCircle2, Circle, Eye, HelpCircle, AlertTriangle, AlertCircle, Calculator } from "lucide-react";

interface BadgeProps {
  status: EvidenceStatus;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className = "" }) => {
  switch (status) {
    case "verified":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3F9E6C]/15 text-[#3F9E6C] border border-[#3F9E6C]/30 ${className}`}>
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </span>
      );
    case "user-provided":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5B8BDF]/15 text-[#5B8BDF] border border-[#5B8BDF]/30 ${className}`}>
          <Circle className="w-3 h-3" />
          User-provided
        </span>
      );
    case "source-derived":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#9B6FD6]/15 text-[#9B6FD6] border border-[#9B6FD6]/30 ${className}`}>
          <Eye className="w-3 h-3" />
          Source-derived
        </span>
      );
    case "estimated":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4A017]/15 text-[#D4A017] border border-[#D4A017]/30 ${className}`}>
          <Calculator className="w-3 h-3" />
          Estimated
        </span>
      );
    case "missing":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#222222] text-[#888888] border border-[#333333] ${className}`}>
          <HelpCircle className="w-3 h-3" />
          Missing
        </span>
      );
    case "needs-pro":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E6832A]/15 text-[#E6832A] border border-[#E6832A]/30 ${className}`}>
          <AlertCircle className="w-3 h-3" />
          Needs pro review
        </span>
      );
    case "potential-issue":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D94F4F]/15 text-[#D94F4F] border border-[#D94F4F]/30 ${className}`}>
          <AlertTriangle className="w-3 h-3" />
          Potential issue
        </span>
      );
    default:
      return null;
  }
};
