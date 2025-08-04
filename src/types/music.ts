export interface UnifiedTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  imageUrl?: string;
  previewUrl?: string;
  externalUrl: string;
  platform: 'spotify' | 'soundcloud';
  isPlayable: boolean;
}

export interface UnifiedPlaylist {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  tracks: UnifiedTrack[];
  platform: 'spotify' | 'soundcloud';
  externalUrl: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

export interface SoundCloudTrack {
  id: number;
  title: string;
  user: {
    username: string;
  };
  duration: number;
  artwork_url: string | null;
  stream_url?: string;
  permalink_url: string;
  streamable: boolean;
}

export interface MusicWidgetProps {
  spotifyPlaylistId?: string;
  soundcloudUserId?: string;
  maxTracks?: number;
}