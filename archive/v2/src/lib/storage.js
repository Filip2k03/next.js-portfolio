// Typed-ish localStorage service: namespaced keys, SSR-safe, never throws.
const NAMESPACE = 'tf:v1';

export const STORAGE_KEYS = {
  accent: `${NAMESPACE}:accent`,
  lang: `${NAMESPACE}:lang`,
};

// Reads must survive SSR, private mode and corrupted values without crashing.
export function storageGet(key, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function storageSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota exceeded / private mode — persisting is best-effort only
  }
}
