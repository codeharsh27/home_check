import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E1E1E] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-[#5B8BDF]/10 border border-[#5B8BDF]/30 flex items-center justify-center text-[#5B8BDF] group-hover:border-[#5B8BDF]/60 transition-colors">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-semibold tracking-tight text-base text-[#EDEDED] group-hover:text-white transition-colors">
            homecheck
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#222222] text-[#888888] border border-[#2B2B2B]">
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
