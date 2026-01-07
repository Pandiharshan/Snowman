import { useEffect, useRef, useCallback } from 'react';
import { debounce, throttle } from '@/utils/media';

// Custom hook for optimized scroll performance
export const useScrollPerformance = (callback: (event?: Event) => void, deps: React.DependencyList = []) => {
  const callbackRef = useRef<(event?: Event) => void>();
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Use throttled scroll handler for performance
  const throttledHandler = useCallback(
    throttle((event: Event) => {
      if (callbackRef.current) {
        callbackRef.current(event);
      }
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    // Add passive scroll listener
    window.addEventListener('scroll', throttledHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  }, deps);
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = React.useState<'up' | 'down'>('down');
  const prevScrollY = React.useRef(0);

  useScrollPerformance(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY.current) {
      setScrollDir('down');
    } else if (currentScrollY < prevScrollY.current) {
      setScrollDir('up');
    }

    prevScrollY.current = currentScrollY;
  }, []);

  return scrollDir;
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useScrollPerformance(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    setScrollProgress(progress);
  }, []);

  return scrollProgress;
};