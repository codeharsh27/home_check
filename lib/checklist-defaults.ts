// Re-export from engine for backward compatibility
export { generateChecklist as DEFAULT_CHECKLIST_GENERATOR } from './checklist-engine';

// Default checklist for Apartment Under Construction (most common case)
import { generateChecklist } from './checklist-engine';
export const DEFAULT_CHECKLIST = generateChecklist('Apartment', 'Under construction');
