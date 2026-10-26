// Walkthrough. See README "Adding a walkthrough" for the format.

export default {
  id: "ai-tutor",
  title: "Using an AI assistant as a tutor",
  tool: "Any AI chat assistant",
  time: "15 min",
  summary: "Set up ChatGPT, Claude, Gemini or Copilot so it teaches you instead of doing the work for you, and learn the three rules that keep you and your employer safe.",
  steps: [
    {
      title: "Give it a standing instruction",
      text: [
        "Most assistants let you save instructions that apply to every chat. Look for **Custom instructions**, **Personalisation**, **Projects** or **Gems** in the settings. If yours doesn't have them, paste the instruction at the start of each new chat.",
        "The instruction below turns the assistant into a tutor: it explains, asks you questions and gives hints, and only shows full answers when you ask.",
      ],
      screen: {
        frame: "browser", url: "your AI assistant › Settings › Personalisation",
        alt: "An AI assistant's settings page with a custom instructions box containing tutoring rules.",
        body: [
          { t: "side", items: ["General", { label: "Personalisation", on: true, mark: 1 }, "Data controls"], body: [
            { t: "heading", text: "Custom instructions" },
            { t: "form", fields: [{ label: "How should the assistant respond?", value: "I'm learning application security. Act as a tutor: explain concepts simply, ask me questions to check I understand, and give hints before answers. Only show full solutions if I say “show me”.", mark: 2 }] },
            { t: "buttons", items: [{ label: "Save", primary: true }] },
          ] },
        ],
      },
      legend: ["Where the setting lives varies by tool: look for personalisation or custom instructions.", "Your tutoring instruction. Copy it from the prompt below."],
      prompt: "I'm learning application security. Act as a tutor: explain concepts simply, ask me questions to check I understand, and give hints before answers. Only show full solutions if I say “show me”.",
    },
    {
      title: "Ask it to explain, not to solve",
      text: [
        "The quickest way to learn nothing is to paste a task and copy the answer. Instead, paste what you're looking at (an error, a request, a piece of code) and ask what it means.",
        "Every week in the plan has **AI assist** prompts written this way. Use them as a starting point and make them your own.",
      ],
      screen: {
        frame: "browser", url: "your AI assistant › New chat",
        alt: "A chat where the learner pastes a Python error and asks for an explanation, and the assistant explains it and asks a question back.",
        body: [{ t: "chat", msgs: [
          { who: "you", text: "I got `KeyError: 'name'` on line 12. Explain what it means. Don't fix it for me.", mark: 1 },
          { who: "ai", text: "A KeyError means you asked a dictionary for a key it doesn't have. On line 12 you read `user['name']`. What keys does `user` actually have at that point? Try printing it.", mark: 2 },
        ] }],
      },
      legend: ["Paste the evidence and say what you want: an explanation, not a fix.", "A good tutor answer explains and then hands the next step back to you."],
    },
    {
      title: "Follow the three rules",
      text: [
        "**1. Never paste secrets or other people's data.** That means passwords, API keys, session cookies, tokens, customer data and your employer's code. Replace them with `XXX` before you paste.",
        "**2. Check what it tells you.** AI assistants are often confidently wrong, especially about tool options and security details. Confirm anything important in the official docs or by trying it.",
        "**3. Make sure the understanding is yours.** Only tick a “Can I explain…” check when you can say the answer out loud with the chat closed.",
      ],
    },
  ],
  doneWhen: "Your assistant has a tutoring instruction saved, and you've written your own three rules for using it in my-machine.md or your learning log.",
};
