'use client';

import React, { useState } from 'react';
import { BuyerContext, PropertyDetails } from '@/types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Step2Props {
  property: PropertyDetails;
  buyerContext?: BuyerContext;
  onUpdateContext: (context: Partial<BuyerContext>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2IntentFinance: React.FC<Step2Props> = ({
  buyerContext = {},
  onUpdateContext,
  onNext,
  onBack,
}) => {
  const [purpose, setPurpose] = useState<BuyerContext['purpose']>(
    buyerContext.purpose || 'Personal'
  );
  const [availableFunds, setAvailableFunds] = useState<string>(
    buyerContext.availableFunds
      ? String(buyerContext.availableFunds)
      : '2000000'
  );
  const [monthlyIncome, setMonthlyIncome] = useState<string>(
    buyerContext.monthlyIncome ? String(buyerContext.monthlyIncome) : '160000'
  );
  const [existingObligations, setExistingObligations] = useState<string>(
    buyerContext.existingObligations
      ? String(buyerContext.existingObligations)
      : '15000'
  );
  const [hasJointApplicant, setHasJointApplicant] = useState<boolean>(
    buyerContext.hasJointApplicant || false
  );
  const [femaleCoOwner, setFemaleCoOwner] = useState<boolean>(
    buyerContext.femaleCoOwner || false
  );
  const [tenureYears, setTenureYears] = useState<number>(
    buyerContext.tenureYears || 20
  );

  const [homeLoanAmount, setHomeLoanAmount] = useState<string>(
    buyerContext.plannedLoanAmount ? String(buyerContext.plannedLoanAmount) : ''
  );
  const [familyFundsAmount, setFamilyFundsAmount] = useState<string>(
    buyerContext.familyFundsAmount ? String(buyerContext.familyFundsAmount) : ''
  );
  const [companyLoanAmount, setCompanyLoanAmount] = useState<string>(
    buyerContext.companyLoanAmount ? String(buyerContext.companyLoanAmount) : ''
  );

  const handleContinue = () => {
    const loanNum = parseFloat(homeLoanAmount) || 0;
    const familyNum = parseFloat(familyFundsAmount) || 0;
    const companyNum = parseFloat(companyLoanAmount) || 0;

    const sources: import('@/types').FinancingSource[] = ['Personal funds'];
    if (loanNum > 0 || !homeLoanAmount) sources.push('Home loan');
    if (familyNum > 0) sources.push('Family funds');
    if (companyNum > 0) sources.push('Company loan');

    onUpdateContext({
      purpose,
      availableFunds: parseFloat(availableFunds) || 0,
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      existingObligations: parseFloat(existingObligations) || 0,
      hasJointApplicant,
      femaleCoOwner,
      tenureYears,
      plannedLoanAmount: loanNum > 0 ? loanNum : undefined,
      familyFundsAmount: familyNum > 0 ? familyNum : undefined,
      companyLoanAmount: companyNum > 0 ? companyNum : undefined,
      expectedFinancing: sources,
    });
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Editorial Section Header */}
      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
          02 / INTENT &amp; FINANCIAL CAPACITY
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] text-[#fafafa] tracking-[-0.025em] leading-[1.12]">
          Define your budget &amp; loan parameters
        </h1>
        <p className="text-[14px] text-[#a1a1a1] max-w-xl leading-relaxed">
          Banks cap home loans at 80% of the base agreement value. Your liquid
          savings must cover the 20% down payment plus non-loanable stamp duty,
          registration, and society corpus charges.
        </p>
      </div>

      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Section 1: Purchase Motive */}
        <div className="space-y-3">
          <label className="text-[12px] font-mono uppercase tracking-wider text-[#a1a1a1] block">
            Purchase Motive
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                key: 'Personal' as const,
                title: 'Self-Use Residence',
                desc: 'Focuses on possession timeline, livability, and monthly cashflow comfort.',
              },
              {
                key: 'Investment' as const,
                title: 'Rental / Investment',
                desc: 'Focuses on rental yield, entry price vs. locality median, and holding cost.',
              },
              {
                key: 'Business' as const,
                title: 'Commercial / Studio',
                desc: 'Focuses on commercial zoning permissions, signage, and utility load.',
              },
            ].map((item) => {
              const active =
                purpose === item.key ||
                (item.key === 'Personal' && purpose === 'Primary residence');
              return (
                <div
                  key={item.key}
                  onClick={() => setPurpose(item.key)}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                    active
                      ? 'border-[#fafafa] bg-[#1c1c1c]'
                      : 'border-[#ffffff14] bg-[#0a0a0a] hover:border-[#ffffff28]'
                  }`}
                >
                  <div className="font-medium text-[#fafafa] text-[14px]">
                    {item.title}
                  </div>
                  <p className="text-[12px] text-[#a1a1a1] mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Financial Realities */}
        <div className="space-y-5 pt-6 border-t border-[#ffffff12]">
          <label className="text-[12px] font-mono uppercase tracking-wider text-[#a1a1a1] block">
            Capital &amp; Monthly Income
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[13px] text-[#e5e5e5] block mb-1.5">
                Liquid savings available for upfront costs (₹)
              </label>
              <input
                type="number"
                value={availableFunds}
                onChange={(e) => setAvailableFunds(e.target.value)}
                placeholder="e.g. 2000000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
              <p className="text-[11px] text-[#666666] mt-1">
                Covers 20% down payment + stamp duty + registration
              </p>
            </div>

            <div>
              <label className="text-[13px] text-[#e5e5e5] block mb-1.5">
                Monthly net household income (₹)
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="e.g. 160000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
              <p className="text-[11px] text-[#666666] mt-1">
                Post-tax monthly take-home pay
              </p>
            </div>

            <div>
              <label className="text-[13px] text-[#e5e5e5] block mb-1.5">
                Existing monthly EMIs (₹)
              </label>
              <input
                type="number"
                value={existingObligations}
                onChange={(e) => setExistingObligations(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>

            <div>
              <label className="text-[13px] text-[#e5e5e5] block mb-1.5">
                Loan tenure
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 20, 25].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setTenureYears(yrs)}
                    className={`py-2.5 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                      tenureYears === yrs
                        ? 'bg-[#fafafa] border-[#fafafa] text-[#0a0a0a]'
                        : 'bg-[#0a0a0a] border-[#ffffff14] text-[#a1a1a1] hover:text-[#fafafa]'
                    }`}
                  >
                    {yrs} yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Funding Allocation */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="text-[12px] text-[#a1a1a1] block mb-1.5">
                Planned Home Loan (₹)
              </label>
              <input
                type="number"
                value={homeLoanAmount}
                onChange={(e) => setHomeLoanAmount(e.target.value)}
                placeholder="Auto (80% LTV)"
                className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-xs text-[#fafafa] placeholder:text-[#666666] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] text-[#a1a1a1] block mb-1.5">
                Family Support / Gift (₹)
              </label>
              <input
                type="number"
                value={familyFundsAmount}
                onChange={(e) => setFamilyFundsAmount(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-xs text-[#fafafa] placeholder:text-[#666666] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[12px] text-[#a1a1a1] block mb-1.5">
                Employer / Soft Loan (₹)
              </label>
              <input
                type="number"
                value={companyLoanAmount}
                onChange={(e) => setCompanyLoanAmount(e.target.value)}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-xs text-[#fafafa] placeholder:text-[#666666] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Co-Ownership & Concessions */}
        <div className="pt-6 border-t border-[#ffffff12] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] cursor-pointer hover:border-[#ffffff28]">
            <input
              type="checkbox"
              checked={femaleCoOwner}
              onChange={(e) => setFemaleCoOwner(e.target.checked)}
              className="mt-0.5 rounded accent-[#fafafa]"
            />
            <div className="text-xs">
              <div className="font-medium text-[#fafafa]">
                Female primary or co-owner
              </div>
              <div className="text-[#a1a1a1] text-[11px] mt-0.5">
                Applies 1% stamp duty reduction in Maharashtra, Delhi &amp;
                applicable states.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0a0a0a] border border-[#ffffff14] cursor-pointer hover:border-[#ffffff28]">
            <input
              type="checkbox"
              checked={hasJointApplicant}
              onChange={(e) => setHasJointApplicant(e.target.checked)}
              className="mt-0.5 rounded accent-[#fafafa]"
            />
            <div className="text-xs">
              <div className="font-medium text-[#fafafa]">
                Joint home loan co-applicant
              </div>
              <div className="text-[#a1a1a1] text-[11px] mt-0.5">
                Doubles Section 24(b) annual interest tax deduction limit.
              </div>
            </div>
          </label>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-[#ffffff12]">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0a0a0a] hover:bg-[#1f1f1f] border border-[#ffffff14] text-xs text-[#e5e5e5] inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Calculate True Cost &amp; Stress Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
