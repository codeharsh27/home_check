export type EvidenceStatus =
  | 'verified'
  | 'user-provided'
  | 'source-derived'
  | 'estimated'
  | 'missing'
  | 'needs-pro'
  | 'potential-issue';

export interface PropertyDetails {
  name: string;
  type: 'Apartment' | 'Villa' | 'Plot' | 'Independent House' | 'Other';
  price: number;
  location: string;
  city?: string;
  state?: string;
  carpetArea?: number;
  builtUpArea?: number;
  bhk?: string;
  floor?: string;
  totalFloors?: string;
  developer?: string;
  reraId?: string;
  possessionStatus?: 'Ready to move' | 'Under construction' | 'Pre-launch';
  expectedPossession?: string;
  parking?: string;
  facing?: string;
  sourceUrl?: string;
  sourceName?: string;
  amenities?: string[];
}

export type FinancingSource =
  | 'Home loan'
  | 'Family funds'
  | 'Personal funds'
  | 'Company loan'
  | 'Other';

export interface BuyerContext {
  purpose?: 'Primary residence' | 'Investment' | 'Both';
  monthlyIncome?: number;
  existingObligations?: number;
  availableFunds?: number;
  emergencyReserve?: number;
  plannedLoanAmount?: number; // user-specified or auto-calculated
  interestRate?: number;      // default 8.5
  tenureYears?: number;       // default 20
  expectedFinancing?: FinancingSource[];
}

export interface DocumentEvidence {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  fileUrl?: string;
  isAiExtracted?: boolean;
}

export type ChecklistCategory = 'ownership' | 'approvals' | 'financial' | 'condition' | 'costs';

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  description: string;
  whyItMatters: string;
  status: EvidenceStatus;
  requested: boolean;
  received: boolean;
  nextAction: string;
  whoToContact: 'Seller / Developer' | 'Lender / Bank' | 'Property Lawyer' | 'RERA / Govt' | 'Self';
  notes?: string;
  sellerResponse?: string;
  documents?: DocumentEvidence[];
  isRequired?: boolean;       // if false, item is optional for this property type
  propertyTypes?: PropertyDetails['type'][]; // which property types this applies to
}

export interface OpenQuestion {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'resolved' | 'needs-lawyer' | 'deferred';
  sourceChecklistItemId?: string; // link back to checklist
}

export type EvaluationStep = 'snapshot' | 'financial' | 'investigation' | 'questions' | 'dashboard';

export interface EvaluationSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  step: EvaluationStep;
  completedSteps: EvaluationStep[];
  property: PropertyDetails;
  buyerContext?: BuyerContext;
  checklist?: ChecklistItem[];
  questions?: OpenQuestion[];
  isDemo?: boolean;
}
