import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaFlag, FaGlobeAmericas, FaFire, FaClock, FaNewspaper, FaUsers } from 'react-icons/fa';
import { MdSecurity, MdTrendingUp } from 'react-icons/md';
import { BiNews } from 'react-icons/bi';

// Colombian News Source Configuration
export interface ColombianNewsSource {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  color: string;
  isLive: boolean;
  articleCount: number;
  category: 'colombia' | 'security' | 'world' | 'trending' | 'breaking';
  sources: string[]; // Actual news sources to filter by
}

// Pre-configured Colombian news sources
export const COLOMBIAN_NEWS_SOURCES: ColombianNewsSource[] = [
  {
    id: 'colombia-nacional',
    name: 'Colombia Nacional',
    shortName: 'Colombia',
    description: 'Noticias nacionales y política colombiana',
    icon: <FaFlag className="w-5 h-5" />,
    gradient: 'from-yellow-400 via-blue-500 to-red-500',
    color: 'colombia',
    isLive: true,
    articleCount: 24,
    category: 'colombia',
    sources: ['El Tiempo', 'Semana', 'El Espectador', 'Portafolio', 'La República']
  },
  {
    id: 'seguridad-colombia',
    name: 'Seguridad Colombia',
    shortName: 'Seguridad',
    description: 'Seguridad nacional y orden público',
    icon: <MdSecurity className="w-5 h-5" />,
    gradient: 'from-red-600 to-red-800',
    color: 'red',
    isLive: true,
    articleCount: 12,
    category: 'security',
    sources: ['RCN Radio', 'El Tiempo', 'El Espectador']
  },
  {
    id: 'mundo-internacional',
    name: 'Internacional',
    shortName: 'Mundial',
    description: 'Noticias internacionales relevantes para Colombia',
    icon: <FaGlobeAmericas className="w-5 h-5" />,
    gradient: 'from-blue-500 to-indigo-600',
    color: 'blue',
    isLive: false,
    articleCount: 18,
    category: 'world',
    sources: ['BBC', 'Reuters', 'Google News Global']
  },
  {
    id: 'tendencias-sociales',
    name: 'Tendencias',
    shortName: 'Trending',
    description: 'Lo más comentado y viral en Colombia',
    icon: <MdTrendingUp className="w-5 h-5" />,
    gradient: 'from-purple-500 to-pink-600',
    color: 'purple',
    isLive: false,
    articleCount: 15,
    category: 'trending',
    sources: ['Semana', 'El Tiempo', 'El Espectador']
  },
  {
    id: 'ultima-hora',
    name: 'Última Hora',
    shortName: 'Breaking',
    description: 'Noticias de última hora y desarrollos en vivo',
    icon: <FaClock className="w-5 h-5" />,
    gradient: 'from-orange-500 to-red-600',
    color: 'orange',
    isLive: true,
    articleCount: 8,
    category: 'breaking',
    sources: ['Redacción', 'El Tiempo', 'RCN Radio', 'Semana']
  },
  {
    id: 'economia-colombia',
    name: 'Economía',
    shortName: 'Economía',
    description: 'Economía nacional, mercados y finanzas',
    icon: <FaNewspaper className="w-5 h-5" />,
    gradient: 'from-green-500 to-teal-600',
    color: 'green',
    isLive: false,
    articleCount: 21,
    category: 'colombia',
    sources: ['Portafolio', 'La República', 'DANE']
  }
];

export interface ColombianNewsTabsProps {
  activeSourceId: string;
  onSourceChange: (sourceId: string) => void;
  className?: string;
}

