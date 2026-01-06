import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Download } from 'lucide-react';
import { MediaItem } from './collections.data';

interface FocusModalProps {
  item: MediaItem | null;
  examplePrompt: string;
  onClose: () => void;
}

const FocusModal = React.memo(({ item, examplePrompt, onClose }: FocusModalProps) => {
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
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [item]);

  const handleDownload = useCallback(() => {
    if (!item) return;
    const link = document.createElement('a');
    link.href = item.src;
    link.download = item.name || 'media';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [item?.src, item?.name]);

  const mediaElement = useMemo(() => {
    if (!item) return null;
    
    if (item.type === 'image') {
      return (
        <img
          src={item.src}
          alt=""
          className="w-full h-auto max-h-[85vh] object-contain"
        />
      );
    }
    
    return (
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
    );
  }, [item?.type, item?.src]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Premium backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      
      {/* Content */}
      <div 
        className="relative z-10 w-full max-w-5xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 p-3 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Media container */}
        <div className="w-full rounded-3xl overflow-hidden bg-black/50 shadow-2xl ring-1 ring-sky-500/20">
          {mediaElement}
        </div>

        {/* Info section */}
        <div className="mt-8 w-full flex items-start justify-between gap-6">
          <div className="flex-1">
            <p className="text-sky-400/60 text-xs uppercase tracking-widest font-semibold mb-3">
              {item.type === 'image' ? 'Image' : 'Video'}
            </p>
            <p className="text-white/70 text-base italic leading-relaxed max-w-lg">
              "{examplePrompt}"
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="
              px-6 py-3 rounded-full
              bg-sky-500/20 hover:bg-sky-500/30
              text-sky-300 hover:text-sky-200
              transition-all duration-300
              flex items-center gap-2
              whitespace-nowrap
              ring-1 ring-sky-500/30 hover:ring-sky-500/50
            "
            aria-label="Download"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
});

FocusModal.displayName = 'FocusModal';

export default FocusModal;
