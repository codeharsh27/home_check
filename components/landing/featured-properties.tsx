'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEvaluationStore } from '@/store/evaluation';
import { ChevronLeft, ChevronRight, Bed, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface PropertyCardData {
  id: string;
  name: string;
  location: string;
  price: number;
  priceFormatted: string;
  bhk: string;
  area: string;
  checksCompleted: string;
  image: string;
  keyFinding: string;
}

const evaluatedReports: PropertyCardData[] = [
  {
    id: 'prop-1',
    name: 'Highland Greens 2BHK',
    location: 'Wakad, Pune',
    price: 6800000,
    priceFormatted: '₹68,00,000',
    bhk: '2 BHK',
    area: '1,050 sqft',
    checksCompleted: '14 of 18 Papers Tracked',
    image: '/images/apartment.jpg',
    keyFinding: '₹4.76L Stamp Duty Planned',
  },
  {
    id: 'prop-2',
    name: 'Beverly Breeze Villa',
    location: 'Whitefield, Bengaluru',
    price: 14500000,
    priceFormatted: '₹1,45,00,000',
    bhk: '3 BHK',
    area: '2,200 sqft',
    checksCompleted: 'A-Khata Checklist Configured',
    image: '/images/villa.jpg',
    keyFinding: '80% LTV Loan Modelled',
  },
  {
    id: 'prop-3',
    name: 'Laurel Canyon Tower',
    location: 'Golf Course Ext., Gurgaon',
    price: 9200000,
    priceFormatted: '₹92,00,000',
    bhk: '3 BHK',
    area: '1,480 sqft',
    checksCompleted: '16 Stage Milestones Tracked',
    image: '/images/property_arch.jpg',
    keyFinding: 'RERA Completion Date Checked',
  },
  {
    id: 'prop-4',
    name: 'Malibu Ridge Enclave',
    location: 'Ghansoli, Navi Mumbai',
    price: 7800000,
    priceFormatted: '₹78,00,000',
    bhk: '2 BHK',
    area: '1,120 sqft',
    checksCompleted: 'Full Society OC Verified',
    image: '/images/green_valley.jpg',
    keyFinding: 'Down Payment Fully Funded',
  },
];

export const FeaturedPropertiesSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const handleSelectReport = (prop: PropertyCardData) => {
    const id = startNewEvaluation({
      name: prop.name,
      location: prop.location,
      price: prop.price,
      bhk: prop.bhk,
      type: prop.bhk.includes('Villa') ? 'Villa' : 'Apartment',
      possessionStatus: 'Ready to move',
      sourceName: 'Sample Evaluation Report',
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <section id="featured-properties" className="py-20 md:py-28 bg-[#F5F2EB] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>DUE DILIGENCE CASE STUDIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900">
              Evaluations Built by Real Home Buyers
            </h2>
            <p className="text-sm text-stone-500 font-normal mt-1 max-w-xl">
              See how buyers use HomeCheck to organize shortlisted properties, verify document checklists, and compute their true capital requirements before signing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              className="w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-50 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-50 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {evaluatedReports.map((report) => (
            <div
              key={report.id}
              onClick={() => handleSelectReport(report)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <Image
                  src={report.image}
                  alt={report.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Key Finding Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950/80 backdrop-blur-md text-[11px] font-semibold text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{report.keyFinding}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {report.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-normal mt-0.5">{report.location}</p>
                  </div>
                  <span className="text-sm font-extrabold text-stone-900 shrink-0">
                    {report.priceFormatted}
                  </span>
                </div>

                <div className="text-xs text-blue-700 bg-blue-50/70 border border-blue-100 rounded-lg px-2.5 py-1.5 font-medium">
                  {report.checksCompleted}
                </div>

                {/* Specs row */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-stone-400" />
                    <span>{report.bhk}</span>
                  </div>
                  <span>{report.area}</span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
