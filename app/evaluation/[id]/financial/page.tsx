'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EvalSidebar } from '@/components/layout/eval-sidebar';
import { GapAnalysisBar } from '@/components/financial/gap-analysis-bar';
import { MonthlyObligationCard } from '@/components/financial/monthly-obligation-card';
import { UnconfirmedInfoList } from '@/components/financial/unconfirmed-info-list';
import { BuyerContextForm } from '@/components/financial/buyer-context-form';
import { Button } from '@/components/ui/button';
import { useEvaluationStore } from '@/store/evaluation';
import { HydrationGuard } from '@/components/providers/hydration-guard';
import { ArrowRight, PieChart, SlidersHorizontal, AlertCircle } from 'lucide-react';
import {
  calculateEffectiveFunds,
  calculatePlannedLoan,
  calculateFundingGap,
  formatCurrency,
} from '@/lib/calculations';
import { BuyerContext } from '@/types';
import { trackEvent } from '@/lib/analytics';

function FinancialPageContent() {
  const params = useParams();
  const router = useRouter();
  const evalId = params.id as string;

  const { evaluations, loadEvaluation, updateBuyerContext, markStepComplete } = useEvaluationStore();
  const [activeTab, setActiveTab] = useState<'picture' | 'edit'>('picture');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (!found) router.replace('/');
  }, [evalId]);

  const evaluation = evaluations[evalId];
  const property = evaluation?.property;
  const context: BuyerContext = evaluation?.buyerContext ?? {};

  const effectiveFunds = property ? calculateEffectiveFunds(context) : 0;
  const plannedLoan = property ? calculatePlannedLoan(property, context) : 0;
  const fundingGap = property ? calculateFundingGap(property, context) : 0;
  const hasContext = Boolean(context.monthlyIncome || context.availableFunds);

  const handleSaveContext = (updatedContext: BuyerContext) => {
    updateBuyerContext(evalId, updatedContext);
    setActiveTab('picture');
  };

  const handleContinue = () => {
    markStepComplete(evalId, 'financial');
    if (property) {
      trackEvent('financial_gap_calculated', evalId, {
        propertyPrice: property.price,
        effectiveFunds,
        plannedLoan,
        fundingGap,
        hasGap: fundingGap > 0,
      });
    }
    router.push(`/evaluation/${evalId}/investigation`);
  };

  if (!hasLoaded || !evaluation) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property?.name} />
      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Financial Picture</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Funding Gap & Monthly Obligation</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              {property?.name} · {formatCurrency(property?.price ?? 0)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[#141414] border border-[#252525] p-1 rounded-lg">
              {(['picture', 'edit'] as const).map((tab) => {
                const icons = { picture: <PieChart className="w-3.5 h-3.5" />, edit: <SlidersHorizontal className="w-3.5 h-3.5" /> };
                const labels = { picture: 'Picture', edit: 'Edit Inputs' };
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === tab ? 'bg-[#5B8BDF] text-white' : 'text-[#888888] hover:text-[#EDEDED]'
                    }`}>
                    {icons[tab]}<span>{labels[tab]}</span>
                  </button>
                );
              })}
            </div>
            <Button onClick={handleContinue} size="md">
              <span>Continue</span><ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!hasContext && activeTab === 'picture' && (
          <div className="bg-[#141414] border border-[#E6832A]/30 rounded-xl p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#E6832A] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#EDEDED]">Financial context not entered yet</p>
              <p className="text-xs text-[#888888]">Enter your income, available funds, and financing plan to see your actual funding position.</p>
              <button onClick={() => setActiveTab('edit')} className="text-xs text-[#5B8BDF] hover:underline cursor-pointer mt-1">Enter financial context →</button>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {property && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Property Price', value: formatCurrency(property.price), color: '#EDEDED', sub: 'Listed value' },
              { label: 'Effective Funds', value: formatCurrency(effectiveFunds), color: '#5B8BDF', sub: hasContext ? 'After reserve' : 'Not entered' },
              { label: 'Planned Loan', value: context.expectedFinancing?.includes('Home loan') ? formatCurrency(plannedLoan) : '—', color: '#3F9E6C', sub: context.expectedFinancing?.includes('Home loan') ? 'Auto-calculated' : 'No home loan' },
              { label: 'Funding Gap', value: hasContext ? formatCurrency(fundingGap) : '—', color: !hasContext ? '#666666' : fundingGap > 0 ? '#D94F4F' : '#3F9E6C', sub: !hasContext ? 'Enter context first' : fundingGap > 0 ? 'Incl. ~7% costs' : 'Fully covered' },
            ].map((card) => (
              <div key={card.label} className="bg-[#121212] border border-[#222222] p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">{card.label}</span>
                <p className="text-base sm:text-lg font-bold font-mono" style={{ color: card.color }}>{card.value}</p>
                <span className="text-[11px] text-[#666666]">{card.sub}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'picture' && property && (
          <div className="space-y-6">
            <GapAnalysisBar
              propertyPrice={property.price}
              availableFunds={context.availableFunds ?? 0}
              emergencyReserve={context.emergencyReserve ?? 0}
              plannedLoan={plannedLoan}
            />
            <MonthlyObligationCard
              monthlyIncome={context.monthlyIncome ?? 0}
              existingObligations={context.existingObligations ?? 0}
              plannedLoanAmount={plannedLoan}
              interestRate={context.interestRate ?? 8.5}
              tenureYears={context.tenureYears ?? 20}
            />
            <UnconfirmedInfoList property={property} context={context} />
          </div>
        )}

        {activeTab === 'edit' && property && (
          <BuyerContextForm
            context={context}
            propertyPrice={property.price}
            onSave={handleSaveContext}
          />
        )}

        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">Understanding your funding gap before paying booking amount protects your commitment.</p>
          <Button onClick={handleContinue} size="md" className="w-full sm:w-auto">
            <span>Proceed to Investigation Plan</span><ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default function FinancialPage() {
  return <HydrationGuard><FinancialPageContent /></HydrationGuard>;
}
