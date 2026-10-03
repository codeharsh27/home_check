import React from "react";
import Link from "next/link";
import { ShieldCheck, BarChart3 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1A1A1A] py-8 bg-[#070707] text-xs text-[#666666]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#5B8BDF]" />
          <span className="font-semibold text-[#888888]">HomeCheck</span>
          <span>— Property evaluation & due-diligence workspace for India</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-[#888888] hover:text-[#5B8BDF] transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>PM & Founder Console</span>
          </Link>
          <span className="text-[#333333]">|</span>
          <span>© 2026 HomeCheck. Portfolio MVP.</span>
        </div>
      </div>
    </footer>
  );
};
