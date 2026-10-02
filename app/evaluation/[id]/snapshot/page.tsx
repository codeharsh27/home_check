"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { EvalSidebar } from "@/components/layout/eval-sidebar";
import { PropertyHeaderCard } from "@/components/snapshot/property-card";
import { CompletenessBar } from "@/components/snapshot/completeness-bar";
import { FieldRow } from "@/components/snapshot/field-row";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/store/evaluation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { EvidenceStatus } from "@/types";

export default function PropertySnapshotPage() {
  const params = useParams();
  const router = useRouter();
  const evalId = (params.id as string) || "demo";

  const { currentEvaluation, loadEvaluation, updateProperty, startNewEvaluation } = useEvaluationStore();

  useEffect(() => {
    if (evalId && evalId !== "demo") {
      loadEvaluation(evalId);
    } else if (!currentEvaluation) {
      // Start fallback evaluation session for demo
      const id = startNewEvaluation({});
      router.replace(`/evaluation/${id}/snapshot`);
    }
  }, [evalId]);

  const property = currentEvaluation?.property || {
    name: "Green Valley Residency",
    type: "Apartment" as const,
    price: 6800000,
    location: "Wakad, Pune",
    carpetArea: 1050,
    bhk: "2 BHK",
    developer: "XYZ Developers",
    possessionStatus: "Under construction" as const,
    sourceName: "Property listing (MagicBricks)",
  };

  const fields: { key: keyof typeof property; label: string; unit?: string; defaultStatus: EvidenceStatus }[] = [
    { key: "name", label: "Project / Property Name", defaultStatus: "source-derived" },
    { key: "type", label: "Property Type", defaultStatus: "source-derived" },
    { key: "price", label: "Listed Price", unit: "₹", defaultStatus: "source-derived" },
    { key: "location", label: "Location", defaultStatus: "source-derived" },
    { key: "carpetArea", label: "Carpet Area", unit: "sq ft", defaultStatus: "source-derived" },
    { key: "bhk", label: "Configuration", defaultStatus: "source-derived" },
    { key: "developer", label: "Developer / Builder", defaultStatus: "source-derived" },
    { key: "possessionStatus", label: "Possession Status", defaultStatus: "source-derived" },
    { key: "floor", label: "Floor Level", defaultStatus: "missing" },
    { key: "reraId", label: "RERA Registration No.", defaultStatus: "missing" },
    { key: "parking", label: "Parking Allocated", defaultStatus: "missing" },
    { key: "sourceName", label: "Listing Source", defaultStatus: "user-provided" },
  ];

  const knownCount = fields.filter((f) => Boolean(property[f.key])).length;
  const totalCount = fields.length;

  const handleFieldUpdate = (key: string, val: string) => {
    if (evalId) {
      let parsedVal: any = val;
      if (key === "price" || key === "carpetArea") {
        parsedVal = parseFloat(val) || 0;
      }
      updateProperty(evalId, { [key]: parsedVal });
    }
  };

  const handleContinue = () => {
    router.push(`/evaluation/${evalId}/financial`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />

      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Screen 02</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Property Snapshot</h1>
            <p className="text-xs text-[#888888] mt-0.5">
              Confirm or complete the structured profile of the property you are evaluating.
            </p>
          </div>
          <Button onClick={handleContinue} size="md">
            <span>Confirm & continue</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Property Header Card */}
        <PropertyHeaderCard property={property} />

        {/* Completeness Counter */}
        <CompletenessBar knownCount={knownCount} totalCount={totalCount} />

        {/* Field Details List */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#888888]">
            Property Attributes & Evidence Status
          </h2>

          <div className="space-y-2">
            {fields.map((f) => {
              const val = property[f.key];
              const isValPresent = Boolean(val);
              const status: EvidenceStatus = isValPresent ? f.defaultStatus : "missing";

              return (
                <FieldRow
                  key={f.key}
                  label={f.label}
                  value={val}
                  status={status}
                  unit={f.unit}
                  onSave={(newVal) => handleFieldUpdate(f.key, newVal)}
                />
              );
            })}
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">
            All fields can be updated at any point during your evaluation.
          </p>
          <Button onClick={handleContinue} size="md" className="w-full sm:w-auto">
            <span>Confirm & continue to Financial Picture</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
