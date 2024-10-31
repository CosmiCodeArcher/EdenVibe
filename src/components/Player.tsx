'use client'

import { useState } from 'react';
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
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                     z-20 w-10 h-10 bg-white dark:bg-gray-800
                     rounded-full shadow-lg flex items-center justify-center
                     border border-gray-200 dark:border-gray-700
                     hover:bg-gray-50 dark:hover:bg-gray-700
                     transition-all duration-300'
        >
          <svg 
            className={`w-5 h-5 transition-transform duration-300 
              ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        
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