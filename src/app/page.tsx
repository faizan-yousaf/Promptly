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
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative grid-background">

      
      {/* Glassmorphic Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Promptly
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                About
              </Link>
              <Link href="/pricing" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                Pricing
              </Link>
              <Link href="/docs" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                Docs
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white/90 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Search</span>
                🔍
              </button>
              <Link href="/dashboard" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors">
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

      {/* Faded Border Transition */}
      <div className="hero-fade-border"></div>

      {/* Content Sections with Animated Grid */}
      <div className="section-grid">
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
      </div>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-gray-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Promptly
                </span>
              </Link>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-6">
                Transform your ideas into professional prompts with advanced AI technology. Multilingual support for global reach.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-white text-sm">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-white text-sm">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-white text-sm">📧</span>
                </a>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
              <ul className="space-y-4">
                <li><Link href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Pricing</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Dashboard</Link></li>
                
              </ul>
            </div>
            
            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Contact</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Careers</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Blog</Link></li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Get the latest updates and AI insights.</p>
              <div className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-200"
                />
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400">
                <p>&copy; 2025 Promptly. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Terms of Service</Link>
                <Link href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
