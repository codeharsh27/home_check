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
    <div className="w-full bg-[#16181D] border border-[#262930] rounded-lg overflow-hidden shadow-xl">
      {/* Segmented Tabs Header */}
      <div className="flex border-b border-[#23262D] bg-[#121418] p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded transition-all cursor-pointer ${
            activeTab === "url"
              ? "bg-[#1E2128] text-[#F0F2F5] border border-[#2B2F38] shadow-sm font-semibold"
              : "text-[#8A8F9E] hover:text-[#F0F2F5]"
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Paste URL</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded transition-all cursor-pointer ${
            activeTab === "upload"
              ? "bg-[#1E2128] text-[#F0F2F5] border border-[#2B2F38] shadow-sm font-semibold"
              : "text-[#8A8F9E] hover:text-[#F0F2F5]"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Brochure</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("manual")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded transition-all cursor-pointer ${
            activeTab === "manual"
              ? "bg-[#1E2128] text-[#F0F2F5] border border-[#2B2F38] shadow-sm font-semibold"
              : "text-[#8A8F9E] hover:text-[#F0F2F5]"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Manual Entry</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5">
        {/* TAB 1: PASTE URL */}
        {activeTab === "url" && (
          <form onSubmit={handleStartWithUrl} className="space-y-3.5">
            <p className="text-xs text-[#8A8F9E]">
              Paste a link from MagicBricks, 99acres, Housing.com, or developer website:
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Input
                type="url"
                placeholder="https://www.magicbricks.com/propertyDetail/2BHK-Apartment-Wakad-Pune..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="font-mono text-xs"
              />
              <Button type="submit" variant="amber" size="md" className="shrink-0">
                <span>Start evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#6B7280]">
              <span>Sample listing:</span>
              <button
                type="button"
                onClick={() => {
                  setUrlInput("https://www.magicbricks.com/property/2bhk-wakad-pune-demo");
                }}
                className="text-[#D97706] hover:underline cursor-pointer"
              >
                Use demo listing (₹68L 2BHK Wakad, Pune)
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: UPLOAD BROCHURE */}
        {activeTab === "upload" && (
          <form onSubmit={handleStartWithFile} className="space-y-3.5">
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
              className={`border border-dashed rounded-lg p-5 text-center transition-colors ${
                dragActive
                  ? "border-[#D97706] bg-[#D97706]/5"
                  : uploadedFile
                  ? "border-[#10B981]/50 bg-[#10B981]/5"
                  : "border-[#2B2F38] hover:border-[#3A3F4B] bg-[#121418]"
              }`}
            >
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-3 text-[#10B981]">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-mono">{uploadedFile.name}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-5 h-5 mx-auto text-[#6B7280]" />
                  <p className="text-xs text-[#8A8F9E]">
                    Drop property brochure, floorplan, or screenshot (PDF, PNG, JPG)
                  </p>
                  <label className="inline-block text-xs font-medium text-[#D97706] hover:underline cursor-pointer">
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

            <Button type="submit" variant="amber" size="md" className="w-full">
              <span>Continue with file</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* TAB 3: ENTER MANUALLY */}
        {activeTab === "manual" && (
          <form onSubmit={handleStartManual} className="space-y-3.5">
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
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8A8F9E]">
                  Property type
                </label>
                <select
                  value={manualData.type}
                  onChange={(e) => setManualData({ ...manualData, type: e.target.value as any })}
                  className="w-full bg-[#14161B] border border-[#262930] text-[#F0F2F5] rounded-md px-3.5 py-2 text-sm focus:outline-none focus:border-[#D97706]"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <Button type="submit" variant="amber" size="md" className="w-full">
              <span>Create property snapshot</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
