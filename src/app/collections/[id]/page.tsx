'use client';

import { useParams } from 'next/navigation';
import { musicCollections } from '@/data/collections';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Player from '@/components/Player';

export default function CollectionPage() {
  const { id } = useParams();
  const collection = musicCollections.find(c => c.id === id);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover Image */}
            <div className="relative w-full md:w-[300px] h-[300px]">
              <Image
                src={collection.coverImage}
                alt={collection.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Collection Info */}
            <div className="flex-grow">
              <span className="text-sm text-purple-600 font-medium">
                {collection.category}
              </span>
              <h1 className="text-3xl font-bold mt-2">{collection.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                {collection.description}
              </p>
              
              <div className="flex items-center gap-4 mt-6">
                <span>{collection.trackCount} tracks</span>
                <span>{collection.duration}</span>
              </div>

              <button className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-200">
                Play Collection
              </button>
            </div>
          </div>

          {/* Tracks list could go here */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Tracks</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-center text-gray-600 dark:text-gray-300">
                Track list to be implemented
              </p>
            </div>
          </div>
        </div>
      </main>
      <Player />
    </div>
  );
}