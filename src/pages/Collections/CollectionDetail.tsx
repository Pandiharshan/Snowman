import React, { useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Snowflake } from 'lucide-react';
import { getCollectionById, generateMediaItems, MediaItem } from './collections.data';
import CollectionGrid from './CollectionGrid';
import FocusModal from './FocusModal';

const CollectionDetail = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [focusedItem, setFocusedItem] = useState<MediaItem | null>(null);

  const collection = useMemo(() => getCollectionById(id || ''), [id]);
  const mediaItems = useMemo(() => generateMediaItems(id || ''), [id]);

  // Get random example prompt for focused item
  const examplePrompt = useMemo(() => {
    if (!collection) return '';
    const prompts = collection.examplePrompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  }, [collection, focusedItem]);

  const handleItemFocus = useCallback((item: MediaItem) => {
    setFocusedItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setFocusedItem(null);
  }, []);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Collection not found</p>
          <button
            onClick={() => navigate('/world')}
            className="text-sky-500 hover:text-sky-600 transition-colors"
          >
            Back to World
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/world')}
            className="
              p-2 rounded-full
              hover:bg-slate-100 dark:hover:bg-white/10
              transition-colors duration-200
            "
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
              {collection.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {collection.hint}
            </p>
          </div>
        </div>
      </header>

      {/* Snowman Guidance Strip */}
      <div className="bg-sky-50/50 dark:bg-sky-950/20 border-b border-sky-100 dark:border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Snowflake className="w-4 h-4 text-sky-500 flex-shrink-0" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {collection.guidanceHint}
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <CollectionGrid items={mediaItems} onItemFocus={handleItemFocus} />
      </main>

      {/* Focus Modal */}
      <FocusModal 
        item={focusedItem} 
        examplePrompt={examplePrompt}
        onClose={handleCloseModal} 
      />
    </div>
  );
});

CollectionDetail.displayName = 'CollectionDetail';

export default CollectionDetail;
