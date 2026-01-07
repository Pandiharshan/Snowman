// Media optimization utilities for advanced loading strategies

// Generate low-quality image placeholder (LQIP) from image URL
export const generateLQIP = (src: string): string => {
  // For now, we'll create a simple technique using URL parameters
  // In production, this could use actual LQIP generation or blurhash
  try {
    const url = new URL(src, window.location.origin);
    // Add a small blur parameter to indicate this is a placeholder
    url.searchParams.set('lqip', 'true');
    return url.toString();
  } catch {
    // If URL parsing fails, return original src
    return src;
  }
};

// Generate blurhash placeholder (simplified implementation)
export const generateBlurHash = (src: string): string => {
  // This is a simplified placeholder - in production, you'd use actual blurhash library
  // or pre-generate blurhashes during build time
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="#e2e8f0"/>
      <rect x="10" y="10" width="80" height="80" fill="#cbd5e1" opacity="0.5"/>
    </svg>
  `.trim())}`;
};

// Preload image with promise-based approach
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload video with metadata only
export const preloadVideoMetadata = (src: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    const handleLoaded = () => {
      resolve(video);
      // Clean up event listeners
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('error', handleError);
    };

    const handleError = () => {
      reject(new Error(`Failed to load video metadata: ${src}`));
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('error', handleError);
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('error', handleError);
    video.src = src;
  });
};

// Check if media is already cached in browser
export const isMediaCached = (src: string, type: 'image' | 'video'): boolean => {
  if (type === 'image') {
    const cached = document.querySelector(`img[src="${src}"]`);
    return !!cached;
  }

  // For videos, check if they're in memory cache
  return false; // Simplified check
};

// Calculate aspect ratio from image dimensions
export const calculateAspectRatio = (src: string): Promise<number> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.naturalWidth / img.naturalHeight);
    };
    img.onerror = () => {
      // Default aspect ratio if image fails to load
      resolve(3 / 4); // Portrait aspect ratio
    };
    img.src = src;
  });
};

// Debounce function for scroll and resize events
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

// Throttle function for performance-critical events
// Optimized: Uses timestamp delta instead of timeouts for lighter execution
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number) => {
  let lastRun = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  }) as T;
};