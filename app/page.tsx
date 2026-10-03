import React from 'react';
import { Navbar } from '@/components/layout/nav';
import { HeroSection } from '@/components/landing/hero';
import { ProblemSection } from '@/components/landing/problem-section';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { ProductShowcaseSection } from '@/components/landing/product-showcase';
import { WhatWeCheckSection } from '@/components/landing/property-categories';
import { SampleEvaluationSection } from '@/components/landing/sample-evaluation';
import { TrustSection } from '@/components/landing/trust-section';
import { FAQSection } from '@/components/landing/faq-section';
import { CTABannerSection } from '@/components/landing/cta-banner';
import { Footer } from '@/components/landing/footer';
import { BackToTop } from '@/components/layout/back-to-top';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-blue-600/20 selection:text-blue-900 relative">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero & 2. Value strip */}
        <HeroSection />

        {/* 3. Problem / "You found the property. Now what?" */}
        <ProblemSection />

        {/* 4. How it works */}
        <HowItWorksSection />

        {/* 5. Product evaluation showcase */}
        <ProductShowcaseSection />

        {/* 6. What we help you check */}
        <WhatWeCheckSection />

        {/* 7. Sample evaluation */}
        <SampleEvaluationSection />

        {/* 8. What HomeCheck is / isn't */}
        <TrustSection />

        {/* 9. FAQ */}
        <FAQSection />

        {/* 10. Final CTA */}
        <CTABannerSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
