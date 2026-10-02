import React from "react";
import { AlertCircle, ShieldAlert } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 border-b border-[#23262D] bg-[#121418]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#16181D] border border-[#262930] rounded-xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3 border-b border-[#23262D] pb-4">
            <div className="w-8 h-8 rounded bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#F0F2F5]">What HomeCheck Is Not</h3>
              <p className="text-xs text-[#8A8F9E]">Our commitment to honest decision-support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="space-y-1.5 bg-[#121418] p-4 rounded-lg border border-[#23262D]">
              <p className="font-semibold text-[#F0F2F5] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#F97316]" />
                Not a Property Marketplace
              </p>
              <p className="text-[#8A8F9E]">
                We do not list properties for sale, take broker commissions, or recommend specific developments.
              </p>
            </div>

            <div className="space-y-1.5 bg-[#121418] p-4 rounded-lg border border-[#23262D]">
              <p className="font-semibold text-[#F0F2F5] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#F97316]" />
                Not a Legal Certification
              </p>
              <p className="text-[#8A8F9E]">
                HomeCheck does not guarantee title safety or act as a lawyer. We flag areas requiring qualified legal verification.
              </p>
            </div>

            <div className="space-y-1.5 bg-[#121418] p-4 rounded-lg border border-[#23262D]">
              <p className="font-semibold text-[#F0F2F5] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#F97316]" />
                Not Automated Financial Advice
              </p>
              <p className="text-[#8A8F9E]">
                We don't approve loans or issue generic "Buy / Don't Buy" scores. You control the decision.
              </p>
            </div>

            <div className="space-y-1.5 bg-[#121418] p-4 rounded-lg border border-[#23262D]">
              <p className="font-semibold text-[#F0F2F5] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#F97316]" />
                No Generic AI Slop
              </p>
              <p className="text-[#8A8F9E]">
                No hallucinating chatbots. AI is used strictly for structured data parsing and contextual document summaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
