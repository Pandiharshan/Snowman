import { useState, useEffect, useMemo, useCallback } from 'react';
import { getFileType, isValidMediaFile } from '@/utils/collections';
import { MediaItem } from '@/pages/Collections/collections.data';

interface CollectionManifest {
  name: string;
  slug: string;
  coverImage: string;
  hint: string;
}

interface ManifestData {
  collections: CollectionManifest[];
}

// Fetch all collections from manifest
export const useCollections = () => {
  const [collections, setCollections] = useState<CollectionManifest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchManifest = async () => {
      try {
        const response = await fetch('/assets/collections/manifest.json');
        if (!response.ok) throw new Error('Failed to load collections');
        const data: ManifestData = await response.json();
        if (isMounted) {
          setCollections(data.collections);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchManifest();
    return () => {
      isMounted = false;
    };
  }, []);

  return { collections, loading, error };
};

// Fetch single collection with files
export const useCollectionFiles = (slug: string) => {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [collectionInfo, setCollectionInfo] = useState<CollectionManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCollection = async () => {
      setLoading(true);
      setError(null);

      try {
        // First get manifest to find folder name
        const manifestRes = await fetch('/assets/collections/manifest.json');
        if (!manifestRes.ok) throw new Error('Failed to load manifest');
        const manifest: ManifestData = await manifestRes.json();
        
        const collection = manifest.collections.find(c => c.slug === slug);
        if (!collection) throw new Error('Collection not found');
        
        if (isMounted) {
          setCollectionInfo(collection);
        }

        // Fetch files list
        const filesRes = await fetch(`/assets/collections/${collection.name}/files.json`);
        if (!filesRes.ok) throw new Error('Failed to load files');
        const fileNames: string[] = await filesRes.json();

        // Process files - create MediaItems
        const mediaFiles: MediaItem[] = fileNames
          .filter(isValidMediaFile)
          .map((name, index) => {
            const type = getFileType(name)!;
            const src = `/assets/collections/${collection.name}/${name}`;
            
            // For videos, find corresponding image as thumbnail
            let thumbnail: string | undefined;
            if (type === 'video') {
              const baseName = name.split('_')[0];
              const thumbFile = fileNames.find(f => 
                f.startsWith(baseName) && 
                getFileType(f) === 'image' && 
                !f.includes('faudio')
              );
              if (thumbFile) {
                thumbnail = `/assets/collections/${collection.name}/${thumbFile}`;
              }
            }

            return {
              id: `${slug}-${index}`,
              name,
              type,
              src,
              thumbnail,
            };
          });

        if (isMounted) {
          setFiles(mediaFiles);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchCollection();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Separate images and videos for stats - memoized
  const stats = useMemo(() => ({
    total: files.length,
    images: files.filter(f => f.type === 'image').length,
    videos: files.filter(f => f.type === 'video').length,
  }), [files]);

  return { files, collectionInfo, stats, loading, error };
};
