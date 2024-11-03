'use client';

import { useParams } from 'next/navigation';
import { musicCollections } from '@/data/collections';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Player from '@/components/Player';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart, FaShare } from 'react-icons/fa';
import CollectionCard from '@/components/CollectionCard';

export default function CollectionPage() {
  const { id } = useParams();
  const collection = musicCollections.find(c => c.id === id);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <Navigation />
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8"
          >
            {/* Cover Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-full md:w-[400px] h-[400px]"
            >
              <Image
                src={collection.coverImage}
                alt={collection.title}
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Collection Info */}
            <div className="flex-grow">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-purple-400 font-medium"
              >
                {collection.category}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mt-2"
              >
                {collection.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-300 mt-4 text-lg"
              >
                {collection.description}
              </motion.p>
              
              <div className="flex items-center gap-4 mt-6">
                <span>{collection.trackCount} tracks</span>
                <span>•</span>
                <span>{collection.duration}</span>
              </div>
              
              <div className='flex gap-4 mt-8'>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className= 'px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center gap-2'
                >
                  <FaPlay /> Play All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full"
                >
                  <FaHeart />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full"
                >
                  <FaShare />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Tracks list */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-4">Tracks</h2>
            <div className='space-y-2'>
              {/* Placeholder tracks - replace with actual track data */}
              {[1, 2, 3, 4, 5].map((track) => (
                <motion.div
                key={track}
                whileHover={{ scale: 1.02 }}
                className='group p-4 bg-gray-800/50 rounded-lg 
                           flex items-center justify-between cursor-pointer 
                         hover:bg-gray-700/50 transition-all duration-300'
              >
                <div className='flex items-center gap-4'>
                  {/* Play button overlay */}
                  <div className="relative">
                  <span className="text-gray-400 group-hover:opacity-0 transition-opacity">
                    {track}
                  </span>
                  <FaPlay className='absolute top-1/2 left-1/2 transform -translate-x-1/2 
                                     -translate-y-1/2 opacity-0 group-hover:opacity-100 
                                     transition-opacity text-purple-500'/>
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='relative w-12 h-12'>
                      <Image 
                        src={collection.coverImage}
                        alt={`Track ${track}`}
                        fill
                        className='object-cover rounded'
                      />
                    </div>
                    <div>
                      <h3 className='text-sm text-gray-400'>Artist Name</h3>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <span className='text-gray-400'>3:45</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <FaHeart className='text-gray-400 hover:text-purple-500 transition-colors'/>
                  </motion.button>
                </div>
              </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Similar Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mt-16'
          >
            <h2 className="text-2xl font-bold mb-6">Similar Collections</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {musicCollections
                .filter(c => c.category === collection.category && c.id !== collection.id)
                .slice(0, 3)
                .map((similarCollection) => (
                  <CollectionCard
                    key={similarCollection.id}
                    collection={similarCollection}
                  />
                ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Player />
    </div>
  );
}