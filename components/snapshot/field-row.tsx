"use client";

import React, { useState } from "react";
import { StatusBadge } from "@/components/ui/badge";
import { EvidenceStatus } from "@/types";
import { Edit2, Check, X, Plus } from "lucide-react";

interface FieldRowProps {
  label: string;
  value?: string | number;
  status: EvidenceStatus;
  unit?: string;
  onSave: (newValue: string) => void;
}

export const FieldRow: React.FC<FieldRowProps> = ({
  label,
  value,
  status,
  unit,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value ? String(value) : "");

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value ? String(value) : "");
    setIsEditing(false);
  };

  const isMissing = status === "missing" || !value;

  return (
    <div className="py-3 px-4 rounded-lg bg-[#141414] border border-[#222222] hover:border-[#2E2E2E] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
      <div className="space-y-1">
        <span className="text-xs text-[#888888] font-medium uppercase tracking-wider block">
          {label}
        </span>

        {isEditing ? (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-[#1C1C1C] border border-[#5B8BDF] text-xs text-[#EDEDED] px-2.5 py-1.5 rounded focus:outline-none w-48 font-mono"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-1 rounded bg-[#3F9E6C]/20 text-[#3F9E6C] hover:bg-[#3F9E6C]/30 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 rounded bg-[#222222] text-[#888888] hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {isMissing ? (
              <span className="text-xs text-[#666666] italic">Not provided</span>
            ) : (
              <span className="text-sm font-semibold text-[#EDEDED] font-mono">
                {unit === "₹" ? `₹${Number(value).toLocaleString("en-IN")}` : `${value} ${unit || ""}`}
              </span>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 text-[#666666] hover:text-[#5B8BDF] transition-opacity cursor-pointer p-0.5"
                title="Edit field"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={status} />
        {isMissing && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1 text-xs text-[#5B8BDF] hover:underline font-medium cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
