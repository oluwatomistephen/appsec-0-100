// Phase 0: Tech foundations, for the complete beginner pathway.
// Tool-first: every week has you using real tools, with an AI assistant as a
// tutor, and "Can I explain…" checks to make sure the understanding is yours.

import { P0 } from "../projects.js";

export const toolkit = {
  id: "toolkit",
  title: "Your toolkit: computers, VS Code and an AI tutor",
  walkthroughs: ["vscode-terminal", "ai-tutor"],
  learn: [
    "What the CPU, memory, storage and operating system each do",
    "Files, folders, paths and file extensions",
    "Processes, and what Task Manager or Activity Monitor shows you",
    "Installing VS Code and opening its built-in terminal",
    "Using an AI assistant as a tutor, not an answer machine",
  ],
  deliverables: [
    "Install VS Code and open a terminal inside it",
    "Find your OS version, CPU, RAM and free disk space, and write them in a file called my-machine.md",
    "Use Task Manager (Windows) or Activity Monitor (macOS) to find the process using the most memory, and find out what it is",
    "Set up an AI assistant and write your 3 rules for using it (for example: never paste passwords, ask it to explain rather than solve, check its claims)",
  ],
  explain: ["What the operating system does between you and the hardware", "The difference between memory and storage"],
  ai: [
    "I'm a complete beginner learning how computers work. Explain CPU, RAM, storage and the operating system using a restaurant kitchen analogy. Then ask me 3 questions to check I understood.",
    "Here's a screenshot description of my Task Manager: [describe the top 5 processes]. Help me work out what each one is, by asking me what I can see rather than guessing.",
  ],
};

export const linux1 = {
  id: "linux-1",
  title: "Linux command line I",
  learn: [
    "Getting a Linux shell: WSL on Windows, or Terminal on macOS",
    "Moving around: `pwd`, `ls`, `cd`, and absolute vs relative paths",
    "Working with files: `cat`, `less`, `cp`, `mv`, `rm`, `mkdir`",
    "Getting help with `man` and `--help`",
    "Users, groups and file permissions",
  ],
  deliverables: [
    "Install WSL with Ubuntu (Windows) or open Terminal (macOS)",
    "Play OverTheWire Bandit levels 0–10",
    "Write a cheat sheet of 20 commands in your own words",
    "Make a file only you can read, then prove it with `ls -l`",
  ],
  explain: ["What `rwxr-x---` means", "Why you shouldn't run everything as root"],
  ai: [
    "I'm stuck on OverTheWire Bandit level [number]. Here's what I tried: [commands]. Give me a hint as a question, not the answer.",
    "Explain Linux file permissions with the numbers (like 750) and the letters (like rwxr-x---) side by side. Then give me 5 to convert.",
  ],
};

export const linux2 = {
  id: "linux-2",
  title: "Linux command line II",
  learn: [
    "Pipes and redirection",
    "`grep`, `find`, `sort`, `uniq` and `wc`",
    "Processes: `ps`, `top` and `kill`",
    "Installing software with a package manager",
    "SSH and key pairs",
    "Reading log files",
  ],
  deliverables: [
    "Play OverTheWire Bandit levels 11–20",
    "One command line that shows the 5 IP addresses with the most requests in a web access log (ask an AI to generate 200 realistic sample lines to practise on)",
    "Generate an SSH key pair and explain which half you share",
    "Shell script that backs up a folder into a dated .tar.gz file",
  ],
  explain: ["What a pipe does", "Why the private key never leaves your machine"],
  ai: [
    "Generate 200 lines of a realistic Apache access log for practice, with a few IP addresses making far more requests than the rest. Use made-up documentation IP ranges.",
    "Here's my one-line command: [paste it]. Explain each part back to me, then suggest one way to make it shorter. Don't run it for me.",
  ],
};

export const networking = {
  id: "networking",
  title: "Networking: TCP/IP and DNS",
  learn: [
    "IP addresses, subnets and private ranges",
    "Ports, TCP vs UDP, and the three-way handshake",
    "DNS: record types, resolvers and what happens during a lookup",
    "Routers, NAT and firewalls",
    "TLS at a high level",
  ],
  deliverables: [
    "Use `ping`, `traceroute` (`tracert` on Windows) and `nslookup` or `dig` on 3 sites, and record what you see",
    "Find your private and public IP addresses and explain why they differ",
    "Capture a DNS lookup in Wireshark and label the query and the answer",
    "Complete the free networking rooms in TryHackMe's Pre Security path",
  ],
  explain: ["What happens between typing a domain name and getting an IP address", "Why TCP needs a handshake and UDP doesn't"],
  ai: [
    "Explain the TCP three-way handshake as a phone call. Then show me what it looks like in Wireshark, column by column.",
    "Quiz me on DNS record types (A, AAAA, CNAME, MX, TXT, NS): describe what a company wants to do and I'll name the record.",
  ],
};

