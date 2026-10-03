'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, LogOut, User as UserIcon, Globe, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import { SupportedRegion, REGIONAL_METADATA } from '@/lib/regional-documents';
import { User } from '@supabase/supabase-js';

export const Navbar: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { activeRegion, setActiveRegion, clearUserSession } = useEvaluationStore();

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;

    // Get initial session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    clearUserSession(); // Clean up in-memory user sessions to prevent multi-tenant crosstalk
    setUser(null);
  };

  const handleSelectRegion = (region: SupportedRegion) => {
    setActiveRegion(region);
    setRegionMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1E1E1E] bg-[#0A0A0A]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-[#5B8BDF]/10 border border-[#5B8BDF]/30 flex items-center justify-center text-[#5B8BDF] group-hover:border-[#5B8BDF]/60 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-semibold tracking-tight text-base text-[#EDEDED] group-hover:text-white transition-colors">
              homecheck
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#222222] text-[#888888] border border-[#2B2B2B]">
              MVP
            </span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Regional Language / State Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] text-xs font-mono text-[#CCCCCC] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#5B8BDF]" />
                <span className="hidden sm:inline">
                  {REGIONAL_METADATA[activeRegion]?.name} ({REGIONAL_METADATA[activeRegion]?.nativeName})
                </span>
                <span className="sm:hidden">
                  {REGIONAL_METADATA[activeRegion]?.nativeName || 'IN'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#666666]" />
              </button>

              {regionMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#141414] border border-[#2B2B2B] rounded-xl shadow-2xl p-1.5 space-y-0.5 z-50 text-xs">
                  <div className="px-2.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-[#666666] border-b border-[#202020] mb-1">
                    Select Property State / Language
                  </div>
                  {(Object.keys(REGIONAL_METADATA) as SupportedRegion[]).map((reg) => {
                    const meta = REGIONAL_METADATA[reg];
                    const isSelected = activeRegion === reg;
                    return (
                      <button
                        key={reg}
                        onClick={() => handleSelectRegion(reg)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#5B8BDF]/15 text-[#5B8BDF] font-medium'
                            : 'text-[#AAAAAA] hover:text-white hover:bg-[#1B1B1B]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{meta.name}</span>
                          <span className="text-[10px] text-[#777777] font-mono">{meta.nativeName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#5B8BDF]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* User Session */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#161616] border border-[#242424] text-xs font-mono text-[#CCCCCC]">
                  <UserIcon className="w-3.5 h-3.5 text-[#5B8BDF]" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-1.5 rounded-lg text-[#777777] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign in
              </Button>
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
