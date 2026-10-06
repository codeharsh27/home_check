'use client';

import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { X, Mail, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
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
      setError('Supabase is not configured. Please check environment variables.');
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
            emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (magicErr) throw magicErr;
        setSuccessMessage('Check your email for the login link!');
      } else if (mode === 'signup') {
        const { data, error: signupErr } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signupErr) throw signupErr;
        if (data.user && !data.session) {
          setSuccessMessage('Account created! Please check your email to confirm your account.');
        } else {
          setSuccessMessage('Account created successfully!');
          setTimeout(() => {
            onSuccess?.();
            onClose();
          }, 1200);
        }
      } else {
        // Sign in
        const { error: signinErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signinErr) throw signinErr;
        setSuccessMessage('Signed in successfully!');
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-stone-200/90 rounded-2xl max-w-sm w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 cursor-pointer p-1 rounded-lg hover:bg-stone-50"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            {mode === 'signin' && 'Sign in to HomeCheck'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'magiclink' && 'Sign in with Magic Link'}
          </h2>
          <p className="text-xs text-stone-500">
            {mode === 'signin' && 'Access and sync your saved property evaluation dossiers'}
            {mode === 'signup' && 'Save evaluations and legal roadmaps securely'}
            {mode === 'magiclink' && 'We will send a secure sign-in link to your email'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-700">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="text-xs bg-stone-50/50 border-stone-200"
          />

          {mode !== 'magiclink' && (
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="text-xs bg-stone-50/50 border-stone-200"
            />
          )}

          <Button type="submit" size="md" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold shadow-sm" disabled={loading}>
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
          </Button>
        </form>

        <div className="pt-2 border-t border-stone-100 space-y-2 text-center text-xs text-stone-500">
          {mode === 'signin' && (
            <>
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null); }}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
              <p>
                Prefer passwordless?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('magiclink'); setError(null); setSuccessMessage(null); }}
                  className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
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
                onClick={() => { setMode('signin'); setError(null); setSuccessMessage(null); }}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
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
                onClick={() => { setMode('signin'); setError(null); setSuccessMessage(null); }}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
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
