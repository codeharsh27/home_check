# HomeCheck. 🏡🔍

> **Never commit to a property blindly.**  
> Institutional-grade property underwriting and due-diligence platform for home buyers in India.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 📌 The Problem HomeCheck Solves

Buying a home is often a family's largest lifetime investment. Traditional listing portals (Housing, NoBroker, 99acres) focus purely on marketing brochures and base quoted prices. They fail to disclose:

1. **The Real Handover Cash Drain**: Banks only finance 80% of the Base Agreement Value. Mandatory statutory duties (Stamp Duty & Registration), 2-year advance society maintenance deposits, parking, and essential interior fitouts require **₹15L–₹25L in liquid cash** before possession.
2. **Stage-Gated Legal Blindspots**: Buyers routinely lose hard-earned token money by signing non-refundable booking forms before verifying the 30-year Nil Encumbrance Certificate (EC), municipal Commencement Certificate (CC) floor sanction, or lender Bank NOC.
3. **Micro-Market Pricing Reality**: Builders quote artificially low base rates, then tack on ₹6L–₹10L in floor rise, PLC, and infrastructure charges. Buyers need nearby comparable transaction data to negotiate effectively.

---

## ✨ Key Features

### 1. Resilient Listing Intake Engine
- **Universal Portal Support**: Paste listing links from **Housing.com**, **NoBroker**, **99acres**, and **MagicBricks**.
- **Slug Decomposition & Micro-Market Baselines**: Extract price, carpet area, BHK, developer, and RERA ID with zero failure rate.
- **Brochure & Manual Entry Support**: Upload property PDFs or input specifications manually.

### 2. 5-Step Progressive Evaluation Workflow (`/evaluation/[id]`)
- **Step 1: Intake & Scan** — Verify extracted specifications and calculated rate per sq.ft.
- **Step 2: Intent & Wallet** — Multi-source financing (Personal savings, home loan, family support, company loan) with automated Debt-to-Income (DTI) calibration.
- **Step 3: Market Reality & Comparables** — Benchmark asking rate against locality median closes and inspect active alternatives within 2–4 km.
- **Step 4: Investigation & Legal Due Diligence** — Free developer checks vs. independent advocate mandatory scrutiny.
- **Step 5: Executive Decision Dossier** — Printable report with stage-gated document checklists, professional engagement guide, and negotiation strategies.

### 3. Financial Intelligence & Stress Testing
- **Handover Cash Drain Ladder**: Full breakdown of down payment, stamp duty, society sinking fund, infrastructure, and fitouts.
- **Floating Rate Hike Stress Test**: Models a +1.25% RBI repo rate hike, showing monthly payment increases and tenure extension risks.
- **4 Actionable Money-Saving Strategies**: Section 24(b) / 80C tax rebates, female co-ownership stamp duty concessions (save ~1%), and the 1-extra-EMI prepayment accelerator.

### 4. Stage-Gated Document Checklist
- **Stage 1 (Pre-Token)**: RERA registration, title deed, booking form refund clauses.
- **Stage 2 (Pre-Agreement)**: 30-year EC (Form 15), CC floor validation, JDA allocation, construction lender Bank NOC.
- **Stage 3 (Possession & Handover)**: Occupancy Certificate (OC), joint snagging defect audit, demarcated covered parking allotment.

### 5. Mobile-First Modern Fintech Aesthetic
- Light, distraction-free **Linear × Notion × Modern Fintech** design (`#FAF8F5` canvas, stone borders, blue accents).
- Touch-friendly responsive navigation with mobile drawer and dynamic step indicator.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom stone & fintech palette
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with `localStorage` persistence
- **Auth & Database**: [Supabase](https://supabase.com/) (Optional cloud sync with anonymous local fallback)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18.17 or higher
- npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/codeharsh27/home_check.git
cd home_check
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Supabase credentials for cloud sync & auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Gemini API key for brochure extraction
GEMINI_API_KEY=your-gemini-key
```
*(Note: HomeCheck works out of the box with local browser storage even without Supabase!)*

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Production Deployment (Vercel)

The fastest and most reliable way to host HomeCheck is on **Vercel**:

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import the `home_check` repository.
4. Click **Deploy**.

Vercel automatically detects Next.js 14, configures serverless API functions, and deploys the app on global CDN edges with free automatic SSL.

---

## 📂 Project Structure

```text
├── app/
│   ├── admin/                  # Underwriting funnel & platform metrics dashboard
│   ├── api/
│   │   ├── parse-url/          # Resilient property listing URL extractor
│   │   └── property/
│   │       └── alternatives/   # Hyper-local comparable listings API
│   ├── evaluation/[id]/        # 5-step progressive evaluation workspace
│   ├── layout.tsx              # SEO metadata, OpenGraph & viewport config
│   └── page.tsx                # High-converting landing page
├── components/
│   ├── auth/                   # Value-gated auth & progress saving modals
│   ├── landing/                # Landing page sections (Hero, Showcase, Comps, FAQ)
│   ├── layout/                 # Responsive navigation, mobile drawer & footer
│   └── progressive/            # Step 1 through Step 5 evaluation components
├── lib/
│   ├── calculations.ts         # Handover cash drain, DTI, tax & stress-test engine
│   ├── regional-documents.ts   # State-specific real estate document rules
│   └── supabase.ts             # Cloud sync & auth client
├── store/
│   └── evaluation.ts           # Zustand evaluation state & persistence
└── types/
    └── index.ts                # TypeScript domain models & interfaces
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
