// Collection metadata
export interface Collection {
  id: string;
  title: string;
  hint: string;
  coverImage: string;
  guidanceHint: string;
  examplePrompts: string[];
}

export const collections: Collection[] = [
  { 
    id: 'dream-worlds', 
    title: 'Dream Worlds', 
    hint: 'Surreal landscapes', 
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
    guidanceHint: 'Notice how lighting and colors change the mood ❄️',
    examplePrompts: [
      'A floating island above soft clouds at golden hour…',
      'An endless staircase leading to a glowing doorway…',
      'A quiet forest where the trees glow with gentle light…',
    ]
  },
  { 
    id: 'cute-characters', 
    title: 'Cute Characters', 
    hint: 'Friendly creatures', 
    coverImage: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80',
    guidanceHint: 'Think about what makes a character feel friendly ❄️',
    examplePrompts: [
      'A tiny fox wearing a cozy scarf in the snow…',
      'A round fluffy creature with big curious eyes…',
      'A small dragon sharing tea with a bunny…',
    ]
  },
  { 
    id: 'winter-stories', 
    title: 'Winter Stories', 
    hint: 'Snowy adventures', 
    coverImage: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&q=80',
    guidanceHint: 'Feel the quiet magic of snow and stillness ❄️',
    examplePrompts: [
      'A cabin with warm light glowing through frosted windows…',
      'Footprints leading to a mysterious ice cave…',
      'A child building a snowman under northern lights…',
    ]
  },
  { 
    id: 'fantasy-places', 
    title: 'Fantasy Places', 
    hint: 'Magical realms', 
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    guidanceHint: 'Imagine places that could only exist in dreams ❄️',
    examplePrompts: [
      'A crystal castle floating on a cloud…',
      'A hidden garden with flowers that glow at night…',
      'An ancient library with books that whisper secrets…',
    ]
  },
  { 
    id: 'space-dreams', 
    title: 'Space Dreams', 
    hint: 'Cosmic wonders', 
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80',
    guidanceHint: 'Look at how vast and peaceful space can feel ❄️',
    examplePrompts: [
      'A cozy spaceship drifting past colorful nebulas…',
      'A planet made entirely of soft glowing crystals…',
      'An astronaut planting flowers on the moon…',
    ]
  },
  { 
    id: 'ocean-magic', 
    title: 'Ocean Magic', 
    hint: 'Underwater worlds', 
    coverImage: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80',
    guidanceHint: 'Notice the gentle movement and soft colors below ❄️',
    examplePrompts: [
      'A mermaid reading a book in a coral library…',
      'Bioluminescent jellyfish lighting up the deep…',
      'A sunken ship transformed into a cozy home…',
    ]
  },
];

// Media item types
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
}

// Placeholder image URLs from Unsplash (varied themes)
const imageUrls = [
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80',
  'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&q=80',
  'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&q=80',
  'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&q=80',
  'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
];

// Placeholder video URLs (using sample videos)
const videoUrls = [
  'https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
];

// Generate 80 media items with varied aspect ratios
export const generateMediaItems = (collectionId: string): MediaItem[] => {
  const items: MediaItem[] = [];
  const aspectRatios: ('portrait' | 'landscape' | 'square')[] = ['portrait', 'landscape', 'square'];
  
  for (let i = 0; i < 80; i++) {
    const isVideo = i % 12 === 0; // ~7 videos out of 80
    const aspectRatio = aspectRatios[i % 3];
    
    if (isVideo) {
      items.push({
        id: `${collectionId}-video-${i}`,
        type: 'video',
        src: videoUrls[i % videoUrls.length],
        thumbnail: imageUrls[i % imageUrls.length],
        aspectRatio,
      });
    } else {
      items.push({
        id: `${collectionId}-image-${i}`,
        type: 'image',
        src: imageUrls[i % imageUrls.length],
        aspectRatio,
      });
    }
  }
  
  return items;
};

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(c => c.id === id);
};
