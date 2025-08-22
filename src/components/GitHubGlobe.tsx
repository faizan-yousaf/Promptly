'use client';

import { useEffect, useRef, useState } from 'react';

interface GitHubGlobeProps {
  className?: string;
  size?: number;
}

const GitHubGlobe: React.FC<GitHubGlobeProps> = ({ 
  className = '', 
  size = 300 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    // Globe data points (simulating GitHub-like activity)
    const points = [
      { lat: 40.7128, lng: -74.0060, activity: 0.8 }, // New York
      { lat: 51.5074, lng: -0.1278, activity: 0.9 }, // London
      { lat: 35.6762, lng: 139.6503, activity: 0.7 }, // Tokyo
      { lat: 37.7749, lng: -122.4194, activity: 0.85 }, // San Francisco
      { lat: 52.5200, lng: 13.4050, activity: 0.6 }, // Berlin
      { lat: -33.8688, lng: 151.2093, activity: 0.5 }, // Sydney
      { lat: 19.0760, lng: 72.8777, activity: 0.7 }, // Mumbai
      { lat: 1.3521, lng: 103.8198, activity: 0.6 }, // Singapore
    ];

    const drawGlobe = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Draw globe outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw globe fill
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(0, 191, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 191, 255, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw latitude lines
      for (let i = -60; i <= 60; i += 30) {
        const y = centerY + (i / 90) * radius * 0.8;
        const width = Math.cos((i * Math.PI) / 180) * radius * 0.9;
        
        ctx.beginPath();
        ctx.ellipse(centerX, y, width, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 191, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 + rotationRef.current) * (Math.PI / 180);
        
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * 0.9, radius * 0.3, angle, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 191, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw activity points
      points.forEach((point, index) => {
        const adjustedLng = point.lng + rotationRef.current;
        const x = centerX + Math.cos(adjustedLng * Math.PI / 180) * Math.cos(point.lat * Math.PI / 180) * radius * 0.8;
        const y = centerY + Math.sin(point.lat * Math.PI / 180) * radius * 0.8;
        const z = Math.sin(adjustedLng * Math.PI / 180) * Math.cos(point.lat * Math.PI / 180);
        
        // Only draw points on the visible side of the globe
        if (z > -0.3) {
          const opacity = Math.max(0.2, (z + 0.3) / 1.3);
          const pulsePhase = (Date.now() / 1000 + index * 0.5) % (Math.PI * 2);
          const pulseIntensity = (Math.sin(pulsePhase) + 1) / 2;
          
          // Draw glow
          const glowRadius = 8 + pulseIntensity * 4;
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
          glowGradient.addColorStop(0, `rgba(0, 255, 127, ${opacity * point.activity * 0.8})`);
          glowGradient.addColorStop(1, 'rgba(0, 255, 127, 0)');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw point
          ctx.fillStyle = `rgba(0, 255, 127, ${opacity * point.activity})`;
          ctx.beginPath();
          ctx.arc(x, y, 3 + pulseIntensity * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Draw connecting arcs between points
      for (let i = 0; i < points.length - 1; i++) {
        const point1 = points[i];
        const point2 = points[i + 1];
        
        const adjustedLng1 = point1.lng + rotationRef.current;
        const adjustedLng2 = point2.lng + rotationRef.current;
        
        const x1 = centerX + Math.cos(adjustedLng1 * Math.PI / 180) * Math.cos(point1.lat * Math.PI / 180) * radius * 0.8;
        const y1 = centerY + Math.sin(point1.lat * Math.PI / 180) * radius * 0.8;
        const x2 = centerX + Math.cos(adjustedLng2 * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * radius * 0.8;
        const y2 = centerY + Math.sin(point2.lat * Math.PI / 180) * radius * 0.8;
        
        const z1 = Math.sin(adjustedLng1 * Math.PI / 180) * Math.cos(point1.lat * Math.PI / 180);
        const z2 = Math.sin(adjustedLng2 * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180);
        
        if (z1 > -0.3 && z2 > -0.3) {
          const opacity = Math.min((z1 + 0.3) / 1.3, (z2 + 0.3) / 1.3) * 0.3;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          
          // Create curved connection
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2 - 20;
          ctx.quadraticCurveTo(midX, midY, x2, y2);
          
          ctx.strokeStyle = `rgba(0, 255, 127, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      rotationRef.current += isHovered ? 0.5 : 0.2;
      if (rotationRef.current >= 360) rotationRef.current = 0;
      
      drawGlobe();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, isHovered]);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="transition-transform duration-300 hover:scale-105"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 127, 0.3))' }}
      />
      
      {/* Orbital rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 border border-cyan-400/20 rounded-full animate-spin"
          style={{ 
            animationDuration: '20s',
            transform: 'rotateX(75deg)'
          }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1 animate-pulse"></div>
        </div>
        
        <div 
          className="absolute inset-2 border border-green-400/15 rounded-full animate-spin"
          style={{ 
            animationDuration: '30s',
            animationDirection: 'reverse',
            transform: 'rotateY(45deg) rotateX(60deg)'
          }}
        >
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default GitHubGlobe;