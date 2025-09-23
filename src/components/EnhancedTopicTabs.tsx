import React, { useState, useEffect } from 'react';
import { 
  FaNewspaper, 
  FaGlobeAmericas, 
  FaFlag, 
  FaFire, 
  FaClock,
  FaEye,
  FaHeart,
  FaStar,
  FaBolt,
  FaRobot,
  FaFilter,
  FaSort,
  FaSearch
} from 'react-icons/fa';
import { 
  BiNews, 
  BiWorld, 
  BiTrendingUp, 
  BiTime,
  BiPlus,
  BiMinus
} from 'react-icons/bi';
import { 
  MdSecurity, 
  MdVerified, 
  MdLiveTv,
  MdFilterList,
  MdSort
} from 'react-icons/md';
import useAppStore from '../stores/appStore';

interface AdvancedTopicTab {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  color: string;
  category: 'politics' | 'news' | 'security' | 'world' | 'trending' | 'tech' | 'economy' | 'sports' | 'culture' | 'health';
  isActive?: boolean;
  articleCount: number;
  viewCount: number;
  engagementRate: number;
  isLive: boolean;
  trending: boolean;
  priority: number;
  aiRelevanceScore: number;
  lastUpdated: Date;
  tags: string[];
  relatedTopics: string[];
}

interface EnhancedTopicTabsProps {
  onTopicChange: (topicId: string) => void;
  currentTopic: string;
  multiSelect?: boolean;
  aiRecommendations?: boolean;
  showAnalytics?: boolean;
}

