import test from "node:test";
import assert from "node:assert";
import { Card } from "./card.mjs";

test("app/data/card - setting key property via the constructor", () => {
  const data = { key: "r1" };
  const card = new Card(data);
  assert.deepEqual(card.key, data.key);
});

test("app/data/card - setting type property via the constructor", () => {
  const data = { type: "Corridor" };
  const card = new Card(data);
  assert.deepEqual(card.type, data.type);
});

test("app/data/card - setting name property via the constructor", () => {
  const data = { name: "Dummy Room" };
  const card = new Card(data);
  assert.deepEqual(card.name, data.name);
});

test("app/data/card - setting doors property via the constructor", () => {
  const data = { doors: 3 };
  const card = new Card(data);
  assert.deepEqual(card.doors, data.doors);
});

test("app/data/card - setting group property via the constructor", () => {
  const data = { group: "The Ancient Lands" };
  const card = new Card(data);
  assert.deepEqual(card.group, data.group);
});

test("app/data/card - setting properties via the constructor", () => {
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

test("app/data/card - setting properties via setters", () => {
  const data = {
    key: "r1",
    type: "Room",
    name: "some room",
    doors: 2,
    group: "Core",
  };
  const card = new Card();
  (card.key = data.key),
    (card.type = data.type),
    (card.name = data.name),
    (card.doors = data.doors),
    (card.group = data.group),
    assert.deepEqual(JSON.parse(JSON.stringify(card)), data);
});

test("app/data/card - property validation - all values provided", () => {
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

test("app/data/card - property validation - missing values", () => {
  const data = { key: "r1" };
  const card = new Card(data);
  assert.deepEqual(card.validate(), false);
});
