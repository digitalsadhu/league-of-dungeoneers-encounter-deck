// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
 * @type {import('@enhance/types').EnhanceElemFn}
 */
export default function Html({ html, state }) {
  const { store } = state;
  const deck = store.deck || {};
  const problems = store.problems || {};

  return html`<enhance-page-container>
    <enhance-form action="/decks/${deck.key}" method="POST">
      <div class="${problems.form ? "block" : "hidden"}">
        <p>Found some problems!</p>
        <ul>
          ${problems.form}
        </ul>
      </div>
      <enhance-fieldset legend="Deck">
        <enhance-checkbox
          label="Base Game"
          type="checkbox"
          id="base_game"
          name="base_game"
          value="${deck?.base_game}"
          errors="${problems?.base_game?.errors}"
        ></enhance-checkbox>
        <enhance-checkbox
          label="The Ancient Lands"
          type="checkbox"
          id="the_ancient_lands"
          name="the_ancient_lands"
          value="${deck?.the_ancient_lands}"
          errors="${problems?.the_ancient_lands?.errors}"
        ></enhance-checkbox>
        <enhance-text-input
          label="Number of Corridors"
          type="number"
          id="num_corridors"
          name="num_corridors"
          value="${deck?.num_corridors}"
          errors="${problems?.num_corridors?.errors}"
        ></enhance-text-input>
        <enhance-text-input
          label="Number of Rooms"
          type="number"
          id="num_rooms"
          name="num_rooms"
          value="${deck?.num_rooms}"
          errors="${problems?.num_rooms?.errors}"
        ></enhance-text-input>
        <enhance-text-input
          label="Side Quest 1"
          type="text"
          id="side_quest_1"
          name="side_quest_1"
          value="${deck?.side_quest_1}"
          errors="${problems?.side_quest_1?.errors}"
        ></enhance-text-input>
        <enhance-text-input
          label="Side Quest 2"
          type="text"
          id="side_quest_2"
          name="side_quest_2"
          value="${deck?.side_quest_2}"
          errors="${problems?.side_quest_2?.errors}"
        ></enhance-text-input>
        <enhance-text-input
          label="Main Objective"
          type="text"
          id="main_objective"
          name="main_objective"
          value="${deck?.main_objective}"
          errors="${problems?.main_objective?.errors}"
        ></enhance-text-input>
        <input type="hidden" id="key" name="key" value="${deck?.key}" />
        <enhance-submit-button style="float: right"
          ><span slot="label">Save</span></enhance-submit-button
        >
      </enhance-fieldset>
    </enhance-form>
  </enhance-page-container>`;
}
