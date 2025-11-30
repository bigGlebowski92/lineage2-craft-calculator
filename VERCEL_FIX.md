# Fix Vercel Output Directory Error

If you're still getting the "No Output Directory named 'public' found" error, you need to fix it in Vercel's project settings:

## Fix in Vercel Dashboard

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project: **lineage2-craft-calculator**
3. Go to **Settings** (top menu)
4. Click **General** (left sidebar)
5. Scroll down to **Build & Development Settings**
6. Find **Output Directory**
7. **Clear/Delete** the value (it might say "public")
8. Leave it **empty** - Vercel will auto-detect `.next` for Next.js
9. Click **Save**

## Alternative: Check Framework Preset

Also verify:
1. In the same **Build & Development Settings** section
2. **Framework Preset** should be set to **Next.js**
3. If it's not, change it to **Next.js**

## After Fixing

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or wait for the next automatic deployment

---

**Note**: For Next.js apps, Vercel should automatically use `.next` as the output directory. The error suggests the Output Directory was manually set to "public" in project settings, which is incorrect for Next.js.

