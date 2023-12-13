import test from "node:test";
import assert from "node:assert";
import { Card } from "./card.mjs";

test("Card - setting key property via the constructor", () => {
  const data = { key: "r1" };
  const card = new Card(data);
  assert.deepEqual(card.key, data.key);
});

test("Card - setting type property via the constructor", () => {
  const data = { type: "Corridor" };
  const card = new Card(data);
  assert.deepEqual(card.type, data.type);
});

test("Card - setting name property via the constructor", () => {
  const data = { name: "Dummy Room" };
  const card = new Card(data);
  assert.deepEqual(card.name, data.name);
});

test("Card - setting doors property via the constructor", () => {
  const data = { doors: 3 };
  const card = new Card(data);
  assert.deepEqual(card.doors, data.doors);
});

test("Card - setting group property via the constructor", () => {
  const data = { group: "The Ancient Lands" };
  const card = new Card(data);
  assert.deepEqual(card.group, data.group);
});

test("Card - setting properties via the constructor", () => {
  const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  };
  const card = new Card(data);
  assert.deepEqual(JSON.parse(JSON.stringify(card)), data);
});

test("Card - setting properties via setters", () => {
	const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  };
  const card = new Card();
	card.key = data.key,
	card.type = data.type,
	card.name = data.name,
	card.doors = data.doors,
	card.group = data.group,
  assert.deepEqual(JSON.parse(JSON.stringify(card)), data);
});

test("Card - property validation - all values provided", () => {
  const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  };
  const card = new Card(data);
  assert.deepEqual(card.validate(), true);
});

test("Card - property validation - missing values", () => {
  const data = { key: "r1" };
  const card = new Card(data);
  assert.deepEqual(card.validate(), false);
});