'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, AlertCircle, SlidersHorizontal, UploadCloud, Edit3, X, CheckCircle2 } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { HeroNavbar } from '@/components/layout/nav';
import { ExtractionOverlay } from '@/components/landing/extraction-overlay';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Options Popover / Modal state
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'menu' | 'upload' | 'manual'>('menu');

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Manual form state
  const [manualData, setManualData] = useState({
    name: '',
    location: '',
    price: '',
    bhk: '2 BHK',
    type: 'Apartment' as 'Apartment' | 'Villa' | 'Plot',
  });

  const handleStartEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) {
      handleLoadDemo();
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
        if (data.property && (data.property.name || data.property.price || data.property.location)) {
          const id = startNewEvaluation(data.property, false);
          router.push(`/evaluation/${id}`);
          return;
        }
      }

      // Fallback for direct input or text
      const id = startNewEvaluation({
        sourceUrl: trimmed.startsWith('http') ? trimmed : undefined,
        name: trimmed.startsWith('http') ? 'Shortlisted Property' : trimmed,
        location: 'Pune, Maharashtra',
        price: 6800000,
        sourceName: 'Search Intake',
      }, false);
      router.push(`/evaluation/${id}`);
    } catch {
      const id = startNewEvaluation({
        name: trimmed || 'Shortlisted Property',
        location: 'India',
        sourceName: 'Direct Search',
      }, false);
      router.push(`/evaluation/${id}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation({
      sourceName: uploadedFile ? uploadedFile.name : 'Property Brochure',
      name: uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, '') : 'Uploaded Property',
      location: 'India',
    }, false);
    setOptionsModalOpen(false);
    router.push(`/evaluation/${id}`);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(manualData.price.replace(/[^0-9.]/g, '')) || 6500000;
    const id = startNewEvaluation({
      name: manualData.name || 'Shortlisted Property',
      location: manualData.location || 'India',
      price: parsedPrice,
      bhk: manualData.bhk,
      type: manualData.type,
      sourceName: 'Manual Entry',
    }, false);
    setOptionsModalOpen(false);
    router.push(`/evaluation/${id}`);
  };

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}`);
  };

  return (
    <>
      {/* Outer Padding Container for 1-Glance Framed Aesthetic */}
      <div className="w-full p-2.5 sm:p-4 md:p-6 bg-[#08090B]">
        
        {/* Main Hero Card Container with Rounded Borders from ALL corners */}
        <section
          className="relative w-full min-h-[580px] sm:min-h-[640px] lg:h-[90vh] max-h-[820px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col justify-between shadow-[0_20px_80px_-20px_rgba(0,0,0,0.9)] border border-white/10"
          style={{
            backgroundImage: 'url(/images/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle Natural Daylight Gradient Overlay letting the sky blue shine through */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/40 to-slate-950/80 pointer-events-none" />

          {/* Floating Centered Navbar inside rounded rectangular hero image container */}
          <HeroNavbar />

          {/* Hero Content - Centered */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-3 sm:px-6 pt-20 sm:pt-28 pb-4 max-w-4xl mx-auto w-full">
            
            {/* Small Eyebrow with Gentle Float Animation */}
            <div className="mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[2px] text-stone-300 bg-white/[0.06] border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-block shadow-lg">
                PROPERTY DUE DILIGENCE // STAGE-GATED
              </span>
            </div>

            {/* Main Headline with Serif Typography */}
            <h1 className="text-3xl sm:text-5xl md:text-[62px] font-serif font-normal tracking-tight text-white leading-[1.08] max-w-3xl drop-shadow-md">
              Never commit ₹1 Crore blindly.
            </h1>

            {/* Supporting Text */}
            <p className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-stone-300 font-sans font-normal max-w-2xl leading-relaxed drop-shadow-sm px-2">
              Buying a home is your lifetime’s largest investment. Uncover the true possession cash drain, stage-gated legal risks, and micro-market negotiation leverage before paying token money.
            </p>

            {/* Search Intake Pill with Interactive Focus Ring & Kero AI Glassmorphism */}
            <form
              id="hero-intake"
              onSubmit={handleStartEvaluation}
              className="mt-6 sm:mt-8 w-full max-w-2xl relative"
            >
              <div className="bg-[#121316]/90 rounded-full shadow-[0_0_50px_-10px_rgba(91,139,223,0.35)] p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 border border-white/20 backdrop-blur-xl focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all duration-300">
                
                {/* Single Input */}
                <div className="flex-1 px-3 sm:px-5">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste listing URL (Housing, NoBroker, 99acres...)"
                    className="w-full text-xs sm:text-sm text-white placeholder-stone-400 bg-transparent outline-none font-mono"
                  />
                </div>

                {/* Options Icon Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalTab('menu');
                    setOptionsModalOpen(true);
                  }}
                  title="Upload brochure or manual entry"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-stone-300 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer border border-white/10"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Primary CTA Button (High-Contrast Kero White) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 sm:px-7 py-2 sm:py-3 rounded-full bg-white hover:bg-stone-200 text-stone-900 text-xs sm:text-sm font-mono font-bold shadow-xl transition-all hover:scale-[1.02] shrink-0 cursor-pointer flex items-center gap-1.5 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                  ) : (
                    <>
                      <span>Analyse <span className="hidden sm:inline">Listing</span></span>
                      <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {parseError && (
                <div className="mt-3 flex items-center gap-2 text-xs text-amber-200 bg-slate-950/80 border border-amber-500/30 backdrop-blur-md px-4 py-2 rounded-full mx-auto w-fit shadow-lg">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{parseError}</span>
                </div>
              )}

              {/* Sample link chips below the input */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-stone-400">
                <span>Or load live audit:</span>
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-stone-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  Wakad, Pune (2BHK · ₹68L) →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = startNewEvaluation({
                      name: 'Prestige Lakeside Habitat',
                      location: 'Whitefield, Bengaluru',
                      city: 'Bengaluru',
                      state: 'Karnataka',
                      price: 14500000,
                      carpetArea: 1650,
                      bhk: '3 BHK',
                      developer: 'Prestige Group',
                      possessionStatus: 'Ready to move',
                      reraId: 'PRM/KA/RERA/1251/310/PR/170915/000176',
                      sourceName: 'Sample Bengaluru Listing',
                    }, false);
                    router.push(`/evaluation/${id}`);
                  }}
                  className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-stone-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  Whitefield, BLR (3BHK · ₹1.45 Cr) →
                </button>
              </div>
            </form>

          </div>

          {/* Hero Bottom Strip - Minimalist, Clean & Understated */}
          <div className="relative z-10 w-full border-t border-white/15 bg-black/30 backdrop-blur-md py-3.5 px-6">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-10 text-xs text-white/90">
              
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                <span className="font-semibold text-white tracking-tight">Handover Cash Drain</span>
                <span className="text-white/65 hidden sm:inline font-normal">— Down payment + Stamp duty + Corpus</span>
              </div>

              <span className="text-white/25 hidden sm:inline">·</span>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                <span className="font-semibold text-white tracking-tight">Stage-Gated Verification</span>
                <span className="text-white/65 hidden sm:inline font-normal">— Token, Agreement &amp; Handover</span>
              </div>

              <span className="text-white/25 hidden sm:inline">·</span>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                <span className="font-semibold text-white tracking-tight">Nearby Comparables</span>
                <span className="text-white/65 hidden sm:inline font-normal">— Benchmarked within 2-4 km</span>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Options Popup Modal (Upload Brochure / Manual Entry) */}
      {optionsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-white">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-stone-900">
                  {activeModalTab === 'menu' && 'Add Property Details'}
                  {activeModalTab === 'upload' && 'Upload Property Brochure'}
                  {activeModalTab === 'manual' && 'Enter Property Manually'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOptionsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              
              {/* Option 1 & 2 Cards Menu */}
              {activeModalTab === 'menu' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-600 font-normal">
                    Choose how you want to add your shortlisted property:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option 1: Upload Brochure */}
                    <div
                      onClick={() => setActiveModalTab('upload')}
                      className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer text-left space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                          Upload Brochure
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Drop PDF brochure, floor plan, or project layout image.
                        </p>
                      </div>
                    </div>

                    {/* Option 2: Manual Entry */}
                    <div
                      onClick={() => setActiveModalTab('manual')}
                      className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer text-left space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                          Manual Entry
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Type project name, price, city, and BHK directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Tab */}
              {activeModalTab === 'upload' && (
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]);
                    }}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50/50'
                        : uploadedFile
                        ? 'border-emerald-500 bg-emerald-50/40'
                        : 'border-stone-300 bg-white hover:border-stone-400'
                    }`}
                  >
                    {uploadedFile ? (
                      <div className="flex flex-col items-center gap-2 text-emerald-700">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        <span className="text-xs font-semibold">{uploadedFile.name}</span>
                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="text-[11px] text-stone-500 hover:text-stone-800 underline mt-1 cursor-pointer"
                        >
                          Choose different file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <UploadCloud className="w-8 h-8 mx-auto text-stone-400" />
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-stone-800">Drag &amp; drop your brochure or floor plan</p>
                          <p className="text-[11px] text-stone-500">PDF, PNG, JPG supported</p>
                        </div>
                        <label className="inline-block px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700 cursor-pointer transition-colors">
                          Browse File
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

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('menu')}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!uploadedFile}
                      className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md disabled:opacity-50 transition-all cursor-pointer"
                    >
                      Continue with Brochure
                    </button>
                  </div>
                </form>
              )}

              {/* Manual Tab */}
              {activeModalTab === 'manual' && (
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Property / Project Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Godrej Horizon"
                        value={manualData.name}
                        onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">City / Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Pune, Maharashtra"
                        value={manualData.location}
                        onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Quoted Price (₹)</label>
                      <input
                        type="text"
                        placeholder="e.g. 75,00,000"
                        value={manualData.price}
                        onChange={(e) => setManualData({ ...manualData, price: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Configuration</label>
                      <select
                        value={manualData.bhk}
                        onChange={(e) => setManualData({ ...manualData, bhk: e.target.value })}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 outline-none focus:border-blue-500"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4+ BHK">4+ BHK</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Property Type</label>
                      <select
                        value={manualData.type}
                        onChange={(e) => setManualData({ ...manualData, type: e.target.value as any })}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-800 outline-none focus:border-blue-500"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Plot">Plot</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalTab('menu')}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                    >
                      Create Evaluation
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>
      )}

      {/* Awaiting Extraction Scanning Animation Overlay */}
      <ExtractionOverlay isOpen={isLoading} url={urlInput} />
    </>
  );
};
