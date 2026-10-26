// Walkthrough. See README "Adding a walkthrough" for the format.

export default {
  id: "github-repo",
  title: "Create a GitHub repo and push your first commit",
  tool: "Git and GitHub",
  time: "25 min",
  summary: "Make a repository on GitHub, copy it to your computer, and send your first change back. This is how every project and write-up in the plan gets published.",
  before: [
    "A GitHub account with two-factor authentication turned on",
    "Git installed (git-scm.com). Check with `git --version` in a terminal",
  ],
  steps: [
    {
      title: "Create the repository on GitHub",
      text: [
        "On github.com, click the **+** menu in the top-right corner and choose **New repository**. Name it (for example `appsec-journey`), add a one-line description, and tick **Add a README file**.",
        "Public is fine for learning projects: they become your portfolio. Never put passwords or keys in any repository, public or private.",
      ],
      screen: {
        frame: "browser", url: "github.com/new",
        alt: "GitHub's create repository form with the name appsec-journey, Public selected and Add a README file ticked.",
        body: [
          { t: "heading", text: "Create a new repository" },
          { t: "form", fields: [
            { label: "Repository name", value: "appsec-journey", mark: 1 },
            { label: "Description (optional)", value: "My path to becoming an AppSec engineer" },
            { kind: "radio", label: "Public: anyone can see this repository", on: true, mark: 2 },
            { kind: "radio", label: "Private" },
            { kind: "check", label: "Add a README file", on: true, mark: 3 },
          ] },
          { t: "buttons", items: [{ label: "Create repository", primary: true, mark: 4 }] },
        ],
      },
      legend: ["The name becomes part of the URL, so keep it short with dashes, not spaces.", "Public repos are your portfolio. Keep anything sensitive out.", "A README gives the repo a front page, and lets you clone it straight away.", "Creates the repository."],
    },
    {
      title: "Clone it to your computer",
      text: [
        "On the new repo's page, click the green **Code** button and copy the HTTPS address. In a terminal, go to where you keep projects and clone it. The first time, Git will open a browser window to sign in to GitHub.",
      ],
      screen: {
        frame: "terminal", title: "Terminal", dark: true,
        alt: "A terminal running git clone with the repository URL, then cd into the new folder and ls showing README.md.",
        body: [{ t: "term", lines: [
          { cmd: "git clone https://github.com/your-name/appsec-journey.git", mark: 1 },
          { out: "Cloning into 'appsec-journey'..." },
          { cmd: "cd appsec-journey" },
          { cmd: "ls" },
          { out: "README.md" },
        ] }],
      },
      legend: ["`git clone` copies the whole repository, including its history, into a new folder."],
    },
    {
      title: "Change, commit and push",
      text: [
        "Edit README.md in VS Code: write your goal in a sentence or two. Then save, and run the commands below. `add` chooses what goes into the commit, `commit` saves a snapshot with a message, and `push` sends it to GitHub.",
      ],
      screen: {
        frame: "terminal", title: "Terminal", dark: true,
        alt: "A terminal running git status, git add, git commit with a message, and git push, with output showing the push succeeded.",
        body: [{ t: "term", lines: [
          { cmd: "git status", mark: 1 },
          { out: "modified:   README.md" },
          { cmd: "git add README.md" },
          { cmd: "git commit -m \"Write my goal in the README\"", mark: 2 },
          { out: "[main 4f2c9a1] Write my goal in the README" },
          { cmd: "git push", mark: 3 },
          { ok: true, out: "main -> main" },
        ] }],
      },
      legend: ["`git status` is your best friend: it shows what changed and what's staged.", "Write messages that say what the change does.", "`push` uploads your commits. Refresh the GitHub page to see them."],
      prompt: "I ran `git push` and got this error: [paste it]. Explain what Git is telling me and what I should check, without giving me commands to copy.",
    },
  ],
  doneWhen: "Your README change shows on github.com, and you can explain what `add`, `commit` and `push` each did.",
};
