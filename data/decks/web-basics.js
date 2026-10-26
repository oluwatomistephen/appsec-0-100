// Learning card deck. See README "Adding a learning card deck" for the block types.
// {week} is replaced with the week number of the linked week in the current pathway.

export default {
  id: "web-basics",
  title: "How the web works",
  intro: "Swipe or use the arrow buttons. Open the next deck when you reach its week.",
  cards: [
    {
      theme: "green",
      eyebrow: "Week {week} · Web fundamentals",
      eyebrowSpaced: true,
      heading: "Every attack starts with a ==request.==",
      xl: true,
      blocks: [{ type: "p", text: "Before you can break a web app, you need to read HTTP like a sentence. Here’s how." }],
      net: true,
      foot: { mono: "Week {week}", swipe: true },
    },
    {
      theme: "paper",
      heading: "Anatomy of a request.",
      blocks: [
        { type: "p", text: "Every line below can be changed by the **user**. The browser just fills in defaults." },
        {
          type: "code",
          label: "Illustrative example",
          lines: [
            [{ k: "POST" }, " /transfer?from=42 ", { m: "HTTP/1.1" }],
            ["Host: bank.example"],
            [{ k: "Cookie:" }, " session=a1b2c3"],
            ["Content-Type: application/x-www-form-urlencoded"],
            [],
            [{ k: "amount=100&to=99" }],
          ],
        },
        { type: "p", small: true, text: "**Line 1** says what and where. **Headers** carry metadata, including your session. The **body** carries your data." },
      ],
      foot: { text: "Assume **every byte** can be changed." },
    },
    {
      theme: "black",
      heading: "Request in. ==Response== out.",
      blocks: [
        {
          type: "cols",
          cols: [
            { title: "REQUEST", tags: ["Method", "Path + query", "Headers", "Body"] },
            { title: "RESPONSE", tags: [{ text: "Status code", on: true }, "Headers", "Body"] },
          ],
        },
        { type: "p", spaced: true, text: "The server makes every decision. The browser only displays the result." },
      ],
      foot: { text: "Same connection. ==Different trust.==" },
    },
    {
      theme: "paper",
      eyebrow: "The surprise",
      heading: "Browser {{≠}} the only client",
      blocks: [
        { type: "p", text: "Burp, curl or a Python script can send any request your browser can, and plenty it never would." },
        {
          type: "table",
          label: "Illustrative example",
          rows: [
            { muted: true, cells: ["field", "browser", "attacker"] },
            [{ m: "price" }, "49.99", { k: "0.01" }],
            [{ m: "role" }, "user", { k: "admin" }],
            [{ m: "user_id" }, "42", { k: "43" }],
          ],
        },
      ],
      foot: { text: "Client checks are UX. **Server checks are security.**" },
    },
    {
      theme: "green",
      heading: "Status codes worth ==knowing.==",
      blocks: [
        {
          type: "list",
          items: [
            ["200", "It worked."],
            ["302", "Redirect. Watch where it sends people."],
            ["401", "Not authenticated: who are you?"],
            ["403", "Not authorised: I know you, and no."],
            ["500", "Server error. Errors can leak internals."],
          ],
        },
        { type: "callout", title: "401 vs 403 is an interview classic", text: "401 means “log in.” 403 means logging in won’t help." },
      ],
    },
    {
      theme: "paper",
      eyebrow: "Before you test a feature, ask",
      heading: "Where does user input get in?",
      blocks: [
        {
          type: "boxes",
          items: [
            ["URL & query", "Is it **reflected** in the page?"],
            ["Headers & cookies", "Does the server **trust** them?"],
            ["Body", "Is it **stored** and shown to others?"],
          ],
        },
        { type: "next", label: "Next in week {week}", title: "Cookies and sessions in plain English" },
      ],
    },
  ],
};
