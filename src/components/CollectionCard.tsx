// src/components/CollectionCard.tsx
'use client';

import Image from 'next/image';
import { MusicCollection } from '@/types/index';
import { usePlayer } from '@/context/PlayerContext';

interface CollectionCardProps {
  collection: MusicCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  // const router = useRouter();
  const { loadCollection } = usePlayer();

  const handleClick = async () => {
    try {
      await loadCollection(collection);
      // Instead of router.push, you can just update the state or display a message
    } catch (error) {
      console.error('Error loading collection:', error);
    }
  };

  return (
    <div 
      className="relative cursor-pointer overflow-hidden 
                 rounded-lg shadow-lg transition-transform 
                 duration-300 transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative h-80 w-full">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          className="object-cover"
        />
        <div className='absolute inset-0 bg-gradient-to-t 
                      from-black to-transparent opacity-70 
                      group-hover:opacity-90 transition-opacity duration-300'
        ></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold mb-2 text-white">{collection.title}</h3>
        <p className="text-sm mb-4 text-gray-300">{collection.description}</p>
        {/* <div className="flex justify-between items-center"> */}
          {/* <span className="text-sm text-gray-300">{collection.trackCount} tracks</span> */}
          {/* <span className="text-sm text-gray-300">{collection.duration}</span> */}
        {/* </div> */}
      </div>
    </div>
  );
}