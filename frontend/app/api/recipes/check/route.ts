import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

let recipesCache: any[] | null = null;

async function loadRecipes() {
  if (recipesCache) {
    return recipesCache;
  }
  
  try {
    const filePath = join(process.cwd(), 'data', 'recipes.json');
    const fileContent = await readFile(filePath, 'utf-8');
    recipesCache = JSON.parse(fileContent);
    return recipesCache;
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { itemIds } = await request.json();
    
    if (!Array.isArray(itemIds)) {
      return NextResponse.json({ error: 'itemIds must be an array' }, { status: 400 });
    }
    
    const recipes = await loadRecipes();
    const recipeMap = new Map(recipes.map(r => [r.itemId, true]));
    
    const result: Record<string, boolean> = {};
    itemIds.forEach((id: string) => {
      result[id] = recipeMap.has(id);
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error checking recipes:', error);
    return NextResponse.json({ error: 'Failed to check recipes' }, { status: 500 });
  }
}



