"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const NAV_LINKS = ["Home", "Evaluate", "How it Works", "Home Loans", "Find an Agent"];

const STATS = [
  { number: "4.2L+", label: "properties evaluated in India" },
  { number: "12+", label: "due diligence checkpoints" },
  { number: "₹0", label: "broker fee or commission" },
];

export function LandingHero() {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [listingUrl, setListingUrl] = useState("");

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* ── Full-bleed sky + architecture background ────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')`,
        }}
      />
      {/* Subtle overlay so white text reads cleanly against the sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* ── Navbar — transparent overlay ────────────────────────── */}
      <nav className="relative z-30 w-full flex items-center justify-between px-6 sm:px-10 pt-5 pb-3">
        {/* Logo */}
        <span className="text-white font-bold text-[18px] tracking-tight drop-shadow">
          home<span className="text-blue-300">check</span>
          <span className="text-blue-400 text-[22px] leading-none">.</span>
        </span>

        {/* Center pill nav */}
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-1 py-1 gap-0.5">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                i === 0
                  ? "bg-white text-[#111111]"
                  : "text-white/90 hover:bg-white/15"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right auth buttons */}
        <div className="flex items-center gap-2">
          <button className="px-5 py-1.5 rounded-full text-[13px] font-medium text-white border border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all">
            Login
          </button>
          <Link
            href="/evaluation/default/snapshot"
            className="px-5 py-1.5 rounded-full text-[13px] font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero content — centered over sky ────────────────────── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-8 pb-36">
        {/* Headline */}
        <h1 className="text-[44px] sm:text-[58px] md:text-[68px] font-extrabold text-white leading-[1.05] tracking-tight drop-shadow-lg max-w-[800px] mb-5">
          Know Before You
          <br />
          Commit Any Money.
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] sm:text-[17px] text-white/85 max-w-[520px] leading-relaxed mb-10 drop-shadow">
          From listing URL to decision-readiness — HomeCheck gives you
          structured evidence, funding clarity, and zero broker bias.
        </p>

        {/* ── Single-row white pill search bar ─────────────────── */}
        <div className="w-full max-w-[680px] bg-white rounded-full shadow-[0_8px_40px_rgba(0,0,0,0.18)] flex items-center overflow-hidden px-5 py-3 gap-0">
          {/* Field 1: Property Type */}
          <div className="flex-1 min-w-0 border-r border-[#E5E5E5] pr-4">
            <p className="text-[11px] font-semibold text-[#111111] leading-none mb-1">
              Property Type
            </p>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full text-[13px] text-[#888888] bg-transparent outline-none appearance-none cursor-pointer truncate"
            >
              <option value="">Select type…</option>
              <option>Apartment</option>
              <option>Villa / House</option>
              <option>Plot / Land</option>
              <option>Commercial</option>
            </select>
          </div>

          {/* Field 2: Location */}
          <div className="flex-1 min-w-0 border-r border-[#E5E5E5] px-4">
            <p className="text-[11px] font-semibold text-[#111111] leading-none mb-1">
              Location
            </p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or area…"
              className="w-full text-[13px] text-[#888888] placeholder:text-[#BBBBBB] bg-transparent outline-none"
            />
          </div>

          {/* Field 3: Listing URL */}
          <div className="flex-1 min-w-0 pl-4">
            <p className="text-[11px] font-semibold text-[#111111] leading-none mb-1">
              Listing URL
            </p>
            <input
              type="url"
              value={listingUrl}
              onChange={(e) => setListingUrl(e.target.value)}
              placeholder="Paste 99acres / MagicBricks URL…"
              className="w-full text-[13px] text-[#888888] placeholder:text-[#BBBBBB] bg-transparent outline-none"
            />
          </div>

          {/* Search button */}
          <Link
            href="/evaluation/default/snapshot"
            className="ml-4 flex-shrink-0 w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center shadow-md"
            aria-label="Evaluate"
          >
            <Search size={18} className="text-white" />
          </Link>
        </div>
      </div>

      {/* ── Stats bar — bottom overlay over building ─────────────── */}
      <div className="relative z-20 w-full">
        <div className="flex items-center justify-center sm:justify-start gap-0 px-8 sm:px-14 pb-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="pr-6 sm:pr-10">
                <p className="text-white font-bold text-[22px] sm:text-[26px] leading-none drop-shadow">
                  {s.number}
                </p>
                <p className="text-white/70 text-[11px] sm:text-[12px] leading-snug mt-0.5 max-w-[100px]">
                  {s.label}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <div className="h-10 w-px bg-white/30 mr-6 sm:mr-10 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
