import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface MediaFile {
  id: string;
  src: string;
  name: string;
  type: 'image' | 'video';
  collection: string;
}

// Premium Media Card
const MediaCard = React.memo(({ item, onFocus }: { item: MediaFile; onFocus: (item: MediaFile) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;
    
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, item.type]);

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
      className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onFocus(item)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {item.type === 'image' ? (
        <>
          {!loaded && (
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse rounded-2xl" />
          )}
          <img
            src={item.src}
            alt=""
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`
              w-full h-auto object-cover rounded-2xl
              transition-all duration-500 ease-out
              ${loaded ? 'opacity-100' : 'opacity-0'}
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
          />
        </>
      ) : (
        <div className="relative">
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
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
          />
          {!isHovered && (
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

      {/* Pinterest Masonry Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {allMedia.map((item) => (
            <MediaCard 
              key={item.id} 
              item={item} 
              onFocus={setFocusedItem}
            />
          ))}
        </div>
      </main>

      {/* Focus Modal */}
      <FocusModal item={focusedItem} onClose={() => setFocusedItem(null)} />
    </div>
  );
});

CollectionDetail.displayName = 'CollectionDetail';

export default CollectionDetail;
