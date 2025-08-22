'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const AnimatedFooter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };

    const colors = ['#00BFFF', '#00FF7F', '#FF69B4', '#9370DB', '#FFD700'];

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw connections
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-800 overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                Promptly
              </span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-6">
              Transform your ideas into professional prompts with advanced AI technology. Multilingual support for global reach.
            </p>
            {/* Animated Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-cyan-600 hover:to-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <span className="text-white text-sm group-hover:scale-110 transition-transform duration-300">𝕏</span>
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              </a>
              <a href="#" className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <span className="text-white text-sm group-hover:scale-110 transition-transform duration-300">in</span>
                <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              </a>
              <a href="#" className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <span className="text-white text-sm group-hover:scale-110 transition-transform duration-300">📧</span>
                <div className="absolute inset-0 rounded-full bg-purple-400/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div className="group">
            <h3 className="text-white font-semibold text-lg mb-6 group-hover:text-cyan-400 transition-colors duration-300">Product</h3>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">Dashboard</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="group">
            <h3 className="text-white font-semibold text-lg mb-6 group-hover:text-cyan-400 transition-colors duration-300">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-2 transform inline-block">Blog</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="group">
            <h3 className="text-white font-semibold text-lg mb-6 group-hover:text-cyan-400 transition-colors duration-300">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest updates and AI insights.</p>
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 group">
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">
              <p>&copy; 2025 Promptly. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 relative group">
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 relative group">
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 relative group">
                Cookie Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
    </footer>
  );
};

export default AnimatedFooter;