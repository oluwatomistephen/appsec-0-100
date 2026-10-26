// Writes every pathway's week-by-week content to one Markdown file for review:
// `node scripts/content-review.mjs > content-review.md`

import { pathways } from "../data/pathways/index.js";
import { buildPathway, pad } from "../js/catalog.js";

const out = [];
const md = (s) => String(s).replace(/==/g, "");
const shared = new Map();
for (const def of pathways) for (const ph of def.phases) for (const w of ph.weeks) shared.set(w.id, (shared.get(w.id) || 0) + 1);

out.push("# AppSec 0→100: pathway content for review", "");
for (const def of pathways) {
  const bp = buildPathway(def);
  const counted = bp.weeks.filter((w) => !w.week.optional).length;
  out.push(`## ${def.name} (${counted} weeks, ${def.hours} h/week)`, "");
  out.push(`**For:** ${def.who}`, "", `**Heading:** ${def.heading.replace("{weeks}", counted)}`, "");
  for (const p of def.intro) out.push(md(p), "");
  if (def.note) out.push(`> **${def.note.title}**`, ...def.note.body.flatMap((p) => [`> ${md(p)}`, ">"]), "");
  out.push(`**Parallel track:** ${def.track}`, "");
  for (const phase of bp.phases) {
    out.push(`### ${phase.label}`, "", `*${phase.goal}*`, "");
    for (const { week, n } of phase.weeks) {
      const tags = [week.optional && "optional", week.quiz && "self-quiz", week.project && week.project.code, week.deck && `deck: ${week.deck}`,
        shared.get(week.id) > 1 && "shared with another pathway"].filter(Boolean);
      out.push(`#### W${pad(n)} ${week.title}${tags.length ? ` _(${tags.join(", ")})_` : ""}`, "");
      out.push("**Learn**", ...week.learn.map((l) => `- ${md(l)}`), "");
      out.push("**Deliverables**", ...week.deliverables.map((d) => `- [ ] ${md(d)}`), "");
      out.push("**Can I explain…**", ...week.explain.map((x) => `- [ ] ${md(x)}`), "");
      if (week.ai) out.push("**AI assist**", ...week.ai.map((a) => `- “${md(a)}”`), "");
      if (week.project) {
        out.push(`**Checkpoint project ${week.project.code}: ${week.project.name}**`, "", week.project.desc, "", ...week.project.items.map((i) => `- [ ] ${md(i)}`), "");
      }
    }
  }
}
process.stdout.write(out.join("\n"));
