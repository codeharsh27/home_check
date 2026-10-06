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
    <div className="py-3 px-4 rounded-xl bg-white border border-stone-200/80 hover:border-stone-300 transition-all flex items-center justify-between gap-3 group shadow-2xs">
      <div className="space-y-0.5 flex-1 min-w-0">
        <span className="text-[11px] font-medium text-stone-500 block truncate">
          {label}
        </span>

        {isEditing ? (
          <div className="flex items-center gap-2 pt-1">
            {label === "Property Type" ? (
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-white border border-blue-600 text-xs text-stone-900 px-2.5 py-1 rounded-md focus:outline-none w-48 shadow-2xs"
                autoFocus
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Independent House">Independent House</option>
                <option value="Other">Other</option>
              </select>
            ) : label === "Possession Status" ? (
              <select
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-white border border-blue-600 text-xs text-stone-900 px-2.5 py-1 rounded-md focus:outline-none w-48 shadow-2xs"
                autoFocus
              >
                <option value="Under construction">Under construction</option>
                <option value="Ready to move">Ready to move</option>
                <option value="Pre-launch">Pre-launch</option>
              </select>
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                className="bg-white border border-blue-600 text-xs text-stone-900 px-2.5 py-1 rounded-md focus:outline-none w-48 shadow-2xs"
                autoFocus
              />
            )}
            <button
              onClick={handleSave}
              className="p-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer border border-emerald-200"
              title="Save"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 rounded-md bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer border border-stone-200"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {isMissing ? (
              <span className="text-xs text-stone-400 italic">Not specified</span>
            ) : (
              <span className="text-sm font-semibold text-stone-900 truncate">
                {unit === "₹" ? `₹${Number(value).toLocaleString("en-IN")}` : `${value} ${unit || ""}`}
              </span>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-blue-600 transition-opacity cursor-pointer p-0.5"
                title="Edit field"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isMissing && !isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-0.5 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};
