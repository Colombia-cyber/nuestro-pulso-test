import React, { useEffect, useState } from 'react';
import { searchService } from './services/searchService';

type Article = {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
  timestamp: string;
  relevanceScore: number;
  image?: string;
  author?: string;
  region?: string;
  provider?: string;
};

type NewsSection = {
  title: string;
  query: string;
  category?: string;
  region?: string;
  language?: string;
  articles: Article[];
  loading: boolean;
};

export default function NewsFeed() {
  const [newsSections, setNewsSections] = useState<NewsSection[]>([
    {
      title: '🇨🇴 Noticias Colombia',
      query: 'Colombia Gustavo Petro política',
      region: 'colombia',
      language: 'es',
      articles: [],
      loading: true
    },
    {
      title: '🌎 América Latina',
      query: 'América Latina política Trump',
      region: 'latam',
      language: 'es',
      articles: [],
      loading: true
    },
    {
      title: '🏛️ Política Internacional',
      query: 'politics conservative republican election',
      region: 'world',
      language: 'en',
      articles: [],
      loading: true
    },
    {
      title: '📺 Videos Políticos',
      query: 'Colombia política elecciones',
      region: 'colombia',
      language: 'es',
      articles: [],
      loading: true
    }
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [selectedRegion, setSelectedRegion] = useState('colombia');

  // Fetch news for each section
  useEffect(() => {
    const fetchSectionNews = async (sectionIndex: number, section: NewsSection) => {
      try {
        const response = await searchService.search({
          query: section.query,
          page: 1,
          limit: 8,
          region: section.region || selectedRegion,
          language: section.language || selectedLanguage
        });

        setNewsSections(prev => prev.map((s, i) => 
          i === sectionIndex 
            ? { ...s, articles: response.results, loading: false }
            : s
        ));
      } catch (error) {
        console.error(`Failed to fetch news for section ${section.title}:`, error);
        setNewsSections(prev => prev.map((s, i) => 
          i === sectionIndex 
            ? { ...s, loading: false }
            : s
        ));
      }
    };

    // Fetch all sections
    newsSections.forEach((section, index) => {
      fetchSectionNews(index, section);
    });
  }, [selectedLanguage, selectedRegion]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Reset loading state
    setNewsSections(prev => prev.map(section => ({ ...section, loading: true })));
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    // Reset loading state  
    setNewsSections(prev => prev.map(section => ({ ...section, loading: true })));
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  };

  return (
    <div className="flex flex-col gap-4 sticky top-16 z-40 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg font-['Inter']">
      {/* Enhanced News Feed Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
            <span className="text-white text-xl">📰</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Feed Universal de Noticias</h1>
            <p className="text-gray-600 text-sm">
              Cobertura global con priorización colombiana
            </p>
          </div>
        </div>

        {/* Language and Region Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">🗣️</span>
            <select
              value={selectedLanguage}
              onChange={e => handleLanguageChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇺🇸 EN</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">🌍</span>
            <select
              value={selectedRegion}
              onChange={e => handleRegionChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="colombia">🇨🇴 CO</option>
              <option value="latam">🌎 LATAM</option>
              <option value="world">🌍 WORLD</option>
            </select>
          </div>
        </div>
      </div>

      {/* News Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {newsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="w-full h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-[#0033A0]">{section.title}</h2>
              {section.region && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  section.region === 'colombia' ? 'bg-yellow-100 text-yellow-800' :
                  section.region === 'latam' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {section.region === 'colombia' ? '🇨🇴' : 
                   section.region === 'latam' ? '🌎' : '🌍'}
                </span>
              )}
            </div>
            
            {section.loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="text-2xl mb-2 animate-pulse">🔄</div>
                  <p className="text-gray-600 text-sm">Cargando noticias...</p>
                </div>
              </div>
            ) : (
              <>
                {section.articles.length > 0 ? (
                  section.articles.map((article, articleIndex) => (
                    <a 
                      key={`${sectionIndex}-${articleIndex}`} 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white hover:bg-blue-50 rounded-lg p-3 mb-3 shadow transition-all border border-gray-100 hover:border-blue-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0">{article.image || '📰'}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[#EF3340] text-sm mb-1 line-clamp-2">
                            {article.title}
                          </div>
                          <div className="text-gray-700 text-xs mb-2 line-clamp-2">
                            {article.summary}
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="truncate">{article.author || article.source}</span>
                            <span>{formatTimeAgo(article.timestamp)}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-xs px-2 py-1 rounded ${
                              article.category === 'politica' ? 'bg-blue-100 text-blue-700' :
                              article.category === 'internacional' ? 'bg-green-100 text-green-700' :
                              article.category === 'economia' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {article.category}
                            </span>
                            {article.relevanceScore && (
                              <span className="text-xs font-medium text-blue-600">
                                {article.relevanceScore}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-3xl mb-2">📭</div>
                    <p className="text-sm">No hay noticias disponibles</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Source Attribution */}
      <div className="text-center mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          🔍 Powered by Universal Search • Fuentes: NewsAPI, Google, YouTube, Bing News
        </p>
      </div>
    </div>
  );
}