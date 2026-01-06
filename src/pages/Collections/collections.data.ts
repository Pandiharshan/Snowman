// Media item types
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  name: string;
}

// Detect file type by extension
export const getFileType = (filename: string): 'image' | 'video' | null => {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
  const videoExts = ['.mp4', '.webm', '.mov'];
  
  if (imageExts.includes(ext)) return 'image';
  if (videoExts.includes(ext)) return 'video';
  return null;
};

// Filter valid media files (exclude audio-only tracks)
export const isValidMediaFile = (filename: string): boolean => {
  const type = getFileType(filename);
  if (!type) return false;
  if (filename.includes('faudio')) return false;
  return true;
};
