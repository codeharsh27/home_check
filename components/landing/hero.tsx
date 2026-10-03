'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, AlertCircle, SlidersHorizontal, UploadCloud, Edit3, X, CheckCircle2 } from 'lucide-react';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';
import { Navbar } from '@/components/layout/nav';

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
        if (data.property && Object.keys(data.property).length > 2) {
          const id = startNewEvaluation(data.property, false);
          router.push(`/evaluation/${id}/snapshot`);
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

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation({
      sourceName: uploadedFile ? uploadedFile.name : 'Property Brochure',
      name: uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, '') : 'Uploaded Property',
      location: 'India',
    }, false);
    setOptionsModalOpen(false);
    router.push(`/evaluation/${id}/snapshot`);
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
    router.push(`/evaluation/${id}/snapshot`);
  };

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <>
      {/* Outer Padding Container for 1-Glance Framed Aesthetic */}
      <div className="w-full p-2.5 sm:p-4 md:p-6 bg-[#FAF8F5]">
        
        {/* Main Hero Card Container with Rounded Borders from ALL corners */}
        <section
          className="relative w-full h-[92vh] min-h-[600px] max-h-[820px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col justify-between shadow-2xl shadow-stone-900/10 border border-stone-200/60"
          style={{
            backgroundImage: 'url(/images/hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle Natural Daylight Gradient Overlay letting the sky blue shine through */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-blue-950/20 to-slate-950/50 pointer-events-none" />

          {/* Floating Centered Navbar inside rounded container */}
          <Navbar />

          {/* Hero Content - Centered */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-4 max-w-4xl mx-auto w-full">
            
            {/* Small Eyebrow with Gentle Float Animation */}
            <div className="mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] text-blue-400 bg-blue-950/80 border border-blue-500/40 px-3.5 py-1 rounded-full backdrop-blur-md inline-block shadow-lg animate-float">
                BEFORE YOU COMMIT
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight text-white leading-[1.08] max-w-3xl drop-shadow-md">
              Check a Property Before You Commit
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 font-normal max-w-2xl leading-relaxed drop-shadow-sm">
              Understand what you can afford, what you still need to verify, and what to do next — before putting your money down.
            </p>

            {/* Search Intake Pill with Interactive Focus Ring & Border */}
            <form
              id="hero-intake"
              onSubmit={handleStartEvaluation}
              className="mt-6 sm:mt-8 w-full max-w-2xl relative"
            >
              <div className="bg-white rounded-full shadow-2xl p-1.5 sm:p-2 flex items-center gap-2 border-2 border-white/90 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/25 transition-all duration-300">
                
                {/* Single Input */}
                <div className="flex-1 px-4 sm:px-5">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste a property listing URL (MagicBricks, 99acres, Housing...)"
                    className="w-full text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-transparent outline-none font-normal"
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
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer shadow-sm border border-stone-200/60"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] shrink-0 cursor-pointer flex items-center gap-1.5 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Evaluate Property</span>
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

              {/* Sample link below the input */}
              <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-white/80">
                <span>No listing?</span>
                <button
                  type="button"
                  onClick={handleLoadDemo}
                  className="text-white font-semibold underline underline-offset-4 hover:text-blue-300 cursor-pointer transition-colors"
                >
                  Start with a sample property →
                </button>
              </div>
            </form>

          </div>

          {/* Hero Bottom Strip - Minimalist, Clean & Understated */}
          <div className="relative z-10 w-full border-t border-white/15 bg-black/30 backdrop-blur-md py-3.5 px-6">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-10 text-xs text-white/90">
              
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                <span className="font-semibold text-white tracking-tight">Know your real cost</span>
                <span className="text-white/65 hidden sm:inline font-normal">— understand what to arrange</span>
              </div>

              <span className="text-white/25 hidden sm:inline">·</span>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                <span className="font-semibold text-white tracking-tight">Know what to verify</span>
                <span className="text-white/65 hidden sm:inline font-normal">— pending checks &amp; documents</span>
              </div>

              <span className="text-white/25 hidden sm:inline">·</span>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                <span className="font-semibold text-white tracking-tight">Know your next step</span>
                <span className="text-white/65 hidden sm:inline font-normal">— what to do before committing</span>
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
    </>
  );
};
