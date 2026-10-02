"use client";

import React, { useState } from "react";
import { BuyerContext } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Edit2 } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#252525] rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#202020] pb-4">
        <div>
          <h2 className="text-base font-semibold text-[#EDEDED]">Your Financial Context</h2>
          <p className="text-xs text-[#888888]">Approximate inputs are fine. Used strictly to calculate funding gaps.</p>
        </div>
        {isSaved && (
          <span className="inline-flex items-center gap-1 text-xs text-[#3F9E6C] font-mono bg-[#3F9E6C]/10 px-2.5 py-1 rounded border border-[#3F9E6C]/30">
            <Check className="w-3.5 h-3.5" /> Updated
          </span>
        )}
      </div>

      {/* 1. Purchase Purpose */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">
          Purchase Purpose
        </label>
        <div className="flex flex-wrap gap-3">
          {(["Primary residence", "Investment", "Both"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPurpose(option)}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                purpose === option
                  ? "bg-[#5B8BDF]/15 text-[#5B8BDF] border border-[#5B8BDF]/50"
                  : "bg-[#181818] text-[#888888] border-[#2A2A2A] hover:bg-[#202020]"
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
        <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">
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
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#3F9E6C]/15 text-[#3F9E6C] border-[#3F9E6C]/40"
                    : "bg-[#181818] text-[#777777] border-[#252525] hover:border-[#333333]"
                }`}
              >
                {isSelected ? `✓ ${item}` : `+ ${item}`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button type="submit" size="md">
          Update Financial Picture
        </Button>
      </div>
    </form>
  );
};
