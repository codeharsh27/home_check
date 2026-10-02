"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#F4F1EC] transition-all duration-200 ${
        scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-[#2A5C2A] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L1.5 5.5V13H5.5V9H8.5V13H12.5V5.5L7 1Z"
                fill="white"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-bold text-[15px] text-[#111111] tracking-tight">
            homecheck
          </span>
        </Link>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {["Home", "About", "How it Works", "Features"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#555555] hover:text-[#111111] transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm text-[#555555] hover:text-[#111111] transition-colors font-medium">
            Sign in
          </button>
          <Link
            href="/evaluation/default/snapshot"
            className="bg-[#111111] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#333333] transition-colors"
          >
            Get Started
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#111111] ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path
                  d="M4 4L16 16M4 16L16 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5H17M3 10H17M3 15H17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#F4F1EC] border-t border-[#E2DED6] px-5 pb-4 flex flex-col gap-3">
          {["Home", "About", "How it Works", "Features"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#555555] hover:text-[#111111] font-medium py-1"
            >
              {item}
            </a>
          ))}
          <Link
            href="/evaluation/default/snapshot"
            className="mt-1 bg-[#111111] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
