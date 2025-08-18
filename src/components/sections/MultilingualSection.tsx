'use client';

import { useState, useEffect } from 'react';
import { Globe, Languages } from 'lucide-react';

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
        <div className="text-center mb-16">
          <div className="opacity-100 translate-y-0 transition-all duration-1000">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-lime-green to-electric-blue text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                🌍 Global Reach
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Multilingual AI Prompts
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Generate professional prompts in multiple languages with native-level fluency
            </p>
          </div>
        </div>
        
        <div className="relative">
          {/* World Map Outline */}
          <div className="relative mx-auto max-w-4xl opacity-100 scale-100 transition-all duration-1000">
            {/* SVG World Map */}
            <div className="relative h-64 md:h-80 flex items-center justify-center">
              <svg 
                viewBox="0 0 800 400" 
                className="w-full h-full opacity-40 stroke-current text-gray-400 svg-enhanced"
                fill="none"
                strokeWidth="2"
              >
                {/* Simplified world map outline */}
                <path d="M150 200 Q200 150 300 180 Q400 160 500 190 Q600 170 700 200 Q650 250 550 230 Q450 240 350 220 Q250 250 150 200 Z" className="stroke-electric-blue/30 fill-electric-blue/5" />
                <path d="M200 120 Q300 100 400 130 Q500 110 600 140 Q550 180 450 160 Q350 170 250 150 Q200 120" className="stroke-neon-purple/30 fill-neon-purple/5" />
                <path d="M180 280 Q280 260 380 290 Q480 270 580 300 Q530 340 430 320 Q330 330 230 310 Q180 280" className="stroke-lime-green/30 fill-lime-green/5" />
              </svg>
              
              {/* Animated Language Flags */}
              <div className="absolute inset-0">
                {languages.map((lang, index) => {
                  const positions = [
                    { top: '25%', left: '20%' }, // North America
                    { top: '45%', left: '15%' }, // South America
                    { top: '30%', left: '45%' }, // Europe
                    { top: '35%', left: '50%' }, // Central Europe
                    { top: '40%', left: '48%' }, // Southern Europe
                    { top: '50%', left: '25%' }, // South America
                  ];
                  
                  return (
                    <div
                      key={lang.code}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                        activeLanguage === index 
                          ? 'scale-125 opacity-100 z-10' 
                          : 'scale-100 opacity-70'
                      }`}
                      style={{
                        top: positions[index]?.top || '50%',
                        left: positions[index]?.left || '50%',
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <div className={`relative group cursor-pointer`}>
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          activeLanguage === index 
                            ? `bg-${lang.color}/20 scale-150 animate-pulse` 
                            : 'bg-transparent scale-100'
                        }`}></div>
                        
                        {/* Flag Container */}
                        <div className={`relative w-12 h-12 md:w-16 md:h-16 bg-gray-800/80 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          activeLanguage === index 
                            ? `border-${lang.color} shadow-lg shadow-${lang.color}/50` 
                            : 'border-gray-600'
                        }`}>
                          <span className="text-2xl md:text-3xl">{lang.flag}</span>
                        </div>
                        
                        {/* Language Label */}
                        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center transition-all duration-300 ${
                          activeLanguage === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}>
                          <div className={`text-sm font-semibold text-${lang.color} whitespace-nowrap`}>
                            {lang.name}
                          </div>
                        </div>
                        
                        {/* Pulse Animation */}
                        {activeLanguage === index && (
                          <div className={`absolute inset-0 rounded-full border-2 border-${lang.color} animate-ping opacity-75`}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Language Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-100 translate-y-0 transition-all duration-1000">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-electric-blue mb-2">6+</div>
              <div className="text-gray-400 text-sm">Languages</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-neon-purple mb-2">95%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-lime-green mb-2">100+</div>
              <div className="text-gray-400 text-sm">Countries</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}