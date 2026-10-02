export type EvidenceStatus = 
  | "verified"
  | "user-provided"
  | "source-derived"
  | "estimated"
  | "missing"
  | "needs-pro"
  | "potential-issue";

export interface PropertyDetails {
  name: string;
  type: "Apartment" | "Villa" | "Plot" | "Independent House" | "Other";
  price: number;
  location: string;
  carpetArea?: number;
  bhk?: string;
  floor?: string;
  developer?: string;
  reraId?: string;
  possessionStatus?: "Ready to move" | "Under construction" | "Pre-launch";
  parking?: string;
  sourceUrl?: string;
  sourceName?: string;
}

export interface BuyerContext {
  purpose?: "Primary residence" | "Investment" | "Both";
  monthlyIncome?: number;
  existingObligations?: number;
  availableFunds?: number;
  emergencyReserve?: number;
  expectedFinancing?: ("Home loan" | "Family funds" | "Personal funds" | "Company loan" | "Other")[];
}

export interface DocumentEvidence {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  fileUrl?: string;
}

export interface ChecklistItem {
  id: string;
  category: "ownership" | "approvals" | "financial" | "condition" | "costs";
  title: string;
  description: string;
  whyItMatters: string;
  status: EvidenceStatus;
  requested: boolean;
  received: boolean;
  nextAction: string;
  whoToContact: "Seller / Developer" | "Lender / Bank" | "Property Lawyer" | "RERA / Govt" | "Self";
  notes?: string;
  sellerResponse?: string;
  documents?: DocumentEvidence[];
}

export interface OpenQuestion {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  status: "open" | "resolved" | "needs-lawyer" | "deferred";
}

export interface EvaluationSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  step: "snapshot" | "financial" | "investigation" | "dashboard";
  property: PropertyDetails;
  buyerContext?: BuyerContext;
  checklist?: ChecklistItem[];
  questions?: OpenQuestion[];
}
