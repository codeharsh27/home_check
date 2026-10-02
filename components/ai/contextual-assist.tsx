"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, X, HelpCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChecklistItem, PropertyDetails } from "@/types";

interface ContextualAssistModalProps {
  type: "seller" | "lawyer";
  property: PropertyDetails;
  checklist: ChecklistItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const ContextualAssistModal: React.FC<ContextualAssistModalProps> = ({
  type,
  property,
  checklist,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const missingItems = checklist.filter((i) => !i.received);

  const sellerQuestions = [
    `1. What is the official RERA registration number and approved sanction plan for ${property.name}?`,
    `2. Can you provide a copy of the Commencement Certificate (CC) and legal title chain deeds?`,
    `3. Is the property or land currently mortgaged to any bank/financial institution? If so, will a Bank NOC be provided?`,
    `4. What is the exact breakdown of one-time corpus fund, clubhouse charges, and monthly society maintenance?`,
    `5. What is the exact payment schedule linked to construction milestones?`,
  ];

  const lawyerQuestions = [
    `1. Can you conduct a 30-year search at the sub-registrar office to verify clear title chain for ${property.name}?`,
    `2. Are there any registered mortgages, legal liens, or encumbrances recorded on Form 15/16 Encumbrance Certificate?`,
    `3. Can you verify whether any pending litigation or court stay orders exist against the developer/landowner?`,
    `4. Does the developer possess valid Commencement Certificate (CC) and Sanctioned Layout Plan approvals?`,
    `5. Are the terms in the draft Agreement for Sale fully compliant with RERA buyer protection norms?`,
  ];

  const questionsList = type === "seller" ? sellerQuestions : lawyerQuestions;
  const title = type === "seller" ? "Suggested Questions for Seller / Developer" : "Prepared Questions for Property Lawyer";
  const subtitle =
    type === "seller"
      ? "AI generated from your missing property checklist items"
      : "AI generated for professional legal title verification";

  const handleCopy = () => {
    const textToCopy = `${title}\nProperty: ${property.name}\n\n` + questionsList.join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#141414] border border-[#2B2B2B] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#777777] hover:text-[#EDEDED] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5B8BDF]" />
            <h3 className="text-base font-semibold text-[#EDEDED]">{title}</h3>
          </div>
          <p className="text-xs text-[#888888]">{subtitle}</p>
        </div>

        <div className="bg-[#0C0C0C] border border-[#222222] rounded-lg p-4 space-y-3 max-h-80 overflow-y-auto font-sans text-xs">
          {questionsList.map((q, idx) => (
            <div key={idx} className="p-2.5 rounded bg-[#121212] border border-[#1F1F1F] text-[#EDEDED]">
              {q}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#202020]">
          <span className="text-[11px] text-[#555555] font-mono">✦ AI Generated Assist</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3F9E6C]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Questions</span>
                </>
              )}
            </Button>
            <Button size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
