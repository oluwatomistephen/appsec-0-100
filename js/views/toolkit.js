import { h, rich } from "../dom.js";
import { pad } from "../catalog.js";
import { href } from "../router.js";
import { renderScreen } from "./screen-render.js";

/** Walkthroughs linked from this pathway's weeks, in order of first use. */
export function pathwayWalkthroughs(bp, walkMap) {
  const seen = new Map();
  for (const { week, n } of bp.weeks) {
    for (const id of week.walkthroughs || []) if (walkMap.has(id) && !seen.has(id)) seen.set(id, { walk: walkMap.get(id), n, week });
  }
  return [...seen.values()];
}

function renderList(ctx, bp, list) {
  return h("section", null,
    h("div", { class: "intro" },
      h("p", { class: "eyebrow" }, bp.def.name),
      h("h1", { tabindex: "-1" }, "Toolkit"),
      h("p", null, "Step-by-step guides for every tool this pathway uses, with pictures of the screen and numbered markers showing exactly where to look. Each one is also linked from the week you first need it.")),
    h("div", { class: "tools" }, list.map(({ walk, n }) =>
      h("a", { class: "tool-card", href: href(bp.def.id, "toolkit", walk.id) },
        h("h2", null, walk.title),
        h("p", null, walk.summary),
        h("div", { class: "tool-meta" },
          h("span", { class: "pill" }, walk.tool),
          h("span", { class: "pill" }, walk.time),
          h("span", { class: "pill" }, `First used W${pad(n)}`))))));
}

function renderWalk(ctx, bp, entry) {
  const { walk, n, week } = entry;
  const copy = (text) => h("button", {
    class: "btn", type: "button", "aria-label": "Copy prompt",
    onclick: () => navigator.clipboard.writeText(text).then(() => ctx.toast("Prompt copied."), () => ctx.toast("Couldn't copy. Select the text and copy it instead.")),
  }, "Copy");

  return h("article", null,
    h("nav", { class: "btn-row", "aria-label": "Back" },
      h("a", { class: "btn", href: href(bp.def.id, "toolkit") }, "← Toolkit"),
      h("a", { class: "btn", href: `${href(bp.def.id, "plan")}` }, `Back to the plan (W${pad(n)} ${week.title})`)),
    h("div", { class: "walk-head" },
      h("p", { class: "eyebrow" }, `${walk.tool} · ${walk.time}`),
      h("h1", { tabindex: "-1" }, walk.title),
      h("p", null, rich(walk.summary))),
    walk.before ? h("div", { class: "note" }, h("b", null, "Before you start"), h("ul", { class: "learn" }, walk.before.map((b) => h("li", null, rich(b))))) : null,
    walk.safety ? h("div", { class: "note" }, h("b", null, "Stay safe and legal"), h("p", null, rich(walk.safety))) : null,
    h("ol", { class: "steps" }, walk.steps.map((step, i) =>
      h("li", { class: "step" },
        h("h2", null, h("span", { class: "wk" }, pad(i + 1)), step.title),
        step.text.map((p) => h("p", null, rich(p))),
        step.screen ? renderScreen(step.screen) : null,
        step.legend
          ? h("ol", { class: "legend-list", "aria-label": "What the numbered markers show" },
              step.legend.map((l, j) => h("li", null, h("span", { class: "num", "aria-hidden": "true" }, String(j + 1)), h("span", null, h("span", { class: "visually-hidden" }, `Marker ${j + 1}: `), rich(l)))))
          : null,
        step.prompt
          ? [h("div", { class: "block-label" }, "Stuck? Ask an AI tutor"), h("ul", { class: "ai" }, h("li", null, h("q", null, step.prompt), copy(step.prompt)))]
          : null))),
    h("div", { class: "note done-when" }, h("b", null, "You're done when"), h("p", null, rich(walk.doneWhen))));
}

export function renderToolkit(ctx, bp, walkId) {
  const list = pathwayWalkthroughs(bp, ctx.walkMap);
  if (walkId) {
    const entry = list.find((x) => x.walk.id === walkId);
    if (entry) return renderWalk(ctx, bp, entry);
  }
  return renderList(ctx, bp, list);
}
