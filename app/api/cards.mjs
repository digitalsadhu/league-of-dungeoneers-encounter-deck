import { getCards } from "../models/cards.mjs";

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get() {
  const cards = await getCards();
  return { json: { cards } };
}
