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
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${className}`}>
          <CheckCircle2 className="w-3 h-3" />
          Verified
        </span>
      );
    case "user-provided":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/80 ${className}`}>
          <Circle className="w-3 h-3" />
          User-provided
        </span>
      );
    case "source-derived":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/80 ${className}`}>
          <Eye className="w-3 h-3" />
          Source-derived
        </span>
      );
    case "estimated":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/80 ${className}`}>
          <Calculator className="w-3 h-3" />
          Estimated
        </span>
      );
    case "missing":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200 ${className}`}>
          <HelpCircle className="w-3 h-3" />
          Missing
        </span>
      );
    case "needs-pro":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-200/80 ${className}`}>
          <AlertCircle className="w-3 h-3" />
          Needs pro review
        </span>
      );
    case "potential-issue":
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/80 ${className}`}>
          <AlertTriangle className="w-3 h-3" />
          Potential issue
        </span>
      );
    default:
      return null;
  }
};
