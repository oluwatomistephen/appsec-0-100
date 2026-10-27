// The core AppSec weeks: the IT support / sysadmin plan, which the beginner
// pathway also follows after Phase 0. Some weeks are reused by the developer
// and SOC pathways too.
//
// Week fields: id (stable, used in progress IDs: never rename), title, learn,
// deliverables, explain, and optionally quiz, project, deck, ai, optional.
// Inline markup: **bold** and `code`.

import { P1, P2, P3, P4 } from "../projects.js";

export const httpBasics = {
  id: "http-basics",
  title: "How the web works",
  deck: "web-basics",
  walkthroughs: ["ai-tutor", "github-repo", "devtools-network"],
  learn: ["HTTP methods, status codes and headers", "The request and response cycle", "Cookies basics", "Browser DevTools Network tab", "Burp Suite Community setup"],
  deliverables: [
    "Create a GitHub repo called appsec-journey with a README stating your goal",
    "Install Burp, then intercept and change one request on a PortSwigger lab",
    "Python script that prints the status code and all response headers for a URL",
    "One-page write-up: “What happens when I type a URL and press Enter”",
  ],
  explain: ["The difference between 401 and 403", "Why anything in a request can be changed by the user"],
  ai: [
    "I'm learning HTTP. Here's a raw request I captured in Burp: [paste it, with any cookies or tokens replaced by XXX]. Explain it line by line, then ask me 3 questions to check I understood.",
    "Quiz me on HTTP status codes one at a time. Don't give me the answer until I've tried.",
  ],
};

export const pythonSecurity = {
  id: "python-security",
  title: "Python for security work",
  deck: "python-security",
  walkthroughs: ["python-venv"],
  learn: ["Functions, loops, lists and dicts", "Reading files and JSON", "The requests library", "Virtual environments and pip"],
  deliverables: [
    "Script that reads urls.txt and flags missing CSP, HSTS, X-Content-Type-Options and X-Frame-Options",
    "10 exercises on the exercism.org Python track",
    "Push both to appsec-journey",
  ],
  explain: ["What each of those four headers protects against"],
  ai: [
    "Here's my Python script: [paste it]. Don't rewrite it. Point out bugs and unclear parts as questions, so I fix them myself.",
    "Explain what a Python virtual environment is using an analogy, then give me a 3-step exercise to prove I can create and use one.",
  ],
};

export const sessionsTokens = {
  id: "sessions-tokens",
  title: "Sessions, passwords and tokens",
  deck: "sessions-tokens",
  quiz: true,
  learn: ["Sessions vs tokens", "Password hashing (bcrypt, Argon2) vs encryption", "JWT structure and common mistakes", "MFA and session fixation"],
  deliverables: [
    "Flask app with register, login and logout using hashed passwords",
    "Decode a JWT by hand and explain each claim",
    "PortSwigger: 3 Authentication labs (Apprentice)",
  ],
  explain: ["Why we hash passwords instead of encrypting them", "What the “alg: none” JWT attack is"],
  ai: [
    "Act as an interviewer. Ask me 5 questions about sessions, password hashing and JWTs, one at a time. After each answer, tell me what I missed.",
    "Here's a JWT from a practice lab (not a real account): [paste it]. Don't decode it for me: walk me through decoding it myself, step by step.",
  ],
};

export const oauthOidc = {
  id: "oauth-oidc",
  title: "OAuth 2.0 and OpenID Connect",
  deck: "entra-vs-rbac",
  learn: ["Authorization code flow with PKCE", "ID tokens vs access tokens", "Scopes, consent and redirect URIs", "App registrations in Entra ID"],
  deliverables: [
    "Register an app in your Entra tenant (a free Azure account gives you one) and add “Sign in with Microsoft” to your Flask app with MSAL",
    "Draw the auth code + PKCE flow from memory",
    "PortSwigger: 2 OAuth labs",
  ],
  explain: ["Why redirect URI validation matters", "Authentication vs authorisation, using Entra roles vs Azure RBAC as the example"],
  ai: [
    "Explain the OAuth 2.0 authorization code flow with PKCE as a story with characters (the user, the app, the authorisation server). Then ask me to retell it.",
    "I'm a Global Administrator in Entra ID but can't see any Azure subscriptions. Explain why, and what the safe fix is, without just telling me to grant myself Owner.",
  ],
};

