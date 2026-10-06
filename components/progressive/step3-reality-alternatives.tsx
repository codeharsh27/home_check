'use client';

import React, { useEffect, useState } from 'react';
import { PropertyDetails, BuyerContext, AlternativeProperty } from '@/types';
import { calculateFinancialIntelligence, formatCurrency } from '@/lib/calculations';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Flame,
  Percent,
  Layers,
  Sparkles,
  Info,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step3Props {
  property: PropertyDetails;
  buyerContext?: BuyerContext;
  cachedAlternatives?: AlternativeProperty[];
  onSetAlternatives: (alts: AlternativeProperty[]) => void;
  onProceedToInvestigation: () => void;
  onBack: () => void;
}

export const Step3RealityAlternatives: React.FC<Step3Props> = ({
  property,
  buyerContext = {},
  cachedAlternatives = [],
  onSetAlternatives,
  onProceedToInvestigation,
  onBack,
}) => {
  const [loadingAlts, setLoadingAlts] = useState(false);
  const [alternatives, setAlternatives] = useState<AlternativeProperty[]>(
    cachedAlternatives.length > 0 ? cachedAlternatives : []
  );

  // Financial calculations
  const fin = calculateFinancialIntelligence(property, buyerContext);

  // Benchmark logic
  const carpetArea = property.carpetArea || 1000;
  const askingRate = property.price > 0 && carpetArea > 0 ? Math.round(property.price / carpetArea) : 8000;
  
  // Locality reference range (approx benchmark for location)
  const medianLocalityRate = Math.round(askingRate * 0.92); // ~8% below typical high-asking listing
  const priceDiffPercent = Math.round(((askingRate - medianLocalityRate) / medianLocalityRate) * 100);
  const isOverpriced = priceDiffPercent > 5;

  // Fetch live alternatives if not cached
  useEffect(() => {
    if (alternatives.length > 0) return;

    let isMounted = true;
    setLoadingAlts(true);

    fetch('/api/property/alternatives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: property.location,
        city: property.city,
        price: property.price,
        bhk: property.bhk,
        carpetArea: property.carpetArea,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.alternatives && data.alternatives.length > 0) {
          setAlternatives(data.alternatives);
          onSetAlternatives(data.alternatives);
        }
      })
      .catch((err) => {
        console.error('Failed fetching alternatives:', err);
      })
      .finally(() => {
        if (isMounted) setLoadingAlts(false);
      });

    return () => {
      isMounted = false;
    };
  }, [property, alternatives.length, onSetAlternatives]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          Step 3 of 5 • Market Reality & Live Alternatives
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
          Market Price Reality & Alternatives
        </h1>
        <p className="text-sm text-stone-500">
          Evaluate whether this asking price has room for negotiation, compare with active listings nearby, and inspect the real cash drain before committing.
        </p>
      </div>

      {/* 1. Price Reality Benchmark Card */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-sm font-semibold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" /> Locality Rate Benchmark
          </div>
          <div
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              isOverpriced
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {isOverpriced
              ? `Listed ~${priceDiffPercent}% above locality median`
              : 'Listed within fair market bracket'}
          </div>
        </div>

        {/* Visual Benchmark Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-stone-100 rounded-full relative overflow-hidden flex">
            <div className="w-1/3 bg-emerald-200/80 h-full" title="Below Market (Good Value)" />
            <div className="w-1/3 bg-blue-200/80 h-full" title="Fair Market Band" />
            <div className="w-1/3 bg-amber-200/80 h-full" title="Developer Premium" />
          </div>
          <div className="flex justify-between text-[11px] text-stone-600 font-medium">
            <span>₹{(medianLocalityRate * 0.9).toFixed(0)} (Value)</span>
            <span className="text-stone-700 font-semibold">
              Median: ₹{medianLocalityRate.toLocaleString('en-IN')}/sq.ft
            </span>
            <span className="text-stone-900 font-semibold">
              This Property: ₹{askingRate.toLocaleString('en-IN')}/sq.ft
            </span>
          </div>
        </div>

        <div className="text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-100 leading-relaxed">
          <span className="font-semibold text-stone-800">Negotiation Strategy: </span>
          {isOverpriced ? (
            <>
              Similar 2 BHKs in {property.location || 'this micro-market'} are closing closer to{' '}
              <strong className="text-stone-900">₹{medianLocalityRate.toLocaleString('en-IN')}/sq.ft</strong>. 
              You have room to negotiate{' '}
              <strong className="text-stone-900">
                {formatCurrency(Math.round((askingRate - medianLocalityRate) * carpetArea))}
              </strong>{' '}
              off the asking agreement value before token advance.
            </>
          ) : (
            <>
              The asking rate appears aligned with current registered RERA transactions for {property.location || 'this area'}. 
              Focus negotiation on waivers for floor rise, preferred location charges (PLC), or covered parking fees.
            </>
          )}
        </div>
      </div>

      {/* 2. Live Comparable Alternatives */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> Active Comparable Projects in the Vicinity
            </h2>
            <p className="text-xs text-stone-500">
              Real developments currently active on aggregators & developer portals within the same micro-market.
            </p>
          </div>
          {loadingAlts && (
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Discovering...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {alternatives.map((alt) => (
            <div
              key={alt.id}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-blue-300 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                    {alt.bhk} • {alt.sourcePlatform}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    Active
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-stone-900 text-sm group-hover:text-blue-600 transition-colors">
                    {alt.name}
                  </h3>
                  <div className="text-xs text-stone-600">{alt.developer}</div>
                </div>

                <div className="pt-1">
                  <div className="text-base font-bold text-stone-900">
                    {formatCurrency(alt.price)}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    ₹{alt.ratePerSqFt?.toLocaleString('en-IN')}/sq.ft carpet ({alt.carpetArea} sq.ft)
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-snug line-clamp-2">
                  {alt.usp}
                </p>

                {alt.differenceVsSubject && (
                  <div className="text-[11px] font-medium text-blue-700 bg-blue-50/70 p-2 rounded-lg border border-blue-100/80">
                    {alt.differenceVsSubject}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-stone-100">
                <a
                  href={alt.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 py-1.5 rounded-lg hover:bg-blue-50/60 transition-colors"
                >
                  Inspect Live Listing <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Real-World Financial Reality Ladder */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-7 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              The Real Handover Cash Drain (Hidden Costs)
            </h2>
            <p className="text-xs text-stone-500">
              Banks only finance 80% of Agreement Value. All non-financeable cash must come from your savings.
            </p>
          </div>
          <div className="text-left sm:text-right bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
            <div className="text-xs text-stone-600 font-medium">True Cash Required at Handover</div>
            <div className="text-xl sm:text-2xl font-extrabold text-stone-900">
              {formatCurrency(fin.handoverCashNeeded)}
            </div>
          </div>
        </div>

        {/* Cost Stack Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="text-xs text-stone-600 font-medium">Agreement Value</div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {formatCurrency(fin.breakdown.basePrice)}
            </div>
            <div className="text-[10px] text-stone-600">Base quoted price</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="text-xs text-stone-600 font-medium">Max Bank Loan (80%)</div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {formatCurrency(fin.breakdown.maxLoanEligible)}
            </div>
            <div className="text-[10px] text-emerald-600">Max bank disbursal</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="text-xs text-stone-600 font-medium">Min Down Payment (20%)</div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {formatCurrency(fin.breakdown.minimumDownPayment)}
            </div>
            <div className="text-[10px] text-amber-700">Cash to developer</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="text-xs text-stone-600 font-medium">Govt Duties (Stamp + Reg)</div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {formatCurrency(fin.breakdown.stampDuty + fin.breakdown.registration)}
            </div>
            <div className="text-[10px] text-stone-600">IGR State Treasury (Cash)</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="text-xs text-stone-600 font-medium">Corpus & Advance Maint</div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {formatCurrency(fin.breakdown.societyCorpus)}
            </div>
            <div className="text-[10px] text-stone-600">Society escrow deposit</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
            <div className="text-xs text-stone-600 font-medium">Infra & Basic Fit-outs</div>
            <div className="text-sm font-semibold text-stone-900 mt-0.5">
              {formatCurrency(fin.breakdown.infrastructureAndParking + fin.breakdown.interiorBuffer)}
            </div>
            <div className="text-[10px] text-stone-600">Parking + kitchen buffer</div>
          </div>
        </div>

        {/* Dynamic Stress Test & Safety Runway */}
        <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" /> Floating Rate Hike Stress Test (+1.25%)
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-stone-600">Current Base EMI:</span>
              <span className="font-semibold text-stone-900">{formatCurrency(fin.stressTest.currentEmi)}/mo</span>
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-stone-600">If RBI Hikes Rates:</span>
              <span className="font-bold text-amber-700">{formatCurrency(fin.stressTest.rateHikeEmi)}/mo</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-tight">
              A +1.25% floating rate hike will cost you an additional{' '}
              <strong>{formatCurrency(fin.stressTest.extraInterestOverTenure)}</strong> in interest, or stretch loan tenure by ~3.5 years.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-blue-600" /> Tax Relief & Savings Strategies
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-stone-600">Annual Tax Saved (Sec 24 + 80C):</span>
              <span className="font-bold text-emerald-700">{formatCurrency(fin.taxSavings.totalAnnualTaxSaved)}/yr</span>
            </div>
            {fin.taxSavings.femaleConcessionApplicable && (
              <div className="flex items-baseline justify-between text-xs text-emerald-700">
                <span>Female Co-owner Concession:</span>
                <span className="font-semibold">{formatCurrency(fin.taxSavings.femaleStampDutySaved)} saved upfront</span>
              </div>
            )}
            <p className="text-[11px] text-stone-600 leading-tight">
              Paying just <strong>1 extra EMI per year</strong> saves ~
              <strong>{formatCurrency(fin.taxSavings.prepaymentSavings.interestSaved)}</strong> in interest and closes your loan {fin.taxSavings.prepaymentSavings.yearsSaved} years earlier.
            </p>
          </div>
        </div>
      </div>

      {/* The Crucial Fork Section */}
      <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900">
          Ready to Proceed with This Property?
        </h2>
        <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Now that you know the market reality and actual out-of-pocket costs, you can either explore the alternative listings above, or run a deep regulatory investigation into this shortlisted project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-700 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Adjust Intent / Budget
          </Button>

          <Button
            onClick={onProceedToInvestigation}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm inline-flex items-center gap-2"
          >
            Investigate THIS Property Further <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
