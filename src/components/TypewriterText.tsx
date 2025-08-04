"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 50,
  className = "",
  showCursor = true 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{
            opacity: isComplete ? [1, 0, 1] : 1,
          }}
          transition={{
            duration: 0.8,
            repeat: isComplete ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      )}
    </span>
  );
};

export default TypewriterText;
