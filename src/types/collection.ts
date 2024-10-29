export interface Collection {
    id: string;
    title: string;
    description: string;
    category: string;
    coverImage: string;
    playlistId: string;
    trackCount: number;
    duration: string;
    featured?: boolean;
  }