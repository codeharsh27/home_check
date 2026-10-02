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
    <div className="py-2.5 px-4 rounded-md bg-[#16181D] border border-[#262930] hover:border-[#363B47] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
      <div className="space-y-0.5">
        <span className="text-[10px] font-mono text-[#8A8F9E] font-medium uppercase tracking-wider block">
          {label}
        </span>

        {isEditing ? (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-[#121418] border border-[#D97706] text-xs text-[#F0F2F5] px-2.5 py-1 rounded focus:outline-none w-48 font-mono"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-1 rounded bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 rounded bg-[#1E2128] text-[#8A8F9E] hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {isMissing ? (
              <span className="text-xs text-[#525866] italic">Not provided</span>
            ) : (
              <span className="text-xs font-semibold text-[#F0F2F5] font-mono">
                {unit === "₹" ? `₹${Number(value).toLocaleString("en-IN")}` : `${value} ${unit || ""}`}
              </span>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 text-[#6B7280] hover:text-[#D97706] transition-opacity cursor-pointer p-0.5"
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
            className="inline-flex items-center gap-1 text-[11px] text-[#D97706] hover:underline font-medium cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
