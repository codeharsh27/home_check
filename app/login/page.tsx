'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { BrandMark } from '@/components/layout/nav';
import {
  supabase,
  isSupabaseConfigured,
  fetchUserEvaluationsFromSupabase,
} from '@/lib/supabase';
import { useEvaluationStore } from '@/store/evaluation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/dashboard';

  const { claimAllLocalEvaluations, mergeCloudEvaluations, evaluations } =
    useEvaluationStore();

  const [mode, setMode] = useState<'signin' | 'signup' | 'magic'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const localCount = Object.keys(evaluations || {}).length;

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        claimAllLocalEvaluations(data.user.id);
        const cloudEvals = await fetchUserEvaluationsFromSupabase(data.user.id);
        if (cloudEvals.length > 0) {
          mergeCloudEvaluations(cloudEvals);
        }
        router.push(returnTo);
      }
    });
  }, [claimAllLocalEvaluations, mergeCloudEvaluations, returnTo, router]);

  const handleSuccessRedirect = async (userId?: string) => {
    if (userId) {
      claimAllLocalEvaluations(userId);
      const cloudEvals = await fetchUserEvaluationsFromSupabase(userId);
      if (cloudEvals.length > 0) {
        mergeCloudEvaluations(cloudEvals);
      }
    }
    router.push(returnTo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !isSupabaseConfigured) {
      router.push(returnTo);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'magic') {
        const { error: magicErr } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo:
              typeof window !== 'undefined'
                ? `${window.location.origin}${returnTo}`
                : undefined,
          },
        });
        if (magicErr) throw magicErr;
        setSuccessMsg(
          'Sign-in link sent. Check your inbox to open your workspace.'
        );
      } else if (mode === 'signup') {
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              typeof window !== 'undefined'
                ? `${window.location.origin}${returnTo}`
                : undefined,
          },
        });
        if (signUpErr) throw signUpErr;
        if (data.session && data.user) {
          await handleSuccessRedirect(data.user.id);
        } else {
          setSuccessMsg(
            'Account created. Check your email to confirm, or sign in directly.'
          );
        }
      } else {
        const { data, error: signInErr } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInErr) throw signInErr;
        if (data.session && data.user) {
          await handleSuccessRedirect(data.user.id);
        }
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not sign in. Please verify your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col justify-between font-sans">
      {/* Top Bar */}
      <header className="max-w-[1136px] w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <BrandMark className="w-6 h-6 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[#fafafa] text-[15px] font-medium tracking-[-0.02em]">
            HomeCheck
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </header>

      {/* Centered Auth Card */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[420px] animate-step-enter">
          <div className="mb-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1] mb-2">
              ACCOUNT ACCESS
            </p>
            <h1 className="font-serif text-[32px] sm:text-[36px] text-[#fafafa] tracking-[-0.025em] leading-[1.12]">
              {mode === 'signup' ? 'Create an account' : 'Sign in to HomeCheck'}
            </h1>
            <p className="text-[14px] text-[#a1a1a1] mt-2 leading-relaxed">
              Save shortlisted properties, track builder documents, and access your
              dossiers from any device.
            </p>
          </div>

          <div className="rounded-2xl bg-[#141414] border border-[#ffffff14] p-6 sm:p-7">
            {localCount > 0 && (
              <div className="mb-5 pb-4 border-b border-[#ffffff12] flex items-center justify-between text-[12px]">
                <span className="text-[#a1a1a1]">
                  {localCount} {localCount === 1 ? 'property' : 'properties'} in
                  this browser
                </span>
                <span className="text-[#fafafa]">Will sync on sign-in</span>
              </div>
            )}

            {/* Mode Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#0a0a0a] rounded-xl border border-[#ffffff14] mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-[#1f1f1f] text-[#fafafa]'
                    : 'text-[#a1a1a1] hover:text-[#fafafa]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#1f1f1f] text-[#fafafa]'
                    : 'text-[#a1a1a1] hover:text-[#fafafa]'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('magic');
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 text-[12px] font-medium rounded-lg transition-colors cursor-pointer ${
                  mode === 'magic'
                    ? 'bg-[#1f1f1f] text-[#fafafa]'
                    : 'text-[#a1a1a1] hover:text-[#fafafa]'
                }`}
              >
                Email Link
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                />
              </div>

              {mode !== 'magic' && (
                <div>
                  <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 text-[14px] rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                  />
                </div>
              )}

              {error && (
                <p className="text-[12px] text-amber-400 leading-relaxed">
                  {error}
                </p>
              )}

              {successMsg && (
                <p className="text-[12px] text-[#96a766] leading-relaxed">
                  {successMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] font-medium text-[13px] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>
                  {mode === 'signin'
                    ? 'Sign in to workspace'
                    : mode === 'signup'
                    ? 'Create account'
                    : 'Send login link'}
                </span>
                {!loading && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#ffffff12] text-center">
              <Link
                href="/dashboard"
                className="text-[12px] text-[#a1a1a1] hover:text-[#fafafa] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Continue to workspace without an account</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-[12px] text-[#666666] border-t border-[#ffffff14]">
        We never ask for your phone number or share data with brokers.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-[#a1a1a1]" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
