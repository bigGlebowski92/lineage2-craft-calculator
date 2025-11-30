# Deployment Guide for Lineage 2 Craft Calculator

## Option 1: Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the simplest deployment experience.

### Steps:

1. **Install Vercel CLI** (optional, but helpful):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub, GitLab, or Bitbucket
   - Click "New Project"
   - Import your repository
   - Set the **Root Directory** to `frontend` (if your repo has both frontend and other folders)
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

3. **Deploy via CLI** (alternative):
   ```bash
   cd frontend
   vercel
   ```
   Follow the prompts. For production:
   ```bash
   vercel --prod
   ```

### Notes:
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Automatic deployments on git push
- ✅ Serverless functions for API routes
- ✅ Large JSON files are included automatically

---

## Option 2: Netlify

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Create `netlify.toml`** in the `frontend` directory:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy**:
   ```bash
   cd frontend
   netlify login
   netlify init
   netlify deploy --prod
   ```

   Or use the Netlify dashboard and connect your Git repository.

---

## Option 3: Railway

### Steps:

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set **Root Directory** to `frontend`
6. Railway will auto-detect Next.js
7. Click "Deploy"

### Environment Variables (if needed):
- Railway will automatically set up the environment
- No additional config needed for basic Next.js apps

---

## Option 4: Render

### Steps:

1. Go to [render.com](https://render.com)
2. Sign up/login
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Click "Create Web Service"

---

## Option 5: Cloudflare Pages

### Steps:

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up/login
3. Connect your Git repository
4. Configure:
   - **Framework preset**: Next.js
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
5. Deploy

**Note**: Cloudflare Pages has some limitations with Next.js API routes. You may need to use Cloudflare Workers for API routes.

---

## Important Notes for Your Project

### Large Data Files
Your `data/` folder contains large JSON files:
- `items.json` (~19k items)
- `recipes.json` (~1000 recipes)
- `drops-spoils.json` (~9.4MB)

These will be included in your deployment. Most platforms can handle this, but:
- **Vercel**: ✅ Handles large files well
- **Netlify**: ✅ Works fine
- **Railway**: ✅ No issues
- **Render**: ✅ Should work

### API Routes
Your API routes in `app/api/` will be deployed as serverless functions on:
- Vercel: ✅ Automatic
- Netlify: ✅ With Next.js plugin
- Railway: ✅ Works
- Render: ✅ Works

### Build Configuration
Your `package.json` already has the correct build scripts:
```json
"build": "next build",
"start": "next start"
```

No additional configuration needed!

---

## Quick Start (Vercel - Recommended)

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`
   - Click "Deploy"
   - Wait ~2-3 minutes
   - Your site will be live! 🎉

3. **Automatic Deployments**:
   - Every push to `main` branch = automatic production deployment
   - Every pull request = preview deployment

---

## Environment Variables

Currently, your app doesn't use environment variables. If you add any later:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Railway: Variables tab in project settings
- Render: Environment tab

---

## Custom Domain

All platforms allow you to add a custom domain:
- Vercel: Project Settings → Domains
- Netlify: Domain Settings
- Railway: Settings → Domains
- Render: Settings → Custom Domains

---

## Recommended: Vercel

For Next.js apps, **Vercel is the best choice** because:
- ✅ Made by Next.js creators
- ✅ Zero configuration needed
- ✅ Fastest deployment
- ✅ Best performance optimizations
- ✅ Free tier is generous
- ✅ Automatic preview deployments
- ✅ Built-in analytics

