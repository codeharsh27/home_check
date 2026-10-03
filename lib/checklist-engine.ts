import { ChecklistItem, PropertyDetails } from '@/types';

function makeItem(
  id: string,
  category: ChecklistItem['category'],
  title: string,
  description: string,
  whyItMatters: string,
  nextAction: string,
  whoToContact: ChecklistItem['whoToContact'],
  overrides: Partial<ChecklistItem> = {}
): ChecklistItem {
  return {
    id,
    category,
    title,
    description,
    whyItMatters,
    nextAction,
    whoToContact,
    status: 'missing',
    requested: false,
    received: false,
    isRequired: true,
    ...overrides,
  };
}

// ─── ITEM DEFINITIONS ────────────────────────────────────────────────────────

const ITEMS = {
  // OWNERSHIP
  ownershipTitle: () =>
    makeItem(
      'item_ownership_title',
      'ownership',
      'Seller Authority & Ownership Title',
      'Verify seller or developer has undisputed legal authority to sell the property.',
      'Purchasing from an unauthorized seller can result in invalid ownership and unrecoverable financial loss.',
      'Request Sale Deed / Allotment Letter from seller',
      'Seller / Developer'
    ),

  motherDeed: () =>
    makeItem(
      'item_mother_deed',
      'ownership',
      'Mother Deed / 30-Year Title Chain',
      'Chain of ownership transfers for at least 30 years tracing continuous clear title.',
      'Gaps in the title chain expose buyers to third-party ownership disputes that may surface after purchase.',
      'Request all historical title deeds from seller for 30-year period',
      'Seller / Developer'
    ),

  powerOfAttorney: () =>
    makeItem(
      'item_poa',
      'ownership',
      'Power of Attorney (if applicable)',
      'If the seller is acting on behalf of the owner, a valid registered PoA must exist.',
      'Selling via unregistered or revoked PoA is legally invalid and the sale can be voided.',
      'Request and verify Power of Attorney document if seller is not the registered owner',
      'Property Lawyer'
    ),

  // APPROVALS
  rera: () =>
    makeItem(
      'item_rera',
      'approvals',
      'RERA Registration & Project Compliance',
      'Confirm the project is registered under state RERA with valid registration number.',
      'Unregistered projects lack statutory buyer protections and RERA dispute resolution oversight.',
      'Verify listed RERA ID on official state RERA portal',
      'RERA / Govt'
    ),

  sanctionPlan: () =>
    makeItem(
      'item_sanction_plan',
      'approvals',
      'Approved Building Sanction Plan',
      'Layout plan approved by local municipal corporation or development authority.',
      'Unapproved construction deviations can attract demolition orders or prevent loan disbursements.',
      'Request sanctioned layout plan copy from developer',
      'Seller / Developer'
    ),

  commencementCert: () =>
    makeItem(
      'item_cc',
      'approvals',
      'Commencement Certificate (CC)',
      'Municipal authorization permitting construction start.',
      'Construction without CC is illegal and affects loan eligibility from most banks.',
      'Request CC copy from developer before paying any booking amount',
      'Seller / Developer'
    ),

  occupancyCert: () =>
    makeItem(
      'item_oc',
      'approvals',
      'Occupancy Certificate (OC)',
      'Municipal certificate confirming building is fit for occupation as per approved plans.',
      'Living without OC is illegal in most states. It prevents permanent water/electricity connection and affects resale.',
      'Request OC copy from developer or registrar office',
      'Seller / Developer'
    ),

  naOrder: () =>
    makeItem(
      'item_na_order',
      'approvals',
      'Non-Agricultural (NA) Order',
      'Order confirming agricultural land has been converted to residential / non-agricultural use.',
      'Plot on agricultural land without NA order cannot be legally sold for residential construction.',
      'Request NA order copy from seller or talathi office',
      'RERA / Govt'
    ),

  zoneConversion: () =>
    makeItem(
      'item_zone',
      'approvals',
      'Zone Classification & Conversion',
      'Confirmation the plot falls in a residential/commercial zone as per town planning scheme.',
      'Construction on green belt, reserved forest, or flood zone land is prohibited and can be demolished.',
      'Check plot zone in local development plan / municipal website',
      'RERA / Govt'
    ),

  litigation: () =>
    makeItem(
      'item_litigation',
      'approvals',
      'Litigation & Court Search Status',
      'Verification of pending legal disputes in local civil courts, DRT, or revenue tribunals.',
      'Pending litigation can freeze property transfer rights or tie up your investment indefinitely.',
      'Engage a property lawyer for public notice and court search',
      'Property Lawyer',
      { status: 'needs-pro' }
    ),

  // FINANCIAL
  encumbrance: () =>
    makeItem(
      'item_ec',
      'financial',
      'Encumbrance Certificate (EC) for 13–30 Years',
      'Official sub-registrar record showing all registered transactions, mortgages, or charges.',
      'Proves whether property is pledged as collateral for an existing loan. Unpaid mortgage stays with the property.',
      'Obtain Form 15/16 EC from sub-registrar office or online portal',
      'RERA / Govt'
    ),

  taxReceipts: () =>
    makeItem(
      'item_tax_receipts',
      'financial',
      'Property Tax Dues & Latest Paid Receipts',
      'Confirmation of paid property tax with latest receipts from municipal corporation.',
      'Unpaid property taxes become a legal lien against the property and become the buyer\'s liability.',
      'Request latest 2-3 years property tax receipts from seller',
      'Seller / Developer'
    ),

  bankNoc: () =>
    makeItem(
      'item_bank_noc',
      'financial',
      'Developer Bank NOC / Mortgage Release Letter',
      'Release letter from developer\'s bank confirming your specific flat is freed from project mortgage.',
      "If developer defaults on their project loan, bank can auction your mortgaged flat even if you've paid in full.",
      'Request bank NOC letter specific to your flat/unit number',
      'Seller / Developer'
    ),

  // CONDITION
  structuralInspection: () =>
    makeItem(
      'item_structural',
      'condition',
      'Structural Integrity & Civil Inspection',
      'Physical inspection by a qualified civil engineer assessing structure, walls, plumbing, and electrical.',
      'Structural defects discovered post-purchase can cost lakhs to repair and are the buyer\'s liability.',
      'Hire an independent civil engineer for a pre-purchase inspection',
      'Self',
      { status: 'needs-pro' }
    ),

  amenitiesVerification: () =>
    makeItem(
      'item_amenities',
      'condition',
      'Amenities & Common Area Verification',
      'Physical verification that promised amenities (clubhouse, gym, pool) are completed or committed in agreement.',
      'Undelivered amenities in completed projects often result in denied claims — document what exists.',
      'Physically inspect premises and compare with developer\'s brochure commitments',
      'Self'
    ),

  // COSTS
  maintenance: () =>
    makeItem(
      'item_maintenance',
      'costs',
      'Society Maintenance & One-Time Corpus Fund',
      'Exact monthly maintenance rate, advance corpus fund, and one-time development charges.',
      'Hidden corpus deposits or high maintenance can significantly impact monthly cash flow.',
      'Request itemized cost sheet with all one-time and recurring charges from developer',
      'Seller / Developer'
    ),

  stampDutyEstimate: () =>
    makeItem(
      'item_stamp_duty',
      'costs',
      'Stamp Duty & Registration Cost Estimate',
      'Estimated stamp duty and registration costs for the property transaction (typically 5-7% in Maharashtra).',
      'These are unavoidable transaction costs. Underpreparing for them creates last-minute cash flow crises.',
      'Obtain exact stamp duty rate from registrar or consult property lawyer',
      'Self',
      { status: 'estimated' }
    ),

  constructionSchedule: () =>
    makeItem(
      'item_construction_schedule',
      'costs',
      'Payment Schedule & Construction Milestones',
      'Slab-wise or possession-linked payment schedule from developer with specific dates.',
      'Construction delays directly affect your loan disbursement schedule and rental/living situation.',
      'Request written payment schedule with RERA-committed possession date',
      'Seller / Developer'
    ),
};

