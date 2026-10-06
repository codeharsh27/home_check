'use client';

import React, { useState, useRef } from 'react';
import { ChecklistItem, DocumentEvidence, EvidenceStatus } from '@/types';
import { StatusBadge } from '@/components/ui/badge';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Upload,
  ExternalLink,
  Trash2,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadDocumentToSupabase } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import { getRegionalDocumentInfo, REGIONAL_METADATA } from '@/lib/regional-documents';

interface ChecklistItemCardProps {
  item: ChecklistItem;
  evaluationId?: string;
  onUpdate: (updatedFields: Partial<ChecklistItem>) => void;
}

export const ChecklistItemCard: React.FC<ChecklistItemCardProps> = ({
  item,
  evaluationId = 'local',
  onUpdate,
}) => {
  const activeRegion = useEvaluationStore((state) => state.activeRegion);
  const regionalInfo = getRegionalDocumentInfo(item.id, activeRegion);
  const [isExpanded, setIsExpanded] = useState(false);
  const [notesInput, setNotesInput] = useState(item.notes || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleRequested = () => {
    const nextRequested = !item.requested;
    let nextStatus: EvidenceStatus = item.status;
    if (nextRequested && item.status === 'missing') {
      nextStatus = 'user-provided';
    }
    onUpdate({ requested: nextRequested, status: nextStatus });
  };

  const handleToggleReceived = () => {
    const nextReceived = !item.received;
    let nextStatus: EvidenceStatus = item.status;
    if (nextReceived) {
      nextStatus = 'verified';
    } else if (item.requested) {
      nextStatus = 'user-provided';
    }
    onUpdate({ received: nextReceived, status: nextStatus });
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { evidence } = await uploadDocumentToSupabase(file, evaluationId, item.id);
      if (evidence) {
        const updatedDocs = [...(item.documents || []), evidence];
        onUpdate({
          documents: updatedDocs,
          received: true,
          status: item.status === 'needs-pro' ? 'needs-pro' : 'user-provided',
        });
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveDocument = (docId: string) => {
    const updatedDocs = (item.documents || []).filter((d) => d.id !== docId);
    onUpdate({ documents: updatedDocs });
  };

  const handleSaveNotes = () => {
    onUpdate({ notes: notesInput });
  };

  return (
    <div className="bg-white border border-stone-200/90 hover:border-stone-300 rounded-2xl transition-all shadow-xs overflow-hidden">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
      />

      {/* Block Header */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-0.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer p-0.5"
            title={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="text-sm font-semibold text-stone-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {item.title}
              </h3>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{item.description}</p>
            {regionalInfo && (
              <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <span>📍 {REGIONAL_METADATA[activeRegion]?.name || 'Regional'} Term:</span>
                  <strong className="text-amber-950">{regionalInfo.regionalTitle}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
          <button
            onClick={handleToggleRequested}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
              item.requested
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold shadow-2xs'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {item.requested ? 'Requested ✓' : '+ Mark Requested'}
          </button>

          <button
            onClick={handleToggleReceived}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
              item.received
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold shadow-2xs'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {item.received ? 'Received ✓' : '+ Mark Received'}
          </button>
        </div>
      </div>

      {/* Expanded Block Details */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-3 border-t border-stone-100 bg-stone-50/50 space-y-4 text-xs">
          {/* Why it Matters Callout */}
          <div className="p-3.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-blue-700 font-semibold block">
              Why this matters
            </span>
            <p className="text-stone-600 leading-relaxed">{item.whyItMatters}</p>
          </div>

          {/* Regional Terminology & Guidance */}
          {regionalInfo && (
            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold flex items-center gap-1">
                  <span>🏛️ Local Revenue Term ({regionalInfo.localScript})</span>
                </span>
                <span className="text-[11px] text-stone-500">Issued by: {regionalInfo.authority}</span>
              </div>
              <p className="text-stone-900 font-semibold">{regionalInfo.regionalTitle}</p>
              <p className="text-stone-700 leading-relaxed">{regionalInfo.legalContext}</p>
              <p className="text-emerald-700 text-xs pt-0.5 font-medium">✓ Verification tip: {regionalInfo.verificationTip}</p>
            </div>
          )}

          {/* Action & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
              <span className="text-[10px] uppercase text-stone-400 font-semibold block">Next Action Required</span>
              <p className="text-stone-800 font-medium mt-0.5">{item.nextAction}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs">
              <span className="text-[10px] uppercase text-stone-400 font-semibold block">Responsible Party</span>
              <p className="text-stone-800 font-medium mt-0.5">{item.whoToContact}</p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                Attached Documents ({item.documents?.length || 0})
              </span>
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3 h-3" />
                    <span>Upload document</span>
                  </>
                )}
              </button>
            </div>

            {item.documents && item.documents.length > 0 ? (
              <div className="space-y-1.5">
                {item.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-stone-800 font-medium truncate">{doc.fileName}</span>
                      <span className="text-stone-400 text-xs shrink-0">({doc.uploadedAt})</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open document"
                          className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleRemoveDocument(doc.id)}
                        title="Remove document"
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-400 italic">No document attached yet.</p>
            )}
          </div>

          {/* Seller Response / Notes */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                Notes / Seller Response
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add response received from seller or personal note..."
                className="flex-1 bg-white border border-stone-300 text-xs text-stone-900 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600 shadow-2xs"
              />
              <Button size="sm" variant="secondary" onClick={handleSaveNotes}>
                Save note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
