export default function ListEncounterDecks({ html, state }) {
  const { store } = state;
  const { decks = [] } = store;

  return html`
	<form action="/create" method="get">
		<input type="text" name="name"><button type="submit">create</button>
	</form>
	<ul>
    ${decks.map((deck) => html`<li>${deck.name} <a href="/view/${deck.id}">view</a> <a href="/edit/${deck.id}">edit</a></li>`).join("")}
  </ul>`;
}