export const httpWeb = {
  id: "http-web",
  title: "HTTP and how websites work",
  walkthroughs: ["devtools-network"],
  learn: [
    "Clients, servers and URLs",
    "HTTP requests and responses",
    "Status codes and headers",
    "HTTPS and certificates",
    "Browser DevTools: Elements, Console and Network tabs",
  ],
  deliverables: [
    "Open the DevTools Network tab, load a site, and list 5 requests with their method, status code and type",
    "Use `curl -i` to fetch a page and point out the status line, headers and body",
    "Inspect a site's certificate and note who issued it and when it expires",
    "Write-up: “What a web page is made of”",
  ],
  explain: ["The difference between HTTP and HTTPS", "What a cookie is for"],
  ai: [
    "I'm looking at the DevTools Network tab for the first time. Explain what each column means (Name, Status, Type, Initiator, Size, Time), then ask me to find one example of each.",
    "Here's the output of `curl -i` for a site: [paste it]. Ask me to label the status line, the headers and the body before you confirm.",
  ],
};

export const python1 = {
  id: "python-1",
  title: "Python basics I",
  learn: [
    "Installing Python and running scripts from VS Code",
    "Variables, strings, numbers and booleans",
    "`if` statements and loops",
    "Lists and dictionaries",
    "Reading error messages",
  ],
  deliverables: [
    "Complete 15 exercises on the exercism.org Python track",
    "Number-guessing game in the terminal",
    "Script that counts how often each word appears in a text file",
    "Paste one error you hit into an AI tutor, ask it to explain the error (not fix it), then fix it yourself",
  ],
  explain: ["The difference between a list and a dictionary", "How to read a Python traceback from the bottom up"],
  ai: [
    "I'm learning Python. Here's my code and the error: [paste both]. Explain what the error means in plain English, but don't give me the fixed code.",
    "Give me 5 tiny Python challenges on loops and lists, from easiest to hardest. Check my answers one at a time.",
  ],
};

export const python2 = {
  id: "python-2",
  title: "Python basics II",
  walkthroughs: ["python-venv"],
  learn: [
    "Functions and modules",
    "Reading and writing files, and JSON",
    "Virtual environments and pip",
    "The requests library",
    "Handling errors with `try` and `except`",
  ],
  deliverables: [
    "Password strength checker, with the rules explained in comments",
    "Script that fetches a public JSON API and saves selected fields to a file",
    "Set up a virtual environment and a requirements.txt for that script",
    "15 more exercism.org Python exercises",
  ],
  explain: ["Why virtual environments exist", "What an API returns, and how JSON maps to Python"],
  ai: [
    "Review my password strength checker: [paste it]. Don't rewrite it. Ask me questions that lead me to its weaknesses.",
    "Explain what an API is using a restaurant menu and a waiter. Then suggest 3 free public APIs I could practise with that need no sign-up.",
  ],
};

export const gitGithub = {
  id: "git-github",
  title: "Git and GitHub",
  walkthroughs: ["github-repo"],
  learn: [
    "Repositories, commits and history",
    "Branches and merging",
    "GitHub: remotes, push and pull",
    "Pull requests and code review",
    "What never to commit: passwords, `.env` files and keys",
  ],
  deliverables: [
    "Create a GitHub account with two-factor authentication turned on",
    "Create a repo called learning-log and push your Python scripts to it",
    "Make a branch, change something, open a pull request and merge it",
    "Add a .gitignore that excludes `.env` files and virtual environment folders",
  ],
  explain: ["What a commit is", "Why deleting a secret in a later commit doesn't remove it"],
  ai: [
    "I typed `git status` and got this: [paste it]. Explain each line and tell me what command I probably want next, and why.",
    "Draw me (in text) a branch, two commits and a merge. Then ask me to explain what each step did.",
  ],
};

