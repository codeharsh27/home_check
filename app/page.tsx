import React from 'react';
import { HeroSection } from '@/components/landing/hero';
import { FeatureToolsSection } from '@/components/landing/feature-tools';
import { FeaturedPropertiesSection } from '@/components/landing/featured-properties';
import { ShowcaseSpacesSection } from '@/components/landing/showcase-spaces';
import { PropertyCategoriesSection } from '@/components/landing/property-categories';
import { FAQSection } from '@/components/landing/faq-section';
import { CTABannerSection } from '@/components/landing/cta-banner';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-blue-600/20 selection:text-blue-900">
      <main className="flex-1">
        {/* Hero Section with Glass Navbar and Search Pill Bar */}
        <HeroSection />

        {/* Section 1: Intuitive Due Diligence Tools & Light Interactive Card */}
        <FeatureToolsSection />

        {/* Section 2: Recently Evaluated Properties (4-Card Grid) */}
        <FeaturedPropertiesSection />

        {/* Section 3: Large Living Space Showcase with Overlaid Detail Card */}
        <ShowcaseSpacesSection />

        {/* Section 4: Tailored Due Diligence by Property Type (3 Isometric Cards) */}
        <PropertyCategoriesSection />

        {/* Section 5: Frequently Asked Questions Accordion */}
        <FAQSection />

        {/* Section 6: Pre-Footer CTA Banner with Search Pill */}
        <CTABannerSection />
      </main>

      {/* Clean Light Theme Footer */}
      <Footer />
    </div>
  );
}
