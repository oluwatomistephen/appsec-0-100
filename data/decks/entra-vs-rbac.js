// Learning card deck. See README "Adding a learning card deck" for the block types.

export default {
  id: "entra-vs-rbac",
  title: "Entra roles vs Azure RBAC",
  intro: "Why a Global Administrator can be locked out of Azure resources, and how to tell which permission system you need.",
  cards: [
    {
      theme: "green",
      eyebrow: "Week {week} · Identity and access",
      eyebrowSpaced: true,
      heading: "Global Admin, but no VMs? ==By design.==",
      blocks: [{ type: "p", text: "One Microsoft tenant runs two separate permission systems. Knowing which one you need is half of cloud access control." }],
      net: true,
      foot: { mono: "Week {week}", swipe: true },
    },
    {
      theme: "black",
      heading: "Two systems. ==One sign-in.==",
      blocks: [
        {
          type: "cols",
          cols: [
            { title: "ENTRA ROLES", tags: ["Users", "Groups", "App registrations", "Conditional Access"] },
            { title: "AZURE RBAC", tags: ["Management groups", "Subscriptions", "Resource groups", { text: "Resources", on: true }] },
          ],
        },
        { type: "p", spaced: true, text: "Entra roles decide who can **manage the directory**. Azure RBAC decides who can **touch a resource**." },
      ],
      foot: { text: "Signed in once. ==Checked twice.==" },
    },
    {
      theme: "paper",
      eyebrow: "Scope",
      heading: "Azure roles flow down.",
      blocks: [
        {
          type: "table",
          label: "Illustrative example",
          rows: [
            { muted: true, cells: ["assigned at", "role", "reaches"] },
            [{ m: "mgmt group" }, "Reader", { k: "every sub below" }],
            [{ m: "subscription" }, "Contributor", { k: "every RG in it" }],
            [{ m: "resource grp" }, "VM Contrib.", { k: "only its VMs" }],
          ],
        },
        { type: "p", small: true, text: "A role assigned at one level applies to **everything beneath it**. Assign at the smallest scope that still lets people do the job." },
      ],
      foot: { text: "Inheritance is convenient. **It's also easy to overdo.**" },
    },
    {
      theme: "paper",
      eyebrow: "The surprise",
      heading: "Global Admin {{≠}} Owner",
      blocks: [
        { type: "p", text: "Out of the box, the top directory role grants **nothing** on subscriptions or resources. Microsoft secures the two separately on purpose." },
        {
          type: "table",
          label: "Illustrative example",
          two: true,
          rows: [
            [{ m: "user" }, "admin@contoso.example"],
            [{ m: "entra_role" }, { k: "Global Administrator" }],
            [{ m: "azure_role" }, "none"],
            [{ m: "subscriptions" }, "none visible"],
          ],
        },
      ],
      foot: { text: "Powerful in the directory. **Powerless on the VMs.**" },
    },
    {
      theme: "green",
      heading: "The ==break-glass== setting.",
      blocks: [
        {
          type: "list",
          items: [
            ["01", "A Global Administrator opens Entra ID › Properties."],
            ["02", "Sets Access management for Azure resources to Yes."],
            ["03", "They now hold User Access Administrator at root scope `/`."],
            ["04", "Grant the right, smaller role. Then set it back to No."],
          ],
        },
        { type: "callout", title: "An emergency tool, not a habit", text: "The elevated role applies to that one user and is easy to forget. Switch it off as soon as you're done, and check no root-scope assignment is left behind." },
      ],
    },
    {
      theme: "paper",
      eyebrow: "Before you assign a role, ask",
      heading: "Identities or resources?",
      blocks: [
        {
          type: "boxes",
          items: [
            ["Users, groups, apps", "an **Entra role**"],
            ["VMs, storage, databases", "an **Azure RBAC role**, at the smallest scope"],
          ],
        },
        { type: "p", small: true, text: "Least privilege applies to both: right system first, then the smallest role, then the smallest scope." },
        { type: "next", label: "Next in week {week}", title: "Sign in with Microsoft: OAuth in practice" },
      ],
    },
  ],
};
