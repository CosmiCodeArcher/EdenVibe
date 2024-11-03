'use client'

import { useState } from 'react';
import { musicCollections } from '@/data/collections';
import CollectionCard from '@/components/CollectionCard'
import { motion } from 'framer-motion';

export default function CategoriesPage() {
    const [selectedCategory,  setSelectedCategory] = useState<string | null>(null);
    const categories = [...new Set(musicCollections.map(collection => collection.category))];

    const filteredCollections = selectedCategory
      ?  musicCollections.filter(collection => collection.category === selectedCategory)
      : musicCollections;

  
    return (
     <div className='min-h-screen bg-gradient-to-b from-purple-900 to-black text-white'>
      <div className='container mx-auto px-4 py-24'>
        <h1 className='text-5xl font-bold text-center mb-12'>Categories</h1>

        {/* Category Pills */}
        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full ${
              !selectedCategory ? 'bg-purple-600' : 'bg-gray-700'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category ? 'bg-purple-600' : 'bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Collections Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          layout
        >
          {filteredCollections.map((collection) => (
            <motion.div
              key={collection.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CollectionCard collection={collection} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    );
  }