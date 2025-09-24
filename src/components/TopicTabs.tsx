import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaGlobeAmericas, FaFlag, FaFire, FaClock } from 'react-icons/fa';
import { BiNews, BiWorld, BiTrendingUp } from 'react-icons/bi';
import { MdSecurity } from 'react-icons/md';

interface TopicTab {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  color: string;
  isActive?: boolean;
  articleCount?: number;
  isLive?: boolean;
}

interface TopicTabsProps {
  onTopicChange: (topicId: string) => void;
  currentTopic: string;
}

const TopicTabs: React.FC<TopicTabsProps> = ({ onTopicChange, currentTopic }) => {
  const [activeTab, setActiveTab] = useState(currentTopic);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [showAllSources, setShowAllSources] = useState(false);

  const topics: TopicTab[] = [
    {
      id: 'colombia-news',
      title: 'Colombia',
      description: 'Noticias nacionales y política colombiana',
      icon: <FaFlag className="w-5 h-5" />,
      gradient: 'from-yellow-400 via-blue-500 to-red-500',
      color: 'colombia',
      articleCount: 24,
      isLive: true
    },
    {
      id: 'terror-news',
      title: 'Terror News',
      description: 'Noticias de seguridad y terrorismo global',
      icon: <MdSecurity className="w-5 h-5" />,
      gradient: 'from-red-600 to-red-800',
      color: 'red',
      articleCount: 8,
      isLive: true
    },
    {
      id: 'world-left',
      title: 'World Left',
      description: 'Perspectiva progresista mundial',
      icon: <FaGlobeAmericas className="w-5 h-5" />,
      gradient: 'from-green-500 to-teal-600',
      color: 'green',
      articleCount: 15,
      isLive: false
    },
    {
      id: 'trump-global',
      title: 'Donald Trump Global',
      description: 'Noticias y análisis Trump internacional',
      icon: <FaFire className="w-5 h-5" />,
      gradient: 'from-orange-500 to-red-600',
      color: 'orange',
      articleCount: 12,
      isLive: true
    },
    {
      id: 'breaking-news',
      title: 'Breaking News',
      description: 'Noticias de última hora',
      icon: <FaClock className="w-5 h-5" />,
      gradient: 'from-purple-500 to-pink-600',
      color: 'purple',
      articleCount: 6,
      isLive: true
    },
    {
      id: 'trending',
      title: 'Trending',
      description: 'Lo más viral y comentado',
      icon: <BiTrendingUp className="w-5 h-5" />,
      gradient: 'from-indigo-500 to-blue-600',
      color: 'blue',
      articleCount: 19,
      isLive: false
    }
  ];

  // Additional news sources for better visibility
  const newsSourcesInfo = [
    { name: 'El Tiempo', icon: '📰', type: 'Nacional', articles: 8, live: true },
    { name: 'Semana', icon: '📌', type: 'Política', articles: 6, live: false },
    { name: 'El Espectador', icon: '📊', type: 'Análisis', articles: 5, live: true },
    { name: 'Portafolio', icon: '💼', type: 'Economía', articles: 4, live: false },
    { name: 'La República', icon: '🏛️', type: 'Negocios', articles: 3, live: true },
    { name: 'RCN Radio', icon: '📻', type: 'Breaking', articles: 7, live: true },
    { name: 'Contexto Ganadero', icon: '🐄', type: 'Rural', articles: 2, live: false },
    { name: 'CNN Colombia', icon: '📺', type: 'Internacional', articles: 5, live: true }
  ];

  useEffect(() => {
    setActiveTab(currentTopic);
  }, [currentTopic]);

  const handleTabClick = (topicId: string) => {
    setActiveTab(topicId);
    onTopicChange(topicId);
  };

  return (
    <div className="w-full bg-white shadow-lg sticky top-20 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto pb-2 pt-4 gap-3 no-scrollbar">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTabClick(topic.id)}
                className={`flex-shrink-0 relative px-4 py-3 rounded-xl transition-all duration-300 min-w-[140px] ${
                  activeTab === topic.id
                    ? `bg-gradient-to-r ${topic.gradient} text-white shadow-lg transform scale-105`
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {topic.icon}
                  <div className="text-left">
                    <div className="font-bold text-sm">{topic.title}</div>
                    {topic.isLive && activeTab === topic.id && (
                      <div className="flex items-center gap-1 text-xs opacity-90">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                        EN VIVO
                      </div>
                    )}
                  </div>
                </div>
                {topic.articleCount && (
                  <div className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full ${
                    activeTab === topic.id ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {topic.articleCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4 py-6">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTabClick(topic.id)}
              onMouseEnter={() => setHoveredTab(topic.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative group transition-all duration-500 transform hover:-translate-y-2 ${
                activeTab === topic.id ? 'scale-105' : ''
              }`}
            >
              <div className={`relative overflow-hidden rounded-2xl p-6 h-32 ${
                activeTab === topic.id
                  ? `bg-gradient-to-br ${topic.gradient} text-white shadow-2xl`
                  : 'bg-white border-2 border-gray-100 text-gray-700 hover:border-gray-200 hover:shadow-lg'
              }`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 text-4xl opacity-50">
                    {topic.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      activeTab === topic.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {topic.icon}
                    </div>
                    {topic.isLive && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold">LIVE</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-sm mb-1 leading-tight">
                    {topic.title}
                  </h3>
                  
                  <p className={`text-xs leading-tight ${
                    activeTab === topic.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {topic.description}
                  </p>
                </div>

                {/* Article Count Badge */}
                {topic.articleCount && (
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${
                    activeTab === topic.id ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {topic.articleCount}
                  </div>
                )}

                {/* Active Indicator */}
                {activeTab === topic.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-white/80"></div>
                )}

                {/* Hover Effect */}
                {hoveredTab === topic.id && activeTab !== topic.id && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-5 transition-opacity duration-300`}></div>
                )}
              </div>

              {/* Glow Effect for Active Tab */}
              {activeTab === topic.id && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${topic.gradient} opacity-20 blur-xl scale-110 -z-10`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Active Topic Info Bar */}
        {activeTab && (
          <div className="hidden lg:block pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {topics.find(t => t.id === activeTab)?.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BiNews className="w-4 h-4" />
                  <span>{topics.find(t => t.id === activeTab)?.articleCount} artículos</span>
                  {topics.find(t => t.id === activeTab)?.isLive && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-red-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="font-medium">EN VIVO</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAllSources(!showAllSources)}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <span>{showAllSources ? 'Ocultar' : 'Ver'} todas las fuentes</span>
                  <div className={`transform transition-transform ${showAllSources ? 'rotate-180' : ''}`}>
                    ⌄
                  </div>
                </button>
                <div className="text-sm text-gray-500">
                  Última actualización: {new Date().toLocaleTimeString('es-CO', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Sources Grid - Always Visible for Better Discoverability */}
        {showAllSources && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BiNews className="w-5 h-5 text-blue-600" />
                Fuentes de Noticias Disponibles
              </h3>
              <div className="text-sm text-gray-600">
                {newsSourcesInfo.filter(s => s.live).length} fuentes en vivo
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {newsSourcesInfo.map((source, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{source.icon}</div>
                    <div className="font-semibold text-xs text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {source.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{source.type}</div>
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-gray-600">{source.articles}</span>
                      {source.live && (
                        <div className="flex items-center gap-1 text-red-500">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">LIVE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Todas las fuentes son verificadas y actualizadas en tiempo real
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicTabs;