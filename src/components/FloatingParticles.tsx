"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(59, 130, 246, 0.1)', // blue
      'rgba(147, 51, 234, 0.1)', // purple
      'rgba(236, 72, 153, 0.1)', // pink
      'rgba(34, 197, 94, 0.1)',  // green
      'rgba(251, 191, 36, 0.1)', // yellow
      'rgba(239, 68, 68, 0.1)',  // red
    ];

    const shapes = ['circle', 'square', 'triangle'];
    
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));

    setParticles(newParticles);
  }, []);

  const getRandomPath = () => {
    const paths = [
      { x: [0, 100, 0], y: [0, 50, 100] },
      { x: [100, 0, 100], y: [0, 100, 50] },
      { x: [50, 0, 100, 50], y: [0, 100, 0, 100] },
    ];
    return paths[Math.floor(Math.random() * paths.length)];
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {particles.map((particle) => {
        const path = getRandomPath();
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-sm"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: path.x.map(val => `${val}vw`),
              y: path.y.map(val => `${val}vh`),
              rotate: [0, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
      
      {/* Additional geometric shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 25 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <div
            className="w-8 h-8 border border-slate-600/20"
            style={{
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))`,
              transform: i % 2 === 0 ? 'rotate(45deg)' : 'none',
              borderRadius: i % 3 === 0 ? '50%' : '0',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
