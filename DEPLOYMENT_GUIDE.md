# 🚀 Snowman - Vercel Deployment Guide

Complete step-by-step instructions for deploying Snowman to Vercel with no assumptions.

---

## 📋 TABLE OF CONTENTS

1. [Local Project Check](#1-local-project-check)
2. [Git & GitHub Preparation](#2-git--github-preparation)
3. [Vercel Dashboard Setup](#3-vercel-dashboard--step-by-step)
4. [After Deploy Verification](#4-after-deploy--verification)
5. [Troubleshooting](#5-troubleshooting)
6. [README Updates](#6-readmemd-updates)

---

## 1️⃣ LOCAL PROJECT CHECK

### What Files Must Exist

Before deploying, verify these files exist in your project root:

```
✅ package.json          (dependencies & scripts)
✅ vite.config.ts        (build configuration)
✅ tsconfig.json         (TypeScript configuration)
✅ tailwind.config.ts    (Tailwind CSS configuration)
✅ postcss.config.js     (PostCSS configuration)
✅ .gitignore            (files to exclude from Git)
✅ src/                  (source code directory)
✅ public/               (static assets)
```

**Check these exist:**
```bash
ls -la package.json vite.config.ts tsconfig.json tailwind.config.ts postcss.config.js
```

### What Commands to Run Locally

**1. Install dependencies (if not already done):**
```bash
npm install
```
This reads `package.json` and installs all required packages into `node_modules/`.

**2. Run development server:**
```bash
npm run dev
```
Expected output:
```
  VITE v5.4.21  ready in 1152 ms
  ➜  Local:   http://localhost:5174/Snowman/
```
✅ Visit http://localhost:5174/Snowman/ and verify the site works.

**3. Build for production locally:**
```bash
npm run build
```
Expected output:
```
✓ 1234 modules transformed.
dist/index.html                   0.50 kB │ gzip:  0.30 kB
dist/assets/index-abc123.js     250.45 kB │ gzip: 75.23 kB
dist/assets/index-def456.css     45.67 kB │ gzip: 12.34 kB
```

**4. Preview production build locally:**
```bash
npm run preview
```
Expected output:
```
  ➜  Local:   http://localhost:4173/Snowman/
```
✅ Visit http://localhost:4173/Snowman/ and verify it works exactly like production.

### What to Check in package.json

**Scripts section:**
```json
"scripts": {
  "dev": "vite",                    // ✅ Development server
  "build": "vite build",            // ✅ Production build
  "build:dev": "vite build --mode development",
  "lint": "eslint .",               // ✅ Code quality check
  "preview": "vite preview"         // ✅ Preview production build
}
```

**Vercel will use:** `npm run build` (automatically detected)

### Build Folder Check

After running `npm run build`, verify the `dist/` folder exists:

```bash
ls -la dist/
```

Expected contents:
```
dist/
├── index.html          (main HTML file)
├── assets/
│   ├── index-xxx.js    (bundled JavaScript)
│   ├── index-xxx.css   (bundled CSS)
│   └── ...other assets
└── ...other files
```

**Important:** The `dist/` folder is what Vercel deploys. It should NOT be committed to Git (check `.gitignore`).

### Environment Variables

**Check if your project needs environment variables:**

```bash
grep -r "import.meta.env" src/
```

If you see `import.meta.env.VITE_*`, you need to set them in Vercel.

**For this project:** Check `vite.config.ts` for `base: "/Snowman/"` - this is important for GitHub Pages but may need adjustment for Vercel.

### What Should NOT Be Committed

Verify `.gitignore` contains:
```
node_modules/          ✅ (dependencies, not source code)
dist/                  ✅ (build output, generated)
.env                   ✅ (secrets, never commit)
.env.local             ✅ (local overrides)
.DS_Store              ✅ (macOS files)
*.log                  ✅ (log files)
```

**Check what's currently staged:**
```bash
git status
```

If you see `node_modules/` or `dist/` listed, they shouldn't be there. Fix with:
```bash
git rm --cached node_modules dist -r
git commit -m "Remove node_modules and dist from tracking"
```

### Confirm Project Runs in Production Mode

**Step 1: Build**
```bash
npm run build
```
✅ Should complete without errors.

**Step 2: Preview**
```bash
npm run preview
```
✅ Should start a preview server.

**Step 3: Test in browser**
- Open http://localhost:4173/Snowman/
- Test all pages (login, home, features, etc.)
- Test dark mode toggle
- Test hover effects
- Test responsive design (resize browser)

✅ If everything works locally, it will work on Vercel.

---

## 2️⃣ GIT & GITHUB PREPARATION

### What Local Changes Must Be Committed

**Check current status:**
```bash
git status
```

**Expected output:**
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

If you see uncommitted changes:

**1. Review changes:**
```bash
git diff
```

**2. Stage all changes:**
```bash
git add .
```

**3. Commit with clear message:**
```bash
git commit -m "Add performance optimizations and Vercel deployment setup"
```

**4. Verify commit:**
```bash
git log --oneline -3
```

### Ensure GitHub Repo Matches Local

**Check if local and remote are in sync:**
```bash
git status
```

Expected:
```
Your branch is up to date with 'origin/main'.
```

**If behind:**
```bash
git pull origin main
```

**If ahead (local has commits not on GitHub):**
```bash
git push origin main
```

**If there are conflicts:**
```bash
# DO NOT MERGE - use local as source of truth
git push -f origin main
```

### Branch Selection Rules

**For Vercel deployment:**
- ✅ Use `main` branch (default)
- ✅ Use `develop` branch (if you have one)
- ❌ Do NOT use feature branches for production

**Recommended setup:**
```
main          → Production (deployed to Vercel)
develop       → Staging (optional)
feature/*     → Development (local only)
```

### What Vercel Expects from GitHub

Vercel will look for:
1. ✅ `package.json` in root (or specified root directory)
2. ✅ `vite.config.ts` (build configuration)
3. ✅ `src/` directory (source code)
4. ✅ `.gitignore` (to exclude node_modules, dist, etc.)
5. ✅ No `dist/` folder committed (Vercel builds it)

**Verify with:**
```bash
git ls-files | grep -E "(package.json|vite.config|src/)" | head -5
```

### Common Mistakes That Break Deployment

❌ **Mistake 1: Committing `node_modules/`**
- Makes repo huge (100MB+)
- Vercel will reinstall anyway
- Fix: Add to `.gitignore` and remove from Git

❌ **Mistake 2: Committing `dist/` folder**
- Vercel builds this automatically
- Causes conflicts
- Fix: Add to `.gitignore` and remove from Git

❌ **Mistake 3: Missing `package.json` scripts**
- Vercel won't know how to build
- Fix: Ensure `"build": "vite build"` exists

❌ **Mistake 4: Wrong `base` path in vite.config.ts**
- For Vercel: `base: "/"` (root domain)
- For GitHub Pages: `base: "/Snowman/"` (subdirectory)
- Fix: Change based on deployment target

❌ **Mistake 5: Environment variables not set**
- Build fails if code references missing env vars
- Fix: Set in Vercel dashboard

---

## 3️⃣ VERCEL DASHBOARD – STEP BY STEP

### Prerequisites

1. ✅ GitHub account with your repository
2. ✅ Vercel account (free tier is fine)
3. ✅ Local code committed and pushed to GitHub

### Step 1: Connect GitHub to Vercel

**1. Go to Vercel:**
```
https://vercel.com
```

**2. Click "Sign Up" or "Log In"**
- Use GitHub account for easiest setup

**3. Click "New Project"**

**4. Click "Import Git Repository"**

**5. Search for your repository:**
- Type: `Snowman`
- Select: `Pandiharshan/Snowman`

**6. Click "Import"**

### Step 2: Configure Project Settings

After importing, you'll see the configuration page:

#### **Framework Preset**

**What to select:** `Vite`

**Why:** Vercel auto-detects Vite from `vite.config.ts`, but if it doesn't:
- Click dropdown
- Select `Vite`
- Vercel will auto-fill build settings

#### **Build Command**

**What to use:** `npm run build`

**Why:** This is the standard Vite build command. Vercel will:
1. Run `npm install` (automatically)
2. Run `npm run build` (your command)
3. Deploy the `dist/` folder

**Verify it shows:**
```
Build Command: npm run build
```

#### **Output Directory**

**What to use:** `dist`

**Why:** Vite outputs the production build to `dist/` folder. Vercel will serve files from here.

**Verify it shows:**
```
Output Directory: dist
```

#### **Root Directory**

**When to change:** Only if your `package.json` is NOT in the project root.

**For this project:** Leave as `.` (current directory)

**Verify it shows:**
```
Root Directory: .
```

#### **Environment Variables**

**Check if needed:**

1. Does your code use `import.meta.env.VITE_*`?
   ```bash
   grep -r "import.meta.env.VITE_" src/
   ```

2. If yes, add them:
   - Click "Environment Variables"
   - Add each variable:
     - Name: `VITE_API_URL`
     - Value: `https://api.example.com`
   - Click "Add"

**For this project:** Likely no environment variables needed (check your code).

### Step 3: Important Configuration for This Project

**⚠️ CRITICAL: Update vite.config.ts for Vercel**

Your current `vite.config.ts` has:
```typescript
base: "/Snowman/",
```

This is for GitHub Pages (subdirectory). For Vercel (root domain), change to:

```typescript
base: "/",
```

**Why:** 
- GitHub Pages: `https://pandiharshan.github.io/Snowman/` (subdirectory)
- Vercel: `https://snowman.vercel.app/` (root domain)

**Update the file:**
```bash
# Edit vite.config.ts
# Change: base: "/Snowman/",
# To:     base: "/",
```

**Then commit and push:**
```bash
git add vite.config.ts
git commit -m "Update base path for Vercel deployment"
git push origin main
```

### Step 4: Deploy

**1. Review all settings one more time:**
- Framework: `Vite` ✅
- Build Command: `npm run build` ✅
- Output Directory: `dist` ✅
- Root Directory: `.` ✅
- Environment Variables: (if needed) ✅

**2. Click "Deploy"**

**3. Wait for deployment to complete**

Expected timeline:
- 0-30 seconds: Installing dependencies
- 30-60 seconds: Building project
- 60-90 seconds: Deploying to CDN
- Total: ~2-3 minutes

**4. You'll see:**
```
✓ Deployment Complete
🎉 Your site is live at: https://snowman-xxx.vercel.app
```

### What Happens Internally

When you click "Deploy", Vercel:

1. **Clones your GitHub repo** (latest commit)
2. **Installs dependencies** (`npm install`)
3. **Runs build command** (`npm run build`)
4. **Uploads `dist/` folder** to Vercel's CDN
5. **Assigns domain** (snowman-xxx.vercel.app)
6. **Enables HTTPS** (automatic)
7. **Sets up caching** (automatic)

---

## 4️⃣ AFTER DEPLOY – VERIFICATION

### Verify Live Site Uses Latest Commit

**1. Get your Vercel URL:**
```
https://snowman-xxx.vercel.app
```

**2. Visit the site and check:**
- ✅ All pages load
- ✅ Dark mode works
- ✅ Hover effects work
- ✅ 3D model loads
- ✅ Forms work
- ✅ Responsive design works

**3. Check browser console for errors:**
- Open DevTools (F12)
- Go to "Console" tab
- Should see NO red errors

**4. Verify it's the latest commit:**
- Check page source (Ctrl+U)
- Look for build timestamp or version
- Or check Vercel dashboard for deployment time

### Check Build Logs

**1. Go to Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**2. Click your project: `Snowman`**

**3. Click "Deployments" tab**

**4. Click the latest deployment**

**5. Click "Build Logs"**

**Expected output:**
```
> npm install
added 1234 packages

> npm run build
✓ 1234 modules transformed.
dist/index.html                   0.50 kB
dist/assets/index-abc123.js     250.45 kB
dist/assets/index-def456.css     45.67 kB

✓ Build completed successfully
```

### Debug: Page is Blank

**Possible causes:**

1. **Wrong base path**
   - Check vite.config.ts: should be `base: "/"`
   - Fix and redeploy

2. **JavaScript not loading**
   - Open DevTools (F12)
   - Go to "Network" tab
   - Reload page
   - Check if JS files load (should be green 200 status)
   - If red 404: base path is wrong

3. **React not mounting**
   - Check Console tab for errors
   - Look for "Cannot find element with id 'root'"
   - Verify `public/index.html` has `<div id="root"></div>`

**Fix:**
```bash
# Update vite.config.ts
# Ensure: base: "/"

# Rebuild and push
git add vite.config.ts
git commit -m "Fix base path"
git push origin main

# Vercel will auto-redeploy
```

### Debug: Assets Not Loading

**Possible causes:**

1. **CSS not loading**
   - Check Network tab: CSS files should be 200
   - If 404: base path issue
   - If loaded but not applied: CSS import issue

2. **Images not loading**
   - Check Network tab: image files should be 200
   - If 404: path is wrong
   - Verify images are in `public/` folder

3. **3D model not loading**
   - Check Network tab: `.glb` file should be 200
   - If 404: path is wrong
   - Verify model is in `public/assets/models/`

**Fix:**
```bash
# Check public folder structure
ls -la public/

# Verify all assets are there
ls -la public/assets/
ls -la public/assets/models/

# If missing, add them and push
git add public/
git commit -m "Add missing assets"
git push origin main
```

### Debug: Routes Not Working

**Possible causes:**

1. **React Router not configured for SPA**
   - Vercel needs to redirect all routes to `index.html`
   - Create `vercel.json` in root

**Fix:**

Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Then:
```bash
git add vercel.json
git commit -m "Add Vercel SPA routing configuration"
git push origin main
```

### Debug: CSS / JS Missing

**Possible causes:**

1. **Build didn't include files**
   - Check build logs for errors
   - Verify all imports are correct

2. **Files not committed to Git**
   - Check: `git status`
   - Verify all source files are tracked

3. **Tailwind CSS not building**
   - Check `tailwind.config.ts` has correct paths
   - Verify `postcss.config.js` exists

**Fix:**
```bash
# Rebuild locally
npm run build

# Check dist/ folder
ls -la dist/assets/

# If CSS/JS missing, check for build errors
npm run build 2>&1 | grep -i error

# Fix errors, then push
git add .
git commit -m "Fix build errors"
git push origin main
```

---

## 5️⃣ TROUBLESHOOTING

### Deployment Failed

**Check build logs:**
1. Go to Vercel Dashboard
2. Click project
3. Click "Deployments"
4. Click failed deployment
5. Click "Build Logs"
6. Look for red error messages

**Common errors:**

| Error | Fix |
|-------|-----|
| `npm ERR! code ERESOLVE` | Delete `package-lock.json`, run `npm install`, push |
| `Cannot find module '@/'` | Check `tsconfig.json` has path alias |
| `VITE_* is not defined` | Add environment variable in Vercel dashboard |
| `dist/ folder not found` | Check build command is `npm run build` |

### Site Works Locally But Not on Vercel

**Checklist:**

1. ✅ Did you update `vite.config.ts` base path to `/`?
2. ✅ Did you commit and push changes?
3. ✅ Did Vercel redeploy (check Deployments tab)?
4. ✅ Did you clear browser cache (Ctrl+Shift+Delete)?
5. ✅ Are all assets in `public/` folder?
6. ✅ Are all imports using correct paths?

### Vercel Won't Redeploy After Push

**Solution:**

1. Go to Vercel Dashboard
2. Click project
3. Click "Deployments"
4. Click "..." menu on latest deployment
5. Click "Redeploy"

Or:

```bash
# Make a dummy commit to trigger redeploy
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## 6️⃣ README.md UPDATES

Update your README.md with deployment information:

### Add Deployment Section

Add this after the "Live Demo" section:

```markdown
## 🚀 Deployment

### Live Deployment
- **GitHub Pages:** [https://pandiharshan.github.io/Snowman/](https://pandiharshan.github.io/Snowman/)
- **Vercel:** [https://snowman-vercel.vercel.app](https://snowman-vercel.vercel.app)

### Deploy to Vercel

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/Pandiharshan/Snowman.git
   cd Snowman
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test locally**
   ```bash
   npm run dev
   npm run build
   npm run preview
   ```

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

5. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

**Important:** Update `vite.config.ts` base path:
- For Vercel: `base: "/"`
- For GitHub Pages: `base: "/Snowman/"`

### Local Development

**Start development server:**
```bash
npm install
npm run dev
```

Visit: http://localhost:5174/Snowman/

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

Visit: http://localhost:4173/Snowman/

### Environment Variables

No environment variables required for basic deployment.

If you add API endpoints, create `.env.local`:
```
VITE_API_URL=https://api.example.com
```

Then add to Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add `VITE_API_URL` with your value

### Troubleshooting Deployment

**Page is blank:**
- Check `vite.config.ts` has `base: "/"`
- Check browser console (F12) for errors

**Assets not loading:**
- Verify `public/` folder is committed
- Check Network tab in DevTools

**Routes not working:**
- Create `vercel.json` with SPA rewrites (see DEPLOYMENT_GUIDE.md)

For more details, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
```

### Update Tech Stack Section

Add Vercel badge:

```markdown
### 🚀 Deployment
- **Vercel** - Serverless deployment platform
```

### Add Vercel Badge (Optional)

Add to top of README:

```markdown
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://snowman-vercel.vercel.app)
```

---

## ✅ FINAL CHECKLIST

Before deploying, verify:

- [ ] Local project runs: `npm run dev` ✅
- [ ] Production build works: `npm run build` && `npm run preview` ✅
- [ ] No uncommitted changes: `git status` shows clean ✅
- [ ] Latest commit pushed: `git push origin main` ✅
- [ ] `vite.config.ts` has `base: "/"` for Vercel ✅
- [ ] All assets in `public/` folder ✅
- [ ] No `node_modules/` or `dist/` in Git ✅
- [ ] GitHub repo is public (Vercel can access it) ✅
- [ ] Vercel account created and linked to GitHub ✅

---

## 🎉 YOU'RE READY TO DEPLOY!

Follow the steps above and your site will be live on Vercel in minutes.

**Questions?** Check the troubleshooting section or Vercel docs: https://vercel.com/docs

