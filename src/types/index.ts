// src/types/index.ts
export interface YouTubeTrack {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export interface MusicCollection {
  id: string;
  title: string;
  description: string;
  youtubePlaylistId: string;
  category: string;
  coverImage: string;
  trackCount: number;
  duration: string;
  featured?: boolean;
}