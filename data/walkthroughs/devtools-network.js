// Walkthrough. See README "Adding a walkthrough" for the format.

export default {
  id: "devtools-network",
  title: "The browser DevTools Network tab",
  tool: "Chrome, Edge or Firefox DevTools",
  time: "20 min",
  summary: "See every request a web page makes, with its method, status code, headers and cookies. It's the first place to look when you want to understand how a site works.",
  steps: [
    {
      title: "Open DevTools and record a page load",
      text: [
        "Open any site, then press **F12** (or Ctrl+Shift+I, or Cmd+Option+I on a Mac) and choose the **Network** tab. Reload the page: every request appears as a row.",
        "Tick **Preserve log** so the list isn't cleared when the page navigates, for example after you log in.",
      ],
      screen: {
        frame: "browser", url: "https://example.org/",
        alt: "Browser DevTools docked at the bottom with the Network tab selected, Preserve log ticked, and a list of requests with columns for name, status, type, size and time.",
        body: [
          { t: "tabs", items: ["Elements", "Console", "Sources", { label: "Network", on: true, mark: 1 }, "Application"] },
          { t: "toolbar", items: ["⏺", "⟲", { label: "Filter", input: true }, { label: "☑ Preserve log", mark: 2 }, "☐ Disable cache"] },
          { t: "table", cols: ["Name", "Status", "Type", "Size", "Time"], hl: 0, rows: [
            ["example.org", "200", "document", "1.3 kB", "84 ms"],
            ["styles.css", "200", "stylesheet", "4.1 kB", "21 ms"],
            ["app.js", "200", "script", "12 kB", "35 ms"],
            ["logo.svg", "304", "svg+xml", "0 B", "9 ms"],
          ], mark: 3 },
        ],
      },
      legend: ["The **Network** tab.", "**Preserve log** keeps requests across page loads and redirects.", "One row per request. The first is the page itself; the rest are what it loaded."],
    },
    {
      title: "Inspect one request",
      text: [
        "Click a row to open its details. **Headers** shows the request and response headers, **Payload** shows data the browser sent, and **Response** shows what came back.",
        "Look for the `Cookie` request header and `Set-Cookie` response headers: that's how sessions work. You'll recognise these in Burp later.",
      ],
      screen: {
        frame: "browser", url: "https://example.org/",
        alt: "DevTools with one request selected, showing the Headers tab with the request URL, method, status code and a list of response headers.",
        body: [
          { t: "tabs", items: [{ label: "Headers", on: true, mark: 1 }, "Payload", "Preview", "Response", "Cookies"] },
          { t: "pane", title: "General", body: [{ t: "code", lines: ["Request URL: https://example.org/", "Request Method: GET", "Status Code: ==200 OK==", "Referrer Policy: strict-origin-when-cross-origin"] }], mark: 2 },
          { t: "pane", title: "Response headers", body: [{ t: "code", lines: ["content-type: text/html; charset=UTF-8", "cache-control: max-age=600", "==set-cookie: session=…; Secure; HttpOnly==", "strict-transport-security: max-age=31536000"], hl: [2] }], mark: 3 },
        ],
      },
      legend: ["Switch between headers, sent data and the response body.", "The method and status code: the first things to check.", "Response headers, including cookies the server sets and security headers."],
      prompt: "Here are the response headers from a site I'm studying: [paste them, with cookie values replaced by XXX]. Which ones are security headers, and what does each protect against?",
    },
    {
      title: "Filter to what matters",
      text: [
        "Busy pages make hundreds of requests. Use the filter buttons (**Fetch/XHR**, **Doc**, **JS**) or type in the filter box. **Fetch/XHR** shows the API calls a page makes, which is where most interesting AppSec bugs live.",
      ],
    },
  ],
  doneWhen: "You can open DevTools, find the request for a page, and name its method, status code and three of its response headers.",
};
