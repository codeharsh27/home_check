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
import { ArrowRight, SlidersHorizontal, PieChart } from "lucide-react";
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
  const plannedLoan = 4500000;
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
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5] flex flex-col md:flex-row font-sans">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23262D] pb-4">
          <div>
            <span className="text-xs font-mono text-[#D97706] uppercase tracking-wider">Screen 03 & 04</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F0F2F5]">Financial Picture & Funding Gap</h1>
            <p className="text-xs text-[#8A8F9E] mt-0.5">
              Map your available funds and financing against the listed price to identify financial gaps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#121418] border border-[#23262D] p-1 rounded-md">
              <button
                type="button"
                onClick={() => setActiveTab("picture")}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === "picture"
                    ? "bg-[#D97706] text-white font-semibold"
                    : "text-[#8A8F9E] hover:text-[#F0F2F5]"
                }`}
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>Financial Picture</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === "edit"
                    ? "bg-[#D97706] text-white font-semibold"
                    : "text-[#8A8F9E] hover:text-[#F0F2F5]"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Edit Context Inputs</span>
              </button>
            </div>

            <Button onClick={handleContinue} variant="primary" size="md">
              <span>Next step</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8F9E]">Property Price</span>
            <p className="text-lg font-bold font-mono text-[#F0F2F5]">
              ₹{(property.price / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#6B7280]">Listed value</span>
          </div>

          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#3B82F6]">Effective Funds</span>
            <p className="text-lg font-bold font-mono text-[#60A5FA]">
              ₹{(effectiveFunds / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#6B7280]">After reserve</span>
          </div>

          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#10B981]">Planned Loan</span>
            <p className="text-lg font-bold font-mono text-[#34D399]">
              ₹{(plannedLoan / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#6B7280]">Expected financing</span>
          </div>

          <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#EF4444]">Funding Gap</span>
            <p className="text-lg font-bold font-mono text-[#F87171]">
              ₹{(fundingGap / 100000).toFixed(2)}L
            </p>
            <span className="text-[11px] text-[#6B7280]">Uncovered amount</span>
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
        <div className="pt-6 border-t border-[#23262D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            Knowing your gap allows you to plan negotiations or adjust loan requests before paying booking tokens.
          </p>
          <Button onClick={handleContinue} variant="primary" size="md" className="w-full sm:w-auto">
            <span>Proceed to Investigation Plan</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
