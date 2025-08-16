'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/Button"
import { ArrowRight, Zap, Brain, Globe, Clock, Palette, BarChart3, CheckCircle, Star, Users, TrendingUp, Award, Sparkles, Rocket, Target } from "lucide-react"
import { initScrollAnimations, initParallaxEffect, initSmoothScroll, initTypingAnimation, initCounterAnimation, initFloatingParticles } from '@/lib/animations.js';
import { SectionSkeleton } from '@/components/sections';

// Lazy load components for better performance
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

const HowItWorksSection = dynamic(() => import('@/components/sections/HowItWorksSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

const AgentModeSection = dynamic(() => import('@/components/sections/AgentModeSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

const MultilingualSection = dynamic(() => import('@/components/sections/MultilingualSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements with a delay to ensure they're rendered
    const observeElements = () => {
      const elementsToObserve = document.querySelectorAll('[data-animate]');
      elementsToObserve.forEach(el => observer.observe(el));
    };

    // Delay observation to ensure components are mounted
    const timeoutId = setTimeout(observeElements, 100);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    if (isClient) {
      initScrollAnimations();
      initParallaxEffect();
      initSmoothScroll();
      initTypingAnimation();
      initCounterAnimation();
      initFloatingParticles();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Floating Particles Background */}
      <canvas id="particles-canvas" className="absolute inset-0 pointer-events-none opacity-30"></canvas>
      
      {/* Animation Scripts */}

      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-neon-purple/5"></div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 191, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>
        {/* Floating Orbs */}
        {isClient && (
          <>
            <div 
              className="absolute w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"
              style={{
                left: `${mousePosition.x * 0.02}px`,
                top: `${mousePosition.y * 0.02}px`,
                transform: 'translate(-50%, -50%)',
                animation: 'float 6s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl animate-pulse delay-1000"
              style={{
                right: `${(typeof window !== 'undefined' ? window.innerWidth : 1920) - mousePosition.x} * 0.01}px`,
                bottom: `${(typeof window !== 'undefined' ? window.innerHeight : 1080) - mousePosition.y} * 0.01}px`,
                transform: 'translate(50%, 50%)',
                animation: 'float 8s ease-in-out infinite reverse'
              }}
            ></div>
            <div 
              className="absolute w-32 h-32 bg-lime-green/15 rounded-full blur-2xl animate-pulse"
              style={{
                left: `${mousePosition.x * 0.015}px`,
                bottom: `${mousePosition.y * 0.01}px`,
                transform: 'translate(-50%, 50%)',
                animation: 'float 10s ease-in-out infinite'
              }}
            ></div>
          </>
        )}
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold gradient-text">
                Promptly
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#features" className="hover:text-electric-blue transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="hover:text-electric-blue transition-colors">
                  How it Works
                </Link>
                <Link href="/pricing" className="hover:text-electric-blue transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="bg-electric-blue hover:bg-electric-blue/80 text-black px-6 py-2 rounded-full font-medium transition-all duration-200 hover:glow"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection mousePosition={mousePosition} />
      </Suspense>

      {/* Features Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection visibleElements={visibleElements} />
      </Suspense>

      {/* How It Works Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <HowItWorksSection visibleElements={visibleElements} />
      </Suspense>

      {/* Agent Mode Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <AgentModeSection visibleElements={visibleElements} />
      </Suspense>

      {/* Multilingual Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <MultilingualSection visibleElements={visibleElements} />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection visibleElements={visibleElements} />
      </Suspense>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Link href="/" className="text-2xl font-bold gradient-text">
                Promptly
              </Link>
              <p className="text-gray-400 mt-4 max-w-md">
                AI-powered multilingual SaaS for professional prompt generation with advanced reasoning capabilities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Promptly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
