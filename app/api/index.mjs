export async function get() {
  return {
    json: {
      decks: [
        { id: 1, name: "My awesome dungeon 1" },
        { id: 2, name: "My awesome dungeon 2" },
        { id: 3, name: "My awesome dungeon 3" },
        { id: 4, name: "My awesome dungeon 4" },
      ],
    },
  };
}
