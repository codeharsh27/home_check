'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Activity,
  ArrowRight,
  Lock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  PieChart,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEvaluationStore, DEMO_PROPERTY, DEMO_BUYER_CONTEXT } from '@/store/evaluation';
import { formatCurrency } from '@/lib/calculations';
import { fetchAllAnalyticsEvents, AnalyticsEvent } from '@/lib/analytics';
import { fetchAllEvaluationsFromSupabase } from '@/lib/supabase';
import { generateChecklist } from '@/lib/checklist-engine';
import { EvaluationSession } from '@/types';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'metrics' | 'funnel' | 'events' | 'pm_rationale'>('metrics');

  const { evaluations } = useEvaluationStore();
  const [cloudEvaluations, setCloudEvaluations] = useState<EvaluationSession[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    // Check if session was previously unlocked in localStorage
    if (typeof window !== 'undefined') {
      const savedAuth = localStorage.getItem('homecheck_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
    loadData();
  }, []);

  const loadData = async () => {
    const [list, cloudEvals] = await Promise.all([
      fetchAllAnalyticsEvents(),
      fetchAllEvaluationsFromSupabase(),
    ]);
    setEvents(list);
    setCloudEvaluations(cloudEvals);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username === 'admin@homecheck.in' || username === 'admin') &&
      password === 'recruiter2026'
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('homecheck_admin_auth', 'true');
      setLoginError(null);
    } else {
      setLoginError('Invalid credentials. Use recruiter demo access button below.');
    }
  };

  const handleRecruiterQuickAccess = () => {
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
  cloudEvaluations.forEach((e) => {
    if (e && e.id) mergedMap.set(e.id, e);
  });
  Object.values(evaluations).forEach((e) => {
    if (e && e.id) mergedMap.set(e.id, e);
  });

  let evaluationList: EvaluationSession[] = Array.from(mergedMap.values());

  // If no evaluations yet in a fresh browser session, seed demo benchmark so portfolio reviewer sees rich metrics
  if (evaluationList.length === 0) {
    evaluationList = [
      {
        id: 'eval_demo_initial',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        step: 'dashboard',
        completedSteps: ['snapshot', 'financial', 'investigation', 'questions', 'dashboard'],
        property: DEMO_PROPERTY,
        buyerContext: DEMO_BUYER_CONTEXT,
        checklist: generateChecklist(DEMO_PROPERTY.type, DEMO_PROPERTY.possessionStatus),
        isDemo: true,
      },
    ];
  }

  // Compute PM Metrics
  const totalEvaluationsCount = Math.max(evaluationList.length, 1);
  const totalPropertyValue = evaluationList.reduce(
    (acc, curr) => acc + (curr.property?.price || 0),
    0
  );
  const totalFundingGaps = evaluationList.reduce((acc, curr) => {
    const price = curr.property?.price || 0;
    const funds = (curr.buyerContext?.availableFunds || 0) - (curr.buyerContext?.emergencyReserve || 0);
    const loan = curr.buyerContext?.plannedLoanAmount || 0;
    const gap = Math.max(0, price * 1.07 - (Math.max(0, funds) + loan));
    return acc + gap;
  }, 0);

  const completedEvaluations = evaluationList.filter((e) =>
    e.completedSteps.includes('dashboard') || e.step === 'dashboard'
  );
  const completionRate = Math.round((completedEvaluations.length / totalEvaluationsCount) * 100);

  // Funnel Stage Counts
  const funnel = {
    intake: evaluationList.length || 1,
    snapshot: evaluationList.filter((e) => e.completedSteps.includes('snapshot')).length || (evaluationList.length ? 1 : 0),
    financial: evaluationList.filter((e) => e.completedSteps.includes('financial')).length,
    investigation: evaluationList.filter((e) => e.completedSteps.includes('investigation')).length,
    dashboard: completedEvaluations.length,
  };

  // Property type distribution
  const propertyTypeCounts = evaluationList.reduce((acc: Record<string, number>, curr) => {
    const type = curr.property?.type || 'Apartment';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Document uploads count
  const totalDocumentsUploaded = evaluationList.reduce((acc, curr) => {
    return acc + (curr.checklist?.reduce((cAcc, cItem) => cAcc + (cItem.documents?.length || 0), 0) || 0);
  }, 0);

  // Legal risks flagged count (needs-pro)
  const totalLegalRisksFlagged = evaluationList.reduce((acc, curr) => {
    return acc + (curr.checklist?.filter((i) => i.status === 'needs-pro').length || 0);
  }, 0);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-[#121212] border border-[#252525] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#5B8BDF]/10 border border-[#5B8BDF]/30 flex items-center justify-center text-[#5B8BDF] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Founder & PM Metrics Console</h1>
            <p className="text-xs text-[#888888] leading-relaxed">
              Product analytics, user conversion funnels, and value realization telemetry for HomeCheck.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-[#D94F4F]/10 border border-[#D94F4F]/30 rounded-lg text-xs text-[#D94F4F]">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Admin / Recruiter Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@homecheck.in"
              className="text-xs"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="text-xs"
            />
            <Button type="submit" size="md" className="w-full">
              <span>Sign in to Dashboard</span>
            </Button>
          </form>

          <div className="relative border-t border-[#202020] pt-4">
            <div className="bg-[#181818] border border-[#2E2E2E] rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5B8BDF]">
                <Sparkles className="w-4 h-4" />
                <span>Recruiter & Hiring Manager 1-Click Access</span>
              </div>
              <p className="text-[11px] text-[#888888]">
                Evaluating this project for a Product Management role? Click below for immediate instant demo access:
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRecruiterQuickAccess}
                className="w-full mt-1 border-[#5B8BDF]/40 text-[#5B8BDF] hover:bg-[#5B8BDF]/10"
              >
                <span>Enter as Recruiter / Reviewer →</span>
              </Button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-[#666666] hover:text-[#EDEDED] transition-colors">
              ← Return to consumer evaluation app
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED PM DASHBOARD
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#1E1E1E] bg-[#0E0E0E]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-[#5B8BDF]/10 border border-[#5B8BDF]/30 flex items-center justify-center text-[#5B8BDF]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-[#EDEDED]">homecheck</span>
          </Link>
          <span className="text-xs text-[#666666]">/</span>
          <span className="text-xs font-mono font-medium text-[#5B8BDF] bg-[#5B8BDF]/10 px-2 py-0.5 rounded border border-[#5B8BDF]/20">
            PM Analytics Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-[#888888] hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Live App</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs text-[#777777]">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
        {/* PM Role Portfolio Banner */}
        <div className="bg-[#121212] border border-[#2B2B2B] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#3F9E6C] bg-[#3F9E6C]/10 px-2 py-0.5 rounded border border-[#3F9E6C]/30">
                Live PM Case Study
              </span>
              <span className="text-xs text-[#666666]">Product Management Portfolio Telemetry</span>
            </div>
            <h2 className="text-lg font-bold text-white">HomeCheck Product Strategy & Telemetry Hub</h2>
            <p className="text-xs text-[#888888] max-w-2xl leading-relaxed">
              Real-time measurement of acquisition, core value realization, funnel conversion, and safety protections across Indian property buyers.
            </p>
          </div>

          <div className="flex bg-[#161616] border border-[#262626] p-1 rounded-xl shrink-0">
            {[
              { id: 'metrics', label: 'KPIs & Overview', icon: <TrendingUp className="w-3.5 h-3.5" /> },
              { id: 'funnel', label: 'Conversion Funnel', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'events', label: 'Live Telemetry Log', icon: <Activity className="w-3.5 h-3.5" /> },
              { id: 'pm_rationale', label: 'PM Case Rationale', icon: <FileText className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#5B8BDF] text-white'
                    : 'text-[#888888] hover:text-[#EDEDED]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: KPIS & OVERVIEW */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#121212] border border-[#222222] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">NORTH STAR METRIC</span>
                  <div className="w-7 h-7 rounded-lg bg-[#3F9E6C]/10 text-[#3F9E6C] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono text-[#3F9E6C]">
                  {completedEvaluations.length}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-[#CCCCCC] font-medium">Decision-Ready Evaluations</span>
                  <p className="text-[11px] text-[#666666] leading-tight">
                    Users reaching completion with verified risk clarity
                  </p>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222222] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">CAPITAL EVALUATED</span>
                  <div className="w-7 h-7 rounded-lg bg-[#5B8BDF]/10 text-[#5B8BDF] flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono text-[#5B8BDF]">
                  {formatCurrency(totalPropertyValue)}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-[#CCCCCC] font-medium">Total Property Value Tracked</span>
                  <p className="text-[11px] text-[#666666] leading-tight">
                    Across {evaluationList.length} active property evaluations
                  </p>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222222] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">CAPITAL PROTECTED</span>
                  <div className="w-7 h-7 rounded-lg bg-[#D94F4F]/10 text-[#D94F4F] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono text-[#D94F4F]">
                  {formatCurrency(totalFundingGaps)}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-[#CCCCCC] font-medium">Funding Gaps Uncovered</span>
                  <p className="text-[11px] text-[#666666] leading-tight">
                    Hidden financial exposure caught before booking
                  </p>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222222] p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">FUNNEL CONVERSION</span>
                  <div className="w-7 h-7 rounded-lg bg-[#E6832A]/10 text-[#E6832A] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono text-[#E6832A]">
                  {completionRate}%
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-[#CCCCCC] font-medium">End-to-End Completion Rate</span>
                  <p className="text-[11px] text-[#666666] leading-tight">
                    From intake URL/brochure to final dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Section: Property Distribution & Feature Adoption */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Property Mix */}
              <div className="bg-[#121212] border border-[#222222] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#EDEDED]">Evaluation Asset Mix</h3>
                    <p className="text-xs text-[#888888]">Properties evaluated by category</p>
                  </div>
                  <span className="text-xs font-mono text-[#888888]">{evaluationList.length} properties</span>
                </div>

                <div className="space-y-3">
                  {Object.entries(propertyTypeCounts).map(([type, count]) => {
                    const pct = Math.round((count / Math.max(evaluationList.length, 1)) * 100);
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#CCCCCC]">{type}</span>
                          <span className="font-mono text-[#888888]">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#5B8BDF] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Due Diligence Depth */}
              <div className="bg-[#121212] border border-[#222222] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#EDEDED]">Due Diligence & Risk Detection Depth</h3>
                    <p className="text-xs text-[#888888]">Protections executed per evaluation</p>
                  </div>
                  <span className="text-xs font-mono text-[#3F9E6C]">Safety Signals</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-[#161616] border border-[#242424] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#888888]">DOCUMENTS UPLOADED</span>
                    <p className="text-xl font-bold font-mono text-[#3F9E6C]">{totalDocumentsUploaded}</p>
                    <p className="text-[11px] text-[#666666]">Real title deeds & NOCs stored</p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#161616] border border-[#242424] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#888888]">LEGAL RISKS FLAGGED</span>
                    <p className="text-xl font-bold font-mono text-[#E6832A]">{totalLegalRisksFlagged}</p>
                    <p className="text-[11px] text-[#666666]">Sent to property lawyer review</p>
                  </div>
                </div>

                <div className="p-3 bg-[#0F0F0F] border border-[#222222] rounded-xl text-xs text-[#888888] leading-relaxed">
                  💡 <strong className="text-[#EDEDED]">PM Insight:</strong> High legal risk flags indicate high user dependence on professional lawyer guidance, validating the &ldquo;Needs-Pro&rdquo; evidence badge feature.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONVERSION FUNNEL */}
        {activeTab === 'funnel' && (
          <div className="space-y-6">
            <div className="bg-[#121212] border border-[#252525] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#202020] pb-4">
                <h3 className="text-base font-semibold text-[#EDEDED]">5-Stage User Conversion Funnel</h3>
                <p className="text-xs text-[#888888] mt-1">
                  Tracks activation from property ingestion to final decision-readiness export.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: 'Stage 01: Intake & Property Snapshot',
                    count: funnel.intake,
                    pct: 100,
                    drop: '0%',
                    desc: 'User pastes URL or enters property attributes',
                  },
                  {
                    step: 'Stage 02: Snapshot Confirmation',
                    count: funnel.snapshot,
                    pct: Math.round((funnel.snapshot / funnel.intake) * 100),
                    drop: `${Math.max(0, 100 - Math.round((funnel.snapshot / funnel.intake) * 100))}%`,
                    desc: 'User confirms title, price, carpet area, and RERA ID',
                  },
                  {
                    step: 'Stage 03: Financial Picture & Funding Gap',
                    count: funnel.financial,
                    pct: Math.round((funnel.financial / funnel.intake) * 100),
                    drop: `${Math.max(0, Math.round((funnel.snapshot / funnel.intake) * 100) - Math.round((funnel.financial / funnel.intake) * 100))}%`,
                    desc: 'Aha Moment: Buyer inputs funds and sees actual funding gap',
                  },
                  {
                    step: 'Stage 04: Due Diligence Investigation',
                    count: funnel.investigation,
                    pct: Math.round((funnel.investigation / funnel.intake) * 100),
                    drop: `${Math.max(0, Math.round((funnel.financial / funnel.intake) * 100) - Math.round((funnel.investigation / funnel.intake) * 100))}%`,
                    desc: 'User works through stage-aware legal & structural checklist',
                  },
                  {
                    step: 'Stage 05: Decision Readiness & PDF Export',
                    count: funnel.dashboard,
                    pct: Math.round((funnel.dashboard / funnel.intake) * 100),
                    drop: `${Math.max(0, Math.round((funnel.investigation / funnel.intake) * 100) - Math.round((funnel.dashboard / funnel.intake) * 100))}%`,
                    desc: 'Core Value Moment: Downloadable, verified decision report',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5 p-4 rounded-xl bg-[#161616] border border-[#242424]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-semibold text-[#EDEDED]">{item.step}</span>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-[#5B8BDF]">{item.count} users ({item.pct}%)</span>
                        {idx > 0 && (
                          <span className="text-[#D94F4F] text-[11px]">Drop-off: {item.drop}</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full h-3 bg-[#0F0F0F] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5B8BDF] to-[#3F9E6C] rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(item.pct, 4)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#777777]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE TELEMETRY LOG */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#202020] pb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#EDEDED]">Live User Action Stream</h3>
                <p className="text-xs text-[#888888]">Real-time events recorded in Supabase telemetry</p>
              </div>
              <Button size="sm" variant="outline" onClick={loadData} className="text-xs">
                Refresh Log & Metrics
              </Button>
            </div>

            <div className="bg-[#121212] border border-[#242424] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181818] border-b border-[#252525] text-[#888888] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="p-3.5">Event Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Session ID</th>
                      <th className="p-3.5">Details</th>
                      <th className="p-3.5">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D1D1D] font-mono">
                    {events.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-[#666666] italic">
                          No events logged yet. Start a property evaluation to stream live events!
                        </td>
                      </tr>
                    ) : (
                      events.map((evt, idx) => (
                        <tr key={idx} className="hover:bg-[#161616] transition-colors">
                          <td className="p-3.5 font-semibold text-[#EDEDED]">{evt.eventName}</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              evt.category === 'conversion' ? 'bg-[#3F9E6C]/15 text-[#3F9E6C]'
                              : evt.category === 'funnel' ? 'bg-[#5B8BDF]/15 text-[#5B8BDF]'
                              : 'bg-[#D4A017]/15 text-[#D4A017]'
                            }`}>
                              {evt.category}
                            </span>
                          </td>
                          <td className="p-3.5 text-[#777777] max-w-[120px] truncate">{evt.sessionId}</td>
                          <td className="p-3.5 text-[#AAAAAA] max-w-xs truncate">
                            {JSON.stringify(evt.properties)}
                          </td>
                          <td className="p-3.5 text-[#666666] text-[11px]">
                            {evt.createdAt ? new Date(evt.createdAt).toLocaleTimeString('en-IN') : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PM RATIONALE & CASE STUDY */}
        {activeTab === 'pm_rationale' && (
          <div className="bg-[#121212] border border-[#252525] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#202020] pb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#5B8BDF]">
                Product Management Artifact
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                HomeCheck Product Rationale & Framework
              </h3>
              <p className="text-xs text-[#888888] mt-0.5">
                Prepared by the Candidate for Senior / Lead PM Role Evaluations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#CCCCCC] leading-relaxed">
              <div className="space-y-2 p-4 rounded-xl bg-[#161616] border border-[#222222]">
                <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
                  <TargetIcon className="w-4 h-4 text-[#5B8BDF]" />
                  1. Problem Statement & User Pain Point
                </h4>
                <p>
                  In the Indian real estate market, first-time home buyers make life-altering decisions (~₹68 Lakhs to ₹2 Crores) based on emotional broker pitches, incomplete portal listings, and unverified promises. Over 38% discover hidden transaction charges, missing Occupancy Certificates (OC), or undisclosed project mortgages only after paying non-refundable token deposits.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#161616] border border-[#222222]">
                <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#3F9E6C]" />
                  2. Product Hypothesis & Core Principle
                </h4>
                <p>
                  &ldquo;The product supports decisions; it does not make the decision.&rdquo; By decomposing complex legal documents into a deterministic 7-status evidence model, buyers can objectively uncover funding gaps and legal red flags before committing capital.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#161616] border border-[#222222]">
                <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#E6832A]" />
                  3. North Star & Counter-Metrics
                </h4>
                <p>
                  <strong>North Star Metric:</strong> Completed Decision-Ready Evaluations per Active User.
                  <br />
                  <strong>Guardrail Metric:</strong> Zero False Positive Verifications (No unverified property is ever marked 100% clean without authenticated documents).
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#161616] border border-[#222222]">
                <h4 className="font-semibold text-white flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-[#9B6FD6]" />
                  4. Key Technical & Design Trade-offs
                </h4>
                <p>
                  Instead of relying on ungrounded generative AI that could hallucinate legal compliance, we engineered a deterministic, property-type-aware rule engine (Apartment vs Plot vs Villa). AI is leveraged strictly for deterministic gap-based inquiry generation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#171717] border border-[#2B2B2B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#888888]">
                Ready to review the live consumer experience?
              </span>
              <Link href="/evaluation/eval_demo/dashboard">
                <Button size="sm">
                  <span>Open Demo Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
