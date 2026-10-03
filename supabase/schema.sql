-- ============================================================
-- HOMECHECK SUPABASE SCHEMA
-- Run this script in your Supabase Dashboard:
-- https://supabase.com/dashboard/project/sjxeohzejffbtznntklk/sql
-- ============================================================

-- 1. Create evaluations table
CREATE TABLE IF NOT EXISTS public.evaluations (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for user evaluations lookup
CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON public.evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_updated_at ON public.evaluations(updated_at DESC);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous or authenticated users to insert evaluations
CREATE POLICY "Allow public insert evaluations"
ON public.evaluations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow users to select evaluations (either public/anonymous or own records)
CREATE POLICY "Allow select evaluations"
ON public.evaluations
FOR SELECT
TO anon, authenticated
USING (
    user_id IS NULL 
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
);

-- Allow users to update their own evaluations or anonymous evaluations
CREATE POLICY "Allow update evaluations"
ON public.evaluations
FOR UPDATE
TO anon, authenticated
USING (
    user_id IS NULL 
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
)
WITH CHECK (
    user_id IS NULL 
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
);

-- 3. Storage Bucket for Property Documents
-- Create public storage bucket 'property-documents'
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-documents', 'property-documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policy: Allow public read
CREATE POLICY "Public Read Access"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'property-documents');

-- Storage Policy: Allow public upload
CREATE POLICY "Public Upload Access"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'property-documents');

-- Storage Policy: Allow update/delete by owner or public
CREATE POLICY "Public Update Access"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'property-documents');
