'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyDetails, BuyerContext, ChecklistItem } from '@/types';
import { calculateFinancialIntelligence, formatCurrency } from '@/lib/calculations';
import { Printer, ArrowLeft, Check, Plus } from 'lucide-react';

interface Step5Props {
  property: PropertyDetails;
  buyerContext?: BuyerContext;
  checklist?: ChecklistItem[];
  onBack: () => void;
  onRequestSave?: () => void;
  isSaved?: boolean;
}

interface StageDocItem {
  id: string;
  title: string;
  purpose: string;
  whoVerifies: string;
  riskIfSkipped: string;
}

export const Step5DecisionReport: React.FC<Step5Props> = ({
  property,
  buyerContext = {},
  onBack,
  onRequestSave,
  isSaved = false,
}) => {
  const fin = calculateFinancialIntelligence(property, buyerContext);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const carpetArea = property.carpetArea || 1000;
  const askingRate =
    property.price > 0 && carpetArea > 0
      ? Math.round(property.price / carpetArea)
      : 8000;
  const medianLocalityRate = Math.round(askingRate * 0.92);
  const potentialSavings = Math.max(
    0,
    Math.round((askingRate - medianLocalityRate) * carpetArea)
  );

  const stage1Docs: StageDocItem[] = [
    {
      id: 's1-rera',
      title: 'RERA Registration Certificate & Sanctioned Layout',
      purpose:
        'Verify current validity date, registered land extent, and sanctioned plans on the state RERA portal.',
      whoVerifies: 'Request from Builder',
      riskIfSkipped:
        'Buying unapproved floors or delayed projects with lapsed RERA registration.',
    },
    {
      id: 's1-title',
      title: 'Title Deed & Revenue Records (7/12 Extract / RTC / Patta / Khata)',
      purpose:
        'Confirms developer has legal ownership or a registered Joint Development Agreement (JDA).',
      whoVerifies: 'Request from Builder',
      riskIfSkipped:
        'Unresolved land title disputes or ancestral claims over the project plot.',
    },
    {
      id: 's1-booking',
      title: 'Booking Form with Written Refund Clause',
      purpose:
        'Ensure a written 15–30 day refund clause if legal title is defective or loan sanction fails.',
      whoVerifies: 'Buyer Self-Check',
      riskIfSkipped:
        'Forfeiture of booking token under non-refundable allotment clauses.',
    },
  ];

  const stage2Docs: StageDocItem[] = [
    {
      id: 's2-ec',
      title: '30-Year Nil Encumbrance Certificate (EC)',
      purpose:
        'Sub-Registrar search confirming uninterrupted ownership without undisclosed mortgages or court liens.',
      whoVerifies: 'Independent Advocate',
      riskIfSkipped:
        'Existing lender charges or attachment orders over the project land.',
    },
    {
      id: 's2-cc',
      title: 'Commencement Certificate (CC) Validated for Unit Floor',
      purpose:
        'Municipal sanction approving vertical construction up to your specific floor number.',
      whoVerifies: 'Independent Advocate',
      riskIfSkipped:
        'Floors constructed above the sanctioned CC limit cannot receive an Occupancy Certificate.',
    },
    {
      id: 's2-noc',
      title: 'Project Lender NOC / Charge Release Letter',
      purpose:
        'Written release from the builder’s construction finance bank freeing your specific unit from their mortgage.',
      whoVerifies: 'Independent Advocate',
      riskIfSkipped:
        'Project lender retains mortgage rights over your flat if the builder defaults.',
    },
    {
      id: 's2-agreement',
      title: 'Draft Agreement for Sale Review',
      purpose:
        'Verify symmetric delay interest clauses, fixed possession date, and numbered covered parking.',
      whoVerifies: 'Independent Advocate',
      riskIfSkipped:
        'One-sided delay penalties and unallocated parking spaces.',
    },
  ];

  const stage3Docs: StageDocItem[] = [
    {
      id: 's3-oc',
      title: 'Occupancy Certificate (OC) / Completion Certificate',
      purpose:
        'Municipal certificate confirming the building complies with sanctioned plans and fire safety norms.',
      whoVerifies: 'Independent Advocate',
      riskIfSkipped:
        'Possession without OC attracts penalty utility tariffs and municipal notices.',
    },
    {
      id: 's3-snag',
      title: 'Pre-Handover Snagging & Carpet Area Measurement',
      purpose:
        'Verify actual RERA carpet area, plumbing gradients, electrical earthing, and wall dampness before signing handover.',
      whoVerifies: 'Snagging Engineer',
      riskIfSkipped:
        'Post-handover seepage and tile defects become the buyer’s responsibility.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 print:p-0 print:space-y-4 print:max-w-none print:text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ffffff14] print:border-stone-300 pb-6">
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1] print:text-stone-500">
            05 / EXECUTIVE DECISION DOSSIER
          </p>
          <h1 className="font-serif text-[32px] sm:text-[40px] text-[#fafafa] print:text-black tracking-[-0.025em] leading-[1.1]">
            {property.name || 'Property Decision Dossier'}
          </h1>
          <p className="text-[13px] text-[#a1a1a1] print:text-stone-600">
            {property.location || 'India'}
            {property.bhk ? ` · ${property.bhk}` : ''}
            {property.carpetArea ? ` · ${property.carpetArea} sq.ft` : ''}
            {property.reraId ? ` · RERA ${property.reraId}` : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#ffffff14] text-xs text-[#e5e5e5] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* 1. Key Financial Summary */}
      <div className="bg-[#141414] print:bg-white border border-[#ffffff14] print:border-stone-300 rounded-2xl p-6 sm:p-8 space-y-6 break-inside-avoid">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1a1] print:text-stone-500">
              Quoted Base
            </div>
            <div className="font-serif text-[24px] text-[#fafafa] print:text-black mt-1">
              {formatCurrency(property.price)}
            </div>
            <div className="text-[11px] text-[#666666] mt-0.5">
              ₹{askingRate.toLocaleString('en-IN')}/sq.ft
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#bda96d] print:text-stone-500">
              Handover Cash Needed
            </div>
            <div className="font-serif text-[24px] text-[#fafafa] print:text-black mt-1">
              {formatCurrency(fin.handoverCashNeeded)}
            </div>
            <div className="text-[11px] text-[#666666] mt-0.5">
              Non-loanable savings
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1a1] print:text-stone-500">
              Monthly Outflow
            </div>
            <div className="font-serif text-[24px] text-[#fafafa] print:text-black mt-1">
              {formatCurrency(fin.monthlyBurden.totalMonthlyOutflow)}/mo
            </div>
            <div className="text-[11px] text-[#666666] mt-0.5">
              EMI + maintenance
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#96a766] print:text-stone-500">
              Annual Tax Relief
            </div>
            <div className="font-serif text-[24px] text-[#96a766] print:text-emerald-700 mt-1">
              {formatCurrency(fin.taxSavings.totalAnnualTaxSaved)}/yr
            </div>
            <div className="text-[11px] text-[#666666] mt-0.5">
              Sec 24(b) + Sec 80C
            </div>
          </div>
        </div>

        {/* Hairline Cost Breakdown Table */}
        <div className="pt-6 border-t border-[#ffffff12] print:border-stone-200 divide-y divide-[#ffffff10] print:divide-stone-200 text-[13px]">
          <div className="py-2.5 flex justify-between">
            <span className="text-[#a1a1a1] print:text-stone-600">
              Minimum 20% Down Payment
            </span>
            <span className="text-[#fafafa] print:text-black font-medium">
              {formatCurrency(fin.breakdown.minimumDownPayment)}
            </span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-[#a1a1a1] print:text-stone-600">
              Stamp Duty &amp; Registration
            </span>
            <span className="text-[#fafafa] print:text-black font-medium">
              {formatCurrency(
                fin.breakdown.stampDuty + fin.breakdown.registration
              )}
            </span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-[#a1a1a1] print:text-stone-600">
              Society Corpus &amp; Advance Maintenance
            </span>
            <span className="text-[#fafafa] print:text-black font-medium">
              {formatCurrency(fin.breakdown.societyCorpus)}
            </span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-[#a1a1a1] print:text-stone-600">
              Parking, Infrastructure &amp; Fit-Out Buffer
            </span>
            <span className="text-[#fafafa] print:text-black font-medium">
              {formatCurrency(
                fin.breakdown.infrastructureAndParking +
                  fin.breakdown.interiorBuffer
              )}
            </span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-[#a1a1a1] print:text-stone-600">
              Stressed EMI (+1.25% Rate Hike)
            </span>
            <span className="text-[#bda96d] print:text-black font-medium">
              {formatCurrency(fin.stressTest.rateHikeEmi)}/mo (DTI:{' '}
              {fin.stressTest.dtiStressed}%)
            </span>
          </div>
          {potentialSavings > 0 && (
            <div className="py-2.5 flex justify-between">
              <span className="text-[#a1a1a1] print:text-stone-600">
                Estimated Negotiation Margin vs. Locality Median
              </span>
              <span className="text-[#96a766] print:text-black font-medium">
                {formatCurrency(potentialSavings)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. 3-Stage Verification Roadmap */}
      <div className="bg-[#141414] print:bg-white border border-[#ffffff14] print:border-stone-300 rounded-2xl p-6 sm:p-8 space-y-6 break-inside-avoid">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1] print:text-stone-500">
            VERIFICATION ROADMAP
          </p>
          <h3 className="font-serif text-[24px] text-[#fafafa] print:text-black mt-1">
            Stage-gated document checklist
          </h3>
        </div>

        {[
          {
            code: 'STAGE 01',
            title: 'Before paying booking token',
            docs: stage1Docs,
          },
          {
            code: 'STAGE 02',
            title: 'Before signing Agreement for Sale (10%–20% stage)',
            docs: stage2Docs,
          },
          {
            code: 'STAGE 03',
            title: 'Before final possession & key handover',
            docs: stage3Docs,
          },
        ].map((stage) => (
          <div key={stage.code} className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-[#ffffff12] print:border-stone-200 pb-2">
              <span className="text-[12px] font-medium text-[#fafafa] print:text-black">
                <span className="font-mono text-[#a1a1a1] mr-2">
                  {stage.code}
                </span>
                {stage.title}
              </span>
            </div>

            <div className="divide-y divide-[#ffffff0d] print:divide-stone-200">
              {stage.docs.map((doc) => {
                const isChecked = checkedDocs[doc.id];
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className="py-3.5 flex items-start gap-3.5 cursor-pointer"
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#fafafa] border-[#fafafa] text-[#0a0a0a]'
                          : 'border-[#ffffff28] bg-[#0a0a0a] print:border-stone-400 print:bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span
                          className={`text-[13px] font-medium ${
                            isChecked
                              ? 'line-through text-[#666666]'
                              : 'text-[#fafafa] print:text-black'
                          }`}
                        >
                          {doc.title}
                        </span>
                        <span className="text-[11px] font-mono text-[#a1a1a1] print:text-stone-600">
                          {doc.whoVerifies}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#a1a1a1] print:text-stone-600 leading-relaxed">
                        {doc.purpose}
                      </p>
                      <p className="text-[11px] text-[#666666] print:text-stone-500">
                        Risk if skipped: {doc.riskIfSkipped}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Site-Visit Questions */}
      <div className="bg-[#141414] print:bg-white border border-[#ffffff14] print:border-stone-300 rounded-2xl p-6 sm:p-8 space-y-4 break-inside-avoid">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1] print:text-stone-500">
            BUILDER MEETING BRIEF
          </p>
          <h3 className="font-serif text-[24px] text-[#fafafa] print:text-black mt-1">
            Questions to ask at the sales office
          </h3>
        </div>

        <div className="divide-y divide-[#ffffff10] print:divide-stone-200 text-[13px]">
          {[
            {
              q: '1. Is the quoted price inclusive of floor rise, PLC, club membership, and covered parking?',
              a: 'Prevents ₹5–₹8L of unquoted add-ons from appearing on the cost sheet.',
            },
            {
              q: '2. Can we inspect the Commencement Certificate (CC) approved up to this exact floor?',
              a: 'Confirms municipal approval exists for your floor, not just lower plinth levels.',
            },
            {
              q: '3. Which bank holds the project construction mortgage, and will a NOC be issued for this flat?',
              a: 'Required to ensure the builder’s project lender has no lien on your unit.',
            },
            {
              q: '4. Does the allotment letter allow a full refund if our advocate flags a title defect?',
              a: 'Protects your token payment while your lawyer reviews the 30-year title search.',
            },
          ].map((item, i) => (
            <div key={i} className="py-3.5 space-y-1">
              <div className="font-medium text-[#fafafa] print:text-black">
                {item.q}
              </div>
              <div className="text-[12px] text-[#a1a1a1] print:text-stone-600">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Workspace Loop Card (Print Hidden) */}
      <div className="rounded-2xl bg-[#141414] border border-[#ffffff14] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h3 className="font-serif text-[22px] text-[#fafafa]">
            {isSaved
              ? 'Evaluate another shortlisted property'
              : 'Save this dossier or compare another property'}
          </h3>
          <p className="text-[13px] text-[#a1a1a1] mt-1">
            {isSaved
              ? 'Your dossier is saved in your workspace. Add another listing to compare costs side-by-side.'
              : 'Sign in to keep this dossier across devices, or return to your workspace to audit another property.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {!isSaved && onRequestSave && (
            <button
              type="button"
              onClick={onRequestSave}
              className="px-4 py-2.5 rounded-full bg-[#0a0a0a] hover:bg-[#1f1f1f] border border-[#ffffff14] text-xs font-medium text-[#fafafa] cursor-pointer"
            >
              Save to account
            </button>
          )}
          <Link
            href="/dashboard?new=true"
            className="px-5 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-xs font-medium inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Property</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
