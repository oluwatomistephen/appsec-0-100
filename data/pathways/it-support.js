import * as w from "../weeks/core.js";

// Phases are exported so the beginner pathway can reuse them after Phase 0.
export const itPhases = [
  {
    label: "Phase 1: Foundations",
    goal: "Read HTTP, Python and JavaScript like a second language.",
    weeks: [w.httpBasics, w.pythonSecurity, w.sessionsTokens, w.oauthOidc, w.jsBrowser, w.owaspSqli],
  },
  {
    label: "Phase 2: Break and review",
    goal: "Find real vulnerabilities in running apps and in source code.",
    weeks: [w.xss, w.accessControl, w.ssrfFiles, w.apiSecurity, w.secureCodeReview, w.semgrepRules],
  },
  {
    label: "Phase 3: DevSecOps",
    goal: "Build the security pipeline an AppSec team would run, including for apps that call an LLM.",
    weeks: [w.gitActions, w.sastSecrets, w.depsContainers, w.cloudIac, w.dastGates, w.aiAppsec, w.threatModelling],
  },
  {
    label: "Phase 4: Certify and land",
    goal: "Prove it with BSCP, a portfolio and interviews.",
    weeks: [w.bscp1, w.bscp2, w.examCv, w.portfolioPolish, w.interviewPrep, w.capstone],
  },
];

export default {
  id: "it-support",
  name: "IT support / sysadmin",
  who: "You already run identity, cloud or networks: Entra ID, Azure, Microsoft 365, firewalls or a help desk queue.",
  why: "Builds on what you know about identity, OAuth, cloud admin and networking, and adds the code and testing skills AppSec needs.",
  hours: "15–20",
  heading: "From IT support to AppSec engineer in {weeks} weeks.",
  intro: [
    "Each week has things to learn, deliverables to tick off, and “can I explain it?” checks. Only tick an explain check when you can say it out loud without notes.",
    "Paced for roughly 15–20 hours a week. If your hours change, stretch the plan rather than skipping weeks: the order matters more than the pace.",
  ],
  track: "From week 12, apply to adjacent roles every week: junior security engineer, vulnerability management, DevSecOps and cloud or IAM security. Add AppSec roles from week 19.",
  phases: itPhases,
};
