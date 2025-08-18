'use client';

import { useEffect, useRef } from 'react';

interface SpinningGlobeProps {
  className?: string;
  size?: number;
}

const SpinningGlobe: React.FC<SpinningGlobeProps> = ({ 
  className = '', 
  size = 200 
}) => {
  const globeRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={globeRef}
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Globe Container */}
      <div className="relative w-full h-full">
        {/* Main Globe */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-cyan-400/30 animate-spin" style={{ animationDuration: '20s' }}>
          {/* Continents */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            {/* North America */}
            <div className="absolute top-6 left-8 w-8 h-6 bg-green-400/40 rounded-lg transform rotate-12"></div>
            {/* South America */}
            <div className="absolute top-16 left-6 w-4 h-8 bg-green-400/40 rounded-lg transform rotate-6"></div>
            {/* Europe */}
            <div className="absolute top-4 left-16 w-6 h-4 bg-green-400/40 rounded transform rotate-3"></div>
            {/* Africa */}
            <div className="absolute top-8 left-18 w-5 h-10 bg-green-400/40 rounded-lg transform -rotate-6"></div>
            {/* Asia */}
            <div className="absolute top-2 right-8 w-10 h-8 bg-green-400/40 rounded-lg transform rotate-12"></div>
            {/* Australia */}
            <div className="absolute bottom-8 right-10 w-4 h-3 bg-green-400/40 rounded transform rotate-45"></div>
          </div>
          
          {/* Grid Lines */}
          <div className="absolute inset-0 rounded-full">
            {/* Latitude lines */}
            <div className="absolute top-1/4 left-2 right-2 h-px bg-cyan-400/20"></div>
            <div className="absolute top-1/2 left-2 right-2 h-px bg-cyan-400/30"></div>
            <div className="absolute top-3/4 left-2 right-2 h-px bg-cyan-400/20"></div>
            
            {/* Longitude lines */}
            <div className="absolute top-2 bottom-2 left-1/4 w-px bg-cyan-400/20 rounded-full"></div>
            <div className="absolute top-2 bottom-2 left-1/2 w-px bg-cyan-400/30 rounded-full"></div>
            <div className="absolute top-2 bottom-2 left-3/4 w-px bg-cyan-400/20 rounded-full"></div>
          </div>
        </div>
        
        {/* Green Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl animate-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-green-400/10 blur-2xl"></div>
        
        {/* Orbital Ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 animate-pulse"></div>
        </div>
        
        {/* Connection Lines */}
        <div className="absolute inset-0">
          {/* Animated connection dots */}
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SpinningGlobe;