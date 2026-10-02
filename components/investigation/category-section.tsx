import React from "react";
import { ChecklistItem } from "@/types";
import { ChecklistItemCard } from "./checklist-item-card";
import { ShieldCheck, FileCheck, DollarSign, Building } from "lucide-react";

interface CategorySectionProps {
  categoryKey: ChecklistItem["category"];
  title: string;
  items: ChecklistItem[];
  onUpdateItem: (itemId: string, updates: Partial<ChecklistItem>) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryKey,
  title,
  items,
  onUpdateItem,
}) => {
  const completedCount = items.filter((i) => i.received || i.status === "verified").length;
  const totalCount = items.length;

  const getCategoryIcon = () => {
    switch (categoryKey) {
      case "ownership":
        return <ShieldCheck className="w-4 h-4 text-[#5B8BDF]" />;
      case "approvals":
        return <FileCheck className="w-4 h-4 text-[#9B6FD6]" />;
      case "financial":
        return <DollarSign className="w-4 h-4 text-[#3F9E6C]" />;
      case "costs":
        return <Building className="w-4 h-4 text-[#D4A017]" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {/* Category Header Bar */}
      <div className="flex items-center justify-between border-b border-[#202020] pb-2">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <h2 className="text-sm font-semibold text-[#EDEDED]">{title}</h2>
        </div>
        <span className="text-xs font-mono text-[#888888] bg-[#161616] px-2.5 py-0.5 rounded border border-[#252525]">
          {completedCount} / {totalCount} completed
        </span>
      </div>

      {/* Item Cards List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            onUpdate={(updates) => onUpdateItem(item.id, updates)}
          />
        ))}
      </div>
    </div>
  );
};
