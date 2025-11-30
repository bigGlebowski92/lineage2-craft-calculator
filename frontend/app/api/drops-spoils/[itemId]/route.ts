import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

let dropsSpoilsCache: Record<string, any[]> | null = null;

const loadDropsSpoils = async () => {
  if (dropsSpoilsCache) {
    return dropsSpoilsCache;
  }
  
  try {
    const filePath = join(process.cwd(), 'data', 'drops-spoils.json');
    const fileContent = await readFile(filePath, 'utf-8');
    dropsSpoilsCache = JSON.parse(fileContent);
    return dropsSpoilsCache;
  } catch (error) {
    console.error('Error loading drops-spoils:', error);
    return {};
  }
};

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params;
    const dropsSpoils = await loadDropsSpoils();
    
    const sources = dropsSpoils[itemId] || [];
    
    // Separate drops and spoils
    const drops = sources.filter(s => s.type === 'drop');
    const spoils = sources.filter(s => s.type === 'spoil');
    
    return NextResponse.json({
      itemId,
      drops,
      spoils,
      totalSources: sources.length
    });
  } catch (error) {
    console.error('Error fetching drops-spoils:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drops/spoils data' },
      { status: 500 }
    );
  }
}



