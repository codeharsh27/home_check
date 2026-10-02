import React from "react";
import { IntakeWidget } from "./intake-widget";
import { ShieldCheck, Star, ArrowRight, Building2, CheckCircle } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#1A1A1A]">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#5B8BDF]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        {/* Top Announcement Bar (Homera style) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2B2B2B] text-xs font-medium text-[#CCCCCC] hover:border-[#383838] transition-colors cursor-pointer shadow-sm">
          <span className="flex items-center gap-1 text-[#E6A817] font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#E6A817]" />
            4.9/5
          </span>
          <span className="text-[#666666]">|</span>
          <span>Property Evaluation & Due-Diligence Workspace</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#5B8BDF]" />
        </div>

        {/* Main Headline (Homera style) */}
        <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-[#EDEDED] leading-[1.12]">
          Effortless Property Evaluation, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EDEDED] via-[#D0D0D0] to-[#5B8BDF]">
            Designed Around You
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-[#888888] max-w-2xl mx-auto leading-relaxed">
          Evaluate shortlisted homes, apartments, and projects. Map your exact financial position, track verified documents, identify missing details — all in one seamless workspace.
        </p>

        {/* Architectural Image Hero Banner Frame with Floating Intake Card (Homera style) */}
        <div className="pt-6 relative max-w-4xl mx-auto">
          {/* Architectural Image Container */}
          <div className="relative w-full h-[240px] sm:h-[320px] rounded-[32px] overflow-hidden border border-[#262626] shadow-2xl bg-[#121212]">
            {/* Dark stylized SVG Architecture pattern background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Simulated Architectural Banner elements */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-[#000000]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#333333] text-xs font-mono text-[#CCCCCC]">
              <Building2 className="w-3.5 h-3.5 text-[#5B8BDF]" />
              <span>Green Valley Residency · Wakad, Pune</span>
            </div>

            <div className="absolute bottom-16 right-6 z-20 hidden sm:flex items-center gap-2 bg-[#000000]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#333333] text-xs text-[#888888]">
              <CheckCircle className="w-3 h-3 text-[#3F9E6C]" />
              <span>RERA Registered · ₹68L 2BHK</span>
            </div>
          </div>

          {/* Floating Intake Widget overlapping the image (Homera / Roofin style) */}
          <div className="-mt-32 sm:-mt-40 relative z-30">
            <IntakeWidget />
          </div>
        </div>

        {/* Stats Ticker (Roofin style) */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-[#1C1C1C] text-left">
          <div>
            <span className="text-xl font-bold font-mono text-[#EDEDED]">₹68L+</span>
            <p className="text-[11px] text-[#777777]">Avg property evaluation</p>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#5B8BDF]">12+</span>
            <p className="text-[11px] text-[#777777]">Verification checks</p>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#3F9E6C]">100%</span>
            <p className="text-[11px] text-[#777777]">Evidence-based model</p>
          </div>
          <div>
            <span className="text-xl font-bold font-mono text-[#E6832A]">0</span>
            <p className="text-[11px] text-[#777777]">Broker / bank bias</p>
          </div>
        </div>
      </div>
    </section>
  );
};
