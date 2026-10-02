"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Upload, Edit3, ArrowRight, FileText, CheckCircle2, Search, Sparkles } from "lucide-react";
import { useEvaluationStore } from "@/store/evaluation";

export const IntakeWidget: React.FC = () => {
  const router = useRouter();
  const startNewEvaluation = useEvaluationStore((state) => state.startNewEvaluation);

  const [activeTab, setActiveTab] = useState<"url" | "upload" | "manual">("url");
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Manual form state
  const [manualData, setManualData] = useState({
    name: "Green Valley Residency",
    location: "Wakad, Pune",
    price: "6800000",
    type: "Apartment" as const,
  });

  const handleStartWithUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation({
      sourceUrl: urlInput || "https://magicbricks.com/property/demo-pune",
      sourceName: "Property Listing URL",
    });
    router.push(`/evaluation/${id}/snapshot`);
  };

  const handleStartWithFile = (e: React.FormEvent) => {
    e.preventDefault();
    const id = startNewEvaluation({
      sourceName: uploadedFile ? uploadedFile.name : "Brochure document",
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
      sourceName: "User manual entry",
    });
    router.push(`/evaluation/${id}/snapshot`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#141414]/95 border border-[#2B2B2B] rounded-[28px] p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative z-20 space-y-5">
      {/* Pill Segmented Tab Header (Homera style) */}
      <div className="flex justify-center">
        <div className="bg-[#0A0A0A] p-1.5 rounded-full border border-[#222222] inline-flex items-center gap-1">
          <button
            onClick={() => setActiveTab("url")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === "url"
                ? "bg-[#5B8BDF] text-white shadow-md font-semibold"
                : "text-[#888888] hover:text-[#EDEDED]"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Paste Listing Link</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === "upload"
                ? "bg-[#5B8BDF] text-white shadow-md font-semibold"
                : "text-[#888888] hover:text-[#EDEDED]"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Brochure</span>
          </button>

          <button
            onClick={() => setActiveTab("manual")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === "manual"
                ? "bg-[#5B8BDF] text-white shadow-md font-semibold"
                : "text-[#888888] hover:text-[#EDEDED]"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Enter Manually</span>
          </button>
        </div>
      </div>

      {/* Tab 1: PASTE LINK (Homera / Roofin rounded search bar design) */}
      {activeTab === "url" && (
        <form onSubmit={handleStartWithUrl} className="space-y-3">
          <div className="bg-[#0D0D0D] border border-[#282828] focus-within:border-[#5B8BDF] p-2 rounded-full flex items-center gap-3 transition-colors shadow-inner">
            <div className="pl-3 text-[#666666]">
              <Search className="w-4 h-4 text-[#5B8BDF]" />
            </div>
            <input
              type="url"
              placeholder="Paste URL from MagicBricks, 99acres, Housing.com..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-[#EDEDED] placeholder-[#555555] focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="bg-[#5B8BDF] hover:bg-[#6E9BE8] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shrink-0 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <span>Evaluate Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] px-3 text-[#666666]">
            <span>Supported: MagicBricks · 99acres · Housing.com · NoBroker</span>
            <button
              type="button"
              onClick={() => {
                setUrlInput("https://www.magicbricks.com/property/2bhk-wakad-pune-demo");
              }}
              className="text-[#5B8BDF] hover:underline cursor-pointer flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3" />
              <span>Use demo listing (₹68L Pune 2BHK)</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: UPLOAD BROCHURE */}
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
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              dragActive
                ? "border-[#5B8BDF] bg-[#5B8BDF]/10"
                : uploadedFile
                ? "border-[#3F9E6C]/50 bg-[#3F9E6C]/10"
                : "border-[#282828] hover:border-[#383838] bg-[#0D0D0D]"
            }`}
          >
            {uploadedFile ? (
              <div className="flex items-center justify-center gap-3 text-[#3F9E6C]">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-mono">{uploadedFile.name}</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#181818] border border-[#2B2B2B] flex items-center justify-center mx-auto text-[#5B8BDF]">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#888888]">
                  Drop property brochure, floorplan, or screenshot (PDF, PNG, JPG up to 10MB)
                </p>
                <label className="inline-block text-xs font-medium text-[#5B8BDF] hover:underline cursor-pointer">
                  Browse file
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

          <button
            type="submit"
            className="w-full bg-[#5B8BDF] hover:bg-[#6E9BE8] text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Continue with File</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Tab 3: ENTER MANUALLY */}
      {activeTab === "manual" && (
        <form onSubmit={handleStartManual} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#777777] mb-1">
                Property / Project Name
              </label>
              <input
                type="text"
                value={manualData.name}
                onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
                className="w-full bg-[#0D0D0D] border border-[#2B2B2B] text-[#EDEDED] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#5B8BDF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#777777] mb-1">
                Location (City, Area)
              </label>
              <input
                type="text"
                value={manualData.location}
                onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
                className="w-full bg-[#0D0D0D] border border-[#2B2B2B] text-[#EDEDED] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#5B8BDF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#777777] mb-1">
                Listed Price (₹)
              </label>
              <input
                type="number"
                value={manualData.price}
                onChange={(e) => setManualData({ ...manualData, price: e.target.value })}
                className="w-full bg-[#0D0D0D] border border-[#2B2B2B] text-[#EDEDED] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#5B8BDF] font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#777777] mb-1">
                Property Type
              </label>
              <select
                value={manualData.type}
                onChange={(e) => setManualData({ ...manualData, type: e.target.value as any })}
                className="w-full bg-[#0D0D0D] border border-[#2B2B2B] text-[#EDEDED] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#5B8BDF]"
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Independent House">Independent House</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5B8BDF] hover:bg-[#6E9BE8] text-white py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Create Property Snapshot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
