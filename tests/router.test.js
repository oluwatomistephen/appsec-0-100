import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRoute, href } from "../js/router.js";

const known = { pathways: new Set(["beginner", "it-support"]), decks: new Set(["web-basics"]), walkthroughs: new Set(["burp-intercept"]) };

test("parses toolkit routes", () => {
  assert.deepEqual(parseRoute("#beginner/toolkit/burp-intercept", known), { name: "pathway", pathway: "beginner", view: "toolkit", item: "burp-intercept" });
  assert.equal(parseRoute("#beginner/toolkit/web-basics", known).item, null);
  assert.equal(parseRoute("#beginner/cards/burp-intercept", known).item, null);
});

test("parses the brief's example URLs", () => {
  assert.deepEqual(parseRoute("#it-support/plan", known), { name: "pathway", pathway: "it-support", view: "plan", item: null });
  assert.deepEqual(parseRoute("#beginner/cards", known), { name: "pathway", pathway: "beginner", view: "cards", item: null });
  assert.deepEqual(parseRoute("#beginner/cards/web-basics", known), { name: "pathway", pathway: "beginner", view: "cards", item: "web-basics" });
});

test("defaults to the plan view", () => {
  assert.equal(parseRoute("#it-support", known).view, "plan");
});

test("anything unknown falls back safely", () => {
  for (const hash of ["", "#", "#nope/plan", "#it-support/admin", "#__proto__", "#constructor/plan", "#a/b/c/d", "#javascript:alert(1)"]) {
    assert.deepEqual(parseRoute(hash, known), { name: "landing" }, hash);
  }
  assert.equal(parseRoute("#it-support/cards/<script>", known).item, null);
  assert.equal(parseRoute("#it-support/plan/web-basics", known).item, null);
});

test("href builds routes parseRoute accepts", () => {
  assert.equal(href("beginner", "cards", "web-basics"), "#beginner/cards/web-basics");
  assert.deepEqual(parseRoute(href("it-support"), known).view, "plan");
});
