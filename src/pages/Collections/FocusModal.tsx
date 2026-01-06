import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { MediaItem } from './collections.data';

interface FocusModalProps {
  item: MediaItem | null;
  examplePrompt: string;
  onClose: () => void;
}

const FocusModal = React.memo(({ item, examplePrompt, onClose }: FocusModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (item) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (item?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      {/* Content container */}
      <div 
        className="relative z-10 w-full max-w-3xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Media */}
        <div className="w-full rounded-xl overflow-hidden bg-black/50">
          {item.type === 'image' ? (
            <img
              src={item.src.replace('w=400', 'w=800')}
              alt=""
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          )}
        </div>

        {/* Media type label */}
        <div className="mt-4 text-white/50 text-xs uppercase tracking-wider">
          {item.type}
        </div>

        {/* Soft prompt teaser */}
        <p className="mt-4 text-white/70 text-center text-sm md:text-base italic max-w-md leading-relaxed">
          "{examplePrompt}"
        </p>
      </div>
    </div>
  );
});

FocusModal.displayName = 'FocusModal';

export default FocusModal;
