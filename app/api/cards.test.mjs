import test from "node:test";
import assert from "node:assert";
import sandbox from "@architect/sandbox";

const url = (path) => `http://localhost:3333${path}`;
const get = async (path) => await fetch(url(path));

test(`Start local server`, async (t) => {
  await sandbox.start({ quiet: true });
  assert.ok("local server started");
});

test("Api should return expected result", async () => {
  const response = await get("/cards");
  const actual = (await response.json())[0];
  const expected = {
    key: "r1",
    name: "The Pit",
    doors: 2,
    type: "Room",
    group: "Core",
  };

  assert.deepEqual(actual, expected, "API returned expected result");
});

test("Shut down local server", async () => {
  await sandbox.end();

  assert.ok("Shut down Sandbox");
});
