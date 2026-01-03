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
};

export default ShineEffect;