const EnhancedTopicTabs: React.FC<EnhancedTopicTabsProps> = ({ 
  onTopicChange, 
  currentTopic,
  multiSelect = false,
  aiRecommendations = true,
  showAnalytics = true
}) => {
  const { 
    selectedTopics, 
    toggleTopicSelection, 
    clearSelectedTopics,
    addNotification,
    user 
  } = useAppStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'trending' | 'relevance' | 'activity' | 'alphabetical'>('trending');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIRecommendations, setShowAIRecommendations] = useState(aiRecommendations);

  const enhancedTopics: AdvancedTopicTab[] = [
    {
      id: 'colombia-news',
      title: 'Colombia',
      description: 'Noticias nacionales, política colombiana y actualidad local',
      icon: <FaFlag className="w-5 h-5" />,
      gradient: 'from-yellow-400 via-blue-500 to-red-500',
      color: 'colombia',
      category: 'politics',
      articleCount: 156,
      viewCount: 45600,
      engagementRate: 8.4,
      isLive: true,
      trending: true,
      priority: 10,
      aiRelevanceScore: 9.2,
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      tags: ['política', 'gobierno', 'elecciones', 'congreso'],
      relatedTopics: ['elections', 'congress', 'latin-america']
    },
    {
      id: 'terror-news',
      title: 'Seguridad Global',
      description: 'Noticias de seguridad, terrorismo y defensa internacional',
      icon: <MdSecurity className="w-5 h-5" />,
      gradient: 'from-red-600 to-red-800',
      color: 'red',
      category: 'security',
      articleCount: 43,
      viewCount: 23400,
      engagementRate: 6.7,
      isLive: true,
      trending: false,
      priority: 8,
      aiRelevanceScore: 7.8,
      lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      tags: ['seguridad', 'defensa', 'internacional'],
      relatedTopics: ['world-news', 'military', 'intelligence']
    },
    {
      id: 'world-left',
      title: 'Perspectiva Progresista',
      description: 'Análisis progresista y movimientos sociales mundiales',
      icon: <FaGlobeAmericas className="w-5 h-5" />,
      gradient: 'from-green-500 to-teal-600',
      color: 'green',
      category: 'world',
      articleCount: 89,
      viewCount: 34500,
      engagementRate: 7.2,
      isLive: false,
      trending: true,
      priority: 7,
      aiRelevanceScore: 8.1,
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      tags: ['progresismo', 'social', 'derechos'],
      relatedTopics: ['social-movements', 'human-rights', 'environment']
    },
    {
      id: 'trump-global',
      title: 'Trump Global',
      description: 'Noticias y análisis sobre Donald Trump y su impacto global',
      icon: <FaFire className="w-5 h-5" />,
      gradient: 'from-orange-500 to-red-600',
      color: 'orange',
      category: 'politics',
      articleCount: 67,
      viewCount: 56700,
      engagementRate: 9.1,
      isLive: true,
      trending: true,
      priority: 9,
      aiRelevanceScore: 8.8,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      tags: ['trump', 'usa', 'elecciones2024'],
      relatedTopics: ['us-politics', 'elections', 'international-relations']
    },
    {
      id: 'breaking-news',
      title: 'Última Hora',
      description: 'Noticias de última hora y eventos en desarrollo',
      icon: <FaClock className="w-5 h-5" />,
      gradient: 'from-purple-500 to-pink-600',
      color: 'purple',
      category: 'news',
      articleCount: 23,
      viewCount: 78900,
      engagementRate: 12.3,
      isLive: true,
      trending: true,
      priority: 10,
      aiRelevanceScore: 9.5,
      lastUpdated: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      tags: ['última-hora', 'breaking', 'urgente'],
      relatedTopics: ['live-news', 'alerts', 'emergency']
    },
    {
      id: 'trending',
      title: 'Tendencias',
      description: 'Lo más viral, comentado y compartido del momento',
      icon: <BiTrendingUp className="w-5 h-5" />,
      gradient: 'from-indigo-500 to-blue-600',
      color: 'blue',
      category: 'trending',
      articleCount: 134,
      viewCount: 123400,
      engagementRate: 15.6,
      isLive: false,
      trending: true,
      priority: 8,
      aiRelevanceScore: 9.0,
      lastUpdated: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      tags: ['viral', 'trending', 'social'],
      relatedTopics: ['social-media', 'viral-content', 'popular']
    },
    {
      id: 'tech-news',
      title: 'Tecnología',
      description: 'Innovación, inteligencia artificial y tecnología emergente',
      icon: <FaBolt className="w-5 h-5" />,
      gradient: 'from-cyan-400 to-blue-600',
      color: 'cyan',
      category: 'tech',
      articleCount: 78,
      viewCount: 45600,
      engagementRate: 11.2,
      isLive: false,
      trending: true,
      priority: 7,
      aiRelevanceScore: 8.7,
      lastUpdated: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      tags: ['tecnología', 'ai', 'innovación'],
      relatedTopics: ['artificial-intelligence', 'startups', 'digital-transformation']
    },
    {
      id: 'economy',
      title: 'Economía',
      description: 'Análisis económico, mercados y finanzas globales',
      icon: <BiWorld className="w-5 h-5" />,
      gradient: 'from-emerald-500 to-green-600',
      color: 'emerald',
      category: 'economy',
      articleCount: 92,
      viewCount: 38900,
      engagementRate: 6.8,
      isLive: false,
      trending: false,
      priority: 6,
      aiRelevanceScore: 7.5,
      lastUpdated: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      tags: ['economía', 'mercados', 'finanzas'],
      relatedTopics: ['markets', 'cryptocurrency', 'business']
    }
  ];

  // Filter and sort topics
  const filteredTopics = enhancedTopics
    .filter(topic => {
      if (filterCategory !== 'all' && topic.category !== filterCategory) return false;
      if (searchQuery && !topic.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !topic.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.engagementRate - a.engagementRate;
        case 'relevance':
          return b.aiRelevanceScore - a.aiRelevanceScore;
        case 'activity':
          return b.articleCount - a.articleCount;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return b.priority - a.priority;
      }
    });

  // AI-powered recommendations
  const getAIRecommendations = () => {
    const userTopics = user?.preferences.topics || [];
    return enhancedTopics
      .filter(topic => !userTopics.includes(topic.id))
      .sort((a, b) => b.aiRelevanceScore - a.aiRelevanceScore)
      .slice(0, 3);
  };

  const handleTopicClick = (topicId: string) => {
    if (multiSelect) {
      toggleTopicSelection(topicId);
      addNotification({
        type: 'info',
        title: 'Tema actualizado',
        message: `${selectedTopics.includes(topicId) ? 'Removido' : 'Agregado'} a tu selección`,
        read: false
      });
    } else {
      onTopicChange(topicId);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl shadow-lg sticky top-20 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Temas Dinámicos</h2>
            {multiSelect && selectedTopics.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedTopics.length} seleccionados
                </span>
                <button
                  onClick={clearSelectedTopics}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <BiMinus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todas las categorías</option>
              <option value="politics">Política</option>
              <option value="news">Noticias</option>
              <option value="security">Seguridad</option>
              <option value="world">Mundial</option>
              <option value="trending">Tendencias</option>
              <option value="tech">Tecnología</option>
              <option value="economy">Economía</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="trending">🔥 Trending</option>
              <option value="relevance">🤖 IA Relevancia</option>
              <option value="activity">📊 Actividad</option>
              <option value="alphabetical">🔤 Alfabético</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        {showAIRecommendations && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <FaRobot className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Recomendaciones IA</h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {getAIRecommendations().map(topic => (
                <button
                  key={`rec-${topic.id}`}
                  onClick={() => handleTopicClick(topic.id)}
                  className="px-3 py-1 bg-white rounded-full text-sm font-medium text-purple-700 border border-purple-200 hover:bg-purple-50 transition-colors"
                >
                  {topic.icon} {topic.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Topics Grid/List */}
        <div className={`pb-6 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3' 
            : 'space-y-2'
        }`}>
          {filteredTopics.map((topic) => {
            const isActive = multiSelect ? selectedTopics.includes(topic.id) : currentTopic === topic.id;
            
            if (viewMode === 'list') {
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border-2 ${
                    isActive
                      ? `bg-gradient-to-r ${topic.gradient} text-white border-transparent shadow-lg`
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                      {topic.icon}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{topic.title}</h3>
                        {topic.isLive && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold">LIVE</span>
                          </div>
                        )}
                        {topic.trending && <BiTrendingUp className="w-4 h-4 text-orange-500" />}
                      </div>
                      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                        {topic.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <BiNews className="w-4 h-4" />
                        <span>{topic.articleCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="w-4 h-4" />
                        <span>{formatNumber(topic.viewCount)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaHeart className="w-4 h-4" />
                        <span>{topic.engagementRate}%</span>
                      </div>
                      <span className="text-xs opacity-75">
                        {formatTimeAgo(topic.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic.id)}
                className={`relative group transition-all duration-500 transform hover:-translate-y-1 ${
                  isActive ? 'scale-105' : ''
                }`}
              >
                <div className={`relative overflow-hidden rounded-2xl p-4 h-32 border-2 ${
                  isActive
                    ? `bg-gradient-to-br ${topic.gradient} text-white border-transparent shadow-2xl`
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-lg'
                }`}>
                  
                  {/* Live/Trending Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {topic.isLive && (
                      <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    )}
                    {topic.trending && (
                      <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🔥 HOT
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                        {topic.icon}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-sm mb-1 leading-tight line-clamp-2">
                      {topic.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{topic.articleCount}</span>
                      <span className={`${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                        {formatTimeAgo(topic.lastUpdated)}
                      </span>
                    </div>
                  </div>

                  {/* Analytics Bar */}
                  {showAnalytics && (
                    <div className="absolute bottom-0 left-0 right-0 h-1">
                      <div 
                        className={`h-full ${isActive ? 'bg-white/30' : 'bg-blue-500'} transition-all duration-300`}
                        style={{ width: `${Math.min(topic.engagementRate * 8, 100)}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Glow Effect for Active */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${topic.gradient} opacity-20 blur-xl scale-110 -z-10`}></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Topic Summary */}
        {!multiSelect && currentTopic && (
          <div className="pb-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {filteredTopics.find(t => t.id === currentTopic)?.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BiNews className="w-4 h-4" />
                      <span>{filteredTopics.find(t => t.id === currentTopic)?.articleCount} artículos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye className="w-4 h-4" />
                      <span>{formatNumber(filteredTopics.find(t => t.id === currentTopic)?.viewCount || 0)} vistas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="w-4 h-4" />
                      <span>{filteredTopics.find(t => t.id === currentTopic)?.engagementRate}% engagement</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Actualizado: {formatTimeAgo(filteredTopics.find(t => t.id === currentTopic)?.lastUpdated || new Date())}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedTopicTabs;