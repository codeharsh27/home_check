'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChecklistItem, PropertyDetails } from '@/types';
import { generateSellerQuestions, generateLawyerQuestions } from '@/lib/checklist-engine';
import { useEvaluationStore } from '@/store/evaluation';

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
  const activeRegion = useEvaluationStore((state) => state.activeRegion);

  if (!isOpen) return null;

  const questionsList =
    type === 'seller'
      ? generateSellerQuestions(property, checklist, activeRegion)
      : generateLawyerQuestions(property, checklist, activeRegion);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-stone-200/90 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 cursor-pointer p-1">
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-stone-900">{title}</h3>
          </div>
          <p className="text-xs text-stone-500">{subtitle}</p>
        </div>

        <div className="bg-stone-50/80 border border-stone-200/80 rounded-xl p-4 space-y-2.5 max-h-80 overflow-y-auto text-xs">
          {questionsList.length === 0 ? (
            <p className="text-stone-400 italic">No pending items to generate questions from. Your checklist looks complete!</p>
          ) : (
            questionsList.map((q, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-stone-200/80 text-stone-800 leading-relaxed shadow-2xs">
                {q}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <span className="text-[11px] text-stone-400">✦ Derived from your checklist</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <><Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /><span>Copied!</span></> : <><Copy className="w-3.5 h-3.5 mr-1" /><span>Copy</span></>}
            </Button>
            <Button size="sm" onClick={onClose}>Done</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
