import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

const TopicCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-400 dark:bg-gray-500 rounded"></div>
            <div className="w-16 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
        </div>
        <div className="w-32 h-4 bg-gray-400 dark:bg-gray-500 rounded mt-2"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        
        {/* Headlines Preview Skeleton */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
          <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="space-y-1">
            <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-5/6 h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
        
        {/* Stats Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-8 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-8 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  count = 6, 
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <TopicCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { SkeletonLoader, TopicCardSkeleton };