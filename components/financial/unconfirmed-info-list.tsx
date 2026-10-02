import React from "react";
import { HelpCircle, FileText, Building, Percent } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

export const UnconfirmedInfoList: React.FC = () => {
  const missingFinancialItems = [
    {
      title: "Exact Bank Loan Eligibility & Sanction Letter",
      description: "Pre-approved loan amount may differ from expected financing.",
      who: "Bank / Lender",
      status: "missing" as const,
    },
    {
      title: "Actual Transaction & Registration Costs",
      description: "Stamp duty, registration fees, GST, and legal charges (typically 6-8% of price).",
      who: "Registrar / Lawyer",
      status: "missing" as const,
    },
    {
      title: "Society Corpus Fund & Maintenance Charges",
      description: "One-time development charges, club membership, or advance maintenance.",
      who: "Developer / Society",
      status: "missing" as const,
    },
    {
      title: "Final Payment Schedule & Construction Milestones",
      description: "Possession-linked or slab-wise payment breakdown.",
      who: "Developer",
      status: "missing" as const,
    },
  ];

  return (
    <div className="bg-[#121212] border border-[#252525] rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#202020] pb-3">
        <div>
          <h3 className="text-base font-semibold text-[#EDEDED]">
            Unconfirmed Financial Information
          </h3>
          <p className="text-xs text-[#888888]">
            Items that must be requested or verified before committing booking money.
          </p>
        </div>
        <span className="text-xs font-mono text-[#888888] px-2 py-0.5 rounded bg-[#1C1C1C] border border-[#2A2A2A]">
          4 items pending
        </span>
      </div>

      <div className="space-y-2.5">
        {missingFinancialItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-lg bg-[#161616] border border-[#242424] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-0.5">
              <span className="text-sm font-medium text-[#EDEDED] flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#E6832A]" />
                {item.title}
              </span>
              <p className="text-xs text-[#888888]">{item.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-[#666666] font-mono">
                Source: {item.who}
              </span>
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
