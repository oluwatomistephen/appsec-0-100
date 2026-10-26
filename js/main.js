import { pathways } from "../data/pathways/index.js";
import { decks } from "../data/decks/index.js";
import { walkthroughs } from "../data/walkthroughs/index.js";
import { h, mount } from "./dom.js";
import { buildPathway } from "./catalog.js";
import { parseRoute, href } from "./router.js";
import { loadProgress, saveProgress, storageAvailable, loadTheme, saveTheme } from "./storage.js";
import { renderLanding } from "./views/landing.js";
import { renderPlan } from "./views/plan.js";
import { renderCards } from "./views/cards.js";
import { renderToolkit } from "./views/toolkit.js";

const built = pathways.map(buildPathway);
const byId = new Map(built.map((bp) => [bp.def.id, bp]));
const deckMap = new Map(decks.map((d) => [d.id, d]));
const walkMap = new Map(walkthroughs.map((w) => [w.id, w]));
const known = { pathways: new Set(byId.keys()), decks: new Set(deckMap.keys()), walkthroughs: new Set(walkMap.keys()) };

const progress = new Map();
const main = document.getElementById("main");
const overall = document.getElementById("overall");
const overallBar = document.getElementById("overall-bar");
const tabs = document.getElementById("tabs");
const toastEl = document.getElementById("toast");
let route = { name: "landing" };
let toastTimer = null;

const ctx = {
  pathways: built,
  deckMap,
  walkMap,
  storageOk: storageAvailable(),
  getDone(id) {
    if (!progress.has(id)) progress.set(id, loadProgress(id));
    return progress.get(id);
  },
  setDone(id, done) {
    progress.set(id, done);
    return saveProgress(id, done);
  },
  toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
  },
  updateHeader,
  rerender: () => render(false),
};

function updateHeader() {
  const bp = route.name === "pathway" ? byId.get(route.pathway) : null;
  overall.hidden = overallBar.hidden = tabs.hidden = !bp;
  if (!bp) return;
  const done = ctx.getDone(bp.def.id);
  const n = bp.countedIds.filter((id) => done.has(id)).length;
  const current = bp.weeks.find((w) => !w.week.optional && w.ids.some((id) => !done.has(id)));
  mount(overall, `${n} / ${bp.countedIds.length}`, h("span", { class: "wide" }, " done"),
    current ? [" · ", h("span", { class: "wide" }, "Week "), h("span", { class: "narrow" }, "W"), String(current.n)] : "");
  overallBar.firstElementChild.style.width = `${(n / bp.countedIds.length) * 100}%`;
}

function renderTabs(bp) {
  const counted = bp.weeks.filter((w) => !w.week.optional).length;
  const tab = (view, label) => h("a", { class: "tab", href: href(bp.def.id, view), "aria-current": route.view === view ? "page" : null }, label);
  mount(tabs, tab("plan", `${counted}-week plan`), tab("cards", "Learning cards"), tab("toolkit", "Toolkit"));
}

function render(moveFocus) {
  route = parseRoute(location.hash, known);
  if (route.name === "landing") {
    document.title = "AppSec 0→100";
    mount(main, renderLanding(ctx));
  } else {
    const bp = byId.get(route.pathway);
    renderTabs(bp);
    if (route.view === "cards") {
      document.title = `Learning cards · ${bp.def.name} · AppSec 0→100`;
      mount(main, renderCards(ctx, bp, route.item));
    } else if (route.view === "toolkit") {
      const walk = route.item && walkMap.get(route.item);
      document.title = `${walk ? walk.title : "Toolkit"} · ${bp.def.name} · AppSec 0→100`;
      mount(main, renderToolkit(ctx, bp, route.item));
    } else {
      document.title = `${bp.def.name} plan · AppSec 0→100`;
      mount(main, renderPlan(ctx, bp));
    }
  }
  updateHeader();
  if (moveFocus) {
    window.scrollTo(0, 0);
    const heading = main.querySelector("h1");
    if (heading) heading.focus({ preventScroll: true });
  }
}

/* Theme: auto (system) → light → dark */
const themeBtn = document.getElementById("theme-toggle");
const THEMES = ["auto", "light", "dark"];
function applyTheme(theme) {
  if (theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = `◐ ${theme[0].toUpperCase()}${theme.slice(1)}`;
  themeBtn.setAttribute("aria-label", `Colour theme: ${theme}. Change theme`);
}
let theme = loadTheme();
themeBtn.addEventListener("click", () => {
  theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
  saveTheme(theme);
  applyTheme(theme);
});
applyTheme(theme);

document.getElementById("skip").addEventListener("click", () => {
  const heading = main.querySelector("h1");
  (heading || main).focus();
});

window.addEventListener("hashchange", () => render(true));
render(false);
