import React from "react";
import { Navbar } from "@/components/layout/nav";
import { HeroSection } from "@/components/landing/hero";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { WhatYouGetSection } from "@/components/landing/what-you-get";
import { TrustSection } from "@/components/landing/trust-section";
import { Footer } from "@/components/landing/footer";
import { IntakeWidget } from "@/components/landing/intake-widget";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <WhatYouGetSection />
        <TrustSection />

        {/* Second Intake Callout */}
        <section className="py-16 md:py-20 bg-[#0C0E12] border-t border-[#23262D]">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
            <h2 className="text-2xl font-semibold text-[#F0F2F5]">
              Ready to evaluate your shortlisted property?
            </h2>
            <p className="text-xs text-[#8A8F9E] max-w-lg mx-auto">
              Start now with a listing URL, document brochure, or manual entry.
            </p>
            <div className="text-left">
              <IntakeWidget />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
