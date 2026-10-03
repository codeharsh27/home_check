'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EvalSidebar } from '@/components/layout/eval-sidebar';
import { InvestigationProgress } from '@/components/investigation/investigation-progress';
import { CategorySection } from '@/components/investigation/category-section';
import { Button } from '@/components/ui/button';
import { HydrationGuard } from '@/components/providers/hydration-guard';
import { useEvaluationStore } from '@/store/evaluation';
import { ArrowRight } from 'lucide-react';
import { ChecklistItem, ChecklistCategory } from '@/types';

const CATEGORIES: { key: ChecklistCategory; title: string }[] = [
  { key: 'ownership', title: 'Ownership & Title Verification' },
  { key: 'approvals', title: 'Legal & Regulatory Approvals' },
  { key: 'financial', title: 'Financial & Encumbrance Clearance' },
  { key: 'condition', title: 'Property Condition' },
  { key: 'costs', title: 'Recurring Costs & Charges' },
];

function InvestigationPageContent() {
  const params = useParams();
  const router = useRouter();
  const evalId = params.id as string;

  const { evaluations, loadEvaluation, updateChecklistItem, markStepComplete } = useEvaluationStore();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (!found) router.replace('/');
  }, [evalId]);

  const evaluation = evaluations[evalId];
  const property = evaluation?.property;
  const checklist: ChecklistItem[] = evaluation?.checklist ?? [];

  const handleUpdateItem = (itemId: string, updates: Partial<ChecklistItem>) => {
    updateChecklistItem(evalId, itemId, updates);
  };

  const handleContinue = () => {
    markStepComplete(evalId, 'investigation');
    router.push(`/evaluation/${evalId}/questions`);
  };

  if (!hasLoaded || !evaluation) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property?.name} />
      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Investigation Plan</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Due Diligence Checklist</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              {checklist.length} checks · {property?.type} · {property?.possessionStatus ?? 'Unknown possession status'}
            </p>
          </div>
          <Button onClick={handleContinue} size="md">
            <span>Next step</span><ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <InvestigationProgress checklist={checklist} />

        <div className="space-y-8 pt-2">
          {CATEGORIES.map(({ key, title }) => {
            const items = checklist.filter((i) => i.category === key);
            if (items.length === 0) return null;
            return (
              <CategorySection
                key={key}
                categoryKey={key}
                title={title}
                items={items}
                evaluationId={evalId}
                onUpdateItem={handleUpdateItem}
              />
            );
          })}
        </div>

        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">This checklist was auto-generated based on your property type and possession status.</p>
          <Button onClick={handleContinue} size="md" className="w-full sm:w-auto">
            <span>Proceed to Open Questions</span><ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default function InvestigationPage() {
  return <HydrationGuard><InvestigationPageContent /></HydrationGuard>;
}
