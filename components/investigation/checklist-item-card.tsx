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
import { trackEvent } from '@/lib/analytics';

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
      trackEvent('checklist_item_completed', evaluationId, {
        itemId: item.id,
        category: item.category,
        title: item.title,
      });
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
        trackEvent('document_uploaded', evaluationId, {
          itemId: item.id,
          fileName: file.name,
          fileSize: file.size,
          category: item.category,
          isRemote: Boolean(evidence.fileUrl),
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
    <div className="bg-[#121212] border border-[#232323] hover:border-[#2E2E2E] rounded-xl transition-all overflow-hidden">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
      />

      {/* Block Header */}
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-0.5 text-[#666666] hover:text-[#EDEDED] transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="text-sm font-semibold text-[#EDEDED] cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {item.title}
              </h3>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-xs text-[#888888]">{item.description}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1E1E1E]">
          <button
            onClick={handleToggleRequested}
            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
              item.requested
                ? 'bg-[#5B8BDF]/20 text-[#5B8BDF] border border-[#5B8BDF]/40'
                : 'bg-[#1A1A1A] text-[#777777] border border-[#262626] hover:text-[#EDEDED]'
            }`}
          >
            {item.requested ? 'Requested ✓' : '+ Mark Requested'}
          </button>

          <button
            onClick={handleToggleReceived}
            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
              item.received
                ? 'bg-[#3F9E6C]/20 text-[#3F9E6C] border border-[#3F9E6C]/40'
                : 'bg-[#1A1A1A] text-[#777777] border border-[#262626] hover:text-[#EDEDED]'
            }`}
          >
            {item.received ? 'Received ✓' : '+ Mark Received'}
          </button>
        </div>
      </div>

      {/* Expanded Block Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-[#1C1C1C] bg-[#0E0E0E] space-y-4 text-xs">
          {/* Why it Matters Callout */}
          <div className="p-3 bg-[#151515] rounded-lg border border-[#222222] space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#5B8BDF] font-semibold block">
              Why this matters
            </span>
            <p className="text-[#AAAAAA] leading-relaxed">{item.whyItMatters}</p>
          </div>

          {/* Action & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#999999]">
            <div className="bg-[#141414] p-2.5 rounded border border-[#202020]">
              <span className="text-[10px] uppercase font-mono text-[#666666] block">Next Action Required</span>
              <p className="text-[#EDEDED] font-medium mt-0.5">{item.nextAction}</p>
            </div>
            <div className="bg-[#141414] p-2.5 rounded border border-[#202020]">
              <span className="text-[10px] uppercase font-mono text-[#666666] block">Responsible Party</span>
              <p className="text-[#EDEDED] font-medium mt-0.5">{item.whoToContact}</p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888]">
                Attached Documents ({item.documents?.length || 0})
              </span>
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#5B8BDF] hover:underline cursor-pointer disabled:opacity-50"
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
                    className="flex items-center justify-between p-2 rounded bg-[#161616] border border-[#262626]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-[#3F9E6C] shrink-0" />
                      <span className="font-mono text-[#EDEDED] truncate">{doc.fileName}</span>
                      <span className="text-[#666666] text-[10px] shrink-0">({doc.uploadedAt})</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open document"
                          className="text-[#5B8BDF] hover:text-[#7CA5ED] p-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={() => handleRemoveDocument(doc.id)}
                        title="Remove document"
                        className="text-[#666666] hover:text-[#D94F4F] transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#555555] italic">No document attached yet.</p>
            )}
          </div>

          {/* Seller Response / Notes */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-[#888888]" />
                Notes / Seller Response
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add response received from seller or personal note..."
                className="flex-1 bg-[#161616] border border-[#252525] text-xs text-[#EDEDED] rounded px-3 py-1.5 focus:outline-none focus:border-[#5B8BDF]"
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
