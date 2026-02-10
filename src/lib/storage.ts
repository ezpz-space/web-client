import type { EstimateDraft } from '@/types';

const DRAFT_KEY = 'ezpz_estimate_draft';

export function saveEstimateDraft(draft: EstimateDraft): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadEstimateDraft(): EstimateDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EstimateDraft;
  } catch {
    return null;
  }
}

export function clearEstimateDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}
