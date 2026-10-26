// Renders one learning card from deck data. The CSS keeps the card design
// fixed, independent of the page theme.

import { h, s, rich } from "../dom.js";
import { pad } from "../catalog.js";

function segments(parts) {
  return parts.map((p) => (typeof p === "string" ? p : p.k != null ? h("span", { class: "k" }, p.k) : h("span", { class: "m" }, p.m)));
}

const BLOCKS = {
  p: (b, vars) => h("p", { class: ["c-p", b.small && "small", b.spaced && "spaced"].filter(Boolean).join(" ") }, rich(b.text, vars)),

  code: (b) =>
    h("div", { class: "c-code" },
      h("div", { class: "lab" }, h("span", null, b.label), h("span", { class: "dots", "aria-hidden": "true" })),
      b.lines.map((line) => h("div", { class: "line" }, segments(line)))),

  table: (b) =>
    h("div", { class: "c-code", role: "table", "aria-label": b.label },
      h("div", { class: "lab" }, h("span", null, b.label), h("span", { class: "dots", "aria-hidden": "true" })),
      b.rows.map((row) => {
        const cells = Array.isArray(row) ? row : row.cells;
        const cls = ["c-row", b.two && "two", !Array.isArray(row) && row.muted && "m"].filter(Boolean).join(" ");
        return h("div", { class: cls, role: "row" }, segments(cells).map((c) => h("span", { role: "cell" }, c)));
      })),

  cols: (b) =>
    h("div", { class: "c-cols" },
      b.cols.map((col) =>
        h("div", { class: "c-col" },
          h("h4", null, col.title),
          col.tags.map((t) => (typeof t === "string" ? h("span", { class: "c-tag" }, t) : h("span", { class: "c-tag on" }, t.text)))))),

  list: (b, vars) =>
    h("div", { class: "c-list" },
      b.items.map(([code, text]) => h("div", { class: "c-li" }, h("code", null, code), h("span", null, rich(text, vars))))),

  callout: (b, vars) =>
    h("div", { class: "c-callout" },
      s("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "#14231d", "stroke-width": "2", "aria-hidden": "true" },
        s("path", { d: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" }),
        s("path", { d: "M12 8v5M12 16v.01" })),
      h("div", null, h("strong", null, rich(b.title, vars)), h("span", null, rich(b.text, vars)))),

  boxes: (b, vars) =>
    b.items.map(([label, text]) =>
      h("div", { class: "c-box" }, h("b", null, label), h("span", { class: "arr", "aria-hidden": "true" }, "→"), h("span", null, rich(text, vars)))),

  next: (b, vars) => h("div", { class: "c-next" }, h("small", null, rich(b.label, vars)), h("strong", null, rich(b.title, vars))),
};

function net() {
  return s("svg", { class: "c-net", viewBox: "0 0 100 100", fill: "none", stroke: "#c8f56a", "stroke-width": ".6", "aria-hidden": "true" },
    s("path", { d: "M85 5 58 48 20 70 50 98 95 72 58 48" }),
    s("g", { fill: "#4f7a5f", stroke: "none" },
      [[85, 5, 2.4], [58, 48, 3.6], [20, 70, 2.8], [50, 98, 3], [95, 72, 2.8]].map(([cx, cy, r]) => s("circle", { cx, cy, r }))));
}

export function renderCard(card, index, total, vars) {
  const dark = card.theme !== "paper";
  const brand = h("div", { class: "c-brand" }, h("i", { "aria-hidden": "true" }), "AppSec ", dark ? h("em", null, "0→100") : "0→100");
  const foot = card.foot
    ? h("div", { class: "c-foot" },
        card.foot.mono ? h("span", { class: "mono" }, rich(card.foot.mono, vars)) : h("span", null, rich(card.foot.text, vars)),
        card.foot.swipe ? h("span", { class: "c-swipe", "aria-hidden": "true" }, "Swipe →") : null)
    : null;
  return h("article", {
      class: `card c-${card.theme}`,
      "aria-roledescription": "card",
      "aria-label": `Card ${index + 1} of ${total}`,
    },
    h("div", { class: "c-top" }, brand, h("div", { class: "c-num", "aria-hidden": "true" }, `${pad(index + 1)} / ${pad(total)}`)),
    card.eyebrow ? h("p", { class: card.eyebrowSpaced ? "c-eye spaced" : "c-eye" }, rich(card.eyebrow, vars)) : null,
    h("h2", { class: card.xl ? "c-h xl" : "c-h" }, rich(card.heading, vars)),
    card.blocks.map((b) => {
      const render = BLOCKS[b.type];
      if (!render) throw new Error(`Unknown card block type "${b.type}"`);
      return render(b, vars);
    }),
    card.net ? net() : null,
    foot);
}