export const jsBrowser = {
  id: "js-browser",
  title: "JavaScript and the browser",
  learn: ["JS basics: functions, fetch, async/await", "The DOM", "Same-origin policy and CORS", "Node.js and Express basics"],
  deliverables: [
    "Express app with a form that saves and lists comments (no security yet: you’ll attack it later)",
    "PortSwigger: 2 CORS labs",
    "Write-up: SOP vs CORS in plain English",
  ],
  explain: ["Why CORS doesn’t protect your server"],
  ai: [
    "I know Python. Teach me the JavaScript equivalents of functions, lists, dicts and loops in a side-by-side table, then give me 3 small exercises.",
    "Explain the same-origin policy and CORS to me like I'm a sysadmin who understands firewalls. Then tell me the most common misunderstanding about CORS.",
  ],
};

export const owaspSqli = {
  id: "owasp-sqli",
  title: "OWASP Top 10 and SQL injection",
  learn: ["The OWASP Top 10 categories", "How SQL queries are built", "Parameterised queries", "UNION and blind SQLi"],
  deliverables: [
    "PortSwigger: all SQL injection Apprentice labs",
    "Run OWASP Juice Shop and solve its coding challenge for the admin login SQL injection: find the vulnerable line, then pick the right fix",
  ],
  explain: ["Each OWASP Top 10 category in one sentence", "Why parameterised queries stop SQLi"],
  ai: [
    "Give me 5 short code snippets in Python or JavaScript, some vulnerable to SQL injection and some safe. Don't say which. I'll tell you which are vulnerable and why.",
    "Quiz me on the OWASP Top 10: describe a real-world bug, and I'll name the category.",
  ],
  project: P1,
};

export const xss = {
  id: "xss",
  title: "Cross-site scripting",
  learn: ["Reflected, stored and DOM XSS", "Output encoding by context", "Content Security Policy", "HttpOnly cookies as defence in depth"],
  deliverables: [
    "PortSwigger: all XSS Apprentice labs + 3 Practitioner",
    "Attack your Express comments app with stored XSS, then fix it",
    "Write-up of the attack and the fix",
  ],
  explain: ["Why input validation alone doesn’t stop XSS"],
  ai: [
    "Here's my fixed Express route and template: [paste it]. Review it like a strict code reviewer: could XSS still get through? Ask me questions rather than giving the answer.",
    "Explain the difference between HTML, attribute, JavaScript and URL contexts for output encoding, with one example of each.",
  ],
};

export const accessControl = {
  id: "access-control",
  title: "Access control and IDOR",
  learn: ["Horizontal vs vertical privilege escalation", "IDOR", "Business logic flaws", "Burp Repeater and Intruder"],
  deliverables: [
    "PortSwigger: Access control Apprentice labs",
    "OWASP Juice Shop: solve 10 one- and two-star challenges",
    "Write-up of one IDOR",
  ],
  explain: ["Why hiding a button isn’t access control"],
  ai: [
    "Describe a made-up web app feature (for example, an invoices page) and ask me how I'd test it for IDOR. Then critique my test plan.",
    "Here's my IDOR write-up: [paste it]. Rate it the way a developer receiving it would: is the impact clear, are the steps reproducible, is the fix specific?",
  ],
};

export const ssrfFiles = {
  id: "ssrf-files",
  title: "SSRF, path traversal and file uploads",
  quiz: true,
  learn: ["SSRF and the Azure metadata endpoint", "Path traversal", "Unrestricted file upload", "Command injection"],
  deliverables: [
    "PortSwigger: SSRF, path traversal and file upload Apprentice labs",
    "Write-up: why SSRF is dangerous in Azure",
  ],
  explain: ["How SSRF plus a managed identity can lead to cloud compromise"],
  ai: [
    "Quiz me on SSRF, path traversal, file upload and command injection: give me a vulnerable scenario and I'll name the bug and the fix.",
    "Explain how the Azure Instance Metadata Service works and why an SSRF bug that reaches it is serious. Then ask me 2 questions.",
  ],
};

