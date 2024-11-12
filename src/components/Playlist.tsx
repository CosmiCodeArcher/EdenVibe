'use client';

import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from './icons';

export default function Playlist() {
  const { playlist, currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = usePlayer();

  const handleTrackClick = (track: typeof playlist[number]) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pauseTrack();
      } else {
        resumeTrack();
      }
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-teal-700 to-black text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Current Playlist</h2>
      <ul className="space-y-2">
        {playlist.map((track) => (
          <li 
            key={track.id} 
            className={`flex items-center p-2 hover:bg-blue-800 rounded cursor-pointer transition duration-200${
              currentTrack?.id === track.id ? 'bg-gray-800' : ''
            }`}
            onClick={() => handleTrackClick(track)}
          >
            <div className="relative w-10 h-10 mr-3">
              <Image
                src={track.thumbnail}
                alt={track.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-grow">
              <p className="font-medium">{track.title}</p>
              <p className="text-sm text-gray-400">{track.duration}</p>
            </div>
            {currentTrack?.id === track.id && (
              <button className="p-2">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}