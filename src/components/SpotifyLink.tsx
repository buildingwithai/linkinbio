"use client";

import { useEffect, useState, useRef } from 'react';
import { Music, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpotifyLinkProps {
  spotifyUrl: string;
  title?: string;
  description?: string;
  gradient?: string;
  className?: string;
}

export default function SpotifyLink({ 
  spotifyUrl, 
  title = 'Spotify', 
  description = 'Stream on Spotify', 
  gradient = 'from-green-500 to-emerald-600',
  className = ''
}: SpotifyLinkProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're on a mobile device
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsMobile(mobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isMobile) return; // Let default behavior handle desktop
    
    e.preventDefault();
    // Try to open in Spotify app first
    window.location.href = `spotify:artist:6J1Q7Dbs0he5E6RA3SktiH`;
    
    // Fallback to web if app isn't installed
    setTimeout(() => {
      window.location.href = spotifyUrl;
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1], 
        delay: 0.1 
      }}
      className={className}
    >
      <a
        href={spotifyUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <motion.div
          ref={cardRef}
          className="relative p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.02,
            rotateX: 5,
            rotateY: 5,
          }}
          animate={{
            rotateX: isHovered ? (mousePosition.y - 150) * 0.01 : 0,
            rotateY: isHovered ? (mousePosition.x - 200) * 0.01 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
              transform: 'translateX(-100%)',
            }}
            animate={{
              transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
          />
          
          {/* Gradient background */}
          <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${gradient} opacity-20`} />
          
          {/* Content */}
          <div className="relative z-10 flex items-center">
            <div className="flex-shrink-0 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-white/80">{description}</p>
            </div>
            <div className="ml-auto">
              <ExternalLink className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </div>
          </div>
          
          {/* Hover overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </a>
    </motion.div>
  );
}
