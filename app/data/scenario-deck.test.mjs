import test from "node:test";
import assert from "node:assert";
import { scenarioDeck } from "./scenario-deck.mjs";

test('Scenario Deck - constructor - creates a scenario Deck with name, uuid and generated cards', () => {
	const deck = scenarioDeck({ name: 'Custom Deck', numRooms: 3, numCorridors: 3 });
	assert.equal(deck.name, 'Custom Deck');
	assert.equal(deck.size, 7);
});