export const apiSecurity = {
  id: "api-security",
  title: "API security",
  learn: ["OWASP API Security Top 10", "BOLA, mass assignment, excessive data exposure", "Testing APIs with Postman and Burp", "Rate limiting"],
  deliverables: [
    "Run crAPI locally with Docker",
    "Find 5 vulnerabilities in crAPI, with write-ups",
    "PortSwigger: 2 API testing labs",
  ],
  explain: ["The difference between BOLA and BFLA"],
  ai: [
    "Here's an API response from crAPI: [paste it]. What data in it looks like excessive data exposure? Ask me first what I think.",
    "Give me one example request for each of the OWASP API Security Top 10, and I'll tell you which item it shows.",
  ],
};

export const secureCodeReview = {
  id: "secure-code-review",
  title: "Secure code review",
  learn: ["Sources, sinks and data flow", "Reviewing Python and JS for injection, auth and crypto issues", "Severity rating and CVSS basics", "Intro to Semgrep"],
  deliverables: [
    "Code review report on a vulnerable app: 5 findings with location, impact, severity and fix",
    "Run Semgrep on the same app and compare tool vs manual findings",
  ],
  explain: ["Why tools miss business logic bugs"],
  ai: [
    "Generate a 40-line Flask route with 2 hidden security bugs. Don't tell me where they are. I'll review it and you'll score my findings.",
    "Here's one of my findings: [paste it]. Rewrite nothing: tell me whether the severity I picked is right and why.",
  ],
};

export const semgrepRules = {
  id: "semgrep-rules",
  title: "Writing Semgrep rules",
  learn: ["Rule syntax: patterns, metavariables and taint mode", "False positives and tuning"],
  deliverables: ["Write 3 custom Semgrep rules", "Parallel track: send your first 5 applications"],
  explain: ["When to use pattern rules vs taint rules"],
  ai: [
    "Here's my Semgrep rule: [paste it]. Suggest 3 code samples it would wrongly flag and 3 it would miss, so I can tune it.",
    "Explain Semgrep taint mode with sources, sinks and sanitisers using one small Flask example.",
  ],
  project: P2,
};

export const gitActions = {
  id: "git-actions",
  title: "Git and GitHub Actions",
  learn: ["Branches, pull requests and review flow", "Workflows, jobs and secrets", "Running tests in CI"],
  deliverables: [
    "CI workflow on your P2 app that runs tests on every pull request",
    "Branch protection that requires CI to pass",
  ],
  explain: ["Why pipeline secrets are a high-value target"],
  ai: [
    "Here's my GitHub Actions workflow: [paste it]. Review it for security: permissions, pinned actions, secret handling and pull_request_target. Ask before suggesting changes.",
    "My workflow failed with this log: [paste the error lines]. Help me read the log and find the cause myself.",
  ],
};

export const sastSecrets = {
  id: "sast-secrets",
  title: "SAST and secrets scanning",
  learn: ["SAST in CI with Semgrep and CodeQL", "Secrets detection with gitleaks", "Pre-commit hooks", "SARIF and GitHub code scanning"],
  deliverables: [
    "Add Semgrep and CodeQL to the pipeline, failing on high severity",
    "Add gitleaks and a pre-commit hook",
    "Commit a fake secret and prove the pipeline blocks it",
  ],
  explain: ["How to roll out a scanner without drowning developers in noise"],
  ai: [
    "Play a frustrated developer whose pull request was blocked by a Semgrep finding. I'll practise explaining the issue and the fix without being preachy.",
    "Explain what SARIF is and how GitHub code scanning uses it, in under 150 words.",
  ],
};

