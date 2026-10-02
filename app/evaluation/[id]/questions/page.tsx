"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { ArrowRight, HelpCircle, Sparkles, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { generateNextActions, generateDefaultQuestions, NextActionItem } from "@/lib/next-action-engine";
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-5xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Screen 07</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Open Questions & Next Actions</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              Maintain an active record of unresolved queries and execute stage-appropriate next steps.
            </p>
          </div>

          <Button onClick={handleContinue} size="md">
            <span>View readiness dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* AI Generator Triggers Bar */}
        <div className="bg-[#121212] border border-[#232323] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5B8BDF]" />
            <span className="text-xs text-[#CCCCCC]">
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
            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <h2 className="text-sm font-semibold text-[#EDEDED] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#E6832A]" />
                Unresolved Questions List
              </h2>
              <span className="text-xs font-mono text-[#888888]">
                {questions.filter((q) => q.status === "open").length} open
              </span>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    q.status === "resolved"
                      ? "bg-[#101010] border-[#1C1C1C] opacity-60"
                      : "bg-[#141414] border-[#252525]"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-[#5B8BDF] bg-[#5B8BDF]/10 px-2 py-0.5 rounded border border-[#5B8BDF]/20">
                        {q.category}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                          q.severity === "high"
                            ? "bg-[#D94F4F]/15 text-[#D94F4F]"
                            : "bg-[#D4A017]/15 text-[#D4A017]"
                        }`}
                      >
                        {q.severity} priority
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-[#EDEDED]">{q.title}</h3>
                    <p className="text-xs text-[#888888]">{q.description}</p>

                    {/* Status Action Buttons */}
                    <div className="pt-2 flex items-center gap-2 border-t border-[#1C1C1C] flex-wrap">
                      <button
                        onClick={() => handleResolveQuestion(q.id, "resolved")}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          q.status === "resolved"
                            ? "bg-[#3F9E6C]/20 text-[#3F9E6C] font-semibold border border-[#3F9E6C]/40"
                            : "bg-[#1A1A1A] text-[#777777] hover:text-[#EDEDED]"
                        }`}
                      >
                        ✓ Resolved
                      </button>

                      <button
                        onClick={() => handleResolveQuestion(q.id, "needs-lawyer")}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          q.status === "needs-lawyer"
                            ? "bg-[#E6832A]/20 text-[#E6832A] font-semibold border border-[#E6832A]/40"
                            : "bg-[#1A1A1A] text-[#777777] hover:text-[#EDEDED]"
                        }`}
                      >
                        ! Needs Lawyer
                      </button>

                      <button
                        onClick={() => handleResolveQuestion(q.id, "deferred")}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                          q.status === "deferred"
                            ? "bg-[#222222] text-[#AAAAAA] font-semibold"
                            : "bg-[#1A1A1A] text-[#777777] hover:text-[#EDEDED]"
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
            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <h2 className="text-sm font-semibold text-[#EDEDED] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5B8BDF]" />
                Next Actions Engine
              </h2>
              <span className="text-xs font-mono text-[#888888]">{nextActions.length} actions</span>
            </div>

            <div className="space-y-3">
              {nextActions.map((action, idx) => (
                <div key={action.id} className="p-4 rounded-xl bg-[#141414] border border-[#252525] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-semibold text-[#EDEDED]">
                      {idx + 1}. {action.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                        action.priority === "high"
                          ? "bg-[#D94F4F]/15 text-[#D94F4F]"
                          : "bg-[#5B8BDF]/15 text-[#5B8BDF]"
                      }`}
                    >
                      {action.priority}
                    </span>
                  </div>

                  <p className="text-xs text-[#888888]">{action.why}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] border-t border-[#1C1C1C] text-[#777777]">
                    <span>Target: <strong className="text-[#CCCCCC]">{action.who}</strong></span>
                    <span className="font-mono text-[#5B8BDF] bg-[#5B8BDF]/10 px-2 py-0.5 rounded border border-[#5B8BDF]/20">
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
