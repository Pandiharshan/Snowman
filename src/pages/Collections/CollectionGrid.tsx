import React, { useMemo } from 'react';
import { MediaItem } from './collections.data';
import CollectionItem from './CollectionItem';

interface CollectionGridProps {
  items: MediaItem[];
  onItemFocus: (item: MediaItem) => void;
}

const CollectionGrid = React.memo(({ items, onItemFocus }: CollectionGridProps) => {
  // Pinterest-style masonry with varied heights
  const columns = useMemo(() => {
    const cols: MediaItem[][] = [[], [], [], []];
    
    items.forEach((item, index) => {
      // Distribute items across columns
      cols[index % 4].push(item);
    });
    
    return cols;
  }, [items]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6">
          {column.map((item) => (
            <CollectionItem key={item.id} item={item} onFocus={onItemFocus} />
          ))}
        </div>
      ))}
    </div>
  );
});

CollectionGrid.displayName = 'CollectionGrid';

export default CollectionGrid;
