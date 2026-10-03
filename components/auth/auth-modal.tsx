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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#121212] border border-[#262626] rounded-2xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#777777] hover:text-[#EDEDED] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#EDEDED]">
            {mode === 'signin' && 'Sign in to HomeCheck'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'magiclink' && 'Sign in with Magic Link'}
          </h2>
          <p className="text-xs text-[#888888]">
            {mode === 'signin' && 'Sync and protect your property evaluation sessions'}
            {mode === 'signup' && 'Save evaluations securely across all devices'}
            {mode === 'magiclink' && 'We will send a secure sign-in link to your email'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#D94F4F]/10 border border-[#D94F4F]/30 rounded-lg flex items-start gap-2 text-xs text-[#D94F4F]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-[#3F9E6C]/10 border border-[#3F9E6C]/30 rounded-lg flex items-start gap-2 text-xs text-[#3F9E6C]">
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
            className="text-xs"
          />

          {mode !== 'magiclink' && (
            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="text-xs"
            />
          )}

          <Button type="submit" size="md" className="w-full" disabled={loading}>
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

        <div className="pt-2 border-t border-[#202020] space-y-2 text-center text-xs text-[#777777]">
          {mode === 'signin' && (
            <>
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null); }}
                  className="text-[#5B8BDF] hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </p>
              <p>
                Prefer passwordless?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('magiclink'); setError(null); setSuccessMessage(null); }}
                  className="text-[#888888] hover:text-[#EDEDED] underline cursor-pointer"
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
                className="text-[#5B8BDF] hover:underline cursor-pointer"
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
                className="text-[#5B8BDF] hover:underline cursor-pointer"
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
