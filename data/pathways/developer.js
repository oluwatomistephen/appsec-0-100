import * as d from "../weeks/developer.js";
import * as w from "../weeks/core.js";

export default {
  id: "developer",
  name: "Software developer",
  who: "You write code for a living and ship features. You know your framework, but not how attackers see it.",
  why: "Skips programming basics and reframes every project around securing code you already know how to write.",
  hours: "10–15",
  heading: "From software developer to AppSec engineer in {weeks} weeks.",
  intro: [
    "Each week has things to learn, deliverables to tick off, and “can I explain it?” checks. Only tick an explain check when you can say it out loud without notes.",
    "You already know how to build. This plan teaches you to break what you build, then to make the secure way the easy way for your team.",
  ],
  note: {
    title: "The most common route",
    body: [
      "Most developers move into AppSec **internally**. They become their team's **security champion**, the person who reviews risky pull requests and runs threat models, and then move across when an AppSec role opens.",
      "So use your day job: every week, look for one way to apply what you learned to your team's real code.",
    ],
  },
  track: "From week 3, tell your team you're happy to look at security questions and risky pull requests. From week 13, apply for internal AppSec roles and send targeted external applications.",
  phases: [
    {
      label: "Phase 1: Think like an attacker",
      goal: "See your own apps the way an attacker does, and get identity right.",
      weeks: [d.devWebSecurity, d.devAuth],
    },
    {
      label: "Phase 2: Break your own stack",
      goal: "Exploit the big vulnerability classes, then fix them in the frameworks you use.",
      weeks: [d.devXss, d.devInjection, d.devAccessSsrf, d.devApi],
    },
    {
      label: "Phase 3: Review and automate",
      goal: "Review code like an AppSec engineer and build the pipeline that catches what reviews miss.",
      weeks: [d.devCodeReview, d.devSemgrep, d.devPipeline, w.depsContainers, d.devDastIac, w.aiAppsec, d.devThreatModelling],
    },
    {
      label: "Phase 4: Certify and move",
      goal: "Prove it with BSCP, become a security champion, and make the move.",
      weeks: [w.bscp1, w.bscp2, d.devChampion, d.devCapstone],
    },
  ],
};
