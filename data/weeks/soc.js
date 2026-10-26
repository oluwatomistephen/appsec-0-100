// Weeks written for the SOC analyst / pentester pathway. Offensive web basics
// are compressed into a fast audit; the time saved goes on programming depth,
// code review, DevSecOps and writing fixes developers can use.

import { P1_SOC, P2_SOC, P3_PIPELINE, P4 } from "../projects.js";

export const socAudit1 = {
  id: "soc-audit-1",
  title: "Practitioner audit I: server-side",
  deck: "web-basics",
  learn: [
    "A gap check against PortSwigger's server-side topics",
    "SQL injection, authentication, path traversal, command injection and SSRF",
    "A repeatable methodology: recon, mapping, testing, writing up",
  ],
  deliverables: [
    "Create a GitHub repo called appsec-journey with a README stating your goal",
    "Solve 2 Practitioner labs in each of SQL injection, authentication, SSRF and path traversal without looking at hints",
    "Keep a gap list of every lab where you needed a hint",
  ],
  explain: ["Your methodology for a new target, in 3 steps"],
  ai: [
    "Here's my gap list from this week's labs: [paste it]. Turn it into a study plan for the next 2 weeks, without giving me any lab solutions.",
    "I'm a pentester moving into AppSec. Explain how the job's day-to-day differs from pentesting, and which of my habits will help or hurt.",
  ],
};

export const socAudit2 = {
  id: "soc-audit-2",
  title: "Practitioner audit II: client-side and access control",
  learn: ["XSS, CSRF, CORS and clickjacking", "Access control and IDOR", "JWT and OAuth attacks"],
  deliverables: [
    "Solve 2 Practitioner labs in each of XSS, CSRF, access control and JWT",
    "Write up your Burp Repeater and Intruder workflow as notes someone else could follow",
  ],
  explain: ["Why CSRF tokens work, and when SameSite isn't enough"],
  ai: [
    "Quiz me on client-side bugs: describe a feature and its defences, and I'll say whether it's vulnerable to XSS, CSRF or clickjacking.",
    "Here are my Burp workflow notes: [paste them]. What would a beginner misunderstand?",
  ],
};

export const socAudit3 = {
  id: "soc-audit-3",
  title: "Practitioner audit III: APIs and reporting",
  quiz: true,
  learn: [
    "OWASP API Security Top 10",
    "Testing APIs with Burp and Postman",
    "Writing findings developers act on: impact, reproduction steps and the fix",
  ],
  deliverables: [
    "Run crAPI locally with Docker and find 5 vulnerabilities",
    "Rewrite one of your old pentest or SOC findings so it includes a code-level fix",
  ],
  explain: ["The difference between BOLA and BFLA"],
  ai: [
    "Here's an old finding of mine with the client details removed: [paste it]. Ask me questions until it includes a specific, code-level fix a developer could start today.",
    "Give me one example request for each of the OWASP API Security Top 10, and I'll name the item.",
  ],
  project: P1_SOC,
};

export const socPython = {
  id: "soc-python",
  title: "Python beyond scripts",
  learn: ["Packages, modules and project layout", "Classes and type hints", "Testing with pytest", "Flask: routes, templates and request handling"],
  deliverables: [
    "Refactor one of your old security scripts into a package with tests",
    "Flask app with register, login and logout using hashed passwords",
    "15 exercises on the exercism.org Python track",
  ],
  explain: ["How Flask turns an HTTP request into a function call"],
  ai: [
    "Here's an old security script of mine: [paste it]. Don't rewrite it. Tell me how a developer would structure it, as a list of questions for me to answer.",
    "Explain Python type hints and why they help in larger codebases, with a before-and-after example.",
  ],
};

export const socJavascript = {
  id: "soc-javascript",
  title: "JavaScript, Node and Express",
  learn: [
    "Modern JavaScript: modules, promises and async/await",
    "The DOM and how front-end frameworks render",
    "Node.js and Express: routing and middleware",
    "npm and the dependency tree",
  ],
  deliverables: [
    "Express app with a form that saves and lists comments (no security yet: you'll attack and fix it later)",
    "Read the source of one Express middleware you've seen in tests, such as cors or helmet",
    "Write-up: how middleware order can create a security bug",
  ],
  explain: ["Why CORS doesn't protect your server"],
  ai: [
    "I can read JavaScript payloads but not apps. Walk me through how an Express request flows through middleware to a route, with a tiny example.",
    "Here's the source of an Express middleware: [paste a short one]. Ask me what each part does before you explain it.",
  ],
};

