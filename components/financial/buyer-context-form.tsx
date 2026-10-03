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
    <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#252525] rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#202020] pb-4">
        <div>
          <h2 className="text-base font-semibold text-[#EDEDED]">Your Financial Context</h2>
          <p className="text-xs text-[#888888]">Approximate values are fine — we use these to calculate your funding position.</p>
        </div>
        {isSaved && (
          <span className="inline-flex items-center gap-1 text-xs text-[#3F9E6C] font-mono bg-[#3F9E6C]/10 px-2.5 py-1 rounded border border-[#3F9E6C]/30">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">Purchase Purpose</label>
        <div className="flex flex-wrap gap-2">
          {(['Primary residence', 'Investment', 'Both'] as const).map((opt) => (
            <button key={opt} type="button" onClick={() => setPurpose(opt)}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                purpose === opt
                  ? 'bg-[#5B8BDF]/15 text-[#5B8BDF] border-[#5B8BDF]/50'
                  : 'bg-[#181818] text-[#888888] border-[#2A2A2A] hover:bg-[#202020]'
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
          <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">
            Financing Sources (Select all that apply)
          </label>
          <span className="text-[11px] text-[#666666]">Click to reveal input blocks below</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {FINANCING_OPTIONS.map((opt) => {
            const selected = expectedFinancing.includes(opt);
            return (
              <button key={opt} type="button" onClick={() => toggleFinancing(opt)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  selected
                    ? 'bg-[#3F9E6C]/15 text-[#3F9E6C] border-[#3F9E6C]/40 font-semibold'
                    : 'bg-[#181818] text-[#777777] border-[#252525] hover:border-[#333333]'
                }`}>
                {selected ? `✓ ${opt}` : `+ ${opt}`}
              </button>
            );
          })}
        </div>
        {errors.financing && <p className="text-xs text-[#D94F4F]">{errors.financing}</p>}
      </div>

      {/* BLOCK 1: Home Loan Details */}
      {showHomeLoanFields && (
        <div className="space-y-4 p-4 bg-[#0F0F0F] border border-[#222222] rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#5B8BDF]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#5B8BDF] font-semibold">
                Home Loan Details (Bank / NBFC)
              </span>
            </div>
            <span className="text-[10px] text-[#666666] font-mono">Max 80% LTV agreement value</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Planned Loan Amount (₹)"
              type="number" value={plannedLoanAmount}
              onChange={(e) => setPlannedLoanAmount(e.target.value)}
              helperText="Leave blank to auto-calculate 80% LTV"
              className="font-mono" placeholder="Auto-calculated"
            />
            <Input label="Interest Rate (% p.a.)"
              type="number" step="0.1" value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              helperText="Benchmark: 8.5%" error={errors.rate}
              className="font-mono"
            />
            <Input label="Loan Tenure (years)"
              type="number" value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              helperText="Standard 20 yrs (Max 30)" error={errors.tenure}
              className="font-mono"
            />
          </div>
        </div>
      )}

      {/* BLOCK 2: Company Loan Details */}
      {showCompanyLoanFields && (
        <div className="space-y-4 p-4 bg-[#0F0F0F] border border-[#5B8BDF]/30 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#5B8BDF]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#5B8BDF] font-semibold">
                Company / Employer Loan Block
              </span>
            </div>
            <span className="text-[10px] text-[#3F9E6C] font-mono">Adds to your available capital</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Company Loan Amount (₹)"
              type="number"
              value={companyLoanAmount}
              onChange={(e) => setCompanyLoanAmount(e.target.value)}
              helperText="Loan sanctioned by your employer"
              className="font-mono"
              placeholder="e.g. 500000"
            />
            <Input
              label="Monthly Salary Deduction / EMI (₹)"
              type="number"
              value={companyLoanEmi}
              onChange={(e) => setCompanyLoanEmi(e.target.value)}
              helperText="Deducted monthly from payslip (affects DTI)"
              className="font-mono"
              placeholder="e.g. 15000"
            />
          </div>
        </div>
      )}

      {/* BLOCK 3: Family Funds Details */}
      {showFamilyFundsFields && (
        <div className="space-y-4 p-4 bg-[#0F0F0F] border border-[#9B6FD6]/30 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-[#9B6FD6]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#9B6FD6] font-semibold">
                Family & Relatives Assistance Block
              </span>
            </div>
            <span className="text-[10px] text-[#3F9E6C] font-mono">Adds to your down payment</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Family Contribution Amount (₹)"
              type="number"
              value={familyFundsAmount}
              onChange={(e) => setFamilyFundsAmount(e.target.value)}
              helperText="Funds gifted or lent by parents/family"
              className="font-mono"
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
        <div className="space-y-4 p-4 bg-[#0F0F0F] border border-[#D4A017]/30 rounded-xl transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D4A017]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4A017] font-semibold">
                Other Financing Source Block
              </span>
            </div>
            <span className="text-[10px] text-[#3F9E6C] font-mono">Adds to your capital pool</span>
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
              className="font-mono"
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
