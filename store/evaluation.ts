import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EvaluationSession, PropertyDetails, BuyerContext, ChecklistItem, OpenQuestion } from '@/types';

interface EvaluationStore {
  currentEvaluation: EvaluationSession | null;
  evaluations: Record<string, EvaluationSession>;
  
  // Actions
  startNewEvaluation: (property: Partial<PropertyDetails>) => string;
  loadEvaluation: (id: string) => void;
  updateProperty: (id: string, property: Partial<PropertyDetails>) => void;
  updateBuyerContext: (id: string, context: Partial<BuyerContext>) => void;
  updateChecklistItem: (id: string, itemId: string, updates: Partial<ChecklistItem>) => void;
  resolveQuestion: (id: string, questionId: string, status: OpenQuestion['status']) => void;
}

const DEFAULT_MOCK_PROPERTY: PropertyDetails = {
  name: "Green Valley Residency",
  type: "Apartment",
  price: 6800000,
  location: "Wakad, Pune",
  carpetArea: 1050,
  bhk: "2 BHK",
  developer: "XYZ Developers",
  possessionStatus: "Under construction",
  sourceName: "Property listing (MagicBricks)"
};

import { DEFAULT_CHECKLIST } from '@/lib/checklist-defaults';

const DEFAULT_MOCK_BUYER_CONTEXT: BuyerContext = {
  purpose: "Primary residence",
  monthlyIncome: 150000,
  existingObligations: 12000,
  availableFunds: 1500000,
  emergencyReserve: 200000,
  expectedFinancing: ["Home loan"],
};

export const useEvaluationStore = create<EvaluationStore>()(
  persist(
    (set, get) => ({
      currentEvaluation: null,
      evaluations: {},

      startNewEvaluation: (initialProperty) => {
        const id = `eval_${Date.now()}`;
        const newProperty: PropertyDetails = {
          ...DEFAULT_MOCK_PROPERTY,
          ...initialProperty,
        };

        const newSession: EvaluationSession = {
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          step: "snapshot",
          property: newProperty,
          buyerContext: DEFAULT_MOCK_BUYER_CONTEXT,
          checklist: DEFAULT_CHECKLIST,
        };

        set((state) => ({
          currentEvaluation: newSession,
          evaluations: {
            ...state.evaluations,
            [id]: newSession
          }
        }));

        return id;
      },

      loadEvaluation: (id) => {
        const existing = get().evaluations[id];
        if (existing) {
          set({ currentEvaluation: existing });
        }
      },

      updateProperty: (id, updates) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem) return state;

          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            property: {
              ...evalItem.property,
              ...updates
            }
          };

          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: {
              ...state.evaluations,
              [id]: updatedEval
            }
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
            buyerContext: {
              ...evalItem.buyerContext,
              ...contextUpdates
            }
          };

          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: {
              ...state.evaluations,
              [id]: updatedEval
            }
          };
        });
      },

      updateChecklistItem: (id, itemId, updates) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem || !evalItem.checklist) return state;

          const updatedChecklist = evalItem.checklist.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item
          );

          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            checklist: updatedChecklist
          };

          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: {
              ...state.evaluations,
              [id]: updatedEval
            }
          };
        });
      },

      resolveQuestion: (id, questionId, status) => {
        set((state) => {
          const evalItem = state.evaluations[id];
          if (!evalItem || !evalItem.questions) return state;

          const updatedQuestions = evalItem.questions.map((q) =>
            q.id === questionId ? { ...q, status } : q
          );

          const updatedEval: EvaluationSession = {
            ...evalItem,
            updatedAt: new Date().toISOString(),
            questions: updatedQuestions
          };

          return {
            currentEvaluation: state.currentEvaluation?.id === id ? updatedEval : state.currentEvaluation,
            evaluations: {
              ...state.evaluations,
              [id]: updatedEval
            }
          };
        });
      }
    }),
    {
      name: 'homecheck-evaluation-storage',
    }
  )
);