export const depsContainers = {
  id: "deps-containers",
  title: "Dependencies and containers",
  quiz: true,
  learn: ["SCA, CVEs and SBOMs", "Dependabot, pip-audit and npm audit", "Docker basics and image hardening", "Trivy"],
  deliverables: [
    "Dockerise the P2 app with a non-root user and a minimal base image",
    "Add Trivy and dependency scanning to CI",
    "Generate an SBOM",
  ],
  explain: ["How to triage a critical CVE in a dependency you don’t call"],
  ai: [
    "Here's my Dockerfile: [paste it]. List what you'd harden, as questions, and explain the risk each change reduces.",
    "Give me a made-up Trivy report with 6 findings. I'll triage each one (fix now, fix later, accept) and you'll challenge my reasoning.",
  ],
};

export const cloudIac = {
  id: "cloud-iac",
  title: "Cloud and infrastructure as code",
  learn: ["Azure App Service or Container Apps", "Key Vault and managed identity", "Least-privilege RBAC", "Bicep or Terraform", "Checkov"],
  deliverables: [
    "Deploy the app to Azure using IaC",
    "Move secrets to Key Vault with a managed identity",
    "Add Checkov to CI",
  ],
  explain: ["Why managed identity beats connection strings"],
  ai: [
    "Here's my Bicep or Terraform file: [paste it, with any IDs or secrets removed]. Which settings would Checkov flag, and why does each matter?",
    "Explain managed identity to me as if I already understand service accounts on Windows Server.",
  ],
};

export const dastGates = {
  id: "dast-gates",
  title: "DAST and security gates",
  learn: ["OWASP ZAP baseline and full scans", "Authenticated scanning", "Security gates and exception processes"],
  deliverables: [
    "ZAP baseline scan against your deployed app in CI",
    "Triage the results into real issues and false positives, documented",
  ],
  explain: ["SAST vs DAST vs SCA: what each finds and misses"],
  ai: [
    "Here are 3 ZAP alerts from my scan: [paste the alert names and descriptions]. Help me decide which are real issues by asking me what I see in the app.",
    "Quiz me: describe a bug, and I'll say whether SAST, DAST or SCA would most likely find it.",
  ],
};

export const aiAppsec = {
  id: "ai-appsec",
  title: "AI-assisted AppSec and securing LLM apps",
  learn: [
    "Where AI coding assistants help, and where they confidently get it wrong",
    "The OWASP Top 10 for LLM Applications",
    "Direct and indirect prompt injection",
    "Excessive agency: least privilege for LLM tools and agents",
    "Keeping secrets and customer data out of prompts",
  ],
  deliverables: [
    "Ask an AI assistant to write a Flask file-upload endpoint, then review it like a stranger's pull request and list every issue",
    "Beat the first 5 levels of a free prompt-injection game such as Lakera's Gandalf",
    "PortSwigger: 2 Web LLM attacks labs",
    "One-page AI usage guardrails for a development team: what's allowed, what's never pasted, and how AI-written code gets reviewed",
  ],
  explain: [
    "Why a better system prompt can't fully fix prompt injection",
    "How an LLM with tool access turns prompt injection into a real vulnerability",
  ],
  ai: [
    "Write a Flask endpoint that accepts a file upload and saves it. Then, in a separate answer, review your own code for security issues. I'll compare your review with mine.",
    "Explain indirect prompt injection with an example of an email assistant that reads untrusted email. Then ask me how I'd limit the damage.",
  ],
};

export const threatModelling = {
  id: "threat-modelling",
  title: "Threat modelling",
  learn: ["Data flow diagrams and trust boundaries", "STRIDE", "OWASP Threat Dragon", "Turning threats into tickets"],
  deliverables: ["Threat model of your own app in Threat Dragon", "Parallel track: start applying to AppSec roles too"],
  explain: ["Each STRIDE letter with an example from your app"],
  ai: [
    "Here's a description of my app's data flow: [describe it]. Don't list threats for me. Ask me STRIDE questions about each trust boundary.",
    "Play a product manager who wants to skip the threat model to ship faster. I'll practise making the case in 2 minutes.",
  ],
  project: P3,
};