// ─── CHECKLIST ENGINE ─────────────────────────────────────────────────────────

export function generateChecklist(
  propertyType: PropertyDetails['type'],
  possessionStatus?: PropertyDetails['possessionStatus']
): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // Universal items — apply to all property types
  items.push(
    ITEMS.ownershipTitle(),
    ITEMS.motherDeed(),
    ITEMS.litigation(),
    ITEMS.encumbrance(),
    ITEMS.taxReceipts(),
    ITEMS.maintenance(),
    ITEMS.stampDutyEstimate()
  );

  if (propertyType === 'Apartment') {
    items.push(
      ITEMS.rera(),
      ITEMS.sanctionPlan(),
      ITEMS.bankNoc(),
      ITEMS.amenitiesVerification()
    );

    if (possessionStatus === 'Under construction' || possessionStatus === 'Pre-launch') {
      items.push(ITEMS.commencementCert(), ITEMS.constructionSchedule());
    } else if (possessionStatus === 'Ready to move') {
      items.push(ITEMS.occupancyCert());
    } else {
      // Unknown possession status — include both
      items.push(ITEMS.commencementCert(), ITEMS.occupancyCert());
    }
  }

  if (propertyType === 'Villa' || propertyType === 'Independent House') {
    items.push(
      ITEMS.rera(),
      ITEMS.sanctionPlan(),
      ITEMS.structuralInspection(),
      ITEMS.bankNoc()
    );
    if (possessionStatus === 'Ready to move') {
      items.push(ITEMS.occupancyCert());
    } else {
      items.push(ITEMS.commencementCert(), ITEMS.constructionSchedule());
    }
  }

  if (propertyType === 'Plot') {
    items.push(
      ITEMS.naOrder(),
      ITEMS.zoneConversion(),
      ITEMS.powerOfAttorney()
    );
  }

  if (propertyType === 'Other') {
    items.push(ITEMS.rera(), ITEMS.sanctionPlan(), ITEMS.bankNoc());
  }

  // Deduplicate by id in case of overlaps
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function generateQuestionsFromChecklist(
  checklist: ChecklistItem[]
): import('@/types').OpenQuestion[] {
  const highPriorityCategories: ChecklistItem['category'][] = ['ownership', 'approvals', 'financial'];

  return checklist
    .filter((item) => !item.received && item.status !== 'verified')
    .map((item) => ({
      id: `q_${item.id}`,
      category: getCategoryLabel(item.category),
      title: item.title,
      description: item.nextAction,
      severity: (
        item.status === 'needs-pro' ? 'high'
          : highPriorityCategories.includes(item.category) ? 'medium'
            : 'low'
      ) as 'high' | 'medium' | 'low',
      status: 'open' as const,
      sourceChecklistItemId: item.id,
    }));
}

