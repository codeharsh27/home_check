'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { ArrowRight, Calculator, ShieldCheck } from 'lucide-react';

export const FeatureToolsSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [propertyPrice, setPropertyPrice] = useState(6800000); // 68 Lakhs
  const [personalSavings, setPersonalSavings] = useState(1400000); // 14 Lakhs

  // Real calculations mirroring lib/calculations.ts
  const stampDutyRate = 0.07; // 7% Stamp Duty + Registration
  const stampDuty = propertyPrice * stampDutyRate;
  const totalAcquisitionCost = propertyPrice + stampDuty;
  const maxBankLoan = propertyPrice * 0.80; // 80% RBI LTV limit
  const minimumDownPayment = propertyPrice * 0.20;
  const totalCashRequired = minimumDownPayment + stampDuty;
  const cashShortfall = Math.max(0, totalCashRequired - personalSavings);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExplore = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="smart-tools" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading + Copy + Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              <Calculator className="w-3.5 h-3.5" />
              <span>THE FINANCIAL REALITY CHECK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Know Your Real Out-of-Pocket Cost Before Paying a Token
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Banks only fund up to 80% of the base property price. Stamp duty and registration (approx. 7%) cannot be funded by home loans under RBI rules — they must come directly from your bank account in cash.
            </p>

            <p className="text-sm text-stone-500 leading-relaxed">
              HomeCheck pools your personal savings, family contributions, and company loans against the full cost of acquisition so you know your exact down payment shortfall before committing booking money.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 cursor-pointer"
              >
                <span>Calculate Your Exact Shortfall</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Math Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-xl shadow-stone-200/40 space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-sm font-bold text-stone-800 tracking-tight">Out-of-Pocket Gap Simulation</span>
                  <p className="text-xs text-stone-500">Based on RBI 80% LTV &amp; 7% Stamp Duty rules</p>
                </div>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Live Formula
                </span>
              </div>

              {/* Sliders for Property Price & Savings */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1.5">
                    <span>Quoted Property Price</span>
                    <span className="text-stone-900 font-bold">{formatINR(propertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={3000000}
                    max={20000000}
                    step={200000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1.5">
                    <span>Your Ready Savings</span>
                    <span className="text-stone-900 font-bold">{formatINR(personalSavings)}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={6000000}
                    step={100000}
                    value={personalSavings}
                    onChange={(e) => setPersonalSavings(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              {/* Calculation Summary Table */}
              <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200/70 space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Base Property Value:</span>
                  <span className="font-semibold text-stone-900">{formatINR(propertyPrice)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Stamp Duty &amp; Reg (7% un-fundable):</span>
                  <span className="font-semibold text-stone-900">{formatINR(stampDuty)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Max Bank Loan Possible (80% LTV):</span>
                  <span className="font-semibold text-blue-600">{formatINR(maxBankLoan)}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                  <span>Total Cash You Must Bring:</span>
                  <span>{formatINR(totalCashRequired)}</span>
                </div>
              </div>

              {/* Verdict Box */}
              <div className={`p-4 rounded-2xl border ${
                cashShortfall > 0 
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${cashShortfall > 0 ? 'text-amber-600' : 'text-emerald-600'}`} />
                  <div>
                    <span className="text-xs font-bold block">
                      {cashShortfall > 0 ? `Funding Shortfall: ${formatINR(cashShortfall)}` : 'Fully Funded By Your Savings!'}
                    </span>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                      {cashShortfall > 0 
                        ? 'You need this extra cash before registration. HomeCheck lets you map family funds or company loans to bridge it.'
                        : 'Your ready savings comfortably cover both the 20% down payment and un-fundable 7% government stamp duty.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleExplore}
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer text-center block"
              >
                Run Full Financial Check On Your Property →
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
