"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { ArrowRight, HelpCircle, Sparkles, Clock } from "lucide-react";
import { generateNextActions, generateDefaultQuestions } from "@/lib/next-action-engine";
import { OpenQuestion } from "@/types";
import { ContextualAssistModal } from "@/components/ai/contextual-assist";

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const evalId = (params.id as string) || "demo";

  const { currentEvaluation, loadEvaluation, resolveQuestion } = useEvaluationStore();

  const [aiModalType, setAiModalType] = useState<"seller" | "lawyer" | null>(null);

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

  const nextActions = currentEvaluation ? generateNextActions(currentEvaluation) : [];
  const defaultQuestions = currentEvaluation ? generateDefaultQuestions(currentEvaluation) : [];
  const questions: OpenQuestion[] = currentEvaluation?.questions || defaultQuestions;

  const handleResolveQuestion = (qId: string, status: OpenQuestion["status"]) => {
    if (evalId) {
      resolveQuestion(evalId, qId, status);
    }
  };

  const handleContinue = () => {
    router.push(`/evaluation/${evalId}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5] flex flex-col md:flex-row font-sans">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-5xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23262D] pb-4">
          <div>
            <span className="text-xs font-mono text-[#D97706] uppercase tracking-wider">Screen 07</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F0F2F5]">Open Questions & Next Actions</h1>
            <p className="text-xs text-[#8A8F9E] mt-0.5">
              Maintain an active record of unresolved queries and execute stage-appropriate next steps.
            </p>
          </div>

          <Button onClick={handleContinue} variant="primary" size="md">
            <span>View readiness dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* AI Generator Triggers Bar */}
        <div className="bg-[#16181D] border border-[#262930] p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs text-[#D1D5DB]">
              Generate contextual question lists based on missing evaluation items:
            </span>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => setAiModalType("seller")}>
              <span>Generate Seller Qs ✦</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAiModalType("lawyer")}>
              <span>Prepare Lawyer Qs ✦</span>
            </Button>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel 1: Open Questions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#23262D] pb-2">
              <h2 className="text-sm font-semibold text-[#F0F2F5] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#F97316]" />
                Unresolved Questions List
              </h2>
              <span className="text-xs font-mono text-[#8A8F9E]">
                {questions.filter((q) => q.status === "open").length} open
              </span>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border transition-all ${
                    q.status === "resolved"
                      ? "bg-[#121418] border-[#1F232B] opacity-60"
                      : "bg-[#16181D] border-[#262930]"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/20">
                        {q.category}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                          q.severity === "high"
                            ? "bg-[#EF4444]/10 text-[#F87171]"
                            : "bg-[#F59E0B]/10 text-[#FBBF24]"
                        }`}
                      >
                        {q.severity} priority
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#F0F2F5]">{q.title}</h3>
                    <p className="text-xs text-[#8A8F9E]">{q.description}</p>

                    {/* Status Action Buttons */}
                    <div className="pt-2 flex items-center gap-2 border-t border-[#23262D] flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleResolveQuestion(q.id, "resolved")}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          q.status === "resolved"
                            ? "bg-[#10B981]/20 text-[#10B981] font-semibold border border-[#10B981]/40"
                            : "bg-[#121418] text-[#8A8F9E] hover:text-[#F0F2F5]"
                        }`}
                      >
                        ✓ Resolved
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResolveQuestion(q.id, "needs-lawyer")}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          q.status === "needs-lawyer"
                            ? "bg-[#F97316]/20 text-[#FB923C] font-semibold border border-[#F97316]/40"
                            : "bg-[#121418] text-[#8A8F9E] hover:text-[#F0F2F5]"
                        }`}
                      >
                        ! Needs Lawyer
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResolveQuestion(q.id, "deferred")}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          q.status === "deferred"
                            ? "bg-[#1E2128] text-[#D1D5DB] font-semibold"
                            : "bg-[#121418] text-[#8A8F9E] hover:text-[#F0F2F5]"
                        }`}
                      >
                        Follow up later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Next Actions Engine */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#23262D] pb-2">
              <h2 className="text-sm font-semibold text-[#F0F2F5] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D97706]" />
                Next Actions Engine
              </h2>
              <span className="text-xs font-mono text-[#8A8F9E]">{nextActions.length} actions</span>
            </div>

            <div className="space-y-3">
              {nextActions.map((action, idx) => (
                <div key={action.id} className="p-4 rounded-lg bg-[#16181D] border border-[#262930] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-semibold text-[#F0F2F5]">
                      {idx + 1}. {action.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                        action.priority === "high"
                          ? "bg-[#EF4444]/10 text-[#F87171]"
                          : "bg-[#D97706]/10 text-[#D97706]"
                      }`}
                    >
                      {action.priority}
                    </span>
                  </div>

                  <p className="text-xs text-[#8A8F9E]">{action.why}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] border-t border-[#23262D] text-[#8A8F9E]">
                    <span>Target: <strong className="text-[#F0F2F5]">{action.who}</strong></span>
                    <span className="font-mono text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/20">
                      Status: {action.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Component */}
        <ContextualAssistModal
          type={aiModalType || "seller"}
          property={property}
          checklist={currentEvaluation?.checklist || []}
          isOpen={Boolean(aiModalType)}
          onClose={() => setAiModalType(null)}
        />
      </main>
    </div>
  );
}
