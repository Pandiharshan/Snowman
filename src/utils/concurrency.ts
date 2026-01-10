/**
 * Concurrency Utilities for Snowman
 * Internal optimization - zero visual change
 */

type IdleCallback = (deadline: IdleDeadline) => void;

/**
 * Schedule work during browser idle time with fallback
 */
export const scheduleIdleWork = (
  callback: IdleCallback,
  options?: { timeout?: number }
): number => {
  if (typeof requestIdleCallback !== 'undefined') {
    return requestIdleCallback(callback, options);
  }
  // Fallback: use setTimeout with minimal delay
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 50, // Assume 50ms available
    });
  }, 1) as unknown as number;
};

/**
 * Cancel scheduled idle work
 */
export const cancelIdleWork = (id: number): void => {
  if (typeof cancelIdleCallback !== 'undefined') {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Process array in batches, yielding to main thread between batches
 */
export const batchProcess = async <T, R>(
  items: T[],
  processor: (item: T, index: number) => R,
  batchSize = 10
): Promise<R[]> => {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    // Process batch
    for (let j = 0; j < batch.length; j++) {
      results.push(processor(batch[j], i + j));
    }
    
    // Yield to main thread between batches
    if (i + batchSize < items.length) {
      await new Promise<void>(resolve => {
        scheduleIdleWork(() => resolve(), { timeout: 16 });
      });
    }
  }
  
  return results;
};

/**
 * Create a throttled callback that runs at most once per frame
 */
export const createThrottledCallback = <T extends (...args: unknown[]) => void>(
  callback: T
): T => {
  let scheduled = false;
  let lastArgs: Parameters<T> | null = null;
  
  const throttled = ((...args: Parameters<T>) => {
    lastArgs = args;
    
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (lastArgs) {
          callback(...lastArgs);
        }
      });
    }
  }) as T;
  
  return throttled;
};

/**
 * Defer a callback until after the current frame
 */
export const deferToNextFrame = (callback: () => void): number => {
  return requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};

/**
 * Check if we have time remaining in the current idle period
 */
export const hasIdleTime = (deadline: IdleDeadline, minTime = 5): boolean => {
  return deadline.timeRemaining() > minTime || deadline.didTimeout;
};
