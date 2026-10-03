'use client';

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { X, ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackEvent } from '@/lib/analytics';

interface AuthGateModalProps {
  isOpen: boolean;
  evaluationId: string;
  propertyName?: string;
  onClose: () => void;
  onAuthenticated: (userId?: string) => void;
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({
  isOpen,
  evaluationId,
  propertyName = 'your property',
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
      setError('Supabase is not configured.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { data, error: signupErr } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signupErr) throw signupErr;

        trackEvent('auth_gate_converted', 'conversion', evaluationId, {
          method: 'signup',
          email,
        });

        onAuthenticated(data.user?.id);
      } else {
        const { data, error: signinErr } = await supabase.auth.signInWithPassword({
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
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify your details.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#777777] hover:text-[#EDEDED] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with security icon */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#5B8BDF]/10 border border-[#5B8BDF]/30 flex items-center justify-center text-[#5B8BDF] mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Save & Unlock Financial Picture
          </h2>
          <p className="text-xs text-[#888888] leading-relaxed">
            Create an account to protect your private income details and unlock the personalized funding gap for <strong className="text-[#EDEDED]">{propertyName}</strong>.
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-3.5 bg-[#161616] border border-[#232323] rounded-xl space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <CheckCircle2 className="w-4 h-4 text-[#3F9E6C] shrink-0" />
            <span>Private & encrypted financial calculations (zero data leak)</span>
          </div>
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <CheckCircle2 className="w-4 h-4 text-[#3F9E6C] shrink-0" />
            <span>Saves your due-diligence checklist across all devices</span>
          </div>
          <div className="flex items-center gap-2 text-[#CCCCCC]">
            <CheckCircle2 className="w-4 h-4 text-[#3F9E6C] shrink-0" />
            <span>Downloadable decision readiness report for your family & lawyer</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-[#D94F4F]/10 border border-[#D94F4F]/30 rounded-lg flex items-start gap-2 text-xs text-[#D94F4F]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="text-xs"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="text-xs"
          />

          <Button type="submit" size="md" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Securing your evaluation...</span>
              </>
            ) : (
              <span>
                {mode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-[#777777]">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(null); }}
                className="text-[#5B8BDF] hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              New to HomeCheck?{' '}
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(null); }}
                className="text-[#5B8BDF] hover:underline cursor-pointer"
              >
                Create free account
              </button>
            </p>
          )}
        </div>

        {/* Recruiter & Hiring Manager 1-Click Guest Bypass */}
        <div className="pt-3 border-t border-[#202020] text-center">
          <button
            type="button"
            onClick={handleGuestBypass}
            className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#EDEDED] transition-colors cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B8BDF]" />
            <span className="underline decoration-[#444444] group-hover:decoration-white">
              Evaluating this portfolio? Continue as Guest Reviewer →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
