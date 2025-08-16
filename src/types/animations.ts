export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

export interface ScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}