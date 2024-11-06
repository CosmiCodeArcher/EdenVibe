import { NextApiRequest, NextApiResponse } from 'next';
import { google, youtube_v3 } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playlistId } = req.query;

  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    const playlistResponse = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: playlistId,
      maxResults: 50,
    });

    const videoIds = playlistResponse.data.items?.map(
      (item: youtube_v3.Schema$PlaylistItem) => item.snippet?.resourceId?.videoId
    ).filter(Boolean) as string[];

    const videosResponse = await youtube.videos.list({
      part: ['contentDetails'],
      id: videoIds,
    });

    const totalDuration = videosResponse.data.items?.reduce((acc: number, video: youtube_v3.Schema$Video) => {
      const duration = video.contentDetails?.duration;
      return acc + (duration ? parseDuration(duration) : 0);
    }, 0) ?? 0;

    const formattedDuration = formatDuration(totalDuration);

    res.status(200).json({
      trackCount: videoIds.length,
      duration: formattedDuration,
      tracks: playlistResponse.data.items?.map((item: youtube_v3.Schema$PlaylistItem) => ({
        id: item.snippet?.resourceId?.videoId,
        title: item.snippet?.title,
        thumbnail: item.snippet?.thumbnails?.default?.url,
      })),
    });
  } catch (error) {
    console.error('Error fetching collection data:', error);
    res.status(500).json({ error: 'Error fetching collection data' });
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match?.[1] ?? '0') || 0);
  const minutes = (parseInt(match?.[2] ?? '0') || 0);
  const seconds = (parseInt(match?.[3] ?? '0') || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}