'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User as UserIcon, LogOut } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';
import { User } from '@supabase/supabase-js';

const navItems = [
  { label: 'Home', href: '#', active: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'What We Check', href: '#what-we-check' },
  { label: 'Sample', href: '#sample-evaluation' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
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
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto relative flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-1 z-10 group">
            <span className="text-white text-2xl font-extrabold tracking-tight drop-shadow-md">
              HomeCheck<span className="text-blue-500">.</span>
            </span>
          </Link>

          {/* Center: Nav Pill Bar (Centered using absolute positioning) */}
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

          {/* Right: Auth Action Buttons */}
          <div className="flex items-center gap-2.5 z-10">
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
                  className="px-4 sm:px-5 py-2 rounded-full text-xs font-semibold text-white/90 hover:text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 transition-all shadow-sm cursor-pointer"
                >
                  Login
                </button>
                <a
                  href="#hero-intake"
                  className="px-4 sm:px-5 py-2 rounded-full text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  Evaluate Property
                </a>
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
