import React, { useState, useEffect } from 'react';
import { 
  FaHeart, FaComment, FaShare, FaUser, FaCalendarAlt, 
  FaHashtag, FaImage, FaVideo, FaNewspaper, FaPin 
} from 'react-icons/fa';

interface FeedItem {
  id: string;
  type: 'post' | 'news' | 'reel';
  content?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  author: {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    verified?: boolean;
  };
  category?: string;
  tags: string[];
  likesCount: number;
  commentsCount?: number;
  sharesCount?: number;
  viewsCount?: number;
  isPinned?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

const PulseFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'posts' | 'news' | 'reels'>('all');

  useEffect(() => {
    loadFeedItems();
  }, [activeFilter]);

  const loadFeedItems = async () => {
    setLoading(true);
    try {
      // Mock data for development - replace with actual API call
      const mockFeedItems: FeedItem[] = [
        {
          id: '1',
          type: 'post',
          content: '¿Qué opinan sobre las nuevas propuestas de transporte público en Bogotá? Es importante que como ciudadanos tengamos voz en estas decisiones que afectan nuestra movilidad diaria. #TransportePúblico #Bogotá',
          author: {
            id: '1',
            username: 'maria_ciudadana',
            displayName: 'María González',
            avatar: '/api/placeholder/40/40',
            verified: true,
          },
          category: 'Transporte',
          tags: ['transporte', 'bogotá', 'movilidad'],
          likesCount: 24,
          commentsCount: 8,
          sharesCount: 3,
          isPinned: true,
          createdAt: '2024-01-15T14:30:00Z',
        },
        {
          id: '2',
          type: 'news',
          title: 'Colombia Avanza en Digitalización de Servicios Gubernamentales',
          description: 'El gobierno nacional presenta nuevos avances en la transformación digital de trámites ciudadanos, reduciendo tiempos y mejorando la eficiencia.',
          imageUrl: '/api/placeholder/600/300',
          author: {
            id: '2',
            username: 'gov_digital',
            displayName: 'Gobierno Digital',
            verified: true,
          },
          category: 'Tecnología',
          tags: ['gobierno', 'digital', 'trámites'],
          viewsCount: 1456,
          likesCount: 89,
          sharesCount: 23,
          isFeatured: true,
          createdAt: '2024-01-15T12:00:00Z',
        },
        {
          id: '3',
          type: 'reel',
          title: 'Cómo Participar en Debates Cívicos',
          description: 'Tips rápidos para participar efectivamente en discusiones sobre temas de interés público.',
          videoUrl: '/api/placeholder/video',
          thumbnailUrl: '/api/placeholder/400/600',
          author: {
            id: '3',
            username: 'civic_teacher',
            displayName: 'Educación Cívica',
            avatar: '/api/placeholder/40/40',
          },
          tags: ['educación', 'cívica', 'participación'],
          viewsCount: 890,
          likesCount: 45,
          sharesCount: 12,
          createdAt: '2024-01-15T10:15:00Z',
        },
      ];

      let filteredItems = mockFeedItems;
      if (activeFilter !== 'all') {
        filteredItems = mockFeedItems.filter(item => item.type === activeFilter);
      }

      setFeedItems(filteredItems);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'hace unos minutos';
    if (diffHours < 24) return `hace ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `hace ${diffDays}d`;
    return date.toLocaleDateString('es-CO');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return <FaNewspaper className="text-blue-600" />;
      case 'reel': return <FaVideo className="text-purple-600" />;
      default: return <FaUser className="text-green-600" />;
    }
  };

  const filters = [
    { id: 'all' as const, label: 'Todo', count: feedItems.length },
    { id: 'posts' as const, label: 'Publicaciones', count: feedItems.filter(i => i.type === 'post').length },
    { id: 'news' as const, label: 'Noticias', count: feedItems.filter(i => i.type === 'news').length },
    { id: 'reels' as const, label: 'Reels', count: feedItems.filter(i => i.type === 'reel').length },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🇨🇴</span>
          Pulso Cívico - Feed Principal
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-6">
        {feedItems.map((item) => (
          <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {item.author.avatar ? (
                      <img
                        src={item.author.avatar}
                        alt={item.author.displayName || item.author.username}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/placeholder/40/40';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">
                        {item.author.displayName || item.author.username}
                      </h3>
                      {item.author.verified && (
                        <span className="text-blue-500">✓</span>
                      )}
                      {item.isPinned && (
                        <FaPin className="text-orange-500 w-3 h-3" />
                      )}
                      {item.isFeatured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Destacado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>@{item.author.username}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                        {formatDate(item.createdAt)}
                      </span>
                      {item.category && (
                        <>
                          <span>•</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {item.title && (
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>
              )}
              
              {item.content && (
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {item.content}
                </p>
              )}
              
              {item.description && (
                <p className="text-gray-600 mb-3">
                  {item.description}
                </p>
              )}

              {/* Media */}
              {item.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Imagen del post'}
                    className="w-full h-auto max-h-96 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/600/300';
                    }}
                  />
                </div>
              )}

              {item.type === 'reel' && item.thumbnailUrl && (
                <div className="mb-3 relative rounded-lg overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                      <FaVideo className="text-gray-800 w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <FaHashtag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <FaHeart className="w-4 h-4" />
                    <span className="text-sm">{item.likesCount}</span>
                  </button>
                  
                  {item.commentsCount !== undefined && (
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <FaComment className="w-4 h-4" />
                      <span className="text-sm">{item.commentsCount}</span>
                    </button>
                  )}
                  
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                    <FaShare className="w-4 h-4" />
                    <span className="text-sm">{item.sharesCount || 0}</span>
                  </button>
                </div>
                
                {item.viewsCount && (
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <span>{item.viewsCount.toLocaleString()} vistas</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Cargar más contenido
        </button>
      </div>
    </div>
  );
};

export default PulseFeed;