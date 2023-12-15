import { Deck } from "../data/deck.mjs";
import cards from "../data/cards.json" assert { type: "json" };

const getCard = async function (key) {
  return Deck.from({ name: "All Cards", cards }).get(key);
};

const getCards = async function (filter) {
  return Deck.from({ name: "All Cards", cards }).filter(filter);
};

export { getCard, getCards };
