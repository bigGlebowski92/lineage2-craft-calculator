import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

let dropsCache: Record<string, any[]> | null = null;

const loadDrops = async (): Promise<Record<string, any[]>> => {
  if (dropsCache) {
    return dropsCache;
  }

  try {
    const filePath = join(process.cwd(), 'data', 'drops-spoils.json');
    const fileContent = await readFile(filePath, 'utf-8');
    dropsCache = JSON.parse(fileContent);
    return dropsCache || {};
  } catch (error) {
    console.error('Error loading drops/spoils:', error);
    return {};
  }
};

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;
    const drops = await loadDrops();
    const itemSources = drops[itemId] || [];

    return NextResponse.json({
      itemId,
      sources: itemSources,
    });
  } catch (error) {
    console.error('Error fetching drop/spoil data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drop/spoil data' },
      { status: 500 }
    );
  }
}
