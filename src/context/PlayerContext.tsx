'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { YouTubeTrack, MusicCollection } from '@/types';

interface PlayerContextType {
  currentTrack: YouTubeTrack | null;
  currentCollection: MusicCollection | null;
  playlist: YouTubeTrack[];
  isPlaying: boolean;
  volume: number;
  loadCollection: (collection: MusicCollection) => Promise<YouTubeTrack[]>;
  playTrack: (track: YouTubeTrack) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  loading: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<YouTubeTrack | null>(null);
  const [currentCollection, setCurrentCollection] = useState<MusicCollection | null>(null);
  const [playlist, setPlaylist] = useState<YouTubeTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [loading, setLoading] = useState (false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loadCollection = useCallback(async (collection: MusicCollection): Promise<YouTubeTrack[]> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/playlist?playlistId=${collection.youtubePlaylistId}`);
      if (!response.ok) throw new Error('Failed to fetch playlist');
      
      const tracks: YouTubeTrack[] = await response.json();
      setPlaylist(tracks);
      setCurrentCollection(collection);
      
      if (tracks.length > 0 && !isPlaying) {
        setCurrentTrack(tracks[0]);
        setIsPlaying(false);
      }

      return tracks;
    } catch (error) {
      console.error('Error loading collection:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMounted) return;
    
    const defaultCollection = {
      id: 'ambient-work',
      youtubePlaylistId: 'PLevZf2LIlmDeMphiWxCnjotPTXrEElmrl',
      title: 'Ambient Work',
      description: 'Subtle background sounds for a productive work environment',
      category: 'Ambient and Background',
      coverImage: '/images/high-intensity.jpg',
      trackCount: 1,
      duration: '2m 14s'
    };
    loadCollection(defaultCollection);
  }, [isMounted, loadCollection]);

  const playTrack = useCallback((track: YouTubeTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeTrack = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    console.log('nextTrack called');
    console.log('Current Track:', currentTrack);
    console.log('Playlist:', playlist);

    if (!currentTrack || playlist.length === 0) { 
      console.log('Cannot change track - no current track or empty playlist');
      return
    };
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    console.log('Next Index:', nextIndex);
    console.log('Next Track:', playlist[nextIndex]);

    setCurrentTrack(playlist[nextIndex]);
    setIsPlaying(true);
  }, [currentTrack, playlist]);

  const previousTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[previousIndex]);
    setIsPlaying(true);
  }, [currentTrack, playlist]);

  if (!isMounted) {
    return null;
  }

  const value = {
    currentTrack,
    currentCollection,
    playlist,
    isPlaying,
    volume,
    loadCollection,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
    loading
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}