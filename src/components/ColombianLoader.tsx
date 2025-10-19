import React from 'react';
import { FaFlag } from 'react-icons/fa';

interface ColombianLoaderProps {
  text?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ColombianLoader: React.FC<ColombianLoaderProps> = ({ 
  text = 'Cargando...', 
  fullScreen = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-gradient-to-br from-colombia-yellow/10 via-colombia-blue/10 to-colombia-red/10 backdrop-blur-sm z-50'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        {/* Animated Colombian Flag Spinner */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-colombia-yellow via-colombia-blue to-colombia-red rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className={`relative spinner-colombia ${sizeClasses[size]}`}></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-colombia-gradient animate-pulse">
            {text}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-2 h-2 bg-colombia-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-colombia-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-colombia-red rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SectionLoaderProps {
  title: string;
  count?: number;
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({ title, count = 3 }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-colombia-gradient">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="glass-card p-6 space-y-4 animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-shimmer"></div>
            
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer w-1/2"></div>
            </div>
            
            {/* Text skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer w-5/6"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
