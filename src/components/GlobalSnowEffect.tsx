import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Single snow particle - highly optimized
const SnowParticle = React.memo(({ index, delay }: { index: number; delay: number }) => {
  const startX = useMemo(() => Math.random() * 100, []);
  const drift = useMemo(() => Math.sin(index) * 15, [index]);
  const duration = useMemo(() => 10 + Math.random() * 8, []);
  const size = useMemo(() => 1.5 + Math.random() * 2, []);
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startX}%`,
        top: '-20px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        filter: 'blur(1px)',
        willChange: 'transform',
      }}
      animate={{
        y: ['0vh', '110vh'],
        x: [`0px`, `${drift}px`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
  );
});

SnowParticle.displayName = 'SnowParticle';

// Global snow effect - renders once, works everywhere
const GlobalSnowEffect = React.memo(() => {
  // Generate 40 particles with staggered delays for continuous effect
  const particles = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      id: i,
      delay: (i * 0.3) % 10, // Stagger delays to create continuous snowfall
    })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
      {particles.map(({ id, delay }) => (
        <SnowParticle key={id} index={id} delay={delay} />
      ))}
    </div>
  );
});

GlobalSnowEffect.displayName = 'GlobalSnowEffect';

export default GlobalSnowEffect;
