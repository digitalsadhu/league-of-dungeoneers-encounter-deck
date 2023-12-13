import test from "node:test";
import assert from "node:assert";
import { Deck } from "./deck.mjs";
import { Card } from "./card.mjs";

test('Deck - assigning a name - creates a Deck with name and uuid', () => {
	const deck = new Deck({ name: 'Custom Deck' });
	assert.ok(deck.id.length > 0);
	assert.equal(deck.name, 'Custom Deck');
	assert.equal(deck.size, 0);
});

test('Deck - addCard - inserts object into the collection', () => {
	const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  }
	const deck = new Deck();
	deck.addCard(data);
	assert.ok(deck.get("r1") instanceof Card);
	assert.deepEqual(JSON.parse(JSON.stringify(deck.get("r1"))), data);
});

test('Deck - addCard - inserts card into the collection', () => {
	const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  }
	const deck = new Deck();
	const card = new Card(data);
	deck.addCard(card);
	assert.ok(deck.get("r1") instanceof Card);
	assert.deepEqual(JSON.parse(JSON.stringify(deck.get("r1"))), data);
});

test('Deck - addCard - validation checked before adding', () => {
	const data = { key: "r1" };
	const deck = new Deck();
	const card = new Card(data);
	assert.throws(() => deck.addCard(card));
});

test('Deck - from - add an array of cards from json data', () => {
	const data = [{
    key: "r1",
    type: "Room",
    name: "...",
    doors: 2,
    group: "Core",
  },{
    key: "r2",
    type: "Room",
    name: "...",
    doors: 2,
    group: "Core",
  }];
	const deck = Deck.from({ cards: data });
	assert.equal(deck.size, 2);
});

test('Deck - toJSON - serializes to json data', () => {
	const deck = new Deck();
	deck.addCard({
    key: "r1",
    type: "Room",
    name: "...",
    doors: 2,
    group: "Core",
  });
	deck.addCard({
    key: "r2",
    type: "Room",
    name: "...",
    doors: 2,
    group: "Core",
  });
	const data = deck.toJSON();
	assert.ok(data.id.length > 0);
	assert.equal(data.name, '');
	assert.equal(data.cards.length, 2);
});

test('Deck - removeCard - by object - removes card from the collection', () => {
	const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  }
	const deck = new Deck();
	deck.addCard(data);
	deck.removeCard({ key: "r1" });
	assert.equal(deck.get("r1"), null)
});

test('Deck - removeCard - by key - removes card from the collection', () => {
	const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  }
	const deck = new Deck();
	deck.addCard(data);
	deck.removeCard("r1");
	assert.equal(deck.get("r1"), null)
});

test('Deck - removeCard - by card object - removes card from the collection', () => {
	const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  }
	const card = new Card(data);
	const deck = new Deck();
	deck.addCard(card);
	deck.removeCard(card);
	assert.equal(deck.get("r1"), null)
});

test('Deck - filter - by type "Room"', () => {
	const data1 = { key: "r1", type: "Room", name: "...", doors: 2, group: "Core" };
	const data2 = { key: "c1", type: "Corridor", name: "...", doors: 2, group: "Core" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	const filteredCards = deck.filter({ type: "Room" });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data1.key));
});

test('Deck - filter - by group "The Ancient Lands"', () => {
	const data1 = { key: "r1", type: "Room", name: "...", doors: 2, group: "Core" };
	const data2 = { key: "c1", type: "Corridor", name: "...", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	const filteredCards = deck.filter({ group: "The Ancient Lands" });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data2.key));
});

test('Deck - filter - by key "r1"', () => {
	const data1 = { key: "r1", type: "Room", name: "...", doors: 2, group: "Core" };
	const data2 = { key: "c1", type: "Corridor", name: "...", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	const filteredCards = deck.filter({ key: "r1" });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data1.key));
});

test('Deck - filter - by name "Storage Room"', () => {
	const data1 = { key: "r18b", type: "Room", name: "Storage Room", doors: 2, group: "Core" };
	const data2 = { key: "c1", type: "Corridor", name: "...", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	const filteredCards = deck.filter({ name: "Storage Room" });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data1.key));
});

