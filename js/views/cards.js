import { h } from "../dom.js";
import { pad } from "../catalog.js";
import { href } from "../router.js";
import { renderCard } from "./card-render.js";

/** Decks linked from this pathway's weeks, in week order. */
export function pathwayDecks(bp, deckMap) {
  return bp.weeks.filter((w) => w.week.deck && deckMap.has(w.week.deck)).map((w) => ({ deck: deckMap.get(w.week.deck), n: w.n }));
}

export function renderCards(ctx, bp, deckId) {
  const list = pathwayDecks(bp, ctx.deckMap);
  if (list.length === 0) {
    return h("section", null, h("h1", { class: "deck-head", tabindex: "-1" }, "Learning cards"), h("p", { class: "empty" }, "This pathway has no card decks yet."));
  }
  const current = list.find((x) => x.deck.id === deckId) || list[0];
  const { deck, n } = current;
  const vars = { week: pad(n) };

  const picker = list.length > 1
    ? h("nav", { class: "deck-picker", "aria-label": "Card decks" },
        list.map((x) => h("a", { class: "btn", href: href(bp.def.id, "cards", x.deck.id), "aria-current": x === current ? "page" : null }, `W${pad(x.n)} · ${x.deck.title}`)))
    : null;

  const cards = deck.cards.map((c, i) => renderCard(c, i, deck.cards.length, vars));
  const track = h("div", { class: "deck", role: "region", "aria-label": `${deck.title} cards. Scroll sideways or use the buttons.`, tabindex: "0" }, cards);
  const status = h("span", { class: "counter", "aria-live": "polite" }, `Card 1 of ${cards.length}`);

  let index = 0;
  const go = (i) => {
    index = Math.max(0, Math.min(cards.length - 1, i));
    const card = cards[index];
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2 });
  };
  const prev = h("button", { class: "btn", type: "button", onclick: () => go(index - 1) }, "← Previous");
  const next = h("button", { class: "btn", type: "button", onclick: () => go(index + 1) }, "Next →");
  const sync = () => {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft + c.clientWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].clientWidth / 2 - mid)) best = i;
    });
    index = best;
    status.textContent = `Card ${best + 1} of ${cards.length}`;
    prev.disabled = best === 0;
    next.disabled = best === cards.length - 1;
  };
  track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  });
  prev.disabled = true;

  return h("section", null,
    picker,
    h("div", { class: "deck-head" },
      h("h1", { tabindex: "-1" }, `Week ${pad(n)} · ${deck.title}`),
      h("p", null, deck.intro)),
    track,
    h("div", { class: "deck-nav" }, prev, status, next),
    h("p", { class: "empty" }, "Decks open from their week in the plan. New decks are added to the site over time."));
}
