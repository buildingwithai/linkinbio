import { NextRequest, NextResponse } from 'next/server';

// Prevent Next.js from trying to statically prerender this route
export const dynamic = 'force-dynamic';
import { UnifiedTrack, SpotifyTrack } from '@/types/music';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyAccessToken(): Promise<string> {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

function convertSpotifyTrack(track: SpotifyTrack): UnifiedTrack {
  return {
    id: `spotify_${track.id}`,
    title: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    album: track.album.name,
    duration: Math.floor(track.duration_ms / 1000),
    imageUrl: track.album.images[0]?.url,
    previewUrl: track.preview_url ?? undefined,
    externalUrl: track.external_urls.spotify,
    platform: 'spotify',
    isPlayable: !!track.preview_url,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get('playlistId');
    const artistId = searchParams.get('artistId');

    if (!playlistId && !artistId) {
      return NextResponse.json({ error: 'Either playlistId or artistId is required' }, { status: 400 });
    }

    const accessToken = await getSpotifyAccessToken();

    let endpoint = '';
    if (playlistId) {
      endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`;
    } else if (artistId) {
      endpoint = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
    }

    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Spotify data');
    }

    const data = await response.json();
    let tracks: SpotifyTrack[] = [];

    if (playlistId) {
      tracks = data.items.map((item: any) => item.track);
    } else if (artistId) {
      tracks = data.tracks;
    }

    const unifiedTracks = tracks.map(convertSpotifyTrack);

    return NextResponse.json({ tracks: unifiedTracks });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json({ error: 'Failed to fetch Spotify tracks' }, { status: 500 });
  }
}