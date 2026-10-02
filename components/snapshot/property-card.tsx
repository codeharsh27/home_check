import React from "react";
import Image from "next/image";
import { PropertyDetails } from "@/types";
import { MapPin, Globe, Building2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: PropertyDetails;
}

export const PropertyHeaderCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] border border-[#374151] rounded-2xl p-6 shadow-xl space-y-5 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start gap-5">
        {/* Real Thumbnail Image */}
        <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-[#374151] shadow-md">
          <Image
            src="/images/green_valley.jpg"
            alt={property.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute top-2 left-2 bg-[#0B0F17]/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[#60A5FA] border border-[#2563EB]/30">
            {property.type}
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {property.bhk && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#1F2937] text-[#D1D5DB] border border-[#374151]">
                {property.bhk}
              </span>
            )}
            {property.possessionStatus && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#F59E0B]/10 text-[#FBBF24] border border-[#F59E0B]/30">
                {property.possessionStatus}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-[#F9FAFB] tracking-tight">{property.name}</h1>

          <p className="text-xs text-[#9CA3AF] flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-[#EF4444]" />
            <span>{property.location}</span>
          </p>

          {property.developer && (
            <p className="text-xs text-[#6B7280]">
              Developer: <strong className="text-[#D1D5DB] font-semibold">{property.developer}</strong>
            </p>
          )}
        </div>

        {/* Price Card */}
        <div className="w-full md:w-auto text-left md:text-right bg-[#0B0F17]/80 backdrop-blur-md p-4 rounded-xl border border-[#374151] shrink-0 space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#9CA3AF] block">
            Listed Base Price
          </span>
          <p className="text-2xl font-extrabold text-[#F9FAFB] font-mono text-[#34D399]">
            ₹{(property.price / 100000).toFixed(2)}L
          </p>
          <span className="text-[11px] text-[#6B7280] font-mono block">
            ₹{property.price.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {property.sourceName && (
        <div className="pt-4 border-t border-[#374151]/60 flex items-center justify-between text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Information Source: <strong className="text-[#F9FAFB] font-medium">{property.sourceName}</strong></span>
          </div>
          <StatusBadge status="source-derived" />
        </div>
      )}
    </div>
  );
};
