import test from "node:test";
import assert from "node:assert";
import sandbox from "@architect/sandbox";
import { Deck } from "../data/deck.mjs";
import { upsertDeck } from "../models/decks.mjs";

const url = (path) => `http://localhost:3333${path}`;
const get = async (path) =>
  await fetch(url(path), {
    headers: {
      Accept: "application/json",
    },
  });
// const post = async (path, data) => {
//   try {
//     const response = await fetch(`http://localhost:3333${path}`, {
//       method: "POST",
//       headers: {
// 				Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     return await response.json();
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

test(`api/index - start local server`, async () => {
  await sandbox.start({ quiet: true });
  assert.ok("local server started");
});

test("api/index - / api should return an empty array", async () => {
  const response = await get("/");
  const actual = await response.json();
  assert.deepEqual(actual.decks, [], "API returned expected result");
});

test("api/index - / api should return an array of decks", async () => {
  await upsertDeck(Deck.from({ id: "abc", name: "My deck", cards: [] }));
  await upsertDeck(Deck.from({ id: "abcd", name: "My deck 2", cards: [] }));
  const response = await get("/");
  const actual = await response.json();

  assert.equal(actual.decks.length, 2, "API returned expected result");
  assert.equal(actual.decks[0].id, "abc", "API returned expected result");
  assert.equal(actual.decks[0].name, "My deck", "API returned expected result");
  assert.equal(actual.decks[1].id, "abcd", "API returned expected result");
  assert.equal(actual.decks[1].name, "My deck 2", "API returned expected result");
});

test("api/index - shut down local server", async () => {
  await sandbox.end();
  assert.ok("Shut down Sandbox");
});
