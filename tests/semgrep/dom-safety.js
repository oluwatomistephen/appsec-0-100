// Fixture for `semgrep --test`: lines marked ruleid must match, ok must not.

const el = document.createElement("div");
const data = location.hash;

// ruleid: no-html-string-sinks
el.innerHTML = data;
// ruleid: no-html-string-sinks
el.outerHTML = data;
// ruleid: no-html-string-sinks
el.insertAdjacentHTML("beforeend", data);
// ruleid: no-html-string-sinks
document.write(data);
// ruleid: no-html-string-sinks
new DOMParser().parseFromString(data, "text/html");
// ok: no-html-string-sinks
el.textContent = data;
// ok: no-html-string-sinks
el.append(document.createTextNode(data));

// ruleid: no-string-evaluation
eval(data);
// ruleid: no-string-evaluation
new Function(data);
// ruleid: no-string-evaluation
setTimeout("doThing()", 10);
// ok: no-string-evaluation
setTimeout(() => el.remove(), 10);

// ruleid: no-inline-style-attribute
el.setAttribute("style", "color: red");
// ok: no-inline-style-attribute
el.style.width = "50%";

// ruleid: no-inline-event-handler-attribute
el.setAttribute("onclick", data);
// ok: no-inline-event-handler-attribute
el.setAttribute("aria-label", data);
// ok: no-inline-event-handler-attribute
el.addEventListener("click", () => {});
