'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EvalSidebar } from '@/components/layout/eval-sidebar';
import { PropertyHeaderCard } from '@/components/snapshot/property-card';
import { CompletenessBar } from '@/components/snapshot/completeness-bar';
import { FieldRow } from '@/components/snapshot/field-row';
import { Button } from '@/components/ui/button';
import { HydrationGuard } from '@/components/providers/hydration-guard';
import { useEvaluationStore } from '@/store/evaluation';
import { ArrowRight } from 'lucide-react';
import { EvidenceStatus, PropertyDetails } from '@/types';
import { calculateSnapshotCompleteness } from '@/lib/calculations';
import { AuthGateModal } from '@/components/auth/auth-gate-modal';
import { supabase } from '@/lib/supabase';

function SnapshotPageContent() {
  const params = useParams();
  const router = useRouter();
  const evalId = params.id as string;

  const { evaluations, loadEvaluation, updateProperty, markStepComplete, regenerateChecklist, claimEvaluation } = useEvaluationStore();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);

  useEffect(() => {
    const found = loadEvaluation(evalId);
    setHasLoaded(true);
    if (!found) router.replace('/');
  }, [evalId]);

  const evaluation = evaluations[evalId];
  const property = evaluation?.property;
  const completeness = property ? calculateSnapshotCompleteness(property) : { known: 0, total: 12, percent: 0 };

  const deriveStatus = (p: PropertyDetails, key: keyof PropertyDetails): EvidenceStatus => {
    const val = p[key];
    const hasValue = val !== undefined && val !== null && val !== '' && val !== 0;
    if (!hasValue) return 'missing';
    return p.sourceUrl ? 'source-derived' : 'user-provided';
  };

  const fields: { key: keyof PropertyDetails; label: string; unit?: string }[] = [
    { key: 'name', label: 'Project / Property Name' },
    { key: 'type', label: 'Property Type' },
    { key: 'price', label: 'Listed Price', unit: '₹' },
    { key: 'location', label: 'Location' },
    { key: 'carpetArea', label: 'Carpet Area', unit: 'sq ft' },
    { key: 'bhk', label: 'Configuration (BHK)' },
    { key: 'floor', label: 'Floor Level' },
    { key: 'developer', label: 'Developer / Builder' },
    { key: 'reraId', label: 'RERA Registration No.' },
    { key: 'possessionStatus', label: 'Possession Status' },
    { key: 'parking', label: 'Parking Allocated' },
    { key: 'sourceName', label: 'Listing Source' },
  ];

  const handleFieldUpdate = (key: keyof PropertyDetails, val: string) => {
    const oldType = property?.type;
    const oldPossession = property?.possessionStatus;

    let parsedVal: any = val || undefined;
    if (key === 'price' || key === 'carpetArea' || key === 'builtUpArea') {
      parsedVal = parseFloat(val) || undefined;
    }

    updateProperty(evalId, { [key]: parsedVal });

    if (
      (key === 'type' && val !== oldType) ||
      (key === 'possessionStatus' && val !== oldPossession)
    ) {
      setTimeout(() => regenerateChecklist(evalId), 100);
    }
  };

  const handleContinue = async () => {
    // Check if user is authenticated in Supabase
    if (supabase) {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data?.user) {
          setShowAuthGate(true);
          return;
        }
      } catch {
        // Fallback gracefully
      }
    }
    advanceToFinancial();
  };

  const advanceToFinancial = () => {
    markStepComplete(evalId, 'snapshot');
    router.push(`/evaluation/${evalId}/financial`);
  };

  if (!hasLoaded || !evaluation || !property) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col md:flex-row">
      <EvalSidebar evaluationId={evalId} propertyName={property.name} />
      <main className="flex-1 p-4 sm:p-8 max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1E1E] pb-4">
          <div>
            <span className="text-xs font-mono text-[#5B8BDF] uppercase tracking-wider">Property Snapshot</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#EDEDED]">Confirm Property Profile</h1>
            <p className="text-xs text-[#888888] mt-0.5">Review all fields. Missing data affects your investigation checklist.</p>
          </div>
          <Button onClick={handleContinue} size="md">
            <span>Confirm & continue</span><ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <PropertyHeaderCard property={property} />
        <CompletenessBar knownCount={completeness.known} totalCount={completeness.total} />

        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#888888]">Property Attributes & Evidence Status</h2>
          <div className="space-y-2">
            {fields.map((f) => {
              const val = property[f.key];
              return (
                <FieldRow
                  key={f.key}
                  label={f.label}
                  value={val as string | number | undefined}
                  status={deriveStatus(property, f.key)}
                  unit={f.unit}
                  onSave={(newVal) => handleFieldUpdate(f.key, newVal)}
                />
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#666666]">Changing Property Type or Possession Status regenerates your investigation checklist.</p>
          <Button onClick={handleContinue} size="md" className="w-full sm:w-auto">
            <span>Confirm & Continue to Financial Picture</span><ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>

      <AuthGateModal
        isOpen={showAuthGate}
        evaluationId={evalId}
        propertyName={property.name}
        onClose={() => setShowAuthGate(false)}
        onAuthenticated={(userId) => {
          if (userId) {
            claimEvaluation(evalId, userId);
          }
          setShowAuthGate(false);
          advanceToFinancial();
        }}
      />
    </div>
  );
}

export default function PropertySnapshotPage() {
  return <HydrationGuard><SnapshotPageContent /></HydrationGuard>;
}
