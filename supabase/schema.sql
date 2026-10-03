-- ============================================================
-- HOMECHECK ENTERPRISE SCHEMA (Product & PM Analytics Edition)
-- Run this script in your Supabase Dashboard:
-- https://supabase.com/dashboard/project/sjxeohzejffbtznntklk/sql
-- ============================================================

-- 1. Create evaluations table
CREATE TABLE IF NOT EXISTS public.evaluations (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    property_name TEXT,
    property_price NUMERIC,
    property_type TEXT,
    city TEXT,
    funding_gap NUMERIC,
    completion_step TEXT,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON public.evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_updated_at ON public.evaluations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_evaluations_property_type ON public.evaluations(property_type);

-- Enable RLS on evaluations
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert evaluations"
ON public.evaluations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow select evaluations"
ON public.evaluations FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow update evaluations"
ON public.evaluations FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- 2. Create analytics_events table (PM Telemetry & Funnel Engine)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    category TEXT NOT NULL,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.analytics_events(created_at DESC);

-- Enable RLS on analytics_events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert events"
ON public.analytics_events FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public select events"
ON public.analytics_events FOR SELECT
TO anon, authenticated
USING (true);


-- 3. Storage Bucket for Property Documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-documents', 'property-documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'property-documents');

CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'property-documents');

CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'property-documents');
