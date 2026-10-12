'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Plus,
  ArrowRight,
  Trash2,
  Loader2,
  LogOut,
  X,
  Upload,
} from 'lucide-react';
import { BrandMark } from '@/components/layout/nav';
import { useEvaluationStore } from '@/store/evaluation';
import {
  supabase,
  isSupabaseConfigured,
  fetchUserEvaluationsFromSupabase,
} from '@/lib/supabase';
import {
  calculateFinancialIntelligence,
  formatCurrency,
} from '@/lib/calculations';
import type { PropertyType, PossessionStatus } from '@/types';
import type { User } from '@supabase/supabase-js';

const STEP_LABELS: Record<number, string> = {
  1: 'Baseline Review',
  2: 'Intent & Wallet',
  3: 'True Cost & Stress',
  4: 'Legal & RERA',
  5: 'Decision Dossier',
};

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewTrigger = searchParams.get('new') === 'true';

  const {
    evaluations,
    hasHydrated,
    startNewEvaluation,
    deleteEvaluation,
    claimAllLocalEvaluations,
    mergeCloudEvaluations,
    clearUserSession,
  } = useEvaluationStore();

  const [user, setUser] = useState<User | null>(null);

  // Property Intake Popup Modal state
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [intakeTab, setIntakeTab] = useState<'url' | 'upload' | 'manual'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [intakeError, setIntakeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual Entry State
  const [manualName, setManualName] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [manualPriceLakhs, setManualPriceLakhs] = useState('');
  const [manualBhk, setManualBhk] = useState('2 BHK');
  const [manualCarpet, setManualCarpet] = useState('');
  const [manualType, setManualType] = useState<PropertyType>('Apartment');
  const [manualPossession, setManualPossession] =
    useState<PossessionStatus>('Under construction');

  const evaluationList = Object.values(evaluations || {}).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  // Automatically pop up the Property Intake Modal when user arrives from "Start Free Audit" (?new=true)
  // or when hydration completes and they have 0 properties yet
  useEffect(() => {
    if (!hasHydrated) return;
    if (isNewTrigger || evaluationList.length === 0) {
      setIntakeModalOpen(true);
    }
  }, [hasHydrated, isNewTrigger, evaluationList.length]);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        setUser(data.user);
        claimAllLocalEvaluations(data.user.id);
        const cloudEvals = await fetchUserEvaluationsFromSupabase(data.user.id);
        if (cloudEvals.length > 0) {
          mergeCloudEvaluations(cloudEvals);
        }
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => authListener?.subscription.unsubscribe();
  }, [claimAllLocalEvaluations, mergeCloudEvaluations]);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    clearUserSession();
    setUser(null);
    router.push('/');
  };

  // URL Intake Handler
  const handleUrlAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setIntakeError(null);

    try {
      const res = await fetch('/api/parse-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const json = await res.json();
      const extracted = json.data || json.property || {};
      const evalId = startNewEvaluation(
        {
          name: extracted.name || 'Shortlisted Property',
          location: extracted.location || '',
          price: extracted.price || 0,
          carpetArea: extracted.carpetArea,
          bhk: extracted.bhk,
          developer: extracted.developer,
          possessionStatus: extracted.possessionStatus || 'Under construction',
          reraId: extracted.reraId,
          sourceUrl: trimmed,
          sourceName: extracted.sourceName || 'Listing URL',
        },
        false
      );
      setIntakeModalOpen(false);
      router.push(`/evaluation/${evalId}`);
    } catch {
      const evalId = startNewEvaluation(
        {
          name: 'Shortlisted Property',
          sourceUrl: trimmed,
          sourceName: 'Listing URL',
        },
        false
      );
      setIntakeModalOpen(false);
      router.push(`/evaluation/${evalId}`);
    } finally {
      setIsLoading(false);
    }
  };

  // File Upload Intake Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setIntakeError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/parse-file', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      const extracted = json.data || json.property || {};
      const evalId = startNewEvaluation(
        {
          name: extracted.name || file.name.replace(/\.[^/.]+$/, ''),
          location: extracted.location || '',
          price: extracted.price || 0,
          carpetArea: extracted.carpetArea,
          bhk: extracted.bhk,
          developer: extracted.developer,
          possessionStatus: extracted.possessionStatus || 'Under construction',
          reraId: extracted.reraId,
          sourceName: file.name,
        },
        false
      );
      setIntakeModalOpen(false);
      router.push(`/evaluation/${evalId}`);
    } catch {
      const evalId = startNewEvaluation(
        {
          name: file.name.replace(/\.[^/.]+$/, ''),
          sourceName: file.name,
        },
        false
      );
      setIntakeModalOpen(false);
      router.push(`/evaluation/${evalId}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Manual Entry Handler
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceVal = parseFloat(manualPriceLakhs);
    const priceInRupees =
      !isNaN(priceVal) && priceVal > 0 ? Math.round(priceVal * 100000) : 0;
    const carpetVal = parseInt(manualCarpet, 10);

    const evalId = startNewEvaluation(
      {
        name: manualName.trim() || 'Shortlisted Property',
        location: manualLocation.trim() || 'India',
        price: priceInRupees,
        bhk: manualBhk,
        carpetArea: !isNaN(carpetVal) && carpetVal > 0 ? carpetVal : undefined,
        type: manualType,
        possessionStatus: manualPossession,
        sourceName: 'Manual Entry',
      },
      false
    );
    setIntakeModalOpen(false);
    router.push(`/evaluation/${evalId}`);
  };

  // Demo Property Handler
  const handleStartDemo = () => {
    const evalId = startNewEvaluation({}, true);
    setIntakeModalOpen(false);
    router.push(`/evaluation/${evalId}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col font-sans">
      {/* Top Bar — Exact Kero Editorial Proportions */}
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#ffffff14]">
        <div className="max-w-[1136px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
              <span className="text-[#fafafa] text-[15px] font-medium tracking-[-0.02em]">
                HomeCheck
              </span>
            </Link>
            <span className="text-[#ffffff1f]">/</span>
            <span className="text-[13px] text-[#a1a1a1]">Workspace</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-[13px] text-[#a1a1a1] max-w-[180px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-2 rounded-full bg-[#171717] hover:bg-[#242424] border border-[#ffffff14] text-[#a1a1a1] hover:text-[#fafafa] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login?returnTo=/dashboard"
                className="text-[13px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors"
              >
                Sign in to save across devices
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIntakeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-[1136px] w-full mx-auto px-6 py-12 space-y-10 animate-step-enter">
        {/* Clean Editorial Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ffffff14] pb-8">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1] mb-2">
              PROPERTY DOSSIERS
            </p>
            <h1 className="font-serif text-[32px] sm:text-[42px] text-[#fafafa] tracking-[-0.025em] leading-[1.1]">
              Shortlisted properties
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleStartDemo}
              className="px-4 py-2 rounded-full bg-[#171717] hover:bg-[#222222] border border-[#ffffff14] text-[13px] text-[#e5e5e5] transition-colors cursor-pointer"
            >
              Load Wakad 2BHK Sample
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {!hasHydrated ? (
          <div className="py-24 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-[#a1a1a1]" />
          </div>
        ) : evaluationList.length === 0 ? (
          <div className="rounded-2xl bg-[#141414] border border-[#ffffff14] p-12 sm:p-16 text-center max-w-[560px] mx-auto my-8 space-y-5">
            <h2 className="font-serif text-[26px] text-[#fafafa] tracking-[-0.02em]">
              Start with your first property
            </h2>
            <p className="text-[14px] text-[#a1a1a1] leading-relaxed">
              Enter a listing URL, upload a builder cost sheet, or type the quoted
              price to calculate true handover cash, EMI stress, and state legal
              checks.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIntakeModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium transition-colors cursor-pointer"
              >
                Enter or Upload Property
              </button>
              <button
                type="button"
                onClick={handleStartDemo}
                className="px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#242424] border border-[#ffffff14] text-[13px] text-[#e5e5e5] transition-colors cursor-pointer"
              >
                View Sample Audit
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evaluationList.map((session) => {
              const { property, buyerContext, checklist } = session;
              const currentStep = session.currentStepIndex || 1;
              const fin =
                property.price > 0
                  ? calculateFinancialIntelligence(property, buyerContext || {})
                  : null;
              const trueAllInCost = fin
                ? fin.breakdown.maxLoanEligible + fin.handoverCashNeeded
                : null;
              const upfrontShortfall =
                fin && buyerContext?.availableFunds !== undefined
                  ? Math.max(
                      0,
                      fin.handoverCashNeeded - buyerContext.availableFunds
                    )
                  : null;

              const verifiedDocs = (checklist || []).filter(
                (i) => i.received || i.status === 'verified'
              ).length;
              const totalDocs = (checklist || []).length || 15;

              return (
                <div
                  key={session.id}
                  className="rounded-2xl bg-[#141414] border border-[#ffffff14] hover:border-[#ffffff28] p-6 sm:p-7 flex flex-col justify-between transition-colors"
                >
                  <div>
                    {/* Top Meta Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#a1a1a1]">
                        STEP 0{currentStep} / 05 · {STEP_LABELS[currentStep]}
                      </span>

                      <div className="flex items-center gap-2">
                        {session.isDemo && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.06] text-[#d4d4d4]">
                            Sample
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteEvaluation(session.id)}
                          title="Remove property"
                          className="p-1 text-[#666666] hover:text-[#fafafa] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-serif text-[24px] text-[#fafafa] tracking-[-0.02em] leading-snug">
                      {property.name || 'Untitled Property'}
                    </h3>
                    <p className="text-[13px] text-[#a1a1a1] mt-1">
                      {[
                        property.location || 'Location unverified',
                        property.bhk,
                        property.carpetArea
                          ? `${property.carpetArea} sq.ft`
                          : null,
                        property.possessionStatus,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>

                    {/* Clean Hairline Metrics Table */}
                    <div className="mt-6 pt-5 border-t border-[#ffffff12] grid grid-cols-3 gap-4">
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                          Quoted Base
                        </span>
                        <span className="font-serif text-[19px] text-[#fafafa] mt-1 block">
                          {property.price > 0
                            ? formatCurrency(property.price)
                            : '—'}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                          True All-In
                        </span>
                        <span className="font-serif text-[19px] text-[#fafafa] mt-1 block">
                          {trueAllInCost ? formatCurrency(trueAllInCost) : '—'}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                          Documents
                        </span>
                        <span className="text-[14px] text-[#e5e5e5] mt-1.5 block">
                          {verifiedDocs} of {totalDocs}
                        </span>
                      </div>
                    </div>

                    {fin && upfrontShortfall !== null && (
                      <div className="mt-4 pt-3 border-t border-[#ffffff0d] flex items-center justify-between text-[12px]">
                        <span className="text-[#a1a1a1]">Handover cash position</span>
                        {upfrontShortfall > 0 ? (
                          <span className="text-[#bda96d]">
                            Shortfall of {formatCurrency(upfrontShortfall)}
                          </span>
                        ) : (
                          <span className="text-[#96a766]">
                            Covered · {fin.stressTest.dtiCurrent}% DTI
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-[#ffffff12] flex items-center justify-between">
                    <span className="text-[12px] text-[#666666]">
                      Updated{' '}
                      {new Date(session.updatedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>

                    <Link
                      href={`/evaluation/${session.id}`}
                      className="px-4 py-2 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[12px] font-medium transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>
                        {currentStep >= 5
                          ? 'Open Dossier'
                          : `Continue Step ${currentStep}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Minimal Add Card */}
            <button
              type="button"
              onClick={() => setIntakeModalOpen(true)}
              className="rounded-2xl bg-transparent hover:bg-[#141414] border border-dashed border-[#ffffff1f] hover:border-[#ffffff38] p-8 flex flex-col items-center justify-center text-center min-h-[240px] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#171717] border border-[#ffffff14] flex items-center justify-center text-[#fafafa] mb-3">
                <Plus className="w-4 h-4" />
              </div>
              <p className="font-serif text-[20px] text-[#fafafa]">
                Add another property
              </p>
              <p className="text-[13px] text-[#a1a1a1] mt-1 max-w-[260px]">
                Audit another listing or brochure to compare costs side-by-side.
              </p>
            </button>
          </div>
        )}
      </main>

      {/* =====================================================================
          FIRST-STEP PROPERTY INTAKE POPUP MODAL
          Opens automatically when user clicks "Start Free Audit" -> /dashboard?new=true
         ===================================================================== */}
      {intakeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-[540px] rounded-2xl bg-[#141414] border border-[#ffffff1a] shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden animate-modal-enter">
            {/* Modal Header */}
            <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-[#ffffff12] flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1] mb-1.5">
                  STEP 01 · PROPERTY INTAKE
                </p>
                <h2 className="font-serif text-[26px] sm:text-[30px] text-[#fafafa] tracking-[-0.02em] leading-tight">
                  Enter or upload your property
                </h2>
                <p className="text-[13px] text-[#a1a1a1] mt-1">
                  Start by providing the listing link, brochure PDF, or basic quoted
                  numbers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIntakeModalOpen(false)}
                className="p-2 rounded-full text-[#a1a1a1] hover:text-[#fafafa] hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Clean 3-Tab Switcher */}
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#0a0a0a] border border-[#ffffff14]">
                <button
                  type="button"
                  onClick={() => setIntakeTab('url')}
                  className={`py-2 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                    intakeTab === 'url'
                      ? 'bg-[#1f1f1f] text-[#fafafa]'
                      : 'text-[#a1a1a1] hover:text-[#fafafa]'
                  }`}
                >
                  Listing Link
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('upload')}
                  className={`py-2 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                    intakeTab === 'upload'
                      ? 'bg-[#1f1f1f] text-[#fafafa]'
                      : 'text-[#a1a1a1] hover:text-[#fafafa]'
                  }`}
                >
                  Upload Brochure
                </button>
                <button
                  type="button"
                  onClick={() => setIntakeTab('manual')}
                  className={`py-2 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                    intakeTab === 'manual'
                      ? 'bg-[#1f1f1f] text-[#fafafa]'
                      : 'text-[#a1a1a1] hover:text-[#fafafa]'
                  }`}
                >
                  Enter Manually
                </button>
              </div>

              {/* Tab 1: Paste URL */}
              {intakeTab === 'url' && (
                <form onSubmit={handleUrlAudit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] text-[#a1a1a1] mb-2">
                      Property listing URL
                    </label>
                    <input
                      type="url"
                      required
                      autoFocus
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://www.99acres.com/... or magicbricks.com/..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[14px] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                    />
                    <p className="text-[12px] text-[#666666] mt-2">
                      Works with 99acres, MagicBricks, Housing.com, and NoBroker
                      links.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Reading listing details...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Step 1</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Tab 2: Upload Brochure PDF */}
              {intakeTab === 'upload' && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-[#ffffff24] hover:border-[#fafafa]/40 rounded-xl bg-[#0a0a0a] p-8 text-center cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#171717] border border-[#ffffff14] flex items-center justify-center mx-auto mb-3">
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 text-[#fafafa] animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 text-[#fafafa]" />
                      )}
                    </div>
                    <p className="text-[14px] font-medium text-[#fafafa]">
                      {isLoading
                        ? 'Extracting brochure specifications...'
                        : 'Select builder brochure or cost sheet'}
                    </p>
                    <p className="text-[12px] text-[#666666] mt-1">
                      PDF, JPG, or PNG · You can review all fields in the next step
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Manual Details */}
              {intakeTab === 'manual' && (
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="sm:col-span-2">
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Project or Building Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        placeholder="e.g. Lodha Panache"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Locality &amp; City *
                      </label>
                      <input
                        type="text"
                        required
                        value={manualLocation}
                        onChange={(e) => setManualLocation(e.target.value)}
                        placeholder="e.g. Wakad, Pune"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Quoted Base Price (₹ Lakhs) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={manualPriceLakhs}
                        onChange={(e) => setManualPriceLakhs(e.target.value)}
                        placeholder="e.g. 85 (for ₹85L)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Configuration
                      </label>
                      <select
                        value={manualBhk}
                        onChange={(e) => setManualBhk(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] focus:outline-none"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="2.5 BHK">2.5 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK+</option>
                        <option value="Plot">Plot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Carpet Area (sq.ft)
                      </label>
                      <input
                        type="number"
                        value={manualCarpet}
                        onChange={(e) => setManualCarpet(e.target.value)}
                        placeholder="e.g. 1050"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] placeholder:text-[#666666] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Property Type
                      </label>
                      <select
                        value={manualType}
                        onChange={(e) =>
                          setManualType(e.target.value as PropertyType)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] focus:outline-none"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Independent House">Villa / House</option>
                        <option value="Plot">Plot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                        Possession Stage
                      </label>
                      <select
                        value={manualPossession}
                        onChange={(e) =>
                          setManualPossession(
                            e.target.value as PossessionStatus
                          )
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[13px] text-[#fafafa] focus:outline-none"
                      >
                        <option value="Under construction">
                          Under Construction
                        </option>
                        <option value="Ready to move">Ready to Move</option>
                        <option value="Resale">Resale</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Start 5-Step Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {intakeError && (
                <p className="text-[12px] text-amber-400">{intakeError}</p>
              )}

              {/* Subtle Sample Option Footer */}
              <div className="pt-4 border-t border-[#ffffff12] flex items-center justify-between text-[12px] text-[#a1a1a1]">
                <span>Don&apos;t have a listing handy?</span>
                <button
                  type="button"
                  onClick={handleStartDemo}
                  className="text-[#fafafa] hover:underline font-medium cursor-pointer"
                >
                  Load Wakad 2BHK sample →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[#a1a1a1]" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
