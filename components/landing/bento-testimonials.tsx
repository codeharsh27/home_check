'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, Quote, ArrowUpRight, TrendingDown, Building, MapPin } from 'lucide-react';

export const BentoTestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#08090B] relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-300">
              REAL BUYER ADVOCACY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white leading-[1.12]">
            Hear from buyers who refused to commit blindly.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
            Real home buyers across Bengaluru, Pune, Mumbai, and NCR who protected their token cheques, negotiated lower rates, and entered sales meetings prepared.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Bento Card 1: Wide Featured Case Study (Whitefield, Bengaluru) - Col 8 */}
          <div className="md:col-span-7 rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-stone-400">CASE STUDY // BENGALURU</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  SAVED ₹8.2 LAKHS
                </span>
              </div>

              <blockquote className="text-lg sm:text-xl font-serif text-white leading-relaxed">
                &ldquo;The builder quoted ₹9,400/sq.ft claiming Whitefield prices were rising weekly. HomeCheck’s micro-market engine revealed the locality registered median was ₹8,650/sq.ft across 3 nearby projects. We negotiated ₹8.2 Lakhs off the agreement value.&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-semibold text-white">Rohit & Priya Nair</p>
                <p className="text-xs font-mono text-stone-500">Purchased 3 BHK · Whitefield, Bengaluru</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-stone-400">
                <Quote className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Legal Flaw Uncovered (Pune) - Col 5 */}
          <div className="md:col-span-5 rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">LEGAL SHIELD // PUNE</span>
                <span className="text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
                  TOKEN PROTECTED
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-serif text-white leading-relaxed">
                &ldquo;The sales rep pushed me to write a ₹1 Lakh token cheque. HomeCheck’s Stage 1 checklist warned me to check the municipal CC floor sanction first. Turns out the CC was only approved up to the 11th floor, and my unit was on the 15th.&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-white/[0.06] mt-6">
              <p className="text-sm font-semibold text-white">Aditya Sengupta</p>
              <p className="text-xs font-mono text-stone-500">Engineering Lead · Hinjawadi, Pune</p>
            </div>
          </div>

          {/* Bento Card 3: Handover Cash Drain Reality Check - Col 5 */}
          <div className="md:col-span-5 rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-xs font-mono text-amber-400">FINANCIAL GAP // MUMBAI MMR</span>
              
              <blockquote className="text-base sm:text-lg font-serif text-white leading-relaxed">
                &ldquo;We thought our ₹22L savings plus an 80% loan was plenty for a ₹1.1 Cr apartment. HomeCheck’s ladder showed ₹19.5L would be consumed by non-loan items at possession. We avoided a catastrophic liquidity crunch.&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-white/[0.06] mt-6">
              <p className="text-sm font-semibold text-white">Kavita Deshmukh</p>
              <p className="text-xs font-mono text-stone-500">Thane West, Mumbai</p>
            </div>
          </div>

          {/* Bento Card 4: Advocate Briefing Package - Col 7 */}
          <div className="md:col-span-7 rounded-3xl bg-gradient-to-b from-[#14161C] to-[#0D0E12] border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">DECISION DOSSIER // GURGAON</span>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                  ADVOCATE READY
                </span>
              </div>

              <blockquote className="text-base sm:text-lg font-serif text-white leading-relaxed">
                &ldquo;Instead of walking into my lawyer’s office with a disorganized 50-page brochure, I handed him the HomeCheck Executive Decision Dossier with the 12 pre-drafted advocate scrutiny questions. He said it was the cleanest client briefing he had ever received.&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Vikramaditya Rao</p>
                <p className="text-xs font-mono text-stone-500">VP Marketing · Golf Course Ext Road, Gurgaon</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
