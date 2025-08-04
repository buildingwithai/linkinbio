"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroButton } from '../components/HeroButton';
import MusicWidget from '../components/MusicWidget';
import SpotifyPlayer from '../components/SpotifyPlayer';
import TabSystem, { LinkItem } from '../components/TabSystem';
import FloatingParticles from '../components/FloatingParticles';
import EnhancedProfileImage from '../components/EnhancedProfileImage';
import TypewriterText from '../components/TypewriterText';
import SpotifyLink from '@/components/SpotifyLink';
import { Chrome, TrendingUp, Code, Eye, Calculator, Music, BarChart3, PenTool, Radar, Brain, Zap } from 'lucide-react';


export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links: LinkItem[] = [
    {
      title: "GTM LABS",
      description: "Building the future of marketing technology",
      url: "https://gtmlabs.io",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500",
      featured: true,
      category: "gtmlabs"
    },
    {
      title: "Project Clippy",
      description: "AI-powered Chrome extension for highlighted text",
      url: "https://project-clippy.vercel.app/",
      icon: <Brain className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500",
      category: "projects"
    },

    {
      title: "Competitive Intelligence",
      description: "GTM LABS Competitive Intelligence Platform",
      url: "https://ci.gtmlabs.io",
      icon: <Eye className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500",
      category: "gtmlabs"
    },
    {
      title: "Content Marketing",
      description: "GTM LABS Content Marketing Suite",
      url: "https://cs.gtmlabs.io",
      icon: <PenTool className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500",
      category: "gtmlabs"
    },
    {
      title: "Fractional PMM Calculator",
      description: "Calculate your marketing team's needs",
      url: "https://calc.gtmlabs.io",
      icon: <Calculator className="w-6 h-6" />,
      gradient: "from-indigo-500 to-purple-500",
      category: "gtmlabs"
    },
    {
      title: "Spotify",
      description: "Stream my latest reggaeton releases",
      url: "https://open.spotify.com/artist/6J1Q7Dbs0he5E6RA3SktiH",
      icon: <Music className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-600",
      category: "music",
      customComponent: (
        <SpotifyLink 
          spotifyUrl="https://open.spotify.com/artist/6J1Q7Dbs0he5E6RA3SktiH"
          title="Spotify"
          description="Stream my latest reggaeton releases"
          gradient="from-green-500 to-emerald-600"
          className="w-full"
        />
      )
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <FloatingParticles />
      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl animate-scale-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <img
                    src="/prof-pic.jpeg"
                    alt="Profile picture of Jo"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <TypewriterText 
              text="Hey, I'm " 
              delay={800}
              speed={80}
            />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent animate-gradient-shimmer bg-[length:200%_200%]">
              <TypewriterText 
                text="Jo" 
                delay={1500}
                speed={120}
                showCursor={false}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            Product Marketing Manager & Reggaeton Artist
          </motion.p>
        </motion.div>

        {/* Links Tab System */}
        <TabSystem links={links} />

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <div className="mb-6 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
              I also make{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent animate-pulse">
                reggaeton
              </span>{' '}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                music
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto">
              Learning{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                Spanish
              </span>{' '}
              while traveling{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                Latin America
              </span>
            </p>
          </div>
          <div className="mt-6 w-full max-w-2xl mx-auto">
            <SpotifyPlayer artistId="6J1Q7Dbs0he5E6RA3SktiH" />
          </div>
          <div className="mt-8">
            <HeroButton href="mailto:jovanny@gtmlabs.io">
              <Zap className="w-5 h-5" />
              Get in Touch
            </HeroButton>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center text-slate-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>© 2025 GTM LABS & Reggaeton Papi</p>
        </motion.footer>
      </div>
    </main>
  );
}
