import { h, rich, plain } from "../dom.js";
import { pad } from "../catalog.js";
import { href } from "../router.js";
import { renderProgressTools } from "./progress-tools.js";

const AI_HINT = "Paste into any AI assistant. Replace the [brackets] first, and never paste passwords, tokens, real customer data or your employer's code.";

function copyButton(ctx, text) {
  return h("button", {
    class: "btn", type: "button", "aria-label": "Copy prompt",
    onclick: () => navigator.clipboard.writeText(text).then(
      () => ctx.toast("Prompt copied."),
      () => ctx.toast("Couldn't copy. Select the text and copy it instead.")),
  }, "Copy");
}

function promptList(ctx, prompts) {
  return h("ul", { class: "ai" }, prompts.map((p) => h("li", null, h("q", null, p), copyButton(ctx, p))));
}

/** Weeks a self-quiz covers: up to the two weeks before, within the phase. */
function quizRange(phase, entry) {
  const start = Math.max(phase.weeks[0].n, entry.n - 2);
  return phase.weeks.filter((w) => w.n >= start && w.n <= entry.n);
}

export function renderPlan(ctx, bp) {
  const def = bp.def;
  const done = ctx.getDone(def.id);
  const counters = [];
  const optionalCount = bp.weeks.filter((w) => w.week.optional).length;
  const counted = bp.weekCount - optionalCount;

  const check = (id, text) => {
    const input = h("input", { type: "checkbox", dataset: { id } });
    input.checked = done.has(id);
    return h("label", { class: "check" }, input, h("span", null, rich(text)));
  };

  const current = bp.weeks.find((w) => !w.week.optional && w.ids.some((id) => !done.has(id)));

  const weekEl = (phase, entry) => {
    const { week, n, ids } = entry;
    const status = h("span", { class: "ws" });
    const tags = [
      week.optional ? h("span", { class: "pill opt" }, "Optional") : null,
      week.quiz ? h("span", { class: "pill quiz" }, "Self-quiz") : null,
      week.project ? h("span", { class: "pill proj" }, week.project.code) : null,
    ].filter(Boolean);
    const details = h("details", { class: "week", id: `week-${week.id}`, open: entry === current },
      h("summary", null,
        h("span", { class: "wk" }, `W${pad(n)}`),
        h("span", { class: "wt" }, week.title, tags.length ? h("small", null, tags) : null),
        status),
      h("div", { class: "week-body" },
        h("div", { class: "block-label" }, "Learn"),
        h("ul", { class: "learn" }, week.learn.map((l) => h("li", null, rich(l)))),
        h("div", { class: "block-label" }, "Deliverables"),
        week.deliverables.map((t, i) => check(`${week.id}.d${i}`, t)),
        h("div", { class: "block-label" }, "Can I explain…"),
        week.explain.map((t, i) => check(`${week.id}.x${i}`, t)),
        week.quiz ? quizBlock(ctx, phase, entry) : null,
        week.ai ? [h("div", { class: "block-label" }, "AI assist"), h("p", { class: "ai-hint" }, AI_HINT), promptList(ctx, week.ai)] : null,
        week.project
          ? h("div", { class: "project" },
              h("div", { class: "block-label" }, `Checkpoint project ${week.project.code}`),
              h("h3", null, week.project.name),
              h("p", null, week.project.desc),
              week.project.items.map((t, i) => check(`${week.id}.p${i}`, t)))
          : null,
        week.deck && ctx.deckMap.has(week.deck)
          ? h("a", { class: "btn cards-link", href: href(def.id, "cards", week.deck) }, `Open week ${n} learning cards`)
          : null));
    counters.push({ ids, el: status, kind: "week", details });
    return details;
  };

  const phases = bp.phases.map((phase) => {
    const first = phase.weeks[0].n, last = phase.weeks[phase.weeks.length - 1].n;
    const phaseCount = h("span", { class: "counter" });
    counters.push({ ids: phase.ids, el: phaseCount, kind: "phase", range: `Weeks ${first}–${last}` });
    return h("section", { class: "phase", "aria-label": phase.label },
      h("div", { class: "phase-head" }, h("h2", null, phase.label), phaseCount),
      h("p", { class: "phase-goal" }, phase.goal),
      phase.weeks.map((entry) => weekEl(phase, entry)));
  });

  const sync = h("div", { class: "sync" }, ctx.storageOk ? "Saved on this device." : "Your browser is blocking storage, so ticks won't be saved. Export before you leave.");

  const refresh = () => {
    for (const c of counters) {
      const total = c.ids.length, n = c.ids.filter((id) => done.has(id)).length;
      if (c.kind === "week") {
        c.el.textContent = total && n === total ? "Done" : `${n}/${total}`;
        c.details.classList.toggle("done", total > 0 && n === total);
      } else {
        c.el.textContent = `${c.range} · ${n}/${total}`;
      }
    }
  };

  const view = h("section", null,
    h("div", { class: "intro" },
      h("p", { class: "eyebrow" }, def.name),
      h("h1", { tabindex: "-1" }, def.heading.replace("{weeks}", counted)),
      def.intro.map((p) => h("p", null, rich(p))),
      def.note ? h("div", { class: "note" }, h("b", null, def.note.title), def.note.body.map((p) => h("p", null, rich(p)))) : null,
      sync,
      h("div", { class: "legend" },
        h("span", { class: "pill quiz" }, "Self-quiz"),
        h("span", { class: "pill proj" }, "Checkpoint project"),
        optionalCount ? h("span", { class: "pill opt" }, "Optional") : null)),
    h("div", { class: "track" }, h("b", null, "Parallel track"), h("p", null, def.track)),
    phases,
    renderProgressTools(ctx));

  view.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.id;
    if (!id) return;
    if (e.target.checked) done.add(id); else done.delete(id);
    const saved = ctx.setDone(def.id, done);
    sync.textContent = saved ? "Saved on this device." : "Couldn't save: your browser is blocking storage. Export before you leave.";
    refresh();
    ctx.updateHeader();
  });

  refresh();
  return view;
}

function quizBlock(ctx, phase, entry) {
  const weeks = quizRange(phase, entry);
  const a = weeks[0].n, b = entry.n;
  const topics = weeks.map((w) => w.week.title).join(", ");
  const explains = weeks.flatMap((w) => w.week.explain.map(plain));
  const prompt = `Quiz me on these topics, one question at a time: ${topics}. Include these: ${explains.join("; ")}. Don't give me the answer until I've tried, then tell me what I missed.`;
  return [
    h("div", { class: "block-label" }, "Checkpoint"),
    h("p", { class: "quiz-note" }, `Self-quiz on weeks ${a}–${b} before moving on: answer every “Can I explain…” check out loud with no notes, then have a study partner or an AI tutor quiz you.`),
    promptList(ctx, [prompt]),
  ];
}
