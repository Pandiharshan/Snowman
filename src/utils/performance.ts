// Performance monitoring utilities for media loading and scroll performance

// Performance metrics interface
export interface PerformanceMetrics {
  imageLoadTime: number;
  videoLoadTime: number;
  scrollFPS: number;
  memoryUsage: number;
  cacheHitRate: number;
}

// Performance monitoring class
class PerformanceMonitor {
  private startTime: number = 0;
  private frameCount: number = 0;
  private lastFrameTime: number = 0;
  private scrollFrameCount: number = 0;
  private scrollStartTime: number = 0;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  // Start timing for media loading
  startTiming(): void {
    this.startTime = performance.now();
  }

  // End timing and return duration
  endTiming(): number {
    if (this.startTime === 0) return 0;
    const duration = performance.now() - this.startTime;
    this.startTime = 0;
    return duration;
  }

  // Monitor scroll performance
  monitorScroll(): void {
    if (this.scrollStartTime === 0) {
      this.scrollStartTime = performance.now();
      this.scrollFrameCount = 0;
    }
    this.scrollFrameCount++;

    // Calculate FPS every 60 frames (optimized: avoiding modulo)
    if (this.scrollFrameCount >= 60) {
      const elapsed = performance.now() - this.scrollStartTime;
      const fps = Math.round(60000 / elapsed); // (60 / elapsed) * 1000 simplified
      
      // Only log if significant deviation
      if (fps < 50) console.log(`Scroll FPS: ${fps}`);
      
      // Reset for next batch
      this.scrollStartTime = performance.now();
      this.scrollFrameCount = 0;
    }
  }

  // Record cache hit
  recordCacheHit(): void {
    this.cacheHits++;
  }

  // Record cache miss
  recordCacheMiss(): void {
    this.cacheMisses++;
  }

  // Get cache hit rate
  getCacheHitRate(): number {
    const total = this.cacheHits + this.cacheMisses;
    return total > 0 ? this.cacheHits / total : 0;
  }

  // Calculate memory usage (approximation)
  getMemoryUsage(): number {
    // @ts-ignore - performance.memory is non-standard but widely supported in Chrome
    return performance.memory ? performance.memory.usedJSHeapSize : 0;
  }

  // Get performance metrics
  getMetrics(): PerformanceMetrics {
    return {
      imageLoadTime: 0, // Will be calculated separately
      videoLoadTime: 0, // Will be calculated separately
      scrollFPS: 60, // Default assumption if not actively scrolling
      memoryUsage: this.getMemoryUsage(),
      cacheHitRate: this.getCacheHitRate(),
    };
  }

  // Calculate scroll FPS
  private calculateScrollFPS(): number {
    // Deprecated internal helper in favor of real-time monitorScroll logic
    return 60; 
  }

  // Reset scroll monitoring
  resetScrollMonitoring(): void {
    this.scrollStartTime = 0;
    this.scrollFrameCount = 0;
  }
}

// Initialize performance monitor
export const perfMonitor = new PerformanceMonitor();

// Image loading performance tracker
export const trackImageLoad = async (src: string): Promise<number> => {
  const startTime = performance.now();
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    img.onerror = () => {
      resolve(-1); // Error indicator
    };
    img.src = src;
  });
};

// Video loading performance tracker
export const trackVideoLoad = async (src: string): Promise<number> => {
  const startTime = performance.now();
  const video = document.createElement('video');
  
  return new Promise((resolve) => {
    video.onloadeddata = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    video.onerror = () => {
      resolve(-1); // Error indicator
    };
    video.src = src;
  });
};

// Scroll performance tracker
export const trackScrollPerformance = (): void => {
  let lastScrollTime = 0;
  
  const scrollHandler = () => {
    const now = performance.now();
    if (now - lastScrollTime >= 1000 / 60) { // 60fps
      perfMonitor.monitorScroll();
      lastScrollTime = now;
    }
  };
  
  window.addEventListener('scroll', scrollHandler, { passive: true });
};

// Measure paint timing
export const measurePaintTiming = (): void => {
  if ('paint' in performance) {
    (performance as any).getEntriesByType('paint').forEach(entry => {
      console.log(`${entry.name}: ${entry.startTime}ms`);
    });
  }
};

// Performance observer for long tasks
export const observeLongTasks = (): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) { // Long task threshold
          console.warn(`Long task detected: ${entry.duration}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): void => {
  observeLongTasks();
  trackScrollPerformance();
  measurePaintTiming();
};