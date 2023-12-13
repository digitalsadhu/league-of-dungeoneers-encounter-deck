import { getCards } from "../../models/cards.mjs";
import { scenarioDeck } from "../../data/scenario-deck.mjs";
import { upsertDeck } from "../../models/decks.mjs";

export async function get(req) {
  const cards = await getCards();
	cards.name = req.query.name;
  return { json: cards.toJSON() };
}

export async function post(req) {
	/**
	 	name: 'My Deck',
		base_game: 'true',
		number_of_rooms: '5',
		number_of_corridors: '5',
  	'exclude_cards[]': [ 'r24', 'r25' ]
	 */

  // Get form data
  const { name, number_of_rooms, number_of_corridors, 'exclude_cards[]': excludeKeys } = req.body;

	console.log("Req.Body", req.body);

	// Use the form data to make a deck
	const deck = scenarioDeck({ name, numRooms: number_of_rooms, numCorridors: number_of_corridors, excludeKeys });

	console.log("SCENARIO DECK", deck.toJSON());

	// Store the deck
	await upsertDeck(deck);

  return {
    // redirect back to the list page
    location: `/`,
		json: deck.toJSON(),
  };
}
