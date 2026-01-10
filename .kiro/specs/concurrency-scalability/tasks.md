# Implementation Tasks

## Task 1: Create Concurrency Utilities

**File:** `src/utils/concurrency.ts`

**Subtasks:**
- [x] Create `scheduleIdleWork` wrapper for requestIdleCallback with fallback
- [x] Create `batchProcess` function for chunked array processing
- [x] Create `createThrottledCallback` for frame-rate limited callbacks
- [x] Add TypeScript types for all utilities

**Acceptance Criteria:**
- Utilities work in all browsers (graceful fallback)
- Zero visual change
- Tested with 100+ item arrays

---

## Task 2: Create useBatchedRender Hook

**File:** `src/hooks/useBatchedRender.ts`

**Subtasks:**
- [x] Create hook that accepts items array and batch size
- [x] Implement progressive rendering using requestIdleCallback
- [x] Return currently rendered items subset
- [x] Add cleanup on unmount

**Acceptance Criteria:**
- Hook renders items in batches without blocking main thread
- Configurable batch size (default: 10)
- Zero visual change to final rendered output

---

## Task 3: Create useSharedObserver Hook

**File:** `src/hooks/useSharedObserver.ts`

**Subtasks:**
- [x] Create singleton IntersectionObserver
- [x] Implement element registration/unregistration
- [x] Callback map for per-element visibility handlers
- [x] Automatic cleanup on component unmount

**Acceptance Criteria:**
- Single observer handles all media items
- Memory efficient for 100+ items
- Zero visual change

---

## Task 4: Create useDeferredNavigation Hook

**File:** `src/hooks/useDeferredNavigation.ts`

**Subtasks:**
- [x] Wrap useNavigate with startTransition
- [x] Provide isPending state for optional loading indicators
- [x] Maintain same API as useNavigate

**Acceptance Criteria:**
- Navigation doesn't block user input
- Zero visual change (no new loading indicators)
- Works with existing router setup

---

## Task 5: Create Media Worker Infrastructure

**File:** `src/workers/media.worker.ts`

**Subtasks:**
- [x] Create worker file with typed message protocol
- [x] Implement placeholder handlers for future media processing
- [x] Create main-thread wrapper class
- [x] Add graceful fallback if workers unavailable

**Acceptance Criteria:**
- Worker loads without errors
- Currently idle (no active processing)
- Ready for future AI/media features
- Zero visual change

---

## Task 6: Integrate Batched Rendering in CollectionsSection

**File:** `src/pages/World/CollectionsSection.tsx`

**Subtasks:**
- [x] Import and use useBatchedRender hook
- [x] Replace direct array mapping with batched items
- [x] Wrap state updates in startTransition
- [x] Add shared observer for video pause/resume

**Acceptance Criteria:**
- Collections render progressively
- No jank with 20+ items
- Videos pause when off-screen
- Zero visual change

---

## Task 7: Add startTransition to Navigation Components

**Files:** `src/components/Navbar.tsx`, `src/components/CTASection.tsx`, `src/components/FeaturesSection.tsx`

**Subtasks:**
- [x] Import useDeferredNavigation or wrap navigate calls
- [x] Apply to all navigation triggers
- [x] Verify no blocking during navigation

**Acceptance Criteria:**
- Navigation feels instant
- No input blocking
- Zero visual change

---

## Task 8: Optimize MediaCard with Shared Observer

**File:** `src/pages/World/CollectionsSection.tsx` (MediaCard component)

**Subtasks:**
- [x] Replace individual visibility tracking with shared observer
- [x] Implement video pause when not visible
- [x] Implement video resume when visible again
- [x] Ensure instant resume (no reload)

**Acceptance Criteria:**
- Single observer for all cards
- Videos pause off-screen
- Instant resume on scroll back
- Zero visual change

---

## Task 9: Testing and Validation

**Subtasks:**
- [ ] Test with 10 items - smooth
- [ ] Test with 50 items - smooth
- [ ] Test with 100 items - smooth
- [ ] Verify all animations unchanged
- [ ] Verify cursor behavior unchanged
- [ ] Verify hover effects unchanged
- [ ] Performance profiling in DevTools

**Acceptance Criteria:**
- All visual tests pass
- No regressions in animations or interactions
- Frame budget stays under 16ms during normal use
