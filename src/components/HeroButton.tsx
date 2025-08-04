"use client"

import { motion } from "framer-motion"
import { ButtonHTMLAttributes, forwardRef, useState, useRef } from "react"

interface HeroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline"
  href?: string
}

export const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className = "", size = "lg", variant = "default", children, href, ...props }, ref) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMousePosition({ x: x * 0.1, y: y * 0.1 });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };
    const buttonContent = (
      <motion.div 
        ref={buttonRef}
        className="group relative inline-block"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Gradient glow background */}
        <motion.div 
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#007cf0] to-[#f81ce5] blur-[8px]"
          animate={{
            opacity: isHovered ? 0.9 : 0.6,
            scale: isHovered ? 1.1 : 1.05,
          }}
          transition={{
            duration: 0.3,
          }}
        />
        
        {/* Magnetic field effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(0,124,240,0.3) 0%, transparent 50%)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
        
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isHovered 
              ? '0 0 20px rgba(0,124,240,0.8), 0 0 20px rgba(248,28,229,0.8)'
              : '0 0 8px rgba(0,124,240,0.6), 0 0 8px rgba(248,28,229,0.6)',
          }}
          transition={{
            boxShadow: { duration: 0.3 },
          }}
          className={`
            relative inline-flex items-center justify-center font-medium transition-all duration-300
            bg-black border-none text-white rounded-lg
            focus:outline-none
            ${size === "sm" ? "px-4 py-2 text-sm h-9" : ""}
            ${size === "md" ? "px-6 py-3 text-base h-11" : ""}
            ${size === "lg" ? "px-8 py-4 text-lg h-12" : ""}
            ${className}
          `}
          onClick={props.onClick}
          disabled={props.disabled}
          type={props.type}
        >
          <span className="flex items-center gap-2 font-semibold tracking-wide">
            {children}
          </span>
        </motion.button>
        
        {/* Floating sparkles on hover */}
        {isHovered && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -20],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    )

    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {buttonContent}
        </a>
      )
    }

    return buttonContent
  }
)

HeroButton.displayName = "HeroButton"
