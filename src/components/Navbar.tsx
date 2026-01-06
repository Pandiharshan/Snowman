import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { LogOut, Snowflake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = React.memo(() => {
  const { username, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  // Memoize glass background calculation
  const glassBackground = useMemo(() => {
    if (isDark) {
      return isHovered 
        ? 'rgba(30, 41, 59, 0.9)' 
        : 'rgba(30, 41, 59, 0.5)';
    }
    return isHovered 
      ? 'rgba(241, 245, 249, 0.95)' 
      : 'rgba(241, 245, 249, 0.8)';
  }, [isDark, isHovered]);

  // Memoize shadow style
  const shadowStyle = useMemo(() => ({
    boxShadow: scrolled 
      ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' 
      : '0 4px 16px rgba(0, 0, 0, 0.06)',
  }), [scrolled]);

  // Memoize border style
  const borderStyle = useMemo(() => ({
    border: isDark 
      ? '1px solid rgba(148, 163, 184, 0.1)' 
      : '1px solid rgba(203, 213, 225, 0.6)',
  }), [isDark]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="max-w-7xl mx-auto rounded-2xl px-6 py-4 transition-all duration-700 ease-out"
        style={{
          backdropFilter: isHovered ? 'blur(20px) saturate(180%)' : 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: isHovered ? 'blur(20px) saturate(180%)' : 'blur(8px) saturate(120%)',
          background: glassBackground,
          ...shadowStyle,
          ...borderStyle,
          willChange: 'background, box-shadow',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: 'transform' }}
            >
              <Snowflake className="w-8 h-8 text-sky-500 dark:text-sky-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400 bg-clip-text text-transparent">
              Snowman
            </span>
          </motion.div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-blue-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ willChange: 'transform' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {username && (
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">
                  {username}
                </span>
                <motion.button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
