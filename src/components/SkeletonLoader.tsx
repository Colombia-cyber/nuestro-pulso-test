import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
  type?: 'topic' | 'video' | 'news' | 'reel';
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

const VideoSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-pulse">
      {/* Video Container */}
      <div className="relative aspect-video bg-slate-700">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
                <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-6 bg-red-600/50 rounded-full"></div>
                <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-slate-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="w-full h-6 bg-slate-700 rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-slate-700 rounded"></div>
          </div>
          <div className="ml-4">
            <div className="w-6 h-6 bg-slate-700 rounded"></div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-32 h-4 bg-slate-700 rounded"></div>
              <div className="w-4 h-4 bg-blue-400/50 rounded"></div>
              <div className="w-16 h-4 bg-green-600/50 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-3 bg-slate-700 rounded"></div>
              <div className="w-20 h-3 bg-slate-700 rounded"></div>
              <div className="w-24 h-3 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-5 bg-slate-700 rounded mb-1 mx-auto"></div>
              <div className="w-12 h-3 bg-slate-700 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-20 h-4 bg-blue-400/30 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReelSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:transform hover:scale-105 transition-all border border-slate-700 animate-pulse">
      <div className="relative aspect-video bg-slate-700">
        <div className="absolute top-2 left-2">
          <div className="w-16 h-5 bg-red-600/50 rounded-full"></div>
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="w-12 h-4 bg-black/60 rounded"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="w-full h-4 bg-slate-700 rounded mb-2"></div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-slate-700 rounded"></div>
          <div className="w-20 h-3 bg-slate-700 rounded"></div>
          <div className="w-4 h-4 bg-blue-400/50 rounded"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-16 h-3 bg-slate-700 rounded"></div>
          <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const NewsSkeleton: React.FC = () => {
  return (
    <div className="news-card p-6 animate-pulse">
      <div className="flex gap-4">
        <div className="w-32 h-24 bg-gray-300 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="flex gap-4">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
            <div className="h-3 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  count = 6, 
  className = "",
  type = "topic"
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'video':
        return <VideoSkeleton />;
      case 'reel':
        return <ReelSkeleton />;
      case 'news':
        return <NewsSkeleton />;
      default:
        return <TopicCardSkeleton />;
    }
  };

  const getGridClass = () => {
    switch (type) {
      case 'video':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8';
      case 'reel':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
      case 'news':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    }
  };

  return (
    <div className={`${getGridClass()} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export { SkeletonLoader, TopicCardSkeleton, VideoSkeleton, ReelSkeleton, NewsSkeleton };