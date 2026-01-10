/**
 * Main-thread client for Media Worker
 * Provides typed interface for worker communication
 * Graceful fallback if workers unavailable
 */

import type { WorkerMessage, WorkerResponse, WorkerMessageType } from './media.worker';

type PendingRequest = {
  resolve: (result: unknown) => void;
  reject: (error: Error) => void;
};

class MediaWorkerClient {
  private worker: Worker | null = null;
  private pending = new Map<string, PendingRequest>();
  private messageId = 0;
  private isSupported = typeof Worker !== 'undefined';

  /**
   * Initialize worker lazily on first use
   */
  private getWorker(): Worker | null {
    if (!this.isSupported) return null;

    if (!this.worker) {
      try {
        this.worker = new Worker(
          new URL('./media.worker.ts', import.meta.url),
          { type: 'module' }
        );

        this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
          const { id, success, result, error } = event.data;
          const request = this.pending.get(id);

          if (request) {
            this.pending.delete(id);
            if (success) {
              request.resolve(result);
            } else {
              request.reject(new Error(error || 'Worker error'));
            }
          }
        };

        this.worker.onerror = (error) => {
          console.error('Media worker error:', error);
        };
      } catch (e) {
        console.warn('Failed to create media worker:', e);
        this.isSupported = false;
        return null;
      }
    }

    return this.worker;
  }

  /**
   * Send message to worker and await response
   */
  private async send<T>(type: WorkerMessageType, payload?: unknown): Promise<T> {
    const worker = this.getWorker();

    // Fallback: return placeholder if workers unavailable
    if (!worker) {
      return { fallback: true } as T;
    }

    const id = `msg_${++this.messageId}`;

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve: resolve as (r: unknown) => void, reject });

      const message: WorkerMessage = { type, id, payload };
      worker.postMessage(message);

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error('Worker timeout'));
        }
      }, 30000);
    });
  }

  /**
   * Check if worker is ready
   */
  async ping(): Promise<boolean> {
    try {
      await this.send('PING');
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Future: Process image in worker
   */
  async processImage(imageData: unknown): Promise<unknown> {
    return this.send('PROCESS_IMAGE', imageData);
  }

  /**
   * Future: Analyze media in worker
   */
  async analyzeMedia(mediaData: unknown): Promise<unknown> {
    return this.send('ANALYZE_MEDIA', mediaData);
  }

  /**
   * Future: Generate thumbnail in worker
   */
  async generateThumbnail(source: unknown): Promise<unknown> {
    return this.send('GENERATE_THUMBNAIL', source);
  }

  /**
   * Terminate worker and cleanup
   */
  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pending.clear();
  }
}

// Singleton instance
export const mediaWorker = new MediaWorkerClient();

export default MediaWorkerClient;
