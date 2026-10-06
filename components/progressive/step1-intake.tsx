'use client';

import React, { useState } from 'react';
import { PropertyDetails } from '@/types';
import { Building2, MapPin, Tag, Maximize2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      possessionStatus: formData.possessionStatus as any,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          Step 1 of 5 • Intake Review
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
          Property Baseline & Extraction
        </h1>
        <p className="text-sm text-stone-500">
          We extracted the initial specifications of this property. Verify the asking price and carpet area before evaluating the micro-market.
        </p>
      </div>

      {/* Main Extracted Card */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {property.type || 'Apartment'} • {property.bhk || '2 BHK'}
              </span>
              {property.reraId && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> RERA: {property.reraId}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {property.name || 'Shortlisted Property'}
            </h2>
            <p className="text-sm text-stone-500 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              {property.location || 'Locality not specified'}
              {property.city ? `, ${property.city}` : ''}
            </p>
          </div>

          <div className="text-left sm:text-right bg-stone-50 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none">
            <div className="text-xs text-stone-600 font-medium">Asking Price</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {property.price > 0
                ? property.price >= 10000000
                  ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                  : `₹${(property.price / 100000).toFixed(2)} Lakh`
                : '₹ Price Unspecified'}
            </div>
            {ratePerSqFt && (
              <div className="text-xs text-blue-700 font-semibold mt-0.5">
                ₹{ratePerSqFt.toLocaleString('en-IN')} / sq.ft carpet
              </div>
            )}
          </div>
        </div>

        {/* Quick Spec Matrix */}
        {!isEditing ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <div className="text-xs text-stone-600 font-medium">Carpet Area</div>
              <div className="text-sm font-semibold text-stone-800 mt-1">
                {property.carpetArea ? `${property.carpetArea} sq.ft` : 'Not specified'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <div className="text-xs text-stone-600 font-medium">Developer / Seller</div>
              <div className="text-sm font-semibold text-stone-800 mt-1 truncate">
                {property.developer || 'Private Owner / Agent'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <div className="text-xs text-stone-600 font-medium">Possession Stage</div>
              <div className="text-sm font-semibold text-stone-800 mt-1">
                {property.possessionStatus || 'Under construction'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
              <div className="text-xs text-stone-600 font-medium">Source Listing</div>
              <div className="text-sm font-semibold text-stone-800 mt-1 truncate">
                {property.sourceUrl ? (
                  <a
                    href={property.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    View Source <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  property.sourceName || 'Manual Entry'
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Editable Form Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50/70 p-5 rounded-xl border border-stone-200">
            <div>
              <label className="text-xs font-semibold text-stone-700">Project / Building Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">Asking Price (₹)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">Locality</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">Carpet Area (sq.ft)</label>
              <Input
                type="number"
                value={formData.carpetArea}
                onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">Developer Name</label>
              <Input
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700">RERA Registration ID</label>
              <Input
                value={formData.reraId}
                onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                className="mt-1 bg-white"
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <div>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline py-1"
              >
                Edit extracted details
              </button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <Button
            onClick={onNext}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm inline-flex items-center justify-center gap-2"
          >
            Confirm & Define Goals <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
