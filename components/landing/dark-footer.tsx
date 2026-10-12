'use client';

import React from 'react';
import Link from 'next/link';

export const DarkFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#08090B] border-t border-white/[0.06] py-16 text-stone-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3 font-sans">
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold tracking-tight text-white font-serif">
                HomeCheck<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Institutional property underwriting, possession liquidity analysis, and stage-gated legal diligence for Indian home buyers.
            </p>
          </div>

          {/* Column 1: PLATFORM */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">PLATFORM</p>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Core Engines</a></li>
              <li><a href="#sample-evaluation" className="hover:text-white transition-colors">Decision Dossier</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Matrix</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Diligence FAQ</a></li>
            </ul>
          </div>

          {/* Column 2: ENGINES */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">ENGINES</p>
            <ul className="space-y-2 text-stone-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Cash Drain Calculator</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Yr Encumbrance Audit</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Municipal CC Floor Verifier</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Rate Hike Stress Test</span></li>
            </ul>
          </div>

          {/* Column 3: LOCATIONS */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider">COVERAGE</p>
            <ul className="space-y-2 text-stone-400">
              <li><span className="text-stone-300">Bengaluru (KA)</span></li>
              <li><span className="text-stone-300">Pune & Mumbai (MH)</span></li>
              <li><span className="text-stone-300">Gurgaon & NCR (HR/DL)</span></li>
              <li><span className="text-stone-300">Hyderabad (TS)</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-xs">
          <p>© 2026 HomeCheck India · Zero Developer Affiliation</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Protocol</span>
            <span>·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Underwriting</span>
            <span>·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Independent Legal Disclaimer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
