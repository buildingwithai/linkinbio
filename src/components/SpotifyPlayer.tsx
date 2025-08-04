import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MusicVisualizer from './MusicVisualizer';

interface SpotifyPlayerProps {
  artistId?: string;
}

const SpotifyPlayer = ({ artistId = '6J1Q7Dbs0he5E6RA3SktiH' }: SpotifyPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <motion.div 
      className="relative glassmorphic rounded-xl p-4 w-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Music Visualizer Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <MusicVisualizer barCount={8} className="w-16" />
          <span className="text-sm font-medium text-slate-300">Now Playing</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      {/* Spotify Embed */}
      <div className="w-full relative">
        <iframe 
          ref={iframeRef}
          style={{ borderRadius: '12px' }} 
          src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0&autoplay=1&hide_cover=0`} 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share" 
          loading="eager"
          className="w-full"
        />
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer; 