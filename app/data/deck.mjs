/* eslint-disable no-undef */
import { Card } from "./card.mjs";

export class Deck extends Map {
  id = "";
  name = "";

  static from({ id = "", name = "", cards = [] } = {}) {
    return new Deck({ id, name, cards });
  }

  constructor({ id = "", name = "", cards = [] } = {}) {
    super();
    this.id = id || crypto.randomUUID();
    this.name = name || "";
    if (cards) {
      for (const card of cards) {
        this.addCard(card);
      }
    }
  }

  addCard(card) {
    const c = card instanceof Card ? card : new Card(card);
    if (!c.validate()) throw new Error("Card object not valid when attempting to add to Deck");
    this.set(c.key, c);
  }

  removeCard(card) {
    if (typeof card === "string") {
      return this.delete(card);
    }
    return this.delete(card.key);
  }

  filter(filters = {}) {
    const results = Array.from(this.values()).filter((card) => {
      if (filters.excludeKeys && filters.excludeKeys.includes(card.key)) return false;
      if (filters.key && filters.key !== card.key) return false;
      if (filters.name && filters.name !== card.name) return false;
      if (filters.type && filters.type !== card.type) return false;
      if (filters.doors && filters.doors !== card.doors) return false;
      if (filters.group && filters.group !== card.group) return false;
      return true;
    });
    return Deck.from({ id: this.id, name: this.name, cards: results });
  }

  shuffle() {
    const results = Array.from(this.values())
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return Deck.from({ id: this.id, name: this.name, cards: results });
  }

  pick(number) {
		const results = Array.from(this.values()).slice(0, number);
		return Deck.from({ id: this.id, name: this.name, cards: results });
	}

	merge(deck) {
		const results = [...Array.from(this.values()), ...Array.from(deck.values())];
		return Deck.from({ id: this.id, name: this.name, cards: results });
	}

	split() {
		const cards = Array.from(this.values());
		const deck1 = cards.slice(0, Math.ceil(cards.length / 2));
		const deck2 = cards.slice(Math.ceil(cards.length / 2), cards.length);
		return [
			Deck.from({ id: this.id, name: this.name, cards: deck1 }),
			Deck.from({ id: this.id, name: this.name, cards: deck2 }),
		];
	}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      cards: Array.from(this.values()),
    };
  }
}
