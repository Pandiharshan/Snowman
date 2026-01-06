# Design Document: Premium Mixed Collections System

## Overview

The Premium Mixed Collections System is a dynamic, performant media gallery that discovers collections from the file system and displays mixed images and videos in a unified, premium interface. The system uses lazy loading, intelligent hover-based video preview, and smooth animations to create a calm, cinematic experience inspired by Adobe Firefly.

**Key Design Principles:**
- Dynamic folder-based discovery (no hardcoded data)
- Unified grid for all media types (images + videos together)
- Performance-first (lazy loading, metadata-only video preload, 60 FPS)
- Mobile-aware (hover autoplay desktop-only, tap-to-preview mobile)
- Future-ready (prepared for user uploads without rewriting)

## Architecture

### High-Level Flow

```
User visits /collections/:collection-name
    ↓
CollectionsPage component loads
    ↓
useCollectionLoader hook scans public/assets/collections/
    ↓
Detects folders and reads file extensions
    ↓
Separates images (.jpg, .png, .webp, .avif) from videos (.mp4, .webm, .mov)
    ↓
Renders unified masonry grid with MediaCard components
    ↓
MediaCard detects type and renders appropriate behavior
    ↓
User interacts: hover (video preview), click (fullscreen)
```

### Data Flow

**Collection Discovery:**
1. System scans `public/assets/collections/` directory
2. Each folder = one collection
3. Folder name = collection display name
4. Files inside = media items (mixed types)

**Media Detection:**
- Extension-based only (no filename guessing)
- Images: .jpg, .jpeg, .png, .webp, .avif
- Videos: .mp4, .webm, .mov
- Unknown extensions: silently skipped

**Grid Rendering:**
- Masonry layout with adaptive heights
- All cards use same styling (rounded corners, glass surface, shadow)
- Behavior differs by type (images zoom on hover, videos autoplay on hover)

## Components and Interfaces

### Core Components

#### 1. CollectionsPage Component
**Purpose:** Main page component that loads and displays a collection

**Props:**
```typescript
interface CollectionsPageProps {
  collectionName: string; // from URL param
}
```

**Responsibilities:**
- Extract collection name from URL
- Load collection media using `useCollectionLoader`
- Render collection title and media grid
- Handle loading/error states

**Key Features:**
- Dynamic folder reading (not static arrays)
- Responsive grid layout
- Error handling for missing collections

#### 2. MediaGrid Component
**Purpose:** Renders masonry grid of media items

**Props:**
```typescript
interface MediaGridProps {
  items: MediaItem[];
  collectionName: string;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  path: string;
  filename: string;
}
```

**Responsibilities:**
- Render masonry grid layout
- Pass items to MediaCard components
- Handle responsive breakpoints
- Maintain editorial spacing

**Styling:**
- Masonry grid with CSS Grid or similar
- Uneven heights allowed (editorial look)
- Spacious padding (16-24px)
- Dark premium background
- No harsh borders

#### 3. MediaCard Component
**Purpose:** Individual card for image or video with type-specific behavior

**Props:**
```typescript
interface MediaCardProps {
  item: MediaItem;
  collectionName: string;
}
```

**Responsibilities:**
- Detect media type from item.type
- Render appropriate card (ImageCard or VideoCard)
- Handle lazy loading
- Manage fullscreen state

**Shared Styling:**
- Rounded corners: 14-18px
- Dark glass surface (backdrop-filter or rgba)
- Soft shadow (0 4px 12px rgba(0,0,0,0.15))
- Smooth transitions (200-300ms)

#### 4. ImageCard Component
**Purpose:** Image-specific card with zoom and fullscreen behavior

**Props:**
```typescript
interface ImageCardProps {
  item: MediaItem;
  collectionName: string;
}
```

**Behavior:**
- Lazy load image
- Hover: scale 1.03 + subtle glow
- Click: open fullscreen viewer
- No play icon or video UI

**Fullscreen Viewer:**
- Display at 4K resolution
- Close on ESC or close button
- Smooth fade in/out

#### 5. VideoCard Component
**Purpose:** Video-specific card with hover autoplay and fullscreen modal

**Props:**
```typescript
interface VideoCardProps {
  item: MediaItem;
  collectionName: string;
}
```

**Behavior:**
- Extract first frame as thumbnail (via video element)
- Show play icon overlay
- Desktop hover: auto-play muted, smooth loop, no controls
- Mobile: tap-to-preview (no autoplay)
- Click: fullscreen modal with controls
- Mouse leave: stop playback, return to thumbnail

