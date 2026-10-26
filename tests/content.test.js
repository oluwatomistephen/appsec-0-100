// Content rules from the brief, checked on every pull request.

import { test } from "node:test";
import assert from "node:assert/strict";
import { pathways } from "../data/pathways/index.js";
import { decks } from "../data/decks/index.js";
import { buildPathway } from "../js/catalog.js";
import { ID_PATTERN } from "../js/storage.js";

const built = pathways.map(buildPathway);
const deckIds = new Set(decks.map((d) => d.id));

function allText(week) {
  return [
    week.title, ...week.learn, ...week.deliverables, ...week.explain, ...(week.ai || []),
    ...(week.project ? [week.project.name, week.project.desc, ...week.project.items] : []),
  ];
}

test("there are four pathways with unique ids", () => {
  assert.equal(pathways.length, 4);
  assert.equal(new Set(pathways.map((p) => p.id)).size, 4);
});

test("pathway lengths match the plan", () => {
  const counted = Object.fromEntries(built.map((bp) => [bp.def.id, bp.weeks.filter((w) => !w.week.optional).length]));
  assert.deepEqual(counted, { beginner: 37, "it-support": 25, developer: 17, "soc-pentester": 19 });
});

test("every week is complete", () => {
  for (const bp of built) {
    for (const { week } of bp.weeks) {
      const where = `${bp.def.id}/${week.id}`;
      assert.ok(week.title, `${where}: title`);
      assert.ok(week.learn.length > 0, `${where}: learn`);
      assert.ok(week.deliverables.length > 0, `${where}: deliverables`);
      assert.ok(week.explain.length > 0, `${where}: explain`);
      assert.ok(week.ai && week.ai.length >= 2, `${where}: AI prompts`);
      for (const s of allText(week)) assert.ok(typeof s === "string" && s.trim().length > 2, `${where}: empty text`);
    }
  }
});

test("no placeholder or author-specific wording", () => {
  const banned = /\b(TODO|TBD|lorem|ipsum|placeholder)\b|claude|tell me|with me\b|i give you|we['’]ll re-plan/i;
  for (const bp of built) {
    for (const { week } of bp.weeks) {
      for (const s of allText(week).filter((t) => !(week.ai || []).includes(t))) {
        assert.doesNotMatch(s, banned, `${bp.def.id}/${week.id}: "${s}"`);
      }
    }
    for (const s of [bp.def.heading, ...bp.def.intro, bp.def.track]) assert.doesNotMatch(s, banned, bp.def.id);
  }
});

test("week numbers aren't hard-coded in shared content", () => {
  for (const bp of built) {
    for (const { week } of bp.weeks) {
      for (const s of allText(week)) assert.doesNotMatch(s, /\bweek \d+/i, `${bp.def.id}/${week.id}: "${s}"`);
    }
  }
});

test("every pathway has checkpoint projects P1 to P4, in order", () => {
  for (const bp of built) {
    const codes = bp.weeks.filter((w) => w.week.project).map((w) => w.week.project.code).filter((c) => c !== "P0");
    assert.deepEqual(codes, ["P1", "P2", "P3", "P4"], bp.def.id);
  }
});

test("the beginner pathway ends Phase 0 with P0 and states the honest timeline", () => {
  const bp = built.find((b) => b.def.id === "beginner");
  const phase0 = bp.phases[0].weeks.map((w) => w.week);
  assert.ok(phase0.some((w) => w.project && w.project.code === "P0"));
  assert.ok(phase0.some((w) => w.optional && /security\+/i.test(w.title)));
  const note = bp.def.note.body.join(" ");
  assert.match(note, /9–12 month/);
  assert.match(note, /help desk/i);
});

test("the developer pathway mentions the security champion route", () => {
  const bp = built.find((b) => b.def.id === "developer");
  assert.match(bp.def.note.body.join(" "), /security champion/i);
});

test("progress item ids are valid and unique within each pathway", () => {
  for (const bp of built) {
    const ids = bp.weeks.flatMap((w) => w.ids);
    assert.equal(new Set(ids).size, ids.length, bp.def.id);
    for (const id of ids) assert.match(id, ID_PATTERN, id);
  }
});

test("shared week ids always point at the same object", () => {
  const byId = new Map();
  for (const bp of built) {
    for (const { week } of bp.weeks) {
      if (byId.has(week.id)) assert.equal(byId.get(week.id), week, `two different weeks share the id "${week.id}"`);
      byId.set(week.id, week);
    }
  }
});

test("every deck a week links to exists, and every deck is well formed", () => {
  for (const bp of built) for (const { week } of bp.weeks) if (week.deck) assert.ok(deckIds.has(week.deck), `${week.id} -> ${week.deck}`);
  const types = new Set(["p", "code", "table", "cols", "list", "callout", "boxes", "next"]);
  for (const deck of decks) {
    assert.ok(deck.cards.length > 0, deck.id);
    for (const card of deck.cards) {
      assert.ok(["green", "paper", "black"].includes(card.theme), `${deck.id}: theme`);
      assert.ok(card.heading, `${deck.id}: heading`);
      for (const b of card.blocks) assert.ok(types.has(b.type), `${deck.id}: block type ${b.type}`);
    }
  }
});
