'use client';

import Image from 'next/image';
import { MusicCollection } from '@/types/index';
import { useRouter } from 'next/navigation';

interface CollectionCardProps {
    collection: MusicCollection;
  }
  
  export default function CollectionCard({ collection }: CollectionCardProps) {
    const router = useRouter();

    const handleClick = () => {
      router.push(`/collections/${collection.id}`);
  };

      return (
      <div 
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={handleClick}
        >
        <div className="relative h-48 w-full">
          <Image
            src={collection.coverImage}
            alt={collection.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold truncate">{collection.title}</h3>
            <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
              {collection.category}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {collection.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{collection.trackCount} tracks</span>
              <span className="text-sm">{collection.duration}</span>
            </div>
            
            <button 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm transition-colors duration-200"
              onClick={() => {/* Handle play action */}}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }