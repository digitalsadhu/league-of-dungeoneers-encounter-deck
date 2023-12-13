// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
 * @type {import('@enhance/types').EnhanceElemFn}
 */
export default function Html({ html, state }) {
  const { store } = state;
  let decks = store.decks || [];
  let cards = store.cards || [];
  const deck = store.deck || {};
  const problems = store.problems || {};

  return html`<enhance-page-container>
    <main>
      <h1 class="mb1 font-semibold text3">Encounter Decks</h1>
        <enhance-form action="/decks/${deck.key}" method="POST">
          <div class="${problems.form ? "block" : "hidden"}">
            <p>Found some problems!</p>
            <ul>
              ${problems.form}
            </ul>
          </div>
          <enhance-fieldset legend="Create New Deck">
            <enhance-text-input
              label="Name"
              type="text"
              id="name"
              name="name"
              value="${deck?.name}"
              errors="${problems?.name?.errors}"
            ></enhance-text-input>
						<div class="flex gap-1 align-items-center">
							<strong>Include cards from</strong>
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
						</div>
						<div class="flex gap-1">
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
						</div>
						<strong>Card list to pick from...</strong>
						<div class="mb-1">${cards.map((card) => html`${card.key}`).join(", ")}</div>
						<div class="flex gap-1">
							<enhance-text-input
								label="Include Cards"
								type="text"
								id="include_cards"
								name="include_cards"
								value="${deck?.include_cards}"
								errors="${problems?.include_cards?.errors}"
							></enhance-text-input>
							<enhance-text-input
								label="Exclude Cards"
								type="text"
								id="exclude_cards"
								name="exclude_cards"
								value="${deck?.exclude_cards}"
								errors="${problems?.exclude_cards?.errors}"
							></enhance-text-input>
						</div>
						<strong>In the first half of the deck include...</strong>
						<div class="flex gap-1">
							<enhance-checkbox
								label="Side Quest 1"
								type="checkbox"
								id="first_half_side_quest_1"
								name="first_half_side_quest_1"
								value="${deck?.first_half_side_quest_1}"
								errors="${problems?.first_half_side_quest_1?.errors}"
							></enhance-checkbox>
							<enhance-checkbox
								label="Side Quest 2"
								type="checkbox"
								id="first_half_side_quest_2"
								name="first_half_side_quest_2"
								value="${deck?.first_half_side_quest_2}"
								errors="${problems?.first_half_side_quest_2?.errors}"
							></enhance-checkbox>
							<enhance-checkbox
								label="Main Objective"
								type="checkbox"
								id="first_half_main_objective"
								name="first_half_main_objective"
								value="${deck?.first_half_main_objective}"
								errors="${problems?.first_half_main_objective?.errors}"
							></enhance-checkbox>
						</div>
						<strong>In the second half of the deck include...</strong>
						<div class="flex gap-1">
							<enhance-checkbox
								label="Side Quest 1"
								type="checkbox"
								id="second_half_side_quest_1"
								name="second_half_side_quest_1"
								value="${deck?.second_half_side_quest_1}"
								errors="${problems?.second_half_side_quest_1?.errors}"
							></enhance-checkbox>
							<enhance-checkbox
								label="Side Quest 2"
								type="checkbox"
								id="second_half_side_quest_2"
								name="second_half_side_quest_2"
								value="${deck?.second_half_side_quest_2}"
								errors="${problems?.second_half_side_quest_2?.errors}"
							></enhance-checkbox>
							<enhance-checkbox
								label="Main Objective"
								type="checkbox"
								id="second_half_main_objective"
								name="second_half_main_objective"
								value="${deck?.second_half_main_objective}"
								errors="${problems?.second_half_main_objective?.errors}"
							></enhance-checkbox>
						</div>
            <input type="hidden" id="key" name="key" value="${deck?.key}" />
            <enhance-submit-button style="float: right"><span slot="label">Generate</span></enhance-submit-button>
          </enhance-fieldset>
        </enhance-form>
			<hr />
			<ul>
        ${decks
          .map((item) => `<li>
						<div class="flex gap-1 align-items-center">	
							${item?.name || ""} 
							<form action="/decks/${item.key}/delete" method="POST">
								<enhance-submit-button><span slot="label">delete</span></enhance-submit-button>
							</form>
						</div>
					</li>`)
          .join("\n")}
      </ul>
    </main>
  </enhance-page-container> `;
}
