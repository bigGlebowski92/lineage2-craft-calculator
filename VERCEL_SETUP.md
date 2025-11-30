# Vercel Setup Instructions

## ✅ No Configuration Needed!

All files have been moved to the root directory, so Vercel will automatically:
- ✅ Detect Next.js (finds `package.json` in root)
- ✅ Auto-configure build settings
- ✅ Deploy successfully

## Automatic Detection

Vercel will automatically detect:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (or `next build`)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## Deploy

1. Go to your Vercel project: https://vercel.com/dashboard
2. If you haven't connected the repo yet:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository: `bigGlebowski92/lineage2-craft-calculator`
   - Vercel will auto-detect everything
   - Click **Deploy**
3. If the repo is already connected, it will auto-redeploy on the next push

## That's it!

Since `package.json` is now in the root directory, Vercel will find everything automatically. No root directory configuration needed!
