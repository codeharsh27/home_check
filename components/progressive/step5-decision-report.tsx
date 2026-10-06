'use client';

import React, { useState } from 'react';
import { PropertyDetails, BuyerContext, ChecklistItem } from '@/types';
import { calculateFinancialIntelligence, formatCurrency } from '@/lib/calculations';
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  MapPin,
  ArrowLeft,
  Building,
  UserCheck,
  Scale,
  Sparkles,
  DollarSign,
  Briefcase,
  HardHat,
  BadgePercent,
  CheckSquare,
  Clock,
  Coins,
  ChevronDown,
  Info,
  Check,
  Calculator,
  Flame,
  FileCheck2,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  whoVerifies: 'Developer Free Check' | 'Independent Advocate Mandatory' | 'Civil / Snagging Engineer' | 'Buyer Self-Check';
  badgeColor: string;
  riskIfSkipped: string;
}

export const Step5DecisionReport: React.FC<Step5Props> = ({
  property,
  buyerContext = {},
  checklist = [],
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

  // Stage-Gated Documents
  const stage1Docs: StageDocItem[] = [
    {
      id: 's1-rera',
      title: 'RERA Registration Certificate & Sanctioned Layout',
      purpose: 'Verify current validity date, registered land extent, and sanctioned project plans on state RERA website.',
      whoVerifies: 'Developer Free Check',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      riskIfSkipped: 'Risk of buying unapproved floors or delayed projects with revoked registrations.',
    },
    {
      id: 's1-title',
      title: 'Title Deed & Revenue Records (7/12 Extract / RTC / Patta / Khata)',
      purpose: 'Confirms developer has legal ownership or a valid Registered Joint Development Agreement (JDA).',
      whoVerifies: 'Developer Free Check',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      riskIfSkipped: 'Inheriting ancestral agricultural land disputes or pending civil title claims.',
    },
    {
      id: 's1-booking',
      title: 'Booking Form / EOI Draft with Explicit Refund Clause',
      purpose: 'Demand written 15-30 day refund provision if title is defective or bank loan is rejected.',
      whoVerifies: 'Buyer Self-Check',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      riskIfSkipped: 'Builders forfeit 100% token advance if form states "Non-refundable under all circumstances".',
    },
  ];

  const stage2Docs: StageDocItem[] = [
    {
      id: 's2-ec',
      title: '30-Year Nil Encumbrance Certificate (EC - Form 15)',
      purpose: 'Sub-Registrar record proving land has had uninterrupted clean ownership without mortgages or court liens.',
      whoVerifies: 'Independent Advocate Mandatory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      riskIfSkipped: 'Existing bank charges or attachment by prior creditors over the project land.',
    },
    {
      id: 's2-cc',
      title: 'Commencement Certificate (CC) Validated for Unit Floor',
      purpose: 'Municipal body sanction approving vertical structural construction up to your exact flat floor.',
      whoVerifies: 'Independent Advocate Mandatory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      riskIfSkipped: 'Floors constructed beyond the sanctioned CC are illegal and subject to demolition.',
    },
    {
      id: 's2-jda',
      title: 'Joint Development Agreement (JDA) & Allocation Matrix',
      purpose: 'If joint venture, verifies whether your specific unit belongs to the builder share or landowner share.',
      whoVerifies: 'Independent Advocate Mandatory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      riskIfSkipped: 'Double-selling where landowner sells the flat already promised to developer buyers.',
    },
    {
      id: 's2-noc',
      title: 'Construction Lender Bank NOC / Charge Release',
      purpose: 'Formal release letter from the builder’s project finance bank stating your flat is free of their mortgage.',
      whoVerifies: 'Independent Advocate Mandatory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      riskIfSkipped: 'Lender holds mortgage over the building and can seal flats if builder defaults.',
    },
    {
      id: 's2-agreement',
      title: 'Draft Agreement for Sale (RERA Model Agreement Check)',
      purpose: 'Scrutinize for equal delay compensation clauses, fixed possession date, and covered car parking assignment.',
      whoVerifies: 'Independent Advocate Mandatory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      riskIfSkipped: 'One-sided developer clauses demanding 18% penal interest while paying only 2% on delivery delays.',
    },
  ];

  const stage3Docs: StageDocItem[] = [
    {
      id: 's3-oc',
      title: 'Occupancy Certificate (OC) / Completion Certificate',
      purpose: 'Statutory certificate issued by municipal authority confirming building is completed per safety codes.',
      whoVerifies: 'Independent Advocate Mandatory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      riskIfSkipped: 'Living without OC is legally unauthorized; water/electricity tariffs charged at commercial penalty rates.',
    },
    {
      id: 's3-snag',
      title: '150-Point Snagging Audit & Laser Carpet Measurement',
      purpose: 'Verify actual RERA carpet area (shortfall >3% requires refund), hollow tile testing, and plumbing gradient.',
      whoVerifies: 'Civil / Snagging Engineer',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      riskIfSkipped: 'Once you sign possession handover, builders rarely repair latent seepage or electrical defects.',
    },
    {
      id: 's3-utilities',
      title: 'Permanent Municipal Water & Power Sanctions',
      purpose: 'Direct individual meter clearances and municipal water mains connection, not temporary construction tankers.',
      whoVerifies: 'Buyer Self-Check',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      riskIfSkipped: 'Lifelong dependency on costly tanker water and erratic diesel generator power backup.',
    },
    {
      id: 's3-parking',
      title: 'Demarcated Covered Parking Allotment Letter',
      purpose: 'Numbered, demarcated stilt/basement slot with layout diagram signed and stamped by promoter.',
      whoVerifies: 'Buyer Self-Check',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      riskIfSkipped: 'Perpetual society disputes over open parking spaces sold multiple times.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:space-y-4 print:max-w-none">
      {/* Header with Print Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 print:hidden">
            Step 5 of 5 • Final Decision Dossier & Verification Roadmap
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            HomeCheck Property Decision Dossier
          </h1>
          <p className="text-xs text-stone-500">
            Stage-gated verification checklist, professional advisory briefing, and platform financial intelligence report.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto print:hidden">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto text-stone-600 inline-flex items-center justify-center gap-1.5 hover:bg-stone-50"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Verification
          </Button>
          {!isSaved && onRequestSave && (
            <Button
              variant="outline"
              onClick={onRequestSave}
              className="w-full sm:w-auto text-blue-700 bg-blue-50/70 hover:bg-blue-100 border-blue-200 inline-flex items-center justify-center gap-1.5 shadow-xs font-semibold"
            >
              <Bookmark className="w-4 h-4 text-blue-600" /> Save to Account
            </Button>
          )}
          <Button
            onClick={handlePrint}
            className="w-full sm:w-auto bg-stone-900 hover:bg-black text-white inline-flex items-center justify-center gap-1.5 shadow-sm px-4"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF Dossier
          </Button>
        </div>
      </div>

      {/* 1. Executive Summary Strip */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-5 break-inside-avoid">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-stone-400">Target Property</div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">{property.name}</h2>
            <div className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{property.location || 'Micro-market'}, {property.city || ''}</span>
              {property.reraId && (
                <span className="ml-2 px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px] font-mono">
                  RERA: {property.reraId}
                </span>
              )}
            </div>
          </div>
          <div className="text-left sm:text-right bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
            <div className="text-xs text-stone-500 font-medium">Base Agreement Value</div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {formatCurrency(property.price)}
            </div>
            <div className="text-xs text-blue-600 font-semibold mt-0.5">
              ₹{askingRate.toLocaleString('en-IN')}/sq.ft carpet ({carpetArea} sq.ft)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-stone-50/90 border border-stone-100">
            <div className="text-[11px] uppercase tracking-wide text-stone-500 font-medium">Total Handover Cash Outflow</div>
            <div className="text-base font-bold text-stone-900 mt-1">
              {formatCurrency(fin.handoverCashNeeded)}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              Down payment + Stamp Duty + Corpus + Fitouts
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50/90 border border-stone-100">
            <div className="text-[11px] uppercase tracking-wide text-stone-500 font-medium">Monthly Outflow Burden</div>
            <div className="text-base font-bold text-stone-900 mt-1">
              {formatCurrency(fin.monthlyBurden.totalMonthlyOutflow)}/mo
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              EMI + Society Maintenance + Taxes
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50/90 border border-stone-100">
            <div className="text-[11px] uppercase tracking-wide text-stone-500 font-medium">Annual Tax Saved</div>
            <div className="text-base font-bold text-emerald-700 mt-1">
              ~{formatCurrency(fin.taxSavings.totalAnnualTaxSaved)}/yr
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              Sec 24(b) + Sec 80C deductions
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50/90 border border-stone-100">
            <div className="text-[11px] uppercase tracking-wide text-stone-500 font-medium">Negotiation Target</div>
            <div className="text-base font-bold text-stone-900 mt-1">
              {potentialSavings > 0 ? `Save ${formatCurrency(potentialSavings)}` : 'Fair Base Rate'}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              Compared to locality median closes
            </div>
          </div>
        </div>
      </div>

      {/* 2. STAGE-GATED DOCUMENT CHECKLIST */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-6 break-inside-avoid">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              Stage-Gated Document Verification Checklist
            </h3>
            <span className="text-[11px] text-stone-400 font-medium print:hidden">Click checkboxes to mark verified</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Real estate transactions operate under 3 strict risk stages. Inspect and clear each document before releasing funds at that milestone.
          </p>
        </div>

        {/* Stage 1 */}
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wide mr-2">
                Stage 1
              </span>
              <span className="text-sm font-bold text-stone-900">Pre-Booking & Token Advance</span>
              <span className="text-xs text-stone-500 ml-2">(Max Token ₹25,000 – ₹50,000)</span>
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              Milestone: Before signing booking form or issuing advance cheque
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {stage1Docs.map((doc) => {
              const isChecked = checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex items-start gap-3.5"
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {doc.title}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${doc.badgeColor} shrink-0`}>
                        {doc.whoVerifies}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{doc.purpose}</p>
                    <div className="text-[10px] text-amber-700 bg-amber-50/60 rounded px-2 py-1 mt-1 inline-block">
                      <span className="font-semibold">Risk if skipped: </span>{doc.riskIfSkipped}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage 2 */}
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 uppercase tracking-wide mr-2">
                Stage 2
              </span>
              <span className="text-sm font-bold text-stone-900">Pre-Agreement Execution</span>
              <span className="text-xs text-rose-600 font-semibold ml-2">(Before Paying 10% – 20% Down Payment)</span>
            </div>
            <div className="text-[11px] text-rose-700 font-medium">
              Milestone: Hire independent lawyer before signing
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {stage2Docs.map((doc) => {
              const isChecked = checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex items-start gap-3.5"
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {doc.title}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${doc.badgeColor} shrink-0`}>
                        {doc.whoVerifies}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{doc.purpose}</p>
                    <div className="text-[10px] text-rose-700 bg-rose-50/60 rounded px-2 py-1 mt-1 inline-block">
                      <span className="font-semibold">Risk if skipped: </span>{doc.riskIfSkipped}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage 3 */}
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide mr-2">
                Stage 3
              </span>
              <span className="text-sm font-bold text-stone-900">Pre-Possession & Key Handover</span>
              <span className="text-xs text-stone-500 ml-2">(Before Final Milestone & Disbursal)</span>
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              Milestone: Physical inspection & statutory clearances
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {stage3Docs.map((doc) => {
              const isChecked = checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex items-start gap-3.5"
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className={`text-xs font-bold ${isChecked ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                        {doc.title}
                      </div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${doc.badgeColor} shrink-0`}>
                        {doc.whoVerifies}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{doc.purpose}</p>
                    <div className="text-[10px] text-amber-800 bg-amber-50/60 rounded px-2 py-1 mt-1 inline-block">
                      <span className="font-semibold">Risk if skipped: </span>{doc.riskIfSkipped}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. WHERE TO HIRE PROFESSIONALS (EXPERT ENGAGEMENT GUIDE) */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-5 break-inside-avoid">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-600" />
            Where & When to Engage Independent Professionals
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Buying a home is your life’s largest financial transaction. Do not rely solely on the developer’s marketing desk or the bank loan lawyer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Professional 1: Independent Property Lawyer */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-purple-100 text-purple-800">
                  <Scale className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-200/60 text-purple-900">
                  Stage 2 • Mandatory
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-900">Independent Property Advocate</h4>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Conducts 30-year sub-registrar title search, examines JDA agreements, drafts legal search report, and flags one-sided developer clauses in Agreement for Sale.
              </p>
            </div>
            <div className="pt-2 border-t border-purple-100 text-[11px] space-y-1">
              <div className="text-stone-500">Typical Fee: <span className="font-semibold text-stone-900">₹12,000 – ₹25,000</span></div>
              <div className="text-[10px] text-purple-900 font-medium">
                💡 Bank lawyers only protect bank mortgage rights, not your consumer protections.
              </div>
            </div>
          </div>

          {/* Professional 2: Civil / Snagging Engineer */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-amber-100 text-amber-800">
                  <HardHat className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/60 text-amber-900">
                  Stage 3 • Recommended
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-900">Certified Snagging Auditor</h4>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Uses laser distance meters to verify RERA carpet area, acoustic tap tests for hollow tiles, thermal scanners for concealed wall seepage, and plumbing gradient audits.
              </p>
            </div>
            <div className="pt-2 border-t border-amber-100 text-[11px] space-y-1">
              <div className="text-stone-500">Typical Fee: <span className="font-semibold text-stone-900">₹8,000 – ₹15,000</span></div>
              <div className="text-[10px] text-amber-900 font-medium">
                💡 Under RERA Sec 14(3), builders must fix all audited defects free of cost for 5 years.
              </div>
            </div>
          </div>

          {/* Professional 3: Chartered Accountant (CA) */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Briefcase className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900">
                  Financial Planning
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-900">Chartered Accountant (CA)</h4>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Advises on optimal co-ownership split (claiming double Sec 24b deductions up to ₹4L), Sec 54 capital gains rollover from previous properties, and female co-owner 1% stamp tax savings.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-100 text-[11px] space-y-1">
              <div className="text-stone-500">Typical Fee: <span className="font-semibold text-stone-900">₹3,000 – ₹7,000</span></div>
              <div className="text-[10px] text-emerald-900 font-medium">
                💡 Dual tax deduction claim saves up to ₹1.2L in cash income tax each financial year.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. COMPLETE FINANCIAL BLUEPRINT & CASH DRAIN LADDER */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-6 break-inside-avoid">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            True Handover Cash Drain Ladder
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Banks cap home loans at 80% of the Base Agreement Value only. All statutory taxes, corpus deposits, and fitouts must be paid 100% out-of-pocket from liquid savings.
          </p>
        </div>

        <div className="border border-stone-200 rounded-xl overflow-x-auto">
          <table className="w-full min-w-[500px] text-xs text-left">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
              <tr>
                <th className="py-2.5 px-4">Financial Component</th>
                <th className="py-2.5 px-4">Financing Rule</th>
                <th className="py-2.5 px-4 text-right">Amount Required</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr className="bg-stone-50/30">
                <td className="py-2.5 px-4 font-semibold text-stone-900">1. Base Agreement Value</td>
                <td className="py-2.5 px-4 text-stone-500">Subject to 80% maximum bank loan</td>
                <td className="py-2.5 px-4 text-right font-bold text-stone-900">{formatCurrency(fin.breakdown.basePrice)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-stone-700 pl-8">↳ Maximum Bank Home Loan (80% LTV)</td>
                <td className="py-2.5 px-4 text-emerald-600 font-medium">Funded by Bank Disbursal</td>
                <td className="py-2.5 px-4 text-right text-emerald-700 font-medium">({formatCurrency(fin.breakdown.maxLoanEligible)})</td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="py-2.5 px-4 font-semibold text-stone-900 pl-8">↳ Minimum Cash Down Payment (20%)</td>
                <td className="py-2.5 px-4 text-amber-700 font-medium">Buyer Direct Outflow</td>
                <td className="py-2.5 px-4 text-right font-bold text-amber-900">{formatCurrency(fin.breakdown.minimumDownPayment)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-stone-800">2. Stamp Duty & Registration Charges</td>
                <td className="py-2.5 px-4 text-stone-500">Non-financeable statutory fee</td>
                <td className="py-2.5 px-4 text-right font-medium text-stone-900">{formatCurrency(fin.breakdown.stampDuty + fin.breakdown.registration)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-stone-800">3. Society Sinking Fund & Advance Maintenance</td>
                <td className="py-2.5 px-4 text-stone-500">1-2 years collected by builder at handover</td>
                <td className="py-2.5 px-4 text-right font-medium text-stone-900">{formatCurrency(fin.breakdown.societyCorpus)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-stone-800">4. Car Parking & Infrastructure Development Charges</td>
                <td className="py-2.5 px-4 text-stone-500">Electricity meter, transformer, cabling</td>
                <td className="py-2.5 px-4 text-right font-medium text-stone-900">{formatCurrency(fin.breakdown.infrastructureAndParking)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-stone-800">5. Essential Modular Interiors & Fit-Out Buffer</td>
                <td className="py-2.5 px-4 text-stone-500">Kitchen, wardrobes, lights, painting (minimum 7%)</td>
                <td className="py-2.5 px-4 text-right font-medium text-stone-900">{formatCurrency(fin.breakdown.interiorBuffer)}</td>
              </tr>
              <tr className="bg-stone-900 text-white font-bold text-sm">
                <td className="py-3 px-4">TOTAL OUT-OF-POCKET CASH REQUIRED AT HANDOVER</td>
                <td className="py-3 px-4 text-stone-300 font-normal text-xs">All non-loan savings committed</td>
                <td className="py-3 px-4 text-right text-emerald-400 font-black text-base">{formatCurrency(fin.handoverCashNeeded)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Stress-Test & Monthly Burden */}
        <div className="pt-2">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-rose-600" />
            Monthly Cash Outflow & Floating Rate Stress Test (+1.25% RBI Hike)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <div className="text-[11px] text-stone-500">Current Monthly Outflow</div>
              <div className="text-base font-bold text-stone-900 mt-1">
                {formatCurrency(fin.monthlyBurden.totalMonthlyOutflow)}/mo
              </div>
              <div className="text-[10px] text-stone-500 mt-1">
                EMI: {formatCurrency(fin.monthlyBurden.baseEmi)} + Maint: {formatCurrency(fin.monthlyBurden.societyMaintenance)} + Tax: {formatCurrency(fin.monthlyBurden.propertyTax)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200">
              <div className="text-[11px] text-rose-800 font-medium">Stressed EMI (+1.25% Repo Hike)</div>
              <div className="text-base font-bold text-rose-900 mt-1">
                {formatCurrency(fin.stressTest.rateHikeEmi)}/mo
              </div>
              <div className="text-[10px] text-rose-700 mt-1">
                +{formatCurrency(fin.stressTest.rateHikeEmi - fin.monthlyBurden.baseEmi)}/month jump or +{fin.stressTest.tenureStretchMonths} mo tenure extension
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <div className="text-[11px] text-stone-500">Debt-to-Income (DTI) Ratio</div>
              <div className="text-base font-bold text-stone-900 mt-1">
                {fin.stressTest.dtiCurrent}% → {fin.stressTest.dtiStressed}% Stressed
              </div>
              <div className="text-[10px] text-stone-500 mt-1">
                {fin.stressTest.dtiStressed <= 40 ? 'Safe (<40% threshold)' : 'Tight leverage (>40% threshold)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MONEY-SAVING STRATEGIES & TAX OPTIMIZATION */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-5 break-inside-avoid">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            Where to Save Money: 4 Actionable Financial Optimizations
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Proven strategies calculated by our intelligence engine to cut upfront expenses, reduce income tax, and shave lakhs off mortgage interest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strategy 1: Income Tax Deductions */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-emerald-600" />
                1. Annual Income Tax Rebates
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                Save ~{formatCurrency(fin.taxSavings.totalAnnualTaxSaved)}/yr
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              • <span className="font-semibold text-stone-900">Section 24(b):</span> Deduct up to {formatCurrency(fin.taxSavings.section24InterestDeduction)} home loan interest annually (up to ₹4L if co-borrowing with spouse).<br />
              • <span className="font-semibold text-stone-900">Section 80C:</span> Claim up to {formatCurrency(fin.taxSavings.section80CPrincipal)} for principal repayment and registration in Year 1.
            </p>
          </div>

          {/* Strategy 2: Female Co-Ownership */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                2. Female Co-Owner Concession
              </div>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded">
                Save {formatCurrency(property.price > 0 ? Math.round(property.price * 0.01) : 0)} Upfront
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              In states like Maharashtra, Delhi, Haryana, and UP, adding a female co-owner grants a <span className="font-semibold text-stone-900">1% concession on stamp duty</span>. On an agreement value of {formatCurrency(property.price)}, this saves {formatCurrency(property.price > 0 ? Math.round(property.price * 0.01) : 0)} in immediate cash.
            </p>
          </div>

          {/* Strategy 3: 1 Extra EMI Per Year */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600" />
                3. The 1-Extra-EMI Prepayment Hack
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                Save ~{formatCurrency(fin.taxSavings.prepaymentSavings.interestSaved)} Interest
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Paying just 1 extra EMI per year ({formatCurrency(fin.taxSavings.prepaymentSavings.extraEmiPerYear)}) directly to principal cuts your total loan tenure by <span className="font-semibold text-stone-900">~{fin.taxSavings.prepaymentSavings.yearsSaved} years</span> and eliminates massive compounding interest charges.
            </p>
          </div>

          {/* Strategy 4: Locality Rate Negotiation */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-blue-600" />
                4. Micro-Market Rate Leverage
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                {potentialSavings > 0 ? `Target ${formatCurrency(potentialSavings)}` : 'Fair Pricing'}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Asking rate is ₹{askingRate.toLocaleString('en-IN')}/sq.ft vs. locality median close rate of ₹{medianLocalityRate.toLocaleString('en-IN')}/sq.ft. Use the comparable properties from Step 3 to negotiate down Floor Rise and PLC premiums before paying token money.
            </p>
          </div>
        </div>
      </div>

      {/* 6. QUESTIONS TO ASK DEVELOPER SALES REPRESENTATIVE */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-4 break-inside-avoid">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" /> 5 Exact Questions for the Developer Sales Office
        </h3>
        <p className="text-xs text-stone-500">
          Walk into the sales meeting with these specific inquiries to avoid unbudgeted escalations:
        </p>

        <div className="space-y-3 pt-1">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
            <div className="font-semibold text-stone-900">
              1. "Is the quoted rate all-inclusive of PLC, Floor Rise, and 2 covered parking slots?"
            </div>
            <div className="text-stone-500 text-[11px]">
              Developers often quote a low base rate, then tack on ₹5–₹8 Lakhs in floor rise and clubhouse charges at agreement signing.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
            <div className="font-semibold text-stone-900">
              2. "Can you provide the Commencement Certificate (CC) validated up to my specific floor?"
            </div>
            <div className="text-stone-500 text-[11px]">
              Check that municipal authorities have sanctioned construction for your specific floor, not just the foundation or lower 5 slabs.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
            <div className="font-semibold text-stone-900">
              3. "What is the advance maintenance deposit timeline, and which bank escrow holds it?"
            </div>
            <div className="text-stone-500 text-[11px]">
              Ensures money collected for society formation isn't mingled into general construction operations.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
            <div className="font-semibold text-stone-900">
              4. "Is this land freehold or leasehold, and is there any bank mortgage charge on it?"
            </div>
            <div className="text-stone-500 text-[11px]">
              If the builder took project finance from a lender, you require an explicit Bank NOC before registering your individual unit.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
            <div className="font-semibold text-stone-900">
              5. "Will you agree to a standard refund clause if home loan eligibility fails or CC is delayed beyond 60 days?"
            </div>
            <div className="text-stone-500 text-[11px]">
              Never sign a booking form that states 'Token advance is 100% non-refundable under all circumstances'.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

