import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1A1A1A] py-10 bg-[#070707]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5B8BDF]" />
              <span className="font-semibold text-sm text-[#AAAAAA]">HomeCheck</span>
            </div>
            <p className="text-xs text-[#555555] max-w-xs leading-relaxed">
              Structured property due diligence workspace for Indian home buyers.
              Built for first-time buyers, plot investors &amp; second-home evaluations.
            </p>
            <p className="text-[11px] text-[#444444]">
              🇮🇳 RERA · Stamp Duty · RBI Home Loan rules · Indian property market
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 text-xs text-[#666666]">
            <div className="flex gap-5">
              <a href="#how-it-works" className="hover:text-[#AAAAAA] transition-colors">How it works</a>
              <a href="#what-cleared-up" className="hover:text-[#AAAAAA] transition-colors">Features</a>
              <a href="#trust" className="hover:text-[#AAAAAA] transition-colors">Our commitment</a>
            </div>
            <div className="flex gap-5">
              <Link href="/admin" className="hover:text-[#5B8BDF] transition-colors text-[#444444]">
                PM &amp; Founder Console
              </Link>
              <span className="text-[#333333]">·</span>
              <span className="text-[#444444]">© 2026 HomeCheck</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
