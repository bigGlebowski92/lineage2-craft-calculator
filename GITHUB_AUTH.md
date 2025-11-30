# GitHub Authentication Setup

GitHub requires authentication to push code. You have two options:

## Option 1: Personal Access Token (PAT) - Recommended

### Step 1: Create a Personal Access Token
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `lineage2-calculator-push`
4. Select expiration (or "No expiration" if you prefer)
5. Check the **`repo`** scope (this allows pushing to repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** - you won't see it again!

### Step 2: Push Using Token
When prompted for password, paste your token instead:

```bash
cd /Users/ksenia_chumakova/Desktop/projects/database
git push -u origin main
```

When asked for:
- **Username**: `bigGlebowski92`
- **Password**: Paste your Personal Access Token

---

## Option 2: SSH Authentication (More Secure)

### Step 1: Check if you have SSH key
```bash
ls -al ~/.ssh
```

### Step 2: Generate SSH key (if you don't have one)
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Optionally set a passphrase
```

### Step 3: Add SSH key to GitHub
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to [github.com/settings/keys](https://github.com/settings/keys)
3. Click **"New SSH key"**
4. Paste your public key
5. Click **"Add SSH key"**

### Step 4: Change remote to SSH
```bash
cd /Users/ksenia_chumakova/Desktop/projects/database
git remote set-url origin git@github.com:bigGlebowski92/lineage2-craft-calculator.git
git push -u origin main
```

---

## Quick Option: Use GitHub Desktop

If you prefer a GUI:
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Add the repository
4. Push with one click

---

## After Authentication

Once you've set up authentication, run:
```bash
cd /Users/ksenia_chumakova/Desktop/projects/database
git push -u origin main
```

Your code will be pushed to: https://github.com/bigGlebowski92/lineage2-craft-calculator

