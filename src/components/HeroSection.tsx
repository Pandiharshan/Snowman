import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SnowmanModel from './SnowmanModel';
import ShineEffect from './ShineEffect';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  username: string | null;
}

// Memoized snow particle component
const SnowParticle = React.memo(({ index }: { index: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-white/60 dark:bg-white/20 rounded-full"
    initial={{
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: -20,
    }}
    animate={{
      y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
      x: `+=${Math.sin(index) * 100}`,
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay: Math.random() * 5,
      ease: "linear",
    }}
    style={{
      filter: 'blur(1px)',
      willChange: 'transform',
    }}
  />
));

SnowParticle.displayName = 'SnowParticle';

const HeroSection = ({ username }: HeroSectionProps) => {
  // Memoize particle array to prevent recreation
  const particles = useMemo(() => [...Array(30)].map((_, i) => i), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-700" />
      
      {/* Animated snow particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((i) => (
          <SnowParticle key={i} index={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100/80 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Welcome to the Winter Wonderland</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-slate-800 dark:text-white">Welcome,</span>
            <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {username || 'Explorer'}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Discover the magic of Snowman — your gateway to premium experiences, 
            meaningful connections, and endless possibilities.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ShineEffect>
              <motion.button
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </ShineEffect>
            <motion.button
              className="px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right - 3D Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <SnowmanModel />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
