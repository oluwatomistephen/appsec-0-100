// Weeks written for the software developer pathway. Projects are about
// securing code you already know how to write.

import { P1_DEV, P2_DEV, P3_PIPELINE, P4_DEV } from "../projects.js";

export const devWebSecurity = {
  id: "dev-web-security",
  title: "Web security for builders",
  deck: "web-basics",
  learn: [
    "HTTP from the attacker's side: everything in a request is user-controlled",
    "Same-origin policy, CORS and cookie flags (Secure, HttpOnly, SameSite)",
    "Security headers and what each one does",
    "The OWASP Top 10, mapped to code you've written",
    "Burp Suite Community as a proxy for your own apps",
  ],
  deliverables: [
    "Create a GitHub repo called appsec-journey with a README stating your goal",
    "Proxy one of your own local apps through Burp and send a request its UI would never let you send",
    "PortSwigger: 3 Apprentice labs from different topics",
    "Add security headers to one of your apps and verify them with `curl -I`",
  ],
  explain: ["Why client-side validation is UX, not security", "What SameSite=Lax does and doesn't stop"],
  ai: [
    "I'm a developer moving into AppSec. For each OWASP Top 10 category, show me a 5-line example in [your language] of how I might accidentally write it. Don't explain the fix yet.",
    "Here's a request I captured from my own app in Burp: [paste it, with tokens replaced by XXX]. Which parts would an attacker change first, and why?",
  ],
};

export const devAuth = {
  id: "dev-auth",
  title: "Sessions, OAuth 2.0 and OpenID Connect",
  learn: [
    "Session cookies vs JWTs, and when each fits",
    "Password storage with Argon2id or bcrypt",
    "OAuth 2.0 authorization code flow with PKCE",
    "ID tokens vs access tokens, scopes and redirect URI validation",
    "Common JWT mistakes: `alg: none`, weak secrets and missing audience checks",
  ],
  deliverables: [
    "Add login to a small app with a well-known library (for example Auth.js, Spring Security or ASP.NET Core Identity) and an OpenID Connect provider",
    "Write a test that proves a token issued for a different audience is rejected",
    "PortSwigger: 2 JWT labs and 2 OAuth labs",
    "Draw the auth code + PKCE flow from memory",
  ],
  explain: ["Why PKCE exists", "Where authentication ends and authorisation starts in your own app's code"],
  ai: [
    "Here's my token validation code: [paste it]. List every claim it should check, and ask me which ones my code actually checks.",
    "Explain why rolling your own JWT library is risky, using 3 real classes of bug as examples.",
  ],
};

export const devXss = {
  id: "dev-xss",
  title: "Cross-site scripting and output encoding",
  learn: [
    "Reflected, stored and DOM XSS",
    "How your framework escapes output, and the escape hatches that skip it (`dangerouslySetInnerHTML`, `v-html`, `|safe`, `th:utext`)",
    "Context-aware encoding",
    "Content Security Policy and Trusted Types",
  ],
  deliverables: [
    "PortSwigger: all XSS Apprentice labs + 3 Practitioner",
    "Search a codebase you know for your framework's escape hatches and review every hit",
    "Add a strict Content Security Policy to one of your apps and fix every violation",
  ],
  explain: ["Why sanitising input alone doesn't stop XSS", "What Trusted Types enforce"],
  ai: [
    "List the functions and template features in [your framework] that bypass output encoding. For each, show a safe alternative.",
    "Here's a CSP violation from my console: [paste it]. Help me work out whether to change the code or the policy, and why.",
  ],
};

export const devInjection = {
  id: "dev-injection",
  title: "Injection: SQL, NoSQL and commands",
  learn: [
    "How string-built queries become SQL injection",
    "Parameterised queries, and where ORMs still let you inject (raw queries, dynamic ORDER BY)",
    "NoSQL injection",
    "OS command injection and safe subprocess APIs",
  ],
  deliverables: [
    "PortSwigger: all SQL injection Apprentice labs",
    "Find 3 raw or string-built queries in a codebase you know and rewrite them safely",
    "Run OWASP Juice Shop and solve its coding challenge for the admin login SQL injection",
  ],
  explain: ["Why parameterised queries stop SQLi", "Why using an ORM doesn't make you immune"],
  ai: [
    "Show me 4 ways to build a query in [your ORM], from safest to most dangerous. Ask me to spot which ones are injectable.",
    "Explain why you can't parameterise a column name in ORDER BY, and what to do instead.",
  ],
  project: P1_DEV,
};

