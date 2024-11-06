// src/config/youtube.ts
if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
    throw new Error('Missing YouTube API key');
  }
  
  export const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;