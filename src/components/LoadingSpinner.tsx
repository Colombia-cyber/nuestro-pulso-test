import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Cargando...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative">
          {/* Colombian flag inspired spinner */}
          <div className={`${sizeClasses[size]} mx-auto mb-4 relative`}>
            <div className="absolute inset-0 border-4 border-yellow-200 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-4 border-blue-200 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 border-4 border-red-200 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 border-t-4 border-yellow-500 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-t-4 border-blue-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 border-t-4 border-red-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>
        </div>
        
        {message && (
          <p className="text-gray-600 font-medium animate-pulse">
            {message}
          </p>
        )}
        
        {/* Progress dots */}
        <div className="flex space-x-1 justify-center mt-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;