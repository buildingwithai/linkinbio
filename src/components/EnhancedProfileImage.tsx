"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

interface EnhancedProfileImageProps {
  src: string;
  alt: string;
  size?: number;
}

const EnhancedProfileImage = ({ 
  src, 
  alt, 
  size = 96 
}: EnhancedProfileImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)',
          padding: '3px',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full rounded-full bg-transparent" />
      </motion.div>



      {/* Main image container */}
      <motion.div
        className="relative z-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 p-1"
        style={{ width: size, height: size }}
        animate={{
          boxShadow: isHovered 
            ? ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.5)']
            : ['0 0 10px rgba(59, 130, 246, 0.2)', '0 0 20px rgba(139, 92, 246, 0.2)', '0 0 10px rgba(59, 130, 246, 0.2)'],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity },
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover object-top"
          style={{
            filter: 'brightness(1.1) contrast(1.05)',
          }}
          whileHover={{
            filter: 'brightness(1.2) contrast(1.1)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Floating sparkles */}
      {isHovered && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default EnhancedProfileImage;
