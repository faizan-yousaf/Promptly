'use client';

import { useState, useEffect, Suspense } from 'react';
import { initScrollAnimations, initParallaxEffect, initSmoothScroll, initTypingAnimation, initCounterAnimation, initFloatingParticles } from '@/lib/animations.js';
import { SectionSkeleton } from '@/components/sections';
import { LoaderThreeDemo } from '@/components/LoaderThreeDemo';

import ScrollFloat from '@/components/ScrollFloat';
import ScrollReveal from '@/components/ScrollReveal';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/components/GlassSurface.css';

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

const ScrollStackSection = dynamic(() => import('@/components/sections/ScrollStackSection'), {
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative" style={{backgroundColor: '#000000'}}>
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection mousePosition={mousePosition} />
      </Suspense>

      {/* Faded Border Transition */}
      <div className="hero-fade-border"></div>

      {/* Content Sections */}
      <div>
        {/* How It Works Section */}
        <ScrollReveal delay={0.2} y={60}>
          <Suspense fallback={<SectionSkeleton />}>
            <HowItWorksSection visibleElements={visibleElements} />
          </Suspense>
        </ScrollReveal>

        {/* Agent Mode Section */}
        <ScrollReveal delay={0.3} y={80}>
          <Suspense fallback={<SectionSkeleton />}>
            <AgentModeSection visibleElements={visibleElements} />
          </Suspense>
        </ScrollReveal>

        {/* Multilingual Section */}
        <ScrollReveal delay={0.4} y={100}>
          <Suspense fallback={<SectionSkeleton />}>
            <MultilingualSection visibleElements={visibleElements} />
          </Suspense>
        </ScrollReveal>

        {/* ScrollStack Section */}
        <ScrollReveal delay={0.5} y={120}>
          <Suspense fallback={<SectionSkeleton />}>
            <ScrollStackSection />
          </Suspense>
        </ScrollReveal>

        {/* Scroll Float Effect */}
        <ScrollReveal delay={0.6} y={150}>
          <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#000000'}}>
            <ScrollFloat
               animationDuration={1}
               ease="back.inOut(2)"
               scrollStart="center bottom+=50%"
               scrollEnd="bottom bottom-=40%"
               stagger={0.03}
               containerClassName="text-center"
               textClassName="font-black text-white"
             >
              Try Promptly now!
             </ScrollFloat>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.7} y={80}>
          <Suspense fallback={<SectionSkeleton />}>
            <CTASection visibleElements={visibleElements} />
          </Suspense>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
}
