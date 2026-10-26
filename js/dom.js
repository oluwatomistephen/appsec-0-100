// The only way this app creates DOM. Text always goes in through text nodes,
// never through HTML parsing, so nothing in the data (or an imported file)
// can become markup. The CSP's Trusted Types rule backs this up in the browser.

const SVG_NS = "http://www.w3.org/2000/svg";

function setProps(el, props) {
  for (const [key, value] of Object.entries(props || {})) {
    if (value == null || value === false) continue;
    if (key === "class") el.setAttribute("class", value);
    else if (key === "dataset") Object.assign(el.dataset, value);
    else if (key.startsWith("on")) {
      if (typeof value !== "function") throw new TypeError(`${key} must be a function`);
      el.addEventListener(key.slice(2), value);
    } else if (key === "style") {
      throw new TypeError("Inline styles are blocked by the CSP: use a class");
    } else if (key === "href" && !isSafeHref(value)) {
      throw new TypeError(`Refusing unsafe href: ${value}`);
    } else el.setAttribute(key, value === true ? "" : String(value));
  }
}

function isSafeHref(value) {
  const v = String(value);
  return v.startsWith("#") || v.startsWith("https://") || /^[a-z0-9][\w./-]*$/i.test(v);
}

function append(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : String(child));
  }
}

/** Create an HTML element: h("p", { class: "x" }, "text", otherNode) */
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  setProps(el, props);
  append(el, children);
  return el;
}

/** Create an SVG element. */
export function s(tag, props, ...children) {
  const el = document.createElementNS(SVG_NS, tag);
  setProps(el, props);
  append(el, children);
  return el;
}

/** Replace all children of el. */
export function mount(el, ...children) {
  el.replaceChildren();
  append(el, children);
  return el;
}

const TOKEN = /(\*\*[^*]+\*\*|==[^=]+==|`[^`]+`|\{\{[^}]+\}\})/;

/**
 * Tiny inline markup for content strings, turned into elements (never HTML):
 *   **bold**  ==highlight==  `code`  {{≠}} (badge)
 * `vars` fills {name} placeholders, e.g. {week}.
 */
export function rich(text, vars = {}) {
  const filled = String(text).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  return filled.split(TOKEN).filter(Boolean).map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) return h("b", null, part.slice(2, -2));
    if (part.startsWith("==") && part.endsWith("==")) return h("span", { class: "hl" }, part.slice(2, -2));
    if (part.startsWith("`") && part.endsWith("`")) return h("code", null, part.slice(1, -1));
    if (part.startsWith("{{") && part.endsWith("}}")) return h("span", { class: "c-neq" }, part.slice(2, -2));
    return part;
  });
}

/** Plain text with markup stripped, for copying and aria labels. */
export function plain(text) {
  return String(text).replace(/\*\*|==|`|\{\{|\}\}/g, "");
}
