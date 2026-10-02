import React from "react";
import { HelpCircle } from "lucide-react";
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
    <div className="bg-[#16181D] border border-[#262930] rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-[#23262D] pb-3">
        <div>
          <h3 className="text-base font-semibold text-[#F0F2F5]">
            Unconfirmed Financial Information
          </h3>
          <p className="text-xs text-[#8A8F9E]">
            Items that must be requested or verified before committing booking money.
          </p>
        </div>
        <span className="text-xs font-mono text-[#8A8F9E] px-2.5 py-0.5 rounded bg-[#121418] border border-[#23262D]">
          4 items pending
        </span>
      </div>

      <div className="space-y-2">
        {missingFinancialItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded bg-[#121418] border border-[#23262D] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-[#F0F2F5] flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#F97316]" />
                {item.title}
              </span>
              <p className="text-xs text-[#8A8F9E]">{item.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-[#6B7280] font-mono">
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
