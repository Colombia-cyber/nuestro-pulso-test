import React, { useState, useEffect } from 'react';
import { FaSearch, FaUsers, FaChartLine, FaArrowRight, FaHistory } from 'react-icons/fa';
import { BiPoll, BiTrendingUp } from 'react-icons/bi';
import { MdLiveTv, MdTopic } from 'react-icons/md';
import { IoMdStats } from 'react-icons/io';
import UniversalSearchBar from '../components/UniversalSearchBar';
import FeaturedTopics from '../components/FeaturedTopics';
import { NewsTopic } from '../config/newsTopics';
import { TopicNewsResponse } from '../services/topicNewsService';

interface ModernHomepageProps {
  onNavigate: (view: string) => void;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  action: string;
  count?: string;
  trend?: 'up' | 'down' | 'stable';
}



const ModernHomepage: React.FC<ModernHomepageProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveStats, setLiveStats] = useState({
    onlineUsers: 2847,
    activePolls: 12,
    newsUpdates: 47,
    discussions: 156
  });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<'local' | 'world'>('local');
  const [currentTopicNews, setCurrentTopicNews] = useState<{topic: NewsTopic, news: TopicNewsResponse} | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Update stats
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10) - 5,
        activePolls: prev.activePolls + Math.floor(Math.random() * 3) - 1,
        newsUpdates: prev.newsUpdates + Math.floor(Math.random() * 5),
        discussions: prev.discussions + Math.floor(Math.random() * 8) - 2
      }));
    }, 15000);

    // Load initial data
    setIsVisible(true);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);



  const quickActions: QuickAction[] = [
    {
      id: 'search',
      title: 'Búsqueda Universal',
      description: 'Explora mundo y Colombia',
      icon: '🔍',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      action: 'search',
      count: 'Mundial + Local'
    },
    {
      id: 'news',
      title: 'Noticias',
      description: 'Información balanceada',
      icon: '📰',
      gradient: 'from-green-500 via-teal-500 to-blue-500',
      action: 'feeds',
      count: '+47 hoy',
      trend: 'up'
    },
    {
      id: 'polls',
      title: 'Encuestas',
      description: 'Voz ciudadana',
      icon: '📊',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      action: 'surveys',
      count: '12 activas',
      trend: 'up'
    },
    {
      id: 'debates',
      title: 'Debates',
      description: 'Conversación cívica',
      icon: '🗣️',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      action: 'debates',
      count: '156 activos',
      trend: 'up'
    },
    {
      id: 'congress',
      title: 'Congreso',
      description: 'Seguimiento legislativo',
      icon: '🏛️',
      gradient: 'from-indigo-500 via-blue-500 to-teal-500',
      action: 'congress',
      count: 'En sesión'
    },
    {
      id: 'reels',
      title: 'Reels',
      description: 'Videos informativos',
      icon: '🎬',
      gradient: 'from-pink-500 via-rose-500 to-orange-500',
      action: 'reels',
      count: '156 videos'
    }
  ];

  const handleQuickAction = (action: string) => {
    onNavigate(action);
  };

  const handleSearch = (query: string, category: 'local' | 'world', topic?: NewsTopic) => {
    // Navigate to search with query parameters
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('category', category);
    if (topic) {
      params.set('topic', topic.id);
    }
    window.history.pushState(null, '', `/search?${params.toString()}`);
    onNavigate('search');
  };

  const handleTopicSelect = (topic: NewsTopic) => {
    // Can be used for analytics or other actions when a topic is selected
    console.log('Topic selected:', topic);
  };

  const handlePriorityTopicSelect = (topic: NewsTopic, category: 'local' | 'world') => {
    // Navigate to search with the specific topic and category
    const params = new URLSearchParams();
    params.set('q', topic.name);
    params.set('category', category);
    params.set('topic', topic.id);
    window.history.pushState(null, '', `/search?${params.toString()}`);
    onNavigate('feeds'); // Navigate to the feeds view to show news
  };

  const handleNewsUpdate = (newsData: TopicNewsResponse, topic: NewsTopic) => {
    // Store the current topic news data for potential use
    setCurrentTopicNews({ topic, news: newsData });
    
    // Update live stats based on the news data
    setLiveStats(prev => ({
      ...prev,
      newsUpdates: newsData.totalCount,
      activePolls: prev.activePolls + Math.floor(Math.random() * 3),
    }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'America/Bogota'
    });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-float animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Live Status */}
            <div className="flex justify-center mb-8">
              <div className="glass-modern px-6 py-3 rounded-full border border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">EN VIVO</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">Bogotá {formatTime(currentTime)}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm font-medium text-blue-600">{liveStats.onlineUsers.toLocaleString()} en línea</span>
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-none">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nuestro Pulso
                </span>
              </h1>
              
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                La plataforma cívica líder de 
                <span className="font-semibold bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 bg-clip-text text-transparent"> Colombia</span>
              </p>
              
              <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                Únete a <span className="font-bold text-blue-600">{liveStats.onlineUsers.toLocaleString()}</span> ciudadanos 
                construyendo el futuro del país a través de participación democrática, debates informados y noticias balanceadas.
              </p>
            </div>

            {/* Universal Search */}
            <div className="max-w-4xl mx-auto mb-16">
              <UniversalSearchBar
                onSearch={handleSearch}
                onTopicSelect={handleTopicSelect}
                placeholder="Buscar en Colombia y el mundo..."
                autoFocus={false}
                className="shadow-2xl"
              />
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
              {[
                { icon: '👥', value: liveStats.onlineUsers.toLocaleString(), label: 'Usuarios activos', color: 'blue' },
                { icon: '📊', value: liveStats.activePolls, label: 'Encuestas vivas', color: 'purple' },
                { icon: '📰', value: liveStats.newsUpdates, label: 'Noticias hoy', color: 'green' },
                { icon: '💬', value: liveStats.discussions, label: 'Debates abiertos', color: 'orange' }
              ].map((stat, index) => (
                <div key={index} className="glass-modern rounded-2xl p-6 text-center border border-white/20 backdrop-blur-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl font-bold mb-1 text-${stat.color}-600`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className={`relative py-16 transition-all duration-1000 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Acceso Directo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Navega rápidamente a cualquier sección de la plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quickActions.map((action, index) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className={`group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${action.gradient} text-white`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{action.icon}</div>
                    {action.trend && (
                      <div className="text-sm font-bold px-2 py-1 bg-white/20 rounded-full">
                        {action.trend === 'up' ? '📈' : '📊'}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
                  <p className="text-white/90 mb-4 text-lg">{action.description}</p>
                  
                  {action.count && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                        {action.count}
                      </span>
                      <FaArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Priority Topics */}
      <div className={`relative py-16 bg-white/50 backdrop-blur-sm transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <button
                onClick={() => setSelectedNewsCategory('local')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedNewsCategory === 'local'
                    ? 'bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🇨🇴 Colombia
              </button>
              <button
                onClick={() => setSelectedNewsCategory('world')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedNewsCategory === 'world'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🌍 Mundo
              </button>
            </div>
          </div>

          <FeaturedTopics
            onTopicSelect={handlePriorityTopicSelect}
            selectedCategory={selectedNewsCategory}
            className="mb-12"
            onNewsUpdate={handleNewsUpdate}
          />

          {/* Topic News Preview */}
          {currentTopicNews && (
            <div className="mb-12 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`text-3xl p-3 rounded-2xl bg-gradient-to-br ${currentTopicNews.topic.color} text-white shadow-lg`}>
                    {currentTopicNews.topic.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Noticias sobre {currentTopicNews.topic.name}
                    </h3>
                    <p className="text-gray-600">
                      {selectedNewsCategory === 'local' ? 'Colombia y Sudamérica' : 'Perspectiva Mundial'} • 
                      {currentTopicNews.news.totalCount} artículos encontrados
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handlePriorityTopicSelect(currentTopicNews.topic, selectedNewsCategory)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Ver todas las noticias
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTopicNews.news.articles.slice(0, 3).map((article, index) => (
                  <div 
                    key={article.id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => handlePriorityTopicSelect(currentTopicNews.topic, selectedNewsCategory)}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {typeof article.source === 'string' ? article.source : article.source.name}
                      </div>
                      {article.trending && (
                        <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1">
                          <BiTrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.readTime}</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('es-CO')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tu Voz Construye Colombia
            </h2>
            
            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
              Participa en la conversación nacional. Vota, debate, opina y ayuda a construir 
              un futuro mejor para todos los colombianos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleQuickAction('surveys')}
                className="group bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <BiPoll className="w-6 h-6" />
                  Participar en Encuestas
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={() => handleQuickAction('community-hub')}
                className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <FaUsers className="w-6 h-6" />
                  Únete a la Comunidad
                  <FaArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHomepage;