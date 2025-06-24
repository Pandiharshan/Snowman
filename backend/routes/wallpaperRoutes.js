const express = require('express');
const router = express.Router();
const wallpaperController = require('../controllers/wallpaperController');

router.get('/api/wallpapers', wallpaperController.getWallpapers);
router.get('/api/categories', wallpaperController.getCategories);
router.get('/api/featured', wallpaperController.getFeaturedWallpapers);
router.get('/api/search', wallpaperController.searchWallpapers);
router.post('/api/upload', wallpaperController.uploadWallpaper);

module.exports = router;
