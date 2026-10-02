"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { CheckCircle2, AlertTriangle, Download, RotateCcw } from "lucide-react";
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
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5] flex flex-col md:flex-row font-sans">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-5xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23262D] pb-4">
          <div>
            <span className="text-xs font-mono text-[#D97706] uppercase tracking-wider">Screen 08</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F0F2F5]">Decision Readiness Dashboard</h1>
            <p className="text-xs text-[#8A8F9E] mt-0.5">
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
        <div className="bg-[#16181D] border border-[#262930] p-5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#D97706] uppercase tracking-wider">
              {property.type} · {property.location}
            </span>
            <h2 className="text-xl font-semibold text-[#F0F2F5]">{property.name}</h2>
          </div>
          <div className="text-left sm:text-right font-mono">
            <span className="text-[10px] text-[#6B7280] uppercase block">Listed Price</span>
            <span className="text-xl font-bold text-[#F0F2F5]">₹{(property.price / 100000).toFixed(2)}L</span>
          </div>
        </div>

        {/* 4 Status Indicator Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: Financial */}
          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E]">FINANCIAL</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#F59E0B]">
              <span>🟡</span>
              <span>{gap > 0 ? `₹${(gap / 100000).toFixed(2)}L Gap` : "Fully Funded"}</span>
            </div>
            <span className="text-[11px] text-[#6B7280] block">Cash + loan analysis</span>
          </div>

          {/* Card 2: Property Info */}
          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E]">PROPERTY INFO</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#10B981]">
              <span>🟢</span>
              <span>8 / 12 Fields</span>
            </div>
            <span className="text-[11px] text-[#6B7280] block">Source completeness</span>
          </div>

          {/* Card 3: Due Diligence */}
          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E]">DUE DILIGENCE</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#F59E0B]">
              <span>🟡</span>
              <span>{pendingItems.length} Pending</span>
            </div>
            <span className="text-[11px] text-[#6B7280] block">Checklist progress</span>
          </div>

          {/* Card 4: Professional Review */}
          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E]">PRO REVIEW</span>
            <div className="flex items-center gap-1.5 font-bold text-base text-[#F97316]">
              <span>🟠</span>
              <span>{proReviewCount} Required</span>
            </div>
            <span className="text-[11px] text-[#6B7280] block">Title & litigation</span>
          </div>
        </div>

        {/* Readiness Statement Box */}
        <div className="bg-[#16181D] border border-[#262930] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-[#23262D] pb-4">
            <div className="w-8 h-8 rounded bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#F0F2F5]">Evaluation Status Summary</h3>
              <p className="text-xs text-[#8A8F9E]">Objective assessment of current information state</p>
            </div>
          </div>

          <div className="p-4 rounded bg-[#121418] border border-[#23262D] space-y-2">
            <p className="text-sm font-semibold text-[#F0F2F5] leading-relaxed">
              You do not yet have enough verified information to complete your evaluation.
            </p>
            <p className="text-xs text-[#8A8F9E] leading-relaxed">
              {pendingItems.length} due diligence items and {proReviewCount} professional legal review areas remain unresolved. Resolving these before paying token amounts protects your financial commitment.
            </p>
          </div>
        </div>

        {/* What's Complete vs Pending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: What is Complete */}
          <div className="bg-[#16181D] border border-[#262930] p-5 rounded-lg space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#10B981] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              What Is Complete ({verifiedItems.length + 2})
            </h3>
            <div className="space-y-2 text-xs text-[#D1D5DB]">
              <div className="p-2.5 rounded bg-[#121418] border border-[#23262D]">
                ✓ Property listing profile confirmed
              </div>
              <div className="p-2.5 rounded bg-[#121418] border border-[#23262D]">
                ✓ Financial gap and monthly EMI estimated
              </div>
              {verifiedItems.map((item) => (
                <div key={item.id} className="p-2.5 rounded bg-[#121418] border border-[#23262D]">
                  ✓ {item.title} ({item.status})
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: What is Still Pending */}
          <div className="bg-[#16181D] border border-[#262930] p-5 rounded-lg space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#F97316] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F97316]" />
              What Is Still Pending ({pendingItems.length})
            </h3>
            <div className="space-y-2 text-xs text-[#D1D5DB]">
              {gap > 0 && (
                <div className="p-2.5 rounded bg-[#121418] border border-[#23262D] text-[#F97316]">
                  ○ Estimated ₹{(gap / 100000).toFixed(2)}L funding gap resolution
                </div>
              )}
              {pendingItems.map((item) => (
                <div key={item.id} className="p-2.5 rounded bg-[#121418] border border-[#23262D]">
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
