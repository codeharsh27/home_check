'use client';

import React from 'react';
import { PropertyDetails, ChecklistItem } from '@/types';
import { SupportedRegion } from '@/lib/regional-documents';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface Step4Props {
  property: PropertyDetails;
  checklist?: ChecklistItem[];
  activeRegion: SupportedRegion;
  onUpdateChecklistItem: (
    itemId: string,
    updates: Partial<ChecklistItem>
  ) => void;
  onNext: () => void;
  onBack: () => void;
  onRequestSave?: () => void;
  isSaved?: boolean;
}

export const Step4DeepInvestigation: React.FC<Step4Props> = ({
  property,
  checklist = [],
  activeRegion,
  onUpdateChecklistItem,
  onNext,
  onBack,
  onRequestSave,
  isSaved = false,
}) => {
  const freeSellerItems = checklist.filter(
    (item) =>
      item.whoToContact === 'Seller / Developer' || item.whoToContact === 'Self'
  );
  const hasTrackedAnyDoc = freeSellerItems.some(
    (item) => item.requested || item.received
  );

  const regionNames: Record<SupportedRegion, string> = {
    maharashtra: 'Maharashtra (MahaRERA & IGR)',
    karnataka: 'Karnataka (K-RERA & BBMP/BDA)',
    tamilNadu: 'Tamil Nadu (TNRERA & CMDA)',
    delhiNcr: 'Delhi / NCR (DDA & DTCP)',
    general: 'National RERA Framework',
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Editorial Section Header */}
      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
          04 / LEGAL &amp; STATUTORY CHECKLIST ·{' '}
          {regionNames[activeRegion].toUpperCase()}
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] text-[#fafafa] tracking-[-0.025em] leading-[1.12]">
          Pre-booking document verification
        </h1>
        <p className="text-[14px] text-[#a1a1a1] max-w-xl leading-relaxed">
          Separate the documents you should request directly from the builder for
          free before paying a token from the title checks that require an
          independent property advocate.
        </p>
      </div>

      {/* 1. Free Developer Requests */}
      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-2 pb-5 border-b border-[#ffffff12]">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              PART A · REQUEST FROM BUILDER (FREE)
            </p>
            <h2 className="font-serif text-[24px] text-[#fafafa] mt-1">
              Documents to inspect before paying token
            </h2>
          </div>
          <span className="text-[12px] font-mono text-[#a1a1a1]">
            {freeSellerItems.filter((i) => i.received).length} /{' '}
            {freeSellerItems.length} VERIFIED
          </span>
        </div>

        <div className="divide-y divide-[#ffffff10]">
          {freeSellerItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-medium text-[#fafafa] text-[14px]">
                    {item.title}
                  </span>
                  {item.received && (
                    <span className="text-[11px] font-mono uppercase text-[#96a766]">
                      · Verified
                    </span>
                  )}
                  {!item.received && item.requested && (
                    <span className="text-[11px] font-mono uppercase text-[#bda96d]">
                      · Requested
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#a1a1a1] leading-relaxed">
                  {item.whyItMatters}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.requested && !item.received && (
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-full bg-[#0a0a0a] hover:bg-[#1f1f1f] border border-[#ffffff14] text-[12px] text-[#e5e5e5] cursor-pointer transition-colors"
                    onClick={() =>
                      onUpdateChecklistItem(item.id, { requested: true })
                    }
                  >
                    Mark requested
                  </button>
                )}
                {!item.received ? (
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[12px] font-medium cursor-pointer transition-colors"
                    onClick={() =>
                      onUpdateChecklistItem(item.id, {
                        received: true,
                        status: 'verified',
                      })
                    }
                  >
                    Mark verified
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[12px] text-[#96a766]">
                    <Check className="w-3.5 h-3.5" /> Done
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isSaved && hasTrackedAnyDoc && onRequestSave && (
          <div className="pt-4 border-t border-[#ffffff12] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] animate-step-enter">
            <span className="text-[#a1a1a1]">
              Document checklist progress is currently saved in this browser only.
            </span>
            <button
              type="button"
              onClick={onRequestSave}
              className="text-[#fafafa] hover:underline font-medium cursor-pointer text-left sm:text-right shrink-0"
            >
              Sign in to sync across devices →
            </button>
          </div>
        )}
      </div>

      {/* 2. Independent Lawyer Scope */}
      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-2 pb-4 border-b border-[#ffffff12]">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              PART B · INDEPENDENT ADVOCATE SCOPE
            </p>
            <h2 className="font-serif text-[24px] text-[#fafafa] mt-1">
              When to hire an independent property lawyer
            </h2>
          </div>
          <span className="text-[12px] text-[#a1a1a1]">
            Typical fee: ₹10,000 – ₹20,000
          </span>
        </div>

        <p className="text-[13px] text-[#a1a1a1] leading-relaxed">
          Bank loan lawyers only verify whether the property can be mortgaged by
          the bank — they do not protect your booking advance or audit delay
          compensation clauses. Engage an independent lawyer after price
          negotiation, before signing the Agreement for Sale (10%–20% down payment
          stage) for {property.name || 'this project'}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[13px]">
          {[
            '30-year Sub-Registrar Encumbrance Certificate (EC) audit',
            'Draft Agreement for Sale delay & cancellation clause review',
            'Joint Development Agreement (JDA) builder vs. landowner unit check',
            'Floor-specific Commencement Certificate (CC) & lender NOC check',
          ].map((task) => (
            <div
              key={task}
              className="p-3.5 bg-[#0a0a0a] rounded-xl border border-[#ffffff14] text-[#e5e5e5]"
            >
              {task}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#ffffff14]">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#ffffff14] text-xs text-[#e5e5e5] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Open Final Decision Dossier</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
