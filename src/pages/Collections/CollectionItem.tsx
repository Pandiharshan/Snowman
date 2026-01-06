import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MediaItem } from './collections.data';

interface CollectionItemProps {
  item: MediaItem;
  onFocus: (item: MediaItem) => void;
}

const CollectionItem = React.memo(({ item, onFocus }: CollectionItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Aspect ratio classes for masonry effect
  const aspectClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    square: 'aspect-square',
  };

  // Intersection Observer for lazy loading and video visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Video play/pause based on visibility and hover
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;

    if (isVisible && isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, isHovered, item.type]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleClick = useCallback(() => onFocus(item), [item, onFocus]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer
        ${aspectClasses[item.aspectRatio]}
        bg-slate-200 dark:bg-slate-800
        transition-transform duration-300 ease-out
        hover:translate-y-[-2px] hover:scale-[1.01]
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.type === 'image' ? (
        <>
          {/* Placeholder skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 animate-pulse" />
          )}
          {/* Lazy loaded image */}
          {isVisible && (
            <img
              src={item.src}
              alt=""
              loading="lazy"
              onLoad={handleImageLoad}
              className={`
                w-full h-full object-cover
                transition-opacity duration-300
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
            />
          )}
        </>
      ) : (
        <>
          {/* Video thumbnail */}
          <img
            src={item.thumbnail}
            alt=""
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-300
              ${isHovered && isVisible ? 'opacity-0' : 'opacity-100'}
            `}
          />
          {/* Video element */}
          {isVisible && (
            <video
              ref={videoRef}
              src={item.src}
              muted
              loop
              playsInline
              preload="none"
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-300
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}
            />
          )}
          {/* Play indicator */}
          <div className={`
            absolute bottom-2 right-2 w-6 h-6 rounded-full
            bg-black/50 flex items-center justify-center
            transition-opacity duration-200
            ${isHovered ? 'opacity-0' : 'opacity-100'}
          `}>
            <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
});

CollectionItem.displayName = 'CollectionItem';

export default CollectionItem;
