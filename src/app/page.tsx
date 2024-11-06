// src/app/page.tsx
import Playlist from '@/components/Playlist';
import CollectionGrid from '@/components/CollectionGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">EdenVibe360</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Playlist />
          <CollectionGrid />
        </div>
      </main>
    </div>
  );
}