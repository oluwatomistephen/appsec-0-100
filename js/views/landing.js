import { h } from "../dom.js";
import { href } from "../router.js";
import { renderProgressTools } from "./progress-tools.js";

const DOES = [
  ["Review code", "Read pull requests and catch injection, broken access control and unsafe crypto before they ship."],
  ["Test running apps", "Use tools like Burp Suite to find the bugs an attacker would, in apps the team owns."],
  ["Build security into pipelines", "Run scanners in CI so every change is checked, without drowning developers in noise."],
  ["Threat model", "Sit with a team before they build and ask what could go wrong, and what to do about it."],
  ["Write fixes, not just findings", "Help developers make the secure way the easy way, and explain risk without blame."],
  ["Secure AI features", "Review AI-written code, and test apps that call LLMs for prompt injection and over-powered tools."],
];

export function renderLanding(ctx) {
  const cards = ctx.pathways.map((bp) => {
    const def = bp.def;
    const optional = bp.weeks.filter((w) => w.week.optional).length;
    const done = ctx.getDone(def.id);
    const n = bp.countedIds.filter((id) => done.has(id)).length;
    const bar = h("div", { class: "bar", "aria-hidden": "true" }, h("span"));
    bar.firstChild.style.width = `${(n / bp.countedIds.length) * 100}%`;
    return h("a", { class: "path-card", href: href(def.id, "plan") },
      h("h3", null, def.name),
      h("p", null, def.who),
      h("div", { class: "path-meta" },
        h("span", { class: "pill" }, `${bp.weekCount - optional} weeks${optional ? ` + ${optional} optional` : ""}`),
        h("span", { class: "pill" }, `${def.hours} h / week`)),
      n > 0 ? h("div", { class: "path-progress" }, bar, h("span", { class: "counter" }, `${n}/${bp.countedIds.length}`)) : null,
      h("span", { class: "path-cta", "aria-hidden": "true" }, n > 0 ? "Continue →" : "Start →"));
  });

  return h("section", null,
    h("div", { class: "hero" },
      h("p", { class: "eyebrow" }, "Free · No sign-up · Nothing tracked"),
      h("h1", { tabindex: "-1" }, "Become an AppSec engineer, ", h("em", null, "from wherever you’re starting.")),
      h("p", { class: "lead" }, "Application security (AppSec) engineers help developers build software that’s hard to break. Pick the pathway that matches where you are today, then work through it week by week."),
      h("p", { class: "lead" }, "Every week has things to learn, deliverables to tick off, “can I explain it?” checks and prompts for using an AI assistant as a tutor. Your progress saves in this browser.")),
    h("h2", { class: "section-h", id: "pick" }, "Pick your pathway"),
    h("div", { class: "paths" }, cards),
    h("h2", { class: "section-h" }, "What AppSec engineers do"),
    h("ul", { class: "does" }, DOES.map(([t, d]) => h("li", null, h("b", null, t), h("span", null, d)))),
    renderProgressTools(ctx));
}
