'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HydrationGuard } from '@/components/providers/hydration-guard';
import { useEvaluationStore } from '@/store/evaluation';
import { StepNavigator } from '@/components/progressive/step-navigator';
import { Step1Intake } from '@/components/progressive/step1-intake';
import { Step2IntentFinance } from '@/components/progressive/step2-intent-finance';
import { Step3RealityAlternatives } from '@/components/progressive/step3-reality-alternatives';
import { Step4DeepInvestigation } from '@/components/progressive/step4-deep-investigation';
import { Step5DecisionReport } from '@/components/progressive/step5-decision-report';
import { SynthesizingAnimation } from '@/components/progressive/synthesizing-animation';
import { AuthGateModal } from '@/components/auth/auth-gate-modal';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function ProgressiveEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const evalId = params.id as string;

  const {
    evaluations,
    loadEvaluation,
    updateProperty,
    updateBuyerContext,
    updateChecklistItem,
    activeRegion,
    setStepIndex,
    setAlternatives,
    claimEvaluation,
  } = useEvaluationStore();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setCurrentUser(data.user));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });
    return () => authListener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (!found) router.replace('/');
  }, [evalId, loadEvaluation, router]);

  const evaluation = evaluations[evalId];
  const currentStep = evaluation?.currentStepIndex || 1;

  const handleSelectStep = (stepNum: number) => {
    setStepIndex(evalId, stepNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    const nextStep = Math.min(5, currentStep + 1);
    handleSelectStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = Math.max(1, currentStep - 1);
    handleSelectStep(prevStep);
  };

  if (!hasLoaded || !evaluation) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-stone-400 text-sm animate-pulse">Loading evaluation workspace...</div>
      </div>
    );
  }

  return (
    <HydrationGuard>
      <div className="min-h-screen bg-[#F8F9FB] text-stone-900 flex flex-col font-sans">
        {/* Top Product Header */}
        <header className="bg-white border-b border-stone-200/80 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="text-stone-400 hover:text-stone-800 transition-colors p-1 -ml-1 rounded-lg"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-sm tracking-tight text-stone-900">
                HomeCheck<span className="text-blue-600">.</span>
              </span>
              <span className="text-stone-300">/</span>
              <span className="text-xs font-medium text-stone-600 truncate max-w-[110px] sm:max-w-xs">
                {evaluation.property.name || 'Property Workspace'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Saved to</span>
                <span className="max-w-[100px] truncate text-stone-600 font-normal">{currentUser.email}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthGate(true)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors shrink-0"
              >
                Save Progress
              </button>
            )}
          </div>
        </header>

        {/* Linear Step Progression Navigation */}
        <StepNavigator
          currentStep={currentStep}
          onSelectStep={handleSelectStep}
          completedSteps={Array.from({ length: currentStep - 1 }, (_, i) => i + 1)}
        />

        {/* Step Body */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8">
          {isSynthesizing ? (
            <SynthesizingAnimation
              locality={evaluation.property.location || evaluation.property.city || ''}
              property={evaluation.property}
              buyerContext={evaluation.buyerContext}
              onComplete={() => {
                setIsSynthesizing(false);
                handleSelectStep(3);
                // Soft Gate: Prompt user once to save their dossier if not authenticated
                if (!currentUser && typeof window !== 'undefined') {
                  const alreadyPrompted = sessionStorage.getItem(`auth_prompted_${evalId}`);
                  if (!alreadyPrompted) {
                    sessionStorage.setItem(`auth_prompted_${evalId}`, 'true');
                    setShowAuthGate(true);
                  }
                }
              }}
            />
          ) : (
            <>
              {currentStep === 1 && (
                <Step1Intake
                  property={evaluation.property}
                  onUpdateProperty={(updates) => updateProperty(evalId, updates)}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <Step2IntentFinance
                  property={evaluation.property}
                  buyerContext={evaluation.buyerContext}
                  onUpdateContext={(ctx) => updateBuyerContext(evalId, ctx)}
                  onNext={() => {
                    setIsSynthesizing(true);
                  }}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <Step3RealityAlternatives
                  property={evaluation.property}
                  buyerContext={evaluation.buyerContext}
                  cachedAlternatives={evaluation.alternatives}
                  onSetAlternatives={(alts) => setAlternatives(evalId, alts)}
                  onProceedToInvestigation={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 4 && (
                <Step4DeepInvestigation
                  property={evaluation.property}
                  checklist={evaluation.checklist}
                  activeRegion={activeRegion}
                  onUpdateChecklistItem={(itemId, updates) =>
                    updateChecklistItem(evalId, itemId, updates)
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 5 && (
                <Step5DecisionReport
                  property={evaluation.property}
                  buyerContext={evaluation.buyerContext}
                  checklist={evaluation.checklist}
                  onBack={handleBack}
                  onRequestSave={() => setShowAuthGate(true)}
                  isSaved={!!currentUser}
                />
              )}
            </>
          )}
        </main>

        <AuthGateModal
          isOpen={showAuthGate}
          onClose={() => setShowAuthGate(false)}
          onAuthenticated={async (userId) => {
            setShowAuthGate(false);
            if (userId) {
              claimEvaluation(evalId, userId);
              if (supabase) {
                const u = await supabase.auth.getUser();
                if (u.data.user) setCurrentUser(u.data.user);
              }
            }
          }}
          evaluationId={evalId}
          propertyName={evaluation.property.name || 'this property'}
        />
      </div>
    </HydrationGuard>
  );
}
