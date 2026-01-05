# ✅ Vercel Deployment Checklist

Quick reference checklist before deploying to Vercel.

---

## 🔍 PRE-DEPLOYMENT CHECKS

### Local Project
- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts successfully
- [ ] Site works at http://localhost:5174/Snowman/
- [ ] `npm run build` completes without errors
- [ ] `dist/` folder is created with files
- [ ] `npm run preview` works at http://localhost:4173/Snowman/
- [ ] All pages load correctly in preview
- [ ] Dark mode toggle works
- [ ] Hover effects work
- [ ] 3D model loads
- [ ] Forms work
- [ ] No console errors (F12 → Console)

### Git & GitHub
- [ ] All local changes committed: `git status` shows clean
- [ ] Latest commit pushed: `git push origin main`
- [ ] GitHub repo is public (Vercel can access)
- [ ] `node_modules/` is in `.gitignore`
- [ ] `dist/` is in `.gitignore`
- [ ] `.env` files are in `.gitignore`

### Configuration Files
- [ ] `package.json` exists with `"build": "vite build"`
- [ ] `vite.config.ts` exists
- [ ] `vite.config.ts` has `base: "/"` (for Vercel)
- [ ] `tsconfig.json` exists
- [ ] `tailwind.config.ts` exists
- [ ] `postcss.config.js` exists

### Assets
- [ ] `public/` folder exists
- [ ] All images are in `public/assets/images/`
- [ ] 3D model is in `public/assets/models/`
- [ ] All assets are committed to Git

---

## 🚀 VERCEL DEPLOYMENT STEPS

### 1. Vercel Account Setup
- [ ] Vercel account created (https://vercel.com)
- [ ] GitHub connected to Vercel
- [ ] GitHub repository is accessible

### 2. Import Project
- [ ] Click "New Project"
- [ ] Click "Import Git Repository"
- [ ] Search and select `Pandiharshan/Snowman`
- [ ] Click "Import"

### 3. Configure Settings
- [ ] Framework: `Vite` selected
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Root Directory: `.`
- [ ] Environment Variables: (none needed unless you added API calls)

### 4. Deploy
- [ ] Review all settings one more time
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (2-3 minutes)
- [ ] Note the deployment URL: `https://snowman-xxx.vercel.app`

---

## ✅ POST-DEPLOYMENT VERIFICATION

### Live Site Testing
- [ ] Site loads at Vercel URL
- [ ] All pages accessible
- [ ] Dark mode works
- [ ] Hover effects work
- [ ] 3D model loads
- [ ] Forms work
- [ ] Responsive design works (test on mobile)
- [ ] No console errors (F12 → Console)

### Build Verification
- [ ] Go to Vercel Dashboard
- [ ] Click project
- [ ] Click "Deployments"
- [ ] Click latest deployment
- [ ] Click "Build Logs"
- [ ] Verify build completed successfully
- [ ] No red error messages

### Asset Verification
- [ ] Open DevTools (F12)
- [ ] Go to "Network" tab
- [ ] Reload page
- [ ] Check all files load (green 200 status)
- [ ] No 404 errors for CSS, JS, or images

---

## 🔧 TROUBLESHOOTING

### Page is Blank
- [ ] Check `vite.config.ts` has `base: "/"`
- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Verify `public/index.html` has `<div id="root"></div>`

### Assets Not Loading
- [ ] Check Network tab for 404 errors
- [ ] Verify `public/` folder is committed
- [ ] Check file paths in code
- [ ] Verify images are in `public/assets/`

### Routes Not Working
- [ ] Create `vercel.json` with SPA rewrites
- [ ] Commit and push `vercel.json`
- [ ] Redeploy on Vercel

### Build Failed
- [ ] Check build logs for error messages
- [ ] Verify `package.json` has all dependencies
- [ ] Verify `vite.config.ts` is correct
- [ ] Try deleting `package-lock.json` and redeploying

---

## 📝 AFTER DEPLOYMENT

### Update Documentation
- [ ] Update README.md with Vercel deployment link
- [ ] Add Vercel badge to README
- [ ] Update deployment instructions in README
- [ ] Commit and push changes

### Monitor Deployment
- [ ] Check Vercel Dashboard regularly
- [ ] Monitor build logs for errors
- [ ] Test site after each update
- [ ] Keep GitHub repo updated

### Future Updates
- [ ] Make changes locally
- [ ] Test with `npm run dev` and `npm run preview`
- [ ] Commit and push to GitHub
- [ ] Vercel will auto-redeploy
- [ ] Verify live site updated

---

## 🎉 YOU'RE DONE!

Your site is now live on Vercel and will auto-deploy whenever you push to GitHub.

**Vercel URL:** https://snowman-xxx.vercel.app

**GitHub:** https://github.com/Pandiharshan/Snowman

**Next Steps:**
- Share your live site with others
- Monitor performance in Vercel Dashboard
- Make updates and push to GitHub (auto-deploys)
- Consider custom domain (optional)

