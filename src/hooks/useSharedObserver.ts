import { useEffect, useRef, useCallback } from 'react';

type VisibilityCallback = (isVisible: boolean) => void;

// Singleton observer instance
let sharedObserver: IntersectionObserver | null = null;
const callbackMap = new Map<Element, VisibilityCallback>();
let observerRefCount = 0;

const getSharedObserver = (): IntersectionObserver => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = callbackMap.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: '50px', // Preload slightly before visible
        threshold: 0,
      }
    );
  }
  return sharedObserver;
};

const cleanupObserver = () => {
  observerRefCount--;
  if (observerRefCount <= 0 && sharedObserver) {
    sharedObserver.disconnect();
    sharedObserver = null;
    callbackMap.clear();
    observerRefCount = 0;
  }
};

/**
 * Hook for shared IntersectionObserver across all media items
 * Single observer handles visibility for all elements
 * Zero visual change - same behavior, better memory efficiency
 */
export const useSharedObserver = (
  onVisibilityChange: VisibilityCallback
): ((element: Element | null) => void) => {
  const elementRef = useRef<Element | null>(null);
  const callbackRef = useRef(onVisibilityChange);

  // Keep callback ref updated
  callbackRef.current = onVisibilityChange;

  // Increment ref count on mount
  useEffect(() => {
    observerRefCount++;
    return cleanupObserver;
  }, []);

  const setRef = useCallback((element: Element | null) => {
    const observer = getSharedObserver();

    // Cleanup previous element
    if (elementRef.current) {
      observer.unobserve(elementRef.current);
      callbackMap.delete(elementRef.current);
    }

    // Observe new element
    if (element) {
      callbackMap.set(element, (isVisible) => {
        callbackRef.current(isVisible);
      });
      observer.observe(element);
    }

    elementRef.current = element;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (elementRef.current) {
        const observer = getSharedObserver();
        observer.unobserve(elementRef.current);
        callbackMap.delete(elementRef.current);
      }
    };
  }, []);

  return setRef;
};

export default useSharedObserver;
