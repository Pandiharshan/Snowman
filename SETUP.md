# Snowman - Quick Setup Guide

## ✅ Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ (comes with Node.js)
- Git (optional, for version control)

## 🚀 Installation & Setup

### Step 1: Install Dependencies
```bash
cd snowman
npm install
```

This installs all required packages including:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- And 30+ other dependencies

### Step 2: Start Development Server
```bash
npm run dev
```

Output:
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: http://YOUR_IP:5174/
```

Open http://localhost:5174 in your browser.

### Step 3: Start Developing

Edit files in `src/` and see changes instantly (Hot Module Replacement).

---

## 📁 Project Structure at a Glance

```
snowman/
├── src/
│   ├── app/App.tsx              ← Main app & routing
│   ├── pages/                   ← Page components
│   │   ├── Login/               ← Premium login page
│   │   ├── Home/                ← Home page
│   │   └── NotFound/            ← 404 page
│   ├── components/              ← Reusable components
│   ├── features/                ← Feature-specific logic
│   ├── hooks/                   ← Custom React hooks
│   ├── lib/                     ← Utilities
│   ├── services/                ← API services
│   ├── styles/                  ← Global styles
│   └── index.tsx                ← React entry point
├── public/                      ← Static assets
├── package.json                 ← Dependencies
├── vite.config.ts               ← Vite config
├── tsconfig.json                ← TypeScript config
├── tailwind.config.ts           ← Tailwind config
└── README.md                    ← Documentation
```

---

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/App.tsx` | Main app component with routing |
| `src/pages/Login/Login.tsx` | Premium login page |
| `src/styles/global.css` | Design system & global styles |
| `vite.config.ts` | Build configuration (port: 5174) |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `package.json` | Dependencies & scripts |

---

## 🛠️ Common Tasks

### Add a New Page

1. Create folder: `src/pages/MyPage/`
2. Create component: `src/pages/MyPage/MyPage.tsx`
3. Add route in `src/app/App.tsx`:
```typescript
import MyPage from "@/pages/MyPage/MyPage";

// In Routes:
<Route path="/my-page" element={<MyPage />} />
```

### Use a shadcn/ui Component

```typescript
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

### Add Global Styles

Edit `src/styles/global.css` to add CSS variables, animations, or global classes.

### Change Colors

Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --primary: hsl(200, 80%, 52%);  /* Change this */
}
```

---

## 📦 Available Scripts

```bash
npm run dev          # Start dev server (port 5174)
npm run build        # Create production build
npm run build:dev    # Create dev build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

---

## 🎨 Customization

### Change Port
Edit `vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change this
}
```

### Change Theme Colors
Edit `src/styles/global.css` - all colors are HSL variables.

### Add Dark Mode
Already supported! Colors automatically switch with `.dark` class.

---

## 🚀 Building for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready to deploy.

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3000
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
- Check `tsconfig.json` settings
- Ensure all imports have correct paths
- Use `@/` alias for src imports

### Styles Not Loading
- Check `src/styles/global.css` is imported in `src/index.tsx`
- Verify Tailwind config includes correct paths
- Clear browser cache

---

## 📚 Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. ✅ Explore the login page
4. ✅ Read ARCHITECTURE.md for detailed structure
5. ✅ Start building your features!

---

## 🔗 Useful Links

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

## 💡 Tips

- Use `@/` prefix for imports (configured in tsconfig.json)
- Keep components small and focused
- Use TypeScript for type safety
- Check browser console for errors
- Use React DevTools browser extension for debugging

---

**Happy coding! ❄️**
