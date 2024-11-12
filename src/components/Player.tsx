'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';
import dynamic from 'next/dynamic';

// Dynamically import YouTubePlayer with no SSR
const YouTubePlayer = dynamic(() => import('./YouTubePlayer'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function Player() {
  const [isMounted, setIsMounted] = useState(false);
  const { 
    currentTrack, 
    isPlaying, 
    volume,
    pauseTrack, 
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume
  } = usePlayer();
  const [playerReady, setPlayerReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (playerReady && currentTrack) {
      setLoading(false);
    }
  }, [playerReady, currentTrack]);

  if (!isMounted || !currentTrack) return null;

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-tr from-teal-700 to-black text-white p-4">
      <Suspense fallback={<LoadingSpinner />}>
        <YouTubePlayer
          videoId={currentTrack.id}
          onReady={() => {
            setPlayerReady(true);
            setLoading(false);
          }}
          onStateChange={(state) => {
            console.log('Player state changed:', state);
            console.log('Current isPlaying:', isPlaying);
            console.log('Current Track:', currentTrack.id);

            switch (state) {
              case 1: // Playing
                if (!isPlaying) {
                  resumeTrack();
                }
                break;
              case 2: // Paused
                if (isPlaying) {
                  pauseTrack();
                }
                break;
              case 0: // Ended
                nextTrack();
                break;
            }
          }}
          volume={volume}
          isPlaying={isPlaying}
        />
      </Suspense>

      <div className="container mx-auto flex items-center justify-between">
        {/* Track Info */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Image
                src={currentTrack.thumbnail}
                alt={currentTrack.title}
                fill
                sizes="(max-width: 48px) 100vw"
                className="rounded object-cover"
                priority
              />
            )}
          </div>
          <div>
            <h3 className="font-medium">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400">{currentTrack.duration}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:text-purple-500"
            onClick={previousTrack}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="p-3 bg-purple-600 rounded-full hover:bg-purple-700"
            onClick={() => {
              if (isPlaying) {
                pauseTrack();
              } else {
                resumeTrack();
              }
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button 
            className="p-2 hover:text-purple-500"
            onClick={nextTrack}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Volume Control */}
        <div className="w-32">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            className="w-full"
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}