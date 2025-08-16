import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    primary: 'bg-electric-blue/20 text-electric-blue border-electric-blue/30',
    secondary: 'bg-neon-purple/20 text-neon-purple border-neon-purple/30',
    success: 'bg-lime-green/20 text-lime-green border-lime-green/30',
    warning: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-500 border-red-500/30'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};