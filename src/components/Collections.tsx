'use client';

import { musicCollections } from '@/data/collections';
import CollectionCard from '@/components/CollectionCard';

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

export default function Collections() {
    const shuffledCollections = shuffleArray([...musicCollections]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-2 lg:p-2">
          {shuffledCollections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      );
}