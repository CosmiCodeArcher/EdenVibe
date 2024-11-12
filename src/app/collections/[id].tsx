import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { YouTubeTrack } from '@/types'; // Ensure this is the correct import for YouTubeTrack
import { getPlaylistDetails } from '@/utils/youtube'; // Adjust this import based on your file structure

export default function CollectionPage() {
  const router = useRouter();
  const { id } = router.query; // Get the collection ID from the URL
  const [tracks, setTracks] = useState<YouTubeTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchTracks = async () => {
        try {
          // Handle the case where id might be an array
          const playlistId = Array.isArray(id) ? id[0] : id; 
          const playlistDetails = await getPlaylistDetails(playlistId);
          
          // Transform the playlist details into the format of YouTubeTrack
          const transformedTracks: YouTubeTrack[] = playlistDetails.items.map(item => ({
            id: item.snippet.resourceId.videoId, // Assuming this is how you get the video ID
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url, // Adjust if needed
            duration: '', // You'll need to fetch the duration separately if required
          }));
          setTracks(transformedTracks); // Set the transformed tracks
        } catch (error) {
          console.error('Error fetching tracks:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTracks();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{id} Collection</h1>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
}