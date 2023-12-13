import { Deck } from "./deck.mjs";
import { Card } from "./card.mjs";
import cardData from "./cards.json" assert { type: "json" }

export function scenarioDeck({ name = '', numRooms = 5, numCorridors = 5, excludeKeys = [] } = {}) {
	// Create a deck with all cards
	const cards = Deck.from({ name: "All Cards", cards: cardData });

	// Create a deck of corridors
	const corridors = cards.filter({ excludeKeys, type: 'Corridor' }).shuffle().pick(numCorridors)

	// Create a deck of rooms
	const rooms = cards.filter({ excludeKeys, type: 'Room' }).shuffle().pick(numRooms);

	// Merge and shuffle the rooms and corridor cards together
	const scenarioCards = corridors.merge(rooms).shuffle();

	// Split the deck roughly in half
	const [firstHalf, secondHalf] = scenarioCards.split();

	// Add the objective card to the second half
	// console.log(new Card({ key: "objective" }).toJSON())
	// console.log(new Card({ key: "objective", name: 'Objective', doors: 1, type: 'Room', group: 'Core' }).validate())
	secondHalf.addCard(new Card({ key: "objective", name: 'Objective', doors: 1, type: 'Room', group: 'Core' }));

	// Shuffle the secondHalf and then add it to the first half to 
	// form the final scenario deck
	const scenarioDeck = firstHalf.merge(secondHalf.shuffle());
	
	// Name the deck
	scenarioDeck.name = name;

	return scenarioDeck;
}