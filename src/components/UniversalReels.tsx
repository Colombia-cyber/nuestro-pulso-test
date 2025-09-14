import React, { useState, useEffect } from 'react';

interface ReelItem {
  id: string;
  title: string;
  description: string;
  author: string;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  youtubeId?: string;
  category: string;
  trending?: boolean;
}

interface UniversalReelsProps {
  topic: string;
  className?: string;
}

const UniversalReels: React.FC<UniversalReelsProps> = ({ topic, className = '' }) => {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  // Mock data generator based on topic
  const generateMockReels = (topicName: string): ReelItem[] => {
    const baseReels = [
      {
        id: '1',
        title: `${topicName}: Lo que necesitas saber en 60 segundos`,
        description: `Resumen rápido sobre los aspectos más importantes de ${topicName} en Colombia`,
        author: 'Noticias Express',
        duration: '1:00',
        views: 15420,
        likes: 892,
        thumbnail: getTopicEmoji(topicName),
        youtubeId: 'dQw4w9WgXcQ',
        category: topicName,
        trending: true
      },
      {
        id: '2',
        title: `Expertos hablan sobre ${topicName}`,
        description: `Panel de expertos analiza las tendencias actuales en ${topicName}`,
        author: 'Análisis Colombia',
        duration: '2:30',
        views: 23100,
        likes: 1547,
        thumbnail: getTopicEmoji(topicName),
        youtubeId: 'dQw4w9WgXcQ',
        category: topicName
      },
      {
        id: '3',
        title: `Casos exitosos de ${topicName}`,
        description: `Historias inspiradoras relacionadas con ${topicName} en Colombia`,
        author: 'Historias Colombia',
        duration: '3:15',
        views: 8950,
        likes: 673,
        thumbnail: getTopicEmoji(topicName),
        youtubeId: 'dQw4w9WgXcQ',
        category: topicName
      },
      {
        id: '4',
        title: `Futuro de ${topicName} en Colombia`,
        description: `Perspectivas y proyecciones sobre el desarrollo de ${topicName}`,
        author: 'Futuro Colombia',
        duration: '4:20',
        views: 31200,
        likes: 2156,
        thumbnail: getTopicEmoji(topicName),
        youtubeId: 'dQw4w9WgXcQ',
        category: topicName,
        trending: true
      }
    ];

    return baseReels;
  };

  function getTopicEmoji(topic: string): string {
    const emojiMap: { [key: string]: string } = {
      'crime': '🚔',
      'corruption': '⚖️',
      'employment': '💼',
      'political-issues': '🏛️',
      'sport': '⚽',
      'terrorism': '🛡️',
      'right-wing': '🗳️',
      'economy': '💰',
      'environment': '🌱',
      'education': '📚',
      'health': '🏥',
      'technology': '💻'
    };
    return emojiMap[topic] || '📺';
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReels(generateMockReels(topic));
      setLoading(false);
    }, 800);
  }, [topic]);

  const handleLike = (reelId: string) => {
    setReels(reels => 
      reels.map(reel => 
        reel.id === reelId 
          ? { ...reel, likes: reel.likes + 1 }
          : reel
      )
    );
  };

  const handleView = (reelId: string) => {
    setReels(reels => 
      reels.map(reel => 
        reel.id === reelId 
          ? { ...reel, views: reel.views + 1 }
          : reel
      )
    );
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="bg-gray-300 h-64" />
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {reels.map((reel) => (
          <div key={reel.id} 
               className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
               onClick={() => {
                 setSelectedReel(reel);
                 handleView(reel.id);
               }}>
            {/* Thumbnail */}
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
              {/* Trending badge */}
              {reel.trending && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse z-10">
                  🔥 TRENDING
                </div>
              )}
              
              <div className="text-6xl relative z-10">{reel.thumbnail}</div>
              
              {/* Duration */}
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                {reel.duration}
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                  ▶️
                </div>
              </div>

              {/* Pulse animation for trending */}
              {reel.trending && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {reel.category.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">{reel.author}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {reel.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reel.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <span>👁️</span>
                    <span>{reel.views.toLocaleString()}</span>
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(reel.id);
                    }}
                    className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                  >
                    <span>❤️</span>
                    <span>{reel.likes.toLocaleString()}</span>
                  </button>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Ver ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Reel Modal */}
      {selectedReel && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              {/* Close button */}
              <button 
                onClick={() => setSelectedReel(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-gray-600 hover:text-gray-800 shadow-lg"
              >
                <span className="text-xl">×</span>
              </button>

              {/* Video player */}
              {selectedReel.youtubeId && (
                <div className="relative aspect-video bg-gray-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedReel.youtubeId}?autoplay=1`}
                    title={selectedReel.title}
                    className="absolute inset-0 w-full h-full rounded-t-lg"
                    allowFullScreen
                    allow="autoplay"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {selectedReel.category.toUpperCase()}
                      </span>
                      {selectedReel.trending && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          🔥 TRENDING
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedReel.title}</h2>
                    <p className="text-gray-600">{selectedReel.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <span className="flex items-center space-x-2 text-gray-600">
                      <span>👁️</span>
                      <span>{selectedReel.views.toLocaleString()} views</span>
                    </span>
                    <button 
                      onClick={() => handleLike(selectedReel.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <span>❤️</span>
                      <span>{selectedReel.likes.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <span>📤</span>
                      <span>Compartir</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Por {selectedReel.author} • {selectedReel.duration}
                  </div>
                </div>

                {/* Related Reels */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Reels relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reels
                      .filter(r => r.id !== selectedReel.id)
                      .slice(0, 3)
                      .map((relatedReel) => (
                      <div 
                        key={relatedReel.id}
                        onClick={() => setSelectedReel(relatedReel)}
                        className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{relatedReel.thumbnail}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{relatedReel.title}</h4>
                            <div className="text-xs text-gray-500 mt-1">
                              {relatedReel.author} • {relatedReel.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UniversalReels;