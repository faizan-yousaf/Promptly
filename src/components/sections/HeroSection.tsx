'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Button } from "@/components/ui/Button"
import Aurora from '@/components/Aurora'
import StarBorder from '@/components/StarBorder'

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
}

export default function HeroSection({ mousePosition }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
      {/* WebGL Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora 
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.8}
          amplitude={2.0}
          speed={0.5}
        />
      </div>
      
      <div className="absolute inset-0 bg-black/20 z-5"></div>
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Promptly
            </span>
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-200 mb-6 tracking-wide">
            AI-Powered Prompt Generation
          </h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into professional prompts with advanced AI technology
          </p>
        </div>
        <div className="mt-8">
          <Link href="/dashboard">
            <StarBorder
              as="div"
              className="cursor-pointer"
              color="cyan"
              speed="5s"
            >
              Get Started
            </StarBorder>
          </Link>
        </div>
      </div>
    </section>
  );
}