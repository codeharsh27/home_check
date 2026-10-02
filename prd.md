# HomeCheck

## Property Evaluation & Due-Diligence Workspace

**Document type:** MVP PRD
**Product stage:** Portfolio MVP / prototype
**Target market:** India
**Primary user:** First-time property buyer
**Primary use case:** Evaluating a shortlisted property before making a financial commitment

---

# 1. Product Summary

HomeCheck is a decision-support workspace for first-time property buyers who have already shortlisted a property and want to understand whether they have enough information to move forward.

The product does not recommend whether the user should buy or reject a property.

Instead, it helps the buyer:

1. Understand the property they are evaluating.
2. Understand their financial position relative to the property.
3. Identify what information they currently have.
4. Identify what information is still missing.
5. Understand what they should request from the seller/developer.
6. Track documents/information received.
7. Identify areas that require professional verification.
8. Maintain a clear list of unresolved questions.
9. Know the next action required before proceeding.

### Core product promise

> **Know what you know, what you don't know, and what to do next before committing money to a property.**

---

# 2. Problem Statement

First-time property buyers often reach a shortlisted property with fragmented information.

They may know:

* Property price
* Location
* Size
* Amenities
* Seller/developer
* Some basic property details

But they may not know:

* Whether the purchase fits their financial situation.
* What additional costs they need to consider.
* What information/documents they should request.
* Which information can be self-checked.
* Which areas require professional verification.
* What is still unknown.
* What should happen next in the buying process.

Today, buyers coordinate this information across:

* Property portals
* Developers/brokers
* Google
* YouTube
* Banks
* Spreadsheets/calculators
* Friends/family
* Lawyers
* Government/property systems
* AI tools

This fragmented workflow creates repeated research, uncertainty and difficulty maintaining a clear picture of the property.

---

# 3. Target User

## Primary persona

### First-time property buyer

A person who:

* Has shortlisted one or more properties.
* Has limited property-buying experience.
* Is considering a significant financial commitment.
* Wants to understand affordability.
* Does not know the complete verification process.
* May not know which professionals to involve or when.
* Wants confidence before paying a token/booking amount or progressing further.

### Important constraint

The user does **not necessarily possess property documents at the beginning.**

Therefore, the product must not assume that documents are available immediately.

---

# 4. User Journey

The MVP is based on the actual buying-stage progression:

```text
Discover property
       ↓
Shortlist property
       ↓
Initial evaluation
       ↓
Decide whether worth investigating
       ↓
Request information/documents
       ↓
Receive information/documents
       ↓
Verification
       ↓
Professional review where required
       ↓
Resolve open questions
       ↓
Negotiation / booking / next decision
```

HomeCheck begins at:

> **Shortlisted property**

It does not attempt to replace property discovery platforms.

---

# 5. Product Goal

Help a first-time buyer answer:

> **“What do I need to know and do before I move forward with this property?”**

The product should reduce:

* Unnecessary research
* Repeated information gathering
* Process confusion
* Forgotten checks
* Unclear next steps
* Premature financial commitment

---

# 6. Non-Goals

The MVP will NOT:

* Become a property listing marketplace.
* Replace Housing/NoBroker/99acres/developer websites.
* Provide legal advice.
* Certify that a property is legally safe.
* Guarantee title/ownership.
* Approve or reject a loan.
* Provide financial advice.
* Automatically determine whether a user should buy.
* Act as a lawyer.
* Act as a bank.
* Become a lawyer marketplace.
* Provide property price predictions.
* Predict investment returns.
* Automatically verify every government/legal record.
* Provide a generic AI chatbot as the primary experience.
* Integrate directly with UPI/bank accounts in MVP.

---

# 7. Core Product Principle

## The product supports decisions; it does not make the decision.

Instead of:

> “Buy this property.”

HomeCheck says:

> “Based on the information provided, these areas are understood, these are unresolved, and these are the next actions required.”

---

# 8. Evidence Model

