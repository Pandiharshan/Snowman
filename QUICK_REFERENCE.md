# Snowman - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```bash
cd snowman
npm install
npm run dev
# Open http://localhost:5174
```

---

## 📁 Where to Find Things

| What | Where |
|------|-------|
| Login Page | `src/pages/Login/` |
| Home Page | `src/pages/Home/` |
| App Routing | `src/app/App.tsx` |
| Global Styles | `src/styles/global.css` |
| UI Components | `src/components/ui/` |
| Custom Hooks | `src/hooks/` |
| Features | `src/features/` |
| API Services | `src/services/` |
| Static Assets | `public/assets/` |
| Configuration | Root folder (vite.config.ts, etc.) |

---

## 🎨 Common Customizations

### Change Primary Color
Edit `src/styles/global.css`:
```css
:root {
  --primary: hsl(200, 80%, 52%);  /* Change this */
}
```

### Change Port
Edit `vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change this
}
```

### Add New Page
1. Create `src/pages/MyPage/MyPage.tsx`
2. Add route in `src/app/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Use shadcn/ui Component
```typescript
import { Button } from "@/components/ui/button";

<Button>Click me</Button>
```

---

## 💻 Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality
npm run preview      # Preview production build
```

---

## 📐 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `MyComponent.tsx` |
| Hooks | camelCase + use | `useMyHook.ts` |
| Utilities | camelCase | `myUtility.ts` |
| Constants | UPPER_SNAKE_CASE | `MY_CONSTANT` |
| CSS Classes | kebab-case | `my-class-name` |
| Folders | kebab-case | `my-feature/` |

---

## 🔗 Import Paths

```typescript
// Use @ alias (configured in tsconfig.json)
import { Button } from "@/components/ui/button";
import { useMyHook } from "@/hooks/useMyHook";
import { myUtil } from "@/lib/utils";

// NOT this:
import { Button } from "../../../components/ui/button";
```

---

## 🎯 Project Structure at a Glance

```
src/
├── app/App.tsx              ← Routing
├── pages/                   ← Page components
├── components/              ← Reusable components
├── features/                ← Feature logic
├── hooks/                   ← Custom hooks
├── lib/                     ← Utilities
├── services/                ← API calls
├── styles/                  ← Global styles
└── index.tsx                ← Entry point
```

---

## 🎨 Design System Quick Reference

### Colors
```
Primary:      hsl(200, 80%, 52%)   - Icy Blue
Secondary:    hsl(210, 40%, 96.1%) - Frost White
Accent:       hsl(200, 85%, 60%)   - Snowflake Blue
Background:   hsl(210, 40%, 98%)   - Light Snow
Foreground:   hsl(210, 45%, 20%)   - Dark Blue
```

### Spacing (Tailwind)
```
p-1 = 4px    p-2 = 8px    p-4 = 16px   p-8 = 32px
m-1 = 4px    m-2 = 8px    m-4 = 16px   m-8 = 32px
```

### Border Radius
```
rounded = 8px
rounded-lg = 12px
rounded-full = 50%
```

---

## 🧩 Component Template

```typescript
// src/components/MyComponent.tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const MyComponent = ({ className, children }: MyComponentProps) => {
  return (
    <div className={cn("base-class", className)}>
      {children}
    </div>
  );
};
```

---

## 🪝 Hook Template

```typescript
// src/hooks/useMyHook.ts
import { useState, useEffect } from "react";

export const useMyHook = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Logic here
  }, []);

  return { state };
};
```

---

## 📄 Page Template

```typescript
// src/pages/MyPage/MyPage.tsx
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="my-page-container">
      <h1>My Page</h1>
    </div>
  );
};

export default MyPage;
```

---

## 🔄 Routing Quick Reference

```typescript
// In src/app/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/my-page" element={<MyPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## 🎯 Form Handling with React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const MyForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email")} />
      <input {...register("password")} type="password" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## 🔔 Toast Notifications

```typescript
import { useToast } from "@/hooks/use-toast";

export const MyComponent = () => {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast({
          title: "Success",
          description: "Operation completed",
        })
      }
    >
      Show Toast
    </button>
  );
};
```

---

## 📱 Mobile Detection

```typescript
import { useIsMobile } from "@/hooks/use-mobile";

export const MyComponent = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};
```

---

## 🎬 Animations

### Global Animations (in global.css)
```css
.animate-snowfall {
  animation: snowfall 10s linear infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}
```

### Tailwind Animations
```html
<div class="animate-bounce">Bouncing</div>
<div class="animate-spin">Spinning</div>
<div class="animate-pulse">Pulsing</div>
```

---

## 🌙 Dark Mode

### Enable Dark Mode
```typescript
// In component
<html className="dark">
  {/* Content */}
</html>
```

### Use Dark Mode Colors
```css
.dark {
  --primary: hsl(200, 85%, 65%);
}
```

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5174 in use | Change port in `vite.config.ts` |
| Styles not loading | Check `src/styles/global.css` import |
| Component not found | Verify path uses `@/` alias |
| TypeScript errors | Check `tsconfig.json` |
| Build fails | Run `npm install` again |
| HMR not working | Restart dev server |

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Setup instructions
- `ARCHITECTURE.md` - Detailed architecture
- `PROJECT_SUMMARY.md` - Project overview
- `QUICK_REFERENCE.md` - This file

---

## 🔗 Useful Links

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

## 💡 Pro Tips

1. Use `@/` prefix for all imports
2. Keep components small and focused
3. Use TypeScript for type safety
4. Check browser console for errors
5. Use React DevTools for debugging
6. Commit frequently to git
7. Test on mobile devices
8. Use ESLint to catch issues early

---

## ✅ Checklist for New Features

- [ ] Create feature folder in `src/features/`
- [ ] Create component in `src/components/`
- [ ] Create page in `src/pages/` (if needed)
- [ ] Add route in `src/app/App.tsx`
- [ ] Add TypeScript types
- [ ] Test on mobile
- [ ] Run `npm run lint`
- [ ] Commit to git

---

**Happy Coding! ❄️**

For more details, see:
- SETUP.md - Getting started
- ARCHITECTURE.md - Project structure
- PROJECT_SUMMARY.md - Complete overview
