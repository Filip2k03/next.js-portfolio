import { storageGet, storageSet, STORAGE_KEYS } from './storage';

export const ACCENTS = ['emerald', 'violet', 'bronze'];

// Single place that mutates the accent attribute + persists the choice,
// so the header picker and the terminal can't drift apart.
export function applyAccent(accent) {
  if (!ACCENTS.includes(accent)) return false;
  document.documentElement.dataset.accent = accent;
  storageSet(STORAGE_KEYS.accent, accent);
  return true;
}

export function getSavedAccent() {
  const saved = storageGet(STORAGE_KEYS.accent, 'emerald');
  return ACCENTS.includes(saved) ? saved : 'emerald';
}
