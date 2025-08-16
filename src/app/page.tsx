'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 via-transparent to-neon-purple/10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              From Idea to
              <span className="gradient-text block">Perfect Prompt</span>
              <span className="text-lime-green">Instantly</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered multilingual SaaS for professional prompt generation with advanced reasoning capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="bg-electric-blue hover:bg-electric-blue/80 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:glow hover:scale-105"
              >
                Start Creating Prompts
              </Link>
              <Link
                href="#how-it-works"
                className="border border-gray-600 hover:border-electric-blue text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-electric-blue/10"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-electric-blue/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-lime-green/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to create perfect prompts for any AI model
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-electric-blue/50 transition-all duration-300 hover:glow-subtle">
              <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-electric-blue text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Prompt Generation</h3>
              <p className="text-gray-300">
                AI-powered prompt creation that understands context and generates optimized prompts for any use case.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-neon-purple/50 transition-all duration-300 hover:glow-subtle">
              <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-neon-purple text-2xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Agentic AI Mode</h3>
              <p className="text-gray-300">
                Advanced reasoning capabilities with multi-step thinking and autonomous problem-solving.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-lime-green/50 transition-all duration-300 hover:glow-subtle">
              <div className="w-12 h-12 bg-lime-green/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-lime-green text-2xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Multilingual Support</h3>
              <p className="text-gray-300">
                Generate prompts in English, Spanish, and French with native-level fluency and cultural context.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-electric-blue/50 transition-all duration-300 hover:glow-subtle">
              <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-electric-blue text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-gray-300">
                Get professional-quality prompts in seconds with our optimized AI models and infrastructure.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-neon-purple/50 transition-all duration-300 hover:glow-subtle">
              <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-neon-purple text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Customizable Tones</h3>
              <p className="text-gray-300">
                Choose from professional, friendly, creative, or technical tones to match your brand voice.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-lime-green/50 transition-all duration-300 hover:glow-subtle">
              <div className="w-12 h-12 bg-lime-green/20 rounded-lg flex items-center justify-center mb-6">
                <span className="text-lime-green text-2xl">💾</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">History & Analytics</h3>
              <p className="text-gray-300">
                Track your prompt performance and access your complete generation history with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to generate perfect prompts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-electric-blue">
                <span className="text-electric-blue text-3xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Describe Your Idea</h3>
              <p className="text-gray-300">
                Simply tell us what you want to achieve. Our AI understands context and intent.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-neon-purple">
                <span className="text-neon-purple text-3xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Customize Settings</h3>
              <p className="text-gray-300">
                Choose your AI model, tone, role, and enable Agentic AI for advanced reasoning.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-lime-green/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-lime-green">
                <span className="text-lime-green text-3xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Perfect Prompts</h3>
              <p className="text-gray-300">
                Receive optimized, professional prompts ready to use with any AI model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create
            <span className="gradient-text block">Amazing Prompts?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who trust Promptly for their AI prompt needs.
          </p>
          <Link
            href="/dashboard"
            className="bg-electric-blue hover:bg-electric-blue/80 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:glow hover:scale-105 inline-block"
          >
            Start Free Today
          </Link>
        </div>
      </section>

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
            <p>&copy; 2024 Promptly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
