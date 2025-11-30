import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

let itemsCache: any[] | null = null;

async function loadItems() {
  if (itemsCache) {
    return itemsCache;
  }
  
  try {
    const filePath = join(process.cwd(), 'data', 'items.json');
    const fileContent = await readFile(filePath, 'utf-8');
    itemsCache = JSON.parse(fileContent);
    return itemsCache;
  } catch (error) {
    console.error('Error loading items:', error);
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const items = await loadItems();
    const item = items.find(i => i.id === params.id);
    
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}