Every important piece of information should have a clear evidence state.

### Status types

**Verified**

Evidence has been reviewed/confirmed through an appropriate source or professional.

**User-provided**

Information was entered or uploaded by the user but has not independently been verified.

**Source-derived**

Information was obtained from an external/public source.

**Estimated**

The system calculated or estimated the value.

**Missing**

Required information is not currently available.

**Needs professional verification**

The product cannot establish the answer reliably and the user should involve an appropriate professional.

**Potential issue**

Available evidence indicates something that requires investigation.

### Important rule

> **Unknown does not mean negative.**

For example:

> Litigation: Unknown

does NOT mean:

> There is litigation.

It means:

> We don't currently have sufficient evidence to determine this.

---

# 9. MVP User Flow

## Screen 1 — Start Evaluation

### Goal

Get the user into the product with minimal effort.

### User sees

> **Evaluate a shortlisted property**

> Bring the property you are considering. We'll help organize what you know, what you need to verify, and what to do next.

### Input options

**Option A**
Paste property/listing URL

**Option B**
Upload property brochure/screenshot

**Option C**
Enter property manually

### MVP implementation

For the prototype, manual input and controlled/demo data are acceptable.

Do not spend the project timeline building complex integrations with every property portal.

---

# 10. Screen 2 — Property Snapshot

The system creates a structured property profile.

### Information

* Property name/project
* Property type
* Price
* Location
* Area
* BHK
* Floor
* Developer/seller
* Possession/status if available
* Listing/source
* Other available property information

### Example

```text
Green Valley Residency

2 BHK
₹68L
Wakad, Pune

1,050 sq ft
Developer: XYZ Developers

Source:
Property listing

Information completeness:
8/12 fields available
```

### User action

> **Confirm & continue**

The user can edit incorrect information.

---

# 11. Screen 3 — Buyer Context

The product needs minimum context about the buyer.

Do NOT create a 30-question onboarding form.

### Questions

#### Purchase purpose

* Primary residence
* Investment
* Both

#### Current income

Approximate monthly take-home income.

#### Existing monthly obligations

Existing EMI/debt obligations.

#### Available purchase funds

Approximate amount available for the purchase.

#### Emergency reserve

Amount the user wants to keep available rather than spend on the property.

#### Expected financing

* Home loan
* Family funds
* Personal funds
* Company loan
* Other
* Not decided

### Principle

Use approximate values where exact information is unnecessary.

---

# 12. Screen 4 — Financial Picture

The product converts the inputs into a simple financial picture.

### Example

```text
PROPERTY PRICE
₹68L

AVAILABLE PURCHASE FUNDS
₹15L

EXPECTED FINANCING
₹45L

ESTIMATED FUNDING GAP
₹8L+

EXISTING EMI
₹12K/month

──────────────────

Information still required:

• Exact loan eligibility
• Actual transaction costs
• Final financing terms
• Other property-specific costs
```

### Important

The system should NOT display:

> “You can afford this.”

Instead:

> **“Based on the information provided, your current funding plan has an estimated ₹8L gap.”**

The user decides what to do about that gap.

---

# 13. Screen 5 — Investigation Plan

This is the most important screen in the MVP.

The system determines:

> **“You have shortlisted this property. What information should you investigate before moving forward?”**

The checklist should be **stage-aware and property-type-aware.**

It should not assume documents are already available.

---

## Example

### Before requesting documents

### Ownership & title

**What to understand**

Whether the seller has the relevant authority/ownership to sell the property.

**Current status**

Missing

**Next action**

Request relevant ownership/title information from the seller and arrange appropriate professional review.

---

### Encumbrance / mortgage

**What to understand**

Whether relevant financial/legal claims or charges exist against the property.

**Current status**

Information unavailable

**Next action**

Obtain appropriate information/records and verify.

---

### Approvals

**What to understand**

Whether relevant project/property approvals are in place.

**Current status**

Partially known

**Next action**

Request/review applicable approval information.

