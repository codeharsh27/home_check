import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  EvaluationSession,
  PropertyDetails,
  BuyerContext,
  ChecklistItem,
  OpenQuestion,
  EvaluationStep,
} from '@/types';
import { generateChecklist, generateQuestionsFromChecklist } from '@/lib/checklist-engine';

// Demo property for the "Use demo listing" button only
export const DEMO_PROPERTY: PropertyDetails = {
  name: 'Green Valley Residency',
  type: 'Apartment',
  price: 6800000,
  location: 'Wakad, Pune',
  city: 'Pune',
  state: 'Maharashtra',
  carpetArea: 1050,
  bhk: '2 BHK',
  developer: 'XYZ Developers',
  possessionStatus: 'Under construction',
  expectedPossession: 'December 2025',
  reraId: 'P52100012345',
  sourceName: 'Property listing (MagicBricks)',
  sourceUrl: 'https://www.magicbricks.com/property/demo',
};

export const DEMO_BUYER_CONTEXT: BuyerContext = {
  purpose: 'Primary residence',
  monthlyIncome: 150000,
  existingObligations: 12000,
  availableFunds: 1500000,
  emergencyReserve: 200000,
  expectedFinancing: ['Home loan'],
  interestRate: 8.5,
  tenureYears: 20,
};

// Empty property — used for real user entries
const EMPTY_PROPERTY: PropertyDetails = {
  name: '',
  type: 'Apartment',
  price: 0,
  location: '',
};

interface EvaluationStore {
  currentEvaluation: EvaluationSession | null;
  evaluations: Record<string, EvaluationSession>;
  hasHydrated: boolean;

  // Lifecycle
  setHasHydrated: (val: boolean) => void;
  startNewEvaluation: (initialProperty: Partial<PropertyDetails>, isDemo?: boolean) => string;
  loadEvaluation: (id: string) => boolean;
  markStepComplete: (id: string, step: EvaluationStep) => void;

  // Data updates
  updateProperty: (id: string, updates: Partial<PropertyDetails>) => void;
  updateBuyerContext: (id: string, context: Partial<BuyerContext>) => void;
  updateChecklistItem: (id: string, itemId: string, updates: Partial<ChecklistItem>) => void;
  resolveQuestion: (id: string, questionId: string, status: OpenQuestion['status']) => void;
  initializeQuestionsIfNeeded: (id: string) => void;

  // Checklist regeneration when property type changes
  regenerateChecklist: (id: string) => void;
}

export const useEvaluationStore = create<EvaluationStore>()(
  persist(
    (set, get) => ({
      currentEvaluation: null,
      evaluations: {},
      hasHydrated: false,

      setHasHydrated: (val) => set({ hasHydrated: val }),

      startNewEvaluation: (initialProperty, isDemo = false) => {
        const id = `eval_${Date.now()}`;

        const base = isDemo ? DEMO_PROPERTY : EMPTY_PROPERTY;
        const property: PropertyDetails = { ...base, ...initialProperty };

        // Generate property-type-aware checklist
        const checklist = generateChecklist(property.type, property.possessionStatus);

        // Generate initial questions from checklist
        const questions = generateQuestionsFromChecklist(checklist);

        const newSession: EvaluationSession = {
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          step: 'snapshot',
          completedSteps: [],
          property,
          buyerContext: isDemo ? DEMO_BUYER_CONTEXT : undefined,
          checklist,
          questions,
          isDemo,
        };

        set((state) => ({
          currentEvaluation: newSession,
          evaluations: { ...state.evaluations, [id]: newSession },
        }));

        return id;
      },

      loadEvaluation: (id) => {
        const existing = get().evaluations[id];
        if (existing) {
          set({ currentEvaluation: existing });
          return true;
        }
        return false;
      },

      markStepComplete: (id, step) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem) return state;
          const completedSteps = Array.from(
            new Set([...evalItem.completedSteps, step])
          ) as EvaluationStep[];
          const updatedEval = { ...evalItem, completedSteps, updatedAt: new Date().toISOString() };
          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: { ...state.evaluations, [id]: updatedEval },
          };
        });
      },

      updateProperty: (id, updates) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem) return state;
          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            property: { ...evalItem.property, ...updates },
          };
          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: { ...state.evaluations, [id]: updatedEval },
          };
        });
      },

      updateBuyerContext: (id, contextUpdates) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem) return state;
          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            buyerContext: { ...evalItem.buyerContext, ...contextUpdates },
          };
          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: { ...state.evaluations, [id]: updatedEval },
          };
        });
      },

      updateChecklistItem: (id, itemId, updates) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem?.checklist) return state;
          const updatedChecklist = evalItem.checklist.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          );
          // Regenerate questions whenever checklist changes
          const updatedQuestions = generateQuestionsFromChecklist(updatedChecklist);
          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            checklist: updatedChecklist,
            questions: updatedQuestions,
          };
          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: { ...state.evaluations, [id]: updatedEval },
          };
        });
      },

      resolveQuestion: (id, questionId, status) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem?.questions) return state;
          const updatedQuestions = evalItem.questions.map((q) =>
            q.id === questionId ? { ...q, status } : q
          );
          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            questions: updatedQuestions,
          };
          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: { ...state.evaluations, [id]: updatedEval },
          };
        });
      },

      initializeQuestionsIfNeeded: (id) => {
        const evalItem = get().evaluations[id];
        if (!evalItem) return;
        if (!evalItem.questions || evalItem.questions.length === 0) {
          const questions = generateQuestionsFromChecklist(evalItem.checklist || []);
          set((state) => {
            const current = state.evaluations[id];
            if (!current) return state;
            const updated = { ...current, questions, updatedAt: new Date().toISOString() };
            return {
              currentEvaluation: state.currentEvaluation?.id === id ? updated : state.currentEvaluation,
              evaluations: { ...state.evaluations, [id]: updated },
            };
          });
        }
      },

      regenerateChecklist: (id) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem) return state;
          const newChecklist = generateChecklist(
            evalItem.property.type,
            evalItem.property.possessionStatus
          );
          // Merge: preserve existing item states (requested, received, notes, documents)
          const mergedChecklist = newChecklist.map((newItem) => {
            const existing = evalItem.checklist?.find((e) => e.id === newItem.id);
            return existing ? { ...newItem, ...existing } : newItem;
          });
          const updatedQuestions = generateQuestionsFromChecklist(mergedChecklist);
          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            checklist: mergedChecklist,
            questions: updatedQuestions,
          };
          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: { ...state.evaluations, [id]: updatedEval },
          };
        });
      },
    }),
    {
      name: 'homecheck-v2-storage', // new key to avoid conflicts with old data
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    }
  )
);
