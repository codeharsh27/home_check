"use client";

import React, { useState } from "react";
import { BuyerContext } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface BuyerContextFormProps {
  context: BuyerContext;
  onSave: (updatedContext: BuyerContext) => void;
}

export const BuyerContextForm: React.FC<BuyerContextFormProps> = ({ context, onSave }) => {
  const [purpose, setPurpose] = useState<BuyerContext["purpose"]>(context.purpose || "Primary residence");
  const [monthlyIncome, setMonthlyIncome] = useState<string>(context.monthlyIncome ? String(context.monthlyIncome) : "150000");
  const [existingObligations, setExistingObligations] = useState<string>(context.existingObligations ? String(context.existingObligations) : "12000");
  const [availableFunds, setAvailableFunds] = useState<string>(context.availableFunds ? String(context.availableFunds) : "1500000");
  const [emergencyReserve, setEmergencyReserve] = useState<string>(context.emergencyReserve ? String(context.emergencyReserve) : "200000");
  const [expectedFinancing, setExpectedFinancing] = useState<string[]>(context.expectedFinancing || ["Home loan"]);

  const [isSaved, setIsSaved] = useState(false);

  const handleFinancingToggle = (option: string) => {
    if (expectedFinancing.includes(option)) {
      setExpectedFinancing(expectedFinancing.filter((item) => item !== option));
    } else {
      setExpectedFinancing([...expectedFinancing, option]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      purpose,
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      existingObligations: parseFloat(existingObligations) || 0,
      availableFunds: parseFloat(availableFunds) || 0,
      emergencyReserve: parseFloat(emergencyReserve) || 0,
      expectedFinancing: expectedFinancing as any,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#16181D] border border-[#262930] rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#23262D] pb-4">
        <div>
          <h2 className="text-base font-semibold text-[#F0F2F5]">Your Financial Context</h2>
          <p className="text-xs text-[#8A8F9E]">Approximate inputs are fine. Used strictly to calculate funding gaps.</p>
        </div>
        {isSaved && (
          <span className="inline-flex items-center gap-1 text-xs text-[#10B981] font-mono bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/30">
            <Check className="w-3.5 h-3.5" /> Updated
          </span>
        )}
      </div>

      {/* 1. Purchase Purpose */}
      <div className="space-y-2">
        <label className="block text-[11px] font-mono text-[#8A8F9E] uppercase tracking-wider">
          Purchase Purpose
        </label>
        <div className="flex flex-wrap gap-2.5">
          {(["Primary residence", "Investment", "Both"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPurpose(option)}
              className={`px-3.5 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                purpose === option
                  ? "bg-[#D97706]/15 text-[#D97706] border-[#D97706]/50 font-semibold"
                  : "bg-[#14161B] text-[#8A8F9E] border-[#262930] hover:bg-[#1C1F26]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Numerical Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Monthly Take-Home Income (Approx ₹)"
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          helperText="Combined household net monthly income"
          className="font-mono"
        />
        <Input
          label="Existing Monthly EMIs / Obligations (₹)"
          type="number"
          value={existingObligations}
          onChange={(e) => setExistingObligations(e.target.value)}
          helperText="Car loan, personal loan, credit card EMIs"
          className="font-mono"
        />
        <Input
          label="Available Purchase Funds (₹)"
          type="number"
          value={availableFunds}
          onChange={(e) => setAvailableFunds(e.target.value)}
          helperText="Savings, investments ready to commit"
          className="font-mono"
        />
        <Input
          label="Emergency Reserve to Keep Aside (₹)"
          type="number"
          value={emergencyReserve}
          onChange={(e) => setEmergencyReserve(e.target.value)}
          helperText="Do not touch for property purchase"
          className="font-mono"
        />
      </div>

      {/* 3. Expected Financing */}
      <div className="space-y-2 pt-2">
        <label className="block text-[11px] font-mono text-[#8A8F9E] uppercase tracking-wider">
          Expected Financing Method
        </label>
        <div className="flex flex-wrap gap-2">
          {(["Home loan", "Family funds", "Personal funds", "Company loan", "Not decided"] as const).map((item) => {
            const isSelected = expectedFinancing.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => handleFinancingToggle(item)}
                className={`px-3 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40"
                    : "bg-[#14161B] text-[#6B7280] border-[#262930] hover:border-[#363B47]"
                }`}
              >
                {isSelected ? `✓ ${item}` : `+ ${item}`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button type="submit" variant="amber" size="md">
          Update Financial Picture
        </Button>
      </div>
    </form>
  );
};
