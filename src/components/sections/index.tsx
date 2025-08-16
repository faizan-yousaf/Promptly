import { lazy } from 'react';
import React from 'react';

// Lazy load heavy components
export const HeroSection = lazy(() => import('./HeroSection'));
export const FeaturesSection = lazy(() => import('./FeaturesSection'));
export const HowItWorksSection = lazy(() => import('./HowItWorksSection'));
export const CTASection = lazy(() => import('./CTASection'));

// Loading component - using React.createElement to avoid JSX in .ts file
export const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-96 bg-gray-800 rounded-lg mb-8"></div>
  </div>
);