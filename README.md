# Lineage 2 Craft Calculator

A Next.js application for calculating crafting costs in Lineage 2. Built with Next.js API routes (no separate backend needed).

## Project Structure

```
database/
└── frontend/              # Next.js application (everything in one place!)
    ├── app/
    │   ├── api/          # Next.js API routes (replaces Express backend)
    │   │   ├── items/    # Items API endpoints
    │   │   └── recipes/  # Recipes API endpoints
    │   ├── page.tsx      # Main page
    │   └── layout.tsx
    ├── components/       # React components
    ├── data/             # JSON data files
    │   ├── items.json    # All items (19,199 items)
    │   └── recipes.json  # Crafting recipes (1,000 recipes)
    └── lib/              # Utilities and API client
```

## Why Next.js Only?

This project uses **Next.js API routes** instead of a separate backend because:

- ✅ **Simpler**: One codebase, one deployment
- ✅ **Faster**: No network calls between frontend/backend
- ✅ **Easier**: No CORS configuration needed
- ✅ **Perfect fit**: For static/semi-static data (JSON files)
- ✅ **Built-in**: Next.js handles file system access natively

For this use case (reading JSON files and serving data), Next.js is more than sufficient!

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

That's it! No separate backend server needed.

## API Endpoints

All API routes are handled by Next.js:

- `GET /api/items` - Get all items
- `GET /api/items/[id]` - Get item by ID
- `GET /api/recipes/[itemId]` - Get recipe for an item

## Features

- ✅ Browse 19,199+ Lineage 2 items
- ✅ View crafting recipes with materials
- ✅ Enter prices and calculate total costs
- ✅ Real-time cost calculation
- ✅ Prices saved in localStorage
- ✅ Search and filter items

## Data

The application uses JSON files for data storage:

- **`data/items.json`** - Contains all Lineage 2 items (parsed from XML files)
  - 3,893 weapons
  - 3,825 armor pieces
  - 11,481 materials/other items

- **`data/recipes.json`** - Contains 1,000 crafting recipes
  - Each recipe maps an item to its required materials
  - Includes quantities for each material
  - All items have proper names from Lineage 2 XML files

## Development

```bash
cd frontend
npm run dev
```

## Deployment

This is a standard Next.js app and can be deployed to:

- **Vercel** (recommended) - `vercel deploy`
- **Netlify** - Connect your GitHub repo
- **Any Node.js hosting** - Run `npm run build && npm start`

## Tech Stack

- **Next.js 14** - React framework with API routes
- **React 18** - UI library
- **TypeScript** - Type safety

## Data Sources

- Items parsed from Lineage 2 XML files (197 files)
- Recipes parsed from `recepies.xml`
- All item names and details from official Lineage 2 data

## Next Steps

- [ ] Add nested recipe calculation (automatically calculate costs for craftable materials)
- [ ] Recipe tree visualization
- [ ] Add item icons/images
- [ ] Export/import price lists
- [ ] Database migration (SQLite/PostgreSQL) - optional for better performance

## Old Backend (Deprecated)

The `backend/` folder is no longer needed. The project now uses Next.js API routes instead. You can safely delete the backend folder if you want, or keep it for reference.
