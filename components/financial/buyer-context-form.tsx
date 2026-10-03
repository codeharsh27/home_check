'use client';

import React, { useState } from 'react';
import { BuyerContext, FinancingSource } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
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
  const [expectedFinancing, setExpectedFinancing] = useState<FinancingSource[]>(
    context.expectedFinancing ?? []
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
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const showLoanFields = expectedFinancing.includes('Home loan');

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
        <Input label="Available Purchase Funds (₹)"
          type="number" value={availableFunds}
          onChange={(e) => setAvailableFunds(e.target.value)}
          helperText="Savings ready to commit to this purchase"
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

      {/* Financing Sources */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">Financing Sources</label>
        <div className="flex flex-wrap gap-2">
          {FINANCING_OPTIONS.map((opt) => {
            const selected = expectedFinancing.includes(opt);
            return (
              <button key={opt} type="button" onClick={() => toggleFinancing(opt)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  selected
                    ? 'bg-[#3F9E6C]/15 text-[#3F9E6C] border-[#3F9E6C]/40'
                    : 'bg-[#181818] text-[#777777] border-[#252525] hover:border-[#333333]'
                }`}>
                {selected ? `✓ ${opt}` : `+ ${opt}`}
              </button>
            );
          })}
        </div>
        {errors.financing && <p className="text-xs text-[#D94F4F]">{errors.financing}</p>}
      </div>

      {/* Loan Details (only shown if Home Loan selected) */}
      {showLoanFields && (
        <div className="space-y-4 p-4 bg-[#0F0F0F] border border-[#222222] rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#5B8BDF]">Home Loan Details</span>
            <Info className="w-3.5 h-3.5 text-[#666666]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Planned Loan Amount (₹)"
              type="number" value={plannedLoanAmount}
              onChange={(e) => setPlannedLoanAmount(e.target.value)}
              helperText="Leave blank to auto-calculate"
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
              helperText="Max 30 years" error={errors.tenure}
              className="font-mono"
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
