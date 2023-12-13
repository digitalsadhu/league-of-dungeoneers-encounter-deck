import { Deck } from "../data/deck.mjs";

export default function CreateEncounterDeck({ html, state }) {
  const { store } = state;

	const deck = Deck.from(store);

  return html`
  <enhance-form action="/decks/create" method="POST">
  <input name="name" type="hidden" value="${store.name}" />
  <ul>
    <enhance-fieldset legend="Deck Creator - ${store.name}">
      <li>
        <enhance-text-input
          label="Number of Rooms"
          type="number"
          name="number_of_rooms"
          id="number_of_rooms"
        ></enhance-text-input>
      </li>
      <li>
        <enhance-text-input
          label="Number of Corridors"
          type="number"
          name="number_of_corridors"
          id="number_of_corridors"
        ></enhance-text-input>
      </li>
      <section>
        <enhance-fieldset legend="Exclude Cards">
          <ul>
            ${Array.from(deck.values())
              .map(
                (card) =>
                  html`<li>
                    <enhance-checkbox
                      label="${card.key} - ${card.name}"
                      type="checkbox"
                      name="exclude_cards[]"
                      id="exclude_cards"
                      value="${card.key}"
                    ></enhance-text-input>
                  </li>`
              )
              .join("\n")}
          </ul>
        </enhance-fieldset>
      </section>
      <enhance-submit-button style="float: right"
          ><span slot="label">Create Encounter Deck</span></enhance-submit-button
        >
      </ul>
      </enhance-fieldset>
    </enhance-form>
  `;
}
