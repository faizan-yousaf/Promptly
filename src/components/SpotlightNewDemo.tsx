"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import Link from "next/link";

export function SpotlightNewDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Promptly
              </span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-6">
              Transform your ideas into professional prompts with advanced AI technology. Multilingual support for global reach.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-cyan-600 hover:to-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-white text-sm group-hover:scale-110 transition-transform duration-300">𝕏</span>
              </a>
              <a href="#" className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-white text-sm group-hover:scale-110 transition-transform duration-300">in</span>
              </a>
              <a href="#" className="group relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-700 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-white text-sm group-hover:scale-110 transition-transform duration-300">📧</span>
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
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
              />
              <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 group">
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8">
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
    </div>
  );
}