export const socJava1 = {
  id: "soc-java-1",
  title: "Java I: the language",
  learn: [
    "Types, classes and interfaces",
    "Collections and generics",
    "Exceptions",
    "Maven or Gradle builds",
    "Running and debugging in IntelliJ IDEA Community Edition",
  ],
  deliverables: [
    "20 exercises on the exercism.org Java track",
    "Command-line Java tool that parses a log file and counts failed logins by IP address",
    "Write-up: 5 things that surprised you coming from Python",
  ],
  explain: ["What a checked exception is"],
  ai: [
    "I know Python. Show me the Java equivalents of a dict, a list comprehension and a class, side by side, then give me 3 exercises.",
    "My Java code won't compile: [paste the error and code]. Explain what the compiler is telling me, but don't fix it.",
  ],
};

export const socJava2 = {
  id: "soc-java-2",
  title: "Java II: Spring Boot",
  learn: [
    "Spring Boot: controllers, services and repositories",
    "Spring Data JPA and how it builds queries",
    "Spring Security basics: the filter chain, authentication and method security",
    "Configuration and profiles",
  ],
  deliverables: [
    "Spring Boot REST API with two entities and login",
    "Add an endpoint that builds a native query by string concatenation, exploit it, then fix it",
    "Run OWASP WebGoat locally and complete 3 lessons",
  ],
  explain: ["Where authorisation happens in a Spring app"],
  ai: [
    "Explain the Spring Security filter chain as a series of checkpoints at an airport. Then ask me where a missing check would let an attacker through.",
    "Here's my Spring controller: [paste it]. Ask me who should be allowed to call each endpoint, and where that's enforced.",
  ],
};

export const socFrameworkCode = {
  id: "soc-framework-code",
  title: "Reading framework code",
  quiz: true,
  learn: [
    "Finding routes, entry points and middleware in an unfamiliar codebase",
    "How frameworks handle templates, ORM queries and sessions",
    "Following data from the request to the database",
    "Using an AI assistant to summarise a codebase, then checking it",
  ],
  deliverables: [
    "Map every route and its authorisation check in an open-source Express or Spring app",
    "Trace one user input from request to database in that app, and diagram it",
    "Compare your map with an AI summary of the same repo, and note what the AI got wrong",
  ],
  explain: ["How you'd find all the unauthenticated endpoints in a codebase"],
  ai: [
    "Here's the folder structure of an open-source app: [paste the tree]. Which files would you read first to find its routes and auth checks? Explain why, then let me check.",
    "Summarise how authentication works in this file: [paste a public file]. I'll compare your answer with my own reading.",
  ],
};

export const socSdlc = {
  id: "soc-sdlc",
  title: "The secure SDLC",
  learn: [
    "Where security fits in planning, design, build, test, release and operations",
    "Security requirements and abuse cases",
    "OWASP SAMM and ASVS",
    "How a SOC alert should flow back to the developers who can fix the cause",
  ],
  deliverables: [
    "Map an incident you've investigated (or a public post-mortem) to the SDLC stage where it could have been caught",
    "Write 5 ASVS-based security requirements for a login feature",
    "Write 3 abuse cases for a password-reset flow",
  ],
  explain: ["Why fixing a bug in design is cheaper than fixing it in production"],
  ai: [
    "Here's a public post-mortem: [paste a summary]. Ask me which SDLC stage could have caught it, and what control would have done it.",
    "Review my abuse cases for a password-reset flow: [paste them]. What attacker goals did I miss?",
  ],
};

export const socCodeReview = {
  id: "soc-code-review",
  title: "Secure code review",
  learn: [
    "Sources, sinks and data flow",
    "Reviewing Python, JavaScript and Java for injection, auth and crypto issues",
    "Severity rating and CVSS",
    "Intro to Semgrep",
  ],
  deliverables: [
    "Attack your Express comments app with stored XSS, then fix it",
    "Code review report on a deliberately vulnerable app: 5 findings with location, impact, severity and fix",
    "Run Semgrep on the same app and compare the tool's findings with yours",
  ],
  explain: ["Why tools miss business logic bugs"],
  ai: [
    "Generate a 40-line Spring controller with 2 hidden security bugs. Don't say where they are. Score my review afterwards.",
    "Here's one of my review findings: [paste it]. Is the severity right? Argue the other side so I can defend it.",
  ],
};

