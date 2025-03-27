import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface StarryBackgroundProps {
  triggerShootingStar?: boolean;
}

const StarryBackground = ({ triggerShootingStar = false }: StarryBackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStar, setShootingStar] = useState<boolean>(false);
  const [randomShootingStar, setRandomShootingStar] = useState<boolean>(false);
  const [hoverTriggeredStar, setHoverTriggeredStar] = useState<boolean>(false);

  // Star colors for a cosmic look
  const starColors = [
    '#ffffff', // white
    '#f8f7ff', // off-white
    '#eeeeff', // light blue
    '#ffeeee', // light red
    '#eeffee', // light green
    '#ffe4b5', // light orange
    '#e6e6fa', // lavender
    '#b0e0e6', // powder blue
    '#ffc0cb', // pink
  ];

  useEffect(() => {
    // Generate random stars - more stars for a denser sky
    const numberOfStars = Math.min(500, Math.floor(window.innerWidth * window.innerHeight / 800));
    const generatedStars: Star[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.8, // Bigger stars
        duration: Math.random() * 5 + 2,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.7 + 0.3,  // Varying brightness
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    setStars(generatedStars);

    // Random shooting stars (every 2-6 seconds)
    const shootingStarInterval = setInterval(() => {
      setRandomShootingStar(true);
      setTimeout(() => setRandomShootingStar(false), 1500);
    }, Math.random() * 4000 + 2000);

    return () => clearInterval(shootingStarInterval);
  }, []);

  // Watch for triggered shooting star from props
  useEffect(() => {
    if (triggerShootingStar && !hoverTriggeredStar) {
      setHoverTriggeredStar(true);
      setTimeout(() => setHoverTriggeredStar(false), 1500);
    }
  }, [triggerShootingStar, hoverTriggeredStar]);

  // Combine both types of shooting stars
  const showShootingStar = shootingStar || randomShootingStar || hoverTriggeredStar;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#030318] to-[#000005]">
      {/* Star field with parallax effect */}
      <div className="absolute inset-0 opacity-90">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}` : 'none',
              opacity: star.opacity,
              animation: `shimmer ${star.duration}s infinite ease-in-out ${star.delay}s`
            }}
          />
        ))}
      </div>
      
      {/* Add star clusters and nebula effect */}
      {[...Array(6)].map((_, index) => (
        <div
          key={`cluster-${index}`}
          className="absolute rounded-full opacity-20 blur-xl"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            background: `radial-gradient(circle, 
              ${starColors[Math.floor(Math.random() * starColors.length)]} 0%, 
              transparent 70%)`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      
      {/* Brighter stars with glow */}
      {[...Array(25)].map((_, index) => (
        <div
          key={`big-star-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: 'white',
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 3 + 1}px rgba(255, 255, 255, 0.8)`,
            opacity: Math.random() * 0.5 + 0.5,
            animation: `pulse ${Math.random() * 4 + 3}s infinite ease-in-out ${Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Random shooting star */}
      {randomShootingStar && (
        <motion.div
          className="absolute h-[2px] z-5"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 25%, white 50%, rgba(255, 255, 255, 0.5) 75%, transparent 100%)',
            width: '150px',
            boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.7)',
            top: `${Math.random() * 70}%`,
            left: '-150px'
          }}
          animate={{ 
            x: window.innerWidth + 300,
            y: [0, Math.random() > 0.5 ? 200 : -200],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      
      {/* Hover-triggered shooting star - appears when hovering over GTM LABS cards */}
      {hoverTriggeredStar && (
        <motion.div
          className="absolute h-[3px] z-5"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(100, 200, 255, 0.5) 25%, rgb(120, 220, 255) 50%, rgba(100, 200, 255, 0.5) 75%, transparent 100%)',
            width: '200px',
            boxShadow: '0 0 12px 2px rgba(100, 200, 255, 0.8)',
            top: '30%',
            left: '-200px'
          }}
          animate={{ 
            x: window.innerWidth + 400,
            y: [0, -100, -50],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

export { StarryBackground }; 