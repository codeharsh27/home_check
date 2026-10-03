-- ============================================================
-- HOMECHECK ENTERPRISE SCHEMA & PM TELEMETRY SUITE
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/sjxeohzejffbtznntklk/sql
-- ============================================================

-- 1. Core Evaluations Table
CREATE TABLE IF NOT EXISTS public.evaluations (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evaluations_user_id ON public.evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_updated_at ON public.evaluations(updated_at DESC);

-- 2. Product Analytics & Telemetry Table (For PM Portfolio & Funnels)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_id TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_name TEXT NOT NULL,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_eval_id ON public.analytics_events(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Evaluations policies
CREATE POLICY "Allow public insert evaluations"
ON public.evaluations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow select evaluations"
ON public.evaluations FOR SELECT TO anon, authenticated
USING (user_id IS NULL OR (auth.uid() IS NOT NULL AND user_id = auth.uid()));

CREATE POLICY "Allow update evaluations"
ON public.evaluations FOR UPDATE TO anon, authenticated
USING (user_id IS NULL OR (auth.uid() IS NOT NULL AND user_id = auth.uid()))
WITH CHECK (user_id IS NULL OR (auth.uid() IS NOT NULL AND user_id = auth.uid()));

-- Analytics policies (allow logging events)
CREATE POLICY "Allow insert analytics"
ON public.analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow select analytics"
ON public.analytics_events FOR SELECT TO anon, authenticated USING (true);

-- 4. Storage Bucket for Property Documents & Deed Images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'property-documents',
    'property-documents',
    true,
    15728640, -- 15MB file limit
    ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 15728640,
    allowed_mime_types = ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

-- Storage Policies
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT TO anon, authenticated USING (bucket_id = 'property-documents');

CREATE POLICY "Public Upload Access" ON storage.objects
FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'property-documents');

CREATE POLICY "Public Update Access" ON storage.objects
FOR UPDATE TO anon, authenticated USING (bucket_id = 'property-documents');

-- ============================================================
-- 5. PRE-BUILT PM METRICS VIEWS (SCREENSHOT-READY FOR PORTFOLIO)
-- ============================================================

-- View A: Evaluation Funnel Conversion Summary
CREATE OR REPLACE VIEW public.view_funnel_summary AS
SELECT 
    event_name,
    COUNT(*) as total_events,
    COUNT(DISTINCT evaluation_id) as unique_evaluations,
    ROUND(COUNT(DISTINCT evaluation_id) * 100.0 / NULLIF((
        SELECT COUNT(DISTINCT evaluation_id) FROM public.analytics_events WHERE event_name = 'intake_completed'
    ), 0), 1) as conversion_pct_from_intake
FROM public.analytics_events
GROUP BY event_name
ORDER BY total_events DESC;

-- View B: Buyer Risk & Gap Telemetry Summary
CREATE OR REPLACE VIEW public.view_risk_telemetry AS
SELECT 
    id as evaluation_id,
    data->'property'->>'name' as property_name,
    data->'property'->>'type' as property_type,
    (data->'property'->>'price')::numeric as property_price,
    (data->'buyerContext'->>'monthlyIncome')::numeric as monthly_income,
    jsonb_array_length(COALESCE(data->'checklist', '[]'::jsonb)) as total_checks,
    (
        SELECT count(*) 
        FROM jsonb_array_elements(COALESCE(data->'checklist', '[]'::jsonb)) elem 
        WHERE (elem->>'received')::boolean = true
    ) as verified_checks,
    data->>'updatedAt' as last_active_at
FROM public.evaluations
ORDER BY updated_at DESC;
