// Collection utilities for folder-driven media system

export interface MediaFile {
  id: string;
  name: string;
  path: string;
  type: 'image' | 'video';
  extension: string;
}

export interface Collection {
  id: string;
  name: string;
  path: string;
  files: MediaFile[];
}

// Image extensions - O(1) lookup
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

// Video extensions - O(1) lookup
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov']);

// Detect file type by extension
export const getFileType = (filename: string): 'image' | 'video' | null => {
  // Optimization: Single generic extension extraction
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));

  if (IMAGE_EXTENSIONS.has(ext)) return 'image';
  if (VIDEO_EXTENSIONS.has(ext)) return 'video';
  return null;
};

// Get file extension
export const getExtension = (filename: string): string => {
  return filename.toLowerCase().substring(filename.lastIndexOf('.'));
};

// Convert folder name to URL-safe slug
export const toSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Convert slug back to folder name (for display)
export const fromSlug = (slug: string): string => {
  return slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Filter out audio-only files (files with 'faudio' in name)
export const isValidMediaFile = (filename: string): boolean => {
  const type = getFileType(filename);
  if (!type) return false;

  // Filter out audio track files
  if (filename.includes('faudio')) return false;

  return true;
};