---

### Litigation

**What to understand**

Whether there are known legal disputes relevant to the property.

**Current status**

Not established

**Next action**

Professional verification recommended.

---

# 14. Critical Product Decision: Request vs Verify

The product must distinguish these.

### Request

> “You need to obtain this information.”

### Verify

> “You have obtained the information. It now needs to be checked.”

### Professional verification

> “This is beyond what the product should determine reliably.”

This avoids the bad UX of showing every document as:

> “Missing.”

---

# 15. Screen 6 — Information Collection

Once the user decides:

> **“I'm seriously interested in this property.”**

they can begin collecting information.

### User can:

* Mark information as requested.
* Mark information as received.
* Upload documents.
* Add notes.
* Record seller responses.
* Add external source links.
* Mark information as unavailable.

### Example

```text
Ownership information
Requested ✓
Received ✓

Sale deed
Received ✓

Encumbrance information
Requested ✓
Received ✕

Approvals
Received ✓

Litigation
Professional review required
```

---

# 16. Document Upload

Document upload is **not the entry point**.

It becomes available only after the user enters the investigation stage.

### Supported MVP behavior

User uploads:

* PDF
* Image
* Document

The product stores it against the relevant checklist item.

Example:

```text
Sale Deed
────────────────
Status: User-provided

Uploaded:
sale_deed.pdf

Next:
Professional review recommended
```

---

# 17. AI Document Assistance

AI can be used to reduce information-processing effort.

### AI may:

* Extract names/dates/addresses.
* Identify document type.
* Summarize document contents.
* Highlight missing fields.
* Explain unfamiliar terminology.
* Generate questions for a lawyer.
* Generate questions for the seller.
* Map extracted information to checklist fields.

### AI must NOT:

* Declare a property legally safe.
* Guarantee ownership.
* Guarantee absence of litigation.
* Replace a lawyer.
* Make the buy/don't-buy decision.
* Invent missing information.
* Present uncertain extraction as verified fact.

Every AI-derived result should be clearly labeled.

---

# 18. Screen 7 — Verification Workspace

This is where the product tracks the evidence.

### Example

| Area         | Status                          | Evidence          |
| ------------ | ------------------------------- | ----------------- |
| Ownership    | User-provided                   | Sale deed         |
| Encumbrance  | Missing                         | —                 |
| Approval     | Received                        | Approval document |
| Property tax | User-provided                   | Tax receipt       |
| Litigation   | Needs professional verification | —                 |

Clicking an item opens:

### What we know

Information currently available.

### What we don't know

Missing information.

### Why it matters

Plain-language explanation.

### What to do next

Specific action.

### Who can help

Seller / bank / lawyer / government source / other appropriate actor.

---

# 19. Screen 8 — Open Questions

Instead of making the user remember everything, the product maintains an unresolved-question list.

### Example

## Questions to resolve

🔴 **Ownership**

> Confirm the seller's authority to sell.

🟠 **Financing**

> Confirm actual loan eligibility.

🟠 **Encumbrance**

> Obtain and verify relevant information.

🟡 **Maintenance**

> Confirm recurring maintenance charges.

### User action

Mark:

* Resolved
* Not applicable
* Needs professional help
* Follow up later

---

# 20. Screen 9 — Next Actions

This is the product's core output.

Instead of a generic checklist, produce:

# Your next actions

### 1. Request ownership information

**Why:** Current information is insufficient.

**Who:** Seller/developer

**Status:** Not requested

---

### 2. Confirm financing eligibility

**Why:** Current expected financing has not been verified.

**Who:** Lender

**Status:** Pending

---

### 3. Arrange professional property review

**Why:** Certain legal questions cannot be established reliably through the product.

**Who:** Qualified property professional

**Status:** Pending

---

### 4. Resolve funding gap

**Why:** Current financial inputs indicate an estimated funding gap.

**Status:** Pending

---

# 21. Final Screen — Decision Readiness

