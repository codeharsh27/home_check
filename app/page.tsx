import React from "react";
import { HeroSection } from "@/components/landing/hero";
import { SocialProofStrip } from "@/components/landing/social-proof-strip";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { WhatYouGetSection } from "@/components/landing/what-you-get";
import { TrustSection } from "@/components/landing/trust-section";
import { Footer } from "@/components/landing/footer";
import { IntakeWidget } from "@/components/landing/intake-widget";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] flex flex-col font-sans">
      {/* Hero section contains the floating Navbar internally */}
      <HeroSection />

      <main className="flex-1">
        <SocialProofStrip />
        <HowItWorksSection />
        <WhatYouGetSection />
        <TrustSection />

        {/* Final CTA */}
        <section className="py-20 md:py-28 bg-[#080808]" id="full-intake">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#5B8BDF]">
                Ready to start?
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#EDEDED]">
                Most buyers say they wished they&apos;d started earlier.
              </h2>
              <p className="text-sm text-[#666666] max-w-md mx-auto">
                Paste a listing URL, upload a brochure, or enter details manually. No account needed.
              </p>
            </div>

            <div className="text-left max-w-2xl mx-auto">
              <IntakeWidget />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#555555]">
              <span>🏙️ Used across 12+ Indian cities</span>
              <span>📋 RERA-aware checklists</span>
              <span>🔒 Your data stays on your device</span>
              <span>⚡ Results in under 10 minutes</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
