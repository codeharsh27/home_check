import React from "react";
import { PropertyDetails } from "@/types";
import { MapPin, Globe } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: PropertyDetails;
}

export const PropertyHeaderCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-[#16181D] border border-[#262930] rounded-lg p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1E2128] text-[#D97706] border border-[#2B2F38]">
              {property.type}
            </span>
            {property.bhk && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#1E2128] text-[#8A8F9E] border border-[#2B2F38]">
                {property.bhk}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#F0F2F5]">
            {property.name}
          </h1>
          <p className="text-xs text-[#8A8F9E] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>{property.location}</span>
          </p>
        </div>

        <div className="sm:text-right space-y-1 bg-[#121418] p-3 rounded border border-[#262930] shrink-0">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] block">
            Listed Price
          </span>
          <p className="text-xl font-bold text-[#F0F2F5] font-mono">
            ₹{(property.price / 100000).toFixed(2)}L
          </p>
          <span className="text-[11px] text-[#8A8F9E] font-mono block">
            ₹{property.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {property.sourceName && (
        <div className="pt-3 border-t border-[#23262D] flex items-center justify-between text-xs text-[#8A8F9E]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#6B7280]" />
            <span>Source: <strong className="text-[#F0F2F5]">{property.sourceName}</strong></span>
          </div>
          <StatusBadge status="source-derived" />
        </div>
      )}
    </div>
  );
};
