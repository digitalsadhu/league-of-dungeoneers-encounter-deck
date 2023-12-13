import test from "node:test";
import assert from "node:assert";
import sandbox from "@architect/sandbox";

const url = (path) => `http://localhost:3333${path}`;
const get = async (path) =>
  await fetch(url(path), {
    headers: {
      Accept: "application/json",
    },
  });
const post = async (path, data) => {
  try {
    const response = await fetch(`http://localhost:3333${path}`, {
      method: "POST",
      headers: {
				Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

test(`Start local server`, async () => {
  await sandbox.start({ quiet: true });
  assert.ok("local server started");
});

test("Cards - GET /decks/create - returns all cards", async () => {
  const response = await get("/decks/create?name=My Cool Deck");
  const actual = await response.json();
  assert.equal(actual.name, "My Cool Deck", "Name should match URL query param given");
  assert.ok(actual.cards.length > 0, "API returned expected result");
  assert.deepEqual(
    actual.cards[0],
    { key: "r1", name: "The Pit", doors: 2, type: "Room", group: "Core" },
    "API returned expected result"
  );
});

test("Cards - POST /decks/create - creates deck and returns result", async () => {
  const actual = await post("/decks/create", {
		name: "My Very Cool Deck", 
		number_of_rooms: 3, 
		number_of_corridors: 6,
		'exclude_cards[]': ["r1", "r2"],
	});
  assert.equal(actual.name, "My Very Cool Deck", "Deck name should be 'My Very Cool Deck'");
  assert.ok(actual.id.length > 0, "Id should be present on deck");
	assert.equal(actual.cards.length, 10, "Cards length should be");
});

test("Shut down local server", async () => {
  await sandbox.end();
  assert.ok("Shut down Sandbox");
});
