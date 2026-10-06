'use client';

import React, { useState } from 'react';
import { BuyerContext, FinancingSource } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Info, Building2, Users2, Landmark, HelpCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/calculations';

interface BuyerContextFormProps {
  context: BuyerContext;
  propertyPrice: number;
  onSave: (updated: BuyerContext) => void;
}

export const BuyerContextForm: React.FC<BuyerContextFormProps> = ({ context, propertyPrice, onSave }) => {
  const [purpose, setPurpose] = useState<BuyerContext['purpose']>(context.purpose ?? 'Primary residence');
  const [monthlyIncome, setMonthlyIncome] = useState(String(context.monthlyIncome ?? ''));
  const [existingObligations, setExistingObligations] = useState(String(context.existingObligations ?? ''));
  const [availableFunds, setAvailableFunds] = useState(String(context.availableFunds ?? ''));
  const [emergencyReserve, setEmergencyReserve] = useState(String(context.emergencyReserve ?? ''));
  const [plannedLoanAmount, setPlannedLoanAmount] = useState(String(context.plannedLoanAmount ?? ''));
  const [interestRate, setInterestRate] = useState(String(context.interestRate ?? 8.5));
  const [tenureYears, setTenureYears] = useState(String(context.tenureYears ?? 20));

  // Additional Financing Sources
  const [companyLoanAmount, setCompanyLoanAmount] = useState(String(context.companyLoanAmount ?? ''));
  const [companyLoanEmi, setCompanyLoanEmi] = useState(String(context.companyLoanEmi ?? ''));
  const [familyFundsAmount, setFamilyFundsAmount] = useState(String(context.familyFundsAmount ?? ''));
  const [familyFundsNotes, setFamilyFundsNotes] = useState(context.familyFundsNotes ?? '');
  const [otherFinancingAmount, setOtherFinancingAmount] = useState(String(context.otherFinancingAmount ?? ''));
  const [otherFinancingSource, setOtherFinancingSource] = useState(context.otherFinancingSource ?? '');

  const [expectedFinancing, setExpectedFinancing] = useState<FinancingSource[]>(
    context.expectedFinancing && context.expectedFinancing.length > 0
      ? context.expectedFinancing
      : ['Home loan']
  );
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const FINANCING_OPTIONS: FinancingSource[] = [
    'Home loan', 'Family funds', 'Personal funds', 'Company loan', 'Other',
  ];

  const toggleFinancing = (opt: FinancingSource) => {
    setExpectedFinancing((prev) =>
      prev.includes(opt) ? prev.filter((f) => f !== opt) : [...prev, opt]
    );
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const inc = parseFloat(monthlyIncome);
    const funds = parseFloat(availableFunds);
    const reserve = parseFloat(emergencyReserve);
    const rate = parseFloat(interestRate);
    const tenure = parseFloat(tenureYears);

    if (monthlyIncome && (isNaN(inc) || inc < 0)) errs.income = 'Enter a valid income amount';
    if (availableFunds && (isNaN(funds) || funds < 0)) errs.funds = 'Enter a valid amount';
    if (emergencyReserve && reserve > funds) errs.reserve = 'Reserve cannot exceed available funds';
    if (rate && (rate < 1 || rate > 25)) errs.rate = 'Interest rate must be between 1% and 25%';
    if (tenure && (tenure < 1 || tenure > 30)) errs.tenure = 'Tenure must be between 1 and 30 years';
    if (expectedFinancing.length === 0) errs.financing = 'Select at least one financing source';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      purpose,
      monthlyIncome: parseFloat(monthlyIncome) || undefined,
      existingObligations: parseFloat(existingObligations) || 0,
      availableFunds: parseFloat(availableFunds) || undefined,
      emergencyReserve: parseFloat(emergencyReserve) || 0,
      plannedLoanAmount: parseFloat(plannedLoanAmount) || undefined,
      interestRate: parseFloat(interestRate) || 8.5,
      tenureYears: parseFloat(tenureYears) || 20,
      expectedFinancing,
      companyLoanAmount: parseFloat(companyLoanAmount) || undefined,
      companyLoanEmi: parseFloat(companyLoanEmi) || undefined,
      familyFundsAmount: parseFloat(familyFundsAmount) || undefined,
      familyFundsNotes: familyFundsNotes || undefined,
      otherFinancingAmount: parseFloat(otherFinancingAmount) || undefined,
      otherFinancingSource: otherFinancingSource || undefined,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const showHomeLoanFields = expectedFinancing.includes('Home loan');
  const showCompanyLoanFields = expectedFinancing.includes('Company loan');
  const showFamilyFundsFields = expectedFinancing.includes('Family funds');
  const showOtherFinancingFields = expectedFinancing.includes('Other');

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div>
          <h2 className="text-base font-semibold text-stone-900">Your Financial Context</h2>
          <p className="text-xs text-stone-500">Approximate values are fine — we use these to calculate your funding position.</p>
        </div>
        {isSaved && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">Purchase Purpose</label>
        <div className="flex flex-wrap gap-2">
          {(['Primary residence', 'Investment', 'Both'] as const).map((opt) => (
            <button key={opt} type="button" onClick={() => setPurpose(opt)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                purpose === opt
                  ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold shadow-2xs'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Income & Obligations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Monthly Take-Home Income (₹)"
          type="number" value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          helperText="Combined net monthly income after tax"
          error={errors.income} className="font-mono"
          placeholder="e.g. 150000"
        />
        <Input label="Existing Monthly EMIs / Obligations (₹)"
          type="number" value={existingObligations}
          onChange={(e) => setExistingObligations(e.target.value)}
          helperText="Car loan, personal loan, credit card EMIs"
          className="font-mono" placeholder="0 if none"
        />
      </div>

      {/* Funds & Reserve */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Direct Personal Savings / Cash (₹)"
          type="number" value={availableFunds}
          onChange={(e) => setAvailableFunds(e.target.value)}
          helperText="Your personal savings ready to commit"
          error={errors.funds} className="font-mono"
          placeholder={`e.g. ${(propertyPrice * 0.2).toFixed(0)}`}
        />
        <Input label="Emergency Reserve to Keep Aside (₹)"
          type="number" value={emergencyReserve}
          onChange={(e) => setEmergencyReserve(e.target.value)}
          helperText="Amount you will NOT spend on this property"
          error={errors.reserve} className="font-mono"
          placeholder="e.g. 200000"
        />
      </div>

      {/* Financing Sources Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Financing Sources (Select all that apply)
          </label>
          <span className="text-xs text-stone-400">Click to reveal input blocks below</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {FINANCING_OPTIONS.map((opt) => {
            const selected = expectedFinancing.includes(opt);
            return (
              <button key={opt} type="button" onClick={() => toggleFinancing(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  selected
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold shadow-2xs'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                }`}>
                {selected ? `✓ ${opt}` : `+ ${opt}`}
              </button>
            );
          })}
        </div>
        {errors.financing && <p className="text-xs text-rose-600 font-medium">{errors.financing}</p>}
      </div>

      {/* BLOCK 1: Home Loan Details */}
      {showHomeLoanFields && (
        <div className="space-y-4 p-4 bg-stone-50/80 border border-stone-200/80 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase tracking-wider text-blue-800 font-semibold">
                Home Loan Details (Bank / NBFC)
              </span>
            </div>
            <span className="text-xs text-stone-500">Max 80% LTV agreement value</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Planned Loan Amount (₹)"
              type="number" value={plannedLoanAmount}
              onChange={(e) => setPlannedLoanAmount(e.target.value)}
              helperText="Leave blank to auto-calculate 80% LTV"
              placeholder="Auto-calculated"
            />
            <Input label="Interest Rate (% p.a.)"
              type="number" step="0.1" value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              helperText="Benchmark: 8.5%" error={errors.rate}
            />
            <Input label="Loan Tenure (years)"
              type="number" value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              helperText="Standard 20 yrs (Max 30)" error={errors.tenure}
            />
          </div>
        </div>
      )}

      {/* BLOCK 2: Company Loan Details */}
      {showCompanyLoanFields && (
        <div className="space-y-4 p-4 bg-stone-50/80 border border-blue-200/70 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs uppercase tracking-wider text-blue-800 font-semibold">
                Company / Employer Loan Block
              </span>
            </div>
            <span className="text-xs text-emerald-700 font-medium">Adds to your available capital</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Company Loan Amount (₹)"
              type="number"
              value={companyLoanAmount}
              onChange={(e) => setCompanyLoanAmount(e.target.value)}
              helperText="Loan sanctioned by your employer"
              placeholder="e.g. 500000"
            />
            <Input
              label="Monthly Salary Deduction / EMI (₹)"
              type="number"
              value={companyLoanEmi}
              onChange={(e) => setCompanyLoanEmi(e.target.value)}
              helperText="Deducted monthly from payslip (affects DTI)"
              placeholder="e.g. 15000"
            />
          </div>
        </div>
      )}

      {/* BLOCK 3: Family Funds Details */}
      {showFamilyFundsFields && (
        <div className="space-y-4 p-4 bg-stone-50/80 border border-indigo-200/70 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs uppercase tracking-wider text-indigo-800 font-semibold">
                Family & Relatives Assistance Block
              </span>
            </div>
            <span className="text-xs text-emerald-700 font-medium">Adds to your down payment</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Family Contribution Amount (₹)"
              type="number"
              value={familyFundsAmount}
              onChange={(e) => setFamilyFundsAmount(e.target.value)}
              helperText="Funds gifted or lent by parents/family"
              placeholder="e.g. 1000000"
            />
            <Input
              label="Terms / Repayment Note"
              type="text"
              value={familyFundsNotes}
              onChange={(e) => setFamilyFundsNotes(e.target.value)}
              helperText="e.g. Gift / Zero-interest return in 3 years"
              placeholder="e.g. Gift from parents"
            />
          </div>
        </div>
      )}

      {/* BLOCK 4: Other Financing Sources */}
      {showOtherFinancingFields && (
        <div className="space-y-4 p-4 bg-stone-50/80 border border-amber-200/70 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
                Other Financing Source Block
              </span>
            </div>
            <span className="text-xs text-emerald-700 font-medium">Adds to your capital pool</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Funding Source Description"
              type="text"
              value={otherFinancingSource}
              onChange={(e) => setOtherFinancingSource(e.target.value)}
              helperText="e.g. EPF withdrawal, gold loan, plot sale"
              placeholder="e.g. EPF partial withdrawal"
            />
            <Input
              label="Amount to Liquidate (₹)"
              type="number"
              value={otherFinancingAmount}
              onChange={(e) => setOtherFinancingAmount(e.target.value)}
              helperText="Estimated net cash to realize"
              placeholder="e.g. 400000"
            />
          </div>
        </div>
      )}

      <div className="pt-2 flex justify-end">
        <Button type="submit" size="md">Update Financial Picture</Button>
      </div>
    </form>
  );
};
