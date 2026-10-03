'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore } from '@/store/evaluation';
import { ChevronLeft, ChevronRight, Bed, Bath, Square, Star } from 'lucide-react';

interface PropertyCardData {
  id: string;
  name: string;
  location: string;
  price: number;
  priceFormatted: string;
  bhk: string;
  baths: number;
  area: string;
  rating: string;
  image: string;
  status: string;
}

const properties: PropertyCardData[] = [
  {
    id: 'prop-1',
    name: 'Highland Retreat',
    location: 'Wakad, Pune',
    price: 6800000,
    priceFormatted: '₹68,00,000',
    bhk: '2 BHK',
    baths: 2,
    area: '1,050 sqft',
    rating: '5.0',
    image: '/images/apartment.jpg',
    status: 'RERA Clear',
  },
  {
    id: 'prop-2',
    name: 'Beverly Breeze Villa',
    location: 'Whitefield, Bengaluru',
    price: 14500000,
    priceFormatted: '₹1,45,00,000',
    bhk: '3 BHK',
    baths: 3,
    area: '2,200 sqft',
    rating: '4.8',
    image: '/images/villa.jpg',
    status: 'A-Khata Verified',
  },
  {
    id: 'prop-3',
    name: 'Laurel Canyon Nest',
    location: 'Golf Course Ext., Gurgaon',
    price: 9200000,
    priceFormatted: '₹92,00,000',
    bhk: '3 BHK',
    baths: 2,
    area: '1,480 sqft',
    rating: '4.9',
    image: '/images/property_arch.jpg',
    status: 'OC Received',
  },
  {
    id: 'prop-4',
    name: 'Malibu Ridge Enclave',
    location: 'Ghansoli, Navi Mumbai',
    price: 7800000,
    priceFormatted: '₹78,00,000',
    bhk: '2 BHK',
    baths: 2,
    area: '1,120 sqft',
    rating: '4.7',
    image: '/images/green_valley.jpg',
    status: 'CIDCO Clear',
  },
];

export const FeaturedPropertiesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleSelectProperty = (prop: PropertyCardData) => {
    const id = startNewEvaluation({
      name: prop.name,
      location: prop.location,
      price: prop.price,
      bhk: prop.bhk,
      type: prop.bhk.includes('Villa') ? 'Villa' : 'Apartment',
      possessionStatus: 'Ready to move',
      sourceName: 'Featured Evaluation',
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="featured-properties" className="py-20 md:py-28 bg-[#F8FAFC] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header row with arrows matching Roofin */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Recently Evaluated Properties
            </h2>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Sample completed due diligence reports across major Indian markets
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - Matches Roofin card structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => handleSelectProperty(prop)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Rating Pill */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={prop.image}
                  alt={prop.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Rating badge top right */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-md text-xs font-bold text-slate-800">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{prop.rating}</span>
                </div>

                {/* Status badge bottom left */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-[10px] font-semibold text-white">
                  {prop.status}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {prop.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">{prop.location}</p>
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 shrink-0">
                    {prop.priceFormatted}
                  </span>
                </div>

                {/* Specs row */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.bhk}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.baths} Bath</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Square className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.area}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
