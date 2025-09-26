import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaPlay, FaNewspaper, FaTimes, FaSpinner } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

interface RelatedItem {
  id: string;
  title: string;
  summary?: string;
  source: string;
  sourceIcon?: string;
  url: string;
  thumbnail?: string;
  type: 'article' | 'video' | 'reel';
  timestamp: string;
  views?: number;
  isVerified?: boolean;
  author?: {
    name: string;
    verified: boolean;
  };
}

interface RelatedContentProps {
  itemId: string;
  itemType: 'article' | 'video' | 'reel';
  count: number;
  onItemClick?: (item: RelatedItem) => void;
  className?: string;
}

const RelatedContent: React.FC<RelatedContentProps> = ({
  itemId,
  itemType,
  count,
  onItemClick,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Mock function to simulate related content fetching
  const fetchRelatedContent = async (id: string, type: string): Promise<RelatedItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate occasional failures for demonstration
    if (Math.random() < 0.1) {
      throw new Error('Error al cargar contenido relacionado');
    }

    // Mock related content based on type
    const mockContent: RelatedItem[] = [
      {
        id: 'rel-1',
        title: type === 'video' ? 'Análisis Complementario del Debate' : 'Contexto Histórico de la Reforma',
        summary: type === 'video' 
          ? 'Expertos analizan los puntos clave mencionados en el debate presidencial'
          : 'Un recorrido por las reformas tributarias anteriores en Colombia',
        source: 'El Tiempo',
        sourceIcon: '📰',
        url: '#',
        thumbnail: type === 'video' ? 'https://img.youtube.com/vi/example1/hqdefault.jpg' : undefined,
        type: type === 'video' ? 'video' : 'article',
        timestamp: 'Hace 2 horas',
        views: type === 'video' ? 12500 : undefined,
        isVerified: true,
        author: {
          name: type === 'video' ? 'Canal Análisis' : 'María González',
          verified: true
        }
      },
      {
        id: 'rel-2',
        title: type === 'reel' ? 'Reacción Ciudadana en Redes' : 'Impacto Económico Proyectado',
        summary: type === 'reel' 
          ? 'Compilación de las reacciones más importantes en redes sociales'
          : 'Economistas proyectan el impacto de las nuevas medidas fiscales',
        source: type === 'reel' ? 'TikTok Colombia' : 'Portafolio',
        sourceIcon: type === 'reel' ? '🎵' : '💼',
        url: '#',
        thumbnail: type === 'reel' ? 'https://img.youtube.com/vi/example2/hqdefault.jpg' : undefined,
        type: type === 'reel' ? 'reel' : 'article',
        timestamp: 'Hace 4 horas',
        views: type === 'reel' ? 8900 : undefined,
        isVerified: false,
        author: {
          name: type === 'reel' ? '@usuario_activo' : 'Dr. Carlos Ruiz',
          verified: type !== 'reel'
        }
      }
    ];

    return mockContent.slice(0, count);
  };

  const loadRelatedContent = async () => {
    if (hasLoaded) return; // Don't reload if already loaded
    
    setIsLoading(true);
    setError(null);
    
    try {
      const content = await fetchRelatedContent(itemId, itemType);
      setRelatedItems(content);
      setHasLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isExpanded && !hasLoaded) {
      loadRelatedContent();
    }
    setIsExpanded(!isExpanded);
  };

  const handleRetry = () => {
    setError(null);
    setHasLoaded(false);
    loadRelatedContent();
  };

  const handleItemClick = (item: RelatedItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      // Default behavior: open in new tab
      window.open(item.url, '_blank');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <FaPlay className="w-3 h-3" />;
      case 'reel': return <FaPlay className="w-3 h-3" />;
      default: return <FaNewspaper className="w-3 h-3" />;
    }
  };

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
          📝 {count} relacionado{count !== 1 ? 's' : ''}
          {isLoading && <FaSpinner className="w-4 h-4 animate-spin text-blue-500" />}
        </span>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-xs text-red-500">Error</span>
          )}
          {isExpanded ? (
            <FaChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {isLoading && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <FaSpinner className="w-4 h-4 animate-spin" />
                <span className="text-sm">Cargando contenido relacionado...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 text-center">
              <div className="text-red-500 mb-2">
                <FaTimes className="w-5 h-5 mx-auto mb-1" />
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {!isLoading && !error && relatedItems.length === 0 && hasLoaded && (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No se encontró contenido relacionado</p>
            </div>
          )}

          {!isLoading && !error && relatedItems.length > 0 && (
            <div className="divide-y divide-gray-100">
              {relatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex gap-3">
                    {/* Thumbnail for videos/reels */}
                    {item.thumbnail && (
                      <div className="w-16 h-12 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                            {getTypeIcon(item.type)}
                            <span className="text-white text-xs ml-0.5">
                              {item.type === 'video' && '▶'}
                              {item.type === 'reel' && '⚡'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      
                      {item.summary && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {item.summary}
                        </p>
                      )}
                      
                      {/* Meta Info */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <span>{item.sourceIcon}</span>
                          <span>{item.source}</span>
                        </span>
                        
                        {item.author && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {item.author.name}
                              {item.author.verified && <MdVerified className="w-3 h-3 text-blue-400" />}
                            </span>
                          </>
                        )}
                        
                        <span>•</span>
                        <span>{item.timestamp}</span>
                        
                        {item.views && (
                          <>
                            <span>•</span>
                            <span>{formatNumber(item.views)} vistas</span>
                          </>
                        )}
                        
                        {item.isVerified && (
                          <>
                            <span>•</span>
                            <span className="text-green-600">✅ Verificado</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* External Link Icon */}
                    <div className="flex-shrink-0">
                      <FaExternalLinkAlt className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {!isLoading && !error && relatedItems.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Contenido relacionado verificado por nuestro equipo editorial
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RelatedContent;