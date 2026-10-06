'use client';

import React from 'react';
import { PropertyDetails, ChecklistItem } from '@/types';
import { SupportedRegion } from '@/lib/regional-documents';
import {
  ShieldCheck,
  FileText,
  AlertCircle,
  HelpCircle,
  Scale,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step4Props {
  property: PropertyDetails;
  checklist?: ChecklistItem[];
  activeRegion: SupportedRegion;
  onUpdateChecklistItem: (itemId: string, updates: Partial<ChecklistItem>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4DeepInvestigation: React.FC<Step4Props> = ({
  property,
  checklist = [],
  activeRegion,
  onUpdateChecklistItem,
  onNext,
  onBack,
}) => {
  // Free seller items vs professional lawyer review items
  const freeSellerItems = checklist.filter(
    (item) => item.whoToContact === 'Seller / Developer' || item.whoToContact === 'Self'
  );
  const lawyerItems = checklist.filter(
    (item) => item.whoToContact === 'Property Lawyer' || item.status === 'needs-pro'
  );

  // Region specific label
  const regionNames: Record<SupportedRegion, string> = {
    maharashtra: 'Maharashtra (MahaRERA & IGR)',
    karnataka: 'Karnataka (K-RERA & BBMP/BDA)',
    tamilNadu: 'Tamil Nadu (TNRERA & CMDA)',
    delhiNcr: 'Delhi / NCR (DDA & DTCP)',
    general: 'National RERA Framework',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          Step 4 of 5 • Verification & Legal Gating
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
          Independent Due Diligence & Legal Gates
        </h1>
        <p className="text-sm text-stone-500">
          Region: <strong className="text-stone-800">{regionNames[activeRegion]}</strong>. Separate what you can demand from the developer for free versus when to pay an independent property advocate.
        </p>
      </div>

      {/* 1. What is Already Cleared / Publicly Verified */}
      <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Publicly Established Status
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900">RERA Registration Status</div>
              <div className="text-stone-600">
                {property.reraId ? `Registered (${property.reraId})` : 'Self-declared by listing / promoter'}
              </div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900">Project Timeline & Phase</div>
              <div className="text-stone-600">
                {property.expectedPossession ? `Declared handover: ${property.expectedPossession}` : 'Under construction phase'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Free Seller Checks (What to Demand Before Paying Any Advance) */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Free Document Check (Demand from Developer)
            </h2>
            <p className="text-xs text-stone-500">
              Never pay more than ₹25,000 without examining these fundamental sanctions.
            </p>
          </div>
          <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
            {freeSellerItems.filter((i) => i.received).length}/{freeSellerItems.length} Received
          </span>
        </div>

        <div className="space-y-3">
          {freeSellerItems.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 text-sm">{item.title}</span>
                  {item.received ? (
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Received
                    </span>
                  ) : item.requested ? (
                    <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      Requested
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      Not Requested Yet
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500">{item.whyItMatters}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.requested && !item.received && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => onUpdateChecklistItem(item.id, { requested: true })}
                  >
                    Mark as Requested
                  </Button>
                )}
                {!item.received && (
                  <Button
                    size="sm"
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => onUpdateChecklistItem(item.id, { received: true, status: 'verified' })}
                  >
                    Mark Received
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. When & How to Involve an Independent Lawyer */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" /> When to Hire an Independent Lawyer
            </h2>
            <p className="text-xs text-stone-500">
              Avoid spending legal fees early. Engage an advocate only at this exact trigger point.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
              Standard Fee: ₹5,000 – ₹10,000
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100 space-y-2 text-xs text-stone-700 leading-relaxed">
          <div className="font-semibold text-purple-900 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> The Golden Rule for First-Time Buyers:
          </div>
          <p>
            Do <strong>NOT</strong> rely on the bank's panel advocate. Bank advocates verify title only to ensure the bank can recover loan money, not to safeguard your personal advance token!
          </p>
          <p>
            <strong>The Trigger Point:</strong> Only hire an advocate once you have finalized the price and are ready to execute the draft Agreement to Sale. Hand them the 30-year Search Report and Draft Agreement.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <div className="text-xs font-semibold text-stone-800">
            Tasks to hand directly to your lawyer:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>30-Year Encumbrance Search (Nil Encumbrance)</span>
            </div>
            <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>Draft Agreement unilateral clauses scrutiny</span>
            </div>
            <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>Joint Development Agreement (JDA) landowner share check</span>
            </div>
            <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>Commencement Certificate (CC) floor sanction validation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-stone-200">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto text-stone-600 inline-flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Market Reality
        </Button>

        <Button
          onClick={onNext}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm inline-flex items-center justify-center gap-2"
        >
          Generate Executive Decision Report <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
