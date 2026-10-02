import { EvaluationSession, ChecklistItem, OpenQuestion } from "@/types";

export interface NextActionItem {
  id: string;
  title: string;
  why: string;
  who: "Seller / Developer" | "Lender / Bank" | "Property Lawyer" | "RERA / Govt" | "Self";
  status: "Pending" | "In Progress" | "Resolved";
  priority: "high" | "medium" | "low";
}

export function generateNextActions(session: EvaluationSession): NextActionItem[] {
  const actions: NextActionItem[] = [];
  const property = session.property;
  const context = session.buyerContext;
  const checklist = session.checklist || [];

  // 1. Funding gap check
  const effectiveFunds = Math.max(0, (context?.availableFunds || 0) - (context?.emergencyReserve || 0));
  const plannedLoan = 4500000;
  const gap = property.price - (effectiveFunds + plannedLoan);

  if (gap > 0) {
    actions.push({
      id: "action_funding_gap",
      title: `Resolve estimated ₹${(gap / 100000).toFixed(2)}L funding gap`,
      why: "Current funds and planned home loan do not fully cover listed property price.",
      who: "Self",
      status: "Pending",
      priority: "high",
    });
  }

  // 2. Ownership & Title action
  const titleItem = checklist.find((i) => i.id === "item_ownership_title");
  if (!titleItem || !titleItem.received) {
    actions.push({
      id: "action_ownership_docs",
      title: "Request seller authority & allotment documents",
      why: "Current information is insufficient to confirm seller's legal authority.",
      who: "Seller / Developer",
      status: titleItem?.requested ? "In Progress" : "Pending",
      priority: "high",
    });
  }

  // 3. Bank Loan sanction action
  actions.push({
    id: "action_loan_sanction",
    title: "Obtain formal pre-approval / sanction letter from lender",
    why: "Expected home loan amount is currently unconfirmed by a lender bank.",
    who: "Lender / Bank",
    status: "Pending",
    priority: "high",
  });

  // 4. Professional Legal review action
  const proItems = checklist.filter((i) => i.status === "needs-pro" || i.id === "item_litigation");
  if (proItems.length > 0) {
    actions.push({
      id: "action_lawyer_review",
      title: "Arrange professional legal review for title & court searches",
      why: "Litigation status and 30-year title chain require qualified legal verification.",
      who: "Property Lawyer",
      status: "Pending",
      priority: "medium",
    });
  }

  // 5. Encumbrance Certificate action
  const ecItem = checklist.find((i) => i.id === "item_ec");
  if (!ecItem || !ecItem.received) {
    actions.push({
      id: "action_ec_certificate",
      title: "Obtain Encumbrance Certificate (EC) for 13-30 years",
      why: "Proves whether property has existing registered mortgages or legal liens.",
      who: "RERA / Govt",
      status: ecItem?.requested ? "In Progress" : "Pending",
      priority: "medium",
    });
  }

  return actions;
}

export function generateDefaultQuestions(session: EvaluationSession): OpenQuestion[] {
  const questions: OpenQuestion[] = [
    {
      id: "q_ownership",
      category: "Ownership",
      title: "Seller Authority & Ownership Title",
      description: "Confirm seller has undisputed authority to sell without co-owner dispute.",
      severity: "high",
      status: "open",
    },
    {
      id: "q_financing",
      category: "Financing",
      title: "Confirm Loan Eligibility & Rate",
      description: "Verify bank loan sanction terms and exact interest rate options.",
      severity: "high",
      status: "open",
    },
    {
      id: "q_encumbrance",
      category: "Encumbrance",
      title: "Verify Encumbrance & Mortgage Status",
      description: "Ensure developer bank has issued NOC freeing flat from project mortgage.",
      severity: "medium",
      status: "open",
    },
    {
      id: "q_maintenance",
      category: "Costs",
      title: "Confirm Society Maintenance Charges",
      description: "Confirm recurring monthly maintenance rate and one-time corpus fund.",
      severity: "low",
      status: "open",
    },
  ];

  return questions;
}
