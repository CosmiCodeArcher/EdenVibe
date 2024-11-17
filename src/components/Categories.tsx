'use client';

import { useState } from 'react';
import { musicCollections } from '@/data/collections';
import CollectionCard from '@/components/CollectionCard';
import { motion } from 'framer-motion';

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Categories() {
  const categories = Array.from(new Set(musicCollections.map(collection => collection.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const shuffledCollections = shuffleArray([...musicCollections]);

  return (
    <div className='p-4 md:p-3 lg:p-2'>
      <div className="flex flex-wrap space-x-4 mb-5 justify-center md:justify-start">
        {categories.map(category => (
          <motion.button 
            key={category} 
            className={`px-4 py-1 rounded-full ${selectedCategory === category ? 'bg-purple-600' : 'bg-gradient-to-tr from-blue-900 to-black'} text-gray-300`}
            onClick={() => handleCategoryClick(category)}
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.95 }} // Scale down on tap
            transition={{ type: 'spring', stiffness: 300 }} // Add spring transition
          >
            {category}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shuffledCollections
          .filter(collection => !selectedCategory || collection.category === selectedCategory)
          .map(collection => (
            <CollectionCard 
              key={collection.id} 
              collection={collection} 
            /> 
          ))}
      </div>
    </div>
  );
}
