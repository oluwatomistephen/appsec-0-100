// Export and import of progress files. An imported file is untrusted input:
// it is size-capped, parsed in a try block, checked field by field against an
// allow-list, and only ever stored as a list of known item IDs.

import { ID_PATTERN, MAX_ITEMS } from "./storage.js";

export const APP_ID = "appsec-0-100";
export const FORMAT_VERSION = 1;
export const MAX_FILE_BYTES = 256 * 1024;

/** @param {Map<string, Set<string>>} progress  pathway id -> ticked ids */
export function buildExport(progress) {
  const pathways = {};
  for (const [id, done] of progress) if (done.size) pathways[id] = [...done].sort();
  return { app: APP_ID, version: FORMAT_VERSION, exportedAt: new Date().toISOString(), pathways };
}

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;

/**
 * Validate an imported file's text.
 * @param {string} text
 * @param {Map<string, Set<string>>} validIds  pathway id -> every item id in that pathway
 * @returns {{ok: false, error: string} | {ok: true, pathways: Map<string, {ids: string[], ignored: number}>}}
 */
export function parseImport(text, validIds) {
  if (typeof text !== "string" || text.length > MAX_FILE_BYTES) return { ok: false, error: "The file is too large to be a progress file." };
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: "The file isn't valid JSON." };
  }
  if (!isPlainObject(data)) return { ok: false, error: "The file isn't a progress export." };
  if (data.app !== APP_ID) return { ok: false, error: "The file isn't an AppSec 0→100 progress export." };
  if (data.version !== FORMAT_VERSION) return { ok: false, error: "The file was made by a different version of this site." };
  if (!isPlainObject(data.pathways)) return { ok: false, error: "The file has no pathway progress in it." };

  const result = new Map();
  for (const key of Object.keys(data.pathways)) {
    const known = validIds.get(key);
    if (!known) continue; // unknown pathway names are ignored, never stored
    const list = data.pathways[key];
    if (!Array.isArray(list) || list.length > MAX_ITEMS) return { ok: false, error: `The progress for "${key}" isn't a valid list.` };
    const ids = [];
    let ignored = 0;
    for (const id of list) {
      if (typeof id === "string" && id.length <= 100 && ID_PATTERN.test(id) && known.has(id)) ids.push(id);
      else ignored += 1;
    }
    result.set(key, { ids: [...new Set(ids)], ignored });
  }
  if (result.size === 0) return { ok: false, error: "The file has no progress for any pathway on this site." };
  return { ok: true, pathways: result };
}

/** @param {"merge"|"replace"} mode */
export function applyImport(current, imported, mode) {
  return mode === "replace" ? new Set(imported) : new Set([...current, ...imported]);
}
