'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown, Check, User as UserIcon, LogOut } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import { SupportedRegion, REGIONAL_METADATA } from '@/lib/regional-documents';
import { User } from '@supabase/supabase-js';

const navItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'Evaluations', href: '#featured-properties' },
  { label: 'Financials', href: '#smart-tools' },
  { label: 'Due Diligence', href: '#categories' },
  { label: 'FAQ', href: '#faq' },
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
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo - Roofin typography style */}
          <Link href="/" className="flex items-center gap-1 shrink-0 group">
            <span className="text-white text-2xl font-bold tracking-tight drop-shadow-md">
              HomeCheck<span className="text-[#3B82F6]">.</span>
            </span>
          </Link>

          {/* Center Nav Pill - Frosted Glass Container */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  item.active
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Region Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-medium text-white hover:bg-white/25 transition-all cursor-pointer shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-white/80" />
                <span>{REGIONAL_METADATA[activeRegion]?.name || 'Maharashtra'}</span>
                <ChevronDown className="w-3 h-3 text-white/70" />
              </button>

              {regionMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Select State / Rules
                  </div>
                  {(Object.keys(REGIONAL_METADATA) as SupportedRegion[]).map((reg) => {
                    const meta = REGIONAL_METADATA[reg];
                    const isSelected = activeRegion === reg;
                    return (
                      <button
                        key={reg}
                        onClick={() => handleSelectRegion(reg)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{meta.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{meta.nativeName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 transition-all shadow-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-md shadow-blue-600/30"
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
