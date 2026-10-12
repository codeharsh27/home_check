'use client';

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { X, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface AuthGateModalProps {
  isOpen: boolean;
  evaluationId: string;
  propertyName?: string;
  isStepTransition?: boolean;
  onClose: () => void;
  onAuthenticated: (userId?: string) => void;
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({
  isOpen,
  evaluationId,
  propertyName = 'this property',
  isStepTransition = false,
  onClose,
  onAuthenticated,
}) => {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !isSupabaseConfigured) {
      onAuthenticated(undefined);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { data, error: signupErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (signupErr) throw signupErr;

        trackEvent('auth_gate_converted', 'conversion', evaluationId, {
          method: 'signup',
          email,
        });

        onAuthenticated(data.user?.id);
      } else {
        const { data, error: signinErr } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signinErr) throw signinErr;

        trackEvent('auth_gate_converted', 'conversion', evaluationId, {
          method: 'signin',
          email,
        });

        onAuthenticated(data.user?.id);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not authenticate. Please verify your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuestBypass = () => {
    trackEvent('auth_gate_bypassed_guest', 'funnel', evaluationId, {
      role: 'portfolio_reviewer',
    });
    onAuthenticated(undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#141414] border border-[#ffffff1a] rounded-2xl max-w-[420px] w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#fafafa] animate-modal-enter">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#a1a1a1] hover:text-[#fafafa] cursor-pointer p-1.5 rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#a1a1a1]">
            {isStepTransition
              ? 'BEFORE STEP 04 · LEGAL CHECKLIST'
              : 'WORKSPACE SYNC'}
          </p>
          <h2 className="font-serif text-[26px] text-[#fafafa] tracking-[-0.02em] leading-tight">
            {isStepTransition
              ? 'Save your audit before tracking documents'
              : 'Save your property dossier'}
          </h2>
          <p className="text-[13px] text-[#a1a1a1] leading-relaxed">
            {isStepTransition ? (
              <>
                You&apos;ve calculated true handover cash for{' '}
                <strong className="text-[#fafafa] font-normal">
                  {propertyName}
                </strong>
                . Save your numbers to track builder legal documents across
                devices, or skip directly to Step 4.
              </>
            ) : (
              <>
                Keep your cost calculations and document checklist for{' '}
                <strong className="text-[#fafafa] font-normal">
                  {propertyName}
                </strong>{' '}
                accessible across devices.
              </>
            )}
          </p>
        </div>

        {error && <p className="text-xs text-amber-400">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3.5">
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
              className="w-full px-3.5 py-2.5 text-[13px] rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
            />
          </div>

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
              className="w-full px-3.5 py-2.5 text-[13px] rounded-xl bg-[#0a0a0a] border border-[#ffffff14] text-[#fafafa] placeholder:text-[#666666] focus:outline-none focus:border-[#fafafa]/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] font-medium text-[13px] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>
              {mode === 'signup'
                ? 'Create account & save'
                : 'Sign in & save'}
            </span>
          </button>
        </form>

        <div className="flex items-center justify-between pt-4 border-t border-[#ffffff12] text-[12px] text-[#a1a1a1]">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signup' ? 'signin' : 'signup');
              setError(null);
            }}
            className="hover:text-[#fafafa] cursor-pointer"
          >
            {mode === 'signup'
              ? 'Already have an account? Sign in'
              : 'Need an account? Register'}
          </button>

          <button
            type="button"
            onClick={handleGuestBypass}
            className="text-[#fafafa] hover:underline cursor-pointer"
          >
            {isStepTransition ? 'Continue to Step 4 →' : 'Skip for now →'}
          </button>
        </div>
      </div>
    </div>
  );
};
