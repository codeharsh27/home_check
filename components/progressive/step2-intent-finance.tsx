'use client';

import React, { useState } from 'react';
import { BuyerContext, PropertyDetails } from '@/types';
import { Home, TrendingUp, Briefcase, IndianRupee, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Step2Props {
  property: PropertyDetails;
  buyerContext?: BuyerContext;
  onUpdateContext: (context: Partial<BuyerContext>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2IntentFinance: React.FC<Step2Props> = ({
  property,
  buyerContext = {},
  onUpdateContext,
  onNext,
  onBack,
}) => {
  const [purpose, setPurpose] = useState<BuyerContext['purpose']>(
    buyerContext.purpose || 'Personal'
  );
  const [availableFunds, setAvailableFunds] = useState<string>(
    buyerContext.availableFunds ? String(buyerContext.availableFunds) : '2000000'
  );
  const [monthlyIncome, setMonthlyIncome] = useState<string>(
    buyerContext.monthlyIncome ? String(buyerContext.monthlyIncome) : '160000'
  );
  const [existingObligations, setExistingObligations] = useState<string>(
    buyerContext.existingObligations ? String(buyerContext.existingObligations) : '15000'
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          Step 2 of 5 • Intent & Financial Capacity
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
          Why Are You Buying & What Can You Fund?
        </h1>
        <p className="text-sm text-stone-500">
          Your motive dictates which risks matter most. Your upfront capital decides if you face cash-trap hurdles before handover.
        </p>
      </div>

      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-8">
        {/* Section 1: Purchase Motive */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-stone-900 block">
            1. Primary Motive for Purchasing
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Personal */}
            <div
              onClick={() => setPurpose('Personal')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                purpose === 'Personal' || purpose === 'Primary residence'
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500/20 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Home className="w-4 h-4" />
                </div>
                <div className="font-semibold text-stone-900 text-sm">Personal End-Use</div>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Prioritizes possession certainty, livability, school/office commute, and low maintenance surprises.
              </p>
            </div>

            {/* Investment */}
            <div
              onClick={() => setPurpose('Investment')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                purpose === 'Investment'
                  ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500/20 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="font-semibold text-stone-900 text-sm">Rental / Investment</div>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Prioritizes net rental yield (~2.5–3.2%), capital appreciation rate, and tenant vacancy risks.
              </p>
            </div>

            {/* Business / Commercial */}
            <div
              onClick={() => setPurpose('Business')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                purpose === 'Business'
              ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500/20 shadow-sm'
              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="font-semibold text-stone-900 text-sm">Business / Studio</div>
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Prioritizes commercial zoning permissions, power back-up load, and high customer footfall access.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Realities */}
        <div className="space-y-4 pt-6 border-t border-stone-100">
          <label className="text-sm font-semibold text-stone-900 block">
            2. Available Capital & Cashflow
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>Total Liquid Savings for Upfront Costs</span>
                <span className="text-[11px] text-stone-600 font-normal">(Down payment + Stamp Duty)</span>
              </label>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <Input
                  type="number"
                  value={availableFunds}
                  onChange={(e) => setAvailableFunds(e.target.value)}
                  placeholder="e.g. 2000000"
                  className="pl-9 bg-white"
                />
              </div>
              <p className="text-[11px] text-stone-600 mt-1">
                Tip: Banks do not finance stamp duty or corpus funds.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>Monthly In-Hand Household Income</span>
                <span className="text-[11px] text-stone-600 font-normal">(Net post-tax)</span>
              </label>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <Input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g. 150000"
                  className="pl-9 bg-white"
                />
              </div>
              <p className="text-[11px] text-stone-600 mt-1">
                Used to compute safe debt-to-income (DTI) tolerance.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>Existing Monthly EMI Obligations</span>
                <span className="text-[11px] text-stone-600 font-normal">(Car / Personal / Education)</span>
              </label>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <Input
                  type="number"
                  value={existingObligations}
                  onChange={(e) => setExistingObligations(e.target.value)}
                  placeholder="e.g. 15000"
                  className="pl-9 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block">
                Target Loan Tenure
              </label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[15, 20, 25].map((yrs) => (
                  <button
                    key={yrs}
                    type="button"
                    onClick={() => setTenureYears(yrs)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      tenureYears === yrs
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold shadow-xs'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {yrs} Years
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Granular Financing Sources */}
          <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
            <div className="text-xs font-semibold text-stone-800">
              Expected Financing Sources & Allocation
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <label className="text-[11px] font-semibold text-stone-700 block">
                  Planned Home Loan (₹)
                </label>
                <Input
                  type="number"
                  value={homeLoanAmount}
                  onChange={(e) => setHomeLoanAmount(e.target.value)}
                  placeholder="Auto (up to 80% LTV)"
                  className="mt-1 bg-white text-xs h-8"
                />
                <span className="text-[10px] text-stone-600 block mt-1">Leave empty to auto-calculate</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <label className="text-[11px] font-semibold text-stone-700 block">
                  Family Contribution / Gift (₹)
                </label>
                <Input
                  type="number"
                  value={familyFundsAmount}
                  onChange={(e) => setFamilyFundsAmount(e.target.value)}
                  placeholder="e.g. 500000"
                  className="mt-1 bg-white text-xs h-8"
                />
                <span className="text-[10px] text-stone-600 block mt-1">Non-repayable assistance</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <label className="text-[11px] font-semibold text-stone-700 block">
                  Company Soft Loan / Advance (₹)
                </label>
                <Input
                  type="number"
                  value={companyLoanAmount}
                  onChange={(e) => setCompanyLoanAmount(e.target.value)}
                  placeholder="e.g. 300000"
                  className="mt-1 bg-white text-xs h-8"
                />
                <span className="text-[10px] text-stone-600 block mt-1">Employer low-interest loan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Tax & Concessions Optimization */}
        <div className="space-y-3 pt-6 border-t border-stone-100 bg-stone-50/60 p-4 rounded-xl border border-stone-200/80">
          <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Government Concessions & Co-Applicant Optimizations
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-stone-200 cursor-pointer hover:border-stone-300">
              <input
                type="checkbox"
                checked={femaleCoOwner}
                onChange={(e) => setFemaleCoOwner(e.target.checked)}
                className="mt-0.5 rounded text-blue-600"
              />
              <div className="text-xs">
                <div className="font-semibold text-stone-800">Female Primary or Co-Owner</div>
                <div className="text-stone-600 text-[11px]">
                  Unlocks 1% stamp duty concession (e.g. saves ~₹85,000 in Maharashtra & Delhi).
                </div>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-stone-200 cursor-pointer hover:border-stone-300">
              <input
                type="checkbox"
                checked={hasJointApplicant}
                onChange={(e) => setHasJointApplicant(e.target.checked)}
                className="mt-0.5 rounded text-blue-600"
              />
              <div className="text-xs">
                <div className="font-semibold text-stone-800">Joint Applicant (Spouse / Parent)</div>
                <div className="text-stone-600 text-[11px]">
                  Doubles Section 24 tax exemption limit from ₹2 Lakh to ₹4 Lakh per year.
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto text-stone-600 inline-flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Specs
          </Button>

          <Button
            onClick={handleContinue}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm inline-flex items-center justify-center gap-2"
          >
            Run Reality & Alternative Check <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
