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
    { id: 'snapshot', label: '01 Property Snapshot', href: `/evaluation/${evaluationId}/snapshot` },
    { id: 'financial', label: '02 Financial Picture', href: `/evaluation/${evaluationId}/financial` },
    { id: 'investigation', label: '03 Investigation Plan', href: `/evaluation/${evaluationId}/investigation` },
    { id: 'questions', label: '04 Open Questions', href: `/evaluation/${evaluationId}/questions` },
    { id: 'dashboard', label: '05 Decision Readiness', href: `/evaluation/${evaluationId}/dashboard` },
  ];

  const completedCount = completedSteps.length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  return (
    <aside className="w-full md:w-64 bg-[#0F0F0F] border-r border-[#1E1E1E] flex flex-col shrink-0 md:min-h-screen">
      <div className="p-4 border-b border-[#1E1E1E]">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors">
          <ShieldCheck className="w-4 h-4 text-[#5B8BDF]" />
          <span>homecheck</span>
        </Link>
      </div>

      <div className="p-4 border-b border-[#1E1E1E] bg-[#121212]/50">
        <p className="text-[10px] uppercase font-mono tracking-wider text-[#666666]">Active Evaluation</p>
        <p className="text-sm font-medium text-[#EDEDED] truncate mt-0.5">
          {propertyName || 'New Property'}
        </p>
        {evaluation?.isDemo && (
          <span className="text-[10px] font-mono text-[#D4A017] bg-[#D4A017]/10 px-1.5 py-0.5 rounded border border-[#D4A017]/20 mt-1 inline-block">
            Demo mode
          </span>
        )}
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {steps.map((step) => {
          const isActive = pathname.includes(step.id);
          const isDone = completedSteps.includes(step.id);

          return (
            <Link
              key={step.id}
              href={step.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#5B8BDF]/15 text-[#5B8BDF] border border-[#5B8BDF]/30 font-semibold'
                  : 'text-[#888888] hover:text-[#EDEDED] hover:bg-[#161616]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {isDone && !isActive ? (
                  <CheckCircle className="w-3.5 h-3.5 text-[#3F9E6C] shrink-0" />
                ) : isActive ? (
                  <div className="w-2 h-2 rounded-full bg-[#5B8BDF] shrink-0 animate-pulse" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-[#444444] shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                isActive ? 'text-[#5B8BDF]' : 'text-[#444444] opacity-0 group-hover:opacity-100'
              }`} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1E1E1E] bg-[#0A0A0A] space-y-2">
        <div className="flex justify-between items-center text-[11px] text-[#777777]">
          <span>Evaluation stage</span>
          <span className="font-mono text-[#EDEDED]">{completedCount} of {steps.length}</span>
        </div>
        <div className="w-full h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5B8BDF] rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
