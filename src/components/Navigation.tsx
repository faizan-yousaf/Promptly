"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, User } from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', current: currentPage === 'home' },
    { href: '/about', label: 'About', current: currentPage === 'about' },
    { href: '/pricing', label: 'Pricing', current: currentPage === 'pricing' },
    { href: '/docs', label: 'Docs', current: currentPage === 'docs' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-lg flex items-center justify-center glow-primary">
              <span className="text-black font-bold text-sm">P</span>
            </div>
            <span className="text-2xl font-bold gradient-text-primary group-hover:scale-105 transition-transform glow-text-primary">
              Promptly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  item.current
                    ? 'text-[#0ea5e9] glow-text-primary'
                    : 'text-white/80 hover:text-[#0ea5e9] hover:glow-text-primary'
                }`}
              >
                {item.label}
                {item.current && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-full glow-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
                          <button className="p-2 text-white/60 hover:text-[#0ea5e9] hover:glow-text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0284c7] hover:to-[#0891b2] text-black px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0ea5e9]/25 glow-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-cyan-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.current
                      ? 'text-cyan-400 bg-white/5'
                      : 'text-white/80 hover:text-cyan-400 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
