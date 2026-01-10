import { useState, useEffect, useRef } from 'react';
import { scheduleIdleWork, cancelIdleWork } from '@/utils/concurrency';

/**
 * Hook for progressive batch rendering of large lists
 * Renders items in batches to prevent main thread blocking
 * Zero visual change - same final output, better performance
 */
export const useBatchedRender = <T>(
  items: T[],
  batchSize = 10,
  initialBatch = 10
): T[] => {
  const [renderedCount, setRenderedCount] = useState(
    Math.min(initialBatch, items.length)
  );
  const idleIdRef = useRef<number | null>(null);
  const itemsRef = useRef(items);

  // Reset when items change
  useEffect(() => {
    if (items !== itemsRef.current) {
      itemsRef.current = items;
      setRenderedCount(Math.min(initialBatch, items.length));
    }
  }, [items, initialBatch]);

  // Progressive rendering
  useEffect(() => {
    if (renderedCount >= items.length) return;

    const renderNextBatch = () => {
      idleIdRef.current = scheduleIdleWork(
        (deadline) => {
          // Render as many batches as we have time for
          let newCount = renderedCount;
          
          while (
            newCount < items.length &&
            (deadline.timeRemaining() > 5 || deadline.didTimeout)
          ) {
            newCount = Math.min(newCount + batchSize, items.length);
          }

          if (newCount > renderedCount) {
            setRenderedCount(newCount);
          }
        },
        { timeout: 100 }
      );
    };

    renderNextBatch();

    return () => {
      if (idleIdRef.current !== null) {
        cancelIdleWork(idleIdRef.current);
      }
    };
  }, [renderedCount, items.length, batchSize]);

  return items.slice(0, renderedCount);
};

export default useBatchedRender;
