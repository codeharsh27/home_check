import React from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 border-b border-[#1A1A1A] bg-[#0E0E0E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#222222] pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#E6832A]/10 border border-[#E6832A]/30 flex items-center justify-center text-[#E6832A]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#EDEDED]">What HomeCheck Is Not</h3>
              <p className="text-xs text-[#888888]">Our commitment to honest decision-support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#AAAAAA] leading-relaxed">
            <div className="space-y-2 bg-[#0C0C0C] p-4 rounded-xl border border-[#1F1F1F]">
              <p className="font-semibold text-[#EDEDED] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#E6832A]" />
                Not a Property Marketplace
              </p>
              <p className="text-[#888888]">
                We do not list properties for sale, take broker commissions, or recommend specific developments.
              </p>
            </div>

            <div className="space-y-2 bg-[#0C0C0C] p-4 rounded-xl border border-[#1F1F1F]">
              <p className="font-semibold text-[#EDEDED] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#E6832A]" />
                Not a Legal Certification
              </p>
              <p className="text-[#888888]">
                HomeCheck does not guarantee title safety or act as a lawyer. We flag areas requiring qualified legal verification.
              </p>
            </div>

            <div className="space-y-2 bg-[#0C0C0C] p-4 rounded-xl border border-[#1F1F1F]">
              <p className="font-semibold text-[#EDEDED] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#E6832A]" />
                Not an Automated Financial Advice
              </p>
              <p className="text-[#888888]">
                We don't approve loans or issue generic "Buy / Don't Buy" scores. You control the decision.
              </p>
            </div>

            <div className="space-y-2 bg-[#0C0C0C] p-4 rounded-xl border border-[#1F1F1F]">
              <p className="font-semibold text-[#EDEDED] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#E6832A]" />
                No Generic AI Slop
              </p>
              <p className="text-[#888888]">
                No hallucinating chatbots. AI is used strictly for structured data parsing and contextual document summaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
