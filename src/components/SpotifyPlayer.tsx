import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpotifyPlayerProps {
  artistId?: string;
}

const SpotifyPlayer = ({ artistId = '6J1Q7Dbs0he5E6RA3SktiH' }: SpotifyPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <motion.div 
      className="glassmorphic rounded-xl p-4 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-full">
        <iframe 
          ref={iframeRef}
          style={{ borderRadius: '12px' }} 
          src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`} 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="w-full"
        />
      </div>
    </motion.div>
  );
};

export default SpotifyPlayer; 