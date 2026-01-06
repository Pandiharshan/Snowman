import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, BookOpen, Images, Snowflake } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CollectionsSection from './CollectionsSection';

interface PathCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  gradient: string;
  delay: number;
  onClick?: () => void;
}

const PathCard = React.memo(({ icon: Icon, title, subtitle, gradient, delay, onClick }: PathCardProps) => {
  const { isDark } = useTheme();
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        group relative w-full p-8 rounded-3xl text-left
        ${isDark ? 'bg-[#0a0a0a]' : 'bg-slate-50'}
        border ${isDark ? 'border-white/10' : 'border-slate-200'}
        hover:border-slate-300 dark:hover:border-white/20
        shadow-sm hover:shadow-lg
        transition-all duration-500
      `}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        y: -6,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Subtle glow on hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ scale: 1.05, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          {subtitle}
        </p>
      </div>
    </motion.button>
  );
});

PathCard.displayName = 'PathCard';

const World = React.memo(() => {
  const { username, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const paths = [
    {
      icon: Sparkles,
      title: 'Create an Image',
      subtitle: 'Bring your imagination to life with words',
      gradient: 'from-sky-500 to-blue-600',
      onClick: () => navigate('/create'),
    },
    {
      icon: BookOpen,
      title: 'Learn with Snowman',
      subtitle: 'Discover how to write amazing prompts',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: Images,
      title: 'See Your Creations',
      subtitle: 'View all the wonderful things you made',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen dark:bg-none transition-colors duration-700">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Snowman Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 mb-8"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Snowflake className="w-10 h-10 text-sky-500" />
            </motion.div>

            {/* Greeting */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-slate-800 dark:text-white">Hello, </span>
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                {username || 'Friend'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              What would you like to do today?
            </motion.p>
          </motion.div>

          {/* Path Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {paths.map((path, index) => (
              <PathCard
                key={path.title}
                icon={path.icon}
                title={path.title}
                subtitle={path.subtitle}
                gradient={path.gradient}
                delay={0.4 + index * 0.1}
                onClick={path.onClick}
              />
            ))}
          </div>

        </div>

        {/* Collections Section */}
        <CollectionsSection />
      </main>

      <Footer />
    </div>
  );
});

World.displayName = 'World';

export default World;
