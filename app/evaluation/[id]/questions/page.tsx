'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EvalSidebar } from '@/components/layout/eval-sidebar';
import { Button } from '@/components/ui/button';
import { HydrationGuard } from '@/components/providers/hydration-guard';
import { useEvaluationStore } from '@/store/evaluation';
import { ContextualAssistModal } from '@/components/ai/contextual-assist';
import { generateNextActions, NextActionItem } from '@/lib/next-action-engine';
import { ArrowRight, HelpCircle, Clock, Sparkles } from 'lucide-react';
import { OpenQuestion } from '@/types';

function QuestionsPageContent() {
  const params = useParams();
  const router = useRouter();
  const evalId = params.id as string;

  const { evaluations, loadEvaluation, resolveQuestion, markStepComplete, initializeQuestionsIfNeeded } = useEvaluationStore();
  const [aiModalType, setAiModalType] = useState<'seller' | 'lawyer' | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (!found) {
      router.replace('/');
    } else {
      initializeQuestionsIfNeeded(evalId);
    }
  }, [evalId]);

  const evaluation = evaluations[evalId];
  const property = evaluation?.property;
  const questions: OpenQuestion[] = evaluation?.questions ?? [];
  const nextActions: NextActionItem[] = evaluation ? generateNextActions(evaluation) : [];

  const handleResolveQuestion = (qId: string, status: OpenQuestion['status']) => {
    resolveQuestion(evalId, qId, status);
  };

  const handleContinue = () => {
    markStepComplete(evalId, 'questions');
    router.push(`/evaluation/${evalId}/dashboard`);
  };

  if (!hasLoaded || !evaluation) return null;

  const openQuestions = questions.filter((q) => q.status === 'open');
  const resolvedQuestions = questions.filter((q) => q.status !== 'open');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property?.name} />
      <main className="flex-1 p-4 sm:p-8 max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Open Questions</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Unresolved Questions & Next Actions</h1>
            <p className="text-xs text-[#888888] mt-0.5">{openQuestions.length} open · {resolvedQuestions.length} resolved</p>
          </div>
          <Button onClick={handleContinue} size="md">
            <span>View readiness dashboard</span><ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* AI Assist bar */}
        <div className="bg-[#121212] border border-[#232323] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#5B8BDF]" />
            <span className="text-xs text-[#CCCCCC]">Generate question lists from your checklist gaps:</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setAiModalType('seller')}>Seller Questions ✦</Button>
            <Button variant="outline" size="sm" onClick={() => setAiModalType('lawyer')}>Lawyer Questions ✦</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <h2 className="text-sm font-semibold text-[#EDEDED] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#E6832A]" />
                Unresolved Questions
              </h2>
              <span className="text-xs font-mono text-[#888888]">{openQuestions.length} open</span>
            </div>

            {questions.length === 0 ? (
              <p className="text-xs text-[#666666] italic">No checklist items found. Complete the investigation plan first.</p>
            ) : (
              <div className="space-y-3">
                {questions.map((q) => (
                  <div key={q.id} className={`p-4 rounded-xl border transition-all ${
                    q.status !== 'open' ? 'bg-[#101010] border-[#1C1C1C] opacity-60' : 'bg-[#141414] border-[#252525]'
                  }`}>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-[#5B8BDF] bg-[#5B8BDF]/10 px-2 py-0.5 rounded border border-[#5B8BDF]/20 truncate max-w-[60%]">{q.category}</span>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded shrink-0 ${
                          q.severity === 'high' ? 'bg-[#D94F4F]/15 text-[#D94F4F]'
                          : q.severity === 'medium' ? 'bg-[#D4A017]/15 text-[#D4A017]'
                          : 'bg-[#333333] text-[#888888]'
                        }`}>{q.severity}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#EDEDED]">{q.title}</h3>
                      <p className="text-xs text-[#888888]">{q.description}</p>
                      <div className="pt-2 flex items-center gap-2 border-t border-[#1C1C1C] flex-wrap">
                        {(['resolved', 'needs-lawyer', 'deferred'] as const).map((s) => {
                          const labels = { resolved: '✓ Resolved', 'needs-lawyer': '! Needs Lawyer', deferred: 'Follow up later' };
                          const activeColor: Record<string, string> = {
                            resolved: 'bg-[#3F9E6C]/20 text-[#3F9E6C] border-[#3F9E6C]/40',
                            'needs-lawyer': 'bg-[#E6832A]/20 text-[#E6832A] border-[#E6832A]/40',
                            deferred: 'bg-[#333333] text-[#CCCCCC] border-[#444444]',
                          };
                          return (
                            <button key={s}
                              onClick={() => handleResolveQuestion(q.id, q.status === s ? 'open' : s)}
                              className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer border transition-colors ${
                                q.status === s ? activeColor[s] : 'bg-[#1A1A1A] text-[#777777] border-[#252525] hover:text-[#EDEDED] hover:border-[#333333]'
                              }`}>
                              {labels[s]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <h2 className="text-sm font-semibold text-[#EDEDED] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5B8BDF]" />
                Next Actions Engine
              </h2>
              <span className="text-xs font-mono text-[#888888]">{nextActions.length} actions</span>
            </div>

            {nextActions.length === 0 ? (
              <p className="text-xs text-[#666666] italic">All priority actions are resolved.</p>
            ) : (
              <div className="space-y-3">
                {nextActions.map((action, idx) => (
                  <div key={action.id} className="p-4 rounded-xl bg-[#141414] border border-[#252525] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-mono font-semibold text-[#EDEDED]">{idx + 1}. {action.title}</span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded shrink-0 ${
                        action.priority === 'high' ? 'bg-[#D94F4F]/15 text-[#D94F4F]' : 'bg-[#5B8BDF]/15 text-[#5B8BDF]'
                      }`}>{action.priority}</span>
                    </div>
                    <p className="text-xs text-[#888888]">{action.why}</p>
                    <div className="pt-2 flex items-center justify-between text-[11px] border-t border-[#1C1C1C] text-[#777777]">
                      <span>→ <strong className="text-[#CCCCCC]">{action.who}</strong></span>
                      <span className="font-mono text-[#5B8BDF] bg-[#5B8BDF]/10 px-2 py-0.5 rounded border border-[#5B8BDF]/20">{action.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {aiModalType && evaluation && (
          <ContextualAssistModal
            type={aiModalType}
            property={evaluation.property}
            checklist={evaluation.checklist ?? []}
            isOpen={true}
            onClose={() => setAiModalType(null)}
          />
        )}
      </main>
    </div>
  );
}

export default function QuestionsPage() {
  return <HydrationGuard><QuestionsPageContent /></HydrationGuard>;
}
