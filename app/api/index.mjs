import { getDecks } from "../models/decks.mjs";

export async function get() {
  const decks = await getDecks();
  return {
    json: { decks: JSON.parse(JSON.stringify(decks)) || [] },
  };
}

export async function post() {}
