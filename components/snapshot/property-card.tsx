import React from "react";
import { PropertyDetails } from "@/types";
import { Building2, MapPin, Tag, Globe, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: PropertyDetails;
}

export const PropertyHeaderCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              {property.type}
            </span>
            {property.bhk && (
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                {property.bhk}
              </span>
            )}
            {property.possessionStatus && (
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                {property.possessionStatus}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            {property.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
            <span>{property.location}</span>
          </p>
        </div>

        <div className="sm:text-right space-y-0.5 bg-stone-50/80 p-3.5 rounded-xl border border-stone-200/80 shrink-0">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
            Listed Price
          </span>
          <p className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            ₹{(property.price / 100000).toFixed(2)}L
          </p>
          <span className="text-xs text-stone-500 font-mono block">
            ₹{property.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {property.sourceName && (
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>Found from: <strong className="font-medium text-stone-700">{property.sourceName}</strong></span>
          </div>
          <span className="text-xs text-stone-400 font-normal">Pre-filled from listing</span>
        </div>
      )}
    </div>
  );
};
