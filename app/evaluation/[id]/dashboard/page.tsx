'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EvalSidebar } from '@/components/layout/eval-sidebar';
import { Button } from '@/components/ui/button';
import { HydrationGuard } from '@/components/providers/hydration-guard';
import { useEvaluationStore } from '@/store/evaluation';
import { CheckCircle2, AlertTriangle, Download, RotateCcw } from 'lucide-react';
import { ChecklistItem, OpenQuestion } from '@/types';
import {
  calculateEffectiveFunds,
  calculatePlannedLoan,
  calculateFundingGap,
  calculateSnapshotCompleteness,
  formatCurrency,
} from '@/lib/calculations';

function DashboardPageContent() {
  const params = useParams();
  const router = useRouter();
  const evalId = params.id as string;

  const { evaluations, loadEvaluation, markStepComplete } = useEvaluationStore();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [exported, setExported] = useState(false);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (found) markStepComplete(evalId, 'dashboard');
    else router.replace('/');
  }, [evalId]);

  const evaluation = evaluations[evalId];
  const property = evaluation?.property;
  const context = evaluation?.buyerContext ?? {};
  const checklist: ChecklistItem[] = evaluation?.checklist ?? [];
  const questions: OpenQuestion[] = evaluation?.questions ?? [];

  const effectiveFunds = property ? calculateEffectiveFunds(context) : 0;
  const plannedLoan = property ? calculatePlannedLoan(property, context) : 0;
  const fundingGap = property ? calculateFundingGap(property, context) : 0;
  const completeness = property ? calculateSnapshotCompleteness(property) : { known: 0, total: 12, percent: 0 };

  const receivedItems = checklist.filter((i) => i.received || i.status === 'verified');
  const pendingItems = checklist.filter((i) => !i.received && i.status !== 'verified');
  const proReviewItems = checklist.filter((i) => i.status === 'needs-pro');
  const openQuestions = questions.filter((q) => q.status === 'open');
  const hasFinancialContext = Boolean(context.monthlyIncome || context.availableFunds);

  if (!hasLoaded || !evaluation || !property) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />
      <main className="flex-1 p-4 sm:p-8 max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Decision Readiness</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Property Evaluation Status</h1>
            <p className="text-xs text-[#888888] mt-0.5">{property.name} · {property.location} · {formatCurrency(property.price)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setExported(true); setTimeout(() => setExported(false), 2000); }}>
              <Download className="w-3.5 h-3.5" /><span>{exported ? 'Exported!' : 'Export PDF'}</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => router.push('/')}>
              <RotateCcw className="w-3.5 h-3.5" /><span>New evaluation</span>
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">FINANCIAL</span>
            <div className="text-sm font-bold">
              {!hasFinancialContext
                ? <span className="text-[#666666]">Not entered</span>
                : fundingGap > 0
                  ? <span className="text-[#D4A017]">Gap: {formatCurrency(fundingGap)}</span>
                  : <span className="text-[#3F9E6C]">Covered</span>}
            </div>
            <span className="text-[11px] text-[#666666] block">Funding analysis</span>
          </div>

          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">PROPERTY INFO</span>
            <div className="text-sm font-bold">
              <span className={completeness.percent >= 70 ? 'text-[#3F9E6C]' : 'text-[#D4A017]'}>
                {completeness.known}/{completeness.total} fields
              </span>
            </div>
            <span className="text-[11px] text-[#666666] block">Data completeness</span>
          </div>

          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">DUE DILIGENCE</span>
            <div className="text-sm font-bold">
              <span className={pendingItems.length === 0 ? 'text-[#3F9E6C]' : 'text-[#D4A017]'}>
                {pendingItems.length === 0 ? 'Complete' : `${pendingItems.length} pending`}
              </span>
            </div>
            <span className="text-[11px] text-[#666666] block">Checklist ({checklist.length} items)</span>
          </div>

          <div className="bg-[#141414] border border-[#252525] p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">PRO REVIEW</span>
            <div className="text-sm font-bold">
              <span className={proReviewItems.length > 0 ? 'text-[#E6832A]' : 'text-[#3F9E6C]'}>
                {proReviewItems.length > 0 ? `${proReviewItems.length} required` : 'None flagged'}
              </span>
            </div>
            <span className="text-[11px] text-[#666666] block">Legal verification</span>
          </div>
        </div>

        {/* Readiness Statement */}
        <div className="bg-[#141414] border border-[#282828] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-[#202020] pb-4">
            <div className="w-9 h-9 rounded-lg bg-[#E6832A]/15 border border-[#E6832A]/30 flex items-center justify-center text-[#E6832A]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#EDEDED]">Evaluation Status Summary</h3>
              <p className="text-xs text-[#888888]">Based on information currently available in your evaluation</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#1F1F1F] space-y-2">
            {pendingItems.length === 0 && proReviewItems.length === 0 && fundingGap === 0 && hasFinancialContext ? (
              <>
                <p className="text-sm font-semibold text-[#3F9E6C]">All planned checks are marked complete.</p>
                <p className="text-xs text-[#888888]">Verify all professional review items before committing purchase funds.</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-[#EDEDED]">
                  You do not yet have enough verified information to complete your evaluation.
                </p>
                <p className="text-xs text-[#888888] leading-relaxed">
                  {[
                    !hasFinancialContext && 'Financial context not entered.',
                    pendingItems.length > 0 && `${pendingItems.length} checklist items pending.`,
                    proReviewItems.length > 0 && `${proReviewItems.length} items require professional legal review.`,
                    fundingGap > 0 && `An estimated ${formatCurrency(fundingGap)} funding gap requires resolution.`,
                    openQuestions.length > 0 && `${openQuestions.length} open questions remain unresolved.`,
                  ].filter(Boolean).join(' ')}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Complete vs Pending */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#121212] border border-[#222222] p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#3F9E6C] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />What Is Complete ({receivedItems.length})
            </h3>
            <div className="space-y-2 text-xs text-[#CCCCCC]">
              {completeness.known > 0 && (
                <div className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                  ✓ Property profile: {completeness.known}/{completeness.total} fields confirmed
                </div>
              )}
              {hasFinancialContext && (
                <div className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                  ✓ Financial picture mapped — {fundingGap > 0 ? `${formatCurrency(fundingGap)} gap identified` : 'funding fully covered'}
                </div>
              )}
              {receivedItems.map((item) => (
                <div key={item.id} className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                  ✓ {item.title}
                </div>
              ))}
              {receivedItems.length === 0 && !hasFinancialContext && completeness.known === 0 && (
                <div className="text-[#555555] italic">No items completed yet. Work through each step.</div>
              )}
            </div>
          </div>

          <div className="bg-[#121212] border border-[#222222] p-5 rounded-xl space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#E6832A] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />What Is Still Pending ({pendingItems.length + (!hasFinancialContext ? 1 : 0)})
            </h3>
            <div className="space-y-2 text-xs text-[#CCCCCC]">
              {!hasFinancialContext && (
                <div className="p-2.5 rounded bg-[#161616] border border-[#262626] text-[#E6832A]">
                  ○ Financial context not entered yet
                </div>
              )}
              {fundingGap > 0 && (
                <div className="p-2.5 rounded bg-[#161616] border border-[#262626] text-[#E6832A]">
                  ○ {formatCurrency(fundingGap)} funding gap requires resolution
                </div>
              )}
              {pendingItems.map((item) => (
                <div key={item.id} className="p-2.5 rounded bg-[#161616] border border-[#222222]">
                  ○ {item.title}
                </div>
              ))}
              {pendingItems.length === 0 && fundingGap === 0 && hasFinancialContext && (
                <div className="text-[#555555] italic">All checklist items are marked complete.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return <HydrationGuard><DashboardPageContent /></HydrationGuard>;
}