export const devAccessSsrf = {
  id: "dev-access-ssrf",
  title: "Access control and SSRF",
  learn: [
    "IDOR and broken object-level authorisation",
    "Centralising authorisation in middleware, policies or guards",
    "Deny by default",
    "SSRF, cloud metadata endpoints and allow-lists",
  ],
  deliverables: [
    "PortSwigger: Access control and SSRF Apprentice labs",
    "Add a test to one of your apps that proves user A can't read user B's data",
    "Write-up: where authorisation checks live in your framework, and how you'd make them hard to forget",
  ],
  explain: ["Why hiding a button isn't access control", "Why a deny-list of internal IP addresses fails against SSRF"],
  ai: [
    "Here's a controller from my app: [paste it, with anything sensitive removed]. Ask me, endpoint by endpoint, who should be allowed to call it and where that's enforced.",
    "Explain the different ways an SSRF filter based on hostnames can be bypassed, at a conceptual level, and why an allow-list is safer.",
  ],
};

export const devApi = {
  id: "dev-api",
  title: "API security",
  quiz: true,
  learn: [
    "OWASP API Security Top 10",
    "BOLA, BFLA and mass assignment",
    "Rate limiting and pagination limits",
    "Validating requests and responses against a schema",
  ],
  deliverables: [
    "Run crAPI locally with Docker and find 5 vulnerabilities, with write-ups",
    "Fix mass assignment in an API you've built, using an explicit allow-list or DTO",
    "PortSwigger: 2 API testing labs",
  ],
  explain: ["The difference between BOLA and BFLA"],
  ai: [
    "Here's an API endpoint and the model it binds to: [paste it]. Is it vulnerable to mass assignment? Ask me what fields a user should be able to set first.",
    "Give me one example request for each of the OWASP API Security Top 10, and I'll tell you which item it shows.",
  ],
};

export const devCodeReview = {
  id: "dev-code-review",
  title: "Secure code review",
  learn: [
    "Sources, sinks and tracing data flow",
    "A review checklist for auth, input handling, crypto and error handling",
    "Severity, CVSS basics and writing a finding a developer will act on",
    "Reviewing AI-generated code",
  ],
  deliverables: [
    "Review one real pull request at work or in an open-source project with a security lens, and leave constructive comments",
    "Code review report on a deliberately vulnerable app: 5 findings with location, impact, severity and fix",
    "Offer to be the security reviewer on your team for one sprint",
  ],
  explain: ["Why tools miss business logic bugs"],
  ai: [
    "Generate a 40-line [your language] API handler with 2 hidden security bugs. Don't tell me where they are. Score my review afterwards.",
    "Here's a security comment I want to leave on a colleague's pull request: [paste it]. Make sure it's specific and kind, without softening the risk.",
  ],
};

export const devSemgrep = {
  id: "dev-semgrep",
  title: "Semgrep and custom rules",
  learn: [
    "Running Semgrep locally and in CI",
    "Rule syntax: patterns, metavariables and taint mode",
    "Tuning out false positives",
  ],
  deliverables: [
    "Run Semgrep on a codebase you know and triage every finding",
    "Write 3 custom rules for mistakes your team actually makes",
  ],
  explain: ["When to use pattern rules vs taint rules"],
  ai: [
    "Here's a bug pattern my team keeps writing: [describe it]. Help me sketch a Semgrep rule for it, but let me write the final YAML.",
    "Here's my Semgrep rule: [paste it]. Suggest 3 code samples it would wrongly flag and 3 it would miss.",
  ],
  project: P2_DEV,
};

