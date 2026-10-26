// Hash routes: #<pathway>/<view>[/<item>]. Every segment is checked against
// an allow-list; anything unexpected falls back to the landing page.

export const VIEWS = ["plan", "cards"];

/**
 * @param {string} hash  location.hash
 * @param {{pathways: Set<string>, decks: Set<string>}} known
 * @returns {{name: "landing"} | {name: "pathway", pathway: string, view: string, item: string|null}}
 */
export function parseRoute(hash, known) {
  const parts = String(hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts.length === 0 || parts.length > 3) return { name: "landing" };
  const [pathway, view = "plan", item = null] = parts;
  if (!known.pathways.has(pathway) || !VIEWS.includes(view)) return { name: "landing" };
  if (item !== null && !(view === "cards" && known.decks.has(item))) return { name: "pathway", pathway, view, item: null };
  return { name: "pathway", pathway, view, item };
}

export function href(pathway, view = "plan", item = null) {
  return "#" + [pathway, view, item].filter(Boolean).join("/");
}
