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
          options: {
            emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
          },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-stone-200/90 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 cursor-pointer p-1"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with security icon */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            Save Your Property Decision Dossier
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Securely save your calculated handover cash drain, multi-source funding structure, and verification roadmap for <strong className="text-stone-800">{propertyName}</strong>.
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-3.5 bg-stone-50/90 border border-stone-200/80 rounded-xl space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Zero Broker Spam:</strong> We never share your data with builders or sales reps.</span>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Multi-Device Access:</strong> Review this dossier anytime on your phone or laptop.</span>
          </div>
          <div className="flex items-center gap-2 text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>Lawyer Briefing:</strong> Save your 3-stage document checklist for advocate review.</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-700">
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
            className="text-xs bg-stone-50/50 border-stone-200"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="text-xs bg-stone-50/50 border-stone-200"
          />

          <Button type="submit" size="md" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-sm" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                <span>Securing your evaluation...</span>
              </>
            ) : (
              <span>
                {mode === 'signup' ? 'Create Account & Save Dossier' : 'Sign In & Save Dossier'}
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-stone-500">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(null); }}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline cursor-pointer"
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
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline cursor-pointer"
              >
                Create free account
              </button>
            </p>
          )}
        </div>

        {/* 1-Click Guest Bypass */}
        <div className="pt-3 border-t border-stone-100 text-center">
          <button
            type="button"
            onClick={handleGuestBypass}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer group"
          >
            <span>Or continue as guest without saving (stored in this browser) →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
