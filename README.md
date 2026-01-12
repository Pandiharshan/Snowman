# ❄️ SnowMan

**SnowMan** is a full-stack web application that delivers an immersive snow-themed experience through a responsive React frontend and a scalable Node.js + Express backend. The app features dynamic snowfall animations, REST API-driven wallpaper management, and a clean, modern UI.

---

## 🚀 Features

✅ Real-time snowfall animation using Canvas API  
✅ Fully responsive design (mobile, tablet, desktop)  
✅ Interactive UI built with React and CSS Modules  
✅ Dark/Light theme toggle with system preference detection  
✅ 3D Snowman model integration using Three.js  
✅ REST APIs for wallpaper upload/retrieval  
✅ Clean component architecture with lazy loading  
✅ Accessibility-first design with ARIA support  
✅ Frontend deployed on GitHub Pages  
✅ Backend ready for cloud deployment (Render, Railway)

---

## 🛠️ Tech Stack

| Frontend | Backend | Deployment |
|-----------|---------|-------------|
| React 19 | Node.js | GitHub Pages (frontend) |
| React Router v7 | Express 5 | Render / Railway (backend) |
| Three.js / React Three Fiber | Socket.io | |
| CSS Modules | REST API | |
| React Helmet | | |

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Pandiharshan/Snowman.git
cd Snowman
```

### 2️⃣ Install frontend dependencies
```bash
npm install
```

### 3️⃣ Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### 4️⃣ Run the development server
```bash
npm start
```

### 5️⃣ Run the backend server (separate terminal)
```bash
cd backend
npm run dev
```

---

## 📁 Project Structure

```
snowman/
├── public/
│   ├── index.html
│   └── models/
│       └── snow_man.glb
├── src/
│   ├── components/
│   │   ├── Navbar.js / Navbar.css
│   │   ├── Hero.js / Hero.css
│   │   ├── About.js / About.css
│   │   ├── Features.js / Features.css
│   │   ├── Contact.js / Contact.css
│   │   ├── Footer.js / Footer.css
│   │   ├── ThemeToggle.js / ThemeToggle.css
│   │   ├── snowfall.js
│   │   └── SnowmanModel.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── AboutPage.js
│   │   ├── ContactPage.js
│   │   └── FeaturesPage.js
│   ├── App.js / App.css
│   ├── Config.js
│   └── index.js / index.css
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── server.js
├── package.json
└── README.md
```

---

## 📅 Development Timeline

This project was developed from **June 24, 2025** to **December 18, 2025**.

> **Note:** This repository was re-initialized on December 18, 2025. The timeline below documents the actual development phases and milestones achieved during this period.

### Phase 1: Foundation (June 24 - July 10, 2025)
- Project initialization with Create React App
- Basic routing setup with React Router
- Core component structure (Navbar, Footer, Hero)
- Global CSS reset and base styling

### Phase 2: Core Components (July 11 - August 5, 2025)
- About section with content and styling
- Features grid with card animations
- Contact form with validation and accessibility
- Integration of all sections into HomePage
- ARIA roles and accessibility improvements

### Phase 3: Snowfall Animation (August 6 - August 25, 2025)
- Canvas-based snowfall animation
- Particle system with drift and speed variations
- Window resize handling and cleanup
- Performance optimization with requestAnimationFrame

### Phase 4: Theme System (August 26 - September 15, 2025)
- Dark/Light theme toggle component
- CSS custom properties for theming
- System preference detection
- LocalStorage persistence for user preference

### Phase 5: 3D Integration (September 16 - October 10, 2025)
- Three.js and React Three Fiber setup
- 3D Snowman model integration
- Lighting configuration (ambient, directional, point)
- OrbitControls for model interaction

### Phase 6: Backend Development (October 11 - November 5, 2025)
- Express server setup
- REST API routes for AI image generation
- CORS and middleware configuration
- Error handling middleware

### Phase 7: Polish & Optimization (November 6 - December 18, 2025)
- Lazy loading for route components
- Enhanced navbar with magical effects
- Footer animations and responsive design
- Performance optimizations
- Accessibility audit and fixes
- Documentation updates

---

## 🎨 Key Components

### Snowfall Animation
Custom Canvas-based particle system that creates realistic falling snow effect across all pages.

### Theme Toggle
Animated sun/moon toggle with smooth transitions, system preference detection, and localStorage persistence.

### 3D Snowman Model
Interactive Three.js model with custom lighting setup for optimal visibility in both light and dark themes.

---

## 📋 Detailed Progress Log

For a comprehensive month-by-month breakdown of development work, see [CHANGELOG.md](./CHANGELOG.md).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Pandi Harshan**
- GitHub: [@Pandiharshan](https://github.com/Pandiharshan)
- Email: pandiharshanofficial@gmail.com
