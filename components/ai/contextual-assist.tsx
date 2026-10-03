'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChecklistItem, PropertyDetails } from '@/types';
import { generateSellerQuestions, generateLawyerQuestions } from '@/lib/checklist-engine';

interface ContextualAssistModalProps {
  type: 'seller' | 'lawyer';
  property: PropertyDetails;
  checklist: ChecklistItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const ContextualAssistModal: React.FC<ContextualAssistModalProps> = ({
  type, property, checklist, isOpen, onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const questionsList =
    type === 'seller'
      ? generateSellerQuestions(property, checklist)
      : generateLawyerQuestions(property, checklist);

  const title = type === 'seller'
    ? 'Questions to Ask Seller / Developer'
    : 'Questions to Prepare for Property Lawyer';

  const subtitle = type === 'seller'
    ? `Generated from ${checklist.filter((i) => i.whoToContact === 'Seller / Developer' && !i.received).length} pending seller-sourced items in your checklist`
    : `Generated from ${checklist.filter((i) => i.status === 'needs-pro' || i.category === 'ownership').length} legal verification areas`;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${title}\nProperty: ${property.name} — ${property.location}\n\n` +
      questionsList.join('\n\n')
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#141414] border border-[#2B2B2B] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#777777] hover:text-[#EDEDED] cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5B8BDF]" />
            <h3 className="text-base font-semibold text-[#EDEDED]">{title}</h3>
          </div>
          <p className="text-xs text-[#888888]">{subtitle}</p>
        </div>

        <div className="bg-[#0C0C0C] border border-[#222222] rounded-lg p-4 space-y-3 max-h-80 overflow-y-auto text-xs">
          {questionsList.length === 0 ? (
            <p className="text-[#666666] italic">No pending items to generate questions from. Your checklist looks complete!</p>
          ) : (
            questionsList.map((q, idx) => (
              <div key={idx} className="p-2.5 rounded bg-[#121212] border border-[#1F1F1F] text-[#EDEDED] leading-relaxed">
                {q}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#202020]">
          <span className="text-[11px] text-[#555555] font-mono">✦ Generated from your checklist state</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <><Check className="w-3.5 h-3.5 text-[#3F9E6C]" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>}
            </Button>
            <Button size="sm" onClick={onClose}>Done</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
