export interface MusicCollection {
    id: string;
    title: string;
    description: string;
    playlistId: string;
    category: string;
    coverImage: string;
    trackCount: number;
    duration: string;
    featured?: boolean;
  }