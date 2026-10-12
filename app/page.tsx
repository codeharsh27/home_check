import React from 'react';
import { StickyNavbar } from '@/components/layout/nav';
import { HeroSection } from '@/components/landing/hero';
import { CoreEnginesSection } from '@/components/landing/core-engines';
import { BentoTestimonialsSection } from '@/components/landing/bento-testimonials';
import { PricingMatrixSection } from '@/components/landing/pricing-matrix';
import { InteractiveDossierSection } from '@/components/landing/interactive-dossier';
import { BuyerGuidesSection } from '@/components/landing/buyer-guides';
import { DarkCTABannerSection } from '@/components/landing/dark-cta';
import { DarkFooter } from '@/components/landing/dark-footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col font-sans selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      {/* Sticky Navigation Bar (Reveals smoothly on scroll) */}
      <StickyNavbar />

      <main className="flex-1">
        {/* Section 1 & 2: Full-Bleed Atmospheric Mountain Hero + Top Navbar + 4-Item Strip */}
        <HeroSection />

        {/* Section 3: "Deep diligence for modern buyers" — 3 Alternating Rows in 1px Grid */}
        <CoreEnginesSection />

        {/* Section 4: "Hear from buyers like you" — 6-Card Asymmetric Bento Grid */}
        <BentoTestimonialsSection />

        {/* Section 5 & 6: "Simple, scalable pricing" + "Plans and features" Comparison Table */}
        <PricingMatrixSection />

        {/* Section 7: Mid-Page Mountain Vignette + Manifesto + 4-Tab Valley Showcase + 6-Grid */}
        <InteractiveDossierSection />

        {/* Section 8: "Our most recent articles" — 3-Column Blog Grid */}
        <BuyerGuidesSection />

        {/* Section 9: Bottom CTA Banner with Monochrome Mountain Vignette */}
        <DarkCTABannerSection />
      </main>

      {/* Section 10: Minimalist Dark Footer + Giant Hedvig Letters Serif Wordmark */}
      <DarkFooter />
    </div>
  );
}