export const socSemgrep = {
  id: "soc-semgrep",
  title: "Semgrep rules",
  learn: ["Rule syntax: patterns, metavariables and taint mode", "Writing rules for Java and JavaScript", "False positives and tuning"],
  deliverables: ["Write 3 custom Semgrep rules, including at least one for Java", "Parallel track: send your first 5 applications"],
  explain: ["When to use pattern rules vs taint rules"],
  ai: [
    "Explain Semgrep taint mode with sources, sinks and sanitisers using a small Spring example.",
    "Here's my Semgrep rule: [paste it]. Suggest 3 code samples it would wrongly flag and 3 it would miss.",
  ],
  project: P2_SOC,
};

export const socFixWriting = {
  id: "soc-fix-writing",
  title: "Writing fixes, not just findings",
  learn: [
    "What developers need from a finding",
    "Writing a fix as a pull request with a test",
    "Prioritising by exploitability and business impact",
    "Talking about risk without blame",
  ],
  deliverables: [
    "Turn 3 of your P2 findings into pull requests with fixes and regression tests",
    "Rewrite one old finding as a ticket a developer could finish in a day",
    "Walk a developer friend or study partner through one finding, and ask what was unclear",
  ],
  explain: ["The difference between a finding and a fix"],
  ai: [
    "Play a busy developer receiving my finding: [paste it]. Push back the way a real developer would, so I can practise responding.",
    "Here's my fix pull request description: [paste it]. Would a reviewer understand the risk, the fix and how it's tested?",
  ],
};

export const socThreatModelling = {
  id: "soc-threat-modelling",
  title: "Threat modelling",
  learn: ["Data flow diagrams and trust boundaries", "STRIDE", "OWASP Threat Dragon", "Turning threats into tickets and detections"],
  deliverables: [
    "Threat model your P2 app in OWASP Threat Dragon",
    "For each top threat, note the detection you'd want in the SOC as well as the fix",
    "Parallel track: start applying to AppSec roles too",
  ],
  explain: ["Each STRIDE letter with an example from your app"],
  ai: [
    "Here's my P2 app's data flow: [describe it]. Ask me STRIDE questions about each trust boundary. Don't list the threats for me.",
    "For a threat like 'stolen session token', ask me what fix and what detection I'd recommend, then challenge my answer.",
  ],
  project: P3_PIPELINE,
};

export const socBscp = {
  id: "soc-bscp",
  title: "BSCP exam",
  learn: ["Exam format and timing strategy", "Mystery labs", "Bug bounty and VDP scope rules"],
  deliverables: [
    "Complete 15 mystery labs",
    "Take the BSCP practice exam, then the real exam",
    "Pick one public VDP and read its scope fully",
  ],
  explain: ["What makes a test in scope or out of scope"],
  ai: [
    "Help me plan my time for a 4-hour practical exam with 2 apps and 3 stages each. Ask me where I usually lose time first.",
    "Here's the scope section of a public VDP: [paste it]. Quiz me with 5 test ideas and I'll say whether each is in scope.",
  ],
};

export const socCapstone = {
  id: "soc-capstone",
  title: "Portfolio, interviews and applications",
  quiz: true,
  learn: ["Writing CV bullets as security outcomes", "Common AppSec interview questions", "Live code review exercises"],
  deliverables: [
    "Rewrite your CV and LinkedIn for AppSec and get them reviewed by a mentor or peer",
    "GitHub profile README pinning P1–P3 and at least 4 published write-ups",
    "3 mock interviews with a peer or mentor",
    "15+ targeted AppSec applications sent",
  ],
  explain: ["Your career story in 60 seconds", "What you'd do in your first 90 days as an AppSec engineer"],
  ai: [
    "Here's my CV, with personal details removed: [paste it]. It reads like a pentester's. Ask me questions that help me show developer-facing work.",
    "Run a 20-minute mock AppSec interview for someone moving from a SOC or pentesting role. One question at a time, then feedback.",
  ],
  project: P4,
};
