import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

let itemsCache: any[] | null = null;

async function loadItems(): Promise<any[]> {
  if (itemsCache) {
    return itemsCache;
  }
  
  try {
    const filePath = join(process.cwd(), 'data', 'items.json');
    const fileContent = await readFile(filePath, 'utf-8');
    itemsCache = JSON.parse(fileContent);
    return itemsCache || [];
  } catch (error) {
    console.error('Error loading items:', error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const items = await loadItems();
    
    if (id) {
      const item = items.find(i => i.id === id);
      if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}



