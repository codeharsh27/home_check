import React from 'react';
import { StickyNavbar } from '@/components/layout/nav';
import { HeroSection } from '@/components/landing/hero';
import { LogoTickerSection } from '@/components/landing/logo-ticker';
import { CoreEnginesSection } from '@/components/landing/core-engines';
import { InteractiveDossierSection } from '@/components/landing/interactive-dossier';
import { BentoTestimonialsSection } from '@/components/landing/bento-testimonials';
import { PricingMatrixSection } from '@/components/landing/pricing-matrix';
import { BuyerGuidesSection } from '@/components/landing/buyer-guides';
import { DarkFAQSection } from '@/components/landing/dark-faq';
import { DarkCTABannerSection } from '@/components/landing/dark-cta';
import { DarkFooter } from '@/components/landing/dark-footer';
import { BackToTop } from '@/components/layout/back-to-top';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08090B] text-stone-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-white relative overflow-x-hidden">
      {/* Sticky Navigation Bar (Reveals smoothly on scroll) */}
      <StickyNavbar />

      <main className="flex-1">
        {/* 1. Atmospheric Hero with live intake search */}
        <HeroSection />

        {/* 2. Official Registries & Statutory Databases Ticker */}
        <LogoTickerSection />

        {/* 3. Alternating 2-Column Core Engines (Cash Drain, Legal Shield, Micro-Market Radar) */}
        <CoreEnginesSection />

        {/* 3. Interactive Decision Dossier Centerpiece (Dynamic Tabbed Controller) */}
        <InteractiveDossierSection />

        {/* 4. Asymmetrical Bento Social Proof Grid ("Hear from real buyers") */}
        <BentoTestimonialsSection />

        {/* 5. Simple, Predictable Pricing Matrix & Feature Breakdown */}
        <PricingMatrixSection />

        {/* 6. Editorial Buyer Guides / Field Notes */}
        <BuyerGuidesSection />

        {/* 7. Dark FAQ Accordion */}
        <DarkFAQSection />

        {/* 8. Cinematic Closing CTA + Giant Watermark */}
        <DarkCTABannerSection />
      </main>

      {/* 9. Minimalist Dark Footer */}
      <DarkFooter />

      {/* 10. Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