**Hover Autoplay Implementation:**
- Use `<video>` element with `autoplay muted loop`
- Preload="metadata" only
- GPU-accelerated (will-change: transform)
- Instant playback (no lag)
- No flicker (smooth transitions)

**Fullscreen Modal:**
- Standard video controls (play, pause, volume, fullscreen)
- Close on ESC or close button
- Muted by default (user can unmute)

### Hooks

#### useCollectionLoader
**Purpose:** Dynamically load collection data from file system

**Returns:**
```typescript
interface UseCollectionLoaderReturn {
  collections: string[]; // collection folder names
  mediaItems: MediaItem[]; // items in current collection
  loading: boolean;
  error: string | null;
}
```

**Implementation Notes:**
- Scan `public/assets/collections/` directory
- Read folder names
- For each folder, read file list
- Filter by extension (image/video)
- Return structured data

**Key Constraint:**
- Must read dynamically (not from static arrays)
- Must adapt to folder changes on next page load

#### useMediaType
**Purpose:** Detect media type from file extension

**Returns:**
```typescript
type MediaType = 'image' | 'video' | 'unknown';

function useMediaType(filename: string): MediaType
```

**Logic:**
- Extract extension (case-insensitive)
- Match against known extensions
- Return type or 'unknown'

#### useIsMobile
**Purpose:** Detect if user is on mobile device

**Returns:**
```typescript
function useIsMobile(): boolean
```

**Implementation:**
- Check window.innerWidth < 768px
- Listen to resize events
- Update on orientation change

### Utilities

#### getCollectionPath
**Purpose:** Build path to collection folder

```typescript
function getCollectionPath(collectionName: string): string {
  return `/assets/collections/${encodeURIComponent(collectionName)}/`;
}
```

#### isImageExtension
**Purpose:** Check if file is image

```typescript
function isImageExtension(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(ext || '');
}
```

#### isVideoExtension
**Purpose:** Check if file is video

```typescript
function isVideoExtension(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ['mp4', 'webm', 'mov'].includes(ext || '');
}
```

## Data Models

### MediaItem
```typescript
interface MediaItem {
  id: string;                    // unique identifier
  type: 'image' | 'video';       // detected from extension
  path: string;                  // relative path from public/
  filename: string;              // original filename
  collectionName: string;        // parent collection
}
```

