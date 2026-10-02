import React from "react";
import Link from "next/link";
import { ShieldCheck, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F2937] bg-[#0B0F17]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] group-hover:border-[#2563EB]/60 transition-colors shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-lg text-[#F9FAFB] group-hover:text-white transition-colors">
            homecheck
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-[#1F2937] text-[#10B981] border border-[#10B981]/30 font-semibold">
            WORKSPACE
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button variant="outline" size="sm">
            Explore Demo
          </Button>
        </div>
      </div>
    </header>
  );
};
