'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link2, Upload, Edit3, ArrowRight, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEvaluationStore, DEMO_PROPERTY } from '@/store/evaluation';

export const IntakeWidget: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [activeTab, setActiveTab] = useState<'url' | 'upload' | 'manual'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const [manualData, setManualData] = useState({
    name: '',
    location: '',
    price: '',
    type: 'Apartment' as 'Apartment' | 'Villa' | 'Plot' | 'Independent House' | 'Other',
    bhk: '',
    developer: '',
    possessionStatus: '' as '' | 'Ready to move' | 'Under construction' | 'Pre-launch',
  });

  const handleStartWithUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsLoading(true);
    setParseError(null);

    try {
      const res = await fetch('/api/parse-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });
      const data = await res.json();

      if (data.property && Object.keys(data.property).length > 2) {
        const id = startNewEvaluation(data.property, false);
        router.push(`/evaluation/${id}/snapshot`);
      } else {
        if (data.error) setParseError(`${data.error} — you can fill in the details on the next screen.`);
        const id = startNewEvaluation({ sourceUrl: urlInput, sourceName: 'Listing URL' }, false);
        router.push(`/evaluation/${id}/snapshot`);
      }
    } catch {
      setParseError('Could not reach the URL. You can fill in details manually on the next screen.');
      const id = startNewEvaluation({ sourceUrl: urlInput, sourceName: 'Listing URL' }, false);
      router.push(`/evaluation/${id}/snapshot`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartWithFile = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation(
      { sourceName: uploadedFile ? uploadedFile.name : 'Brochure document' },
      false
    );
    router.push(`/evaluation/${id}/snapshot`);
  };

  const handleStartManual = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation(
      {
        name: manualData.name || undefined,
        location: manualData.location || undefined,
        price: parseFloat(manualData.price) || undefined,
        type: manualData.type,
        bhk: manualData.bhk || undefined,
        developer: manualData.developer || undefined,
        possessionStatus: manualData.possessionStatus || undefined,
        sourceName: 'Manual entry',
      },
      false
    );
    router.push(`/evaluation/${id}/snapshot`);
  };

  const handleLoadDemo = () => {
    const id = startNewEvaluation(DEMO_PROPERTY, true);
    router.push(`/evaluation/${id}/snapshot`);
  };

  const tabs = [
    { id: 'url' as const, label: 'Paste listing URL', icon: <Link2 className="w-3.5 h-3.5" /> },
    { id: 'upload' as const, label: 'Upload brochure', icon: <Upload className="w-3.5 h-3.5" /> },
    { id: 'manual' as const, label: 'Enter manually', icon: <Edit3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full bg-[#121212] border border-[#252525] rounded-xl overflow-hidden shadow-2xl">
      {/* Tabs */}
      <div className="flex border-b border-[#222222] bg-[#0E0E0E]">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#5B8BDF] text-[#EDEDED] bg-[#141414]'
                : 'border-transparent text-[#777777] hover:text-[#AAAAAA] hover:bg-[#111111]'
            }`}>
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* URL Tab */}
        {activeTab === 'url' && (
          <form onSubmit={handleStartWithUrl} className="space-y-4">
            <p className="text-xs text-[#888888]">Paste a listing from MagicBricks, 99acres, Housing.com, or any developer website:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="https://www.magicbricks.com/property/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="font-mono text-xs"
              />
              <Button type="submit" size="md" className="shrink-0" disabled={isLoading || !urlInput.trim()}>
                {isLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Parsing...</span></>
                  : <><span>Start evaluation</span><ArrowRight className="w-4 h-4" /></>}
              </Button>
            </div>
            {parseError && (
              <div className="flex items-center gap-2 text-xs text-[#E6832A] bg-[#E6832A]/10 border border-[#E6832A]/20 p-2.5 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{parseError}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-[#555555]">
              <span>Want to try a demo?</span>
              <button type="button" onClick={handleLoadDemo} className="text-[#5B8BDF] hover:underline cursor-pointer">
                Load demo property (₹68L 2BHK Wakad, Pune)
              </button>
            </div>
          </form>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <form onSubmit={handleStartWithFile} className="space-y-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]);
              }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive ? 'border-[#5B8BDF] bg-[#5B8BDF]/5'
                : uploadedFile ? 'border-[#3F9E6C]/50 bg-[#3F9E6C]/5'
                : 'border-[#282828] hover:border-[#383838] bg-[#0F0F0F]'
              }`}>
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3 text-[#3F9E6C]">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs font-mono">{uploadedFile.name}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-6 h-6 mx-auto text-[#555555]" />
                  <div className="space-y-1">
                    <p className="text-xs text-[#888888]">Drop property brochure, floor plan, or brochure screenshot</p>
                    <p className="text-[11px] text-[#555555]">PDF, PNG, JPG supported</p>
                  </div>
                  <label className="inline-block text-xs font-medium text-[#5B8BDF] hover:underline cursor-pointer">
                    Browse file
                    <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => { if (e.target.files?.[0]) setUploadedFile(e.target.files[0]); }}
                    />
                  </label>
                </div>
              )}
            </div>
            <Button type="submit" size="md" className="w-full">
              <span>Continue with file</span><ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* Manual Tab */}
        {activeTab === 'manual' && (
          <form onSubmit={handleStartManual} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Property name / Project"
                value={manualData.name}
                onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                placeholder="e.g. Lodha Palava City"
              />
              <Input
                label="Location (Area, City)"
                value={manualData.location}
                onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
                placeholder="e.g. Dombivli, Thane"
              />
              <Input
                label="Listed price (₹)"
                type="number"
                value={manualData.price}
                onChange={(e) => setManualData({ ...manualData, price: e.target.value })}
                placeholder="e.g. 6800000"
                className="font-mono"
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">Property type</label>
                <select
                  value={manualData.type}
                  onChange={(e) => setManualData({ ...manualData, type: e.target.value as any })}
                  className="w-full bg-[#181818] border border-[#2B2B2B] text-[#EDEDED] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5B8BDF] focus:ring-1 focus:ring-[#5B8BDF]/30">
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input
                label="BHK / Configuration"
                value={manualData.bhk}
                onChange={(e) => setManualData({ ...manualData, bhk: e.target.value })}
                placeholder="e.g. 2 BHK"
              />
              <Input
                label="Developer / Builder"
                value={manualData.developer}
                onChange={(e) => setManualData({ ...manualData, developer: e.target.value })}
                placeholder="e.g. Lodha Group"
              />
            </div>
            <Button type="submit" size="md" className="w-full">
              <span>Create property snapshot</span><ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