export const htmlCss = {
  id: "html-css",
  title: "HTML and CSS",
  learn: [
    "HTML elements, attributes and forms",
    "How the browser builds the DOM",
    "CSS selectors, the box model and flexbox",
    "Accessibility basics: labels, headings and alt text",
  ],
  deliverables: [
    "Personal page with a header, an about section and a contact form (no backend yet)",
    "Make it work on a phone-sized screen",
    "Publish it with GitHub Pages",
    "Change some text on a live site with the DevTools Elements tab, then explain why the change isn't saved",
  ],
  explain: ["What a form sends when you press submit", "Why editing a page in DevTools doesn't change the server"],
  ai: [
    "Here's my HTML: [paste it]. Review it for accessibility problems. List them as questions so I find the fix myself.",
    "Explain the CSS box model with a picture frame analogy. Then give me a layout to build with flexbox.",
  ],
};

export const javascriptBasics = {
  id: "javascript-basics",
  title: "JavaScript basics",
  learn: ["Variables, functions, arrays and objects", "Events and the DOM", "`fetch` and JSON", "The browser console"],
  deliverables: [
    "Add a to-do list to your page that can add and remove items",
    "Save the list in localStorage so it survives a reload",
    "Fetch data from a public API and show it on the page using textContent",
    "Ask an AI tutor about innerHTML vs textContent, then write up the difference in your own words",
  ],
  explain: ["Why code running in the browser can't be trusted by the server", "Why textContent is safer than innerHTML"],
  ai: [
    "I'm learning JavaScript. Explain innerHTML vs textContent with a small example where innerHTML becomes dangerous. Then ask me why.",
    "Here's my to-do list code: [paste it]. Ask me 3 questions about how it works, as if you were a teacher checking I wrote it myself.",
  ],
};

export const securityFundamentals = {
  id: "security-fundamentals",
  title: "Security fundamentals",
  quiz: true,
  learn: [
    "The CIA triad: confidentiality, integrity and availability",
    "Authentication vs authorisation",
    "Passwords, hashing and multi-factor authentication",
    "Common attacks: phishing, malware, brute force, injection and cross-site scripting at a high level",
    "Vulnerabilities, threats and risk",
    "Staying legal: only test what you own or have written permission to test",
  ],
  deliverables: [
    "Turn on multi-factor authentication for every account you use for learning",
    "Map 5 recent breach news stories to the CIA triad",
    "Create a free PortSwigger Web Security Academy account and complete your first Apprentice lab",
    "Write your own one-page rules of engagement: what you will and won't test, and why",
  ],
  explain: ["Each letter of CIA, with an example", "Why testing a site without permission is illegal even if you mean well"],
  ai: [
    "Give me 6 short breach scenarios. For each, I'll say which part of the CIA triad was hit and how it could have been prevented.",
    "Explain the difference between a vulnerability, a threat and a risk using a house with an unlocked window.",
  ],
};

export const foundationsCheckpoint = {
  id: "foundations-checkpoint",
  title: "Foundations checkpoint",
  learn: ["Planning a small project from start to finish", "Writing a README someone else can follow"],
  deliverables: ["Go back through every “Can I explain…” check from Phase 0 and re-learn any you can't answer without notes"],
  explain: ["What you'd do differently if you started Phase 0 again"],
  ai: [
    "Here's my project README: [paste it]. Pretend you're a stranger trying to run my project. Where would you get stuck?",
    "Quiz me on everything from Phase 0, mixing Linux, networking, HTTP, Python, Git, HTML, JavaScript and security. One question at a time.",
  ],
  project: P0,
};

export const securityPlus = {
  id: "security-plus",
  title: "Security+ sprint",
  optional: true,
  learn: [
    "The CompTIA Security+ exam objectives and domains",
    "Free study options, such as Professor Messer's videos and practice questions",
    "When the certificate helps: HR filters for help desk, SOC and government roles",
  ],
  deliverables: [
    "Download the official exam objectives and mark each one red, amber or green",
    "Watch Professor Messer's videos for your red objectives",
    "Take one full free practice test and log every question you miss",
  ],
  explain: ["Whether Security+ is worth it for the role you want first, and why"],
  ai: [
    "Here are the Security+ objectives I marked red: [paste them]. Quiz me on them one at a time, and explain each wrong answer.",
    "I'm applying for [help desk / SOC / junior developer] roles. Talk me through whether Security+ would help, with arguments on both sides.",
  ],
};
