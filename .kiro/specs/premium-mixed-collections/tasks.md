# Implementation Plan: Premium Mixed Collections System

## Overview

This implementation plan breaks down the Premium Mixed Collections System into discrete, incremental tasks. The system will be built using TypeScript, React, and Tailwind CSS with a focus on dynamic folder-based discovery, unified media grids, and premium interactions. Each task builds on previous work, with property-based tests validating correctness properties throughout.

## Tasks

- [x] 1. Set up project structure and core utilities
  - Create `src/services/collectionService.ts` for file system scanning and media detection
  - Create `src/utils/mediaTypeDetection.ts` with `isImageExtension()` and `isVideoExtension()` functions
  - Create `src/utils/collectionPath.ts` with `getCollectionPath()` utility
  - Create `src/types/collection.ts` with `MediaItem` and `Collection` interfaces
  - _Requirements: 1.1, 1.3, 1.4, 10.1, 10.3_

- [x] 1.1 Write property test for file type detection accuracy
  - **Property 2: File Type Detection Accuracy**
  - **Validates: Requirements 1.4, 10.4**
  - Test that files are classified correctly by extension only

- [ ] 2. Create collection discovery hook
  - Create `src/hooks/useCollectionLoader.ts` hook that scans `public/assets/collections/` directory
  - Implement dynamic folder reading (not static arrays)
  - Implement media file filtering by extension
  - Handle loading and error states
  - _Requirements: 1.1, 1.2, 1.3, 6.3, 8.2, 8.3_

- [x] 2.1 Write property test for dynamic collection discovery
  - **Property 3: Dynamic Collection Discovery**
  - **Validates: Requirements 1.2, 6.3**
  - Test that new folders are automatically discovered on page load

- [x] 2.2 Write property test for data integrity (no hardcoded data)
  - **Property 11: Data Integrity (No Hardcoded Data)**
  - **Validates: Requirements 8.2, 10.2, 10.3**
  - Test that only file system data is used, no hardcoded arrays

- [x] 3. Create media grid component
  - Create `src/components/MediaGrid.tsx` component
  - Implement masonry grid layout using CSS Grid
  - Support responsive breakpoints (mobile: 1 col, tablet: 2-3 cols, desktop: 3-4 cols)
  - Implement lazy loading for media items
  - _Requirements: 2.1, 2.4, 5.1, 5.6, 5.7_

- [x] 3.1 Write property test for mixed media grid invariant
  - **Property 1: Mixed Media Grid Invariant**
  - **Validates: Requirements 2.1, 2.5**
  - Test that all media items (images and videos) appear together in one grid

- [x] 3.2 Write property test for no layout shift on media load
  - **Property 9: No Layout Shift on Media Load**
  - **Validates: Requirements 5.6, 5.7**
  - Test that grid layout doesn't shift when media loads

- [ ] 4. Create image card component
  - Create `src/components/ImageCard.tsx` component
  - Implement lazy loading with Intersection Observer
  - Implement hover zoom (scale 1.03) and subtle glow effect
  - Implement click handler to open fullscreen viewer
  - Ensure no play icon or video UI elements
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1_

- [x] 4.1 Write property test for image hover zoom
  - **Property 6: Image Hover Zoom**
  - **Validates: Requirements 3.2**
  - Test that hover applies correct transform without layout shift

- [x] 4.2 Write property test for lazy loading invariant
  - **Property 4: Lazy Loading Invariant**
  - **Validates: Requirements 5.1, 5.2**
  - Test that images don't load until viewport entry

- [x] 5. Create video card component
  - Create `src/components/VideoCard.tsx` component
  - Implement first frame extraction as thumbnail (via video poster)
  - Implement play icon overlay
  - Implement hover autoplay (desktop only) with muted audio and smooth looping
  - Implement mouse leave to stop playback and return to thumbnail
  - Set preload="metadata" for performance
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.2_

- [x] 5.1 Write property test for video hover autoplay (desktop only)
  - **Property 5: Video Hover Autoplay (Desktop Only)**
  - **Validates: Requirements 4.3, 4.5, 4.7**
  - Test that hover triggers autoplay on desktop and stops on mouse leave

- [x] 5.2 Write property test for mobile tap-to-preview
  - **Property 8: Mobile Tap-to-Preview**
  - **Validates: Requirements 5.3, 5.4**
  - Test that mobile doesn't autoplay on hover but allows tap preview

- [x] 6. Create media card wrapper component
  - Create `src/components/MediaCard.tsx` component
  - Detect media type from `item.type`
  - Render `ImageCard` or `VideoCard` based on type
  - Handle fullscreen state management
  - _Requirements: 2.1, 3.1, 4.1_

