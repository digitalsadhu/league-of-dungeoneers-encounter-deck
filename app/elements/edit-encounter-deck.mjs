export default function CreateEncounterDeck({ html, state }) {
  const { store } = state;

  return html`
    Name: ${store.name}
    <form action="/create" method="post">
      Base Game <input type="checkbox" /> The Ancient Lands
      <input type="checkbox" />
      Include Tiles ... Exclude Tiles ...
			<button type="submit">Create Encounter Deck</button>
    </form>
  `;
}
