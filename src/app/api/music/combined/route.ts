import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { UnifiedTrack } from '@/types/music';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const spotifyArtistId = searchParams.get('spotifyArtistId');
    const soundcloudUserId = searchParams.get('soundcloudUserId');
    const maxTracks = parseInt(searchParams.get('maxTracks') || '20');

    const promises = [];

    // Fetch Spotify tracks
    if (spotifyArtistId) {
      const spotifyUrl = new URL('/api/music/spotify', request.url);
      spotifyUrl.searchParams.set('artistId', spotifyArtistId);
      promises.push(fetch(spotifyUrl.toString()));
    }

    // Fetch SoundCloud tracks
    if (soundcloudUserId) {
      const soundcloudUrl = new URL('/api/music/soundcloud', request.url);
      soundcloudUrl.searchParams.set('userId', soundcloudUserId);
      promises.push(fetch(soundcloudUrl.toString()));
    }

    const responses = await Promise.all(promises);
    const dataPromises = responses.map(response => response.json());
    const results = await Promise.all(dataPromises);

    let allTracks: UnifiedTrack[] = [];

    // Combine tracks from both platforms
    results.forEach(result => {
      if (result.tracks) {
        allTracks = [...allTracks, ...result.tracks];
      }
    });

    // Shuffle and limit tracks
    const shuffledTracks = allTracks
      .sort(() => Math.random() - 0.5)
      .slice(0, maxTracks);

    return NextResponse.json({ 
      tracks: shuffledTracks,
      totalTracks: allTracks.length,
      platforms: {
        spotify: allTracks.filter(t => t.platform === 'spotify').length,
        soundcloud: allTracks.filter(t => t.platform === 'soundcloud').length,
      }
    });
  } catch (error) {
    console.error('Combined music API error:', error);
    return NextResponse.json({ error: 'Failed to fetch combined tracks' }, { status: 500 });
  }
}