### Collection
```typescript
interface Collection {
  name: string;                  // folder name
  path: string;                  // folder path
  mediaItems: MediaItem[];       // mixed images and videos
  itemCount: number;             // total items
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Mixed Media Grid Invariant
**For any** collection folder containing both images and videos, the rendered grid SHALL contain all media items (images and videos together) in a single unified grid without separation.

**Validates: Requirements 2.1, 2.5**

### Property 2: File Type Detection Accuracy
**For any** file in a collection folder, the system SHALL correctly classify it as image, video, or unknown based ONLY on its file extension, regardless of filename content.

**Validates: Requirements 1.4, 10.4**

### Property 3: Dynamic Collection Discovery
**For any** new folder added to `public/assets/collections/`, the system SHALL automatically include it as a collection on the next page load without code changes.

**Validates: Requirements 1.2, 6.3**

### Property 4: Lazy Loading Invariant
**For any** media item in a collection, the item SHALL NOT load until it enters the viewport (or is about to enter), reducing initial page load time.

**Validates: Requirements 5.1, 5.2**

### Property 5: Video Hover Autoplay (Desktop Only)
**For any** video card on desktop, hovering SHALL trigger immediate, lag-free autoplay with muted audio and smooth looping, and moving the mouse away SHALL stop playback and return to thumbnail.

**Validates: Requirements 4.3, 4.5, 4.7**

### Property 6: Image Hover Zoom
**For any** image card, hovering SHALL apply a soft zoom (scale ~1.03) and subtle glow without affecting layout or causing jank.

**Validates: Requirements 3.2**

### Property 7: Fullscreen Viewer Round Trip
**For any** media item clicked from the grid, opening and closing the fullscreen viewer SHALL return the user to the same grid position without losing scroll state.

**Validates: Requirements 3.3, 4.6, 7.1, 7.2**

### Property 8: Mobile Tap-to-Preview
**For any** video card on mobile, tapping SHALL preview the video without autoplay, and the system SHALL NOT trigger hover autoplay on mobile devices.

**Validates: Requirements 5.3, 5.4**

### Property 9: No Layout Shift on Media Load
**For any** media item loading, the grid layout SHALL NOT shift or cause cumulative layout shift (CLS), maintaining stable card positions.

**Validates: Requirements 5.6, 5.7**

### Property 10: URL-Based Collection Routing
**For any** collection name, navigating to `/collections/:collection-name` SHALL load and display that specific collection's media, and the URL SHALL properly encode special characters.

**Validates: Requirements 6.1, 6.2, 6.4**

### Property 11: Data Integrity (No Hardcoded Data)
**For any** page load, the system SHALL read collection data ONLY from the file system, never from hardcoded arrays or placeholder data.

**Validates: Requirements 8.2, 10.2, 10.3**

### Property 12: 60 FPS Animation Performance
**For any** animation (hover zoom, video autoplay, transitions), the system SHALL maintain 60 FPS without frame drops or stuttering.

**Validates: Requirements 5.5**

## Error Handling

### Missing Collection
- **Scenario:** User navigates to `/collections/nonexistent`
- **Behavior:** Display "Collection not found" message with link back to collections list
- **Logging:** Log 404 error to console

### Empty Collection
- **Scenario:** Collection folder exists but contains no media files
- **Behavior:** Display "No media in this collection" message
- **Logging:** Log warning to console

### File System Read Error
- **Scenario:** System cannot read `public/assets/collections/` directory
- **Behavior:** Display "Error loading collections" message
- **Logging:** Log error with details to console

### Video Playback Error
- **Scenario:** Video file fails to load or play
- **Behavior:** Show placeholder with error icon, allow user to continue browsing
- **Logging:** Log video error to console

### Image Load Error
- **Scenario:** Image file fails to load
- **Behavior:** Show placeholder with error icon, allow user to continue browsing
- **Logging:** Log image error to console

## Testing Strategy

### Unit Tests
- Test file type detection (isImageExtension, isVideoExtension)
- Test collection path building (getCollectionPath)
- Test media item creation and validation
- Test URL encoding for special characters
- Test responsive breakpoint detection

### Property-Based Tests
- **Property 1:** Generate random collections with mixed media, verify all items appear in grid
- **Property 2:** Generate random filenames with various extensions, verify correct classification
- **Property 3:** Simulate folder additions, verify automatic discovery
- **Property 4:** Verify lazy loading by checking DOM before/after viewport entry
- **Property 5:** Simulate hover events on videos, verify autoplay behavior and cleanup
- **Property 6:** Simulate hover on images, verify zoom transform applied
- **Property 7:** Simulate fullscreen open/close, verify scroll position restoration
- **Property 8:** Simulate mobile tap events, verify no autoplay on mobile
- **Property 9:** Measure layout shift during media load, verify CLS = 0
- **Property 10:** Generate random collection names with special characters, verify routing
- **Property 11:** Verify no hardcoded data in component state
- **Property 12:** Measure frame rate during animations, verify 60 FPS

### Integration Tests
- Test full collection page load and render
- Test navigation between collections
- Test fullscreen viewer open/close flow
- Test responsive layout changes
- Test error states and recovery

### Performance Tests
- Measure initial page load time
- Measure lazy load performance
- Measure hover autoplay latency
- Measure scroll performance with many items
- Verify no memory leaks during extended use

## Future Considerations

### User-Generated Media Upload
- Prepare component structure for future upload feature
- Design API contract for media assignment to collections
- Ensure folder-based discovery supports dynamically added files
- Plan for backend integration without frontend rewrite

### Collection Metadata
- Future support for collection descriptions, tags, sorting
- Prepare data model for metadata without breaking current structure

### Advanced Filtering
- Future support for search, filtering by type, date range
- Design filter UI that complements calm aesthetic

### Analytics
- Track popular collections and media items
- Measure user engagement with hover autoplay
- Monitor performance metrics

## Styling and Theme

### Color Palette
- Background: Dark (near-black, e.g., #0a0a0a)
- Card Surface: Glass effect (rgba with backdrop-filter)
- Text: Light (e.g., #f5f5f5)
- Accent: Subtle glow (soft white or brand color)

### Typography
- Font: System font stack or premium sans-serif
- Size: Responsive (16px base, scale with viewport)
- Weight: Regular (400) for body, Medium (500) for headings

### Spacing
- Grid gap: 16-24px
- Card padding: 0 (full bleed)
- Section padding: 24-32px

### Animations
- Transition duration: 200-300ms
- Easing: ease-out or cubic-bezier(0.4, 0, 0.2, 1)
- No heavy animations (keep calm aesthetic)

### Responsive Breakpoints
- Mobile: < 768px (1 column, tap-to-preview)
- Tablet: 768px - 1024px (2-3 columns)
- Desktop: > 1024px (3-4 columns, hover autoplay)
