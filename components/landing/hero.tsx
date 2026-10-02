"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Link2, Upload, PenLine, ArrowRight, ShieldCheck, FileText } from "lucide-react";

const NAV_LINKS = ["Home", "Evaluate", "How it Works", "Financial Gap", "Checklist"];

const STATS = [
  { number: "4.2L+", label: "properties evaluated in India" },
  { number: "12+", label: "due diligence checkpoints" },
  { number: "100%", label: "unbiased evidence & data" },
];

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<"url" | "upload" | "manual">("url");
  const [urlValue, setUrlValue] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen overflow-hidden flex flex-col justify-between bg-[#0B0F19]">
      {/* ── Background Image using public/images/hero.png ───────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      />

      {/* Ambient gradient overlay for text legibility and aesthetic polish */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75 backdrop-blur-[1px]" />

      {/* ── Navbar — sleek transparent header ────────────────────────── */}
      <nav className="relative z-30 w-full flex items-center justify-between px-6 sm:px-12 pt-6 pb-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L1.5 5.5V13H5.5V9H8.5V13H12.5V5.5L7 1Z"
                fill="white"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-white font-extrabold text-[19px] tracking-tight font-display">
            home<span className="text-blue-400">check</span>
            <span className="text-blue-500 text-[22px] leading-none">.</span>
          </span>
        </Link>

        {/* Center pill navigation */}
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-1.5 py-1 gap-1 shadow-2xl">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                i === 0
                  ? "bg-white text-[#0B0F19] font-semibold shadow-sm"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-full text-[13px] font-medium text-white/90 border border-white/25 hover:bg-white/10 backdrop-blur-sm transition-all">
            Sign In
          </button>
          <Link
            href="/evaluation/default/snapshot"
            className="px-5 py-2 rounded-full text-[13px] font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
          >
            Evaluate Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ── Main Hero Content ────────────────────────────────────────── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-6 pb-20 max-w-5xl mx-auto w-full">
        
        {/* Trust pill */}
        <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-md mb-6 shadow-lg">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Independent Property Due-Diligence Engine</span>
          <span className="text-white/40">•</span>
          <span className="text-amber-300">★ 4.9/5</span>
        </div>

        {/* Main Headline with bespoke typography */}
        <h1 className="text-[42px] sm:text-[60px] md:text-[72px] font-extrabold text-white leading-[1.05] tracking-tight drop-shadow-2xl mb-6">
          <span className="font-display block">Know Before You</span>
          <span className="font-serif-display italic font-semibold text-blue-200 block drop-shadow-lg">
            Commit Any Money.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] sm:text-[18px] text-white/85 max-w-[620px] leading-relaxed mb-10 drop-shadow font-sans">
          Paste a listing URL, upload a builder brochure, or enter details manually.
          Get an immediate evidence-based breakdown of your financial gaps and due-diligence risks.
        </p>

        {/* ── Evaluation Intake Options (Simple & Direct) ───────────── */}
        <div className="w-full max-w-[760px] bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/40 text-left">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mb-4 bg-slate-100/80 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("url")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "url"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Link2 size={15} />
              Paste URL
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "upload"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Upload size={15} />
              Upload Brochure / Doc
            </button>
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "manual"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <PenLine size={15} />
              Enter Manually
            </button>
          </div>

          {/* TAB 1: Paste Link Option */}
          {activeTab === "url" && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Link2 size={18} />
                </div>
                <input
                  type="url"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="Paste property URL (MagicBricks, 99acres, Housing.com, NoBroker)..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
              <Link
                href="/evaluation/default/snapshot"
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 whitespace-nowrap text-sm"
              >
                <span>Evaluate Property</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* TAB 2: Upload Doc Option */}
          {activeTab === "upload" && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">
                    Upload Property Brochure or Legal Doc (PDF, JPG)
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    Drop your PDF here or click to browse files
                  </p>
                </div>
                <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" />
              </label>
              <Link
                href="/evaluation/default/snapshot"
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 whitespace-nowrap text-sm"
              >
                <span>Evaluate Document</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* TAB 3: Enter Manually Option */}
          {activeTab === "manual" && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="Property / Project Name"
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  placeholder="Location (e.g. Wakad, Pune)"
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  placeholder="Listed Price (e.g. ₹68 Lakhs)"
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <Link
                  href="/evaluation/default/snapshot"
                  className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 whitespace-nowrap text-sm"
                >
                  <span>Start Manual Evaluation</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Micro text */}
          <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-400">
            <span>Instant AI-assisted extraction & gap analysis</span>
            <span className="text-slate-500">🔒 100% Private & Encryption Guaranteed</span>
          </div>

        </div>

      </div>

      {/* ── Bottom KPI Stats Bar ────────────────────────────────────── */}
      <div className="relative z-20 w-full bg-gradient-to-t from-black/80 to-transparent pt-6 pb-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-around gap-6">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-white font-extrabold text-[22px] sm:text-[28px] leading-none tracking-tight font-display text-blue-400">
                  {s.number}
                </p>
                <p className="text-white/70 text-[11px] sm:text-[12px] font-medium mt-1">
                  {s.label}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden sm:block h-8 w-px bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
