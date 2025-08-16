'use client';

import { useState } from 'react';
import { Target } from "lucide-react"

interface FeaturesSectionProps {
  visibleElements: Set<string>;
}

export default function FeaturesSection({ visibleElements }: FeaturesSectionProps) {
  const features = [
    {
      icon: '🎯',
      title: 'Smart Prompt Generation',
      description: 'AI-powered prompt creation that understands context and generates optimized prompts for any use case.',
      color: 'electric-blue',
      delay: '0s'
    },
    {
      icon: '🤖',
      title: 'Agentic AI Mode',
      description: 'Advanced reasoning capabilities with multi-step thinking and autonomous problem-solving.',
      color: 'neon-purple',
      delay: '0.1s'
    },
    {
      icon: '🌍',
      title: 'Multilingual Support',
      description: 'Generate prompts in English, Spanish, and French with native-level fluency and cultural context.',
      color: 'lime-green',
      delay: '0.2s'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get professional-quality prompts in seconds with our optimized AI models and infrastructure.',
      color: 'electric-blue',
      delay: '0.3s'
    },
    {
      icon: '🎨',
      title: 'Customizable Tones',
      description: 'Choose from professional, friendly, creative, or technical tones to match your brand voice.',
      color: 'neon-purple',
      delay: '0.4s'
    },
    {
      icon: '💾',
      title: 'History & Analytics',
      description: 'Track your prompt performance and access your complete generation history with detailed analytics.',
      color: 'lime-green',
      delay: '0.5s'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <div className="mb-4 inline-flex items-center px-4 py-2 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full animate-float">
            <Target className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 scroll-animate">
            Everything you need to create
            <span className="block bg-gradient-to-r from-neon-purple to-lime-green bg-clip-text text-transparent gradient-shift">
              perfect prompts
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto scroll-animate">
            Our AI understands context and generates optimized prompts for any use case.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-animate
              id={`feature-${index}`}
              className={`group bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-${feature.color}/50 transition-all duration-500 hover:glow-subtle hover:scale-105 hover:-translate-y-2 cursor-pointer transform ${
                visibleElements.has(`feature-${index}`) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: visibleElements.has(`feature-${index}`) ? feature.delay : '0s'
              }}
            >
              <div className={`w-12 h-12 bg-${feature.color}/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`text-${feature.color} text-2xl group-hover:animate-pulse`}>{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}