'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

import CompactPlayer from '@/components/audio/CompactPlayer';
import ExpandedPlayer from '@/components/audio/ExpandedPlayer';

export default function Player() {
  const [isExpanded, setIsExpanded] = useState(false);
  // Replace with actual track data when available
  const currentTrack = {
    title: "Sample Track",
    artist: "Sample Artist",
    audioSrc: "https://example.com/audio/track.mp3",
    coverImage: "https://example.com/images/cover.jpg"
  };

    
  return (

    <div className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg'>
      <div className='absolute left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700'
           style={{ top: isExpanded ? '20px' : '-1px' }} />

      <div className={`relative transition-all duration-300
        ${isExpanded ? 'h-[calc(100vh-64px)]' : 'h-20'}`}
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className='absolute left-1/2 -translate-x-1/2
                     z-20 w-12 h-12 bg-gradient-to-r from-purple-500 to-gray-400
                     rounded-full shadow-lg flex items-center justify-center
                     hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400
                     transition-all duration-300'
          style={{
            top: isExpanded ? '10px' : '20%',
            transform: `translate(-20%, ${isExpanded ? '0' : '-20%'})`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isExpanded ? 180 : 0, 
          }}
        >
          <motion.svg 
            xmlns='http://www.w3.org/2000/svg'
            viewBox="0 0 24 24" 
            fill="white"
            className="w-6 h-6"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ 
              opacity: { duration: 0.2 },
              rotate: { duration: 0.3, ease: "easeInOut" }
            }}
          >
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
          </motion.svg>
        </motion.button>
        
        <div className="h-full">
        {isExpanded ? (
            <ExpandedPlayer 
              track={currentTrack} 
              onCollapse={() => setIsExpanded(false)}
            />
        ) : (
          <CompactPlayer 
            track={currentTrack} 
            onExpand={() => setIsExpanded(true)}
          />
        )}
        </div>
      </div>
    </div>
  );
}