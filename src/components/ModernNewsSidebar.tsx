import React from 'react';
import { 
  FaFire, 
  FaEye, 
  FaVideo, 
  FaArrowRight, 
  FaPlay,
  FaClock,
  FaMapMarkerAlt,
  FaHashtag
} from 'react-icons/fa';
import { BiTrendingUp, BiNews } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import { NewsItem } from '../types/news';

interface ModernNewsSidebarProps {
  trendingTopics?: Array<{
    id: string;
    name: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
    category: string;
  }>;
  relatedVideos?: Array<{
    id: string;
    title: string;
    source: string;
    duration: string;
    views: number;
    thumbnail: string;
  }>;
  recentNews?: NewsItem[];
  onTopicClick?: (topic: string) => void;
  onVideoClick?: (videoId: string) => void;
  onArticleClick?: (article: NewsItem) => void;
  className?: string;
}

const ModernNewsSidebar: React.FC<ModernNewsSidebarProps> = ({
  trendingTopics = [],
  relatedVideos = [],
  recentNews = [],
  onTopicClick,
  onVideoClick,
  onArticleClick,
  className = ''
}) => {
  const defaultTrendingTopics = [
    { id: '1', name: 'Reforma Tributaria', count: 2547, trend: 'up' as const, category: 'Política' },
    { id: '2', name: 'Transición Energética', count: 1893, trend: 'up' as const, category: 'Ambiente' },
    { id: '3', name: 'a andpi Análisis', count: 1456, trend: 'up' as const, category: 'Nuevos Medios' },
    { id: '4', name: 'Inversión Tecnológica', count: 1234, trend: 'stable' as const, category: 'Economía' },
    { id: '5', name: 'Seguridad Rural', count: 987, trend: 'down' as const, category: 'Seguridad' },
    { id: '6', name: 'Educación Pública', count: 876, trend: 'up' as const, category: 'Educación' },
    { id: '7', name: 'Sistema de Salud', count: 654, trend: 'stable' as const, category: 'Salud' },
    { id: '8', name: 'Infraestructura', count: 543, trend: 'up' as const, category: 'Desarrollo' }
  ];

  const defaultRelatedVideos = [
    {
      id: 'v1',
      title: 'Análisis: Impacto de la Reforma Tributaria en la Clase Media',
      source: 'a andpi',
      duration: '8:32',
      views: 15420,
      thumbnail: '/api/placeholder/120/68'
    },
    {
      id: 'v2',
      title: 'Entrevista: Líderes Comunitarios Hablan sobre Desarrollo Rural',
      source: 'a andpi',
      duration: '12:45',
      views: 8967,
      thumbnail: '/api/placeholder/120/68'
    },
    {
      id: 'v3',
      title: 'En Vivo: Debates del Congreso sobre Política Energética',
      source: 'El Tiempo',
      duration: '45:12',
      views: 23156,
      thumbnail: '/api/placeholder/120/68'
    },
    {
      id: 'v4',
      title: 'Reportaje: Tecnología e Innovación en Colombia',
      source: 'Semana',
      duration: '6:18',
      views: 12043,
      thumbnail: '/api/placeholder/120/68'
    }
  ];

  const topics = trendingTopics.length > 0 ? trendingTopics : defaultTrendingTopics;
  const videos = relatedVideos.length > 0 ? relatedVideos : defaultRelatedVideos;

  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <BiTrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <BiTrendingUp className="w-3 h-3 text-red-500 transform rotate-180" />;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFire className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-900">Tendencias</h3>
          <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
            EN VIVO
          </div>
        </div>
        
        <div className="space-y-3">
          {topics.slice(0, 8).map((topic, index) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
              onClick={() => onTopicClick && onTopicClick(topic.name)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-sm font-medium text-gray-500 w-6">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{topic.category}</span>
                    <span>•</span>
                    <span>{formatViewCount(topic.count)} menciones</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(topic.trend)}
                <FaArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          Ver todas las tendencias
        </button>
      </div>

      {/* Related Videos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaVideo className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold text-gray-900">Videos Relacionados</h3>
        </div>
        
        <div className="space-y-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex gap-3 cursor-pointer group"
              onClick={() => onVideoClick && onVideoClick(video.id)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-24 h-14 object-cover rounded-lg bg-gray-100"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <FaPlay className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    {video.source === 'a andpi' && <MdVerified className="w-3 h-3 text-blue-500" />}
                    {video.source}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaEye className="w-3 h-3" />
                    {formatViewCount(video.views)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          Ver más videos
        </button>
      </div>

      {/* Recent News from Various Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BiNews className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-900">Últimas Noticias</h3>
        </div>
        
        <div className="space-y-4">
          {recentNews.slice(0, 5).map((article) => (
            <div
              key={article.id}
              className="cursor-pointer group"
              onClick={() => onArticleClick && onArticleClick(article)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      📰
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      {typeof article.source === 'string' ? article.source : article.source.name}
                      {(typeof article.source === 'string' ? article.source : article.source.name) === 'a andpi' && 
                        <MdVerified className="w-3 h-3 text-blue-500" />
                      }
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {new Date(article.publishedAt).toLocaleTimeString('es-CO', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          Ver todas las noticias
        </button>
      </div>

      {/* Sources Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MdVerified className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Fuentes Verificadas</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
            <span className="text-2xl">🌟</span>
            <div>
              <div className="font-medium text-gray-900">a andpi</div>
              <div className="text-xs text-gray-600">Nuevo medio verificado</div>
            </div>
            <MdVerified className="w-4 h-4 text-blue-500 ml-auto" />
          </div>
          
          <div className="text-sm text-gray-600 leading-relaxed">
            Todas nuestras fuentes son verificadas y proporcionan perspectivas balanceadas. 
            <strong className="text-blue-600"> a andpi</strong> se une a nuestro ecosistema 
            de medios confiables con análisis profundo y reportajes exclusivos.
          </div>
        </div>
      </div>

      {/* Location-based News */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaMapMarkerAlt className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-bold text-gray-900">Por Región</h3>
        </div>
        
        <div className="space-y-2">
          {[
            { city: 'Bogotá', count: 124 },
            { city: 'Medellín', count: 87 },
            { city: 'Cali', count: 65 },
            { city: 'Barranquilla', count: 43 },
            { city: 'Cartagena', count: 32 }
          ].map((item) => (
            <div
              key={item.city}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onTopicClick && onTopicClick(item.city)}
            >
              <span className="font-medium text-gray-900">{item.city}</span>
              <span className="text-sm text-gray-500">{item.count} noticias</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernNewsSidebar;