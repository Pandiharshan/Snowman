import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateBlurHash, calculateAspectRatio } from '@/utils/media';
import { initPerformanceMonitoring } from '@/utils/performance';

interface MediaFile {
  id: string;
  src: string;
  name: string;
  type: 'image' | 'video';
  collection: string;
}

// Enhanced caching and prefetching strategies
const MAX_CACHE_SIZE = 100;
const imageCache = new Map<string, HTMLImageElement>();
const videoCache = new Map<string, HTMLVideoElement>();
const prefetchQueue: string[] = [];
let isPrefetching = false;

// Enhanced prefetch with priority queue
const prefetchImage = (src: string, priority: 'high' | 'normal' | 'low' = 'normal') => {
  if (imageCache.has(src)) return;
  
  if (priority === 'high') {
    prefetchQueue.unshift(src); // High priority at front
  } else {
    prefetchQueue.push(src); // Normal/low priority at back
  }
  
  if (!isPrefetching) {
    isPrefetching = true;
    // Use requestIdleCallback for non-critical prefetching
    requestIdleCallback(() => {
      processPrefetchQueue();
    }, { timeout: 5000 });
  }
};

// Process prefetch queue
const processPrefetchQueue = () => {
  const nextSrc = prefetchQueue.shift();
  if (nextSrc && !imageCache.has(nextSrc)) {
    const img = new Image();
    img.onload = () => {
      // Add to cache
      imageCache.set(nextSrc, img);
      // Maintain cache size
      if (imageCache.size > MAX_CACHE_SIZE) {
        const firstKey = imageCache.keys().next().value;
        imageCache.delete(firstKey);
      }
      isPrefetching = false;
      if (prefetchQueue.length > 0) {
        requestIdleCallback(processPrefetchQueue, { timeout: 2000 });
      }
    };
    img.onerror = () => {
      isPrefetching = false;
      if (prefetchQueue.length > 0) {
        requestIdleCallback(processPrefetchQueue, { timeout: 2000 });
      }
    };
    img.src = nextSrc;
  } else {
    isPrefetching = false;
  }
};

// Prefetch video metadata
const prefetchVideo = (src: string) => {
  if (videoCache.has(src)) return;
  
  const video = document.createElement('video');
  video.preload = 'metadata';
  
  const handleLoaded = () => {
    videoCache.set(src, video);
    // Maintain cache size
    if (videoCache.size > MAX_CACHE_SIZE / 2) { // Smaller video cache
      const firstKey = videoCache.keys().next().value;
      videoCache.delete(firstKey);
    }
    video.removeEventListener('loadedmetadata', handleLoaded);
    video.removeEventListener('error', handleError);
  };
  
  const handleError = () => {
    video.removeEventListener('loadedmetadata', handleLoaded);
    video.removeEventListener('error', handleError);
  };
  
  video.addEventListener('loadedmetadata', handleLoaded);
  video.addEventListener('error', handleError);
  video.src = src;
};

// Clear cache
const clearCache = () => {
  imageCache.clear();
  videoCache.clear();
};

// Get cached media
const getCachedMedia = (src: string, type: 'image' | 'video') => {
  if (type === 'image') {
    return imageCache.get(src) || null;
  }
  return videoCache.get(src) || null;
};

// Preload critical media
const preloadCriticalMedia = async (sources: string[]) => {
  const promises = sources.map(src => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });
  });
  
  await Promise.all(promises);
};

// Batch prefetch with rate limiting
const batchPrefetch = async (sources: string[], batchSize = 5) => {
  for (let i = 0; i < sources.length; i += batchSize) {
    const batch = sources.slice(i, i + batchSize);
    batch.forEach(src => prefetchImage(src, 'low'));
    // Small delay between batches to prevent blocking
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

// Cache statistics
const getCacheStats = () => {
  return {
    imageCacheSize: imageCache.size,
    videoCacheSize: videoCache.size,
    prefetchQueueLength: prefetchQueue.length,
  };
};

// Premium Media Card with optimized loading
const MediaCard = React.memo(({ item, onFocus, index }: { item: MediaFile; onFocus: (item: MediaFile) => void; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loadState, setLoadState] = useState<'skeleton' | 'blur' | 'loaded'>('skeleton');
  const [blurHashLoaded, setBlurHashLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Calculate aspect ratio for proper layout
  useEffect(() => {
    if (item.type === 'image' && isNearViewport && !aspectRatio) {
      calculateAspectRatio(item.src).then(ratio => {
        setAspectRatio(ratio);
      });
    }
  }, [item, isNearViewport, aspectRatio]);

  // Load blurhash when item becomes near viewport
  useEffect(() => {
    if (item.type === 'image' && isNearViewport && !blurHashLoaded) {
      setBlurHashLoaded(true);
    }
  }, [item, isNearViewport, blurHashLoaded]);

  // Intersection Observer with optimized thresholds: near viewport & visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setIsNearViewport(true);
          }
          if (entry.intersectionRatio > 0.25) {
            setIsVisible(true);
          }
        });
      },
      { 
        rootMargin: '300px 0px', // Preload 300px before entering viewport
        threshold: [0, 0.1, 0.25, 0.5, 1.0] // Multiple thresholds for better performance
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Prefetch next images during idle
  useEffect(() => {
    if (isNearViewport && item.type === 'image') {
      prefetchImage(item.src, 'normal');
    } else if (isNearViewport && item.type === 'video') {
      prefetchVideo(item.src);
    }
  }, [isNearViewport, item.src, item.type]);

  // Video hover play with GPU acceleration
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;
    
    const video = videoRef.current;
    
    if (isHovered && isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, isVisible, item.type]);

  const handleDownload = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.src;
    link.download = item.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [item.src, item.name]);

  const handleImageLoad = useCallback(() => {
    setLoadState('loaded');
    perfMonitor.recordCacheHit(); // Record that the image loaded successfully
  }, []);

  // Check if image is cached
  useEffect(() => {
    if (item.type === 'image' && imageCache.has(item.src)) {
      setLoadState('loaded');
    }
  }, [item.src, item.type]);

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onFocus(item)}
      style={{
        transform: 'translateZ(0)', // Force GPU layer
        willChange: isHovered ? 'transform' : 'auto',
      }}
    >
      {/* Skeleton placeholder */}
      {loadState === 'skeleton' && (
        <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </div>
      )}
      
      {item.type === 'image' ? (
        <>
          {/* Blurhash placeholder */}
          {isNearViewport && !blurHashLoaded && (
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl" />
          )}
          {isNearViewport && blurHashLoaded && loadState !== 'loaded' && (
            <img
              src={generateBlurHash(item.src)}
              alt=""
              className="w-full h-auto object-cover rounded-2xl blur-sm scale-110"
              style={{ aspectRatio: aspectRatio || '3/4' }}
            />
          )}
          {/* Only render image when near viewport */}
          {isNearViewport && (
            <img
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
              className={`
                w-full h-auto object-cover rounded-2xl
                transition-transform duration-500 ease-out
                ${loadState === 'loaded' ? 'opacity-100 blur-none scale-100' : 'opacity-0 absolute inset-0'}
                ${isHovered ? 'scale-105' : 'scale-100'}
              `}
              style={{
                aspectRatio: aspectRatio || '3/4',
                transform: `translateZ(0) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
              }}
            />
          )}
        </>
      ) : (
        <div className="relative">
          {/* Video placeholder */}
          {loadState !== 'loaded' && (
            <div className="w-full h-auto object-cover rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"
              style={{ aspectRatio: aspectRatio || '16/9' }}>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
          {/* Video - only load when near viewport */}
          {isNearViewport && (
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
                ${loadState === 'loaded' ? 'opacity-100' : 'opacity-0 absolute inset-0'}
                ${isHovered ? 'scale-105' : 'scale-100'}
              `}
              style={{
                aspectRatio: aspectRatio || '16/9',
                transform: 'translateZ(0)',
              }}
              onLoadedMetadata={() => {
                setLoadState('loaded');
                perfMonitor.recordCacheHit(); // Record that the video loaded successfully
              }}
            />
          )}
          {/* Play indicator */}
          {!isHovered && loadState === 'loaded' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hover overlay - GPU accelerated */}
      <div 
        className={`
          absolute inset-0 rounded-2xl pointer-events-none
          transition-opacity duration-300
          ${isHovered 
            ? 'opacity-100 bg-gradient-to-t from-black/60 via-transparent to-transparent ring-2 ring-white/20' 
            : 'opacity-0'
          }
        `}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Download button - bottom left */}
      <button
        onClick={handleDownload}
        className={`
          absolute bottom-3 left-3 z-10
          p-2.5 rounded-full
          bg-white/90 hover:bg-white
          text-slate-900
          shadow-lg
          transition-all duration-300 ease-out
          ${isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
          }
        `}
        style={{ transform: 'translateZ(0)' }}
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
          shadow-lg
          transition-all duration-300 ease-out
          ${isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2 pointer-events-none'
          }
        `}
        style={{ transform: 'translateZ(0)' }}
        onClick={(e) => e.stopPropagation()}
        aria-label="More options"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});

MediaCard.displayName = 'MediaCard';

// Focus Modal
const FocusModal = React.memo(({ item, onClose }: { item: MediaFile | null; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!item) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  useEffect(() => {
    if (item?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item]);

  const handleDownload = useCallback(() => {
    if (!item) return;
    const link = document.createElement('a');
    link.href = item.src;
    link.download = item.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [item?.src, item?.name]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      
      <div 
        className="relative z-10 w-full max-w-5xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full rounded-3xl overflow-hidden bg-black/50 shadow-2xl ring-1 ring-white/10">
          {item.type === 'image' ? (
            <img src={item.src} alt="" className="w-full h-auto max-h-[85vh] object-contain" />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              muted
              loop
              playsInline
              autoPlay
              controls
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          )}
        </div>

        <div className="mt-8 w-full flex items-center justify-between">
          <p className="text-white/50 text-sm">{item.collection}</p>
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
});

FocusModal.displayName = 'FocusModal';

const CollectionDetail = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [allMedia, setAllMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [focusedItem, setFocusedItem] = useState<MediaFile | null>(null);

  // Load all media from all collections
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
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

        // Shuffle for variety
        const shuffled = allFiles.sort(() => Math.random() - 0.5);
        setAllMedia(shuffled);
      } catch (err) {
        console.error('Failed to load collections:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllMedia();
  }, [id]);

  const stats = useMemo(() => ({
    images: allMedia.filter(f => f.type === 'image').length,
    videos: allMedia.filter(f => f.type === 'video').length,
  }), [allMedia]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/world')}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">All Collections</h1>
              <p className="text-sm text-white/50">Explore all creative works</p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-sky-400/50" />
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <span className="text-white/60 text-sm">{allMedia.length} items</span>
          <span className="text-white/60 text-sm">{stats.images} images</span>
          <span className="text-white/60 text-sm">{stats.videos} videos</span>
        </div>
      </div>

      {/* Optimized Pinterest Masonry Grid with CSS columns */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {allMedia.map((item, index) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <MediaCard 
                item={item} 
                index={index}
                onFocus={setFocusedItem}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Focus Modal */}
      <FocusModal item={focusedItem} onClose={() => setFocusedItem(null)} />

      {/* Shimmer animation keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
});

CollectionDetail.displayName = 'CollectionDetail';

export default CollectionDetail;
