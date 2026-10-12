'use client';

import React from 'react';
import { Landmark, Shield, FileText, CheckCircle2, Scale, Building2 } from 'lucide-react';

const sources = [
  { name: 'MahaRERA Registry', state: 'Maharashtra', icon: Shield },
  { name: 'Kaveri 2.0 Land Records', state: 'Karnataka', icon: FileText },
  { name: 'IGR Sub-Registrar', state: 'Closes & EC', icon: Landmark },
  { name: 'BBMP & PMC Municipal CC', state: 'Floor Approvals', icon: Building2 },
  { name: 'DTCP Town Planning', state: 'Haryana / NCR', icon: Scale },
  { name: 'Lender Mortgage Registry', state: 'CERSAI Search', icon: CheckCircle2 },
];

export const LogoTickerSection: React.FC = () => {
  return (
    <section className="py-12 bg-[#08090B] border-y border-white/[0.05] overflow-hidden relative">
      {/* Edge linear fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#08090B] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#08090B] to-transparent z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-6 text-center">
        <p className="text-[11px] font-mono uppercase tracking-[2.5px] text-stone-500">
          CROSS-REFERENCING OFFICIAL PUBLIC REGISTRIES &amp; STATUTORY DATABASES
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap max-w-5xl mx-auto px-4 opacity-75">
        {sources.map((src, i) => {
          const Icon = src.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-blue-400" />
              <div className="text-left font-mono">
                <span className="text-xs font-semibold text-stone-300 block leading-tight">{src.name}</span>
                <span className="text-[9px] text-stone-500 block">{src.state}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
