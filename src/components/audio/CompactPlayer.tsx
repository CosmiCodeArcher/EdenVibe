// CompactPlayer.tsx
'use client';

import Image from 'next/image';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { motion } from 'framer-motion';

interface Track {
  title: string;
  artist: string;
  audioSrc: string;
  coverImage: string;
}

interface CompactPlayerProps {
  track: Track;
  onExpand: () => void;
}

export default function CompactPlayer({ track, onExpand }: CompactPlayerProps) {
  const { isPlaying, currentTime, duration } = useAudioPlayer(track.audioSrc);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="relative px-4 h-20 flex items-center 
                 bg-gradient-to-r from-purple-900/90 
                 to-black/90 backdrop-blur-lg"
    >
        {/* Progress bar*/}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentTime / duration) * 100}%` }}
          className='h-full bg-purple-600'
        />
      </div>

      <div className="w-full flex items-center justify-between">
        {/* Left section - Track Info */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className='flex items-center space-x-4 cursor-pointer'
          onClick={onExpand}
        >
          <div className="relative w-12 h-12 group">
            <Image
              src={track.coverImage}
              alt={track.title}
              fill
              className='object-cover rounded-lg'
            />
            <div className='absolute inset-0 bg-black/40 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity rounded-lg'>
            </div>
          </div>
          <div className="flex flex-col">
            <span className='font-medium text-sm text-white'>{track.title}</span>
            <span className="text-xs text-gray-400">{track.artist}</span>
          </div>
        </motion.div>

        {/* Right section - Playing status */}
        <div className='text-white text-sm'>
          {isPlaying  ? 'Now Playing' : 'Paused'}

        </div>
      </div>
    </motion.div>
  );
}