export function generateSellerQuestions(
  property: PropertyDetails,
  checklist: ChecklistItem[]
): string[] {
  const sellerItems = checklist.filter(
    (i) => i.whoToContact === 'Seller / Developer' && !i.received
  );

  if (sellerItems.length === 0) {
    return [`All seller-related documents for ${property.name} have been received.`];
  }

  return sellerItems.map((item, idx) => {
    return `${idx + 1}. ${item.title}: ${item.nextAction}.`
      + (item.whyItMatters ? ` Important because: ${item.whyItMatters.split('.')[0]}.` : '');
  });
}

export function generateLawyerQuestions(
  property: PropertyDetails,
  checklist: ChecklistItem[]
): string[] {
  const legalItems = checklist.filter(
    (i) =>
      i.whoToContact === 'Property Lawyer' ||
      i.status === 'needs-pro' ||
      i.category === 'ownership' ||
      i.id === 'item_ec'
  );

  const questions: string[] = [];

  questions.push(
    `1. Can you conduct a 30-year title search at the sub-registrar office for ${property.name} in ${property.location} to verify an unbroken ownership chain?`
  );
  questions.push(
    `2. Does the Encumbrance Certificate (EC) for this property show any registered mortgages, liens, or legal charges that would affect transfer?`
  );
  questions.push(
    `3. Are there any pending litigations, court stays, or disputes against the developer, seller, or the land parcel?`
  );

  if (property.type === 'Apartment') {
    questions.push(`4. Are the RERA commitments in the Agreement for Sale compliant with buyer protection norms under RERA ${property.state || 'state'} regulations?`);
    questions.push(`5. Is the developer's bank NOC specific to our flat unit, releasing it from any project-level mortgage?`);
  }

  if (property.type === 'Plot') {
    questions.push(`4. Is the NA (Non-Agricultural) order valid and does it cover the specific survey numbers of this plot?`);
    questions.push(`5. Is the land classified in a residential zone in the current Town Planning Scheme?`);
  }

  legalItems
    .filter((item) => item.status === 'needs-pro' && !questions.some((q) => q.includes(item.title)))
    .forEach((item, idx) => {
      questions.push(`${questions.length + 1}. ${item.title}: ${item.nextAction}`);
    });

  return questions;
}

function getCategoryLabel(category: ChecklistItem['category']): string {
  const labels: Record<ChecklistItem['category'], string> = {
    ownership: 'Ownership & Title',
    approvals: 'Legal & Approvals',
    financial: 'Financial & Encumbrance',
    condition: 'Property Condition',
    costs: 'Costs & Charges',
  };
  return labels[category];
}
