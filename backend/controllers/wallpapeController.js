// Mock data
const mockWallpapers = [
  { id: 1, title: 'Mountain Peak', url: '/images/mountain-peak.jpg', category: 'nature', featured: true },
  { id: 2, title: 'Ocean Wave', url: '/images/ocean-wave.jpg', category: 'nature', featured: false },
  { id: 3, title: 'Geometric Pattern', url: '/images/geometric-pattern.jpg', category: 'abstract', featured: true },
  { id: 4, title: 'City Skyline', url: '/images/city-skyline.jpg', category: 'urban', featured: false },
  { id: 5, title: 'Sunset Gradient', url: '/images/sunset-gradient.jpg', category: 'minimal', featured: true },
  { id: 6, title: 'Forest Path', url: '/images/forest-path.jpg', category: 'nature', featured: false },
  { id: 7, title: 'Neon Lights', url: '/images/neon-lights.jpg', category: 'urban', featured: true },
  { id: 8, title: 'Abstract Flow', url: '/images/abstract-flow.jpg', category: 'abstract', featured: false }
];

const mockCategories = [
  'nature',
  'abstract', 
  'urban',
  'minimal',
  'space',
  'digital-art'
];

const getWallpapers = async (req, res) => {
  try {
    res.json(mockWallpapers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallpapers' });
  }
};

const getCategories = async (req, res) => {
  try {
    res.json(mockCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getFeaturedWallpapers = async (req, res) => {
  try {
    const featured = mockWallpapers.filter(wallpaper => wallpaper.featured);
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured wallpapers' });
  }
};

const searchWallpapers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json([]);
    }
    
    const searchTerm = q.toLowerCase();
    const results = mockWallpapers.filter(wallpaper =>
      wallpaper.title.toLowerCase().includes(searchTerm) ||
      wallpaper.category.toLowerCase().includes(searchTerm)
    );
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
};

const uploadWallpaper = async (req, res) => {
  try {
    const { title, category } = req.body;
    
    const newWallpaper = {
      id: mockWallpapers.length + 1,
      title: title || 'Untitled Wallpaper',
      url: `/uploads/wallpaper-${Date.now()}.jpg`,
      category: category || 'uncategorized',
      featured: false
    };
    
    mockWallpapers.push(newWallpaper);
    
    res.status(201).json({
      message: 'Wallpaper uploaded successfully',
      wallpaper: newWallpaper
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

module.exports = {
  getWallpapers,
  getCategories,
  getFeaturedWallpapers,
  searchWallpapers,
  uploadWallpaper
};