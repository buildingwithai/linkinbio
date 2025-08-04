"use client";

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState, useRef, type ReactNode } from 'react';
import { LinkItem } from './TabSystem';

interface EnhancedLinkCardProps {
  link: LinkItem;
  index: number;
}

const EnhancedLinkCard = ({ link, index }: EnhancedLinkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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

  // If there's a custom component, render it with the link props
  if (link.customComponent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1], 
          delay: index * 0.1 
        }}
        className={link.featured ? "md:col-span-2" : ""}
      >
        {link.customComponent}
      </motion.div>
    );
  }

  // Otherwise, render the default link card
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1], 
        delay: index * 0.1 
      }}
      className={link.featured ? "md:col-span-2" : ""}
    >
      <a
        href={link.url}
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
              duration: 0.6,
              ease: "easeInOut",
            }}
          />

          {/* Gradient overlay with mouse tracking */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-20`}
            style={{
              background: isHovered 
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
                : undefined,
            }}
            animate={{
              opacity: isHovered ? 0.2 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Border glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(45deg, ${link.gradient.replace('from-', 'rgba(').replace('to-', 'rgba(').replace('-500', ', 0.3)').replace('-600', ', 0.5)')})`,
              padding: '1px',
              opacity: 0,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full rounded-2xl bg-slate-800/30 backdrop-blur-sm" />
          </motion.div>
          
          <div className="relative z-10 flex items-start gap-4">
            {/* Enhanced icon with 3D effect */}
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-r ${link.gradient} flex-shrink-0`}
              whileHover={{
                scale: 1.1,
                rotateY: 15,
              }}
              animate={{
                boxShadow: isHovered 
                  ? `0 10px 25px -5px rgba(59, 130, 246, 0.4)`
                  : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {link.icon}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-xl font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors"
                animate={{
                  y: isHovered ? -2 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {link.title}
              </motion.h3>
              <motion.p
                className="text-slate-400 leading-relaxed"
                animate={{
                  y: isHovered ? -1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: 0.05,
                }}
              >
                {link.description}
              </motion.p>
            </div>
            
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-primary-400 transition-colors flex-shrink-0" />
            </motion.div>
          </div>

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-400 rounded-full"
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
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </a>
    </motion.div>
  );
};

export default EnhancedLinkCard;
