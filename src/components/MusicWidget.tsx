"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, ExternalLink, Music, Volume2 } from 'lucide-react';
import { UnifiedTrack } from '@/types/music';

interface MusicWidgetProps {
  spotifyArtistId?: string;
  soundcloudUserId?: string;
  maxTracks?: number;
  /**
   * Attempt to autoplay the first playable track once the list loads. Note that
   * many browsers will block autoplay with sound until the user interacts with
   * the page. In that case playback will silently fail and the user can press
   * Play manually.
   */
  autoPlay?: boolean;
}

export default function MusicWidget({ 
  spotifyArtistId, 
  soundcloudUserId, 
  maxTracks = 12,
  autoPlay = true,
}: MusicWidgetProps) {
  const [tracks, setTracks] = useState<UnifiedTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<UnifiedTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetchTracks();
  }, [spotifyArtistId, soundcloudUserId, maxTracks]);

  const fetchTracks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (spotifyArtistId) params.set('spotifyArtistId', spotifyArtistId);
      if (soundcloudUserId) params.set('soundcloudUserId', soundcloudUserId);
      params.set('maxTracks', maxTracks.toString());

      const response = await fetch(`/api/music/combined?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setTracks(data.tracks);
      if (data.tracks.length > 0) {
        if (autoPlay) {
          playTrack(data.tracks[0]);
        } else {
          setCurrentTrack(data.tracks[0]);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tracks');
    } finally {
      setLoading(false);
    }
  };

  const playTrack = (track: UnifiedTrack) => {
    if (!track.isPlayable || !track.previewUrl) return;

    if (audioRef.current) {
      audioRef.current.src = track.previewUrl;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrack(track);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack?.isPlayable) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack?.id);
    let nextIndex;

    if (direction === 'next') {
      nextIndex = currentIndex + 1 >= tracks.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? tracks.length - 1 : currentIndex - 1;
    }

    const nextTrack = tracks[nextIndex];
    if (nextTrack) {
      playTrack(nextTrack);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlatformColor = (platform: 'spotify' | 'soundcloud') => {
    return platform === 'spotify' ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600';
  };

  const getPlatformIcon = (platform: 'spotify' | 'soundcloud') => {
    return platform === 'spotify' ? '♫' : '☁';
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-12 h-12 bg-slate-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-700 rounded"></div>
                  <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
        <div className="text-center">
          <Music className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => {
          setIsPlaying(false);
          skipTrack('next');
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Music className="w-5 h-5" />
          Music Mix
        </h3>
        <div className="text-sm text-slate-400">
          {tracks.length} tracks
        </div>
      </div>

      {/* Current Track Player */}
      {currentTrack && (
        <motion.div
          key={currentTrack.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentTrack.imageUrl || '/api/placeholder/64/64'}
                alt={currentTrack.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${getPlatformColor(currentTrack.platform)} flex items-center justify-center text-xs text-white font-bold`}>
                {getPlatformIcon(currentTrack.platform)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white truncate">{currentTrack.title}</h4>
              <p className="text-slate-400 text-sm truncate">{currentTrack.artist}</p>
              {currentTrack.album && (
                <p className="text-slate-500 text-xs truncate">{currentTrack.album}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => skipTrack('prev')}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              
              <button
                onClick={togglePlayPause}
                disabled={!currentTrack.isPlayable}
                className={`p-3 rounded-full transition-all ${
                  currentTrack.isPlayable
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => skipTrack('next')}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <a
                href={currentTrack.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-primary-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Progress Bar */}
          {currentTrack.isPlayable && duration > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1">
                <div
                  className="bg-primary-500 h-1 rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Track List */}
      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        <AnimatePresence>
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer group ${
                currentTrack?.id === track.id
                  ? 'bg-primary-500/20 border border-primary-500/30'
                  : 'hover:bg-slate-700/50'
              }`}
              onClick={() => playTrack(track)}
            >
              <div className="relative">
                <img
                  src={track.imageUrl || '/api/placeholder/48/48'}
                  alt={track.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r ${getPlatformColor(track.platform)} flex items-center justify-center text-xs text-white font-bold`}>
                  {getPlatformIcon(track.platform)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-white truncate text-sm">{track.title}</h5>
                <p className="text-slate-400 text-xs truncate">{track.artist}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  {formatTime(track.duration)}
                </span>
                
                {track.isPlayable ? (
                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-primary-400 transition-colors" />
                ) : (
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-400 transition-colors" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}