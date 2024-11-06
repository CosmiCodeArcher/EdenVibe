// src/utils/test-setup.ts
import { getPlaylistDetails, getVideoDetails } from './youtube';
import { formatDuration } from './format';

async function testSetup() {
  try {
    // Test playlist details
    const playlistId = 'PLevZf2LIlmDeMphiWxCnjotPTXrEElmrl'; // Example playlist ID
    const playlistData = await getPlaylistDetails(playlistId);
    console.log('Playlist data:', playlistData);

    // Test video details
    if (playlistData.items.length > 0) {
      const videoId = playlistData.items[0].snippet.resourceId.videoId;
      const videoData = await getVideoDetails(videoId);
      console.log('Video data:', videoData);

      // Test duration formatting
      if (videoData.items.length > 0) {
        const duration = videoData.items[0].contentDetails.duration;
        console.log('Formatted duration:', formatDuration(duration));
      }
    }

    console.log('Setup test completed successfully');
  } catch (error) {
    console.error('Setup test failed:', error);
  }
}

export { testSetup };