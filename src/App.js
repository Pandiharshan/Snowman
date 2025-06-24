import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SITE_NAME } from './Config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FeaturesPage from './pages/FeaturesPage';
import Snowfall from './components/snowfall';
import ThemeToggle from './components/ThemeToggle'; // ✅ Imported

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Helmet>
          <title>{SITE_NAME} | Elevate Collaboration</title>
        </Helmet>

        {/* Snowfall visible on all pages */}
        <Snowfall />

        {/* Theme toggle always visible in top-right corner */}
        <ThemeToggle /> {/* ✅ ADDED HERE */}

        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
