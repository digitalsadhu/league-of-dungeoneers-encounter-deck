/* eslint-disable no-undef */
import { getDecks, upsertDeck, validate } from "../models/decks.mjs";
import { getCards } from "../models/cards.mjs";

/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function get(req) {
  const [decks, cards] = await Promise.all([getDecks(), getCards()]);
  if (req.session.problems) {
    let { problems, deck, ...session } = req.session;
    return {
      session,
      json: { problems, cards, decks, deck },
    };
  }

  return {
    json: { decks, cards },
  };
}

/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post(req) {
  const session = req.session;
  // Validate
  let { problems, deck } = await validate.create(req);
  if (problems) {
    return {
      session: { ...session, problems, deck },
      json: { problems, deck },
      location: "/decks",
    };
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, deck: removed, ...newSession } = session;
  try {
    const result = await upsertDeck(deck);
    return {
      session: newSession,
      json: { deck: result },
      location: "/decks",
    };
  } catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: "/decks",
    };
  }
}
