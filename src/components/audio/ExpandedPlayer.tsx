'use client';

import Image from 'next/image';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo } from 'react-icons/fa';

interface Track {
  title: string;
  artist: string;
  audioSrc: string;
  coverImage: string;
}

interface ExpandedPlayerProps {
  track: Track;
  onCollapse: () => void;
}

export default function ExpandedPlayer({ track, onCollapse }: ExpandedPlayerProps) {
  const { isPlaying, currentTime, duration, togglePlay, seek, setVolume } = useAudioPlayer(track.audioSrc);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-8 bg-gradient-to-b from-purple-900 to-black text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Cover Art */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src={track.coverImage}
            alt={track.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Track Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h2 className="text-3xl font-bold">{track.title}</h2>
          <p className='text-xl text-gray-300'>{track.artist}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div 
            className="h-1 bg-gray-700 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const clickedValue = (x / rect.width) * duration;
              seek(clickedValue);
            }}
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(currentTime / duration) * 100}%` }}
              className="h-full bg-purple-600 rounded-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaRandom className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaStepBackward className="w-6 h-6" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? <FaPause className="w-6 h-6" /> : <FaPlay className="w-6 h-6" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaStepForward className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaRedo className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" strokeWidth="2"/>
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeWidth="2"/>
            </svg>
          </motion.button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCollapse}
          className="mt-8 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors"
        >
          Collapse Player
        </motion.button>
      </div>
    </div>
  );
}