test('Deck - filter - by number of doors "4"', () => {
	const data1 = { key: "r18b", type: "Room", name: "Storage Room", doors: 2, group: "Core" };
	const data2 = { key: "c14", type: "Corridor", name: "Cross Passage", doors: 4, group: "Core" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	const filteredCards = deck.filter({ doors: 4 });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data2.key));
});

test('Deck - filter - by array of keys', () => {
	const data1 = { key: "r18b", type: "Room", name: "Storage Room", doors: 2, group: "Core" };
	const data2 = { key: "c14", type: "Corridor", name: "Cross Passage", doors: 4, group: "Core" };
	const data3 = { key: "c1", type: "Corridor", name: "Corridor", doors: 2, group: "Core" };
	const data4 = { key: "c13", type: "Corridor", name: "Corridor", doors: 2, group: "Core" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	deck.addCard(new Card(data3));
	deck.addCard(new Card(data4));
	const filteredCards = deck.filter({ excludeKeys: ['c1', 'c13', 'c14']  });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data1.key));
});

test('Deck - filter - by type and group', () => {
	const data1 = { key: "r1", type: "Room", name: "Room 1", doors: 2, group: "Core" };
	const data2 = { key: "r2", type: "Room", name: "Room 2", doors: 2, group: "Core" };
	const data3 = { key: "r3", type: "Room", name: "Room 3", doors: 2, group: "The Ancient Lands" };
	const data4 = { key: "c1", type: "Corridor", name: "Corridor 1", doors: 2, group: "Core" };
	const data5 = { key: "c2", type: "Corridor", name: "Corridor 2", doors: 4, group: "Core" };
	const data6 = { key: "c3", type: "Corridor", name: "Corridor 3", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	deck.addCard(new Card(data3));
	deck.addCard(new Card(data4));
	deck.addCard(new Card(data5));
	deck.addCard(new Card(data6));
	const filteredCards = deck.filter({ doors: 2, type: "Corridor", group: "Core" });
	assert.equal(filteredCards.size, 1);
	assert.ok(filteredCards.get(data4.key));
});

test('Deck - shuffle - randomises the order of cards', () => {
	const data1 = { key: "r1", type: "Room", name: "Room 1", doors: 2, group: "Core" };
	const data2 = { key: "r2", type: "Room", name: "Room 2", doors: 2, group: "Core" };
	const data3 = { key: "r3", type: "Room", name: "Room 3", doors: 2, group: "The Ancient Lands" };
	const data4 = { key: "c1", type: "Corridor", name: "Corridor 1", doors: 2, group: "Core" };
	const data5 = { key: "c2", type: "Corridor", name: "Corridor 2", doors: 4, group: "Core" };
	const data6 = { key: "c3", type: "Corridor", name: "Corridor 3", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	deck.addCard(new Card(data3));
	deck.addCard(new Card(data4));
	deck.addCard(new Card(data5));
	deck.addCard(new Card(data6));
	const shuffledCards = deck.shuffle();
	assert.equal(shuffledCards.size, 6);
	assert.notDeepEqual(Array.from(deck.keys()), Array.from(shuffledCards.keys()));
});

test('Deck - pick - picks a number of cards as specified and returns a new deck', () => {
	const data1 = { key: "r1", type: "Room", name: "Room 1", doors: 2, group: "Core" };
	const data2 = { key: "r2", type: "Room", name: "Room 2", doors: 2, group: "Core" };
	const data3 = { key: "r3", type: "Room", name: "Room 3", doors: 2, group: "The Ancient Lands" };
	const data4 = { key: "c1", type: "Corridor", name: "Corridor 1", doors: 2, group: "Core" };
	const data5 = { key: "c2", type: "Corridor", name: "Corridor 2", doors: 4, group: "Core" };
	const data6 = { key: "c3", type: "Corridor", name: "Corridor 3", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	deck.addCard(new Card(data3));
	deck.addCard(new Card(data4));
	deck.addCard(new Card(data5));
	deck.addCard(new Card(data6));
	const pickedCards = deck.pick(3);
	assert.equal(pickedCards.size, 3);
	assert.deepStrictEqual(Array.from(pickedCards.keys()), ["r1", "r2", "r3"]);
});

test('Deck - merge - merges 2 decks into a new deck', () => {
	const data1 = { key: "r1", type: "Room", name: "Room 1", doors: 2, group: "Core" };
	const data2 = { key: "r2", type: "Room", name: "Room 2", doors: 2, group: "Core" };
	const data3 = { key: "r3", type: "Room", name: "Room 3", doors: 2, group: "The Ancient Lands" };
	const data4 = { key: "c1", type: "Corridor", name: "Corridor 1", doors: 2, group: "Core" };
	const data5 = { key: "c2", type: "Corridor", name: "Corridor 2", doors: 4, group: "Core" };
	const data6 = { key: "c3", type: "Corridor", name: "Corridor 3", doors: 2, group: "The Ancient Lands" };
	const deck1 = new Deck();
	deck1.addCard(new Card(data1))
	deck1.addCard(new Card(data2));
	deck1.addCard(new Card(data3));

	const deck2 = new Deck();
	deck2.addCard(new Card(data4));
	deck2.addCard(new Card(data5));
	deck2.addCard(new Card(data6));
	
	const mergedDecks = deck1.merge(deck2);
	assert.equal(mergedDecks.size, 6);
	assert.deepStrictEqual(Array.from(mergedDecks.keys()), ["r1", "r2", "r3", "c1", "c2", "c3"]);
});

test('Deck - split (even numbers) - splits a deck in half to create 2 decks of equal size', () => {
	const data1 = { key: "r1", type: "Room", name: "Room 1", doors: 2, group: "Core" };
	const data2 = { key: "r2", type: "Room", name: "Room 2", doors: 2, group: "Core" };
	const data3 = { key: "r3", type: "Room", name: "Room 3", doors: 2, group: "The Ancient Lands" };
	const data4 = { key: "c1", type: "Corridor", name: "Corridor 1", doors: 2, group: "Core" };
	const data5 = { key: "c2", type: "Corridor", name: "Corridor 2", doors: 4, group: "Core" };
	const data6 = { key: "c3", type: "Corridor", name: "Corridor 3", doors: 2, group: "The Ancient Lands" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	deck.addCard(new Card(data3));
	deck.addCard(new Card(data4));
	deck.addCard(new Card(data5));
	deck.addCard(new Card(data6));
	
	const [deck1, deck2] = deck.split();
	assert.equal(deck1.size, 3);
	assert.equal(deck2.size, 3);
	assert.deepStrictEqual(Array.from(deck1.keys()), ["r1", "r2", "r3"]);
	assert.deepStrictEqual(Array.from(deck2.keys()), ["c1", "c2", "c3"]);
});

test('Deck - split (odd numbers) - splits a deck roughly in half to create a first deck with 1 more card than the second', () => {
	const data1 = { key: "r1", type: "Room", name: "Room 1", doors: 2, group: "Core" };
	const data2 = { key: "r2", type: "Room", name: "Room 2", doors: 2, group: "Core" };
	const data3 = { key: "r3", type: "Room", name: "Room 3", doors: 2, group: "The Ancient Lands" };
	const data4 = { key: "c1", type: "Corridor", name: "Corridor 1", doors: 2, group: "Core" };
	const data5 = { key: "c2", type: "Corridor", name: "Corridor 2", doors: 4, group: "Core" };
	const deck = new Deck();
	deck.addCard(new Card(data1))
	deck.addCard(new Card(data2));
	deck.addCard(new Card(data3));
	deck.addCard(new Card(data4));
	deck.addCard(new Card(data5));
	
	const [deck1, deck2] = deck.split();
	assert.equal(deck1.size, 3);
	assert.equal(deck2.size, 2);
	assert.deepStrictEqual(Array.from(deck1.keys()), ["r1", "r2", "r3"]);
	assert.deepStrictEqual(Array.from(deck2.keys()), ["c1", "c2"]);
});

