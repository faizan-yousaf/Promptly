import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-sm transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('p-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn('text-xl font-bold text-white', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => {
  return (
    <p
      className={cn('text-gray-300 mt-2', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};