// Walkthrough. See README "Adding a walkthrough" for the format.

export default {
  id: "vscode-terminal",
  title: "VS Code and its terminal",
  tool: "Visual Studio Code",
  time: "20 min",
  summary: "Install the editor most of this plan uses, open a project folder, and run your first commands in its built-in terminal.",
  before: ["A Windows, macOS or Linux computer you're allowed to install software on"],
  steps: [
    {
      title: "Install VS Code and open a folder",
      text: [
        "Download VS Code from code.visualstudio.com and install it with the default options. Make a new folder called `learning` somewhere easy to find, like your Documents folder.",
        "In VS Code, choose **File › Open Folder…** and pick that folder. VS Code may ask whether you trust the authors of the files: for a folder you just made, choose Yes.",
      ],
      screen: {
        frame: "app", dark: true, title: "learning — Visual Studio Code",
        alt: "VS Code with the File menu open and Open Folder highlighted, and an empty Explorer sidebar on the left.",
        body: [
          { t: "tabs", items: [{ label: "File", on: true, mark: 1 }, "Edit", "Selection", "View", "Terminal", "Help"] },
          { t: "side", items: [{ label: "EXPLORER", on: true, mark: 2 }, "LEARNING", "  (empty)"], body: [
            { t: "list", items: ["New Text File", { label: "**Open Folder…**", mark: 3 }, "Open Recent", "Save", "Exit"] },
          ] },
        ],
      },
      legend: ["The **File** menu.", "The **Explorer** sidebar shows the files in the folder you opened.", "**Open Folder…** opens a whole folder as your project."],
    },
    {
      title: "Open the built-in terminal",
      text: [
        "Choose **Terminal › New Terminal**, or press Ctrl+` (the key above Tab). A panel opens at the bottom. It's the same command line you'd get in a separate window, already in your project folder.",
        "On Windows it opens PowerShell by default. Once you've installed WSL (Linux week), you can pick **Ubuntu (WSL)** from the dropdown next to the + button.",
      ],
      screen: {
        frame: "app", dark: true, title: "learning — Visual Studio Code",
        alt: "VS Code with a terminal panel open at the bottom, showing a prompt in the learning folder and a dropdown to choose the shell.",
        body: [
          { t: "tabs", items: ["File", "Edit", "Selection", "View", { label: "Terminal", on: true, mark: 1 }, "Help"] },
          { t: "code", lines: ["", "  (editor area: open a file to edit it here)", ""] },
          { t: "tabs", items: ["PROBLEMS", "OUTPUT", { label: "TERMINAL", on: true }, { label: "+ ⌄  powershell", mark: 2 }] },
          { t: "term", lines: [{ cmd: "pwd", mark: 3 }, { out: "C:\\Users\\you\\Documents\\learning" }] },
        ],
      },
      legend: ["The **Terminal** menu, or Ctrl+`.", "**+** opens another terminal; the arrow lets you pick PowerShell, Command Prompt or Ubuntu (WSL).", "`pwd` prints the folder you're in. It should be your project folder."],
    },
    {
      title: "Create and run a file",
      text: [
        "In the terminal, type the commands below one at a time and press Enter after each. You're making a file, writing a line into it, and reading it back.",
        "Watch the Explorer sidebar: `notes.txt` appears as soon as you create it. Click it to open it in the editor.",
      ],
      screen: {
        frame: "terminal", title: "Terminal", dark: true,
        alt: "A terminal showing echo writing a line into notes.txt, then cat printing it back.",
        body: [{ t: "term", lines: [
          { cmd: "echo \"My first note\" > notes.txt", mark: 1 },
          { cmd: "cat notes.txt", mark: 2 },
          { out: "My first note" },
          { cmd: "ls" },
          { out: "notes.txt" },
        ] }],
      },
      legend: ["`echo` prints text; `>` sends it into a file instead of the screen.", "`cat` prints a file's contents."],
      prompt: "I'm new to the terminal. Explain what `echo \"My first note\" > notes.txt` does, word by word, and what would change if I used `>>` instead.",
    },
  ],
  doneWhen: "You can open a folder in VS Code, open a terminal inside it, and create, list and read a file without looking at these steps.",
};
