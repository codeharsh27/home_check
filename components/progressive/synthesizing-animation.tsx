'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, TrendingUp, Cpu, ShieldCheck, CheckCircle2, Calculator, Layers, Sparkles } from 'lucide-react';
import { PropertyDetails, BuyerContext } from '@/types';

interface SynthesizingAnimationProps {
  locality: string;
  property?: PropertyDetails;
  buyerContext?: BuyerContext;
  onComplete: () => void;
}

const AUDIT_STEPS = [
  {
    title: 'Micro-Market Rate Benchmarking',
    desc: 'Comparing asking ₹/sq.ft against recent verified transaction closes in this locality...',
    icon: TrendingUp,
  },
  {
    title: 'Hyper-Local Comparables Discovery',
    desc: 'Scanning active residential developments strictly within 2-4 km radius...',
    icon: Layers,
  },
  {
    title: 'Floating Rate Stress Test',
    desc: 'Simulating +1.25% RBI repo rate spike, tenure stretch & 5-year maintenance inflation...',
    icon: Calculator,
  },
  {
    title: 'Handover Cash Drain Calibration',
    desc: 'Itemizing non-loan cash requirements (Stamp Duty, Registration, Society Corpus & Interiors)...',
    icon: ShieldCheck,
  },
  {
    title: 'Tax & Concession Optimization',
    desc: 'Computing annual deductions under Sec 24(b), 80C & 1% female co-ownership savings...',
    icon: Sparkles,
  },
];

export const SynthesizingAnimation: React.FC<SynthesizingAnimationProps> = ({
  locality,
  property,
  buyerContext,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);

  useEffect(() => {
    const stepDuration = 650;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < AUDIT_STEPS.length - 1) {
          const next = prev + 1;
          setProgressPercent(Math.min(96, Math.round(((next + 1) / AUDIT_STEPS.length) * 100)));
          return next;
        } else {
          clearInterval(interval);
          setProgressPercent(100);
          setTimeout(onComplete, 400);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const targetName = property?.name || 'Target Property';
  const displayLocality = locality || property?.location || 'Target Micro-Market';

  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Icon & Header */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center mx-auto text-blue-600 shadow-sm relative">
          <Cpu className="w-7 h-7 text-blue-600 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-600 animate-ping" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            <span>Institutional Underwriting Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-stone-900">
            Synthesizing Decision Intelligence
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Auditing micro-market data for <strong className="text-stone-800">{targetName}</strong> in <strong className="text-stone-800">{displayLocality}</strong> against your financing capacity.
          </p>
        </div>
      </div>

      {/* Progress Meter */}
      <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
        <div className="flex justify-between text-[11px] font-semibold text-stone-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Analyzing Micro-Market & Outflow Models
          </span>
          <span className="font-mono text-blue-600">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/60">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Detailed Steps List */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5 text-left">
        {AUDIT_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3.5 text-xs transition-all duration-300 ${
                idx > currentStepIndex ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center border border-stone-200">
                    <Icon className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <div
                  className={`font-semibold ${
                    isCurrent
                      ? 'text-stone-900 font-bold'
                      : isDone
                      ? 'text-stone-800'
                      : 'text-stone-400'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-[11px] text-stone-500 leading-tight">
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <span className="text-[11px] text-stone-400 font-medium">
          Calibrating live comparables & stress-testing repayment runway...
        </span>
      </div>
    </div>
  );
};
