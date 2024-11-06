import { YOUTUBE_API_KEY } from '@/config/youtube';
import { 
  YouTubePlaylistResponse, 
  YouTubeVideoResponse 
} from '@/types/youtube';

export async function getPlaylistDetails(playlistId: string): Promise<YouTubePlaylistResponse> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    
    const data: YouTubePlaylistResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
}

export async function getVideoDetails(videoId: string): Promise<YouTubeVideoResponse> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    
    const data: YouTubeVideoResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
}