import React, { useState, useEffect } from 'react';

interface FreshnessIndicatorProps {
  publishedAt: string;
  isLive?: boolean;
  className?: string;
}

const FreshnessIndicator: React.FC<FreshnessIndicatorProps> = ({ 
  publishedAt, 
  isLive = false,
  className = '' 
}) => {
  const [freshness, setFreshness] = useState<string>('');
  const [isVeryFresh, setIsVeryFresh] = useState<boolean>(false);

  const calculateFreshness = (publishedDate: string): { text: string; isVeryFresh: boolean } => {
    const publishDate = new Date(publishedDate);
    const now = new Date();
    const diffMs = now.getTime() - publishDate.getTime();
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let text = '';
    let veryFresh = false;

    if (seconds < 60) {
      text = `hace ${seconds}s`;
      veryFresh = true;
    } else if (minutes < 60) {
      text = `hace ${minutes}m`;
      veryFresh = minutes < 10;
    } else if (hours < 24) {
      text = `hace ${hours}h`;
      veryFresh = hours < 2;
    } else if (days < 7) {
      text = `hace ${days}d`;
    } else {
      text = publishDate.toLocaleDateString('es-CO', { 
        month: 'short', 
        day: 'numeric' 
      });
    }

    return { text, isVeryFresh: veryFresh };
  };

  useEffect(() => {
    const updateFreshness = () => {
      const { text, isVeryFresh } = calculateFreshness(publishedAt);
      setFreshness(text);
      setIsVeryFresh(isVeryFresh);
    };

    updateFreshness();

    // Update every 30 seconds for very fresh content
    const interval = setInterval(updateFreshness, 30000);

    return () => clearInterval(interval);
  }, [publishedAt]);

  const getIndicatorClasses = () => {
    const baseClasses = `
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      transition-all duration-300 ${className}
    `;

    if (isLive) {
      return `${baseClasses} bg-red-100 text-red-800 animate-pulse`;
    }

    if (isVeryFresh) {
      return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
    }

    return `${baseClasses} bg-gray-100 text-gray-600`;
  };

  return (
    <span className={getIndicatorClasses()}>
      {isLive && (
        <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
      )}
      {isVeryFresh && !isLive && (
        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
      )}
      {isLive ? 'EN VIVO' : freshness}
    </span>
  );
};

export default FreshnessIndicator;