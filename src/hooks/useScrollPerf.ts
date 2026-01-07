import React, { useEffect, useRef, useCallback } from 'react';
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

    // Optimization: Only update state if direction *actually* changes
    // This dramatically reduces React reconciliation cycles during scroll
    if (currentScrollY > prevScrollY.current && scrollDir !== 'down') {
      setScrollDir('down');
    } else if (currentScrollY < prevScrollY.current && scrollDir !== 'up') {
      setScrollDir('up');
    }

    prevScrollY.current = currentScrollY;
  }, [scrollDir]); // Added scrollDir dependency to properly check current state

  return scrollDir;
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const prevProgress = React.useRef(0);

  useScrollPerformance(() => {
    const scrollTop = window.scrollY;
    // Safety check for 0 height/divide by zero
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);

    // Optimization: Avoid state updates if change is negligible (< 0.5%)
    if (Math.abs(progress - prevProgress.current) > 0.5) {
      setScrollProgress(progress);
      prevProgress.current = progress;
    }
  }, []);

  return scrollProgress;
};