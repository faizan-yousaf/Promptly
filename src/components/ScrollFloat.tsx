'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFloatProps {
  children: React.ReactNode;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  className?: string;
}

export default function ScrollFloat({
  children,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  className = ''
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    // Split text into individual characters
    const text = typeof children === 'string' ? children : textElement.textContent || '';
    const chars = text.split('');
    
    // Clear the original text and create spans for each character
    textElement.innerHTML = '';
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100px) rotateX(-90deg)';
      textElement.appendChild(span);
    });

    const charElements = textElement.querySelectorAll('span');

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: scrollStart,
        end: scrollEnd,
        scrub: 1,
        markers: false // Set to true for debugging
      }
    });

    // Animate each character with stagger
    tl.to(charElements, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: animationDuration,
      ease: ease,
      stagger: stagger
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div ref={containerRef} className={`scroll-float-container ${className}`}>
      <div ref={textRef} className="scroll-float-text">
        {children}
      </div>
    </div>
  );
}