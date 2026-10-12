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
import { BrandMark } from '@/components/layout/nav';
import { supabase } from '@/lib/supabase';
import { Plus, Loader2 } from 'lucide-react';
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
  const [pendingStepAfterAuth, setPendingStepAfterAuth] = useState<
    number | null
  >(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setCurrentUser(data.user));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user || null);
      }
    );
    return () => authListener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (!found) router.replace('/dashboard?new=true');
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

  // Primary Signup Touchpoint: Step 3 -> Step 4 transition
  // After the user has seen their full True Handover Cash & Stress Test value in Step 3,
  // and clicks "Continue to Step 4: Legal Checklist", softly offer to save their dossier
  // before tracking builder legal documents (with 1-click "Skip for now ->").
  const handleProceedFromStep3ToStep4 = () => {
    if (!currentUser && typeof window !== 'undefined') {
      const promptKey = `hc_auth_prompted_${evalId}`;
      const alreadyPrompted = sessionStorage.getItem(promptKey) === 'true';
      if (!alreadyPrompted) {
        sessionStorage.setItem(promptKey, 'true');
        setPendingStepAfterAuth(4);
        setShowAuthGate(true);
        return;
      }
    }
    handleSelectStep(4);
  };

  if (!hasLoaded || !evaluation) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-[#a1a1a1]" />
      </div>
    );
  }

  return (
    <HydrationGuard>
      <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] print:bg-white print:text-black flex flex-col font-sans">
        {/* Minimal Editorial Top Header */}
        <header className="bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#ffffff14] px-4 sm:px-6 py-3.5 print:hidden">
          <div className="max-w-[1136px] mx-auto flex items-center justify-between gap-3">
            {/* Left: BrandMark + Active Property Breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 group shrink-0"
                title="HomeCheck"
              >
                <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
                <span className="hidden sm:inline font-medium text-[15px] tracking-[-0.02em] text-[#fafafa]">
                  HomeCheck
                </span>
              </Link>
              <span className="text-[#ffffff1f]">/</span>
              <Link
                href="/dashboard"
                className="text-[13px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors hidden sm:inline"
              >
                Workspace
              </Link>
              <span className="text-[#ffffff1f] hidden sm:inline">/</span>
              <span className="text-[13px] text-[#e5e5e5] truncate max-w-[150px] sm:max-w-[260px]">
                {evaluation.property.name || 'Property Audit'}
              </span>
            </div>

            {/* Right: Save Progress + All Properties + Add Property */}
            <div className="flex items-center gap-3 shrink-0">
              {currentUser ? (
                <span className="hidden md:inline text-[12px] text-[#a1a1a1]">
                  Saved · {currentUser.email}
                </span>
              ) : (
                <button
                  onClick={() => {
                    setPendingStepAfterAuth(null);
                    setShowAuthGate(true);
                  }}
                  className="text-[12px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors cursor-pointer"
                >
                  Save progress
                </button>
              )}

              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-full bg-[#171717] hover:bg-[#222222] border border-[#ffffff14] text-[12px] text-[#e5e5e5] transition-colors"
              >
                All Properties
              </Link>

              <Link
                href="/dashboard?new=true"
                className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[12px] font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Property</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Linear Step Progression Navigation */}
        <StepNavigator
          currentStep={currentStep}
          onSelectStep={handleSelectStep}
          completedSteps={Array.from(
            { length: currentStep - 1 },
            (_, i) => i + 1
          )}
        />

        {/* Step Body with Smooth Editorial Transition */}
        <main className="flex-1 max-w-[1136px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {isSynthesizing ? (
            <div className="animate-step-enter">
              <SynthesizingAnimation
                locality={
                  evaluation.property.location || evaluation.property.city || ''
                }
                property={evaluation.property}
                buyerContext={evaluation.buyerContext}
                onComplete={() => {
                  setIsSynthesizing(false);
                  handleSelectStep(3);
                }}
              />
            </div>
          ) : (
            <div key={currentStep} className="animate-step-enter">
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
                  onProceedToInvestigation={handleProceedFromStep3ToStep4}
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
                  onRequestSave={() => {
                    setPendingStepAfterAuth(null);
                    setShowAuthGate(true);
                  }}
                  isSaved={!!currentUser}
                />
              )}

              {currentStep === 5 && (
                <Step5DecisionReport
                  property={evaluation.property}
                  buyerContext={evaluation.buyerContext}
                  checklist={evaluation.checklist}
                  onBack={handleBack}
                  onRequestSave={() => {
                    setPendingStepAfterAuth(null);
                    setShowAuthGate(true);
                  }}
                  isSaved={!!currentUser}
                />
              )}
            </div>
          )}
        </main>

        <AuthGateModal
          isOpen={showAuthGate}
          isStepTransition={pendingStepAfterAuth === 4}
          onClose={() => {
            setShowAuthGate(false);
            if (pendingStepAfterAuth) {
              const targetStep = pendingStepAfterAuth;
              setPendingStepAfterAuth(null);
              handleSelectStep(targetStep);
            }
          }}
          onAuthenticated={async (userId) => {
            setShowAuthGate(false);
            if (userId) {
              claimEvaluation(evalId, userId);
              if (supabase) {
                const u = await supabase.auth.getUser();
                if (u.data.user) setCurrentUser(u.data.user);
              }
            }
            if (pendingStepAfterAuth) {
              const targetStep = pendingStepAfterAuth;
              setPendingStepAfterAuth(null);
              handleSelectStep(targetStep);
            }
          }}
          evaluationId={evalId}
          propertyName={evaluation.property.name || 'this property'}
        />
      </div>
    </HydrationGuard>
  );
}
