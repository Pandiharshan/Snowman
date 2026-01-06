import React, { useMemo } from 'react';
import { MediaItem } from './collections.data';
import CollectionItem from './CollectionItem';

interface CollectionGridProps {
  items: MediaItem[];
  onItemFocus: (item: MediaItem) => void;
}

const CollectionGrid = React.memo(({ items, onItemFocus }: CollectionGridProps) => {
  // Split items into columns for masonry layout
  const columns = useMemo(() => {
    const cols: MediaItem[][] = [[], [], [], []];
    items.forEach((item, index) => {
      cols[index % 4].push(item);
    });
    return cols;
  }, [items]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-3 md:gap-4">
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
