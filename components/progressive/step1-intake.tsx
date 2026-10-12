'use client';

import React, { useState } from 'react';
import { PropertyDetails, PossessionStatus } from '@/types';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface Step1Props {
  property: PropertyDetails;
  onUpdateProperty: (updates: Partial<PropertyDetails>) => void;
  onNext: () => void;
}

export const Step1Intake: React.FC<Step1Props> = ({
  property,
  onUpdateProperty,
  onNext,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: property.name || '',
    price: property.price ? String(property.price) : '',
    location: property.location || '',
    city: property.city || '',
    carpetArea: property.carpetArea ? String(property.carpetArea) : '',
    bhk: property.bhk || '2 BHK',
    developer: property.developer || '',
    reraId: property.reraId || '',
    possessionStatus: property.possessionStatus || 'Under construction',
  });

  React.useEffect(() => {
    setFormData({
      name: property.name || '',
      price: property.price ? String(property.price) : '',
      location: property.location || '',
      city: property.city || '',
      carpetArea: property.carpetArea ? String(property.carpetArea) : '',
      bhk: property.bhk || '2 BHK',
      developer: property.developer || '',
      reraId: property.reraId || '',
      possessionStatus: property.possessionStatus || 'Under construction',
    });
  }, [property]);

  const ratePerSqFt =
    property.carpetArea && property.carpetArea > 0 && property.price > 0
      ? Math.round(property.price / property.carpetArea)
      : null;

  const handleSave = () => {
    onUpdateProperty({
      name: formData.name,
      price: parseFloat(formData.price) || property.price,
      location: formData.location,
      city: formData.city,
      carpetArea: parseFloat(formData.carpetArea) || property.carpetArea,
      bhk: formData.bhk,
      developer: formData.developer,
      reraId: formData.reraId,
      possessionStatus: formData.possessionStatus as PossessionStatus,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Editorial Section Header */}
      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
          01 / PROPERTY BASELINE
        </p>
        <h1 className="font-serif text-[32px] sm:text-[40px] text-[#fafafa] tracking-[-0.025em] leading-[1.12]">
          Confirm property specifications
        </h1>
        <p className="text-[14px] text-[#a1a1a1] max-w-xl leading-relaxed">
          Review the quoted agreement price and RERA carpet area below. We use
          these figures to compute state stamp duty, society corpus, and EMI
          exposure.
        </p>
      </div>

      {/* Main Baseline Spec Card */}
      <div className="bg-[#141414] border border-[#ffffff14] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#ffffff12]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              <span>
                {property.type || 'Apartment'} · {property.bhk || '2 BHK'}
              </span>
              {property.reraId && (
                <span className="text-[#96a766]">· RERA {property.reraId}</span>
              )}
            </div>
            <h2 className="font-serif text-[26px] sm:text-[30px] text-[#fafafa] tracking-[-0.02em]">
              {property.name || 'Shortlisted Property'}
            </h2>
            <p className="text-[14px] text-[#a1a1a1]">
              {property.location || 'Locality not specified'}
              {property.city ? `, ${property.city}` : ''}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a1a1a1]">
              Quoted Base Price
            </div>
            <div className="font-serif text-[30px] sm:text-[36px] text-[#fafafa] tracking-[-0.02em] mt-0.5">
              {property.price > 0
                ? property.price >= 10000000
                  ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                  : `₹${(property.price / 100000).toFixed(2)} L`
                : 'Unset'}
            </div>
            {ratePerSqFt && (
              <div className="text-[12px] text-[#a1a1a1] mt-0.5">
                ₹{ratePerSqFt.toLocaleString('en-IN')} / sq.ft carpet
              </div>
            )}
          </div>
        </div>

        {/* Clean Hairline Spec Grid */}
        {!isEditing ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-2">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
                Carpet Area
              </div>
              <div className="text-[15px] text-[#fafafa] mt-1">
                {property.carpetArea
                  ? `${property.carpetArea} sq.ft`
                  : 'Not specified'}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
                Developer
              </div>
              <div className="text-[15px] text-[#fafafa] mt-1 truncate">
                {property.developer || 'Not specified'}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
                Stage
              </div>
              <div className="text-[15px] text-[#fafafa] mt-1">
                {property.possessionStatus || 'Under construction'}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666]">
                Source
              </div>
              <div className="text-[15px] text-[#fafafa] mt-1 truncate">
                {property.sourceUrl ? (
                  <a
                    href={property.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e5e5e5] hover:underline inline-flex items-center gap-1"
                  >
                    Listing link <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  property.sourceName || 'Manual entry'
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-[#ffffff14]">
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                Project / Building Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                Quoted Base Price (₹ in Rupees)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                Locality &amp; City
              </label>
              <input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                RERA Carpet Area (sq.ft)
              </label>
              <input
                type="number"
                value={formData.carpetArea}
                onChange={(e) =>
                  setFormData({ ...formData, carpetArea: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                Developer Name
              </label>
              <input
                value={formData.developer}
                onChange={(e) =>
                  setFormData({ ...formData, developer: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                RERA Registration ID
              </label>
              <input
                value={formData.reraId}
                onChange={(e) =>
                  setFormData({ ...formData, reraId: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff14] text-sm text-[#fafafa] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-5 border-t border-[#ffffff12]">
          <div>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-[13px] text-[#a1a1a1] hover:text-[#fafafa] underline underline-offset-4 cursor-pointer"
              >
                Edit specifications
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-full bg-[#fafafa] text-[#0a0a0a] text-xs font-medium cursor-pointer"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#ffffff14] text-xs text-[#a1a1a1] hover:text-[#fafafa] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Intent &amp; Wallet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
