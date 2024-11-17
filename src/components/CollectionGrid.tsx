// src/components/CollectionGrid.tsx
'use client';

import { musicCollections } from '@/data/collections';
import CollectionCard from './CollectionCard';

export default function CollectionGrid() {
  const featuredCollections = musicCollections.filter(collection => collection.featured);

  return (
    <div className="grid gap-6 p-4 md:p-2 lg:p-2">
      <h2 className="text-2xl font-bold text-white">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredCollections.map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}