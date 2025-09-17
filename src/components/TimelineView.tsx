import React, { useState, useEffect } from 'react';
import { NewsTimelineData, NewsItem } from '../types/news';
import EnhancedNewsCard from './EnhancedNewsCard';

interface TimelineViewProps {
  timelineData: NewsTimelineData;
  onArticleClick?: (article: NewsItem) => void;
  selectedYear?: number;
  selectedMonth?: string;
  onTimeNavigate?: (year: number, month?: string) => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ 
  timelineData, 
  onArticleClick,
  selectedYear,
  selectedMonth,
  onTimeNavigate
}) => {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [visibleArticles, setVisibleArticles] = useState<{ [key: string]: number }>({});

  const years = Object.keys(timelineData)
    .map(Number)
    .sort((a, b) => b - a); // Most recent first

  useEffect(() => {
    // Auto-expand current year
    const currentYear = new Date().getFullYear();
    if (timelineData[currentYear]) {
      setExpandedYears(new Set([currentYear]));
    } else if (years.length > 0) {
      setExpandedYears(new Set([years[0]]));
    }
  }, [timelineData, years]);

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const loadMoreArticles = (key: string) => {
    setVisibleArticles(prev => ({
      ...prev,
      [key]: (prev[key] || 3) + 5
    }));
  };

  const getMonthOrder = (month: string): number => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return months.indexOf(month.toLowerCase());
  };

  const getTotalArticlesInYear = (year: number): number => {
    const yearData = timelineData[year] || {};
    return Object.values(yearData)
      .reduce((total: number, articles: NewsItem[]) => total + articles.length, 0);
  };

  const getYearStats = (year: number) => {
    const yearData = timelineData[year] || {};
    let progressive = 0;
    let conservative = 0;
    let balanced = 0;

    Object.values(yearData).forEach((articles: NewsItem[]) => {
      articles.forEach((article: NewsItem) => {
        if (article.perspective === 'progressive') progressive++;
        else if (article.perspective === 'conservative') conservative++;
        else if (article.perspective === 'both') balanced++;
      });
    });

    return { progressive, conservative, balanced };
  };

  if (years.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No hay noticias disponibles
        </h3>
        <p className="text-gray-500">
          No se encontraron artículos para mostrar en la línea de tiempo
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📅 Línea de Tiempo de Noticias</h2>
        <p className="text-white/90 mb-4">
          Explora noticias organizadas cronológicamente con perspectivas balanceadas
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">{years.length}</div>
            <div className="text-white/80">Años disponibles</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">
              {Object.values(timelineData).reduce((total, yearData) => 
                total + Object.keys(yearData).length, 0
              )}
            </div>
            <div className="text-white/80">Meses con noticias</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">
              {Object.values(timelineData).reduce((total: number, yearData: { [month: string]: NewsItem[] }) => 
                total + Object.values(yearData).reduce((monthTotal: number, articles: NewsItem[]) => 
                  monthTotal + articles.length, 0
                ), 0
              )}
            </div>
            <div className="text-white/80">Total artículos</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">5 años</div>
            <div className="text-white/80">Historial completo</div>
          </div>
        </div>
      </div>

      {/* Quick Year Navigation */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Navegación Rápida</h3>
        <div className="flex flex-wrap gap-2">
          {years.map(year => {
            const stats = getYearStats(year);
            const isExpanded = expandedYears.has(year);
            
            return (
              <button
                key={year}
                onClick={() => {
                  toggleYear(year);
                  if (onTimeNavigate) {
                    onTimeNavigate(year);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isExpanded
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{year}</span>
                  <span className="text-xs opacity-75">({getTotalArticlesInYear(year)})</span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  {stats.progressive > 0 && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full" title="Progresistas"></div>
                  )}
                  {stats.conservative > 0 && (
                    <div className="w-2 h-2 bg-red-400 rounded-full" title="Conservadoras"></div>
                  )}
                  {stats.balanced > 0 && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full" title="Balanceadas"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="space-y-8">
        {years.map(year => {
          const yearData = timelineData[year];
          const isExpanded = expandedYears.has(year);
          const months = Object.keys(yearData)
            .sort((a, b) => getMonthOrder(b) - getMonthOrder(a)); // Most recent month first

          return (
            <div key={year} className="relative">
              {/* Year Header */}
              <div className="sticky top-20 z-10 bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{year}</span>
                      <span className={`transform transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}>
                        ▶️
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{getTotalArticlesInYear(year)} artículos</span>
                      <span>•</span>
                      <span>{months.length} meses</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const stats = getYearStats(year);
                      return (
                        <>
                          {stats.progressive > 0 && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              🔵 {stats.progressive}
                            </span>
                          )}
                          {stats.conservative > 0 && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              🔴 {stats.conservative}
                            </span>
                          )}
                          {stats.balanced > 0 && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                              ⚖️ {stats.balanced}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </button>
              </div>

              {/* Year Content */}
              {isExpanded && (
                <div className="space-y-6 pl-4 border-l-4 border-gray-200 ml-4">
                  {months.map(month => {
                    const articles = yearData[month];
                    const monthKey = `${year}-${month}`;
                    const visibleCount = visibleArticles[monthKey] || 3;
                    const hasMore = articles.length > visibleCount;

                    return (
                      <div key={month} className="relative">
                        {/* Month Header */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                                📅 {month} {year}
                              </h3>
                              <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                {articles.length} artículo{articles.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            
                            {onTimeNavigate && (
                              <button
                                onClick={() => onTimeNavigate(year, month)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Ver solo este mes →
                              </button>
                            )}
                          </div>
                          
                          {/* Month stats */}
                          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                            <span>
                              🔵 {articles.filter(a => a.perspective === 'progressive' || a.perspective === 'both').length} progresistas
                            </span>
                            <span>
                              🔴 {articles.filter(a => a.perspective === 'conservative' || a.perspective === 'both').length} conservadoras
                            </span>
                            <span>
                              🔥 {articles.filter(a => a.trending).length} trending
                            </span>
                          </div>
                        </div>

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                          {articles.slice(0, visibleCount).map(article => (
                            <EnhancedNewsCard
                              key={article.id}
                              article={article}
                              onArticleClick={onArticleClick}
                              showPerspectiveBadge={true}
                            />
                          ))}
                        </div>

                        {/* Load More Button */}
                        {hasMore && (
                          <div className="text-center">
                            <button
                              onClick={() => loadMoreArticles(monthKey)}
                              className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
                            >
                              Cargar {Math.min(5, articles.length - visibleCount)} artículo{Math.min(5, articles.length - visibleCount) !== 1 ? 's' : ''} más
                              <span className="ml-2">⬇️</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Connecting line for next year */}
              {year !== years[years.length - 1] && (
                <div className="absolute left-6 bottom-0 w-px h-8 bg-gray-300"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="text-2xl mr-3">💡</div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Acerca de la Línea de Tiempo</h3>
            <p className="text-gray-700 text-sm">
              Esta línea de tiempo presenta noticias de los últimos 5 años organizadas cronológicamente. 
              Cada artículo está categorizado por perspectiva política para ofrecer una visión balanceada 
              de los acontecimientos. Los artículos se cargan de forma progresiva para optimizar el rendimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;