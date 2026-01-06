import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Download } from 'lucide-react';
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

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '150px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Video autoplay on hover
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;

    if (isVisible && isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isVisible, isHovered, item.type]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleClick = useCallback(() => onFocus(item), [item, onFocus]);

  const handleDownload = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.src;
    link.download = item.name || 'media';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [item.src, item.name]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-3xl cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        aspectRatio: item.type === 'image' ? '3/4' : '16/9',
      }}
    >
      {/* Base layer - dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

      {item.type === 'image' ? (
        <>
          {/* Placeholder skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse" />
          )}
          {/* Image */}
          {isVisible && (
            <img
              src={item.src}
              alt=""
              loading="lazy"
              onLoad={handleImageLoad}
              className={`
                w-full h-full object-cover
                transition-all duration-500 ease-out
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
            />
          )}
        </>
      ) : (
        <>
          {/* Video thumbnail */}
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt=""
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-300
                ${isHovered ? 'opacity-0' : 'opacity-100'}
              `}
            />
          )}
          {/* Video */}
          {isVisible && (
            <video
              ref={videoRef}
              src={item.src}
              muted
              loop
              playsInline
              preload="metadata"
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-300
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}
            />
          )}
        </>
      )}

      {/* Premium overlay - gradient + glow */}
      <div className={`
        absolute inset-0 transition-all duration-500
        ${isHovered 
          ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent' 
          : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
        }
      `} />

      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 pointer-events-none
        transition-opacity duration-500
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        bg-radial-gradient from-sky-500/20 via-transparent to-transparent
        shadow-2xl shadow-sky-500/20
      `} />

      {/* Download button - bottom left (Pinterest style) */}
      <button
        onClick={handleDownload}
        className={`
          absolute bottom-4 left-4 z-10
          p-3 rounded-full
          bg-white/90 hover:bg-white
          text-slate-900
          transition-all duration-300 ease-out
          shadow-lg hover:shadow-xl
          ${isHovered 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-2 pointer-events-none'
          }
        `}
        aria-label="Download"
      >
        <Download className="w-5 h-5" />
      </button>

      {/* Premium border on hover */}
      <div className={`
        absolute inset-0 rounded-3xl pointer-events-none
        transition-all duration-500
        ${isHovered 
          ? 'ring-2 ring-sky-400/50 shadow-2xl shadow-sky-500/30' 
          : 'ring-1 ring-white/10'
        }
      `} />
    </div>
  );
});

CollectionItem.displayName = 'CollectionItem';

export default CollectionItem;
