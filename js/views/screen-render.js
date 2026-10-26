// Draws a walkthrough "screen": either an illustration of a tool's window,
// described as data and built from a small kit of parts, or a real screenshot.
// Numbered markers attach to elements (illustrations) or to x/y percentages
// (screenshots), and a numbered legend below explains each one.

import { h, rich } from "../dom.js";

function mark(el, n) {
  if (!n) return el;
  el.classList.add("sc-marked");
  el.append(h("span", { class: "sc-mark", "aria-hidden": "true" }, String(n)));
  return el;
}

const item = (it, cls) => {
  const o = typeof it === "string" ? { label: it } : it;
  const classes = [cls, o.on && "on", o.primary && "primary", o.input && "input"].filter(Boolean).join(" ");
  return mark(h("span", { class: classes }, rich(o.label)), o.mark);
};

const PARTS = {
  tabs: (n) => h("div", { class: "sc-tabs" }, n.items.map((it, i) => item(typeof it === "string" && i === n.active ? { label: it, on: true } : it, "sc-tab"))),
  toolbar: (n) => h("div", { class: "sc-toolbar" }, n.items.map((it) => item(it, "sc-btn"))),
  buttons: (n) => h("div", { class: "sc-toolbar end" }, n.items.map((it) => item(it, "sc-btn"))),
  split: (n) => h("div", { class: `sc-split${n.ratio ? ` r${n.ratio}` : ""}` }, h("div", null, nodes(n.left)), h("div", null, nodes(n.right))),
  pane: (n) => h("div", { class: "sc-pane" }, n.title ? h("div", { class: "sc-pane-title" }, n.title) : null, nodes(n.body)),
  code: (n) => h("div", { class: "sc-code" }, n.lines.map((l, i) => h("div", { class: (n.hl || []).includes(i) ? "hl-line" : null }, l ? rich(l) : " "))),
  table: (n) =>
    h("div", { class: "sc-table" },
      h("div", { class: "sc-tr head" }, n.cols.map((c) => h("span", null, c))),
      n.rows.map((r, i) => h("div", { class: i === n.hl ? "sc-tr hl" : "sc-tr" }, r.map((c) => h("span", null, rich(c)))))),
  form: (n) =>
    h("div", { class: "sc-form" }, n.fields.map((f) =>
      mark(h("div", { class: "sc-field" },
        f.kind === "check" || f.kind === "radio"
          ? [h("span", { class: `sc-${f.kind}${f.on ? " on" : ""}` }), h("span", null, rich(f.label))]
          : [h("span", { class: "sc-label" }, f.label), h("span", { class: "sc-input" }, f.value ? rich(f.value) : " ")]), f.mark))),
  text: (n) => h("p", { class: n.muted ? "sc-text muted" : "sc-text" }, rich(n.text)),
  heading: (n) => h("p", { class: "sc-heading" }, rich(n.text)),
  term: (n, screen) =>
    h("div", { class: "sc-term" }, n.lines.map((l) =>
      l.cmd != null
        ? mark(h("div", null, h("span", { class: "sc-prompt" }, screen.prompt || "$ "), rich(l.cmd)), l.mark)
        : mark(h("div", { class: l.ok ? "ok" : l.bad ? "bad" : "out" }, rich(l.out)), l.mark))),
  chat: (n) => h("div", { class: "sc-chat" }, n.msgs.map((m) => mark(h("div", { class: `sc-msg ${m.who}` }, rich(m.text)), m.mark))),
  side: (n) =>
    h("div", { class: "sc-side" },
      h("div", { class: "sc-nav" }, n.items.map((it, i) => item(typeof it === "string" && i === n.active ? { label: it, on: true } : it, "sc-nav-item"))),
      h("div", null, nodes(n.body))),
  banner: (n) => h("div", { class: `sc-banner ${n.tone || ""}` }, rich(n.text)),
  list: (n) => h("ul", { class: "sc-list" }, n.items.map((it) => mark(h("li", null, rich(typeof it === "string" ? it : it.label)), it.mark))),
};

let currentScreen = null;
function nodes(list) {
  return (list || []).map((n) => {
    const part = PARTS[n.t];
    if (!part) throw new Error(`Unknown screen part "${n.t}"`);
    return mark(part(n, currentScreen), n.mark);
  });
}

export function renderScreen(screen) {
  if (screen.image) {
    const img = h("img", { src: screen.image, alt: screen.alt, width: screen.width, height: screen.height, loading: "lazy" });
    const wrap = h("div", { class: "sc-shot" }, img);
    for (const m of screen.marks || []) {
      const dot = h("span", { class: "sc-mark", "aria-hidden": "true" }, String(m.n));
      dot.style.left = `${m.x}%`;
      dot.style.top = `${m.y}%`;
      wrap.append(dot);
    }
    return h("figure", { class: "sc-figure" }, wrap, h("figcaption", null, "Screenshot"));
  }
  currentScreen = screen;
  const bar = screen.frame === "browser"
    ? h("div", { class: "sc-bar" }, h("i"), h("i"), h("i"), h("span", { class: "sc-url" }, screen.url || ""))
    : h("div", { class: "sc-bar" }, h("i"), h("i"), h("i"), h("span", { class: "sc-title" }, screen.title || ""));
  const win = h("div", { class: `sc sc-${screen.frame || "app"}${screen.dark ? " dark" : ""}`, role: "img", "aria-label": screen.alt }, bar, h("div", { class: "sc-body" }, nodes(screen.body)));
  currentScreen = null;
  return h("figure", { class: "sc-figure" }, win, h("figcaption", null, "Illustration: your screen may look slightly different."));
}
