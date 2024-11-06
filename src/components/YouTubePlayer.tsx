'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  onReady: () => void;
  onStateChange: (state: number) => void;
  volume: number;
  isPlaying: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubePlayer({ videoId, onReady, onStateChange, volume, isPlaying }: YouTubePlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const initializePlayer = () => {
    if (!isMounted || !containerRef.current) return;

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
        },
        onStateChange: (event: any) => onStateChange(event.data)
      }
    });
  };

  useEffect(() => {
    if (!isMounted) return;

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
  }, [videoId, isMounted]);

  useEffect(() => {
    if (playerRef.current?.getPlayerState && isMounted) {
      const playerState = playerRef.current.getPlayerState();
      if (isPlaying && playerState !== 1) {
        playerRef.current.playVideo();
      } else if (!isPlaying && playerState === 1) {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, isMounted]);

  useEffect(() => {
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  return <div ref={containerRef} />;
}