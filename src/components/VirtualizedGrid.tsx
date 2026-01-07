import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface VirtualizedGridProps {
  items: any[];
  itemComponent: React.ComponentType<any>;
  itemHeight?: number;
  itemWidth?: number;
  overscan?: number;
  className?: string;
  gap?: number;
  columnCount?: number;
  children?: React.ReactNode;
}

const VirtualizedGrid: React.FC<VirtualizedGridProps> = ({
  items,
  itemComponent: ItemComponent,
  itemHeight = 300,
  itemWidth = 250,
  overscan = 5,
  className = '',
  gap = 16,
  columnCount = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) * columnCount - overscan);
    const endIndex = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) * columnCount + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, containerHeight, items.length, itemHeight, columnCount, overscan]);

  // Calculate rows and columns
  const rowCount = Math.ceil(items.length / columnCount);
  const totalHeight = rowCount * itemHeight + (rowCount - 1) * gap;

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  // Handle resize
  useEffect(() => {
    const updateContainerHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    
    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [items, visibleRange]);

  // Calculate position for each visible item
  const getItemPosition = (index: number) => {
    const rowIndex = Math.floor(index / columnCount);
    const colIndex = index % columnCount;
    
    return {
      top: rowIndex * (itemHeight + gap),
      left: colIndex * (itemWidth + gap),
    };
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      onScroll={handleScroll}
      style={{ height: '100%' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = visibleRange.startIndex + index;
          const position = getItemPosition(actualIndex);
          
          return (
            <div
              key={`${item.id || actualIndex}`}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: itemWidth,
                height: itemHeight,
              }}
            >
              <ItemComponent item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedGrid;