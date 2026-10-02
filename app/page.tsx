import { TopBanner } from "@/components/landing/top-banner";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/hero";
import { FeatureRow } from "@/components/landing/feature-row";
import { SketchRow } from "@/components/landing/sketch-row";
import { MissionStatement } from "@/components/landing/mission-statement";
import { StatsRow } from "@/components/landing/stats-row";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { CtaSection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="landing-root min-h-screen bg-[#F4F1EC] font-sans flex flex-col">
      {/* ── 0. Top announcement banner ──────────────────────── */}
      <TopBanner />

      {/* ── 1. Navbar ───────────────────────────────────────── */}
      <LandingNav />

      <main className="flex-1">
        {/* ── 2. Hero: headline + full-bleed image + floating search card ── */}
        <LandingHero />

        {/* ── 3. Feature icons row ────────────────────────────── */}
        <FeatureRow />

        {/* ── 4. Architectural sketch row ─────────────────────── */}
        <SketchRow />

        {/* ── 5. Mixed-weight mission statement ───────────────── */}
        <MissionStatement />

        {/* ── 6. 4-KPI stats divider row ──────────────────────── */}
        <StatsRow />

        {/* ── 7. How HomeCheck Works (feature cards grid) ─────── */}
        <HowItWorksSection />

        {/* ── 8. Testimonials ─────────────────────────────────── */}
        <TestimonialsSection />

        {/* ── 9. Dark CTA section with map pattern ────────────── */}
        <CtaSection />
      </main>

      {/* ── 10. Footer ──────────────────────────────────────── */}
      <LandingFooter />
    </div>
  );
}
