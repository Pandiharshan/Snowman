# Design Document

## Overview

This design implements advanced concurrency and scalability patterns for Snowman, focusing on main thread protection, progressive boot, collection scalability, and future-ready worker architecture. All changes are internal-only with zero visual impact.

## Architecture Decisions

### Decision 1: React 18 Concurrent Rendering with startTransition

**Choice:** Use React 18's `startTransition` API for non-urgent state updates

**Rationale:**
- React Router v7 already configured with `v7_startTransition: true`
- Allows React to interrupt rendering for urgent updates (user input)
- Prevents UI blocking during heavy state changes
- Zero visual change - same output, better responsiveness

**Implementation:**
- Wrap navigation state updates in `startTransition`
- Use `useDeferredValue` for search/filter inputs
- Apply to collection loading and filtering operations

### Decision 2: Batched Collection Rendering

**Choice:** Implement progressive batch rendering for collections

**Rationale:**
- Current: All 20 preview items render at once
- Problem: 100+ items would cause jank
- Solution: Render in batches of 10-20 items per frame
- Uses `requestIdleCallback` for non-blocking batch processing

**Implementation:**
- `useBatchedRender` hook that yields to main thread between batches
- Configurable batch size based on device capability
- Graceful degradation for browsers without `requestIdleCallback`

### Decision 3: Web Worker Infrastructure (Future-Ready)

**Choice:** Create lightweight worker infrastructure for media processing

**Rationale:**
- Current media processing is minimal but architecture should support growth
- Workers enable future AI-assisted features without main thread blocking
- Message-based communication allows clean separation of concerns

**Implementation:**
- `MediaWorker` class with typed message protocol
- Graceful fallback to main thread if workers unavailable
- Currently idle - activates only when needed

### Decision 4: Intersection Observer Pooling

**Choice:** Share single IntersectionObserver across all media items

**Rationale:**
- Current: Each MediaCard could create its own observer
- Problem: 100+ observers = memory pressure
- Solution: Single pooled observer with callback map

**Implementation:**
- `useSharedIntersectionObserver` hook
- Centralized observer with element-to-callback mapping
- Automatic cleanup on unmount

### Decision 5: Resource Cleanup for Off-Screen Media

**Choice:** Pause/release resources for media scrolled out of view

**Rationale:**
- Videos playing off-screen waste CPU/GPU
- Large images in memory cause pressure on low-end devices
- Cleanup must be invisible to user (no pop-in on scroll back)

**Implementation:**
- Track visibility via shared IntersectionObserver
- Pause videos when not visible
- Keep images in memory (browser handles this well)
- Resume instantly on scroll back into view

## Component Architecture

```
src/
├── hooks/
│   ├── useBatchedRender.ts      # Progressive batch rendering
│   ├── useSharedObserver.ts     # Pooled IntersectionObserver
│   └── useDeferredNavigation.ts # startTransition wrapper
├── workers/
│   └── media.worker.ts          # Future media processing worker
└── utils/
    └── concurrency.ts           # Scheduler utilities
```

## Data Flow

### Collection Loading Flow (Optimized)
```
1. Component mounts
2. requestIdleCallback schedules manifest fetch
3. Manifest loads → startTransition wraps state update
4. Items render in batches via useBatchedRender
5. Each batch yields to main thread
6. Shared observer tracks visibility
7. Off-screen videos pause automatically
```

### Navigation Flow (Optimized)
```
1. User clicks navigation
2. startTransition wraps route change
3. React prioritizes any pending user input
4. Route renders when main thread is free
5. No blocking, no jank
```

## Performance Targets

| Metric | Current | Target |
|--------|---------|--------|
| First Paint | ~200ms | <150ms |
| Time to Interactive | ~500ms | <400ms |
| 100 items render | untested | <100ms |
| 1000 items render | untested | <500ms (virtualized) |
| Frame budget usage | ~12ms | <10ms |

## Visual Consistency Guarantees

1. All animations unchanged (Framer Motion configs preserved)
2. All hover effects unchanged (CSS transitions preserved)
3. All cursor behavior unchanged (CursorGlow untouched)
4. Loading states unchanged (same spinners, same timing feel)
5. No new loading indicators or skeleton changes
