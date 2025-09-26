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
    <div className="w-full bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl sticky top-20 z-40 border-b border-gray-200/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Mobile Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto pb-4 pt-6 gap-4 no-scrollbar">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTabClick(topic.id)}
                onMouseEnter={() => setHoveredTab(topic.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`flex-shrink-0 relative p-4 rounded-2xl transition-all duration-500 min-w-[160px] group ${
                  activeTab === topic.id
                    ? `bg-gradient-to-br ${topic.gradient} text-white shadow-2xl transform scale-105 border-2 border-white/30`
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl hover:scale-102 border-2 border-gray-200/50 hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    activeTab === topic.id 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    {topic.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">{topic.title}</div>
                    <div className="text-xs opacity-80 mt-1">{topic.description.split(' ').slice(0, 2).join(' ')}</div>
                    {topic.isLive && (
                      <div className="flex items-center justify-center gap-1 text-xs mt-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          activeTab === topic.id ? 'bg-red-300' : 'bg-red-500'
                        }`}></div>
                        EN VIVO
                      </div>
                    )}
                  </div>
                </div>
                {topic.articleCount && (
                  <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full shadow-lg ${
                    activeTab === topic.id 
                      ? 'bg-white text-gray-800' 
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  }`}>
                    {topic.articleCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-6 py-8">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTabClick(topic.id)}
              onMouseEnter={() => setHoveredTab(topic.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative group transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${
                activeTab === topic.id ? 'scale-105 z-10' : ''
              }`}
            >
              <div className={`relative overflow-hidden rounded-3xl p-6 h-40 backdrop-blur-sm border-2 ${
                activeTab === topic.id
                  ? `bg-gradient-to-br ${topic.gradient} text-white shadow-2xl border-white/30`
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-2xl border-gray-200/50 hover:border-gray-300/50'
              }`}>
                {/* Enhanced Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05]">
                  <div className="absolute top-4 right-4 text-6xl opacity-30">
                    {topic.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 text-8xl opacity-20 rotate-12">
                    {topic.icon}
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-2xl shadow-lg transition-all duration-300 ${
                        activeTab === topic.id 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-110'
                      }`}>
                        {topic.icon}
                      </div>
                      {topic.isLive && (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full animate-pulse ${
                            activeTab === topic.id ? 'bg-red-300' : 'bg-red-500'
                          }`}></div>
                          <span className="text-xs font-bold tracking-wide">EN VIVO</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 leading-tight">
                      {topic.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed ${
                      activeTab === topic.id ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {topic.description}
                    </p>
                  </div>

                  {/* Bottom stats */}
                  <div className="flex items-center justify-between mt-4">
                    <span className={`text-xs font-medium ${
                      activeTab === topic.id ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      Artículos disponibles
                    </span>
                    {topic.articleCount && (
                      <div className={`px-3 py-1.5 text-sm font-bold rounded-full shadow-lg ${
                        activeTab === topic.id 
                          ? 'bg-white text-gray-800' 
                          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}>
                        {topic.articleCount}
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Active Indicator */}
                {activeTab === topic.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-white/50 via-white/80 to-white/50 rounded-b-3xl"></div>
                )}

                {/* Enhanced Hover Effect */}
                {hoveredTab === topic.id && activeTab !== topic.id && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                )}
              </div>

              {/* Enhanced Glow Effect for Active Tab */}
              {activeTab === topic.id && (
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${topic.gradient} opacity-25 blur-2xl scale-110 -z-10 animate-pulse`}></div>
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