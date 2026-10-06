'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { useEvaluationStore } from '@/store/evaluation';
import { EvaluationStep } from '@/types';

interface EvalSidebarProps {
  evaluationId: string;
  propertyName?: string;
}

export const EvalSidebar: React.FC<EvalSidebarProps> = ({ evaluationId, propertyName = 'Property' }) => {
  const pathname = usePathname();
  const { evaluations } = useEvaluationStore();
  const evaluation = evaluations[evaluationId];
  const completedSteps: EvaluationStep[] = evaluation?.completedSteps ?? [];

  const steps: { id: EvaluationStep; label: string; href: string }[] = [
    { id: 'snapshot', label: 'Property', href: `/evaluation/${evaluationId}/snapshot` },
    { id: 'financial', label: 'Finances', href: `/evaluation/${evaluationId}/financial` },
    { id: 'investigation', label: 'What to check', href: `/evaluation/${evaluationId}/investigation` },
    { id: 'questions', label: 'Questions', href: `/evaluation/${evaluationId}/questions` },
    { id: 'dashboard', label: 'Next steps', href: `/evaluation/${evaluationId}/dashboard` },
  ];

  const completedCount = completedSteps.length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <aside className="w-full md:w-60 bg-white border-r border-stone-200/80 flex flex-col shrink-0 md:min-h-screen">
      <div className="p-4 border-b border-stone-200/60">
        <Link href="/" className="flex items-center gap-2 text-stone-900 hover:text-blue-600 transition-colors group">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm tracking-tight">homecheck</span>
        </Link>
      </div>

      <div className="p-4 border-b border-stone-200/60 bg-stone-50/50">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">Evaluation</p>
        <p className="text-sm font-semibold text-stone-900 truncate mt-0.5" title={propertyName || 'New Property'}>
          {propertyName || 'New Property'}
        </p>
        {evaluation?.isDemo && (
          <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80 mt-1.5 inline-block">
            Sample evaluation
          </span>
        )}
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {steps.map((step, idx) => {
          const isActive = pathname.includes(step.id);
          const isDone = completedSteps.includes(step.id);

          return (
            <Link
              key={step.id}
              href={step.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/70 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {isDone && !isActive ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : isActive ? (
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 transition-transform ${
                  isActive ? 'text-blue-600' : 'text-stone-300 opacity-0 group-hover:opacity-100'
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-200/60 bg-stone-50/50 space-y-2">
        <div className="flex justify-between items-center text-xs text-stone-500">
          <span>Progress</span>
          <span className="font-medium text-stone-700">{completedCount} of {steps.length} done</span>
        </div>
        <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
