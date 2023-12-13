export const Deck = {
  id: "Deck",
  type: "object",
  properties: {
    key: {
      type: "string",
    },
    name: {
      type: "string",
      minLength: 1,
    },
    base_game: {
      type: "boolean",
    },
    the_ancient_lands: {
      type: "boolean",
    },
    include_tiles: {
      type: "array",
    },
    exclude_tiles: {
      type: "array",
    },
    num_corridors: {
      type: "integer",
    },
    num_rooms: {
      type: "integer",
    },
    first_half_side_quest_1: {
      type: "boolean",
    },
    first_half_side_quest_2: {
      type: "boolean",
    },
    first_half_main_objective: {
      type: "boolean",
    },
    second_half_side_quest_1: {
      type: "boolean",
    },
    second_half_side_quest_2: {
      type: "boolean",
    },
    second_half_main_objective: {
      type: "boolean",
    },
  },
};
