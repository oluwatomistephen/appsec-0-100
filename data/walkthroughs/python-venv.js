// Walkthrough. See README "Adding a walkthrough" for the format.

export default {
  id: "python-venv",
  title: "Python virtual environments and running a script",
  tool: "Python and pip",
  time: "20 min",
  summary: "Give each project its own set of Python packages, install requests, and run a script that fetches a URL. Every Python deliverable in the plan starts this way.",
  before: ["Python 3 installed from python.org (on Windows, tick “Add python.exe to PATH”). Check with `python --version`"],
  steps: [
    {
      title: "Create and activate a virtual environment",
      text: [
        "In your project folder's terminal, create a virtual environment called `.venv`, then activate it. The command to activate is different on Windows and on macOS or Linux.",
        "When it's active, your prompt starts with `(.venv)`. Packages you install now go into this project only.",
      ],
      screen: {
        frame: "terminal", title: "Terminal", dark: true, prompt: "PS> ",
        alt: "A terminal creating a virtual environment with python -m venv, activating it, and the prompt changing to show (.venv).",
        body: [{ t: "term", lines: [
          { cmd: "python -m venv .venv", mark: 1 },
          { cmd: ".venv\\Scripts\\Activate.ps1", mark: 2 },
          { out: "(.venv) PS> " , mark: 3 },
          { out: "# macOS or Linux: source .venv/bin/activate" },
        ] }],
      },
      legend: ["Creates the environment in a `.venv` folder.", "Activates it in PowerShell. In Command Prompt it's `.venv\\Scripts\\activate`.", "`(.venv)` in the prompt means it's active."],
      prompt: "PowerShell says running scripts is disabled when I activate my venv. Explain why Windows does this and the safest way to allow it for my own user only.",
    },
    {
      title: "Install a package and record it",
      text: [
        "Install the requests library, then save the list of installed packages to `requirements.txt`. Anyone (including future you) can recreate the environment with `pip install -r requirements.txt`.",
        "Add `.venv/` to your `.gitignore`: the environment itself never goes into Git.",
      ],
      screen: {
        frame: "terminal", title: "Terminal", dark: true, prompt: "(.venv) PS> ",
        alt: "A terminal installing requests with pip and writing pip freeze output to requirements.txt.",
        body: [{ t: "term", lines: [
          { cmd: "pip install requests", mark: 1 },
          { ok: true, out: "Successfully installed certifi charset-normalizer idna requests urllib3" },
          { cmd: "pip freeze > requirements.txt", mark: 2 },
        ] }],
      },
      legend: ["Installs requests and the packages it depends on.", "Writes exact versions to a file you commit to Git."],
    },
    {
      title: "Write and run a script",
      text: [
        "Create `headers.py` in VS Code with the code below, then run it. In the bottom-right of VS Code, check the Python interpreter shows `.venv`, so the editor uses the same packages.",
      ],
      screen: {
        frame: "app", dark: true, title: "headers.py — Visual Studio Code",
        alt: "VS Code showing a short Python script that fetches a URL with requests and prints the status code and headers, with a terminal below showing the output.",
        body: [
          { t: "code", lines: ["import sys", "import requests", "", "url = sys.argv[1]", "response = requests.get(url, timeout=10)", "print(response.status_code)", "for name, value in response.headers.items():", "    print(f\"{name}: {value}\")"], mark: 1 },
          { t: "term", lines: [{ cmd: "python headers.py https://example.org", mark: 2 }, { out: "200" }, { out: "Content-Type: text/html; charset=UTF-8" }, { out: "Cache-Control: max-age=600" }] },
        ],
      },
      legend: ["`requests.get` fetches the URL. Always set a timeout.", "Run it with the URL as an argument."],
    },
  ],
  doneWhen: "You can create and activate a virtual environment from memory, and your script prints the status code and headers for any URL you give it.",
};
