import test from "node:test";
import assert from "node:assert";
import sandbox from "@architect/sandbox";

const url = (path) => `http://localhost:3333${path}`;
const get = async (path) => {
  const result = await fetch(url(path), {
    headers: {
      Accept: "application/json",
    },
  });
  return result.json();
};

test(`api/cards - start local server`, async () => {
  await sandbox.start({ quiet: true });
  assert.ok("local server started");
});

test("api/cards - api should return expected result", async () => {
  const response = await get("/cards");
  const expected = {
    key: "r1",
    name: "The Pit",
    doors: 2,
    type: "Room",
    group: "Core",
  };

  assert.deepEqual(response.cards.cards[0], expected, "API returned expected result");
});

test("api/cards - shut down local server", async () => {
  await sandbox.end();

  assert.ok("Shut down Sandbox");
});
