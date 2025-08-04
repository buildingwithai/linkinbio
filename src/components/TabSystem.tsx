"use client";

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Music, Code, Zap } from 'lucide-react';
import EnhancedLinkCard from './EnhancedLinkCard';

export interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
  gradient: string;
  featured?: boolean;
  category: 'music' | 'gtmlabs' | 'projects';
  customComponent?: ReactNode;
}

interface TabSystemProps {
  links: LinkItem[];
}

const tabs = [
  { id: 'all', label: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'gtmlabs', label: 'GTM LABS', icon: <Zap className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
  { id: 'music', label: 'Music', icon: <Music className="w-4 h-4" /> },
];

export default function TabSystem({ links }: TabSystemProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredLinks = activeTab === 'all' 
    ? links 
    : links.filter(link => link.category === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center">
          <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-2">
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {/* Active tab background */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl border border-primary-500/30"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                  )}
                  
                  {/* Tab content */}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                  
                  {/* Glow effect for active tab */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
      </div>

      {/* Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1
          }}
        >
          {filteredLinks.map((link, index) => (
            <EnhancedLinkCard
              key={`${activeTab}-${link.title}`}
              link={link}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filteredLinks.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-slate-500 text-lg">
            No links found in this category
          </div>
        </motion.div>
      )}
    </div>
  );
}
