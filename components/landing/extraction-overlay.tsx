'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader2, ShieldCheck, Database, Building2, CheckCircle2, Globe2 } from 'lucide-react';

interface ExtractionOverlayProps {
  isOpen: boolean;
  url: string;
}

const EXTRACTION_STEPS = [
  {
    title: 'Connecting to listing host',
    desc: 'Resolving endpoint & bypassing anti-bot headers...',
    icon: Globe2,
  },
  {
    title: 'Extracting property attributes',
    desc: 'Parsing quoted price, RERA carpet area, BHK & builder credentials...',
    icon: Building2,
  },
  {
    title: 'Auditing micro-market registry',
    desc: 'Matching locality with state RERA and municipal registry data...',
    icon: Database,
  },
  {
    title: 'Synthesizing evaluation baseline',
    desc: 'Calibrating financial estimates & verification roadmap...',
    icon: ShieldCheck,
  },
];

export const ExtractionOverlay: React.FC<ExtractionOverlayProps> = ({ isOpen, url }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setProgressPercent(15);
      return;
    }

    const t1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setProgressPercent(45);
    }, 800);

    const t2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setProgressPercent(75);
    }, 1800);

    const t3 = setTimeout(() => {
      setCurrentStepIndex(3);
      setProgressPercent(92);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  let portalBrand = 'Property Listing';
  let cleanDomain = 'online portal';
  try {
    if (url.startsWith('http')) {
      const u = new URL(url);
      cleanDomain = u.hostname.replace('www.', '');
      const brand = cleanDomain.split('.')[0];
      portalBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    }
  } catch {}

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl max-w-md w-full p-6 sm:p-7 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header with active radar pill */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Scanning {portalBrand}</span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight text-stone-900">
            Extracting Property Intelligence
          </h3>
          <p className="text-xs text-stone-500 font-mono truncate px-4">
            {cleanDomain}
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-stone-600">
            <span>Extraction Pipeline</span>
            <span className="font-mono text-blue-600">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/60">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Micro-Steps List */}
        <div className="space-y-3 bg-stone-50/80 p-4 rounded-2xl border border-stone-100">
          {EXTRACTION_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const Icon = step.icon;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 text-xs transition-all duration-300 ${
                  idx > currentStepIndex ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center">
                      <Icon className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div
                    className={`font-semibold ${
                      isCurrent
                        ? 'text-stone-900'
                        : isDone
                        ? 'text-stone-700'
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

        {/* Footer Subtext */}
        <div className="text-center pt-1 border-t border-stone-100">
          <span className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Encrypted extraction • Ready for intake review
          </span>
        </div>
      </div>
    </div>
  );
};
