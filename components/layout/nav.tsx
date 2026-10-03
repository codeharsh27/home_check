'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown, Check, User as UserIcon, LogOut } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import { SupportedRegion, REGIONAL_METADATA } from '@/lib/regional-documents';
import { User } from '@supabase/supabase-js';
import { useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Evaluate', href: '#full-intake' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Home Loans', href: '#' },
  { label: 'Find an Agent', href: '#' },
];

export const Navbar: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { activeRegion, setActiveRegion, clearUserSession } = useEvaluationStore();

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

  const handleSelectRegion = (region: SupportedRegion) => {
    setActiveRegion(region);
    setRegionMenuOpen(false);
  };

  return (
    <>
      {/* Floating Navbar — absolutely positioned over the hero */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-white font-bold text-lg tracking-tight drop-shadow">
              homecheck
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10 backdrop-blur-sm">
              Beta
            </span>
          </Link>

          {/* Center Nav pill */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  link.active
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side — Region + Auth */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Region selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{REGIONAL_METADATA[activeRegion]?.nativeName || 'IN'}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {regionMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-1.5 space-y-0.5 z-50 text-xs">
                  <div className="px-2.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-white/50 border-b border-white/10 mb-1">
                    Select State / Language
                  </div>
                  {(Object.keys(REGIONAL_METADATA) as SupportedRegion[]).map((reg) => {
                    const meta = REGIONAL_METADATA[reg];
                    const isSelected = activeRegion === reg;
                    return (
                      <button
                        key={reg}
                        onClick={() => handleSelectRegion(reg)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{meta.name}</span>
                          <span className="text-[10px] text-white/40 font-mono">{meta.nativeName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/80">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-[#3B6FE8] hover:bg-[#2E5FD4] border border-[#5B8BDF]/60 shadow-lg shadow-blue-500/20 transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
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
