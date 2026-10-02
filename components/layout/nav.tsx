import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#23262D] bg-[#0F1115]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 rounded bg-[#D97706]/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] group-hover:border-[#D97706]/60 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium tracking-tight text-sm text-[#F0F2F5] group-hover:text-white transition-colors">
            homecheck
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#1C1F26] text-[#8A8F9E] border border-[#2B2F38]">
            MVP
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};
