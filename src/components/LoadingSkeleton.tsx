import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'hero' | 'grid' | 'article';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'card', 
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg h-96 mb-8">
              <div className="flex flex-col justify-center items-center h-full p-8">
                <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-white/15 rounded w-1/2 mb-6"></div>
                <div className="h-12 bg-white/10 rounded-lg w-64"></div>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className={`animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}>
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                <div className="flex space-x-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`animate-pulse border-b border-gray-200 dark:border-gray-700 py-4 ${className}`}>
            <div className="flex space-x-3">
              <div className="h-3 w-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-1"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );

      case 'grid':
        return (
          <div className={`animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
            <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        );

      case 'article':
        return (
          <div className={`animate-pulse p-6 ${className}`}>
            {/* Title */}
            <div className="space-y-3 mb-6">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
            
            {/* Meta info */}
            <div className="flex space-x-4 mb-6">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
            
            {/* Image */}
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg mb-6"></div>
            
            {/* Content paragraphs */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`animate-pulse bg-gray-300 dark:bg-gray-600 rounded h-20 ${className}`}></div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="mb-4">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;

// Specialized skeleton components
export const NewsCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => (
  <LoadingSkeleton variant="card" count={count} />
);

export const NewsGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }, (_, index) => (
      <LoadingSkeleton key={index} variant="grid" />
    ))}
  </div>
);

export const NewsListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="space-y-2">
    <LoadingSkeleton variant="list" count={count} />
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <LoadingSkeleton variant="hero" />
);

export const ArticleContentSkeleton: React.FC = () => (
  <LoadingSkeleton variant="article" />
);