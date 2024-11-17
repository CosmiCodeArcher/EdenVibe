'use client';
import { MusicCollection } from '@/types/index';
import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image';
import CustomModal from './CustomModal';
import { useModal } from '@/context/ModalContext';
import { PlayIcon, PauseIcon } from './icons'
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface CollectionCardProps {
  collection: MusicCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { loadCollection, playlist, currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack  } = usePlayer();
  const { openModalId, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await loadCollection(collection);
      openModal(collection.id);
    } catch (error) {
      console.error('Error loading collection:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div 
      className="relative cursor-pointer overflow-hidden 
                 rounded-lg shadow-lg transition-transform 
                 duration-300 transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative h-80 w-full">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          className="object-cover"
        />
        <div className='absolute inset-0 bg-gradient-to-t 
                      from-black to-transparent opacity-70 
                      group-hover:opacity-90 transition-opacity duration-300'
        ></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold mb-2 text-white">{collection.title}</h3>
        <p className="text-sm mb-4 text-gray-300">{collection.description}</p>
      </div>

      <CustomModal 
        isOpen={openModalId === collection.id} 
        onClose={closeModal} 
        title={collection.title}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner />
        </div>
        ) : (
        <div>
        <ul className="space-y-2">
            {playlist.map((track) => (
              <li 
                key={track.id} 
                className={`flex items-center p-2 hover:bg-blue-800 rounded cursor-pointer transition duration-200 ${
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
        )}
      </CustomModal>
    </div>
  );
}