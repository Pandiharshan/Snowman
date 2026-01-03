# Snowman - Architecture & Branding Guide

## 🎯 Project Identity

**Project Name:** Snowman
**Version:** 1.0.0
**Type:** Premium Interactive Web Application
**Tech Stack:** Vite + React + TypeScript + Tailwind CSS + shadcn/ui

---

## 📐 Architecture Overview

### Core Principles
1. **Modular Structure** - Clear separation of concerns
2. **Feature-Based Organization** - Features grouped by functionality
3. **Scalability** - Easy to add new features and pages
4. **Type Safety** - Full TypeScript support
5. **Performance** - Optimized with Vite and React best practices
6. **Accessibility** - WCAG compliant components

---

## 📁 Directory Structure Explained

### `/src/app/`
**Purpose:** Application root and routing
- `App.tsx` - Main application component with routing setup
- Contains React Router configuration
- Wraps app with providers (QueryClient, Tooltip, etc.)

### `/src/pages/`
**Purpose:** Page-level components
- Each page in its own folder with related styles
- `Login/` - Premium login page with animations
- `Home/` - Dashboard/home page
- `NotFound/` - 404 error page
- **Pattern:** Each page folder contains `.tsx` and `.css` files

### `/src/components/`
**Purpose:** Reusable UI components
- `ui/` - shadcn/ui components (auto-generated)
- `layout/` - Layout components (Header, Footer, Sidebar, etc.)
- `feedback/` - Feedback components (Alerts, Toasts, etc.)
- **Pattern:** One component per file, organized by category

### `/src/features/`
**Purpose:** Feature-specific logic and utilities
- `auth/` - Authentication logic, login/logout, session management
- `animations/` - Animation utilities, keyframes, effects
- `cursor/` - Cursor effects, tracking, interactions
- `snowman/` - Snowman-specific features (3D model, interactions)
- `sound/` - Audio management, sound effects
- `theme/` - Theme switching, dark mode logic
- **Pattern:** Each feature is self-contained with its own logic

### `/src/hooks/`
**Purpose:** Custom React hooks
- `use-mobile.tsx` - Mobile device detection
- `use-toast.ts` - Toast notification hook
- **Pattern:** Reusable logic extracted into hooks

### `/src/lib/`
**Purpose:** Utility functions and helpers
- `utils.ts` - `cn()` function for class merging
- **Pattern:** Pure functions, no side effects

### `/src/services/`
**Purpose:** API calls and external integrations
- API client setup
- Backend communication
- Third-party service integration
- **Pattern:** Organized by service/endpoint

### `/src/utils/`
**Purpose:** General helper utilities
- String manipulation
- Date formatting
- Data transformation
- **Pattern:** Utility functions used across the app

### `/src/styles/`
**Purpose:** Global styles and design system
- `global.css` - Tailwind directives, CSS variables, animations
- **Pattern:** All design tokens defined here

### `/public/`
**Purpose:** Static assets
- `assets/icons/` - SVG icons
- `assets/images/` - Image files
- `assets/models/` - 3D models (snow_man.glb)
- `assets/sounds/` - Audio files
- `index.html` - HTML entry point

---

## 🎨 Design System

### Color Palette (Snowman Theme)

**Light Mode:**
```
Primary:      hsl(200, 80%, 52%)   - Icy Blue
Secondary:    hsl(210, 40%, 96.1%) - Frost White
Accent:       hsl(200, 85%, 60%)   - Snowflake Blue
Background:   hsl(210, 40%, 98%)   - Light Snow
Foreground:   hsl(210, 45%, 20%)   - Dark Blue
```

**Dark Mode:**
```
Primary:      hsl(200, 85%, 65%)   - Bright Icy Blue
Secondary:    hsl(210, 40%, 20%)   - Dark Frost
Accent:       hsl(200, 90%, 70%)   - Bright Snowflake
Background:   hsl(210, 40%, 10%)   - Midnight Snow
Foreground:   hsl(210, 40%, 98%)   - Light Text
```

### Typography
- **Font Family:** Inter, system fonts
- **Base Size:** 16px
- **Headings:** 650-700 font-weight
- **Body:** 400-450 font-weight
- **Responsive:** Scales with viewport

### Spacing
- Uses Tailwind's default spacing scale
- Base unit: 4px (0.25rem)
- Consistent padding/margin throughout

### Border Radius
- Default: 0.5rem (8px)
- Large: calc(var(--radius) - 2px)
- Small: calc(var(--radius) - 4px)

---

## 🔄 Data Flow

### State Management
1. **Local State** - Component-level with `useState`
2. **Server State** - React Query for API data
3. **Global State** - Context API (if needed)
4. **Theme State** - next-themes for dark mode

### API Integration Pattern
```typescript
// In services/
export const fetchUser = async (id: string) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// In components/
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/services/user';

const { data, isLoading } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
});
```

---

## 🔐 Authentication Flow

