'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/Button"
import { ArrowRight, Zap, Brain, Globe, Clock, Palette, BarChart3, CheckCircle, Star, Users, TrendingUp, Award, Sparkles, Rocket, Target } from "lucide-react"
import { initScrollAnimations, initParallaxEffect, initSmoothScroll, initTypingAnimation, initCounterAnimation, initFloatingParticles } from '@/lib/animations.js';
import { SectionSkeleton } from '@/components/sections';
import { LoaderThreeDemo } from '@/components/LoaderThreeDemo';
import { SpotlightNewDemo } from '@/components/SpotlightNewDemo';

// Lazy load components for better performance
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const FeaturesSection = dynamic(() => import('@/components/StickyScrollRevealDemo').then(mod => ({ default: mod.StickyScrollRevealDemo })), {
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Hide loading screen after 3 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
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
    
    // Initialize animations after loading timer
    const animationTimer = setTimeout(() => {
      if (isClient) {
        initScrollAnimations();
        initParallaxEffect();
        initSmoothScroll();
        initTypingAnimation();
        initCounterAnimation();
        initFloatingParticles();
      }
    }, 3100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(loadingTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  // Show loading screen
  if (isLoading) {
    return <LoaderThreeDemo />;
  }

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

      {/* Content Sections */}
      <div>
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

      {/* Spotlight Footer */}
      <SpotlightNewDemo />
    </div>
  );
}