export const devPipeline = {
  id: "dev-pipeline",
  title: "The DevSecOps pipeline: SAST and secrets",
  learn: [
    "GitHub Actions: workflows, permissions and secrets",
    "SAST with Semgrep and CodeQL",
    "Secrets detection with gitleaks and pre-commit hooks",
    "SARIF and code scanning alerts",
    "Pinning actions to commit SHAs and keeping GITHUB_TOKEN least-privilege",
  ],
  deliverables: [
    "CI on your P2 app that runs tests, Semgrep and CodeQL on every pull request",
    "Add gitleaks in CI and as a pre-commit hook",
    "Commit a fake secret on a branch and prove the pipeline blocks it",
  ],
  explain: ["Why pipeline secrets are a high-value target", "How to roll out a scanner without drowning developers in noise"],
  ai: [
    "Here's my GitHub Actions workflow: [paste it]. Review it for security: permissions, pinned actions, secrets and pull_request_target. Ask before suggesting changes.",
    "Play a senior developer who thinks security scanners slow the team down. I'll practise making the case for one scanner in 2 minutes.",
  ],
};

export const devDastIac = {
  id: "dev-dast-iac",
  title: "DAST, IaC scanning and security gates",
  learn: [
    "OWASP ZAP baseline and authenticated scans",
    "Infrastructure as code scanning with Checkov",
    "Security gates, severity thresholds and exception processes",
  ],
  deliverables: [
    "ZAP baseline scan against your containerised P2 app in CI",
    "Add Checkov for your Dockerfile and any infrastructure as code",
    "Write a one-page exception process: who can accept a risk, for how long, and how it's tracked",
  ],
  explain: ["SAST vs DAST vs SCA: what each finds and misses"],
  ai: [
    "Here are 3 ZAP alerts from my scan: [paste the alert names and descriptions]. Help me decide which are real by asking me what I see in the app.",
    "Critique my risk exception process: [paste it]. Where could a team abuse it to never fix anything?",
  ],
};

export const devThreatModelling = {
  id: "dev-threat-modelling",
  title: "Threat modelling with your team",
  learn: [
    "Data flow diagrams and trust boundaries",
    "STRIDE",
    "Running a 45-minute threat model with your team",
    "Turning threats into tickets",
  ],
  deliverables: [
    "Threat model a feature your team is building next, in OWASP Threat Dragon",
    "Run it as a session with at least one teammate",
    "File the top 3 threats as tickets with clear acceptance criteria",
  ],
  explain: ["Each STRIDE letter with an example from your app"],
  ai: [
    "Here's a description of a feature we're building: [describe it, without confidential details]. Ask me STRIDE questions about each trust boundary. Don't list the threats for me.",
    "Help me plan a 45-minute threat modelling session for 4 developers who have never done one: agenda, questions and what to write down.",
  ],
  project: P3_PIPELINE,
};

export const devChampion = {
  id: "dev-champion",
  title: "Exam and security champion",
  quiz: true,
  learn: [
    "What a security champion does, day to day",
    "How internal moves into AppSec usually happen",
    "Writing CV bullets as security outcomes",
  ],
  deliverables: [
    "Take the BSCP exam",
    "Ask your manager or AppSec team about joining or starting a security champions programme",
    "Rewrite your CV and LinkedIn around the security outcomes of your projects and day job",
    "GitHub profile README pinning P1–P3 and at least 3 published write-ups",
  ],
  explain: ["Your career story in 60 seconds", "One change you'd make to your team's process tomorrow, and why"],
  ai: [
    "Help me write a short message to my manager asking to become our team's security champion. Ask me about my team first.",
    "Here's a CV bullet from my developer CV: [paste it]. Ask me questions until it shows a security outcome, then let me rewrite it.",
  ],
};

export const devCapstone = {
  id: "dev-capstone",
  title: "Interviews and capstone",
  learn: ["Common AppSec interview questions", "Live code review exercises", "Threat modelling on a whiteboard"],
  deliverables: [
    "3 mock interviews with a peer or mentor",
    "Written answers to 30 common questions",
    "Apply for internal AppSec roles, and send 10+ targeted external applications",
  ],
  explain: ["How you'd secure a new feature from design to release"],
  ai: [
    "Run a 20-minute mock AppSec interview for a developer moving into security. One question at a time, then feedback.",
    "Show me a 30-line code snippet and give me 5 minutes to find the security bug, like a live interview exercise.",
  ],
  project: P4_DEV,
};
