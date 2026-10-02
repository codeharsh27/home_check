"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { GapAnalysisBar } from "@/components/financial/gap-analysis-bar";
import { MonthlyObligationCard } from "@/components/financial/monthly-obligation-card";
import { UnconfirmedInfoList } from "@/components/financial/unconfirmed-info-list";
import { BuyerContextForm } from "@/components/financial/buyer-context-form";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { ArrowRight, SlidersHorizontal, PieChart, ShieldAlert } from "lucide-react";
import { BuyerContext } from "@/types";

export default function FinancialPage() {
  const params = useParams();
  const router = useRouter();
  const evalId = (params.id as string) || "demo";

  const { currentEvaluation, loadEvaluation, updateBuyerContext } = useEvaluationStore();
  const [activeTab, setActiveTab] = useState<"picture" | "edit">("picture");

  useEffect(() => {
    if (evalId && evalId !== "demo") {
      loadEvaluation(evalId);
    }
  }, [evalId]);

  const property = currentEvaluation?.property || {
    name: "Green Valley Residency",
    price: 6800000,
  };

  const context: BuyerContext = currentEvaluation?.buyerContext || {
    purpose: "Primary residence",
    monthlyIncome: 150000,
    existingObligations: 12000,
    availableFunds: 1500000,
    emergencyReserve: 200000,
    expectedFinancing: ["Home loan"],
  };

  const effectiveFunds = Math.max(0, (context.availableFunds || 0) - (context.emergencyReserve || 0));
  const plannedLoan = 4500000; // Expected financing amount
  const fundingGap = Math.max(0, property.price - (effectiveFunds + plannedLoan));

  const handleSaveContext = (updatedContext: BuyerContext) => {
    if (evalId) {
      updateBuyerContext(evalId, updatedContext);
    }
  };

  const handleContinue = () => {
    router.push(`/evaluation/${evalId}/investigation`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Screen 03 & 04</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Financial Picture & Funding Gap</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              Map your available funds and financing against the listed price to identify financial gaps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#141414] border border-[#252525] p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("picture")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === "picture"
                    ? "bg-[#5B8BDF] text-white"
                    : "text-[#888888] hover:text-[#EDEDED]"
                }`}
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>Financial Picture</span>
              </button>
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === "edit"
                    ? "bg-[#5B8BDF] text-white"
                    : "text-[#888888] hover:text-[#EDEDED]"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Edit Context Inputs</span>
              </button>
            </div>

            <Button onClick={handleContinue} size="md">
              <span>Next step</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#121212] border border-[#222222] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">Property Price</span>
            <p className="text-lg font-bold font-mono text-[#EDEDED]">
              ₹{(property.price / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#666666]">Listed value</span>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#5B8BDF]">Effective Funds</span>
            <p className="text-lg font-bold font-mono text-[#5B8BDF]">
              ₹{(effectiveFunds / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#666666]">After reserve</span>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#3F9E6C]">Planned Loan</span>
            <p className="text-lg font-bold font-mono text-[#3F9E6C]">
              ₹{(plannedLoan / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#666666]">Expected financing</span>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D94F4F]">Funding Gap</span>
            <p className="text-lg font-bold font-mono text-[#D94F4F]">
              ₹{(fundingGap / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#666666]">Uncovered amount</span>
          </div>
        </div>

        {/* Tab 1: Financial Picture */}
        {activeTab === "picture" && (
          <div className="space-y-6">
            <GapAnalysisBar
              propertyPrice={property.price}
              availableFunds={context.availableFunds || 0}
              emergencyReserve={context.emergencyReserve || 0}
              plannedLoan={plannedLoan}
            />

            <MonthlyObligationCard
              monthlyIncome={context.monthlyIncome || 0}
              existingObligations={context.existingObligations || 0}
              plannedLoanAmount={plannedLoan}
            />

            <UnconfirmedInfoList />
          </div>
        )}

        {/* Tab 2: Edit Buyer Context */}
        {activeTab === "edit" && (
          <BuyerContextForm context={context} onSave={handleSaveContext} />
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">
            Knowing your gap allows you to plan negotiations or adjust loan requests before paying booking tokens.
          </p>
          <Button onClick={handleContinue} size="md" className="w-full sm:w-auto">
            <span>Proceed to Investigation Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
