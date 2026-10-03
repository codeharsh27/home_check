import { createClient } from '@supabase/supabase-js';
import { EvaluationSession, DocumentEvidence } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Save evaluation session to Supabase 'evaluations' table.
 * If user is not authenticated, saves with null user_id (or anon owner).
 */
export async function syncEvaluationToSupabase(
  evaluation: EvaluationSession,
  userId?: string | null
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase not configured' };

  try {
    const price = evaluation.property?.price || 0;
    const funds = (evaluation.buyerContext?.availableFunds || 0) - (evaluation.buyerContext?.emergencyReserve || 0);
    const loan = evaluation.buyerContext?.plannedLoanAmount || 0;
    const fundingGap = Math.max(0, price * 1.07 - (Math.max(0, funds) + loan));

    const payload = {
      id: evaluation.id,
      user_id: userId || null,
      property_name: evaluation.property?.name || 'Untitled Property',
      property_price: price,
      property_type: evaluation.property?.type || 'Apartment',
      city: evaluation.property?.city || evaluation.property?.location?.split(',')?.[0]?.trim() || null,
      funding_gap: fundingGap,
      completion_step: evaluation.step || 'snapshot',
      data: evaluation,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('evaluations')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] Sync warning (table might need setup):', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Supabase] Error during sync:', err?.message);
    return { success: false, error: err?.message };
  }
}

/**
 * Claim an anonymous evaluation session for an authenticated user.
 */
export async function claimEvaluationInSupabase(
  evaluationId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase not configured' };

  try {
    const { error } = await supabase
      .from('evaluations')
      .update({ user_id: userId, updated_at: new Date().toISOString() })
      .eq('id', evaluationId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    console.warn('[Supabase] Error claiming evaluation:', err?.message);
    return { success: false, error: err?.message };
  }
}

/**
 * Upload document to Supabase Storage bucket 'property-documents'.
 */
export async function uploadDocumentToSupabase(
  file: File,
  evaluationId: string,
  itemId: string
): Promise<{ evidence?: DocumentEvidence; error?: string }> {
  if (!supabase) {
    // Local fallback if Supabase is not ready
    return {
      evidence: {
        id: `doc_${Date.now()}`,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toLocaleDateString('en-IN'),
      },
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${evaluationId}/${itemId}/${Date.now()}_${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('property-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('[Supabase Storage] Upload fallback (bucket may need creation):', error.message);
      // Return local evidence reference even if bucket is pending
      return {
        evidence: {
          id: `doc_${Date.now()}`,
          fileName: file.name,
          fileSize: file.size,
          uploadedAt: new Date().toLocaleDateString('en-IN'),
        },
        error: error.message,
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from('property-documents')
      .getPublicUrl(filePath);

    return {
      evidence: {
        id: `doc_${Date.now()}`,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toLocaleDateString('en-IN'),
        fileUrl: publicUrlData?.publicUrl || undefined,
      },
    };
  } catch (err: any) {
    console.warn('[Supabase Storage] Error:', err?.message);
    return {
      evidence: {
        id: `doc_${Date.now()}`,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toLocaleDateString('en-IN'),
      },
      error: err?.message,
    };
  }
}

/**
 * Fetch all evaluations belonging to the logged-in user.
 */
export async function fetchUserEvaluationsFromSupabase(
  userId: string
): Promise<EvaluationSession[]> {
  if (!supabase || !userId) return [];

  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('data')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error || !data) return [];
    return data.map((row: any) => row.data as EvaluationSession);
  } catch {
    return [];
  }
}
