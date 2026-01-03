import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ShineEffectProps {
  children: React.ReactNode;
  className?: string;
}

const ShineEffect = ({ children, className = '' }: ShineEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Shine overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              transform: 'skewX(-20deg)',
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ShineEffect;
