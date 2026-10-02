import React from "react";
import { PropertyDetails } from "@/types";
import { Building2, MapPin, Tag, Globe, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: PropertyDetails;
}

export const PropertyHeaderCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-[#121212] border border-[#252525] rounded-xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#222222] text-[#5B8BDF] border border-[#2B2B2B]">
              {property.type}
            </span>
            {property.bhk && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#222222] text-[#888888] border border-[#2B2B2B]">
                {property.bhk}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">
            {property.name}
          </h1>
          <p className="text-xs text-[#888888] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#666666]" />
            <span>{property.location}</span>
          </p>
        </div>

        <div className="sm:text-right space-y-1 bg-[#181818] p-3 rounded-lg border border-[#282828] shrink-0">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#777777] block">
            Listed Price
          </span>
          <p className="text-xl font-bold text-[#EDEDED] font-mono">
            ₹{(property.price / 100000).toFixed(2)}L
          </p>
          <span className="text-[11px] text-[#666666] font-mono block">
            ₹{property.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {property.sourceName && (
        <div className="pt-3 border-t border-[#1E1E1E] flex items-center justify-between text-xs text-[#777777]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#555555]" />
            <span>Source: <strong className="text-[#AAAAAA]">{property.sourceName}</strong></span>
          </div>
          <StatusBadge status="source-derived" />
        </div>
      )}
    </div>
  );
};
