import { test } from "node:test";
import assert from "node:assert/strict";
import { pathways } from "../data/pathways/index.js";
import { walkthroughs } from "../data/walkthroughs/index.js";
import { buildPathway } from "../js/catalog.js";

const ids = new Set(walkthroughs.map((w) => w.id));

/** Collect every marker number used in an illustration's parts. */
function markers(value, found = new Set()) {
  if (Array.isArray(value)) value.forEach((v) => markers(v, found));
  else if (value && typeof value === "object") {
    if (Number.isInteger(value.mark)) found.add(value.mark);
    Object.values(value).forEach((v) => markers(v, found));
  }
  return found;
}

test("walkthrough ids are unique", () => {
  assert.equal(ids.size, walkthroughs.length);
});

test("every walkthrough a week links to exists", () => {
  for (const def of pathways) {
    for (const { week } of buildPathway(def).weeks) {
      for (const id of week.walkthroughs || []) assert.ok(ids.has(id), `${def.id}/${week.id} -> ${id}`);
    }
  }
});

test("every walkthrough is used by at least one week", () => {
  const used = new Set(pathways.flatMap((def) => buildPathway(def).weeks.flatMap(({ week }) => week.walkthroughs || [])));
  for (const id of ids) assert.ok(used.has(id), `${id} isn't linked from any week`);
});

test("walkthroughs are complete and screens are described", () => {
  for (const w of walkthroughs) {
    for (const key of ["title", "tool", "time", "summary", "doneWhen"]) assert.ok(w[key], `${w.id}: ${key}`);
    assert.ok(w.steps.length > 0, `${w.id}: steps`);
    for (const [i, step] of w.steps.entries()) {
      const where = `${w.id} step ${i + 1}`;
      assert.ok(step.title, `${where}: title`);
      assert.ok(Array.isArray(step.text) && step.text.length > 0, `${where}: text`);
      if (!step.screen) continue;
      assert.ok(step.screen.alt && step.screen.alt.length > 20, `${where}: screen needs alt text`);
      const used = [...(step.screen.image ? (step.screen.marks || []).map((m) => m.n) : markers(step.screen.body))].sort();
      const expected = (step.legend || []).map((_, j) => j + 1);
      assert.deepEqual(used, expected, `${where}: markers and legend entries must match`);
    }
  }
});
