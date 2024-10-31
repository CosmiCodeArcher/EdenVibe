'use client';

import Image from 'next/image';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

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

export default function ExpandedPlayer({ track }: ExpandedPlayerProps) {
  const { isPlaying, currentTime, duration, togglePlay, seek, setVolume } = useAudioPlayer(track.audioSrc);


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-8">

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Cover Art */}
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src={track.coverImage}
            alt={track.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Track Info */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{track.title}</h2>
          <p className="text-gray-500 dark:text-gray-400">{track.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div 
            className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const clickedValue = (x / rect.width) * duration;
              seek(clickedValue);
            }}
          >
            <div 
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-8">
          {/* Shuffle Button */}
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Previous Button */}
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 20L9 12l10-8v16z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 19V5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white"
          >
            {isPlaying ? (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10 4H6v16h4V4zM18 4h-4v16h4V4z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 3l14 9-14 9V3z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Next Button */}
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 4l10 8-10 8V4z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 5v14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Repeat Button */}
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 1l4 4-4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 11V9a4 4 0 014-4h14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 23l-4-4 4-4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 13v2a4 4 0 01-4 4H3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Additional Features (Queue, Lyrics, etc.) */}
          {/* Additional Features (Queue, Lyrics, etc.) */}
        <div className="flex justify-center space-x-6">
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">Queue</span>
          </button>

          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v13M12 8L8 4M12 8l4-4M4 12h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">Lyrics</span>
          </button>

          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">Like</span>
          </button>

          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs">Share</span>
          </button>
        </div>

        {/* Up Next Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Up Next</h3>
          <div className="space-y-2">
            {/* You can map through upcoming tracks here */}
            <div className="flex items-center space-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Next track"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">Next Track Title</h4>
                <p className="text-xs text-gray-500">Artist Name</p>
              </div>
              <span className="text-sm text-gray-500">3:45</span>
            </div>
            {/* More upcoming tracks... */}
          </div>
        </div>
      </div>
    </div>
  );
}