This should NOT be called:

> Property Score

or:

> Buy Score

or:

> Risk Score

because that would encourage the product to make a decision for the user.

Instead:

# Property Evaluation Status

```text
FINANCIAL
🟡 Some information unresolved

PROPERTY INFORMATION
🟢 8/10 items available

DUE DILIGENCE
🟡 3 items unresolved

PROFESSIONAL REVIEW
🟠 Required for 2 areas

NEXT ACTIONS
4 remaining
```

Then:

> **You don't yet have enough verified information to complete your evaluation.**

or:

> **Most planned checks are complete. 2 items still require resolution before you proceed.**

The product doesn't tell the buyer what decision to make.

---

# 22. MVP Feature Priority

## P0 — Must build

### Property intake

* Manual property entry
* URL/demo import
* Upload brochure/image

### Property workspace

* Property details
* Source
* Edit/correct information

### Buyer financial context

* Income
* Existing obligations
* Available funds
* Emergency reserve
* Expected financing

### Financial evaluation

* Purchase price
* Funding sources
* Funding gap
* Estimated monthly obligation
* Missing financial inputs

### Investigation plan

* Contextual checklist
* Request vs verify distinction
* Status tracking

### Evidence tracker

* User-provided
* Source-derived
* Missing
* Estimated
* Needs professional verification
* Potential issue

### Next-action engine

* What to do
* Why
* Who to contact
* Current status

### Decision-readiness dashboard

* Completed
* Missing
* Unresolved
* Professional review
* Next steps

---

# 23. P1 — Do later

These features can strengthen V2 but should not delay the MVP.

### Property comparison

Compare two shortlisted properties.

### Location evaluation

* Commute
* Transport
* Schools
* Healthcare
* Amenities

### Price context

Comparable properties / market information.

### Lawyer discovery

Find relevant professionals.

### Seller question generator

Generate questions based on missing information.

### Negotiation workspace

Track:

* Asking price
* Counteroffer
* Parking
* Maintenance
* Other terms

---

# 24. P2 — Do not build for portfolio MVP

* UPI integration
* Bank integration
* Account Aggregator integration
* Automated government-record verification
* Property price prediction
* Investment-return prediction
* Property marketplace
* Loan marketplace
* AI property advisor
* Generic AI chatbot
* Full legal verification
* Automated legal opinion

---

# 25. AI Architecture

AI should be used selectively.

## Rule

> **Automate information processing, not high-stakes judgment.**

### Good AI use cases

```text
Unstructured information
        ↓
       AI
        ↓
Structured information
        ↓
Human verification
```

Examples:

* PDF → fields
* Screenshot → property details
* Document → summary
* User situation → questions
* Missing information → suggested follow-ups

### Bad AI use case

```text
Property documents
      ↓
      AI
      ↓
"SAFE TO BUY"
```

Do not build this.

---

# 26. Chatbot Decision

The MVP will NOT have a standalone chatbot as the primary interface.

Instead, AI assistance appears contextually.

For example:

### On an ownership item

> **Explain this**

AI explains the concept.

### On a missing item

> **What should I ask the seller?**

AI generates relevant questions.

### On a document

> **Summarize this document**

AI summarizes it.

### On an unresolved issue

> **Prepare questions for my lawyer**

AI creates a question list.

This makes AI part of the workflow rather than making the product:

> “ChatGPT but for property.”

---

# 27. Trust & Safety Requirements

Every important output must distinguish:

### Fact

> Property listing states ₹68L.

### User input

> User entered ₹15L available funds.

### Calculation

> Estimated funding gap: ₹8L.

### Unknown

> No information currently available.

### Professional verification

> Requires qualified professional review.

### AI interpretation

> AI-generated summary; verify against the original document.

This is critical because the product deals with:

* Large financial commitments
* Legal information
* Property ownership
* Documents

---

# 28. Success Metrics

Because property buying is a low-frequency activity, DAU/MAU should not be the primary success metric.

