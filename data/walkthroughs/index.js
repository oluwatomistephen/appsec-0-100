// Every tool walkthrough. To add one: create a file in this folder, import it
// here, and add its id to `walkthroughs: [...]` on the weeks that use the tool.

import vscodeTerminal from "./vscode-terminal.js";
import aiTutor from "./ai-tutor.js";
import githubRepo from "./github-repo.js";
import devtoolsNetwork from "./devtools-network.js";
import pythonVenv from "./python-venv.js";

export const walkthroughs = [vscodeTerminal, aiTutor, githubRepo, devtoolsNetwork, pythonVenv];
