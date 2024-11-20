'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YouTubePlayerVars {
  autoplay?: number;
  controls?: number;
  disablekb?: number;
  fs?: number;
  iv_load_policy?: number;
  modestbranding?: number;
  rel?: number;
  [key: string]: string | number | undefined;
}

interface YouTube {
  Player: new (container: HTMLElement, options: {
    height: string;
    width: string;
    videoId: string;
    playerVars?: YouTubePlayerVars;
    events?: {
      onReady?: (event: { target: YouTubePlayer }) => void;
      onStateChange?: (event: { data: number }) => void;
      onError?: (error: { data: number }) => void;
    };
  }) => YouTubePlayer;
}

interface YouTubePlayerProps {
  videoId: string;
  onReady: () => void;
  onStateChange: (state: number) => void;
  volume: number;
  isPlaying: boolean;
}

declare global {
  interface Window {
    YT: YouTube;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubePlayer({ videoId, onReady, onStateChange, volume, isPlaying }: YouTubePlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { pauseTrack, resumeTrack } = usePlayer();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState();

      if (isPlaying) {
        if (playerState !== 1) {
          try {
            playerRef.current.playVideo();
          } catch (error) {
            console.error('Error playing video:', error);
          }
        }
      } else {
        if (playerState === 1) {
          try {
            playerRef.current.pauseVideo();
          } catch (error) {
            console.error('Error pausing video:', error);
          }
        }
      }
    }
  }, [isPlaying]);

  

  useEffect(() => {
    if (!isMounted) return;

    const initializePlayer = () => {
      if (!containerRef.current) return;
  
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: () => {
            playerRef.current?.setVolume(volume);
            onReady();
            
            if (isPlaying) {
              try {
                playerRef.current?.playVideo();
              } catch (error) {
                console.error('Error playing on ready:', error);
              }
            }
          },
          onStateChange: (event) => { 
            onStateChange(event.data);
          
            switch (event.data) {
              case 0: // Ended
                onStateChange(2); // Pause
                break;
              case 1: // Playing
                resumeTrack();
                break;
              case 2: // Paused
                pauseTrack();
                break;
            }
          },
          onError: (error) => {
            console.error('YouTube Player Error:', error);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ videoId,isMounted]);

  useEffect(() => {
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  return <div ref={containerRef} />;
}