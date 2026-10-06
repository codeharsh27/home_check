'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import type { User } from '@supabase/supabase-js';

const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'What We Check', href: '#what-we-check' },
  { label: 'Sample', href: '#sample-evaluation' },
  { label: 'FAQ', href: '#faq' },
];

/**
 * In-Hero Navbar (Original location inside the rounded rectangular hero image)
 */
export const HeroNavbar: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
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
    <>
      <header className="absolute top-0 left-0 right-0 z-40 px-3 sm:px-6 md:px-8 py-4 sm:py-5 pointer-events-auto">
        <div className="max-w-7xl mx-auto relative flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-1 z-10 group">
            <span className="text-white text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
              HomeCheck<span className="text-blue-500">.</span>
            </span>
          </Link>

          {/* Center: Nav Pill Bar (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg absolute left-1/2 -translate-x-1/2 z-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  item.active
                    ? 'bg-white text-stone-900 shadow-md'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Auth Action Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 z-10">
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] md:max-w-[140px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-1.5 sm:p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-white/90 hover:text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 transition-all shadow-xs cursor-pointer"
                >
                  Login
                </button>
                <a
                  href="#hero-intake"
                  className="hidden sm:inline-flex px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  Evaluate
                </a>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-xl border border-white/20 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <a
                href="#hero-intake"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-center text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
              >
                Evaluate Property
              </a>
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-200 bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          supabase?.auth.getUser().then(({ data }) => setUser(data.user));
        }}
      />
    </>
  );
};

/**
 * Sticky Navbar (Smoothly transitions in when user scrolls past hero)
 */
export const StickyNavbar: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { clearUserSession } = useEvaluationStore();

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky navbar once user scrolls down 220px
      setIsScrolled(window.scrollY > 220);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-md py-2.5 sm:py-3 px-3 sm:px-6 md:px-8 transition-all duration-300 ease-out ${
          isScrolled
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto relative flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-1 z-10 group">
            <span className="text-stone-900 text-xl sm:text-2xl font-extrabold tracking-tight">
              HomeCheck<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Center: Nav Pill Bar */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-stone-100/95 border border-stone-200/90 shadow-2xs absolute left-1/2 -translate-x-1/2 z-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  item.active
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200/70'
                    : 'text-stone-600 hover:text-blue-700 hover:bg-stone-200/60'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Auth Action Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 z-10">
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-white border border-stone-200 text-stone-800 shadow-2xs">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] md:max-w-[140px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-1.5 sm:p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 transition-all shadow-xs cursor-pointer"
                >
                  Login
                </button>
                <a
                  href="#hero-intake"
                  className="hidden sm:inline-flex px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  Evaluate
                </a>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200/80"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-white border border-stone-200 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
              <a
                href="#hero-intake"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-center text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
              >
                Evaluate Property
              </a>
              {!user && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          supabase?.auth.getUser().then(({ data }) => setUser(data.user));
        }}
      />
    </>
  );
};

// Default export for backward compatibility
export const Navbar = HeroNavbar;
