import assert from "node:assert";

const types = {
  ROOM: "Room",
  CORRIDOR: "Corridor",
};

const groups = {
  CORE: "Core",
  THE_ANCIENT_LANDS: "The Ancient Lands",
  THE_FALSE_PROPHET: "The False Prophet",
};

export class Card {
  /**
   * The room or corridor key, eg. r1 or c1
   */
  #key = "";

  /**
   * The type, either Room or Corridor
	 * @type {string | null}
   */
  #type = null;

  /**
   * The name of the card/tile
   */
  #name = "";

  /**
   * The number of doors the room or corridor has
	 * @type {number | null}
   */
  #doors = null;

  /**
   * Which group of cards/tiles this card/tile belongs to. Either Core, The Ancient Lands or The False Prophet
	 * @type {string | null}
   */
  #group = null;

  constructor(data = {}) {
    if (data.key) {
      this.key = data.key;
    }

    if (data.type) {
      this.type = data.type;
    }

    if (data.name) {
      this.name = data.name;
    }

    if (data.doors) {
      this.doors = data.doors;
    }

    if (data.group) {
      this.group = data.group;
    }
  }

  get key() {
    return this.#key;
  }

  set key(key) {
    assert(typeof key === "string", `Expected "key" to be of type "string". Got "${typeof key}".`);
    this.#key = key;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    assert(typeof name === "string", `Expected "name" to be of type "string". Got "${typeof name}".`);
    this.#name = name;
  }

  get doors() {
    return this.#doors;
  }

  set doors(doors) {
    assert(typeof doors === "number", `Expected "doors" to be of type "number". Got "${typeof doors}".`);
    this.#doors = doors;
  }

  get type() {
    return this.#type;
  }

  set type(type) {
    assert(Object.values(types).includes(type || ''), `Expected "type" to be one of "${Object.values(types)}". Got "${type}".`);
    this.#type = type;
  }

  get group() {
    return this.#group;
  }

  set group(group) {
    assert(Object.values(groups).includes(group || ''), `Expected "groups" to be one of "${Object.values(groups)}". Got "${group}".`);
    this.#group = group;
  }

	toJSON() {
		return {
			key: this.key,
			name: this.name,
			doors: this.doors,
			type: this.type,
			group: this.group,
		}
	}

	validate() {
		if (this.#key.length === 0) return false;
		if (this.#name.length === 0) return false;
		if (this.#doors === null) return false;
		if (this.#type === null || this.#type.length === 0) return false;
		if (this.#group === null || this.#group.length === 0) return false;
		return true;
	}
}
