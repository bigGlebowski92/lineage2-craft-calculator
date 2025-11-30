# Quick Deploy Guide

## Fastest Way: Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
cd /Users/ksenia_chumakova/Desktop/projects/database
git init
git add .
git commit -m "Ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click "Continue with GitHub"
3. Select your repository
4. **Important**: Set **Root Directory** to `frontend`
5. Click "Deploy"
6. Wait 2-3 minutes
7. Done! 🎉 Your site is live at `your-project.vercel.app`

### That's it!
- Every git push = automatic deployment
- Free HTTPS included
- Free custom domain available

---

## Alternative: Deploy via CLI

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

---

## Other Options

- **Netlify**: [netlify.com](https://netlify.com) - Similar to Vercel
- **Railway**: [railway.app](https://railway.app) - Simple and fast
- **Render**: [render.com](https://render.com) - Good free tier

See `DEPLOYMENT.md` for detailed instructions for all platforms.

