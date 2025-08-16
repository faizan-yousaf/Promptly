'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/Button"
import { ArrowRight, Sparkles, Rocket, CheckCircle, Star } from "lucide-react"

// TypeScript declarations for UnicornStudio
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
  const UnicornStudio: {
    init: () => void;
  };
}

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
}

export default function HeroSection({ mousePosition }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize UnicornStudio
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = function() {
        if (!window.UnicornStudio.isInitialized) {
          UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
      {/* UnicornStudio Animation Background */}
      <div className="absolute inset-0 z-0">
        <div 
          data-us-project="BPy30eBEVyUxMNAebgZP" 
          style={{
            width: '100%',
            height: '100%',
            minWidth: '1440px',
            minHeight: '900px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.8
          }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-400/10 animate-glow-pulse z-1"></div>
      <div className="relative z-10 text-center max-w-5xl mx-auto scroll-animate">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-electric-blue/20 text-electric-blue border border-electric-blue/30 rounded-full animate-float hover-lift">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Prompt Engineering
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 scroll-animate">
          From Rough Idea to
          <span className="block bg-gradient-to-r from-electric-blue via-neon-purple to-lime-green bg-clip-text text-transparent gradient-shift typing-animation">
            Perfect Prompt
          </span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl mt-2 scroll-animate">— Instantly</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto scroll-animate">
          AI-powered professional prompts tailored for your context
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center scroll-animate">
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-electric-blue to-neon-purple hover:from-electric-blue/80 hover:to-neon-purple/80 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 animate-glow-pulse hover-lift flex items-center">
              <Rocket className="mr-2 h-5 w-5" />
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button className="border-2 border-lime-green text-lime-green hover:bg-lime-green hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover-lift bg-transparent">
            See How It Works
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-400 scroll-animate">
          <div className="flex items-center hover-lift">
            <CheckCircle className="h-4 w-4 text-lime-green mr-2" />
            No Credit Card Required
          </div>
          <div className="flex items-center hover-lift">
            <CheckCircle className="h-4 w-4 text-lime-green mr-2" />
            Free Forever Plan
          </div>
          <div className="flex items-center hover-lift">
            <Star className="h-4 w-4 text-yellow-400 mr-2" />
            5-Star Rated
          </div>
        </div>
        
        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto scroll-animate">
          <div className="text-center hover-lift">
            <div className="text-4xl font-bold text-electric-blue counter" data-target="50000">50K+</div>
            <div className="text-gray-400 mt-2">Prompts Generated</div>
          </div>
          <div className="text-center hover-lift">
            <div className="text-4xl font-bold text-neon-purple counter" data-target="10000">10K+</div>
            <div className="text-gray-400 mt-2">Happy Users</div>
          </div>
          <div className="text-center hover-lift">
            <div className="text-4xl font-bold text-lime-green counter" data-target="99">99%</div>
            <div className="text-gray-400 mt-2">Satisfaction Rate</div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-electric-blue/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-lime-green/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-electric-blue/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '1.5s'}}></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}