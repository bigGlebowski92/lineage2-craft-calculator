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

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const recipes = await loadRecipes();
    const recipe = recipes.find(r => r.itemId === params.itemId);
    
    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }
    
    // Return in the format expected by frontend
    return NextResponse.json({
      itemId: recipe.itemId,
      materials: recipe.materials
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}



