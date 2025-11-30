# Lineage 2 Craft Calculator

A Next.js application for calculating crafting costs in Lineage 2.

## Features

- ✅ Browse 19,199+ Lineage 2 items
- ✅ View crafting recipes with materials
- ✅ Enter prices and calculate total costs
- ✅ Real-time cost calculation
- ✅ Nested recipe viewing (click on materials to see their recipes)
- ✅ Drop/Spoil sources for each material (see which monsters drop/spoil items)
- ✅ Prices saved in localStorage

## Project Structure

```
frontend/
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── items/        # Items API endpoints
│   │   └── recipes/      # Recipes API endpoints
│   ├── page.tsx          # Main page
│   └── layout.tsx
├── components/           # React components
│   ├── ItemSelector.tsx
│   └── RecipeDisplay.tsx
├── data/                 # JSON data files
│   ├── items.json        # All items (19,199 items)
│   └── recipes.json      # Crafting recipes (1,000 recipes)
└── lib/
    └── api.ts            # API client
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

All API routes are handled by Next.js (no separate backend needed):

- `GET /api/items` - Get all items
- `GET /api/items/[id]` - Get item by ID
- `GET /api/recipes/[itemId]` - Get recipe for an item
- `POST /api/recipes/check` - Check which items have recipes
- `GET /api/drops-spoils/[itemId]` - Get drop/spoil sources for an item

## Data

The application uses JSON files for data storage:

- **`data/items.json`** - Contains all Lineage 2 items (parsed from XML files)
- **`data/recipes.json`** - Contains crafting recipes (parsed from recipes XML)
- **`data/drops-spoils.json`** - Contains drop/spoil data for items from NPCs

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This is a standard Next.js app and can be deployed to multiple platforms:

### Quick Deploy (Recommended: Vercel)

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Connect your GitHub repository
   - **Set Root Directory to `frontend`**
   - Click "Deploy"
   - Your site will be live in ~2 minutes! 🎉

### Other Options

- **Vercel** (recommended) - Made by Next.js creators, zero config
- **Netlify** - Similar to Vercel, great for static sites
- **Railway** - Simple and fast deployment
- **Render** - Good free tier
- **Any Node.js hosting** - Run `npm run build && npm start`

📖 **See `DEPLOYMENT.md` for detailed instructions on all platforms.**
📖 **See `QUICK_DEPLOY.md` for the fastest deployment path.**

## Why Next.js Only?

This project uses Next.js API routes instead of a separate backend because:

- ✅ Simpler architecture (one codebase)
- ✅ No CORS issues
- ✅ Faster development
- ✅ Easier deployment
- ✅ Perfect for static/semi-static data
- ✅ Built-in file system access

For this use case (reading JSON files and serving data), Next.js is more than sufficient!



