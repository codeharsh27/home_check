'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { BrandMark } from '@/components/layout/nav';
import {
  useEvaluationStore,
  DEMO_PROPERTY,
  DEMO_BUYER_CONTEXT,
} from '@/store/evaluation';
import {
  formatCurrency,
  calculateFinancialIntelligence,
} from '@/lib/calculations';
import { fetchAllAnalyticsEvents, AnalyticsEvent } from '@/lib/analytics';
import { fetchAllEvaluationsFromSupabase } from '@/lib/supabase';
import { generateChecklist } from '@/lib/checklist-engine';
import { EvaluationSession } from '@/types';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'metrics' | 'evaluations' | 'funnel' | 'events'
  >('metrics');

  const { evaluations } = useEvaluationStore();
  const [cloudEvaluations, setCloudEvaluations] = useState<EvaluationSession[]>(
    []
  );
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('homecheck_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const [list, cloudEvals] = await Promise.all([
        fetchAllAnalyticsEvents(),
        fetchAllEvaluationsFromSupabase(),
      ]);
      if (Array.isArray(list)) setEvents(list);
      if (Array.isArray(cloudEvals)) setCloudEvaluations(cloudEvals);
    } catch (err) {
      console.warn('[Admin] Data fetch error:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = password.trim();
    if (
      (u === 'admin@homecheck.in' || u === 'admin' || u === 'founder') &&
      (p === 'admin' || p === 'admin123' || p === 'recruiter2026')
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('homecheck_admin_auth', 'true');
      setLoginError(null);
    } else {
      setLoginError(
        'Invalid credentials. You can also use 1-Click Reviewer Access below.'
      );
    }
  };

  const handleQuickAccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('homecheck_admin_auth', 'true');
    setLoginError(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('homecheck_admin_auth');
  };

  // Merge cloud evaluations from Supabase with local client evaluations
  const mergedMap = new Map<string, EvaluationSession>();
  (cloudEvaluations || []).forEach((e) => {
    if (e && e.id) mergedMap.set(e.id, e);
  });
  Object.values(evaluations || {}).forEach((e) => {
    if (e && e.id) mergedMap.set(e.id, e);
  });

  let evaluationList: EvaluationSession[] = Array.from(mergedMap.values());

  // Seed benchmark demo evaluation if list is empty
  if (evaluationList.length === 0) {
    evaluationList = [
      {
        id: 'eval_demo_sample',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentStepIndex: 5,
        step: 'dashboard',
        completedSteps: [
          'snapshot',
          'financial',
          'investigation',
          'questions',
          'dashboard',
        ],
        property: DEMO_PROPERTY,
        buyerContext: DEMO_BUYER_CONTEXT,
        checklist: generateChecklist(
          DEMO_PROPERTY.type,
          DEMO_PROPERTY.possessionStatus
        ),
        isDemo: true,
      },
    ];
  }

  // Compute Metrics across evaluations
  const totalEvaluationsCount = evaluationList.length;

  let totalPropertyValue = 0;
  let totalHandoverCashDrain = 0;
  let totalSavingsPotential = 0;

  evaluationList.forEach((e) => {
    if (e?.property) {
      totalPropertyValue += e.property.price || 0;
      const fin = calculateFinancialIntelligence(
        e.property,
        e.buyerContext || {}
      );
      totalHandoverCashDrain += fin.handoverCashNeeded || 0;
      totalSavingsPotential +=
        (fin.taxSavings?.totalAnnualTaxSaved || 0) +
        (fin.taxSavings?.femaleStampDutySaved || 0) +
        (fin.taxSavings?.prepaymentSavings?.interestSaved || 0);
    }
  });

  // Funnel Stage Counts (Progressive 5 Steps)
  const funnel = {
    step1: evaluationList.length,
    step2: evaluationList.filter(
      (e) =>
        (e.currentStepIndex && e.currentStepIndex >= 2) ||
        (e.completedSteps && e.completedSteps.length >= 1)
    ).length,
    step3: evaluationList.filter(
      (e) =>
        (e.currentStepIndex && e.currentStepIndex >= 3) ||
        (e.completedSteps && e.completedSteps.length >= 2)
    ).length,
    step4: evaluationList.filter(
      (e) =>
        (e.currentStepIndex && e.currentStepIndex >= 4) ||
        (e.completedSteps && e.completedSteps.length >= 3)
    ).length,
    step5: evaluationList.filter(
      (e) =>
        (e.currentStepIndex && e.currentStepIndex >= 5) ||
        e.step === 'dashboard' ||
        (e.completedSteps && e.completedSteps.includes('dashboard'))
    ).length,
  };

  const completedDossiersCount = Math.max(funnel.step5, 1);

  // Property type distribution
  const propertyTypeCounts = evaluationList.reduce(
    (acc: Record<string, number>, curr) => {
      const type = curr?.property?.type || 'Apartment';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  // =========================================================================
  // 1. UNAUTHENTICATED ADMIN LOGIN SCREEN (Kero Editorial Dark Aesthetic)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col justify-between font-sans">
        {/* Top Header */}
        <header className="max-w-[1136px] w-full mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
            <span className="text-[#fafafa] text-[15px] font-medium tracking-[-0.02em]">
              HomeCheck
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </header>

        {/* Centered Login Card */}
        <main className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[420px] animate-step-enter">
            <div className="mb-8">
              <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1] mb-2">
                OPERATIONS CONSOLE
              </p>
              <h1 className="font-serif text-[32px] sm:text-[36px] text-[#fafafa] tracking-[-0.025em] leading-[1.12]">
                Admin &amp; Telemetry
              </h1>
              <p className="text-[14px] text-[#a1a1a1] mt-2 leading-relaxed">
                Product telemetry, 5-step funnel conversion metrics, and active
                property dossiers.
              </p>
            </div>

            <div className="rounded-2xl bg-[#141414] border border-[#ffffff14] p-6 sm:p-7 space-y-6">
              {loginError && (
                <p className="text-[12px] text-amber-400 leading-relaxed">
                  {loginError}
                </p>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin@homecheck.in"
                    className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] font-medium text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Sign in to console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Reviewer / Founder 1-Click Bypass */}
              <div className="pt-5 border-t border-[#ffffff12] space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                  <span>PORTFOLIO &amp; PRODUCT REVIEW</span>
                  <span className="text-[#96a766]">1-CLICK ACCESS</span>
                </div>
                <p className="text-[12px] text-[#a1a1a1] leading-relaxed">
                  Reviewing the HomeCheck product case study or telemetry
                  architecture? Open the live console directly:
                </p>
                <button
                  type="button"
                  onClick={handleQuickAccess}
                  className="w-full py-2.5 rounded-full bg-[#0a0a0a] hover:bg-[#1f1f1f] border border-[#ffffff14] text-[12px] font-medium text-[#fafafa] transition-colors cursor-pointer"
                >
                  Enter as Reviewer / Founder →
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-[12px] text-[#666666] border-t border-[#ffffff14]">
          HomeCheck Internal Telemetry &amp; Underwriting Console
        </footer>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN CONSOLE (Restrained Kero Editorial Dark Aesthetic)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#ffffff14] bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-[1136px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
              <span className="text-[#fafafa] text-[15px] font-medium tracking-[-0.02em]">
                HomeCheck
              </span>
            </Link>
            <span className="text-[#ffffff1f]">/</span>
            <span className="text-[13px] text-[#a1a1a1]">Admin Console</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-full bg-[#171717] hover:bg-[#222222] border border-[#ffffff14] text-[12px] text-[#e5e5e5] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Workspace</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full bg-transparent hover:bg-[#171717] border border-[#ffffff14] text-[12px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1136px] w-full mx-auto px-6 py-10 sm:py-12 space-y-10 animate-step-enter">
        {/* Editorial Header & Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ffffff14] pb-8">
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
              INTERNAL TELEMETRY · REAL-TIME ENGINE
            </p>
            <h1 className="font-serif text-[32px] sm:text-[42px] text-[#fafafa] tracking-[-0.025em] leading-[1.1]">
              Underwriting &amp; funnel metrics
            </h1>
            <p className="text-[14px] text-[#a1a1a1] max-w-xl leading-relaxed">
              Live overview of evaluated property value, non-loanable handover
              cash audited, and buyer progression across the 5-step workflow.
            </p>
          </div>

          {/* Clean Pill Tab Switcher */}
          <div className="flex flex-wrap bg-[#141414] p-1 rounded-xl border border-[#ffffff14] shrink-0 gap-1">
            {[
              { id: 'metrics' as const, code: '01', label: 'Overview' },
              { id: 'evaluations' as const, code: '02', label: 'Dossiers' },
              { id: 'funnel' as const, code: '03', label: '5-Step Funnel' },
              { id: 'events' as const, code: '04', label: 'Event Log' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-[12px] font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#fafafa] text-[#0a0a0a]'
                    : 'text-[#a1a1a1] hover:text-[#fafafa]'
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${
                    activeTab === tab.id ? 'text-[#0a0a0a]' : 'text-[#666666]'
                  }`}
                >
                  {tab.code}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =================================================================
            TAB 1: OVERVIEW & KPIS
           ================================================================= */}
        {activeTab === 'metrics' && (
          <div key="metrics" className="space-y-8 animate-step-enter">
            {/* Top 4 KPI Ledger Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#141414] border border-[#ffffff14] p-6 rounded-2xl space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#a1a1a1] block">
                  01 / DECISION DOSSIERS
                </span>
                <div className="font-serif text-[34px] text-[#fafafa] leading-none">
                  {completedDossiersCount}
                </div>
                <p className="text-[12px] text-[#a1a1a1] leading-relaxed pt-1 border-t border-[#ffffff10]">
                  Completed Step 05 reports with full verification checklists.
                </p>
              </div>

              <div className="bg-[#141414] border border-[#ffffff14] p-6 rounded-2xl space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#a1a1a1] block">
                  02 / CAPITAL AUDITED
                </span>
                <div className="font-serif text-[34px] text-[#fafafa] leading-none">
                  {formatCurrency(totalPropertyValue)}
                </div>
                <p className="text-[12px] text-[#a1a1a1] leading-relaxed pt-1 border-t border-[#ffffff10]">
                  Cumulative agreement value across {totalEvaluationsCount}{' '}
                  shortlisted properties.
                </p>
              </div>

              <div className="bg-[#141414] border border-[#ffffff14] p-6 rounded-2xl space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#bda96d] block">
                  03 / HANDOVER CASH AUDITED
                </span>
                <div className="font-serif text-[34px] text-[#fafafa] leading-none">
                  {formatCurrency(totalHandoverCashDrain)}
                </div>
                <p className="text-[12px] text-[#a1a1a1] leading-relaxed pt-1 border-t border-[#ffffff10]">
                  Non-loanable down payment, stamp duty, registration, and
                  corpus.
                </p>
              </div>

              <div className="bg-[#141414] border border-[#ffffff14] p-6 rounded-2xl space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#96a766] block">
                  04 / BUYER SAVINGS MAPPED
                </span>
                <div className="font-serif text-[34px] text-[#96a766] leading-none">
                  {formatCurrency(totalSavingsPotential)}
                </div>
                <p className="text-[12px] text-[#a1a1a1] leading-relaxed pt-1 border-t border-[#ffffff10]">
                  Sec 24(b)/80C tax deductions, female stamp duty concessions &amp;
                  prepay.
                </p>
              </div>
            </div>

            {/* Secondary Grid: Asset Mix & Legal Check Coverage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Asset Mix */}
              <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-end justify-between border-b border-[#ffffff12] pb-4">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                      PORTFOLIO BREAKDOWN
                    </p>
                    <h2 className="font-serif text-[24px] text-[#fafafa] mt-1">
                      Evaluated property types
                    </h2>
                  </div>
                  <span className="text-[12px] font-mono text-[#a1a1a1]">
                    {evaluationList.length} TOTAL
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.entries(propertyTypeCounts).map(([type, count]) => {
                    const pct = Math.round(
                      (count / Math.max(evaluationList.length, 1)) * 100
                    );
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-[#fafafa] font-medium">
                            {type}
                          </span>
                          <span className="font-mono text-[#a1a1a1]">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ffffff10]">
                          <div
                            className="h-full bg-[#fafafa] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stage-Gated Verification Signals */}
              <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-end justify-between border-b border-[#ffffff12] pb-4">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                      LEGAL &amp; MARKET CHECKS
                    </p>
                    <h2 className="font-serif text-[24px] text-[#fafafa] mt-1">
                      Verification coverage
                    </h2>
                  </div>
                  <span className="text-[12px] font-mono text-[#96a766]">
                    ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                      ADVOCATE CHECKLIST ITEMS
                    </span>
                    <p className="font-serif text-[28px] text-[#fafafa]">
                      {Math.max(funnel.step4, 1) * 4}
                    </p>
                    <p className="text-[12px] text-[#666666]">
                      30-year EC &amp; floor-wise CC checks generated
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                      LOCALITY BENCHMARKS
                    </span>
                    <p className="font-serif text-[28px] text-[#fafafa]">
                      {Math.max(funnel.step3, 1) * 3}
                    </p>
                    <p className="text-[12px] text-[#666666]">
                      Comparable projects mapped within 2–4 km
                    </p>
                  </div>
                </div>

                <p className="text-[13px] text-[#a1a1a1] leading-relaxed pt-2 border-t border-[#ffffff10]">
                  Every dossier separates free pre-booking documents (requested
                  directly from the builder) from independent property lawyer
                  title checks before signing the Agreement for Sale.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: ACTIVE EVALUATIONS DIRECTORY
           ================================================================= */}
        {activeTab === 'evaluations' && (
          <div
            key="evaluations"
            className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6 animate-step-enter"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ffffff12] pb-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                  WORKSPACE DIRECTORY
                </p>
                <h2 className="font-serif text-[26px] text-[#fafafa] mt-1">
                  Active property dossiers
                </h2>
              </div>

              <button
                type="button"
                onClick={loadData}
                className="px-4 py-2 rounded-full bg-[#0a0a0a] hover:bg-[#1f1f1f] border border-[#ffffff14] text-[12px] text-[#e5e5e5] inline-flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`}
                />
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="border-b border-[#ffffff14] text-[#a1a1a1] font-mono uppercase text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4 font-normal">Property</th>
                    <th className="py-3.5 px-4 font-normal">Location</th>
                    <th className="py-3.5 px-4 font-normal text-right">
                      Quoted Base
                    </th>
                    <th className="py-3.5 px-4 font-normal text-right">
                      Handover Cash
                    </th>
                    <th className="py-3.5 px-4 font-normal text-center">
                      Stage
                    </th>
                    <th className="py-3.5 px-4 font-normal text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffffff10]">
                  {evaluationList.map((evalSession) => {
                    const prop = evalSession.property || DEMO_PROPERTY;
                    const fin = calculateFinancialIntelligence(
                      prop,
                      evalSession.buyerContext || {}
                    );
                    const stepNum = evalSession.currentStepIndex || 5;

                    return (
                      <tr
                        key={evalSession.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-[#fafafa]">
                            {prop.name}
                          </div>
                          <div className="text-[12px] text-[#666666]">
                            {prop.bhk || '2 BHK'} · {prop.carpetArea || 1000}{' '}
                            sq.ft
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#a1a1a1]">
                          {prop.location || prop.city || 'India'}
                        </td>
                        <td className="py-4 px-4 text-right font-serif text-[16px] text-[#fafafa]">
                          {formatCurrency(prop.price)}
                        </td>
                        <td className="py-4 px-4 text-right font-serif text-[16px] text-[#bda96d]">
                          {formatCurrency(fin.handoverCashNeeded)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono uppercase bg-[#0a0a0a] border border-[#ffffff14] text-[#e5e5e5]">
                            Step 0{stepNum} / 05
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Link
                            href={`/evaluation/${evalSession.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[12px] font-medium transition-colors"
                          >
                            <span>Open</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: 5-STAGE PROGRESSION FUNNEL
           ================================================================= */}
        {activeTab === 'funnel' && (
          <div
            key="funnel"
            className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6 animate-step-enter"
          >
            <div className="border-b border-[#ffffff12] pb-5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                CONVERSION ARCHITECTURE
              </p>
              <h2 className="font-serif text-[26px] text-[#fafafa] mt-1">
                5-step audit progression funnel
              </h2>
              <p className="text-[13px] text-[#a1a1a1] mt-1">
                Tracks user progression from initial property intake through the
                final printable decision dossier.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  code: 'STEP 01',
                  step: 'Property Intake & Baseline Specifications',
                  count: funnel.step1,
                  pct: 100,
                  drop: '0%',
                  desc: 'User provides listing URL, brochure PDF, or manual specs and confirms carpet area & base price.',
                },
                {
                  code: 'STEP 02',
                  step: 'Purchase Intent & Financial Capacity',
                  count: funnel.step2,
                  pct: Math.round(
                    (funnel.step2 / Math.max(funnel.step1, 1)) * 100
                  ),
                  drop: `${Math.max(
                    0,
                    100 -
                      Math.round(
                        (funnel.step2 / Math.max(funnel.step1, 1)) * 100
                      )
                  )}%`,
                  desc: 'User defines self-use vs. investment intent, liquid savings, monthly income, and loan tenure.',
                },
                {
                  code: 'STEP 03',
                  step: 'True Handover Cash & +1.25% Rate Stress Test',
                  count: funnel.step3,
                  pct: Math.round(
                    (funnel.step3 / Math.max(funnel.step1, 1)) * 100
                  ),
                  drop: `${Math.max(
                    0,
                    Math.round(
                      (funnel.step2 / Math.max(funnel.step1, 1)) * 100
                    ) -
                      Math.round(
                        (funnel.step3 / Math.max(funnel.step1, 1)) * 100
                      )
                  )}%`,
                  desc: 'Peak value moment: Out-of-pocket cash ledger, EMI stress test, and nearby comparable projects.',
                },
                {
                  code: 'STEP 04',
                  step: 'State-Specific Legal & RERA Checklist',
                  count: funnel.step4,
                  pct: Math.round(
                    (funnel.step4 / Math.max(funnel.step1, 1)) * 100
                  ),
                  drop: `${Math.max(
                    0,
                    Math.round(
                      (funnel.step3 / Math.max(funnel.step1, 1)) * 100
                    ) -
                      Math.round(
                        (funnel.step4 / Math.max(funnel.step1, 1)) * 100
                      )
                  )}%`,
                  desc: 'Primary soft signup touchpoint transitions user into tracking builder documents and advocate scope.',
                },
                {
                  code: 'STEP 05',
                  step: 'Executive Decision Dossier & PDF Print',
                  count: funnel.step5,
                  pct: Math.round(
                    (funnel.step5 / Math.max(funnel.step1, 1)) * 100
                  ),
                  drop: `${Math.max(
                    0,
                    Math.round(
                      (funnel.step4 / Math.max(funnel.step1, 1)) * 100
                    ) -
                      Math.round(
                        (funnel.step5 / Math.max(funnel.step1, 1)) * 100
                      )
                  )}%`,
                  desc: 'Complete financial & legal summary with site-visit questions and printable PDF dossier.',
                },
              ].map((item, idx) => (
                <div
                  key={item.code}
                  className="p-5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono uppercase text-[#a1a1a1]">
                        {item.code}
                      </span>
                      <span className="text-[14px] font-medium text-[#fafafa]">
                        {item.step}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-[12px]">
                      <span className="text-[#fafafa]">
                        {item.count} dossiers ({item.pct}%)
                      </span>
                      {idx > 0 && (
                        <span className="text-[#a1a1a1]">
                          Drop-off: {item.drop}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#fafafa] rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(item.pct, 4)}%` }}
                    />
                  </div>

                  <p className="text-[12px] text-[#a1a1a1] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: TELEMETRY LOG
           ================================================================= */}
        {activeTab === 'events' && (
          <div
            key="events"
            className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6 animate-step-enter"
          >
            <div className="flex items-end justify-between border-b border-[#ffffff12] pb-5">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                  EVENT STREAM
                </p>
                <h2 className="font-serif text-[26px] text-[#fafafa] mt-1">
                  User action telemetry log
                </h2>
              </div>
              <button
                type="button"
                onClick={loadData}
                className="px-4 py-2 rounded-full bg-[#0a0a0a] hover:bg-[#1f1f1f] border border-[#ffffff14] text-[12px] text-[#e5e5e5] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`}
                />
                <span>Refresh</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="border-b border-[#ffffff14] text-[#a1a1a1] font-mono uppercase text-[11px]">
                  <tr>
                    <th className="p-3.5 font-normal">Event</th>
                    <th className="p-3.5 font-normal">Category</th>
                    <th className="p-3.5 font-normal">Session ID</th>
                    <th className="p-3.5 font-normal">Metadata</th>
                    <th className="p-3.5 font-normal text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffffff10] font-mono">
                  {events.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-8 text-center text-[#a1a1a1] font-sans text-[13px]"
                      >
                        No telemetry events recorded in this session yet.
                      </td>
                    </tr>
                  ) : (
                    (events || []).map((evt, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-3.5 text-[#fafafa]">
                          {evt?.eventName || 'event'}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#ffffff14] text-[10px] uppercase text-[#a1a1a1]">
                            {evt?.category || 'telemetry'}
                          </span>
                        </td>
                        <td className="p-3.5 text-[#a1a1a1] max-w-[140px] truncate">
                          {evt?.sessionId || '—'}
                        </td>
                        <td className="p-3.5 text-[#a1a1a1] max-w-xs truncate">
                          {typeof evt?.properties === 'object'
                            ? JSON.stringify(evt.properties)
                            : String(evt?.properties || '{}')}
                        </td>
                        <td className="p-3.5 text-[#666666] text-right">
                          {(() => {
                            try {
                              return evt?.createdAt
                                ? new Date(evt.createdAt).toLocaleTimeString(
                                    'en-IN'
                                  )
                                : 'Recent';
                            } catch {
                              return 'Recent';
                            }
                          })()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
