import { h } from "../dom.js";
import { buildExport, parseImport, applyImport, MAX_FILE_BYTES } from "../progress-io.js";

function openDialog(...content) {
  const dialog = h("dialog", { "aria-labelledby": "dlg-title" }, content);
  dialog.addEventListener("close", () => dialog.remove());
  document.body.append(dialog);
  dialog.showModal();
  return dialog;
}

function showError(message) {
  const dialog = openDialog(
    h("h2", { id: "dlg-title" }, "Couldn't import that file"),
    h("p", { role: "alert" }, message),
    h("div", { class: "btn-row" }, h("button", { class: "btn primary", type: "button", onclick: () => dialog.close() }, "OK")));
}

function confirmImport(ctx, parsed) {
  const names = new Map(ctx.pathways.map((p) => [p.def.id, p.def.name]));
  const apply = (mode) => {
    for (const [id, { ids }] of parsed.pathways) ctx.setDone(id, applyImport(ctx.getDone(id), ids, mode));
    dialog.close();
    ctx.toast(mode === "replace" ? "Progress replaced from file." : "Progress merged from file.");
    ctx.rerender();
  };
  const dialog = openDialog(
    h("h2", { id: "dlg-title" }, "Import progress"),
    h("p", null, "This file has progress for:"),
    h("ul", null, [...parsed.pathways].map(([id, { ids, ignored }]) =>
      h("li", null, `${names.get(id)}: ${ids.length} ticked`, ignored ? ` (${ignored} unknown items ignored)` : ""))),
    h("p", null, "Merge keeps everything you've ticked here and adds the file's ticks. Replace makes these pathways match the file exactly. Other pathways aren't touched."),
    h("div", { class: "btn-row" },
      h("button", { class: "btn primary", type: "button", onclick: () => apply("merge") }, "Merge"),
      h("button", { class: "btn", type: "button", onclick: () => apply("replace") }, "Replace"),
      h("button", { class: "btn", type: "button", onclick: () => dialog.close() }, "Cancel")));
}

function exportProgress(ctx) {
  const all = new Map(ctx.pathways.map((p) => [p.def.id, ctx.getDone(p.def.id)]));
  const blob = new Blob([JSON.stringify(buildExport(all), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = h("a", { download: `appsec-0-100-progress-${new Date().toISOString().slice(0, 10)}.json` });
  a.href = url; // blob: URLs are created here, never taken from data
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  ctx.toast("Progress file downloaded.");
}

export function renderProgressTools(ctx) {
  const input = h("input", { type: "file", accept: "application/json,.json", class: "visually-hidden", tabindex: "-1", "aria-hidden": "true" });
  input.addEventListener("change", async () => {
    const file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) return showError("The file is too large to be a progress file.");
    let text;
    try {
      text = await file.text();
    } catch {
      return showError("The file couldn't be read.");
    }
    const parsed = parseImport(text, new Map(ctx.pathways.map((p) => [p.def.id, p.validIds])));
    if (!parsed.ok) return showError(parsed.error);
    confirmImport(ctx, parsed);
  });

  return h("section", { class: "progress-tools", "aria-labelledby": "pt-title" },
    h("h2", { id: "pt-title" }, "Move your progress"),
    h("p", null, "Progress is saved in this browser only. Export it to a file to back it up or carry it to another device, then import it there. All four pathways go in one file."),
    h("div", { class: "btn-row" },
      h("button", { class: "btn", type: "button", onclick: () => exportProgress(ctx) }, "Export progress"),
      h("button", { class: "btn", type: "button", onclick: () => input.click() }, "Import progress"),
      input));
}
