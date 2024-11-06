// src/app/api/playlist/route.ts
import { google } from 'googleapis';
import { YouTubeTrack } from '@/types';
import { NextResponse } from 'next/server';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get('playlistId');

    if (!playlistId) {
      return NextResponse.json({ error: 'Playlist ID is required' }, { status: 400 });
    }

    const response = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: playlistId,
      maxResults: 50
    });

    const tracks: YouTubeTrack[] = response.data.items?.map(item => ({
      id: item.contentDetails?.videoId || '',
      title: item.snippet?.title || '',
      thumbnail: item.snippet?.thumbnails?.default?.url || '',
      duration: '', // We'll need another API call to get duration
    })) || [];

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist' }, { status: 500 });
  }
}