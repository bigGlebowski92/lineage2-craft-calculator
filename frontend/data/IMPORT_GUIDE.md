# Lineage 2 Data Import Guide

This guide explains how to import real Lineage 2 data into the database.

## Data Sources

### Official Lineage 2 Databases

1. **L2ELO Database** - https://l2elo.com/en/database/
   - Comprehensive item database
   - Includes recipes and materials
   - Can be scraped or exported

2. **Lineage 2 Wiki** - https://lineage2.fandom.com/wiki/
   - Extensive item information
   - Recipe details
   - Material requirements

3. **Lineage 2 Wiki (Interlude)** - https://lineage2wiki.org/interlude/
   - Recipe database
   - Item lists
   - Crafting information

## Import Methods

### Method 1: Manual JSON Entry

Edit `backend/data/items.json` and `backend/data/recipes.json` directly with real data.

### Method 2: CSV Import

1. Export data from L2 database to CSV format:
   ```
   id,name,type,grade,subType,description
   1,Sword of Destruction,weapon,S,sword,S-grade one-handed sword
   ```

2. Use the import script:
   ```bash
   cd backend
   node scripts/import-l2-data.js --csv your-data.csv
   ```

### Method 3: Web Scraping

You can create a scraper to extract data from L2 databases:

```javascript
// Example scraper structure
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function scrapeL2Items() {
  const url = 'https://l2elo.com/en/database/items/';
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  // Parse HTML and extract items
  // Save to items.json
}
```

### Method 4: API Integration

Some Lineage 2 databases provide APIs. Check:
- L2ELO API endpoints
- Community-maintained APIs
- Game server APIs

## Data Structure

### Items Format

```json
{
  "id": "1",
  "name": "Sword of Destruction",
  "type": "weapon",
  "grade": "S",
  "subType": "sword",
  "description": "S-grade one-handed sword"
}
```

### Recipes Format

```json
{
  "itemId": "1",
  "itemName": "Sword of Destruction",
  "materials": [
    {
      "itemId": "22",
      "quantity": 20,
      "name": "Mithril Alloy"
    }
  ]
}
```

## Validation

Validate your data before using:

```bash
node scripts/import-l2-data.js --validate
```

## Tips

1. **Start Small**: Import a few items first to test
2. **Check IDs**: Ensure all item IDs in recipes exist in items.json
3. **Validate Grades**: Use only D, C, B, A, S grades
4. **Backup**: Always backup existing data before importing
5. **Incremental**: Add items gradually rather than all at once

## Example: Adding Real Recipe

1. Find recipe on L2 database
2. Note all materials and quantities
3. Ensure all material items exist in items.json
4. Add recipe to recipes.json:

```json
{
  "itemId": "33",
  "itemName": "Sword of Ipos",
  "materials": [
    {"itemId": "22", "quantity": 25, "name": "Mithril Alloy"},
    {"itemId": "24", "quantity": 15, "name": "Enria"},
    {"itemId": "25", "quantity": 8, "name": "Asofe"},
    {"itemId": "26", "quantity": 8, "name": "Thons"},
    {"itemId": "18", "quantity": 5, "name": "Gemstone A"}
  ]
}
```


