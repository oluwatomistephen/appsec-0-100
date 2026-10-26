import { test } from "node:test";
import assert from "node:assert/strict";
import { buildExport, parseImport, applyImport, MAX_FILE_BYTES } from "../js/progress-io.js";

const valid = new Map([
  ["it-support", new Set(["http-basics.d0", "http-basics.x1", "owasp-sqli.p0"])],
  ["beginner", new Set(["toolkit.d0"])],
]);

const file = (pathways, extra = {}) => JSON.stringify({ app: "appsec-0-100", version: 1, pathways, ...extra });

test("export then import round-trips", () => {
  const progress = new Map([["it-support", new Set(["http-basics.d0", "owasp-sqli.p0"])], ["beginner", new Set()]]);
  const parsed = parseImport(JSON.stringify(buildExport(progress)), valid);
  assert.ok(parsed.ok);
  assert.deepEqual(parsed.pathways.get("it-support").ids, ["http-basics.d0", "owasp-sqli.p0"]);
  assert.equal(parsed.pathways.has("beginner"), false, "empty pathways are not exported");
});

test("rejects files that aren't progress exports", () => {
  for (const text of ["", "not json", "null", "[]", "42", '"x"', JSON.stringify({ app: "other", version: 1, pathways: {} })]) {
    assert.equal(parseImport(text, valid).ok, false, text);
  }
  assert.equal(parseImport(file({ "it-support": [] }, { version: 2 }), valid).ok, false);
  assert.equal(parseImport(file([]), valid).ok, false);
});

test("rejects oversized input", () => {
  const big = file({ "it-support": [] }) + " ".repeat(MAX_FILE_BYTES);
  assert.equal(parseImport(big, valid).ok, false);
});

test("drops unknown, malformed and hostile ids", () => {
  const parsed = parseImport(file({
    "it-support": ["http-basics.d0", "http-basics.d0", "made-up.d0", "<img src=x onerror=alert(1)>", 7, null, { id: 1 }, "a".repeat(500)],
  }), valid);
  assert.ok(parsed.ok);
  assert.deepEqual(parsed.pathways.get("it-support").ids, ["http-basics.d0"]);
  assert.equal(parsed.pathways.get("it-support").ignored, 6);
});

test("ignores unknown pathways and prototype keys", () => {
  const text = '{"app":"appsec-0-100","version":1,"pathways":{"__proto__":["x.d0"],"constructor":["x.d0"],"nope":["x.d0"],"beginner":["toolkit.d0"]}}';
  const parsed = parseImport(text, valid);
  assert.ok(parsed.ok);
  assert.deepEqual([...parsed.pathways.keys()], ["beginner"]);
  assert.equal({}.polluted, undefined);
});

test("a pathway entry that isn't a list fails the whole import", () => {
  assert.equal(parseImport(file({ "it-support": "http-basics.d0" }), valid).ok, false);
});

test("merge keeps existing ticks; replace doesn't", () => {
  const current = new Set(["a.d0", "b.d0"]);
  assert.deepEqual([...applyImport(current, ["c.d0"], "merge")].sort(), ["a.d0", "b.d0", "c.d0"]);
  assert.deepEqual([...applyImport(current, ["c.d0"], "replace")], ["c.d0"]);
});
