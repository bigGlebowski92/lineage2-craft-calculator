# Vercel Setup Instructions

## Step 1: Set Root Directory in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project: **lineage2-craft-calculator**
3. Go to **Settings** (top menu)
4. Click **General** (left sidebar)
5. Scroll down to **Root Directory**
6. Click **Edit**
7. Enter: `frontend`
8. Click **Save**

## Step 2: Verify Build Settings

After setting the root directory, Vercel should automatically detect:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (or `next build`)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## Step 3: Redeploy

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or wait for automatic redeploy after the root directory change

## That's it!

Once the root directory is set to `frontend`, Vercel will:

- Find your `package.json` in `frontend/package.json`
- Detect Next.js automatically
- Build and deploy successfully

---

**Note**: The root directory setting tells Vercel where your Next.js app is located. Since your `package.json` is in the `frontend` folder, that's where Vercel needs to look.
