import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FaPlay, FaEye, FaClock, FaFire, FaSearch, FaTimes, FaFilter, 
  FaChevronRight, FaBookmark, FaShare, FaComment, FaThumbsUp,
  FaGlobe, FaMapMarkerAlt, FaVideo
} from 'react-icons/fa';
import { BiTrendingUp, BiNews, BiCategory } from 'react-icons/bi';
import { MdVerified, MdUpdate, MdPlayArrow } from 'react-icons/md';
import { HiOutlinePlay } from 'react-icons/hi';
import { newsService } from '../services/newsService';
import { 
  NewsItem, 
  NewsFilter, 
  CategoryCard, 
  TrendingSearch, 
  RelatedSearch,
  ModernNewsLayout 
} from '../types/news';

interface ModernNewsFeedProps {
  onNavigate?: (view: string, articleId?: string) => void;
  topic?: string;
}

interface VideoModalProps {
  isOpen: boolean;
  videoUrl?: string;
  title?: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl, title, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>
        <div className="aspect-video bg-black">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              autoPlay
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <FaVideo className="text-4xl mb-2 mx-auto" />
                <p>Video no disponible</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewsCard: React.FC<{
  article: NewsItem;
  size: 'large' | 'medium' | 'small';
  showVideo?: boolean;
  onVideoPlay?: (article: NewsItem) => void;
  onArticleClick?: (article: NewsItem) => void;
}> = ({ article, size, showVideo = true, onVideoPlay, onArticleClick }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return `Hace ${days}d`;
    }
  };

  const getSourceIcon = (source: string) => {
    const sourceIcons: Record<string, string> = {
      'El Tiempo': '📰',
      'El Espectador': '📊',
      'Portafolio': '💼',
      'Semana': '📌',
      'La República': '🏛️',
      'RCN Radio': '📻',
      'Contexto Ganadero': '🐄',
    };
    return sourceIcons[source] || '📰';
  };

  const cardSizeClasses = {
    large: 'col-span-full lg:col-span-2 row-span-2',
    medium: 'col-span-full md:col-span-1',
    small: 'col-span-full'
  };

  const imageSizeClasses = {
    large: 'h-64 lg:h-80',
    medium: 'h-48',
    small: 'h-32'
  };

  const titleSizeClasses = {
    large: 'text-xl lg:text-2xl font-bold',
    medium: 'text-lg font-semibold',
    small: 'text-base font-medium'
  };

  return (
    <article 
      className={`${cardSizeClasses[size]} bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group`}
      onClick={() => onArticleClick?.(article)}
    >
      <div className="relative">
        {article.imageUrl && !imageError ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className={`w-full ${imageSizeClasses[size]} object-cover group-hover:scale-105 transition-transform duration-300`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full ${imageSizeClasses[size]} bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center`}>
            <BiNews className="text-4xl text-blue-300" />
          </div>
        )}
        
        {/* Video Play Button */}
        {article.isVideoContent && showVideo && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVideoPlay?.(article);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
              <HiOutlinePlay className="text-white text-2xl lg:text-3xl" />
            </div>
          </button>
        )}

        {/* Breaking News Badge */}
        {article.isBreaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
            <MdUpdate className="mr-1 text-xs" />
            EN VIVO
          </div>
        )}

        {/* Video Duration */}
        {article.videoDuration && (
          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {article.videoDuration}
          </div>
        )}

        {/* Trending Badge */}
        {article.trending && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white p-2 rounded-full">
            <FaFire className="text-xs" />
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Source and Meta Info */}
        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>{getSourceIcon(typeof article.source === 'string' ? article.source : article.source.name)}</span>
            <span className="font-medium">
              {typeof article.source === 'string' ? article.source : article.source.name}
            </span>
            <span>•</span>
            <span>{formatDate(article.publishedAt)}</span>
            {article.readTime && (
              <>
                <span>•</span>
                <span>{article.readTime}</span>
              </>
            )}
          </div>
          {article.location && (
            <div className="flex items-center space-x-1 text-xs">
              <FaMapMarkerAlt />
              <span>{article.location}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`${titleSizeClasses[size]} mb-2 text-gray-900 line-clamp-3 group-hover:text-blue-600 transition-colors`}>
          {article.title}
        </h3>

        {/* Summary for larger cards */}
        {size !== 'small' && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.summary}
          </p>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Engagement Stats */}
        {article.engagement && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {article.viewCount && (
                <div className="flex items-center space-x-1">
                  <FaEye />
                  <span>{article.viewCount.toLocaleString()}</span>
                </div>
              )}
              {article.engagement.likes && (
                <div className="flex items-center space-x-1">
                  <FaThumbsUp />
                  <span>{article.engagement.likes}</span>
                </div>
              )}
              {article.engagement.comments && (
                <div className="flex items-center space-x-1">
                  <FaComment />
                  <span>{article.engagement.comments}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button className="hover:text-blue-600 transition-colors">
                <FaBookmark />
              </button>
              <button className="hover:text-blue-600 transition-colors">
                <FaShare />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

const TrendingSearches: React.FC<{
  searches: TrendingSearch[];
  onSearchClick: (query: string) => void;
}> = ({ searches, onSearchClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <BiTrendingUp className="mr-2" />
        Búsquedas Trending
      </h3>
      <div className="space-y-2">
        {searches.map((search) => (
          <button
            key={search.id}
            onClick={() => onSearchClick(search.query)}
            className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{search.query}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{search.count.toLocaleString()}</span>
                <div className={`text-xs ${
                  search.trend === 'up' ? 'text-green-600' : 
                  search.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {search.trend === 'up' ? '↗️' : search.trend === 'down' ? '↘️' : '➡️'}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const RelatedSearches: React.FC<{
  searches: RelatedSearch[];
  peopleAlsoSearched: string[];
  onSearchClick: (query: string) => void;
}> = ({ searches, peopleAlsoSearched, onSearchClick }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Búsquedas Relacionadas</h3>
        <div className="flex flex-wrap gap-2">
          {searches.map((search) => (
            <button
              key={search.id}
              onClick={() => onSearchClick(search.query)}
              className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-full text-sm transition-colors"
            >
              {search.query}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">La Gente También Buscó</h3>
        <div className="flex flex-wrap gap-2">
          {peopleAlsoSearched.map((query, index) => (
            <button
              key={index}
              onClick={() => onSearchClick(query)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm transition-colors"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModernNewsFeed: React.FC<ModernNewsFeedProps> = ({ onNavigate, topic = 'colombia-news' }) => {
  const [newsLayout, setNewsLayout] = useState<ModernNewsLayout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'colombia' | 'global'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<NewsItem | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock data - In real implementation, this would come from newsService
  const mockNewsLayout: ModernNewsLayout = {
    mainStories: [
      {
        id: '1',
        title: 'Senado Aprueba Reforma Tributaria con Modificaciones Clave',
        summary: 'El Senado de la República aprobó en primer debate la reforma tributaria tras intensas negociaciones que duraron más de 12 horas.',
        source: 'El Tiempo',
        category: 'Política',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        hasBalancedCoverage: true,
        trending: true,
        perspective: 'both',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop',
        readTime: '4 min',
        author: 'María González',
        tags: ['reforma', 'tributaria', 'senado'],
        viewCount: 15420,
        engagement: { likes: 234, comments: 89, shares: 156 },
        isBreaking: true,
        importance: 'high',
        location: 'Bogotá'
      },
      {
        id: '2',
        title: 'Colombia Anuncia Nueva Estrategia de Transición Energética',
        summary: 'El gobierno presenta un plan ambicioso para reducir la dependencia de combustibles fósiles y aumentar la participación de energías renovables.',
        source: 'Portafolio',
        category: 'Ambiente',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        hasBalancedCoverage: true,
        trending: false,
        perspective: 'both',
        imageUrl: 'https://images.unsplash.com/photo-1497436072909-f5e4f075ab7b?w=800&h=400&fit=crop',
        readTime: '6 min',
        author: 'Carlos Ramírez',
        tags: ['energía', 'renovable', 'ambiente'],
        isVideoContent: true,
        videoDuration: '3:45',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        viewCount: 8750,
        engagement: { likes: 145, comments: 34, shares: 78 },
        location: 'Nacional'
      }
    ],
    sidebarStories: [
      {
        id: '3',
        title: 'Aumenta Inversión Extranjera en Sector Tecnológico',
        summary: 'Empresas multinacionales tecnológicas muestran creciente interés en Colombia.',
        source: 'Semana',
        category: 'Economía',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        hasBalancedCoverage: false,
        trending: false,
        perspective: 'progressive',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
        readTime: '3 min',
        tags: ['tecnología', 'inversión'],
        viewCount: 4230,
        location: 'Medellín'
      },
      {
        id: '4',
        title: 'Nuevo Plan de Seguridad para Zonas Rurales',
        summary: 'Las autoridades presentan estrategias para mejorar la seguridad rural.',
        source: 'RCN Radio',
        category: 'Seguridad',
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        hasBalancedCoverage: true,
        trending: false,
        perspective: 'both',
        readTime: '5 min',
        tags: ['seguridad', 'rural'],
        viewCount: 2150,
        location: 'Nacional'
      }
    ],
    trendingSearches: [
      { id: '1', query: 'reforma tributaria', count: 15420, trend: 'up', category: 'política' },
      { id: '2', query: 'energía renovable colombia', count: 8750, trend: 'up', category: 'ambiente' },
      { id: '3', query: 'inversión extranjera', count: 4230, trend: 'stable', category: 'economía' },
      { id: '4', query: 'seguridad rural', count: 2150, trend: 'down', category: 'seguridad' }
    ],
    relatedSearches: [
      { id: '1', query: 'impuestos colombia 2024', relevance: 0.9 },
      { id: '2', query: 'energía solar colombia', relevance: 0.8 },
      { id: '3', query: 'startups colombia', relevance: 0.7 },
      { id: '4', query: 'paz rural colombia', relevance: 0.6 }
    ],
    peopleAlsoSearched: [
      'gustavo petro noticias',
      'dólar colombia hoy',
      'elecciones regionales 2024',
      'copa américa colombia',
      'clima bogotá'
    ],
    topicCategories: [
      { id: 'política', title: 'Política', description: 'Noticias políticas', color: 'bg-blue-600', icon: '🏛️', count: 47 },
      { id: 'economía', title: 'Economía', description: 'Noticias económicas', color: 'bg-green-600', icon: '📈', count: 32 },
      { id: 'seguridad', title: 'Seguridad', description: 'Noticias de seguridad', color: 'bg-red-600', icon: '🚨', count: 28 }
    ]
  };

  useEffect(() => {
    const loadNewsData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNewsLayout(mockNewsLayout);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNewsData();
  }, [topic, selectedFilter, selectedCategory]);

  const handleVideoPlay = (article: NewsItem) => {
    setSelectedVideo(article);
    setShowVideoModal(true);
  };

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
    // Here you would typically trigger a search
    console.log('Searching for:', query);
  };

  const handleArticleClick = (article: NewsItem) => {
    onNavigate?.('article-comments', article.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <div className="h-80 bg-gray-200 rounded-lg"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!newsLayout) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <BiNews className="mr-3 text-blue-600" />
                Noticias de Colombia
              </h1>
              <p className="text-gray-600 mt-1">
                Última actualización: {lastUpdated.toLocaleTimeString('es-CO', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'colombia' | 'global')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todas</option>
                  <option value="colombia">🇨🇴 Colombia</option>
                  <option value="global">🌍 Global</option>
                </select>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todas las categorías</option>
                  {newsLayout.topicCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main News Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Stories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {newsLayout.mainStories.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  size={index === 0 ? 'large' : 'medium'}
                  onVideoPlay={handleVideoPlay}
                  onArticleClick={handleArticleClick}
                />
              ))}
            </div>

            {/* Secondary Stories */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Más Noticias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsLayout.sidebarStories.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    size="small"
                    showVideo={false}
                    onArticleClick={handleArticleClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrendingSearches 
              searches={newsLayout.trendingSearches}
              onSearchClick={handleSearchClick}
            />
            
            <RelatedSearches
              searches={newsLayout.relatedSearches}
              peopleAlsoSearched={newsLayout.peopleAlsoSearched}
              onSearchClick={handleSearchClick}
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
        onClose={() => {
          setShowVideoModal(false);
          setSelectedVideo(null);
        }}
      />
    </div>
  );
};

export default ModernNewsFeed;