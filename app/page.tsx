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
      {/* ── Hero: full-screen image + transparent nav + search bar + stats ── */}
      <LandingHero />

      {/* ── Below the fold: cream background sections ───────────── */}
      <FeatureRow />
      <SketchRow />
      <MissionStatement />
      <StatsRow />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
