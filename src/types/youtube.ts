// src/types/youtube.ts
export interface YouTubePlaylistItem {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
      resourceId: {
        videoId: string;
      };
    };
  }
  
  export interface YouTubeVideoDetails {
    id: string;
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
      };
    };
    contentDetails: {
      duration: string; // ISO 8601 duration
    };
  }
  
  export interface YouTubePlaylistResponse {
    items: YouTubePlaylistItem[];
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    nextPageToken?: string;
  }
  
  export interface YouTubeVideoResponse {
    items: YouTubeVideoDetails[];
  }