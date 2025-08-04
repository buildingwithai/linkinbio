"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MusicVisualizerProps {
  isPlaying?: boolean;
  barCount?: number;
  className?: string;
}

const MusicVisualizer = ({ 
  isPlaying = true, 
  barCount = 12,
  className = "" 
}: MusicVisualizerProps) => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    setBars(Array.from({ length: barCount }, () => Math.random()));
  }, [barCount]);

  return (
    <div className={`flex items-end justify-center gap-1 h-6 ${className}`}>
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-t from-primary-500 to-accent-400 rounded-full"
          style={{
            width: '3px',
            minHeight: '4px',
          }}
          animate={{
            height: isPlaying 
              ? [
                  `${8 + Math.random() * 12}px`,
                  `${4 + Math.random() * 20}px`,
                  `${6 + Math.random() * 16}px`,
                  `${8 + Math.random() * 12}px`,
                ]
              : '4px',
            opacity: isPlaying ? [0.4, 1, 0.6, 0.8] : 0.3,
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.05,
          }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;
