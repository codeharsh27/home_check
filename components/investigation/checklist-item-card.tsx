"use client";

import React, { useState } from "react";
import { ChecklistItem, DocumentEvidence, EvidenceStatus } from "@/types";
import { StatusBadge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, FileText, Paperclip, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistItemCardProps {
  item: ChecklistItem;
  onUpdate: (updatedFields: Partial<ChecklistItem>) => void;
}

export const ChecklistItemCard: React.FC<ChecklistItemCardProps> = ({ item, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notesInput, setNotesInput] = useState(item.notes || "");

  const handleToggleRequested = () => {
    const nextRequested = !item.requested;
    let nextStatus: EvidenceStatus = item.status;
    if (nextRequested && item.status === "missing") {
      nextStatus = "user-provided";
    }
    onUpdate({ requested: nextRequested, status: nextStatus });
  };

  const handleToggleReceived = () => {
    const nextReceived = !item.received;
    let nextStatus: EvidenceStatus = item.status;
    if (nextReceived) {
      nextStatus = "verified";
    } else if (item.requested) {
      nextStatus = "user-provided";
    }
    onUpdate({ received: nextReceived, status: nextStatus });
  };

  const handleAttachMockDocument = () => {
    const mockDoc: DocumentEvidence = {
      id: `doc_${Date.now()}`,
      fileName: `${item.id}_document.pdf`,
      fileSize: 2450000,
      uploadedAt: new Date().toLocaleDateString("en-IN"),
    };

    const updatedDocs = [...(item.documents || []), mockDoc];
    onUpdate({
      documents: updatedDocs,
      received: true,
      status: item.status === "needs-pro" ? "needs-pro" : "user-provided",
    });
  };

  const handleRemoveDocument = (docId: string) => {
    const updatedDocs = (item.documents || []).filter((d) => d.id !== docId);
    onUpdate({ documents: updatedDocs });
  };

  const handleSaveNotes = () => {
    onUpdate({ notes: notesInput });
  };

  return (
    <div className="bg-[#16181D] border border-[#262930] hover:border-[#363B47] rounded-md transition-all overflow-hidden">
      {/* Block Header */}
      <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-0.5 text-[#6B7280] hover:text-[#F0F2F5] transition-colors cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="text-xs font-semibold text-[#F0F2F5] cursor-pointer hover:text-[#D97706] transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {item.title}
              </h3>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-xs text-[#8A8F9E]">{item.description}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#23262D]">
          <button
            type="button"
            onClick={handleToggleRequested}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              item.requested
                ? "bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/30 font-semibold"
                : "bg-[#121418] text-[#8A8F9E] border border-[#23262D] hover:text-[#F0F2F5]"
            }`}
          >
            {item.requested ? "Requested ✓" : "+ Mark Requested"}
          </button>

          <button
            type="button"
            onClick={handleToggleReceived}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
              item.received
                ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold"
                : "bg-[#121418] text-[#8A8F9E] border border-[#23262D] hover:text-[#F0F2F5]"
            }`}
          >
            {item.received ? "Received ✓" : "+ Mark Received"}
          </button>
        </div>
      </div>

      {/* Expanded Block Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-[#23262D] bg-[#121418] space-y-4 text-xs">
          {/* Why it Matters Callout */}
          <div className="p-3 bg-[#181A20] rounded border border-[#262930] space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#D97706] font-semibold block">
              Why this matters
            </span>
            <p className="text-[#8A8F9E] leading-relaxed">{item.whyItMatters}</p>
          </div>

          {/* Action & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#8A8F9E]">
            <div className="bg-[#16181D] p-2.5 rounded border border-[#23262D]">
              <span className="text-[10px] uppercase font-mono text-[#6B7280] block">Next Action Required</span>
              <p className="text-[#F0F2F5] font-medium mt-0.5">{item.nextAction}</p>
            </div>
            <div className="bg-[#16181D] p-2.5 rounded border border-[#23262D]">
              <span className="text-[10px] uppercase font-mono text-[#6B7280] block">Responsible Party</span>
              <p className="text-[#F0F2F5] font-medium mt-0.5">{item.whoToContact}</p>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F9E]">
                Attached Documents ({item.documents?.length || 0})
              </span>
              <button
                type="button"
                onClick={handleAttachMockDocument}
                className="inline-flex items-center gap-1 text-[11px] text-[#D97706] hover:underline cursor-pointer"
              >
                <Paperclip className="w-3 h-3" />
                <span>Upload document</span>
              </button>
            </div>

            {item.documents && item.documents.length > 0 ? (
              <div className="space-y-1.5">
                {item.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2 rounded bg-[#16181D] border border-[#262930]"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="font-mono text-[#F0F2F5]">{doc.fileName}</span>
                      <span className="text-[#6B7280] text-[10px]">({doc.uploadedAt})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="text-[#6B7280] hover:text-[#EF4444] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#525866] italic">No document attached yet.</p>
            )}
          </div>

          {/* Seller Response / Notes */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F9E] flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-[#8A8F9E]" />
                Notes / Seller Response
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Add response received from seller or personal note..."
                className="flex-1 bg-[#16181D] border border-[#262930] text-xs text-[#F0F2F5] rounded px-3 py-1.5 focus:outline-none focus:border-[#D97706]"
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