- [x] 7. Create fullscreen image viewer
  - Create `src/components/FullscreenImageViewer.tsx` component
  - Display image at 4K resolution
  - Implement close on ESC key and close button
  - Implement smooth fade in/out transitions
  - Preserve scroll position when closing
  - _Requirements: 3.3, 7.1, 7.3, 7.4_

- [x] 7.1 Write property test for fullscreen viewer round trip
  - **Property 7: Fullscreen Viewer Round Trip**
  - **Validates: Requirements 3.3, 4.6, 7.1, 7.2**
  - Test that opening and closing fullscreen returns to same scroll position

- [x] 8. Create fullscreen video modal
  - Create `src/components/FullscreenVideoModal.tsx` component
  - Display video with standard playback controls (play, pause, volume, fullscreen)
  - Implement close on ESC key and close button
  - Implement smooth fade in/out transitions
  - Preserve scroll position when closing
  - _Requirements: 4.6, 7.2, 7.3, 7.5_

- [x] 9. Create collections page component
  - Create `src/pages/Collections/CollectionsPage.tsx` component
  - Extract collection name from URL parameter
  - Load collection using `useCollectionLoader` hook
  - Render collection title and media grid
  - Handle loading and error states
  - _Requirements: 1.1, 6.1, 6.2_

- [x] 9.1 Write property test for URL-based collection routing
  - **Property 10: URL-Based Collection Routing**
  - **Validates: Requirements 6.1, 6.2, 6.4**
  - Test that navigating to `/collections/:collection-name` loads correct collection

- [x] 10. Implement mobile detection hook
  - Create `src/hooks/useIsMobile.ts` hook
  - Detect if viewport width < 768px
  - Listen to resize events and update on orientation change
  - _Requirements: 5.3, 5.4_

- [x] 11. Add styling and theme
  - Apply Tailwind CSS classes for dark premium background
  - Implement glass effect for card surfaces (backdrop-filter)
  - Implement smooth transitions (200-300ms, ease-out)
  - Implement responsive spacing (16-24px gaps)
  - Ensure no harsh borders or visual noise
  - _Requirements: 2.2, 2.3, 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 12. Implement error handling
  - Handle missing collection (404)
  - Handle empty collection (no media files)
  - Handle file system read errors
  - Handle video playback errors
  - Handle image load errors
  - Display user-friendly error messages
  - _Requirements: 1.5, 10.1, 10.4_

- [x] 13. Checkpoint - Ensure all tests pass
  - Run all property-based tests and verify they pass
  - Run all unit tests and verify they pass
  - Check console for errors and warnings
  - Verify no layout shift or performance issues
  - Ask the user if questions arise

- [x] 14. Integration and wiring
  - Wire `CollectionsPage` into main routing
  - Ensure collection discovery works on page load
  - Ensure media grid renders correctly
  - Ensure fullscreen viewers work correctly
  - Test navigation between collections
  - _Requirements: 1.1, 6.1, 6.2, 6.3_

- [x] 14.1 Write integration tests
  - Test full collection page load and render
  - Test navigation between collections
  - Test fullscreen viewer open/close flow
  - Test responsive layout changes
  - _Requirements: 1.1, 6.1, 6.2_

- [x] 15. Performance optimization
  - Verify lazy loading is working (images/videos don't load until viewport)
  - Verify video preload="metadata" is set
  - Verify 60 FPS animations (no frame drops)
  - Verify no cumulative layout shift (CLS = 0)
  - Verify scroll performance is smooth
  - _Requirements: 5.1, 5.2, 5.5, 5.6, 5.7_

- [x] 15.1 Write property test for 60 FPS animation performance
  - **Property 12: 60 FPS Animation Performance**
  - **Validates: Requirements 5.5**
  - Test that animations maintain 60 FPS without frame drops

- [x] 16. Data cleanup and validation
  - Remove any dummy or placeholder data
  - Remove any hardcoded collection arrays
  - Verify only file system data is used
  - Verify non-media files are ignored
  - Verify unrecognized extensions are skipped
  - _Requirements: 8.2, 10.2, 10.3, 10.4, 10.5_

- [x] 17. Final checkpoint - Ensure all tests pass
  - Run all property-based tests and verify they pass
  - Run all unit tests and verify they pass
  - Check console for errors and warnings
  - Verify mixed image + video grid works
  - Verify hover video feels premium
  - Verify images stay crisp
  - Verify scroll is smooth
  - Verify folder changes reflect in UI
  - Ask the user if questions arise

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation
- All media discovery is dynamic (no hardcoded data)
- Mixed images and videos are always displayed together
- Performance is optimized for 60 FPS smooth interactions
