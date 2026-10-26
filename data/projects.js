// Checkpoint projects P0–P4. P1–P3 have variants per pathway so each one fits
// that pathway's level and stack; P4 is shared.

export const P0 = {
  code: "P0",
  name: "Personal site, secured",
  desc: "Your site from the HTML, CSS and JavaScript weeks, published and hardened, with a write-up of every security choice.",
  items: [
    "Site published on GitHub Pages",
    "The to-do list uses textContent, never innerHTML",
    "A Content Security Policy meta tag that blocks inline scripts, with no violations in the console",
    "Python script that fetches your live site and prints its status code and headers",
    "README explaining what you built and what each security choice protects against",
  ],
};

export const P1 = {
  code: "P1",
  name: "HeaderHunter",
  desc: "A Python CLI that scans a list of sites and reports missing security headers and insecure cookie flags, with severity ratings.",
  items: [
    "CLI with --input and --output flags",
    "Cookie checks for Secure, HttpOnly and SameSite",
    "Markdown report output",
    "README with usage and screenshots",
    "Blog post: what I learned in phase 1",
  ],
};

export const P1_DEV = {
  code: "P1",
  name: "HeaderHunter",
  desc: "A CLI in your strongest language that scans a list of sites and reports missing security headers and insecure cookie flags, built the way you'd build production code.",
  items: [
    "CLI with --input and --output flags",
    "Cookie checks for Secure, HttpOnly and SameSite",
    "Markdown report output",
    "Unit tests and a linter that run on every push",
    "README with usage, plus a short post on what you learned",
  ],
};

export const P1_SOC = {
  code: "P1",
  name: "HeaderHunter",
  desc: "A Python CLI that scans a list of sites and reports missing security headers and insecure cookie flags. You've written scripts before: this time, write it like a developer would.",
  items: [
    "CLI with --input and --output flags",
    "Cookie checks for Secure, HttpOnly and SameSite",
    "Markdown report output",
    "Type hints and pytest tests for every check",
    "README with usage and screenshots",
  ],
};

export const P2 = {
  code: "P2",
  name: "Build it, break it, fix it",
  desc: "A Flask app with 5 planted vulnerabilities: SQLi, stored XSS, IDOR, SSRF and broken authentication.",
  items: [
    "Vulnerable branch with all 5 issues",
    "Exploit write-up for each, with Burp screenshots",
    "Fixed branch with each fix explained",
    "Custom Semgrep rules that catch each issue",
    "README framing it as a case study",
  ],
};

export const P2_DEV = {
  code: "P2",
  name: "Build it, break it, fix it",
  desc: "An app in the framework you use at work, with 5 planted vulnerabilities: SQLi, stored XSS, IDOR, SSRF and broken authentication.",
  items: [
    "Vulnerable branch with all 5 issues",
    "Exploit write-up for each, with Burp screenshots",
    "Fixed branch with each fix explained and a regression test that fails on the vulnerable branch",
    "Custom Semgrep rules that catch each issue",
    "README framing it as a case study",
  ],
};

export const P2_SOC = {
  code: "P2",
  name: "Build it, break it, fix it",
  desc: "A Spring Boot app with 5 planted vulnerabilities: SQLi, stored XSS, IDOR, SSRF and broken authentication.",
  items: [
    "Vulnerable branch with all 5 issues",
    "Exploit write-up for each, with Burp screenshots",
    "Fixed branch with each fix explained as a developer would want it",
    "Custom Semgrep rules that catch each issue",
    "README framing it as a case study",
  ],
};

export const P3 = {
  code: "P3",
  name: "Secure pipeline",
  desc: "Your P2 app deployed to Azure behind a full DevSecOps pipeline.",
  items: [
    "Pipeline runs tests, Semgrep, CodeQL, gitleaks, SCA, Trivy, Checkov and ZAP",
    "Secrets in Key Vault, least-privilege RBAC",
    "Threat model with mitigations mapped to controls",
    "Architecture diagram",
    "SECURITY.md and a blog post walking through it",
  ],
};

export const P3_PIPELINE = {
  code: "P3",
  name: "Secure pipeline",
  desc: "Your P2 app, containerised, behind a full DevSecOps pipeline and documented so another team could copy it.",
  items: [
    "Pipeline runs tests, Semgrep, CodeQL, gitleaks, SCA, Trivy, Checkov and ZAP",
    "No secrets in the repo, and the pipeline's token has least-privilege permissions",
    "Threat model with mitigations mapped to controls",
    "Architecture diagram",
    "SECURITY.md and a blog post walking through it",
  ],
};

export const P4 = {
  code: "P4",
  name: "Open-source security review",
  desc: "Pick a small open-source web app and review it like an AppSec engineer would.",
  items: [
    "Threat model",
    "Manual code review plus Semgrep findings",
    "Responsible disclosure or a PR that fixes an issue",
    "Final report published as your flagship write-up",
  ],
};

export const P4_DEV = {
  code: "P4",
  name: "Open-source security review",
  desc: "Pick a small open-source web app in a stack you know and review it like an AppSec engineer would, then fix what you find.",
  items: [
    "Threat model",
    "Manual code review plus Semgrep findings",
    "A pull request that fixes a security issue, with a regression test (or a responsible disclosure if it's serious)",
    "Final report published as your flagship write-up",
  ],
};
