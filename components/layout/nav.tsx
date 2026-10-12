'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import type { User } from '@supabase/supabase-js';

const navItems: { label: string; href: string; external?: boolean }[] = [
  { label: 'What We Check', href: '#what-we-check' },
  { label: 'Sample Dossier', href: '#sample-evaluation' },
  { label: 'Buyer Guides', href: '#guides' },
  {
    label: 'PM Case Study ↗',
    href: 'https://harshmule.vercel.app/project/homecheck?lens=pm',
    external: true,
  },
];

/**
 * Custom Architectural "H" Monogram for HomeCheck (100% original IP)
 */
export const BrandMark: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left Structural Pillar */}
    <rect x="5" y="5" width="5.5" height="22" rx="1.5" fill="#FAFAFA" />
    {/* Right Structural Pillar with Cantilevered Roof */}
    <path
      d="M21.5 5C21.5 4.17157 22.1716 3.5 23 3.5H27V27H21.5V5Z"
      fill="#FAFAFA"
    />
    {/* Architectural Crossbeam & Check Diagonal */}
    <path
      d="M10.5 14H21.5V19H10.5V14Z"
      fill="#FAFAFA"
    />
    <path
      d="M12.5 8.5L18.5 3.5H23L16 9.5H12.5V8.5Z"
      fill="#FAFAFA"
      fillOpacity="0.65"
    />
  </svg>
);

/**
 * In-Hero Navbar — exact 1:1 Kero AI top bar
 */
export const HeroNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { clearUserSession } = useEvaluationStore();

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => authListener?.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    clearUserSession();
    setUser(null);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-6 py-5 pointer-events-auto">
      <div className="max-w-[1136px] mx-auto flex items-center justify-between">
        {/* Left: Geometric Brand Mark + HomeCheck */}
        <Link href="/" className="flex items-center gap-2.5 z-10 group">
          <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[#fafafa] text-[15px] font-medium tracking-[-0.02em]">
            HomeCheck
          </span>
        </Link>

        {/* Center: 4 Clean Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="text-[14px] font-normal text-[#e5e5e5] hover:text-[#a1a1a1] transition-colors tracking-[-0.01em]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Sign In + White Pill CTA */}
        <div className="flex items-center gap-5 z-10">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-block text-[14px] font-normal text-[#e5e5e5] hover:text-[#a1a1a1] transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fafafa] transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-block text-[14px] font-normal text-[#e5e5e5] hover:text-[#a1a1a1] transition-colors cursor-pointer"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/dashboard?new=true"
            className="px-4 py-2 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium tracking-[-0.01em] transition-all cursor-pointer shadow-sm"
          >
            Start Free Audit
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fafafa] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#171717]/95 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm text-[#e5e5e5] hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <Link
              href="/dashboard?new=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-full text-xs font-medium text-center text-[#0a0a0a] bg-[#fafafa] hover:bg-[#e5e5e5] transition-colors"
            >
              Start Free Audit
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-full text-xs font-medium text-[#e5e5e5] bg-white/10 hover:bg-white/15 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-full text-xs font-medium text-[#e5e5e5] bg-white/10 hover:bg-white/15 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * Sticky Navbar (Smoothly transitions in when user scrolls past hero)
 */
export const StickyNavbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { clearUserSession } = useEvaluationStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 260);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => authListener?.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    clearUserSession();
    setUser(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-[#ffffff14] py-3.5 px-6 transition-all duration-300 ease-out ${
        isScrolled
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-[1136px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 z-10 group">
          <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[#fafafa] text-[15px] font-medium tracking-[-0.02em]">
            HomeCheck
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="text-[14px] font-normal text-[#e5e5e5] hover:text-[#a1a1a1] transition-colors tracking-[-0.01em]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 z-10">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:inline-block text-[14px] font-normal text-[#e5e5e5] hover:text-[#a1a1a1] transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="p-1.5 rounded-full bg-[#171717] hover:bg-[#262626] text-[#e5e5e5] transition-colors cursor-pointer border border-[#ffffff14]"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-block text-[14px] font-normal text-[#e5e5e5] hover:text-[#a1a1a1] transition-colors cursor-pointer"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/dashboard?new=true"
            className="px-4 py-1.5 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] text-[13px] font-medium tracking-[-0.01em] transition-all cursor-pointer"
          >
            Start Free Audit
          </Link>
        </div>
      </div>
    </header>
  );
};

export const Navbar = HeroNavbar;
