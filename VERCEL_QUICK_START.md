# 🚀 Vercel Deployment - Quick Start (5 Minutes)

**TL;DR version** - Deploy to Vercel in 5 minutes.

---

## ⚡ 5-Minute Deployment

### Step 1: Prepare Local Code (1 min)

```bash
# Verify everything works locally
npm run build
npm run preview

# Commit any changes
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Update vite.config.ts (1 min)

**Change this:**
```typescript
base: "/Snowman/",  // ❌ GitHub Pages path
```

**To this:**
```typescript
base: "/",  // ✅ Vercel root path
```

**Then commit:**
```bash
git add vite.config.ts
git commit -m "Update base path for Vercel"
git push origin main
```

### Step 3: Deploy on Vercel (3 min)

1. Go to https://vercel.com
2. Click "New Project"
3. Click "Import Git Repository"
4. Select `Pandiharshan/Snowman`
5. Click "Deploy"
6. Wait 2-3 minutes...
7. ✅ Done! Your site is live

---

## 📋 What Vercel Auto-Detects

Vercel automatically detects:
- ✅ Framework: `Vite` (from vite.config.ts)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Node version: Latest LTS

**You don't need to configure anything!**

---

## 🔗 Your Live URL

After deployment, you'll get:
```
https://snowman-xxx.vercel.app
```

Share this link with anyone!

---

## 🔄 Auto-Redeploy

Every time you push to GitHub:
```bash
git push origin main
```

Vercel automatically:
1. Detects the push
2. Rebuilds your project
3. Deploys the new version
4. Your site updates instantly

**No manual redeploy needed!**

---

## ❌ Common Mistakes

| Mistake | Fix |
|---------|-----|
| Forgot to change `base: "/Snowman/"` to `base: "/"` | Update vite.config.ts and redeploy |
| Committed `node_modules/` or `dist/` | Add to .gitignore and remove from Git |
| Site is blank | Check browser console (F12) for errors |
| Assets not loading | Verify `public/` folder is committed |

---

## ✅ Verify Deployment

1. Visit your Vercel URL
2. Test all pages
3. Open DevTools (F12)
4. Check Console tab - should be clean
5. Check Network tab - all files should be 200 (green)

---

## 📚 Need More Help?

- **Full Guide:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Checklist:** See [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md)
- **Vercel Docs:** https://vercel.com/docs

---

## 🎉 That's It!

Your site is now deployed on Vercel and will auto-update whenever you push to GitHub.

**Enjoy your live site!** 🚀

