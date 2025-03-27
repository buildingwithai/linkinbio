"use client";

import { useState, useEffect, useRef } from 'react';
import { StarryBackground } from '../components/StarryBackground';

export default function Home() {
  const [shootingStars, setShootingStars] = useState<Array<{id: number, top: string, width: string, animationDuration: string}>>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [triggerStar, setTriggerStar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set mounted state on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track mouse position for star effect (client-side only)
  useEffect(() => {
    if (!isMounted) return;

    function updateCursorPosition(e: MouseEvent) {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    }
    
    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [isMounted]);
  
  // Function to create a shooting star
  const createShootingStar = () => {
    if (!isMounted) return;

    setTriggerStar(true);
    // Reset trigger after animation duration
    setTimeout(() => setTriggerStar(false), 2000);

    const newStarId = Date.now();
    const newStar = {
      id: newStarId,
      top: `${Math.random() * 70}%`,
      width: `${Math.random() * 150 + 50}px`,
      animationDuration: `${Math.random() * 1 + 1.5}s`
    };
    
    setShootingStars(prev => [...prev, newStar]);
    
    // Remove the star after animation completes
    setTimeout(() => {
      setShootingStars(prev => prev.filter(star => star.id !== newStarId));
    }, 2500);
  };

  // Sample data for categories
  const categories = [
    {
      title: "GTM LABS",
      links: [
        { title: "GTM LABS Homepage", url: "https://gtmlabs.io", icon: "🏢" },
        { title: "Competitive Intelligence", url: "https://ci.gtmlabs.io", icon: "🔍" },
        { title: "Content Marketing", url: "https://cs.gtmlabs.io", icon: "📝" },
        { title: "Fractional Product Marketing Calculator", url: "https://calc.gtmlabs.io", icon: "🧮" }
      ]
    },
    {
      title: "Reggaeton Music",
      links: [
        { title: "Spotify Profile", url: "https://open.spotify.com/artist/6J1Q7Dbs0he5E6RA3SktiH", icon: "🎵" }
      ]
    }
  ];

  // Social media icons
  const socialLinks = [
    { icon: "𝕏", url: "https://x.com/GTMjo_" },
    { icon: "🌐", url: "https://gtmlabs.io" },
    { icon: "🎵", url: "https://open.spotify.com/artist/6J1Q7Dbs0he5E6RA3SktiH" }
  ];

  // Client-side only content
  const ClientContent = () => {
    if (!isMounted) return null;
    
    return (
      <>
        {/* Shooting stars - only rendered client-side */}
        {shootingStars.map(star => (
          <div 
            key={star.id}
            className="shooting-star"
            style={{
              top: star.top,
              width: star.width,
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#010108] text-white relative overflow-hidden flex items-center justify-center" ref={containerRef}>
      {/* Starry Background Component */}
      <StarryBackground triggerShootingStar={triggerStar} />
      
      {/* Client-side only content */}
      <ClientContent />
      
      {/* Main content card */}
      <div 
        className="glassmorphic rounded-xl p-6 border border-[#2a2a50] w-[90%] max-w-md my-8"
        style={{ 
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          background: 'rgba(13, 16, 45, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={createShootingStar}
        onMouseMove={() => Math.random() > 0.98 && createShootingStar()}
      >
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-[#1a1a40]/50 rounded-full mb-4 flex items-center justify-center border-2 border-blue-500 hover:border-blue-300 transition-all duration-300 overflow-hidden">
            <img 
              src="/prof-pic.jpeg" 
              alt="Jovanny's Profile Picture"
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-blue-300">Jovanny</h1>
          
          <p className="text-sm text-blue-100 mb-4">
            Fractional Product Marketing Manager & Reggaeton Artist
          </p>
        </div>
        
        {/* Links */}
        <div className="space-y-6 mb-6">
          {categories.map((category) => (
            <div key={category.title} className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-center text-blue-300">{category.title}</h2>
              <div className="space-y-2">
                {category.links.map((link) => (
                  <a 
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-4 bg-[#1a1a40]/60 hover:bg-[#2a2a60]/80 transition-colors rounded-md text-center border border-[#3a3a80]/50 link-button"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Spotify Player */}
        <div className="bg-[#1a1a40]/60 p-4 rounded-md mb-6 border border-[#3a3a80]/50">
          <h3 className="text-center mb-2 text-blue-300">Latest Releases</h3>
          <iframe 
            style={{borderRadius: '12px'}} 
            src="https://open.spotify.com/embed/artist/6J1Q7Dbs0he5E6RA3SktiH?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
        
        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-[#1a1a40]/60 hover:bg-[#2a2a60]/80 transition-colors rounded-full border border-[#3a3a80]/50"
              onMouseEnter={createShootingStar}
            >
              {link.icon}
            </a>
          ))}
        </div>
        
        <p className="text-center text-xs text-blue-300 mt-4">
          © 2025 GTM LABS & Reggaeton Papi
        </p>
      </div>
    </div>
  );
}