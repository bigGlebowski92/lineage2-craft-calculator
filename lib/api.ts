// Using Next.js API routes (no external backend needed)
export const api = {
  // Items
  getItems: async () => {
    const response = await fetch('/api/items');
    return response.json();
  },

  getItem: async (id: string) => {
    const response = await fetch(`/api/items/${id}`);
    return response.json();
  },

  // Recipes
  getRecipe: async (itemId: string) => {
    const response = await fetch(`/api/recipes/${itemId}`);
    return response.json();
  },

  // Check which items have recipes
  checkRecipes: async (itemIds: string[]): Promise<Record<string, boolean>> => {
    const response = await fetch('/api/recipes/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemIds }),
    });
    return response.json();
  },

  // Get drop/spoil sources for an item
  getDropsSpoils: async (itemId: string) => {
    const response = await fetch(`/api/drops-spoils/${itemId}`);
    return response.json();
  },
};
