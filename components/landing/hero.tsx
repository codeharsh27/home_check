'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, AlertCircle, SlidersHorizontal, UploadCloud, Edit3, X, FileText, CheckCircle2 } from 'lucide-react';
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
      <section
        className="relative min-h-[680px] md:min-h-[760px] lg:min-h-[820px] flex flex-col justify-between"
        style={{
          backgroundImage: 'url(/images/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle Natural Daylight Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-900/30 to-slate-950/75" />

        {/* Floating Centered Navbar */}
        <Navbar />

        {/* Hero Content - Moved downward with ample gap from navbar */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-44 sm:pt-48 md:pt-52 pb-16 max-w-5xl mx-auto w-full">
          
          {/* New Headline - High Trust, Direct, Impactful */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl drop-shadow-md">
            Know Every Detail Before You Make an Offer
          </h1>

          {/* Subtitle with generous spacing */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-white/90 font-normal max-w-2xl leading-relaxed drop-shadow-sm">
            Uncover hidden legal risks, bank loan limits, and true out-of-pocket costs for any shortlisted property in India.
          </p>

          {/* Search Intake Pill - Simplified Single Input with Options Icon */}
          <form
            onSubmit={handleStartEvaluation}
            className="mt-10 w-full max-w-2xl relative"
          >
            <div className="bg-white rounded-full shadow-2xl p-2 sm:p-2.5 flex items-center gap-2 border border-white/60">
              
              {/* Single Input: Paste link from MagicBricks, NoBroker, etc. */}
              <div className="flex-1 px-4 sm:px-5">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste property link from MagicBricks, 99acres, NoBroker, Housing..."
                  className="w-full text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-transparent outline-none font-normal"
                />
              </div>

              {/* Options Icon Button (Opens popup modal) */}
              <button
                type="button"
                onClick={() => {
                  setActiveModalTab('menu');
                  setOptionsModalOpen(true);
                }}
                title="Upload brochure or manual entry"
                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Circular Search / Analyze Button */}
              <button
                type="submit"
                disabled={isLoading}
                aria-label="Analyze property"
                className="w-12 h-12 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>

            {parseError && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-200 bg-slate-900/70 backdrop-blur-md px-4 py-2 rounded-full mx-auto w-fit">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Quick Demo Link */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/80">
              <span>Or try an instant sample:</span>
              <button
                type="button"
                onClick={handleLoadDemo}
                className="text-white font-semibold underline underline-offset-4 hover:text-blue-200 cursor-pointer transition-colors"
              >
                Wakad, Pune · 2 BHK · ₹68 Lakhs →
              </button>
            </div>
          </form>

        </div>

        {/* Bottom Stats Strip - Translucent Glass Bar */}
        <div className="relative z-10 w-full border-t border-white/20 bg-slate-950/35 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20 text-center">
            <div className="py-2 sm:py-0 px-4">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4,200+</p>
              <p className="text-xs text-white/70 font-medium mt-0.5">Properties verified before token deposit</p>
            </div>
            <div className="py-2 sm:py-0 px-4">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">14+ Metros</p>
              <p className="text-xs text-white/70 font-medium mt-0.5">State RERA & stamp duty rules integrated</p>
            </div>
            <div className="py-2 sm:py-0 px-4">
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">100% Unbiased</p>
              <p className="text-xs text-white/70 font-medium mt-0.5">Zero broker commissions, buyer-first guidance</p>
            </div>
          </div>
        </div>
      </section>

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
