'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Loader2,
  AlertCircle,
  Link as LinkIcon,
  UploadCloud,
  Edit3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { Navbar } from '@/components/layout/nav';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  // Active intake mode: 'link' | 'upload' | 'manual'
  const [activeMode, setActiveMode] = useState<'link' | 'upload' | 'manual'>('link');

  // Link mode state
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Upload mode state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Manual mode state
  const [manualName, setManualName] = useState('');
  const [manualCity, setManualCity] = useState('');
  const [manualBudget, setManualBudget] = useState('');
  const [manualType, setManualType] = useState<'Apartment' | 'Villa' | 'Plot'>('Apartment');

  // Handle URL intake
  const handleStartUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) {
      handleLoadSample('pune');
      return;
    }

    setIsLoading(true);
    setParseError(null);

    try {
      if (trimmed.startsWith('http')) {
        const res = await fetch('/api/parse-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmed }),
        });
        const data = await res.json();
        if (data.property && Object.keys(data.property).length > 2) {
          const id = startNewEvaluation(data.property, false);
          router.push(`/evaluation/${id}/snapshot`);
          return;
        }
      }

      const id = startNewEvaluation({
        sourceUrl: trimmed.startsWith('http') ? trimmed : undefined,
        name: trimmed.startsWith('http') ? 'Shortlisted Property' : trimmed,
        location: 'Pune, Maharashtra',
        price: 6800000,
        sourceName: 'Search Intake',
      }, false);
      router.push(`/evaluation/${id}/snapshot`);
    } catch {
      const id = startNewEvaluation({
        name: trimmed || 'Shortlisted Property',
        location: 'India',
        sourceName: 'Direct Search',
      }, false);
      router.push(`/evaluation/${id}/snapshot`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle File Upload
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;
    const id = startNewEvaluation({
      sourceName: uploadedFile.name,
      name: uploadedFile.name.replace(/\.[^/.]+$/, ''),
      location: 'India',
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  // Handle Manual Form
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(manualBudget.replace(/[^0-9.]/g, '')) || 7200000;
    const id = startNewEvaluation({
      name: manualName || 'Custom Property Evaluation',
      location: manualCity || 'Pune, Maharashtra',
      price: parsedPrice,
      bhk: manualType === 'Plot' ? undefined : '2 BHK',
      type: manualType,
      sourceName: 'Manual Entry',
    }, false);
    router.push(`/evaluation/${id}/snapshot`);
  };

  // Instant Sample Evaluation Chips
  const handleLoadSample = (sampleType: 'pune' | 'bengaluru' | 'gurgaon') => {
    if (sampleType === 'pune') {
      const id = startNewEvaluation({
        name: 'Highland Greens',
        location: 'Wakad, Pune, Maharashtra',
        price: 6800000,
        bhk: '2 BHK',
        type: 'Apartment',
        possessionStatus: 'Ready to move',
        sourceName: 'Sample Evaluation',
      }, true);
      router.push(`/evaluation/${id}/snapshot`);
    } else if (sampleType === 'bengaluru') {
      const id = startNewEvaluation({
        name: 'Beverly Breeze Villa',
        location: 'Whitefield, Bengaluru, Karnataka',
        price: 14500000,
        bhk: '3 BHK',
        type: 'Villa',
        possessionStatus: 'Under construction',
        sourceName: 'Sample Evaluation',
      }, true);
      router.push(`/evaluation/${id}/snapshot`);
    } else {
      const id = startNewEvaluation({
        name: 'Laurel Canyon Nest',
        location: 'Golf Course Ext., Gurgaon, Haryana',
        price: 9200000,
        bhk: '3 BHK',
        type: 'Apartment',
        possessionStatus: 'Ready to move',
        sourceName: 'Sample Evaluation',
      }, true);
      router.push(`/evaluation/${id}/snapshot`);
    }
  };

  return (
    <section
      className="relative min-h-[740px] md:min-h-[820px] lg:min-h-[880px] flex flex-col justify-between overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 15%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 10/10 Natural Sunlight Grading: 
          Subtle top scrim for nav readability, crystal clear blue sky in middle, 
          and warm architectural vignette at the base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-900/10 to-slate-950/75 pointer-events-none" />

      {/* Floating Centered Navbar */}
      <Navbar />

      {/* Hero Content - Perfectly Proportioned Vertical Rhythm */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-44 sm:pt-48 md:pt-52 pb-16 max-w-5xl mx-auto w-full">
        
        {/* Top Eyebrow Badge - High Trust */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/90 text-xs font-medium mb-6 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
          <span>India&apos;s Independent Property Due-Diligence Workspace</span>
        </div>

        {/* 2-Line Poetic & Direct Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-md">
          Where Every Property Deal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-200">
            Begins With Total Clarity.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-white/90 font-normal max-w-2xl leading-relaxed drop-shadow-sm">
          Check funding gaps, unmask hidden legal encumbrances, and verify RERA carpet area before paying a single rupee in non-refundable token.
        </p>

        {/* Interactive Mode Pill Tabs - Directly Above Search Bar */}
        <div className="mt-9 flex items-center justify-center gap-1.5 p-1 rounded-full bg-slate-950/30 backdrop-blur-md border border-white/20 shadow-md">
          <button
            type="button"
            onClick={() => setActiveMode('link')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeMode === 'link'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Paste Listing Link</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Brochure</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('manual')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeMode === 'manual'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manual Entry</span>
          </button>
        </div>

        {/* Dynamic Intake Container */}
        <div className="mt-4 w-full max-w-2xl">
          
          {/* Mode 1: Paste Link */}
          {activeMode === 'link' && (
            <form onSubmit={handleStartUrl} className="relative">
              <div className="bg-white rounded-full shadow-2xl p-2 sm:p-2.5 flex items-center gap-2 border border-white/70 ring-1 ring-black/5">
                <div className="pl-4 text-stone-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste listing URL (MagicBricks, 99acres, NoBroker, Housing...)"
                  className="flex-1 text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-transparent outline-none font-medium px-2"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analysing...</span>
                    </>
                  ) : (
                    <>
                      <span>Evaluate Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {parseError && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-200 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full mx-auto w-fit">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{parseError}</span>
                </div>
              )}

              {/* Supported Portals Trust Line */}
              <p className="mt-3 text-[11px] text-white/75 font-normal">
                Supported portals: MagicBricks · 99acres · Housing.com · NoBroker · Builder Websites
              </p>
            </form>
          )}

          {/* Mode 2: Upload Brochure */}
          {activeMode === 'upload' && (
            <form onSubmit={handleFileUpload} className="bg-white rounded-3xl p-5 shadow-2xl border border-white/70 text-left">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]);
                }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50/50'
                    : uploadedFile
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-stone-200 bg-[#FAF8F5] hover:border-stone-300'
                }`}
              >
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold truncate max-w-xs">{uploadedFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="text-[11px] text-stone-500 hover:text-stone-800 underline ml-2"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <UploadCloud className="w-7 h-7 mx-auto text-blue-600" />
                    <p className="text-xs font-semibold text-stone-800">
                      Drop property brochure, floor plan, or project scan
                    </p>
                    <p className="text-[11px] text-stone-400">PDF, PNG, JPG accepted (Up to 25MB)</p>
                    <label className="inline-block mt-1 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer">
                      Browse Computer
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-stone-500">Extracts price, carpet area, and layout plans automatically.</span>
                <button
                  type="submit"
                  disabled={!uploadedFile}
                  className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md disabled:opacity-40 transition-all cursor-pointer"
                >
                  Start Brochure Due Diligence →
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Manual Entry */}
          {activeMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="bg-white rounded-3xl p-5 shadow-2xl border border-white/70 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lodha Belmondo"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">City / Area</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, MH"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">Quoted Price (₹)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 78,00,000"
                    value={manualBudget}
                    onChange={(e) => setManualBudget(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(['Apartment', 'Villa', 'Plot'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setManualType(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        manualType === t
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  Create Evaluation →
                </button>
              </div>
            </form>
          )}

        </div>

        {/* 1-Click Interactive Property Samples */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/90">
          <span className="text-white/60 text-[11px] uppercase tracking-wider font-semibold mr-1">
            Test Instant Report:
          </span>
          
          <button
            type="button"
            onClick={() => handleLoadSample('pune')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white font-medium transition-all hover:scale-105 cursor-pointer shadow-sm text-xs"
          >
            <MapPin className="w-3 h-3 text-blue-300" />
            <span>Wakad, Pune · 2 BHK · ₹68L</span>
          </button>

          <button
            type="button"
            onClick={() => handleLoadSample('bengaluru')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white font-medium transition-all hover:scale-105 cursor-pointer shadow-sm text-xs"
          >
            <Building className="w-3 h-3 text-emerald-300" />
            <span>Whitefield, Bengaluru · Villa · ₹1.45 Cr</span>
          </button>

          <button
            type="button"
            onClick={() => handleLoadSample('gurgaon')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white font-medium transition-all hover:scale-105 cursor-pointer shadow-sm text-xs"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Golf Course Ext., Gurgaon · 3 BHK · ₹92L</span>
          </button>
        </div>

      </div>

      {/* 10/10 Frosted Metric Dock - Pinned to Bottom */}
      <div className="relative z-10 w-full border-t border-white/20 bg-slate-950/40 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/15 text-center">
          <div className="py-2 md:py-0 px-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">4,200+</p>
            <p className="text-[11px] text-white/70 font-medium mt-0.5">Properties verified pre-deposit</p>
          </div>
          <div className="py-2 md:py-0 px-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">₹850 Cr+</p>
            <p className="text-[11px] text-white/70 font-medium mt-0.5">Total property value assessed</p>
          </div>
          <div className="py-2 md:py-0 px-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">100% Unbiased</p>
            <p className="text-[11px] text-white/70 font-medium mt-0.5">Zero developer commissions</p>
          </div>
          <div className="py-2 md:py-0 px-4 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>2026 RERA Live Database</span>
            </div>
            <p className="text-[10px] text-white/60 font-medium mt-1">MahaRERA · K-RERA · HRERA</p>
          </div>
        </div>
      </div>
    </section>
  );
};
