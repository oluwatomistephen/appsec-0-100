# AppSec 0→100

A free, static website that helps people become Application Security (AppSec) engineers from four different starting points. Pick a pathway, then work through a week-by-week plan of things to learn, deliverables to tick off, “Can I explain…” self-checks, self-quizzes, AI-assistant prompts and checkpoint projects. Progress is saved in your own browser.

No accounts, no backend, no analytics, nothing loaded from third parties.

## Contents

- [Pathways](#pathways)
- [Run it locally](#run-it-locally)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [How this site is secured](#how-this-site-is-secured)
- [Credits](#credits)
- [Licence](#licence)

## Pathways

| Pathway | Length | Hours a week | Starts from |
|---|---|---|---|
| Complete beginner | 37 weeks, plus an optional Security+ week | 12–15 | No tech background. Twelve weeks of tool-first foundations, then the IT support plan |
| IT support / sysadmin | 25 weeks | 15–20 | Identity, cloud admin and networking experience |
| Software developer | 17 weeks | 10–15 | Writes code for a living; projects are about securing their own code |
| SOC analyst / pentester | 19 weeks | 12–18 | Knows attacks; the plan spends its time on code, review and fixes |

Every pathway includes checkpoint projects P1–P4 at its own level, and a week on AI-assisted AppSec and securing LLM apps.

## Run it locally

ES modules don't load from `file://`, so the site needs a local server. There are no dependencies to install.

```bash
npm run serve
```

Then open http://localhost:8080. The server in `scripts/serve.mjs` uses only Node's standard library, serves only files inside the project and only known file types.

```bash
npm test
```

runs the unit and content tests with Node's built-in test runner. `node scripts/content-review.mjs > content-review.md` writes every pathway to one Markdown file for reviewing content.

## Project structure

```
index.html                 the only page: shell, CSP and links to CSS/JS
css/                       tokens (colours, fonts, themes), app, cards, walkthroughs
fonts/                     self-hosted Space Grotesk and JetBrains Mono, with OFL licences
js/
  main.js                  routing, header, theme, progress state
  dom.js                   the DOM builder: the only way the app creates elements
  catalog.js               turns a pathway into numbered weeks and progress IDs
  router.js                hash routes with an allow-list
  storage.js               localStorage, one key per pathway
  progress-io.js           export and validated import of progress files
  views/                   landing, plan, cards, toolkit, and the renderers they use
data/
  weeks/                   week content: core (IT support), foundations, developer, soc
  pathways/                which weeks each pathway uses, and in what order
  projects.js              checkpoint projects P0–P4 and their per-pathway variants
  decks/                   learning card decks, one file each
  walkthroughs/            tool walkthroughs, one file each
tests/                     node --test suites, plus Semgrep rule fixtures
.semgrep/                  project Semgrep rules
.github/                   CI, deploy and Dependabot
```

Curriculum content lives only in `data/`. Rendering code lives only in `js/`.

## Editing content

### Weeks and pathways

A week is an object in `data/weeks/*.js`:

```js
export const xss = {
  id: "xss",                 // stable: progress is stored against it, so never rename it
  title: "Cross-site scripting",
  learn: ["…"],
  deliverables: ["…"],       // checkboxes
  explain: ["…"],            // "Can I explain…" checkboxes
  quiz: true,                // optional: adds a self-quiz checkpoint
  project: P2,               // optional: a checkpoint project from data/projects.js
  deck: "web-basics",        // optional: links a learning card deck
  walkthroughs: ["…"],       // optional: links tool walkthroughs
  ai: ["…"],                 // AI-assist prompts, shown with a copy button
  optional: true,            // optional: shown, but not counted in totals
};
```

Text supports a tiny inline markup that is turned into elements, never parsed as HTML: `**bold**` and `` `code` ``.

Pathways in `data/pathways/` list their phases and the week objects in each. Shared weeks are the same imported object, so content is never duplicated, and week numbers are worked out per pathway when the page renders. Don't write week numbers into shared content: the tests reject it.

Progress item IDs are `<week id>.d<n>`, `.x<n>` and `.p<n>` for deliverables, explain checks and project items. Adding items to the end of a list is safe. Reordering or removing items moves people's ticks, so do it sparingly.

### Adding a learning card deck

1. Copy `data/decks/web-basics.js` to `data/decks/<your-id>.js` and change the `id`, `title`, `intro` and `cards`.
2. Import it in `data/decks/index.js` and add it to the `decks` list.
3. Set `deck: "<your-id>"` on the week it belongs to.

Each card has a `theme` (`green`, `paper` or `black`), an optional `eyebrow`, a `heading`, a list of `blocks`, and an optional `foot`. Block types:

| Type | Fields |
|---|---|
| `p` | `text`, optional `small` or `spaced` |
| `code` | `label`, `lines` (each line is a list of strings, `{ k }` for highlighted or `{ m }` for muted) |
| `table` | `label`, `rows`, optional `two` for two columns; a row can be `{ muted: true, cells }` |
| `cols` | `cols: [{ title, tags }]`; a tag can be `{ text, on: true }` |
| `list` | `items: [[code, text]]`, optional `wide` for labels longer than a few characters |
| `callout` | `title`, `text` |
| `boxes` | `items: [[label, text]]` |
| `next` | `label`, `title` |

Card text also supports `==highlight==` and `{{≠}}` (a badge). `{week}` is replaced with the week's number in the current pathway.

### Adding a walkthrough

1. Copy `data/walkthroughs/github-repo.js` to `data/walkthroughs/<your-id>.js`.
2. Import it in `data/walkthroughs/index.js`.
3. Add its id to `walkthroughs: [...]` on every week that uses the tool.

Each step has a `title`, `text` (a list of paragraphs), and optionally a `screen`, a `legend` and an AI `prompt`. A screen is either:

- **an illustration**: `frame` (`browser`, `app` or `terminal`), `url` or `title`, `dark`, `alt`, and a `body` built from parts: `tabs`, `toolbar`, `buttons`, `split`, `pane`, `code`, `table`, `form`, `text`, `heading`, `term`, `chat`, `side`, `banner` and `list`. Add `mark: 1` to any part or item to put a numbered marker on it.
- **a real screenshot**: `image` (a path under `img/`), `alt`, `width`, `height` and `marks: [{ n, x, y }]` with x and y as percentages. Never use a screenshot of a logged-in page.

The `legend` explains each marker in order, and the tests check that every marker has exactly one legend entry and every screen has alt text.

## How this site is secured

This is a learning site for AppSec engineers, so it should practise what it teaches. Each control below says what it does, why, and where to find it.

**A strict Content Security Policy.** `index.html` sets `default-src 'self'` with `script-src 'self'`, `style-src 'self'`, `object-src 'none'`, `base-uri 'none'` and `form-action 'none'`, and no `unsafe-inline` or `unsafe-eval`. There are no inline scripts, inline styles or inline event handlers anywhere: the theme is applied before first paint by a separate file, `js/theme-init.js`, rather than an inline script. If an attacker ever got markup into the page, the browser would refuse to run it.

**Trusted Types.** The CSP also sets `require-trusted-types-for 'script'` with `trusted-types 'none'`. In browsers that support it (Chromium-based browsers at the time of writing), assigning a string to `innerHTML` or any other HTML sink throws an error. With no policies allowed, there is no way to opt back in.

**No HTML from strings, ever.** All DOM is built by `h()` in `js/dom.js`, which creates elements and puts text into text nodes. Content markup like `**bold**` is converted into `<b>` elements by a small tokenizer, never by parsing HTML. `h()` refuses `style` attributes, non-function `on*` handlers and `href` values that aren't fragments, relative paths or `https:`.

**Imported files are treated as hostile.** Progress import (`js/progress-io.js`) caps the file at 256 KB, parses it inside a `try`, requires the expected `app` and `version` fields and only plain objects, ignores unknown pathway names (including `__proto__`), and keeps only strings that match the item ID pattern and exist in that pathway. Results are stored in `Map`s and `Set`s, never merged into objects. The user sees a summary and chooses merge or replace before anything changes. `tests/progress-io.test.js` covers malformed, oversized and hostile files.

**Allow-listed routing.** Every part of the URL hash is checked against the known pathways, views, decks and walkthroughs (`js/router.js`). Anything else falls back to the landing page, and URL contents are never rendered.

**Nothing from third parties.** No CDNs, analytics, trackers or remote fonts. The fonts are self-hosted. A Semgrep rule fails the build if an HTML file loads a script, stylesheet, image or frame from another origin. `<meta name="referrer" content="no-referrer">` means outbound links don't leak which page someone was on.

**Semgrep in CI, with project rules.** `.semgrep/` holds rules that ban HTML string sinks, string evaluation, inline style and handler attributes, and inline or third-party resources in HTML. CI first runs `semgrep --test` against fixtures in `tests/semgrep/`, proving each rule catches what it should and ignores safe code, then scans the project with these rules and Semgrep's JavaScript ruleset.

**Secrets scanning.** gitleaks scans the full Git history on every pull request and push. CI downloads a pinned gitleaks release and checks it against the SHA-256 published with that release before running it.

**HTML and link checks.** html-validate checks the page's markup, and lychee checks every link in the HTML and docs, including in-page anchors.

**A hardened pipeline.** Every action is pinned to a full commit SHA, so a moved tag can't change what runs. Dependabot opens weekly pull requests to update them. The default token is read-only, checkout doesn't persist credentials, and only the deploy job gets Pages write and OIDC permissions. The site deploys only from `main` and only after every check passes, and only the files the site serves are published.

**Minimal data, kept local.** The only data stored is which boxes are ticked and the theme choice, in `localStorage`. It never leaves the browser unless the user exports it. Stored values are validated on load like any other input.

**Known limits.** These are worth being honest about:

- GitHub Pages can't set response headers, and a CSP in a `<meta>` tag can't set `frame-ancestors`, so the site can be framed by another site. The impact is low: there are no accounts or sensitive actions, and the worst case is tricking someone into ticking a box.
- For the same reason there's no CSP reporting. Violations show only in the browser console.
- Trusted Types aren't enforced in every browser yet. Elsewhere, the CSP and the Semgrep rules still apply.
- Anyone with access to the device can read or change the progress in `localStorage`.

See [SECURITY.md](SECURITY.md) to report a vulnerability.

## Credits

- [Space Grotesk](https://github.com/floriankarsten/space-grotesk) and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), both under the SIL Open Font License 1.1. Licences are in `fonts/`.
- The plans point to free resources including [PortSwigger Web Security Academy](https://portswigger.net/web-security), [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) and [OWASP crAPI](https://owasp.org/www-project-crapi/).

## Licence

- **Code** (everything outside `data/` and `fonts/`) is under the [MIT License](LICENSE).
- **Curriculum content** in `data/` (the pathways, weeks, projects, learning card decks and walkthroughs) is under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You can share and adapt it, including commercially, as long as you credit “AppSec 0→100” and link to this repository.
- **Fonts** in `fonts/` keep their own SIL Open Font License 1.1.

The tools, labs and courses the plans name belong to their owners and have their own terms.
