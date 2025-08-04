import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { UnifiedTrack, SoundCloudTrack } from '@/types/music';

const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;

function convertSoundCloudTrack(track: SoundCloudTrack): UnifiedTrack {
  return {
    id: `soundcloud_${track.id}`,
    title: track.title,
    artist: track.user.username,
    duration: Math.floor(track.duration / 1000),
    imageUrl: track.artwork_url?.replace('large', 't500x500') || undefined,
    previewUrl: track.stream_url ? `${track.stream_url}?client_id=${SOUNDCLOUD_CLIENT_ID}` : undefined,
    externalUrl: track.permalink_url,
    platform: 'soundcloud',
    isPlayable: track.streamable && !!track.stream_url,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const playlistId = searchParams.get('playlistId');

    if (!userId && !playlistId) {
      return NextResponse.json({ error: 'Either userId or playlistId is required' }, { status: 400 });
    }

    let endpoint = '';
    if (userId) {
      endpoint = `https://api.soundcloud.com/users/${userId}/tracks?client_id=${SOUNDCLOUD_CLIENT_ID}&limit=50`;
    } else if (playlistId) {
      endpoint = `https://api.soundcloud.com/playlists/${playlistId}?client_id=${SOUNDCLOUD_CLIENT_ID}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch SoundCloud data');
    }

    const data = await response.json();
    let tracks: SoundCloudTrack[] = [];

    if (userId) {
      tracks = data;
    } else if (playlistId) {
      tracks = data.tracks;
    }

    const unifiedTracks = tracks.map(convertSoundCloudTrack);

    return NextResponse.json({ tracks: unifiedTracks });
  } catch (error) {
    console.error('SoundCloud API error:', error);
    return NextResponse.json({ error: 'Failed to fetch SoundCloud tracks' }, { status: 500 });
  }
}