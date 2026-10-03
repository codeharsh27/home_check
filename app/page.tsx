import React from 'react';
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-blue-600/20 selection:text-blue-900">
      <main className="flex-1">
        {/* 1. Navbar & 2. Hero & 3. Value strip */}
        <HeroSection />

        {/* 4. Problem / "You found the property. Now what?" */}
        <ProblemSection />

        {/* 5. How it works */}
        <HowItWorksSection />

        {/* 6. Product evaluation showcase */}
        <ProductShowcaseSection />

        {/* 7. What we help you check */}
        <WhatWeCheckSection />

        {/* 8. Sample evaluation */}
        <SampleEvaluationSection />

        {/* 9. What HomeCheck is / isn't */}
        <TrustSection />

        {/* 10. FAQ */}
        <FAQSection />

        {/* 11. Final CTA */}
        <CTABannerSection />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
