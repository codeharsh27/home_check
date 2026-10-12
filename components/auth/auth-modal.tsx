'use client';

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { X, Mail, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'magiclink'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !isSupabaseConfigured) {
      onSuccess?.();
      onClose();
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (mode === 'magiclink') {
        const { error: magicErr } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo:
              typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (magicErr) throw magicErr;
        setSuccessMessage('Check your email for the login link!');
      } else if (mode === 'signup') {
        const { data, error: signupErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (signupErr) throw signupErr;
        if (data.user && !data.session) {
          setSuccessMessage(
            'Account created! Please check your email to confirm your account.'
          );
        } else {
          setSuccessMessage('Account created successfully!');
          setTimeout(() => {
            onSuccess?.();
            onClose();
          }, 900);
        }
      } else {
        const { error: signinErr } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signinErr) throw signinErr;
        setSuccessMessage('Signed in successfully!');
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 700);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Authentication failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="bg-[#171717] border border-[#ffffff14] rounded-[24px] max-w-sm w-full p-6 sm:p-7 space-y-5 shadow-2xl relative text-[#fafafa]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#666666] hover:text-[#fafafa] cursor-pointer p-1.5 rounded-full hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <h2
            className="text-[22px] text-[#fafafa] tracking-[-0.02em]"
            style={{ fontFamily: "'Hedvig Letters Serif', serif" }}
          >
            {mode === 'signin' && 'Sign in to HomeCheck'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'magiclink' && 'Sign in with Magic Link'}
          </h2>
          <p className="text-xs text-[#a1a1a1]">
            {mode === 'signin' &&
              'Access and sync your saved property evaluation dossiers'}
            {mode === 'signup' &&
              'Save evaluations and legal roadmaps securely'}
            {mode === 'magiclink' &&
              'We will send a secure sign-in link to your email'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-xl flex items-start gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-start gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
              />
            </div>
          </div>

          {mode !== 'magiclink' && (
            <div>
              <label className="block text-[12px] text-[#a1a1a1] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] font-medium text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>
                {mode === 'signin' && 'Sign in'}
                {mode === 'signup' && 'Create account'}
                {mode === 'magiclink' && 'Send link'}
              </span>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-[#ffffff14] space-y-2 text-center text-xs text-[#a1a1a1]">
          {mode === 'signin' && (
            <>
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#fafafa] font-medium hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
              <p>
                Prefer passwordless?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('magiclink');
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#a1a1a1] hover:text-[#fafafa] underline cursor-pointer"
                >
                  Email me a login link
                </button>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-[#fafafa] font-medium hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'magiclink' && (
            <p>
              Back to{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-[#fafafa] font-medium hover:underline cursor-pointer"
              >
                Email and password sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
