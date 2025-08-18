'use client';

import { useState, useEffect } from 'react';
import { Globe, Languages } from 'lucide-react';
import GitHubGlobe from '@/components/GitHubGlobe';

interface MultilingualSectionProps {
  visibleElements: Set<string>;
}

export default function MultilingualSection({ visibleElements }: MultilingualSectionProps) {
  const [activeLanguage, setActiveLanguage] = useState(0);
  
  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸', color: 'electric-blue' },
    { code: 'ES', name: 'Español', flag: '🇪🇸', color: 'neon-purple' },
    { code: 'FR', name: 'Français', flag: '🇫🇷', color: 'lime-green' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪', color: 'electric-blue' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹', color: 'neon-purple' },
    { code: 'PT', name: 'Português', flag: '🇵🇹', color: 'lime-green' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [languages.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-neon-purple/5 to-lime-green/5"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text text-xs font-bold tracking-widest uppercase">
              🌍 Global Reach
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Multilingual AI Prompts
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Generate professional prompts in multiple languages with native-level fluency
          </p>
        </div>
        
        <div className="relative">
          {/* Spinning Globe */}
          <div className="relative mx-auto max-w-4xl">
            <div className="relative h-80 md:h-96 flex items-center justify-center">
              <GitHubGlobe size={350} className="mx-auto" />
            </div>
          </div>
          
          {/* Language Stats Cards */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="group">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 text-center hover:scale-105 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
                <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
                <div className="text-gray-400 text-sm font-medium">Languages</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 text-center hover:scale-105 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                <div className="text-gray-400 text-sm font-medium">Accuracy</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-green-400/20 rounded-2xl p-6 text-center hover:scale-105 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20">
                <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
                <div className="text-gray-400 text-sm font-medium">Countries</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gradient-to-r border-cyan-400/20 rounded-2xl p-6 text-center hover:scale-105 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-400 text-sm font-medium">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}