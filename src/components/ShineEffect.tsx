import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ShineEffectProps {
  children: React.ReactNode;
  className?: string;
}

const ShineEffect = React.memo(({ children, className = '' }: ShineEffectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Shine effect - thin light band sweep, clipped to card */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
          style={{
            zIndex: 20,
          }}
        >
          <motion.div
            className="absolute"
            style={{
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(135deg, transparent 0%, transparent 30%, hsla(0, 0%, 100%, 0.3) 45%, hsla(0, 0%, 100%, 0.5) 50%, hsla(0, 0%, 100%, 0.3) 55%, transparent 70%, transparent 100%)',
              filter: 'blur(2px)',
              willChange: 'transform',
            }}
            initial={{ transform: 'translate(-100%, -100%)', opacity: 0 }}
            animate={{ transform: 'translate(100%, 100%)', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </div>
  );
});

ShineEffect.displayName = 'ShineEffect';

export default ShineEffect;
