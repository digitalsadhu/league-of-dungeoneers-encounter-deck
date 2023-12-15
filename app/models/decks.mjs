import data from "@begin/data";
import { validator } from "@begin/validator";
import { Deck as DeckSchema } from "./schemas/deck.mjs";
import { Deck } from "../data/deck.mjs";

const deleteDeck = async function (key) {
  await data.destroy({ table: "decks", key });
  return { key };
};

const upsertDeck = async function (deck) {
  return data.set({ table: "decks", key: deck.id, deck: JSON.parse(JSON.stringify(deck)) });
};

const getDeck = async function (key) {
  const { deck } = data.get({ table: "decks", key });
  return Deck.from(deck);
};

const getDecks = async function () {
  const databasePageResults = await data.page({
    table: "decks",
    limit: 25,
  });

  let decks = [];
  for await (let databasePageResult of databasePageResults) {
    for (let { deck } of databasePageResult) {
      decks.push(Deck.from(deck));
    }
  }

  return decks;
};

const validate = {
  shared(req) {
    return validator(req, DeckSchema);
  },
  async create(req) {
    let { valid, problems, data } = validate.shared(req);
    if (req.body.key) {
      problems["key"] = { errors: "<p>should not be included on a create</p>" };
    }
    // Insert your custom validation here
    return !valid ? { problems, deck: data } : { deck: data };
  },
  async update(req) {
    let { valid, problems, data } = validate.shared(req);
    // Insert your custom validation here
    return !valid ? { problems, deck: data } : { deck: data };
  },
};

export { deleteDeck, getDeck, getDecks, upsertDeck, validate };
