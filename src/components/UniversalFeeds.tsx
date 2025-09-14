import React, { useState, useEffect } from 'react';

interface FeedItem {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  category: string;
  likes: number;
  shares: number;
  comments: number;
  image?: string;
  youtubeId?: string;
  source?: string;
  type: 'article' | 'video' | 'poll' | 'discussion';
}

interface UniversalFeedsProps {
  topic: string;
  className?: string;
}

const UniversalFeeds: React.FC<UniversalFeedsProps> = ({ topic, className = '' }) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null);

  // Mock data generator based on topic
  const generateMockData = (topicName: string): FeedItem[] => {
    const baseItems = [
      {
        id: '1',
        title: `Breaking: New developments in ${topicName}`,
        content: `Recent analysis shows significant changes in ${topicName} policy affecting millions of Colombians...`,
        author: 'El Tiempo',
        timestamp: '2 horas',
        category: topicName,
        likes: 245,
        shares: 89,
        comments: 34,
        youtubeId: 'dQw4w9WgXcQ',
        type: 'video' as const
      },
      {
        id: '2',
        title: `Expert Analysis: ${topicName} Impact on Colombia`,
        content: `Leading experts discuss the long-term implications of recent ${topicName} developments...`,
        author: 'Semana',
        timestamp: '4 horas',
        category: topicName,
        likes: 189,
        shares: 67,
        comments: 28,
        type: 'article' as const
      },
      {
        id: '3',
        title: `Poll: What do you think about ${topicName}?`,
        content: `Share your opinion on the current state of ${topicName} in Colombia`,
        author: 'Nuestro Pulso',
        timestamp: '6 horas',
        category: topicName,
        likes: 312,
        shares: 156,
        comments: 89,
        type: 'poll' as const
      }
    ];

    return baseItems;
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFeedItems(generateMockData(topic));
      setLoading(false);
    }, 1000);
  }, [topic]);

  const handleLike = (itemId: string) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, likes: item.likes + 1 }
          : item
      )
    );
  };

  const handleShare = (itemId: string) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, shares: item.shares + 1 }
          : item
      )
    );
    // Could integrate with Web Share API
    if (navigator.share) {
      const item = feedItems.find(f => f.id === itemId);
      if (item) {
        navigator.share({
          title: item.title,
          text: item.content,
          url: window.location.href
        });
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📰';
      case 'poll': return '📊';
      case 'discussion': return '💬';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'poll': return 'bg-green-100 text-green-800';
      case 'discussion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-300 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {feedItems.map((item) => (
        <div key={item.id} 
             className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getTypeIcon(item.type)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{item.author}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">hace {item.timestamp}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="text-xl">⋯</span>
              </button>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer"
                onClick={() => setSelectedItem(item)}>
              {item.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>

            {/* YouTube Embed */}
            {item.youtubeId && (
              <div className="mb-4">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Engagement */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => handleLike(item.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
                >
                  <span>👍</span>
                  <span className="text-sm font-medium">{item.likes}</span>
                </button>
                <button 
                  onClick={() => handleShare(item.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition"
                >
                  <span>📤</span>
                  <span className="text-sm font-medium">{item.shares}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition">
                  <span>💬</span>
                  <span className="text-sm font-medium">{item.comments}</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition">
                  Leer más
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium transition">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Expanded view modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {selectedItem.youtubeId && (
                <div className="mb-6">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedItem.youtubeId}`}
                      title={selectedItem.title}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedItem.content}</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(selectedItem.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                    >
                      <span>👍</span>
                      <span>{selectedItem.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleShare(selectedItem.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
                    >
                      <span>📤</span>
                      <span>{selectedItem.shares}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                      <span>💬</span>
                      <span>{selectedItem.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalFeeds;