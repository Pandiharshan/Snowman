# ❄️ Snowman - Premium Interactive Experience

> A modern, fully-featured web application showcasing cutting-edge web technologies and premium UI/UX design.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge)](https://pandiharshan.github.io/Snowman/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge)](https://github.com/Pandiharshan/Snowman)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## 🎯 Project Overview

**Snowman** is a premium interactive web application built with modern technologies and professional architecture:

### ⚡ Tech Stack
- **Vite 5.4.19** - Ultra-fast build tool & dev server
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.8.3** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first styling
- **shadcn/ui** - 50+ beautiful, accessible components
- **Radix UI** - Headless component library
- **React Router 6.30.1** - Client-side routing
- **React Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation

## ✨ Key Features

### 🎨 Premium UI/UX
- **Cursor-Reactive Login Page** - Interactive effects that respond to mouse movement
- **Glassmorphism Design** - Modern frosted glass aesthetic
- **Diagonal Shine Animation** - Smooth, premium button hover effects
- **Dark Mode Support** - Seamless light/dark theme switching
- **Responsive Design** - Mobile-first, works on all devices

### 🏗️ Professional Architecture
- **Feature-Based Organization** - Scalable, maintainable code structure
- **Type Safety** - Full TypeScript support throughout
- **Component Library** - 50+ pre-built, accessible components
- **State Management** - React Query for server state, Context for global state
- **Form Validation** - React Hook Form + Zod for robust validation

### 🚀 Performance & Developer Experience
- **Hot Module Replacement (HMR)** - Instant code updates during development
- **Fast Build Times** - Vite's lightning-fast compilation
- **Code Quality** - ESLint configuration for consistent code
- **Production Optimized** - Tree-shaking, code splitting, minification

## 🎬 Live Demo

**[🌐 Visit Snowman Live Demo](https://pandiharshan.github.io/Snowman/)**

Experience the premium login page with:
- Cursor-reactive ambient lighting
- Floating label animations
- Diagonal shine effects on button hover
- Smooth, responsive interactions

## 🚀 Deployment

### Live Deployments
- **GitHub Pages:** [https://pandiharshan.github.io/Snowman/](https://pandiharshan.github.io/Snowman/)
- **Vercel:** Deploy your own version (see instructions below)

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPandiharshan%2FSnowman&project-name=snowman&repository-name=Snowman)

Or follow these steps:

1. **Fork this repository** on GitHub
2. **Go to [vercel.com](https://vercel.com)** and sign up (free)
3. **Click "New Project"** → **"Import Git Repository"**
4. **Select your forked repository**
5. **Vercel will auto-detect Vite** - just click **"Deploy"**

**⚠️ Important:** Update `vite.config.ts` before deploying:
```typescript
// For Vercel (root domain):
base: "/"

// For GitHub Pages (subdirectory):
base: "/Snowman/"
```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📖 Getting Started

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn

### Local Development

**1. Clone the repository:**
```bash
git clone https://github.com/Pandiharshan/Snowman.git
cd Snowman
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start development server:**
```bash
npm run dev
```

Visit: http://localhost:5174/Snowman/

**4. Build for production:**
```bash
npm run build
```

**5. Preview production build:**
```bash
npm run preview
```

Visit: http://localhost:4173/Snowman/

### Available Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Build for production
npm run build:dev # Build in development mode
npm run preview   # Preview production build locally
npm run lint      # Run ESLint to check code quality
```

### Environment Variables

No environment variables are required for basic deployment.

If you add API endpoints, create `.env.local`:
```
VITE_API_URL=https://api.example.com
```

Then add to Vercel dashboard:
- Project Settings → Environment Variables
- Add `VITE_API_URL` with your value

## 📁 Project Structure

```
snowman/
├── src/
│   ├── app/
│   │   └── App.tsx              # Main application component
│   ├── pages/
│   │   ├── Login/               # Premium login page
│   │   ├── Home/                # Home page
│   │   └── NotFound/            # 404 page
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── layout/              # Layout components
│   │   └── feedback/            # Feedback components
│   ├── features/
│   │   ├── auth/                # Authentication logic
│   │   ├── animations/          # Animation utilities
│   │   ├── cursor/              # Cursor effects
│   │   ├── snowman/             # Snowman-specific features
│   │   ├── sound/               # Sound effects
│   │   └── theme/               # Theme management
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   └── use-toast.ts         # Toast notifications
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── services/                # API services
│   ├── styles/
│   │   └── global.css           # Global styles & design system
│   ├── utils/                   # Helper utilities
│   ├── index.tsx                # React entry point
│   └── vite-env.d.ts            # Vite type definitions
├── public/
│   ├── assets/
│   │   ├── icons/               # Icon assets
│   │   ├── images/              # Image assets
│   │   ├── models/              # 3D models (e.g., snow_man.glb)
│   │   └── sounds/              # Audio files
│   └── index.html               # HTML entry point
├── Configuration Files
│   ├── vite.config.ts           # Vite configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── package.json             # Dependencies & scripts
│   ├── .gitignore               # Git ignore rules
│   └── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📦 Available Scripts

- `npm run dev` - Start development server (port 5174)
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Design System

### Colors (Snowman Theme)
- **Primary**: Icy Blue (`hsl(200, 80%, 52%)`)
- **Secondary**: Frost White (`hsl(210, 40%, 96.1%)`)
- **Accent**: Snowflake Blue (`hsl(200, 85%, 60%)`)
- **Background**: Light (`hsl(210, 40%, 98%)`)

### Dark Mode
All colors have dark mode variants automatically applied with `.dark` class.

### Typography
- Font: Inter, system fonts
- Base size: 16px
- Responsive scaling

## 🧩 Components

### UI Components (50+)
All shadcn/ui components are available:
- Buttons, Cards, Dialogs, Forms
- Tables, Tabs, Tooltips, Toasts
- Sidebars, Navigation, Dropdowns
- And many more...

### Custom Components
- Premium Login Page with cursor-reactive effects
- Responsive layouts
- Theme switcher
- Toast notifications

## 🔐 Authentication

The login page is ready for integration with your authentication service. Update the `handleSubmit` function in `src/pages/Login/Login.tsx` to connect with your backend.

## 🎭 Features

✅ Responsive design (mobile-first)
✅ Dark/light mode support
✅ Premium animations
✅ Cursor-reactive effects
✅ Form validation with Zod
✅ Server state management (React Query)
✅ Client-side routing
✅ Icon library (Lucide React)
✅ Charts and graphs (Recharts)
✅ Accessible components (WCAG compliant)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The `dist/` folder contains your production-ready application.

### Deploy to
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- AWS S3
- Any static host

## 📚 Documentation

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)

## 🛠️ Development

### Adding a New Page
1. Create a new folder in `src/pages/`
2. Add your component file
3. Import and add route in `src/app/App.tsx`

### Adding a New Component
1. Create component in `src/components/`
2. Import and use in your pages

### Using shadcn/ui Components
```typescript
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return <Button>Click me</Button>;
}
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue on GitHub or contact the development team.

---

## 👨‍💼 For Recruiters

This project demonstrates:

### ✅ Full-Stack Capabilities
- Modern React development with hooks and functional components
- TypeScript for type-safe, maintainable code
- Professional project architecture and organization
- State management with React Query
- Form handling and validation
- Responsive, mobile-first design

### ✅ UI/UX Excellence
- Premium, interactive user interfaces
- Smooth animations and transitions
- Accessibility compliance (WCAG)
- Dark mode implementation
- Cursor-reactive effects

### ✅ Development Best Practices
- Clean, well-organized code structure
- Comprehensive documentation
- ESLint configuration for code quality
- Git version control
- Production-ready build optimization

### ✅ Technologies Mastered
- Vite (modern build tooling)
- React 18 (latest features)
- TypeScript (type safety)
- Tailwind CSS (utility-first styling)
- shadcn/ui (component library)
- React Router (routing)
- React Query (data fetching)

**[🌐 View Live Demo](https://pandiharshan.github.io/Snowman/)** | **[📖 Read Documentation](./START_HERE.md)** | **[🏗️ Architecture Guide](./ARCHITECTURE.md)**

---

Built with ❄️ by the Snowman Team

**Developer:** [Pandiharshan](https://github.com/Pandiharshan)
**Email:** kit27.am35@gmail.com
**Repository:** [GitHub - Snowman](https://github.com/Pandiharshan/Snowman)
