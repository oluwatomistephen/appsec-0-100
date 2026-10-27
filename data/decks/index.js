// Every learning card deck. To add one: create a file in this folder, import it
// here, and set `deck: "<its id>"` on the week it belongs to.

import webBasics from "./web-basics.js";
import pythonSecurity from "./python-security.js";
import sessionsTokens from "./sessions-tokens.js";
import entraVsRbac from "./entra-vs-rbac.js";

export const decks = [webBasics, pythonSecurity, sessionsTokens, entraVsRbac];
