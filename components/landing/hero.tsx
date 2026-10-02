"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Link2, Upload, PenLine, Search } from "lucide-react";

const TABS = [
  { id: "url", label: "Paste URL", icon: Link2 },
  { id: "upload", label: "Upload Brochure", icon: Upload },
  { id: "manual", label: "Enter Manually", icon: PenLine },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<TabId>("url");
  const [urlValue, setUrlValue] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="bg-[#F4F1EC] relative overflow-hidden">
      {/* ── Text block ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-0 relative z-10">
        {/* Trust pill */}
        <div className="inline-flex items-center gap-1.5 border border-[#D4CFC6] rounded-full px-3.5 py-1.5 text-xs font-medium text-[#555555] bg-white/60 mb-6">
          <span className="text-amber-500">★★★★★</span>
          <span>Top-rated by first-time buyers · 4.8 / 5</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          {/* Headline */}
          <div className="max-w-[600px]">
            <h1 className="text-[42px] sm:text-[52px] font-extrabold leading-[1.08] tracking-tight text-[#111111] mb-4">
              Evaluate Your Property,
              <br />
              <span className="text-[#2A5C2A]">Before You Commit</span>
              <br />
              Any Money.
            </h1>
            <p className="text-[15px] text-[#666666] leading-relaxed max-w-[440px]">
              Know what you know, what you don't, and what to do next —
              without a broker, without bias.
            </p>
          </div>

          {/* Right floating badge */}
          <div className="hidden md:flex flex-col items-end gap-2 mb-2">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-[#EEEAE2]">
              <div className="flex -space-x-2">
                {["#3B82F6", "#10B981", "#F59E0B"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#111111]">
                  Supporting your
                </p>
                <p className="text-[11px] text-[#888888]">property journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-bleed hero image ────────────────────────────── */}
      <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px]">
        {/* Property image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80')`,
          }}
        />

        {/* Fade to cream at bottom */}
        <div className="hero-image-fade absolute inset-0" />

        {/* Floating property badge on image */}
        <div className="absolute bottom-20 right-6 sm:right-12 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-lg flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F0EDE6] flex items-center justify-center">
            <MapPin size={14} className="text-[#2A5C2A]" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#111111]">
              Green Valley Residency
            </p>
            <p className="text-[11px] text-[#888888]">📍 Wakad, Pune</p>
          </div>
        </div>
      </div>

      {/* ── Floating white search card ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-20 -mt-16 pb-10">
        <div className="bg-white rounded-[20px] shadow-[0_8px_48px_rgba(0,0,0,0.10)] border border-[#EEEBE4] p-5 sm:p-7">
          {/* Pill tabs */}
          <div className="flex gap-2 mb-5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : "text-[#666666] hover:bg-[#F4F1EC]"
                  }`}
                >
                  <Icon size={12} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Input row */}
          {activeTab === "url" && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:divide-x sm:divide-[#EEEAE2]">
              <div className="flex-1 sm:pr-4">
                <label className="block text-[11px] font-semibold text-[#999999] uppercase tracking-wide mb-1.5">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#111111] outline-none appearance-none cursor-pointer"
                >
                  <option value="">Apartment / Villa / Plot…</option>
                  <option>Apartment</option>
                  <option>Villa / Independent House</option>
                  <option>Plot / Land</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="flex-1 sm:px-4">
                <label className="block text-[11px] font-semibold text-[#999999] uppercase tracking-wide mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, area, or project name…"
                  className="w-full bg-transparent text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none"
                />
              </div>

              <div className="flex-1 sm:pl-4">
                <label className="block text-[11px] font-semibold text-[#999999] uppercase tracking-wide mb-1.5">
                  Listing URL
                </label>
                <input
                  type="url"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="Paste MagicBricks / 99acres URL…"
                  className="w-full bg-transparent text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none"
                />
              </div>

              <div className="sm:pl-4 flex items-end">
                <Link
                  href="/evaluation/default/snapshot"
                  className="flex items-center gap-2 bg-[#111111] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#333333] transition-colors whitespace-nowrap"
                >
                  <Search size={13} />
                  Evaluate Property
                </Link>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#E2DED6] rounded-xl py-8 cursor-pointer hover:border-[#2A5C2A] transition-colors group">
                <Upload
                  size={22}
                  className="text-[#BBBBBB] group-hover:text-[#2A5C2A] mb-2 transition-colors"
                />
                <span className="text-[13px] text-[#888888]">
                  Drop brochure PDF here or{" "}
                  <span className="text-[#2A5C2A] font-medium underline">
                    browse
                  </span>
                </span>
                <input type="file" accept=".pdf,.jpg,.png" className="hidden" />
              </label>
              <Link
                href="/evaluation/default/snapshot"
                className="flex items-center gap-2 bg-[#111111] text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#333333] transition-colors"
              >
                Evaluate Property
              </Link>
            </div>
          )}

          {activeTab === "manual" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Property name or project…"
                className="flex-1 border border-[#E2DED6] rounded-xl px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none focus:border-[#2A5C2A] transition-colors"
              />
              <input
                type="text"
                placeholder="Developer / builder name…"
                className="flex-1 border border-[#E2DED6] rounded-xl px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none focus:border-[#2A5C2A] transition-colors"
              />
              <Link
                href="/evaluation/default/snapshot"
                className="flex items-center gap-2 bg-[#111111] text-white text-[13px] font-semibold px-6 py-3 rounded-full hover:bg-[#333333] transition-colors whitespace-nowrap"
              >
                <PenLine size={13} />
                Start Evaluation
              </Link>
            </div>
          )}

          {/* Fine print */}
          <p className="mt-4 text-center text-[11px] text-[#AAAAAA]">
            Your data stays private. We never share your evaluation with
            brokers or developers.
          </p>
        </div>
      </div>
    </section>
  );
}