export const bscp1 = {
  id: "bscp-1",
  title: "BSCP preparation I",
  learn: ["Practitioner labs across SQLi, XSS, auth, access control and SSRF", "Exam format and methodology"],
  deliverables: ["Reach 25 Practitioner labs in total", "Build your own exam cheat sheet"],
  explain: ["Your methodology for a new target, in 3 steps"],
  ai: [
    "Here's my BSCP cheat sheet: [paste it]. What common exam topics are missing? Don't write payloads for me: just name the gaps.",
    "Give me a short description of a lab's behaviour, and I'll say which vulnerability class I'd test first and why.",
  ],
};

export const bscp2 = {
  id: "bscp-2",
  title: "BSCP preparation II",
  learn: ["Burp extensions and scanner", "Mystery labs", "Bug bounty and VDP scope rules"],
  deliverables: [
    "Complete 15 mystery labs",
    "Take the BSCP practice exam",
    "Pick one public VDP and read its scope fully",
  ],
  explain: ["What makes a test in scope or out of scope"],
  ai: [
    "Here's the scope section of a public VDP: [paste it]. Quiz me with 5 test ideas and I'll say whether each is in scope.",
    "I got stuck on a mystery lab. Here's what I tried: [describe it]. Give me a hint as a question, not the answer.",
  ],
};

export const examCv = {
  id: "exam-cv",
  title: "Exam and CV",
  quiz: true,
  learn: ["Writing CV bullets as security outcomes"],
  deliverables: [
    "Take the BSCP exam",
    "Rewrite your CV for AppSec and get it reviewed by a mentor or peer",
    "Update your LinkedIn headline and About section",
  ],
  explain: ["Your career story in 60 seconds"],
  ai: [
    "Here's a CV bullet: [paste it]. Ask me questions until it shows a security outcome with a number, then let me rewrite it.",
    "Listen to my 60-second career story: [paste it]. Tell me which sentence a hiring manager would remember, and which they'd forget.",
  ],
};

export const portfolioPolish = {
  id: "portfolio-polish",
  title: "Portfolio polish",
  learn: ["How hiring managers skim a GitHub profile"],
  deliverables: [
    "GitHub profile README pinning P1–P3",
    "At least 4 published write-ups",
    "Submit one valid VDP report or a security fix PR to open source",
  ],
  explain: ["Walk through P3 in 5 minutes"],
  ai: [
    "Here's my GitHub profile README: [paste it]. Pretend you're a hiring manager with 30 seconds. What do you notice, and what do you skip?",
    "Here's one of my write-ups: [paste it]. Mark anything that's unclear to a reader who wasn't there.",
  ],
};

export const interviewPrep = {
  id: "interview-prep",
  title: "Interview preparation",
  learn: ["Common AppSec interview questions", "Live code review exercises", "Threat modelling on a whiteboard"],
  deliverables: ["3 mock interviews with a peer or mentor", "Written answers to 30 common questions"],
  explain: ["How you’d secure a new feature from design to release"],
  ai: [
    "Run a 20-minute mock AppSec interview. Ask one question at a time, mix technical and behavioural, and give me feedback at the end.",
    "Show me a 30-line code snippet and give me 5 minutes to find the security bug, like a live interview exercise.",
  ],
};

export const capstone = {
  id: "capstone",
  title: "Capstone and applications",
  learn: ["Responsible disclosure etiquette"],
  deliverables: ["15+ targeted AppSec and adjacent applications sent"],
  explain: ["What you’d do in your first 90 days as an AppSec engineer"],
  ai: [
    "Here's a job advert: [paste it]. Help me map my P1–P4 projects to its requirements, and point out any gaps I should mention honestly.",
    "Here's my draft disclosure email to a maintainer: [paste it, without the exploit details]. Is it clear, polite and specific?",
  ],
  project: P4,
};
