import { EvaluationSession } from '@/types';
import {
  calculatePlannedLoan,
  calculateFundingGap,
  formatCurrency,
} from '@/lib/calculations';

export interface NextActionItem {
  id: string;
  title: string;
  why: string;
  who: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'high' | 'medium' | 'low';
}

export function generateNextActions(session: EvaluationSession): NextActionItem[] {
  const actions: NextActionItem[] = [];
  const { property, buyerContext: context = {}, checklist = [] } = session;

  // 1. Funding gap
  const gap = calculateFundingGap(property, context);
  if (gap > 0) {
    actions.push({
      id: 'action_funding_gap',
      title: `Resolve estimated ${formatCurrency(gap)} funding gap`,
      why: 'Current funds + planned loan does not cover the listed price plus ~7% transaction costs.',
      who: 'Self',
      status: 'Pending',
      priority: 'high',
    });
  }

  // 2. Critical ownership/approvals items
  const criticalPending = checklist.filter(
    (i) => !i.received && (i.category === 'ownership' || i.category === 'approvals') && i.status !== 'needs-pro'
  );
  for (const item of criticalPending.slice(0, 3)) {
    actions.push({
      id: `action_${item.id}`,
      title: item.nextAction,
      why: item.whyItMatters.split('.')[0] + '.',
      who: item.whoToContact,
      status: item.requested ? 'In Progress' : 'Pending',
      priority: item.category === 'ownership' ? 'high' : 'medium',
    });
  }

  // 3. Home loan pre-approval — only if home loan is planned
  const usesHomeLoan = context.expectedFinancing?.includes('Home loan') ?? false;
  if (usesHomeLoan) {
    const plannedLoan = calculatePlannedLoan(property, context);
    if (plannedLoan > 0) {
      actions.push({
        id: 'action_loan_sanction',
        title: `Obtain formal loan pre-approval for ${formatCurrency(plannedLoan)}`,
        why: 'Loan eligibility is not confirmed by any lender. Pre-approval clarifies actual borrowing capacity.',
        who: 'Lender / Bank',
        status: 'Pending',
        priority: 'high',
      });
    }
  }

  // 4. Professional legal review
  const proItems = checklist.filter((i) => i.status === 'needs-pro' && !i.received);
  if (proItems.length > 0) {
    actions.push({
      id: 'action_lawyer',
      title: `Engage property lawyer for ${proItems.length} flagged area${proItems.length > 1 ? 's' : ''}`,
      why: 'Litigation search, title verification, and encumbrance clearance require qualified legal review.',
      who: 'Property Lawyer',
      status: 'Pending',
      priority: 'medium',
    });
  }

  // 5. Financial checklist items
  const financialPending = checklist.filter(
    (i) => !i.received && i.category === 'financial' && i.status !== 'needs-pro'
  );
  for (const item of financialPending.slice(0, 2)) {
    actions.push({
      id: `action_fin_${item.id}`,
      title: item.nextAction,
      why: item.whyItMatters.split('.')[0] + '.',
      who: item.whoToContact,
      status: item.requested ? 'In Progress' : 'Pending',
      priority: 'medium',
    });
  }

  return actions;
}