1. **Login Page** (`/src/pages/Login/`)
   - User enters credentials
   - Form validation with Zod
   - Submit to backend

2. **Auth Service** (`/src/features/auth/`)
   - Handle login/logout
   - Store tokens
   - Manage session

3. **Protected Routes**
   - Check authentication status
   - Redirect to login if needed

---

## 🎬 Animation System

### Global Animations (in `global.css`)
- `snowfall` - Falling snow effect
- `float` - Floating animation
- `glow` - Glowing effect

### Page-Specific Animations
- Login page: Cursor-reactive effects, button glow
- Custom animations in feature folders

### Usage
```css
.element {
  animation: snowfall 10s linear infinite;
}
```

---

## 🎯 Routing Structure

```
/                    → Login page (default)
/home                → Home/Dashboard page
/404 or /*           → Not Found page
```

### Adding New Routes
1. Create page in `/src/pages/`
2. Add route in `/src/app/App.tsx`
```typescript
<Route path="/new-page" element={<NewPage />} />
```

---

## 📦 Component Patterns

### Page Component Pattern
```typescript
// src/pages/MyPage/MyPage.tsx
import './MyPage.css';

const MyPage = () => {
  return (
    <div className="my-page-container">
      {/* Content */}
    </div>
  );
};

export default MyPage;
```

### Feature Component Pattern
```typescript
// src/features/myFeature/useMyFeature.ts
export const useMyFeature = () => {
  // Feature logic
};

// src/features/myFeature/MyFeature.tsx
import { useMyFeature } from './useMyFeature';

export const MyFeature = () => {
  const { data } = useMyFeature();
  return <div>{data}</div>;
};
```

### UI Component Pattern
```typescript
// src/components/MyComponent.tsx
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
}

export const MyComponent = ({ className }: MyComponentProps) => {
  return <div className={cn('base-class', className)} />;
};
```

---

## 🚀 Performance Optimization

### Code Splitting
- Automatic route-based splitting with React Router
- Lazy load heavy components

### Bundle Optimization
- Tree-shaking removes unused code
- Tailwind purges unused CSS
- Vite optimizes dependencies

### Runtime Performance
- React Query caches API responses
- Memoization for expensive computations
- Debouncing for frequent events

---

## 🧪 Testing Strategy

### Unit Tests
- Test utility functions
- Test hooks
- Test components in isolation

### Integration Tests
- Test feature workflows
- Test API integration
- Test routing

### E2E Tests
- Test complete user flows
- Test authentication
- Test critical paths

---

## 📝 Code Style Guide

### Naming Conventions
- **Components:** PascalCase (MyComponent.tsx)
- **Hooks:** camelCase with 'use' prefix (useMyHook.ts)
- **Utilities:** camelCase (myUtility.ts)
- **Constants:** UPPER_SNAKE_CASE (MY_CONSTANT)
- **CSS Classes:** kebab-case (my-class-name)

### File Organization
- One component per file
- Related files in same folder
- Index files for exports (optional)

### TypeScript
- Always define prop types
- Use interfaces for objects
- Avoid `any` type
- Use strict mode where possible

---

## 🔧 Development Workflow

### Local Development
```bash
npm install
npm run dev
# App runs on http://localhost:5174
```

### Building
```bash
npm run build
# Creates optimized dist/ folder
```

### Linting
```bash
npm run lint
# Checks code quality
```

---

## 📚 Adding New Features

### Step 1: Create Feature Folder
```
src/features/myFeature/
├── useMyFeature.ts
├── MyFeature.tsx
├── types.ts
└── constants.ts
```

### Step 2: Create Components
```
src/components/MyComponent.tsx
```

### Step 3: Create Page (if needed)
```
src/pages/MyPage/
├── MyPage.tsx
└── MyPage.css
```

### Step 4: Add Route
```typescript
// In App.tsx
<Route path="/my-page" element={<MyPage />} />
```

---

## 🎓 Best Practices

1. **Keep components small** - Single responsibility
2. **Use TypeScript** - Type safety prevents bugs
3. **Organize by feature** - Easy to find related code
4. **Reuse components** - DRY principle
5. **Document complex logic** - Comments for clarity
6. **Test critical paths** - Ensure reliability
7. **Optimize performance** - Monitor bundle size
8. **Follow conventions** - Consistency matters

---

## 🚨 Common Pitfalls to Avoid

1. ❌ Mixing business logic with UI
2. ❌ Creating deeply nested component trees
3. ❌ Prop drilling (use Context or state management)
4. ❌ Ignoring TypeScript errors
5. ❌ Not memoizing expensive computations
6. ❌ Hardcoding values (use constants)
7. ❌ Ignoring accessibility
8. ❌ Not handling errors gracefully

---

## 📞 Support & Resources

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Radix UI Docs](https://www.radix-ui.com)

---

**Last Updated:** January 2026
**Maintained By:** Snowman Team
