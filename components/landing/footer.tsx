import React from "react";
import { ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#23262D] py-8 bg-[#0C0E12] text-xs text-[#6B7280]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D97706]" />
          <span className="font-semibold text-[#8A8F9E]">HomeCheck</span>
          <span>— Property evaluation & due-diligence workspace for India</span>
        </div>
        <div>
          <span>© 2026 HomeCheck. Portfolio MVP.</span>
        </div>
      </div>
    </footer>
  );
};
