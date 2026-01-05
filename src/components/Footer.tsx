import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = React.memo(() => {
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Memoize glass background calculation - same as navbar
  const glassBackground = useMemo(() => {
    if (isDark) {
      return isHovered 
        ? 'rgba(30, 41, 59, 0.9)' 
        : 'rgba(30, 41, 59, 0.5)';
    }
    return isHovered 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(255, 255, 255, 0.4)';
  }, [isDark, isHovered]);

  // Memoize border style - same as navbar
  const borderStyle = useMemo(() => ({
    border: isDark 
      ? '1px solid rgba(148, 163, 184, 0.1)' 
      : '1px solid rgba(255, 255, 255, 0.5)',
  }), [isDark]);

  return (
    <footer className="py-12 px-4 transition-colors duration-700">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="max-w-7xl mx-auto rounded-2xl px-6 py-4 transition-all duration-700 ease-out"
        style={{
          backdropFilter: isHovered ? 'blur(20px) saturate(180%)' : 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: isHovered ? 'blur(20px) saturate(180%)' : 'blur(8px) saturate(120%)',
          background: glassBackground,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          ...borderStyle,
          willChange: 'background, box-shadow',
        }}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: 'transform' }}
            >
              <Snowflake className="w-6 h-6 text-sky-500" />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Snowman
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              style={{ willChange: 'transform' }}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </motion.span>
            by Snowman Team © {new Date().getFullYear()}
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
