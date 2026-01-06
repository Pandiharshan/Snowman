import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface CollectionCardProps {
  id: string;
  title: string;
  hint?: string;
  imageUrl: string;
  height: 'tall' | 'medium' | 'short';
  delay: number;
}

const CollectionCard = React.memo(({ id, title, hint, imageUrl, height, delay }: CollectionCardProps) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const heightClasses = {
    tall: 'h-80',
    medium: 'h-64',
    short: 'h-52',
  };

  const handleClick = () => {
    navigate(`/collection/${id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`
        group relative overflow-hidden rounded-2xl
        ${heightClasses[height]}
        ${isDark ? 'bg-slate-900' : 'bg-slate-200'}
        cursor-pointer
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image with CSS-only hover zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Gradient overlay */}
      <div className={`
        absolute inset-0 
        bg-gradient-to-t from-black/70 via-black/20 to-transparent
        transition-opacity duration-500
        group-hover:from-black/80
      `} />

      {/* Hover elevation effect - CSS only */}
      <div className="absolute inset-0 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-black/20" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-semibold text-lg mb-1">
          {title}
        </h3>
        {hint && (
          <p className="text-white/70 text-sm">
            {hint}
          </p>
        )}
      </div>
    </motion.div>
  );
});

CollectionCard.displayName = 'CollectionCard';

const CollectionsSection = React.memo(() => {
  // Placeholder images using gradient backgrounds (will be replaced with real images)
  const collections = [
    {
      id: 'dream-worlds',
      title: 'Dream Worlds',
      hint: 'Surreal landscapes',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
      height: 'tall' as const,
    },
    {
      id: 'cute-characters',
      title: 'Cute Characters',
      hint: 'Friendly creatures',
      imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80',
      height: 'medium' as const,
    },
    {
      id: 'winter-stories',
      title: 'Winter Stories',
      hint: 'Snowy adventures',
      imageUrl: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&q=80',
      height: 'short' as const,
    },
    {
      id: 'fantasy-places',
      title: 'Fantasy Places',
      hint: 'Magical realms',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
      height: 'medium' as const,
    },
    {
      id: 'space-dreams',
      title: 'Space Dreams',
      hint: 'Cosmic wonders',
      imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80',
      height: 'tall' as const,
    },
    {
      id: 'ocean-magic',
      title: 'Ocean Magic',
      hint: 'Underwater worlds',
      imageUrl: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80',
      height: 'short' as const,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
            Explore Collections
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-md mx-auto">
            Get inspired by different creative worlds
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              title={collection.title}
              hint={collection.hint}
              imageUrl={collection.imageUrl}
              height={collection.height}
              delay={0.1 + index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

CollectionsSection.displayName = 'CollectionsSection';

export default CollectionsSection;
