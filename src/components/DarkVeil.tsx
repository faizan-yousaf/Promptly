'use client';

import { useEffect, useRef } from 'react';

interface DarkVeilProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

const DarkVeil: React.FC<DarkVeilProps> = ({ 
  className = '', 
  intensity = 0.8,
  speed = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      timeRef.current += 0.01 * speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple layers of dark veils
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 0.3;
        const layerIntensity = intensity * (0.3 + layer * 0.2);
        
        // Create gradient for veil effect
        const gradient = ctx.createRadialGradient(
          canvas.width * 0.5 + Math.sin(timeRef.current + layerOffset) * 100,
          canvas.height * 0.5 + Math.cos(timeRef.current * 0.7 + layerOffset) * 80,
          0,
          canvas.width * 0.5,
          canvas.height * 0.5,
          Math.max(canvas.width, canvas.height) * 0.8
        );
        
        gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
        gradient.addColorStop(0.3, `rgba(0, 0, 0, ${layerIntensity * 0.1})`);
        gradient.addColorStop(0.6, `rgba(0, 0, 0, ${layerIntensity * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, ${layerIntensity})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Add subtle noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));     // R
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Add subtle blue tint overlay
      const blueGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.3,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      
      blueGradient.addColorStop(0, 'rgba(0, 191, 255, 0.05)');
      blueGradient.addColorStop(0.5, 'rgba(0, 191, 255, 0.02)');
      blueGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
      
      ctx.fillStyle = blueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default DarkVeil;