import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseString } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// From frontend/scripts/ to database/L2J_DataPack/...
const NPC_DIR = join(
  __dirname,
  '../../L2J_DataPack/L2J_DataPack/dist/game/data/stats/npcs'
);
const OUTPUT_FILE = join(__dirname, '../data/drops-spoils.json');

// Map to store: itemId -> array of sources
const itemSources = new Map();

async function parseXMLFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    return new Promise((resolve, reject) => {
      parseString(
        content,
        { explicitArray: false, mergeAttrs: true },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function extractItemsFromDropList(dropList, type) {
  const items = [];

  if (!dropList) return items;

  // Handle single item
  if (dropList.item) {
    const itemsArray = Array.isArray(dropList.item)
      ? dropList.item
      : [dropList.item];
    itemsArray.forEach((item) => {
      items.push({
        id: parseInt(item.id),
        min: parseInt(item.min || 1),
        max: parseInt(item.max || 1),
        chance: parseFloat(item.chance || 0),
      });
    });
  }

  // Handle groups
  if (dropList.group) {
    const groupsArray = Array.isArray(dropList.group)
      ? dropList.group
      : [dropList.group];
    groupsArray.forEach((group) => {
      const groupChance = parseFloat(group.chance || 100);
      if (group.item) {
        const groupItems = Array.isArray(group.item)
          ? group.item
          : [group.item];
        groupItems.forEach((item) => {
          items.push({
            id: parseInt(item.id),
            min: parseInt(item.min || 1),
            max: parseInt(item.max || 1),
            chance: parseFloat(item.chance || 0) * (groupChance / 100), // Multiply by group chance
          });
        });
      }
    });
  }

  return items;
}

async function processNPCFile(filePath) {
  const data = await parseXMLFile(filePath);
  if (!data || !data.list || !data.list.npc) return;

  const npcs = Array.isArray(data.list.npc) ? data.list.npc : [data.list.npc];

  npcs.forEach((npc) => {
    const npcId = parseInt(npc.id);
    const npcName = npc.name || `NPC ${npcId}`;

    // Process drop_lists
    if (npc.drop_lists) {
      // Process death drops
      if (npc.drop_lists.death) {
        const deathItems = extractItemsFromDropList(
          npc.drop_lists.death,
          'drop'
        );
        deathItems.forEach((item) => {
          if (!itemSources.has(item.id)) {
            itemSources.set(item.id, []);
          }
          itemSources.get(item.id).push({
            npcId,
            npcName,
            type: 'drop',
            min: item.min,
            max: item.max,
            chance: item.chance,
          });
        });
      }

      // Process corpse spoils
      if (npc.drop_lists.corpse) {
        const corpseItems = extractItemsFromDropList(
          npc.drop_lists.corpse,
          'spoil'
        );
        corpseItems.forEach((item) => {
          if (!itemSources.has(item.id)) {
            itemSources.set(item.id, []);
          }
          itemSources.get(item.id).push({
            npcId,
            npcName,
            type: 'spoil',
            min: item.min,
            max: item.max,
            chance: item.chance,
          });
        });
      }
    }
  });
}

async function main() {
  console.log('Starting drop/spoil data extraction...');
  console.log(`Reading NPC files from: ${NPC_DIR}`);

  try {
    const files = await readdir(NPC_DIR);
    const xmlFiles = files.filter((f) => f.endsWith('.xml'));

    console.log(`Found ${xmlFiles.length} NPC XML files`);

    for (let i = 0; i < xmlFiles.length; i++) {
      const file = xmlFiles[i];
      const filePath = join(NPC_DIR, file);

      if ((i + 1) % 10 === 0) {
        console.log(`Processing file ${i + 1}/${xmlFiles.length}: ${file}`);
      }

      await processNPCFile(filePath);
    }

    // Convert Map to object for JSON
    const result = {};
    itemSources.forEach((sources, itemId) => {
      result[itemId] = sources;
    });

    // Write to file
    await writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');

    console.log(`\n✅ Extraction complete!`);
    console.log(`   Total items with drop/spoil data: ${itemSources.size}`);
    console.log(`   Output file: ${OUTPUT_FILE}`);

    // Show some stats
    let totalDrops = 0;
    let totalSpoils = 0;
    itemSources.forEach((sources) => {
      sources.forEach((source) => {
        if (source.type === 'drop') totalDrops++;
        else totalSpoils++;
      });
    });
    console.log(`   Total drop entries: ${totalDrops}`);
    console.log(`   Total spoil entries: ${totalSpoils}`);
  } catch (error) {
    console.error('Error during extraction:', error);
    process.exit(1);
  }
}

main();
