import React from "react";
import { ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1A1A1A] py-8 bg-[#070707] text-xs text-[#666666]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#5B8BDF]" />
          <span className="font-semibold text-[#888888]">HomeCheck</span>
          <span>— Property evaluation & due-diligence workspace for India</span>
        </div>
        <div>
          <span>© 2026 HomeCheck. Portfolio MVP.</span>
        </div>
      </div>
    </footer>
  );
};
