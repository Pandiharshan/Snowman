import React, { useState, useEffect, useCallback, useRef, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { generateBlurHash, calculateAspectRatio } from '@/utils/media';
import { initPerformanceMonitoring } from '@/utils/performance';

interface MediaFile {
  id: string;
  src: string;
  name: string;
  type: 'image' | 'video';
  collection: string;
}

// Premium Media Card Component
const MediaCard = React.memo(({ item, onClick }: { item: MediaFile; onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [blurHashLoaded, setBlurHashLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use IntersectionObserver for visibility tracking
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '50px', threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Calculate aspect ratio for proper layout
  useEffect(() => {
    if (item.type === 'image' && !aspectRatio) {
      calculateAspectRatio(item.src).then(ratio => {
        setAspectRatio(ratio);
      });
    }
  }, [item, aspectRatio]);

  // Load blurhash when item becomes visible
  useEffect(() => {
    if (item.type === 'image' && !blurHashLoaded) {
      setBlurHashLoaded(true);
    }
  }, [item, blurHashLoaded]);

  // Video autoplay on hover - pause when not visible (resource cleanup)
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;
    
    // Pause video when not visible (off-screen resource cleanup)
    if (!isVisible) {
      videoRef.current.pause();
      return;
    }
    
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, item.type, isVisible]);

  const handleDownload = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.src;
    link.download = item.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [item.src, item.name]);

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {item.type === 'image' ? (
        <>
          {/* Blurhash placeholder */}
          {!blurHashLoaded && (
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl" />
          )}
          {blurHashLoaded && !loaded && (
            <img
              src={generateBlurHash(item.src)}
              alt=""
              className="w-full h-auto object-cover rounded-2xl blur-sm scale-110"
              style={{ aspectRatio: aspectRatio || '3/4' }}
            />
          )}
          <img
            src={item.src}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`
              w-full h-auto object-cover rounded-2xl
              transition-all duration-500 ease-out
              ${loaded ? 'opacity-100 blur-none scale-100' : 'opacity-0 absolute inset-0'}
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
            style={{
              aspectRatio: aspectRatio || '3/4',
              transform: 'translateZ(0)',
            }}
          />
        </>
      ) : (
        <div className="relative">
          {/* Video placeholder */}
          {!loaded && (
            <div className="w-full h-auto object-cover rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"
              style={{ aspectRatio: aspectRatio || '16/9' }}>
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            playsInline
            preload="metadata"
            className={`
              w-full h-auto object-cover rounded-2xl
              transition-transform duration-500
              ${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
            style={{
              aspectRatio: aspectRatio || '16/9',
              transform: 'translateZ(0)',
            }}
            onLoadedMetadata={() => setLoaded(true)}
          />
          {/* Play indicator */}
          {!isHovered && loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hover overlay */}
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-300
        ${isHovered 
          ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent ring-2 ring-white/20' 
          : 'bg-transparent'
        }
      `} />

      {/* Download button - bottom left */}
      <button
        onClick={handleDownload}
        className={`
          absolute bottom-3 left-3 z-10
          p-2.5 rounded-full
          bg-white/90 hover:bg-white
          text-slate-900
          transition-all duration-300 ease-out
          shadow-lg
          ${isHovered 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-2 pointer-events-none'
          }
        `}
        aria-label="Download"
      >
        <Download className="w-4 h-4" />
      </button>

      {/* Three dots menu - bottom right */}
      <button
        className={`
          absolute bottom-3 right-3 z-10
          p-2.5 rounded-full
          bg-white/90 hover:bg-white
          text-slate-900
          transition-all duration-300 ease-out
          shadow-lg
          ${isHovered 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-2 pointer-events-none'
          }
        `}
        onClick={(e) => e.stopPropagation()}
        aria-label="More options"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </button>
    </motion.div>
  );
});

MediaCard.displayName = 'MediaCard';

const CollectionsSection = React.memo(() => {
  const navigate = useNavigate();
  const [allMedia, setAllMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();

  // Load all media from all collections - deferred to prevent blocking
  useEffect(() => {
    // Defer performance monitoring to not block initial render
    const perfId = requestIdleCallback 
      ? requestIdleCallback(() => initPerformanceMonitoring(), { timeout: 500 })
      : setTimeout(() => initPerformanceMonitoring(), 200);
    
    const loadAllMedia = async () => {
      try {
        const manifestRes = await fetch('/assets/collections/manifest.json');
        if (!manifestRes.ok) return;
        const manifest = await manifestRes.json();

        const allFiles: MediaFile[] = [];
        
        for (const collection of manifest.collections) {
          try {
            const filesRes = await fetch(`/assets/collections/${collection.name}/files.json`);
            if (!filesRes.ok) continue;
            const files: string[] = await filesRes.json();

            files.forEach((fileName, index) => {
              const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
              const isVideo = ['.mp4', '.webm', '.mov'].includes(ext);
              const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
              
              if (isImage || isVideo) {
                allFiles.push({
                  id: `${collection.slug}-${index}`,
                  src: `/assets/collections/${collection.name}/${fileName}`,
                  name: fileName,
                  type: isVideo ? 'video' : 'image',
                  collection: collection.name,
                });
              }
            });
          } catch (err) {
            console.error(`Failed to load ${collection.name}:`, err);
          }
        }

        // Shuffle for variety - wrap in startTransition for non-blocking update
        const shuffled = allFiles.sort(() => Math.random() - 0.5);
        startTransition(() => {
          setAllMedia(shuffled);
        });
      } catch (err) {
        console.error('Failed to load collections:', err);
      } finally {
        setLoading(false);
      }
    };

    // Defer media loading slightly to allow UI to paint first
    const loadId = requestAnimationFrame(() => {
      loadAllMedia();
    });

    return () => {
      cancelAnimationFrame(loadId);
      if (requestIdleCallback && typeof perfId === 'number') {
        cancelIdleCallback(perfId);
      } else {
        clearTimeout(perfId as unknown as number);
      }
    };
  }, []);

  const handleMediaClick = useCallback(() => {
    startTransition(() => {
      navigate('/collection/all');
    });
  }, [navigate]);

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  // Take first 20 items for preview
  const previewMedia = allMedia.slice(0, 20);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Collections
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Get inspired by different creative worlds
          </p>
        </motion.div>

        {/* Pinterest-style Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {previewMedia.map((item) => (
            <MediaCard 
              key={item.id} 
              item={item} 
              onClick={handleMediaClick}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => startTransition(() => navigate('/collection/all'))}
            className="
              px-8 py-4 rounded-full
              bg-sky-500/20 hover:bg-sky-500/30
              text-sky-300 hover:text-sky-200
              font-medium text-lg
              transition-all duration-300
              ring-1 ring-sky-500/30 hover:ring-sky-500/50
            "
          >
            View All {allMedia.length} Items
          </button>
        </motion.div>
      </div>
    </section>
  );
});

CollectionsSection.displayName = 'CollectionsSection';

export default CollectionsSection;
