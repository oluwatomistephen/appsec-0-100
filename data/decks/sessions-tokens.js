// Learning card deck. See README "Adding a learning card deck" for the block types.
// {week} is replaced with the week number of the linked week in the current pathway.

export default {
  id: "sessions-tokens",
  title: "Sessions, passwords and tokens",
  intro: "How a website remembers who you are, why passwords are hashed rather than encrypted, and what to check before trusting a login.",
  cards: [
    {
      theme: "green",
      eyebrow: "Week {week} · Identity on the web",
      eyebrowSpaced: true,
      heading: "HTTP forgets you. ==Sessions remember.==",
      xl: true,
      blocks: [{ type: "p", text: "Every request arrives on its own. Sessions and tokens are how a server knows it's still you." }],
      net: true,
      foot: { mono: "Week {week}", swipe: true },
    },
    {
      theme: "paper",
      heading: "How a session works.",
      blocks: [
        {
          type: "code",
          label: "Illustrative example",
          lines: [
            [{ k: "POST" }, " /login"],
            ["username=sam&password=", { m: "••••••" }],
            [{ m: "← 302 Found" }],
            [{ k: "Set-Cookie:" }, " session=7f3a…; Secure; HttpOnly"],
            [],
            [{ k: "GET" }, " /account"],
            [{ k: "Cookie:" }, " session=7f3a…"],
          ],
        },
        { type: "p", small: true, text: "The server remembers who you are and gives you a long **random ID**. Every later request carries it back." },
      ],
      foot: { text: "Whoever holds the cookie **is logged in.**" },
    },
    {
      theme: "black",
      heading: "Sessions vs ==tokens.==",
      blocks: [
        {
          type: "cols",
          cols: [
            { title: "SESSION COOKIE", tags: ["Random ID", "State on server", { text: "Easy to revoke", on: true }] },
            { title: "JWT", tags: ["Signed claims", "State in token", { text: "Hard to revoke", on: true }] },
          ],
        },
        { type: "p", spaced: true, text: "Neither is automatically safer. With JWTs, the server must check the signature with **the algorithm it expects**, never the one the token asks for." },
      ],
      foot: { text: "Different trade-offs. ==Same job.==" },
    },
    {
      theme: "paper",
      eyebrow: "The surprise",
      heading: "Hashing {{≠}} encryption",
      blocks: [
        { type: "p", text: "Encryption can be **reversed** with the key. A password hash **can't**: to check a login, the server hashes the attempt and compares." },
        {
          type: "table",
          label: "Storing passwords",
          two: true,
          rows: [
            [{ m: "encrypted" }, "reversible: one leaked key, every password"],
            [{ m: "fast hash" }, "one-way, but quick to guess at"],
            [{ m: "Argon2id / bcrypt" }, { k: "one-way and slow on purpose" }],
          ],
        },
      ],
      foot: { text: "For password hashes, **slow is a feature.**" },
    },
    {
      theme: "green",
      heading: "Cookie flags worth ==knowing.==",
      blocks: [
        {
          type: "list",
          wide: true,
          items: [
            ["Secure", "Only sent over HTTPS."],
            ["HttpOnly", "JavaScript can't read it, so XSS can't steal it."],
            ["SameSite", "Limits sending it with cross-site requests."],
          ],
        },
        { type: "callout", title: "MFA protects the login, not the session", text: "Once the session cookie exists, MFA has done its job. Protecting the cookie is the app's job." },
      ],
    },
    {
      theme: "paper",
      eyebrow: "Before you build a login, ask",
      heading: "Am I using a trusted library?",
      blocks: [
        {
          type: "boxes",
          items: [
            ["Passwords", "hashed with **Argon2id** or **bcrypt**?"],
            ["Log in", "a **new session ID** after every login?"],
            ["Log out", "is the session **ended on the server**?"],
          ],
        },
        { type: "next", label: "Next topic", title: "OAuth 2.0 and OpenID Connect" },
      ],
    },
  ],
};
