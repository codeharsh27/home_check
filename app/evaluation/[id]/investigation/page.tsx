"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { InvestigationProgress } from "@/components/investigation/investigation-progress";
import { CategorySection } from "@/components/investigation/category-section";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { ArrowRight, FileSearch } from "lucide-react";
import { ChecklistItem } from "@/types";
import { DEFAULT_CHECKLIST } from "@/lib/checklist-defaults";

export default function InvestigationPage() {
  const params = useParams();
  const router = useRouter();
  const evalId = (params.id as string) || "demo";

  const { currentEvaluation, loadEvaluation, updateChecklistItem } = useEvaluationStore();

  useEffect(() => {
    if (evalId && evalId !== "demo") {
      loadEvaluation(evalId);
    }
  }, [evalId]);

  const property = currentEvaluation?.property || {
    name: "Green Valley Residency",
    type: "Apartment",
    location: "Wakad, Pune",
  };

  const checklist: ChecklistItem[] = currentEvaluation?.checklist || DEFAULT_CHECKLIST;

  const handleUpdateItem = (itemId: string, updates: Partial<ChecklistItem>) => {
    if (evalId) {
      updateChecklistItem(evalId, itemId, updates);
    }
  };

  const handleContinue = () => {
    router.push(`/evaluation/${evalId}/questions`);
  };

  const ownershipItems = checklist.filter((i) => i.category === "ownership");
  const approvalItems = checklist.filter((i) => i.category === "approvals");
  const financialItems = checklist.filter((i) => i.category === "financial");
  const costItems = checklist.filter((i) => i.category === "costs");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Screen 05 & 06</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Investigation Plan & Evidence</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              Stage-aware checklist tailored to {property.type} properties in {property.location}.
            </p>
          </div>

          <Button onClick={handleContinue} size="md">
            <span>Next step</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Tracker Bar */}
        <InvestigationProgress checklist={checklist} />

        {/* Categories List */}
        <div className="space-y-8 pt-2">
          <CategorySection
            categoryKey="ownership"
            title="Ownership & Title Verification"
            items={ownershipItems}
            onUpdateItem={handleUpdateItem}
          />

          <CategorySection
            categoryKey="approvals"
            title="Legal & Regulatory Approvals"
            items={approvalItems}
            onUpdateItem={handleUpdateItem}
          />

          <CategorySection
            categoryKey="financial"
            title="Financial & Encumbrance Clearance"
            items={financialItems}
            onUpdateItem={handleUpdateItem}
          />

          <CategorySection
            categoryKey="costs"
            title="Recurring Costs & Society Dues"
            items={costItems}
            onUpdateItem={handleUpdateItem}
          />
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">
            Every item updated here automatically updates your decision readiness dashboard.
          </p>
          <Button onClick={handleContinue} size="md" className="w-full sm:w-auto">
            <span>Proceed to Open Questions</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
