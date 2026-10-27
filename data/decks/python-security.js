// Learning card deck. See README "Adding a learning card deck" for the block types.
// {week} is replaced with the week number of the linked week in the current pathway.

export default {
  id: "python-security",
  title: "Python for security work",
  intro: "The four Python building blocks behind most security scripts, and the habits that keep your scripts safe to share.",
  cards: [
    {
      theme: "green",
      eyebrow: "Week {week} · Python for security work",
      eyebrowSpaced: true,
      heading: "Scripts turn curiosity into ==evidence.==",
      xl: true,
      blocks: [{ type: "p", text: "You don't need to be a developer to write useful security scripts. You need four building blocks and good habits." }],
      net: true,
      foot: { mono: "Week {week}", swipe: true },
    },
    {
      theme: "paper",
      heading: "Four building blocks.",
      blocks: [
        { type: "p", text: "Almost every script in this plan is these four things, combined." },
        {
          type: "boxes",
          items: [
            ["Lists & dicts", "hold the **URLs** and the **results**"],
            ["Loops", "run the same **check** on every URL"],
            ["Functions", "give a check a **name** so you can reuse it"],
            ["requests", "speaks **HTTP** from your code"],
          ],
        },
      ],
      foot: { text: "Small pieces. **Big reach.**" },
    },
    {
      theme: "black",
      heading: "A header check in ==seven lines.==",
      blocks: [
        {
          type: "code",
          label: "Illustrative example",
          lines: [
            [{ k: "import" }, " requests"],
            [],
            ["url = ", { m: "\"https://example.org\"" }],
            ["r = requests.get(url, timeout=10)"],
            [{ k: "for" }, " name ", { k: "in" }, " [", { m: "\"Content-Security-Policy\"" }, ","],
            ["             ", { m: "\"Strict-Transport-Security\"" }, "]:"],
            ["    ", { k: "if" }, " name ", { k: "not in" }, " r.headers:"],
            ["        print(", { m: "\"missing:\"" }, ", name)"],
          ],
        },
        { type: "p", small: true, text: "**requests.get** fetches the page. **r.headers** works like a dict. The loop checks each header by name." },
      ],
      foot: { text: "Read it out loud. ==It's nearly English.==" },
    },
    {
      theme: "paper",
      eyebrow: "The surprise",
      heading: "Missing header {{≠}} vulnerability",
      blocks: [
        { type: "p", text: "A missing header is a **missing layer of defence**, not proof of a bug. Report it with what it would have stopped." },
        {
          type: "table",
          label: "What each header defends",
          two: true,
          rows: [
            { muted: true, cells: ["header", "helps stop"] },
            [{ m: "CSP" }, "damage from XSS"],
            [{ m: "HSTS" }, "HTTPS downgrades"],
            [{ m: "nosniff" }, "MIME-type confusion"],
            [{ m: "X-Frame-Options" }, { k: "clickjacking" }],
          ],
        },
      ],
      foot: { text: "Context turns a finding **into a fix.**" },
    },
    {
      theme: "green",
      heading: "Habits that keep scripts ==safe.==",
      blocks: [
        {
          type: "list",
          items: [
            ["01", "Always set a **timeout**."],
            ["02", "One **virtual environment** per project."],
            ["03", "Read tokens from **environment variables**, never the code."],
            ["04", "Only scan sites you **own or may test**."],
          ],
        },
        { type: "callout", title: "Your script is a client too", text: "Anything a browser can send, Python can send. That's why servers must check every request." },
      ],
    },
    {
      theme: "paper",
      eyebrow: "Before you push to GitHub, ask",
      heading: "Would I be happy if this were public?",
      blocks: [
        {
          type: "boxes",
          items: [
            ["Secrets", "any **tokens** or passwords in the code?"],
            ["Data", "any **real results** about sites you don't own?"],
            ["README", "does it say **how to run it**?"],
          ],
        },
        { type: "next", label: "Coming up next", title: "Sessions, passwords and tokens" },
      ],
    },
  ],
};
