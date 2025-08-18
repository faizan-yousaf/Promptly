'use client';

import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
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

      {/* About Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn more about the creator behind this project
            </p>
          </div>

          {/* Profile Card */}
          <div className="flex justify-center">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}