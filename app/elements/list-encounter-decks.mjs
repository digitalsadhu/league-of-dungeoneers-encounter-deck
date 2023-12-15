import { Deck } from "../data/deck.mjs";

export default function ListEncounterDecks({ html, state }) {
  const { store } = state;

  const decks = [];
  for (const deck of store.decks) {
    decks.push(Deck.from(deck));
  }

  return html` <form action="/decks/create" method="get">
      <input type="text" name="name" /><button type="submit">create</button>
    </form>
    <ul>
      ${decks
        .map(
          (deck) => html`<li>${deck.name} <a href="/view/${deck.id}">view</a> <a href="/edit/${deck.id}">edit</a></li>`
        )
        .join("")}
    </ul>`;
}
