import { supabase, isSupabaseConfigured } from './supabase';

export interface AnalyticsEvent {
  id?: string;
  sessionId: string;
  eventName: string;
  category: 'funnel' | 'engagement' | 'conversion' | 'risk';
  properties?: Record<string, any>;
  createdAt?: string;
}

// Local telemetry cache for immediate display & offline resilience
const LOCAL_EVENTS_KEY = 'homecheck_telemetry_events';

export function getLocalTelemetryEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalTelemetryEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  try {
    const events = getLocalTelemetryEvents();
    const updated = [event, ...events].slice(0, 100); // keep last 100
    localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(updated));
  } catch {}
}

/**
 * Track a product event to Supabase analytics_events table and local buffer
 */
export async function trackEvent(
  eventName: string,
  category: AnalyticsEvent['category'],
  sessionId: string,
  properties: Record<string, any> = {}
) {
  const event: AnalyticsEvent = {
    sessionId,
    eventName,
    category,
    properties,
    createdAt: new Date().toISOString(),
  };

  // 1. Save locally for instant rendering
  saveLocalTelemetryEvent(event);

  // 2. Transmit to Supabase asynchronously
  if (supabase && isSupabaseConfigured) {
    try {
      await supabase.from('analytics_events').insert({
        session_id: sessionId,
        event_name: eventName,
        category,
        properties,
        created_at: event.createdAt,
      });
    } catch (err) {
      console.debug('[Analytics] Event send non-blocking fallback:', err);
    }
  }
}

/**
 * Fetch all analytics events from Supabase or fallback to local
 */
export async function fetchAllAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          sessionId: d.session_id,
          eventName: d.event_name,
          category: d.category,
          properties: d.properties || {},
          createdAt: d.created_at,
        }));
      }
    } catch {}
  }

  return getLocalTelemetryEvents();
}
