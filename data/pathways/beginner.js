import * as f from "../weeks/foundations.js";
import { itPhases } from "./it-support.js";

export default {
  id: "beginner",
  name: "Complete beginner",
  who: "You're new to tech. You've never written code or worked in IT, and that's fine.",
  why: "Twelve weeks of tool-first foundations, then the full IT support plan.",
  hours: "12–15",
  heading: "From complete beginner to AppSec engineer in {weeks} weeks.",
  intro: [
    "Each week has things to learn, deliverables to tick off, and “can I explain it?” checks. Only tick an explain check when you can say it out loud without notes.",
    "You'll learn by using the real tools from day one, with an AI assistant as your tutor. The AI can explain anything, but the explain checks are how you know the understanding is yours.",
  ],
  note: {
    title: "An honest note before you start",
    body: [
      "At 12–15 hours a week, this is a **9–12 month journey**. That's normal, not slow: AppSec is a senior-leaning job built on top of other skills.",
      "Most people get here through a first role in **help desk, a SOC or junior development**. Taking one of those along the way is a common and sensible stepping stone, not a detour. The plan keeps working if you do.",
    ],
  },
  track: "From week 8, start looking at help desk, SOC analyst and junior developer roles: a first job in tech is a sensible stepping stone. From week 25, apply to adjacent security roles every week, and add AppSec roles from week 32.",
  phases: [
    {
      label: "Phase 0: Tech foundations",
      goal: "Get comfortable with the machines, networks and code that AppSec is built on, using real tools from day one.",
      weeks: [
        f.toolkit, f.linux1, f.linux2, f.networking, f.httpWeb, f.python1, f.python2,
        f.gitGithub, f.htmlCss, f.javascriptBasics, f.securityFundamentals, f.foundationsCheckpoint, f.securityPlus,
      ],
    },
    ...itPhases,
  ],
};
