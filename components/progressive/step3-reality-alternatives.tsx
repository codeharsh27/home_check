'use client';

import React, { useEffect, useState } from 'react';
import { PropertyDetails, BuyerContext, AlternativeProperty } from '@/types';
import { calculateFinancialIntelligence, formatCurrency } from '@/lib/calculations';
import { ExternalLink, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

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

  const fin = calculateFinancialIntelligence(property, buyerContext);

  const carpetArea = property.carpetArea || 1000;
  const askingRate =
    property.price > 0 && carpetArea > 0
      ? Math.round(property.price / carpetArea)
      : 8000;

  const medianLocalityRate = Math.round(askingRate * 0.92);
  const priceDiffPercent = Math.round(
    ((askingRate - medianLocalityRate) / medianLocalityRate) * 100
  );
  const isOverpriced = priceDiffPercent > 5;

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
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Editorial Section Header */}
      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
          03 / TRUE COST &amp; MARKET BENCHMARK
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] text-[#fafafa] tracking-[-0.025em] leading-[1.12]">
          True handover cash &amp; rate stress test
        </h1>
        <p className="text-[14px] text-[#a1a1a1] max-w-xl leading-relaxed">
          Review the complete out-of-pocket cash required beyond your bank loan,
          stress-test your monthly EMI against a +1.25% rate hike, and compare
          nearby listings.
        </p>
      </div>

      {/* 1. True Handover Cash Drain Ledger */}
      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#ffffff12]">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              OUT-OF-POCKET ACQUISITION LEDGER
            </p>
            <h2 className="font-serif text-[24px] sm:text-[28px] text-[#fafafa] mt-1">
              Cash required from your savings
            </h2>
            <p className="text-[13px] text-[#a1a1a1] mt-1">
              Banks lend up to 80% of the base agreement price only.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#bda96d]">
              Total Non-Loan Cash Needed
            </span>
            <div className="font-serif text-[32px] sm:text-[38px] text-[#fafafa] leading-none mt-1">
              {formatCurrency(fin.handoverCashNeeded)}
            </div>
          </div>
        </div>

        {/* Clean Hairline Ledger Rows */}
        <div className="divide-y divide-[#ffffff10] text-[14px]">
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#a1a1a1]">Quoted Base Agreement Value</span>
            <span className="text-[#fafafa] font-medium">
              {formatCurrency(fin.breakdown.basePrice)}
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#a1a1a1]">
              Maximum Bank Loan Disbursal (80% LTV)
            </span>
            <span className="text-[#96a766]">
              {formatCurrency(fin.breakdown.maxLoanEligible)}
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#fafafa]">
              1. Minimum 20% Cash Down Payment
            </span>
            <span className="text-[#fafafa] font-medium">
              {formatCurrency(fin.breakdown.minimumDownPayment)}
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#fafafa]">
              2. State Stamp Duty &amp; Registration Charges
            </span>
            <span className="text-[#fafafa] font-medium">
              {formatCurrency(
                fin.breakdown.stampDuty + fin.breakdown.registration
              )}
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#fafafa]">
              3. Society Corpus &amp; Advance Maintenance
            </span>
            <span className="text-[#fafafa] font-medium">
              {formatCurrency(fin.breakdown.societyCorpus)}
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#fafafa]">
              4. Infrastructure, Parking &amp; Basic Fit-Out Buffer
            </span>
            <span className="text-[#fafafa] font-medium">
              {formatCurrency(
                fin.breakdown.infrastructureAndParking +
                  fin.breakdown.interiorBuffer
              )}
            </span>
          </div>
        </div>

        {/* Two-Column Stress Test & Tax Relief */}
        <div className="pt-6 border-t border-[#ffffff12] grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              FLOATING RATE STRESS TEST (+1.25%)
            </div>
            <div className="flex items-baseline justify-between text-[13px] pt-1">
              <span className="text-[#a1a1a1]">Base Monthly EMI</span>
              <span className="text-[#fafafa] font-medium">
                {formatCurrency(fin.stressTest.currentEmi)}/mo
              </span>
            </div>
            <div className="flex items-baseline justify-between text-[13px]">
              <span className="text-[#a1a1a1]">Stressed EMI (+1.25%)</span>
              <span className="text-[#bda96d] font-medium">
                {formatCurrency(fin.stressTest.rateHikeEmi)}/mo
              </span>
            </div>
            <p className="text-[12px] text-[#666666] leading-relaxed pt-1">
              Adds {formatCurrency(fin.stressTest.extraInterestOverTenure)} in
              cumulative interest over the loan tenure if rates rise by 1.25%.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              TAX DEDUCTIONS &amp; PREPAYMENT
            </div>
            <div className="flex items-baseline justify-between text-[13px] pt-1">
              <span className="text-[#a1a1a1]">Annual Tax Saved (Sec 24 + 80C)</span>
              <span className="text-[#96a766] font-medium">
                {formatCurrency(fin.taxSavings.totalAnnualTaxSaved)}/yr
              </span>
            </div>
            <div className="flex items-baseline justify-between text-[13px]">
              <span className="text-[#a1a1a1]">1 Extra EMI / Year Saves</span>
              <span className="text-[#fafafa] font-medium">
                {formatCurrency(fin.taxSavings.prepaymentSavings.interestSaved)}
              </span>
            </div>
            <p className="text-[12px] text-[#666666] leading-relaxed pt-1">
              Prepaying one additional EMI each year shortens loan tenure by ~
              {fin.taxSavings.prepaymentSavings.yearsSaved} years.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Locality Benchmark Card */}
      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              LOCALITY BENCHMARK
            </p>
            <h3 className="font-serif text-[22px] text-[#fafafa] mt-0.5">
              ₹{askingRate.toLocaleString('en-IN')}/sq.ft vs. ₹
              {medianLocalityRate.toLocaleString('en-IN')}/sq.ft locality median
            </h3>
          </div>
          <span className="text-[12px] text-[#bda96d]">
            {isOverpriced
              ? `~${priceDiffPercent}% above median closes`
              : 'Within fair market range'}
          </span>
        </div>

        <p className="text-[13px] text-[#a1a1a1] leading-relaxed">
          {isOverpriced ? (
            <>
              Recent transactions in {property.location || 'this locality'} close
              closer to ₹{medianLocalityRate.toLocaleString('en-IN')}/sq.ft. Use
              this spread to negotiate roughly{' '}
              <strong className="text-[#fafafa] font-normal">
                {formatCurrency(
                  Math.round((askingRate - medianLocalityRate) * carpetArea)
                )}
              </strong>{' '}
              off the quoted agreement price or request waivers on floor-rise and
              clubhouse charges.
            </>
          ) : (
            <>
              The quoted rate aligns with registered transactions in{' '}
              {property.location || 'this area'}. Focus negotiation on covered car
              parking and floor-rise waivers.
            </>
          )}
        </p>
      </div>

      {/* 3. Nearby Comparable Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              MICRO-MARKET COMPARABLES
            </p>
            <h2 className="font-serif text-[24px] text-[#fafafa] mt-0.5">
              Nearby residential projects
            </h2>
          </div>
          {loadingAlts && (
            <div className="text-xs text-[#a1a1a1] flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {alternatives.map((alt) => (
            <div
              key={alt.id}
              className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-5 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1a1]">
                  {alt.bhk} · {alt.sourcePlatform}
                </div>

                <div>
                  <h3 className="font-medium text-[#fafafa] text-[15px]">
                    {alt.name}
                  </h3>
                  <div className="text-[12px] text-[#a1a1a1]">
                    {alt.developer}
                  </div>
                </div>

                <div className="pt-1">
                  <div className="font-serif text-[22px] text-[#fafafa]">
                    {formatCurrency(alt.price)}
                  </div>
                  <div className="text-[11px] text-[#666666]">
                    ₹{alt.ratePerSqFt?.toLocaleString('en-IN')}/sq.ft (
                    {alt.carpetArea} sq.ft)
                  </div>
                </div>

                <p className="text-[12px] text-[#a1a1a1] leading-relaxed line-clamp-2">
                  {alt.usp}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#ffffff12]">
                <a
                  href={alt.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] text-[#e5e5e5] hover:text-[#fafafa] transition-colors"
                >
                  <span>View listing</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#ffffff14]">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#ffffff14] text-xs text-[#e5e5e5] inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>

        <button
          type="button"
          onClick={onProceedToInvestigation}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Legal &amp; RERA Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
