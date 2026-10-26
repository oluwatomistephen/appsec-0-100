// Progress lives in localStorage, one key per pathway, so switching pathways
// never touches another pathway's ticks. Every read is defensive: storage can
// be blocked, full, or edited by hand.

const PREFIX = "appsec0100:v1:";
const THEME_KEY = "appsec0100:theme";
export const MAX_ITEMS = 5000;
export const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.[dxp]\d{1,2}$/;

export function sanitiseIds(list) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, MAX_ITEMS).filter((id) => typeof id === "string" && id.length <= 100 && ID_PATTERN.test(id));
}

/** Returns the saved ticks for a pathway. Unknown IDs are kept so a content
 *  rename doesn't wipe progress; views only count IDs that exist. */
export function loadProgress(pathwayId) {
  try {
    const raw = localStorage.getItem(PREFIX + pathwayId);
    if (!raw) return new Set();
    const data = JSON.parse(raw);
    return new Set(sanitiseIds(data && data.done));
  } catch {
    return new Set();
  }
}

/** Returns false when storage is unavailable, so the UI can say so. */
export function saveProgress(pathwayId, done) {
  try {
    localStorage.setItem(PREFIX + pathwayId, JSON.stringify({ v: 1, done: [...done], updated: new Date().toISOString() }));
    return true;
  } catch {
    return false;
  }
}

export function storageAvailable() {
  try {
    const k = PREFIX + "probe";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "auto";
  } catch {
    return "auto";
  }
}

export function saveTheme(theme) {
  try {
    if (theme === "auto") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch { /* the choice just won't persist */ }
}
