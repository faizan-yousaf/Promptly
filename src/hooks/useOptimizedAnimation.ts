import { useCallback, useMemo, useRef, useEffect } from 'react';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  threshold?: number;
}

export const useOptimizedAnimation = (config: AnimationConfig = {}) => {
  const {
    duration = 1000,
    delay = 0,
    easing = 'ease-out',
    threshold = 0.1
  } = config;
  
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const animationConfig = useMemo(() => ({
    duration,
    delay,
    easing,
    threshold
  }), [duration, delay, easing, threshold]);
  
  const startAnimation = useCallback((element: HTMLElement) => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }
    
    element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing} ${animationConfig.delay}ms`;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, [animationConfig]);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(entry.target as HTMLElement);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: animationConfig.threshold }
    );
    
    observerRef.current.observe(element);
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [startAnimation, animationConfig.threshold]);
  
  return elementRef;
};