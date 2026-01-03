# Snowman - Premium Interactive Experience

A modern, fully-featured web application built with cutting-edge technologies.

## 🎯 Project Overview

**Snowman** is a premium interactive experience built with:
- **Vite** - Ultra-fast build tool
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Headless component library

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

Built with ❄️ by the Snowman Team