const ColombianNewsTabs: React.FC<ColombianNewsTabsProps> = ({
  activeSourceId,
  onSourceChange,
  className = ''
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  // Debounced source change handler
  const debouncedSourceChange = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (sourceId: string) => {
        if (isChanging) return; // Prevent rapid clicking
        
        setIsChanging(true);
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
          onSourceChange(sourceId);
          setIsChanging(false);
        }, 150); // 150ms debounce
      };
    })(),
    [onSourceChange, isChanging]
  );

  // Get active source configuration
  const activeSource = useMemo(() => 
    COLOMBIAN_NEWS_SOURCES.find(source => source.id === activeSourceId) || COLOMBIAN_NEWS_SOURCES[0],
    [activeSourceId]
  );

  const handleTabClick = useCallback((sourceId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (sourceId !== activeSourceId && !isChanging) {
      debouncedSourceChange(sourceId);
    }
  }, [activeSourceId, debouncedSourceChange, isChanging]);

  const handleTabKeyDown = useCallback((sourceId: string, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(sourceId, event as any);
    }
  }, [handleTabClick]);

  return (
    <div className={`w-full bg-white shadow-lg sticky top-20 z-40 border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Horizontal Scroll Tabs */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto pb-2 pt-4 gap-3 scrollbar-hide">
            {COLOMBIAN_NEWS_SOURCES.map((source) => (
              <button
                key={source.id}
                onClick={(e) => handleTabClick(source.id, e)}
                onKeyDown={(e) => handleTabKeyDown(source.id, e)}
                disabled={isChanging}
                className={`flex-shrink-0 relative px-4 py-3 rounded-xl transition-all duration-300 min-w-[140px] transform ${
                  activeSourceId === source.id
                    ? `bg-gradient-to-r ${source.gradient} text-white shadow-lg scale-105`
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-102'
                } ${isChanging ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                aria-pressed={activeSourceId === source.id}
                role="tab"
              >
                <div className="flex items-center gap-2">
                  <div className={`transition-transform duration-300 ${
                    activeSourceId === source.id ? 'scale-110' : ''
                  }`}>
                    {source.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">{source.shortName}</div>
                    {source.isLive && activeSourceId === source.id && (
                      <div className="flex items-center gap-1 text-xs opacity-90">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                        EN VIVO
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Article count badge */}
                <div className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold rounded-full transition-colors ${
                  activeSourceId === source.id ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                }`}>
                  {source.articleCount}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4 py-6">
          {COLOMBIAN_NEWS_SOURCES.map((source) => (
            <button
              key={source.id}
              onClick={(e) => handleTabClick(source.id, e)}
              onKeyDown={(e) => handleTabKeyDown(source.id, e)}
              onMouseEnter={() => setHoveredTab(source.id)}
              onMouseLeave={() => setHoveredTab(null)}
              disabled={isChanging}
              className={`relative group transition-all duration-500 transform hover:-translate-y-2 ${
                activeSourceId === source.id ? 'scale-105' : ''
              } ${isChanging ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-pressed={activeSourceId === source.id}
              role="tab"
            >
              <div className={`relative overflow-hidden rounded-2xl p-6 h-32 transition-all duration-300 ${
                activeSourceId === source.id
                  ? `bg-gradient-to-br ${source.gradient} text-white shadow-2xl`
                  : 'bg-white border-2 border-gray-100 text-gray-700 hover:border-gray-200 hover:shadow-lg'
              }`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 text-4xl opacity-50">
                    {source.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg transition-colors ${
                      activeSourceId === source.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {source.icon}
                    </div>
                    {source.isLive && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold">LIVE</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-sm mb-1 leading-tight">
                    {source.name}
                  </h3>
                  
                  <p className={`text-xs leading-tight ${
                    activeSourceId === source.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {source.description}
                  </p>
                </div>

                {/* Article Count Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full transition-colors ${
                  activeSourceId === source.id ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                }`}>
                  {source.articleCount}
                </div>

                {/* Active Indicator */}
                {activeSourceId === source.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-white/80"></div>
                )}

                {/* Hover Effect */}
                {hoveredTab === source.id && activeSourceId !== source.id && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${source.gradient} opacity-5 transition-opacity duration-300`}></div>
                )}
              </div>

              {/* Glow Effect for Active Tab */}
              {activeSourceId === source.id && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${source.gradient} opacity-20 blur-xl scale-110 -z-10`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Active Source Info Bar */}
        <div className="hidden lg:block pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900">
                {activeSource.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BiNews className="w-4 h-4" />
                <span>{activeSource.articleCount} artículos</span>
                {activeSource.isLive && (
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
            
            <div className="text-sm text-gray-500">
              Última actualización: {new Date().toLocaleTimeString('es-CO', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay when changing */}
      {isChanging && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default ColombianNewsTabs;