"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Upload, Edit3, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="w-full bg-[#121212] border border-[#252525] rounded-xl overflow-hidden shadow-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-[#222222] bg-[#0E0E0E]">
        <button
          onClick={() => setActiveTab("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 cursor-pointer ${
            activeTab === "url"
              ? "border-[#5B8BDF] text-[#EDEDED] bg-[#141414]"
              : "border-transparent text-[#777777] hover:text-[#AAAAAA] hover:bg-[#111111]"
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Paste listing URL</span>
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 cursor-pointer ${
            activeTab === "upload"
              ? "border-[#5B8BDF] text-[#EDEDED] bg-[#141414]"
              : "border-transparent text-[#777777] hover:text-[#AAAAAA] hover:bg-[#111111]"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload brochure</span>
        </button>

        <button
          onClick={() => setActiveTab("manual")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium transition-colors border-b-2 cursor-pointer ${
            activeTab === "manual"
              ? "border-[#5B8BDF] text-[#EDEDED] bg-[#141414]"
              : "border-transparent text-[#777777] hover:text-[#AAAAAA] hover:bg-[#111111]"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Enter manually</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {/* TAB 1: PASTE URL */}
        {activeTab === "url" && (
          <form onSubmit={handleStartWithUrl} className="space-y-4">
            <p className="text-xs text-[#888888]">
              Paste a link from MagicBricks, 99acres, Housing.com, or developer website:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="https://www.magicbricks.com/propertyDetail/2BHK-Apartment-Wakad-Pune..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="font-mono text-xs"
              />
              <Button type="submit" size="md" className="shrink-0">
                <span>Start evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#555555]">
              <span>Demo fallback:</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("https://www.magicbricks.com/property/2bhk-wakad-pune-demo");
                }}
                className="text-[#5B8BDF] hover:underline cursor-pointer"
              >
                Use demo listing (₹68L 2BHK Wakad, Pune)
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
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                dragActive
                  ? "border-[#5B8BDF] bg-[#5B8BDF]/5"
                  : uploadedFile
                  ? "border-[#3F9E6C]/50 bg-[#3F9E6C]/5"
                  : "border-[#282828] hover:border-[#383838] bg-[#0F0F0F]"
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
                  <Upload className="w-6 h-6 mx-auto text-[#666666]" />
                  <p className="text-xs text-[#888888]">
                    Drop property brochure, floorplan, or screenshot (PDF, PNG, JPG)
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

            <Button type="submit" size="md" className="w-full">
              <span>Continue with file</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* TAB 3: ENTER MANUALLY */}
        {activeTab === "manual" && (
          <form onSubmit={handleStartManual} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Property name / Project"
                value={manualData.name}
                onChange={(e) => setManualData({ ...manualData, name: e.target.value })}
              />
              <Input
                label="Location (City, Area)"
                value={manualData.location}
                onChange={(e) => setManualData({ ...manualData, location: e.target.value })}
              />
              <Input
                label="Listed price (₹)"
                type="number"
                value={manualData.price}
                onChange={(e) => setManualData({ ...manualData, price: e.target.value })}
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#888888] uppercase tracking-wider">
                  Property type
                </label>
                <select
                  value={manualData.type}
                  onChange={(e) => setManualData({ ...manualData, type: e.target.value as any })}
                  className="w-full bg-[#181818] border border-[#2B2B2B] text-[#EDEDED] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5B8BDF]"
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
              <span>Create property snapshot</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
