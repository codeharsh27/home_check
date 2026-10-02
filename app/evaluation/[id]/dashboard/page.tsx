"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { CheckCircle2, AlertTriangle, ShieldCheck, FileText, Share2, Download, ArrowRight, RotateCcw } from "lucide-react";
import { ChecklistItem } from "@/types";

export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const evalId = (params.id as string) || "demo";

  const { currentEvaluation, loadEvaluation } = useEvaluationStore();
  const [exported, setExported] = useState(false);

  useEffect(() => {
    if (evalId && evalId !== "demo") {
      loadEvaluation(evalId);
    }
  }, [evalId]);

  const property = currentEvaluation?.property || {
    name: "Green Valley Residency",
    type: "Apartment",
    price: 6800000,
    location: "Wakad, Pune",
  };

  const context = currentEvaluation?.buyerContext;
  const checklist: ChecklistItem[] = currentEvaluation?.checklist || [];

  const effectiveFunds = Math.max(0, (context?.availableFunds || 0) - (context?.emergencyReserve || 0));
  const plannedLoan = 4500000;
  const gap = Math.max(0, property.price - (effectiveFunds + plannedLoan));

  const verifiedItems = checklist.filter((i) => i.received || i.status === "verified");
  const pendingItems = checklist.filter((i) => !i.received && i.status !== "verified");
  const proReviewCount = checklist.filter((i) => i.status === "needs-pro" || i.id === "item_litigation").length;

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-5xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Screen 08</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Decision Readiness Dashboard</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              Aggregated evaluation status based on verified evidence, financial gap, and legal review requirements.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-3.5 h-3.5" />
              <span>{exported ? "Downloaded PDF!" : "Export Summary"}</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => router.push("/")}>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New evaluation</span>
            </Button>
          </div>
        </div>

        {/* Property Summary Header */}
        <div className="bg-[#121212] border border-[#232323] p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#5B8BDF] uppercase tracking-wider">
              {property.type} · {property.location}
            </span>
            <h2 className="text-xl font-bold text-[#EDEDED]">{property.name}</h2>
          </div>
          <div className="text-left sm:text-right font-mono">
            <span className="text-[10px] text-[#777777] uppercase block">Listed Price</span>
            <span className="text-xl font-bold text-[#EDEDED]">₹{(property.price / 100000).toFixed(2)}L</span>
          </div>
        </div>

        {/* 4 Status Indicator Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Financial */}
          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">FINANCIAL</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#D4A017]">
              <span>🟡</span>
              <span>{gap > 0 ? `₹${(gap / 100000).toFixed(2)}L Gap` : "Fully Funded"}</span>
            </div>
            <span className="text-[11px] text-[#666666] block">Cash + loan analysis</span>
          </div>

          {/* Card 2: Property Info */}
          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">PROPERTY INFO</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#3F9E6C]">
              <span>🟢</span>
              <span>8 / 12 Fields</span>
            </div>
            <span className="text-[11px] text-[#666666] block">Source completeness</span>
          </div>

          {/* Card 3: Due Diligence */}
          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">DUE DILIGENCE</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#D4A017]">
              <span>🟡</span>
              <span>{pendingItems.length} Pending</span>
            </div>
            <span className="text-[11px] text-[#666666] block">Checklist progress</span>
          </div>

          {/* Card 4: Professional Review */}
          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">PRO REVIEW</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#E6832A]">
              <span>🟠</span>
              <span>{proReviewCount} Required</span>
            </div>
            <span className="text-[11px] text-[#666666] block">Title & litigation</span>
          </div>
        </div>

        {/* Readiness Statement Box */}
        <div className="bg-[#141414] border border-[#282828] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-[#202020] pb-4">
            <div className="w-9 h-9 rounded-lg bg-[#E6832A]/15 border border-[#E6832A]/30 flex items-center justify-center text-[#E6832A]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#EDEDED]">Evaluation Status Summary</h3>
              <p className="text-xs text-[#888888]">Objective assessment of current information state</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-2">
            <p className="text-sm font-semibold text-[#EDEDED] leading-relaxed">
              You do not yet have enough verified information to complete your evaluation.
            </p>
            <p className="text-xs text-[#888888] leading-relaxed">
              {pendingItems.length} due diligence items and {proReviewCount} professional legal review areas remain unresolved. Resolving these before paying token amounts protects your financial commitment.
            </p>
          </div>
        </div>

        {/* What's Complete vs Pending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: What is Complete */}
          <div className="bg-[#121212] border border-[#222222] p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F9E6C] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3F9E6C]" />
              What Is Complete ({verifiedItems.length + 2})
            </h3>
            <div className="space-y-2 text-xs text-[#CCCCCC]">
              <div className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                ✓ Property listing profile confirmed
              </div>
              <div className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                ✓ Financial gap and monthly EMI estimated
              </div>
              {verifiedItems.map((item) => (
                <div key={item.id} className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                  ✓ {item.title} ({item.status})
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: What is Still Pending */}
          <div className="bg-[#121212] border border-[#222222] p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#E6832A] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E6832A]" />
              What Is Still Pending ({pendingItems.length})
            </h3>
            <div className="space-y-2 text-xs text-[#CCCCCC]">
              {gap > 0 && (
                <div className="p-2.5 rounded bg-[#161616] border border-[#262626] text-[#E6832A]">
                  ○ Estimated ₹{(gap / 100000).toFixed(2)}L funding gap resolution
                </div>
              )}
              {pendingItems.map((item) => (
                <div key={item.id} className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                  ○ {item.title} ({item.nextAction})
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
