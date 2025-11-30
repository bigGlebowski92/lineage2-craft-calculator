# Push to GitHub - Step by Step

## Option 1: Using GitHub Website (Easiest)

### Step 1: Create Repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `lineage2-craft-calculator` (or any name you like)
3. Description: "Lineage 2 Craft Calculator - Calculate crafting costs with drop/spoil data"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Push Your Code
After creating the repo, GitHub will show you commands. Use these:

```bash
cd /Users/ksenia_chumakova/Desktop/projects/database
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

---

## Option 2: Using GitHub CLI (If Installed)

```bash
cd /Users/ksenia_chumakova/Desktop/projects/database
gh repo create lineage2-craft-calculator --public --source=. --remote=origin --push
```

---

## After Pushing

Once pushed, you can:
1. Deploy to Vercel: Go to [vercel.com/new](https://vercel.com/new) and connect your repo
2. Share your code with others
3. Set up automatic deployments

