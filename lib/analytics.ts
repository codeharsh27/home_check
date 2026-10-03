import { supabase, isSupabaseConfigured } from './supabase';

export type PMEventType =
  | 'intake_completed'
  | 'snapshot_confirmed'
  | 'financial_gap_calculated'
  | 'checklist_item_completed'
  | 'document_uploaded'
  | 'question_resolved'
  | 'report_exported';

/**
 * Log a product telemetry event to Supabase analytics_events table.
 * Fails silently so it never interrupts the user experience.
 */
export async function trackEvent(
  eventName: PMEventType,
  evaluationId?: string,
  properties: Record<string, any> = {}
): Promise<void> {
  if (!supabase || !isSupabaseConfigured) return;

  try {
    const userRes = await supabase.auth.getUser();
    const userId = userRes.data?.user?.id || null;

    await supabase.from('analytics_events').insert({
      event_name: eventName,
      evaluation_id: evaluationId || null,
      user_id: userId,
      properties,
    });
  } catch (err) {
    // Non-blocking telemetry
    console.debug('[Telemetry]', eventName, err);
  }
}
