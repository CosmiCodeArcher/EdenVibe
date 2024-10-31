// CompactPlayer.tsx
'use client';

import { PlayIcon, PauseIcon } from '@/components/icons';
import Image from 'next/image';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

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

export default function CompactPlayer({ track }: CompactPlayerProps) {
  const { isPlaying, currentTime, duration, togglePlay, setVolume } = useAudioPlayer(track.audioSrc);
  {/*seek,*/}
  // const formatTime = (time: number) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // };

  return (
    <div className="relative px-4 h-20 flex items-center bg-white dark:bg-gray-800">
        {/* Progress bar*/}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className='h-full bg-purple-600'
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="w-full grid grid-cols-3 items-center">
        {/* Left section - Track Info */}
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <Image
              src={track.coverImage}
              alt={track.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{track.title}</span>
            <span className="text-xs text-gray-500">{track.artist}</span>
          </div>
        </div>

        {/* Center section - Controls */}
        <div className="flex items-center justify-center space-x-6">
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 17L6 12L11 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 
                     flex items-center justify-center text-white"
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 17L18 12L13 7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Right section - Volume */}
        <div className="flex items-center justify-end space-x-4">
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}