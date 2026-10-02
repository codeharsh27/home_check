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
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30 ${className}`}>
          <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
          Verified
        </span>
      );
    case "user-provided":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/30 ${className}`}>
          <Circle className="w-3 h-3 text-[#3B82F6]" />
          User-provided
        </span>
      );
    case "source-derived":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8B5CF6]/10 text-[#C084FC] border border-[#8B5CF6]/30 ${className}`}>
          <Eye className="w-3 h-3 text-[#8B5CF6]" />
          Source-derived
        </span>
      );
    case "estimated":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F59E0B]/10 text-[#FBBF24] border border-[#F59E0B]/30 ${className}`}>
          <Calculator className="w-3 h-3 text-[#F59E0B]" />
          Estimated
        </span>
      );
    case "missing":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1F2937] text-[#9CA3AF] border border-[#374151] ${className}`}>
          <HelpCircle className="w-3 h-3 text-[#6B7280]" />
          Missing
        </span>
      );
    case "needs-pro":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F97316]/10 text-[#FB923C] border border-[#F97316]/30 ${className}`}>
          <AlertCircle className="w-3 h-3 text-[#F97316]" />
          Needs pro review
        </span>
      );
    case "potential-issue":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EF4444]/10 text-[#F87171] border border-[#EF4444]/30 ${className}`}>
          <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
          Potential issue
        </span>
      );
    default:
      return null;
  }
};
