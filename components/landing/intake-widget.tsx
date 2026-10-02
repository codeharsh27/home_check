"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Upload, Edit3, ArrowRight, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvaluationStore } from "@/store/evaluation";

export const IntakeWidget: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [activeTab, setActiveTab] = useState<"url" | "upload" | "manual">("url");
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Manual form state
  const [manualData, setManualData] = useState({
    name: "Green Valley Residency",
    location: "Wakad, Pune",
    price: "6800000",
    type: "Apartment" as const,
  });

  const handleStartWithUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/property/parse-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput || "https://magicbricks.com/property/2bhk-pune" }),
      });

      const data = await res.json();
      const propertyData = data.property || {
        sourceUrl: urlInput,
        sourceName: "Property Listing Link",
      };

      const id = startNewEvaluation(propertyData);
      router.push(`/evaluation/${id}/snapshot`);
    } catch (err) {
      const id = startNewEvaluation({
        sourceUrl: urlInput || "https://magicbricks.com/property/demo-pune",
        sourceName: "Property Listing URL",
      });
      router.push(`/evaluation/${id}/snapshot`);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWithFile = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation({
      name: uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, "") : "Uploaded Brochure Property",
      sourceName: uploadedFile ? uploadedFile.name : "Brochure Document",
    });
    router.push(`/evaluation/${id}/snapshot`);
  };

  const handleStartManual = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation({
      name: manualData.name,
      location: manualData.location,
      price: parseFloat(manualData.price) || 6800000,
      type: manualData.type,
      sourceName: "Manual User Entry",
    });
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <div className="w-full bg-[#111827]/90 backdrop-blur-xl border border-[#374151] rounded-2xl overflow-hidden shadow-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-[#1F2937] bg-[#0F172A]/70">
        <button
          onClick={() => setActiveTab("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "url"
              ? "border-[#2563EB] text-[#F9FAFB] bg-[#111827]"
              : "border-transparent text-[#9CA3AF] hover:text-[#D1D5DB] hover:bg-[#111827]/50"
          }`}
        >
          <Link2 className="w-4 h-4 text-[#3B82F6]" />
          <span>Paste listing URL</span>
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "upload"
              ? "border-[#2563EB] text-[#F9FAFB] bg-[#111827]"
              : "border-transparent text-[#9CA3AF] hover:text-[#D1D5DB] hover:bg-[#111827]/50"
          }`}
        >
          <Upload className="w-4 h-4 text-[#10B981]" />
          <span>Upload brochure</span>
        </button>

        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === "manual"
              ? "border-[#2563EB] text-[#F9FAFB] bg-[#111827]"
              : "border-transparent text-[#9CA3AF] hover:text-[#D1D5DB] hover:bg-[#111827]/50"
          }`}
        >
          <Edit3 className="w-4 h-4 text-[#8B5CF6]" />
          <span>Enter manually</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {/* TAB 1: PASTE URL */}
        {activeTab === "url" && (
          <form onSubmit={handleStartWithUrl} className="space-y-4">
            <p className="text-xs text-[#9CA3AF] font-medium">
              Paste a link from MagicBricks, 99acres, Housing.com, or developer brochure URL:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="https://www.magicbricks.com/propertyDetail/2BHK-Apartment-Wakad-Pune..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="font-mono text-xs bg-[#0B0F17] border-[#374151]"
              />
              <Button type="submit" size="md" className="shrink-0" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Parsing URL...</span>
                  </>
                ) : (
                  <>
                    <span>Start evaluation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7280] pt-1">
              <span>Quick Demo Links:</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("https://www.magicbricks.com/property/2bhk-wakad-pune");
                }}
                className="text-[#3B82F6] hover:underline font-medium cursor-pointer"
              >
                Pune 2BHK (₹68L)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("https://www.99acres.com/property/3bhk-mumbai-bandra");
                }}
                className="text-[#3B82F6] hover:underline font-medium cursor-pointer"
              >
                Mumbai 3BHK (₹1.85Cr)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("https://www.housing.com/property/4bhk-gurgaon-dlf");
                }}
                className="text-[#3B82F6] hover:underline font-medium cursor-pointer"
              >
                Gurgaon 4BHK (₹2.4Cr)
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: UPLOAD BROCHURE */}
        {activeTab === "upload" && (
          <form onSubmit={handleStartWithFile} className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setUploadedFile(e.dataTransfer.files[0]);
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive
                  ? "border-[#2563EB] bg-[#2563EB]/10"
                  : uploadedFile
                  ? "border-[#10B981]/50 bg-[#10B981]/5"
                  : "border-[#374151] hover:border-[#4B5563] bg-[#0B0F17]/60"
              }`}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3 text-[#10B981]">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm font-mono font-semibold">{uploadedFile.name}</span>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-8 h-8 mx-auto text-[#3B82F6]" />
                  <div className="space-y-1">
                    <p className="text-xs text-[#F9FAFB] font-semibold">
                      Drop property brochure, floorplan, or project PDF
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      Supports PDF, PNG, JPG files up to 15MB
                    </p>
                  </div>
                  <label className="inline-block text-xs font-semibold text-[#3B82F6] bg-[#2563EB]/10 hover:bg-[#2563EB]/20 px-3.5 py-1.5 rounded-lg border border-[#2563EB]/30 transition-colors cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>

            <Button type="submit" size="md" className="w-full" variant="emerald">
              <span>Continue with Document</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* TAB 3: ENTER MANUALLY */}
        {activeTab === "manual" && (
          <form onSubmit={handleStartManual} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Property Name / Project"
                value={manualData.name}
                onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                className="bg-[#0B0F17] border-[#374151]"
              />
              <Input
                label="Location (City, Area)"
                value={manualData.location}
                onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
                className="bg-[#0B0F17] border-[#374151]"
              />
              <Input
                label="Listed Base Price (₹)"
                type="number"
                value={manualData.price}
                onChange={(e) => setManualData({ ...manualData, price: e.target.value })}
                className="bg-[#0B0F17] border-[#374151] font-mono"
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Property Type
                </label>
                <select
                  value={manualData.type}
                  onChange={(e) => setManualData({ ...manualData, type: e.target.value as any })}
                  className="w-full bg-[#0B0F17] border border-[#374151] text-[#F9FAFB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <Button type="submit" size="md" className="w-full">
              <span>Create Property Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