For the MVP prototype, focus on **workflow completion and decision-support quality**.

### Primary metric

**Completed property evaluations**

Definition:

> User creates a property evaluation and reaches a state where they can clearly see unresolved information and next actions.

### Supporting metrics

**Activation**

* Property evaluation started
* Property details confirmed

**Completion**

* Financial context completed
* Investigation plan reviewed
* Next actions generated

**Engagement**

* Information items updated
* Documents/information added
* Open questions resolved

**Outcome**

* User reports greater clarity about next steps.

### Trust

* Information correction rate
* AI output correction rate
* User-reported misleading information

---

# 29. Key Product Risks

## Risk 1 — Users don't trust the product

Mitigation:

* Evidence labels
* Sources
* No false certainty
* Professional-review boundaries

---

## Risk 2 — Users can simply use ChatGPT

Mitigation:

HomeCheck should own:

* Property context
* Stage
* Evidence
* Checklist state
* Documents
* Open questions
* Next actions

The moat is not the chatbot.

It is the **workflow + context + state**.

---

## Risk 3 — Users don't have documents

Mitigation:

Do not require documents at onboarding.

Use:

> Shortlist → Initial evaluation → Request information → Receive → Verify.

---

## Risk 4 — Legal information varies by property/location

Mitigation:

* Make checklists contextual.
* Avoid universal claims.
* Show sources.
* Flag professional verification.
* Don't present generic AI output as legal advice.

---

## Risk 5 — Scope becomes enormous

Mitigation:

MVP focuses on:

> **Shortlisted property → evaluation → evidence → gaps → next actions**

Everything else is secondary.

---

# 30. MVP Prototype Definition

For your portfolio, you do **not** need a production-grade platform.

Build one polished end-to-end experience.

### Demo scenario

Use a realistic fictional property:

> **₹68L 2BHK in Pune**

Then demonstrate:

```text
1. Paste property
        ↓
2. Confirm property details
        ↓
3. Enter financial situation
        ↓
4. See financial picture
        ↓
5. Start investigation
        ↓
6. See contextual information checklist
        ↓
7. Mark some information as received
        ↓
8. Upload example documents
        ↓
9. AI extracts/organizes information
        ↓
10. Identify unresolved areas
        ↓
11. Generate next actions
        ↓
12. View decision-readiness dashboard
```

That is enough for a **strong portfolio MVP**.

---

# 31. The One-Sentence Product Definition

> **HomeCheck helps first-time property buyers evaluate a shortlisted property by organizing their financial position, available evidence, missing information, professional-verification needs, and next actions before they commit money.**

---

# 32. The Portfolio Story

When you eventually present this project to a recruiter/interviewer, the story shouldn't be:

> “I built an AI property app.”

It should be:

> **“I investigated why first-time buyers struggle after shortlisting a property and found that the problem wasn't simply finding information—it was coordinating financial, property, legal and process information across different stages of the purchase.”**

Then:

> **“I designed a stage-aware evaluation workspace that separates known information from unknowns and guides users toward the next appropriate action without pretending to replace lawyers or financial professionals.”**

Then you can show:

**Research → Insight → Prioritization → MVP → UX → AI decisions → Prototype → Experiment → Learnings**

That is a **PM portfolio case study**, rather than simply a software project.

---

# 33. What you should build NOW

Do **not** start with backend architecture.

Do **not** start with AI.

Do **not** start with UPI.

Do **not** start scraping property portals.

Build these **8 screens** first:

### 01

**Start Evaluation**

### 02

**Property Snapshot**

### 03

**Buyer Financial Context**

### 04

**Financial Picture**

### 05

**Investigation Plan**

### 06

**Information / Evidence Workspace**

### 07

**Open Questions + Next Actions**

### 08

**Decision-Readiness Dashboard**

If those eight screens create a coherent experience, **then** we decide which parts need actual code, AI, APIs, databases, or mock data.

That is the order I would use if we were actually working together on a product team.
