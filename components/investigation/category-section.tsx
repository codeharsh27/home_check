import React from "react";
import { ChecklistItem } from "@/types";
import { ChecklistItemCard } from "./checklist-item-card";
import { ShieldCheck, FileCheck, DollarSign, Building, Wrench } from "lucide-react";

interface CategorySectionProps {
  categoryKey: ChecklistItem["category"];
  title: string;
  items: ChecklistItem[];
  evaluationId?: string;
  onUpdateItem: (itemId: string, updates: Partial<ChecklistItem>) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryKey,
  title,
  items,
  evaluationId,
  onUpdateItem,
}) => {
  const completedCount = items.filter((i) => i.received || i.status === "verified").length;
  const totalCount = items.length;

  const getCategoryIcon = () => {
    switch (categoryKey) {
      case "ownership":
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case "approvals":
        return <FileCheck className="w-4 h-4 text-indigo-600" />;
      case "financial":
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case "condition":
        return <Wrench className="w-4 h-4 text-amber-600" />;
      case "costs":
        return <Building className="w-4 h-4 text-stone-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {/* Category Header Bar */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <h2 className="text-sm font-bold text-stone-900">{title}</h2>
        </div>
        <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200/80">
          {completedCount} / {totalCount} completed
        </span>
      </div>

      {/* Item Cards List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            evaluationId={evaluationId}
            onUpdate={(updates) => onUpdateItem(item.id, updates)}
          />
        ))}
      </div>
    </div>
  );
};
