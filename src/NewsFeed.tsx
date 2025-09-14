import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

type NewsCategory = {
  id: string;
  title: string;
  query: string;
  color: string;
  icon: string;
};

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

const newsCategories: NewsCategory[] = [
  {
    id: 'crime',
    title: 'Crimen y Seguridad',
    query: '(Colombia AND (crimen OR seguridad OR violencia OR "orden público" OR delincuencia)) OR (crime OR security Colombia)',
    color: 'text-red-600',
    icon: '🚨'
  },
  {
    id: 'drugs',
    title: 'Narcotráfico y Drogas',
    query: '(Colombia AND (narcotráfico OR drogas OR cocaína OR "Pablo Escobar" OR carteles)) OR (drugs OR narcotics OR cocaine Colombia)',
    color: 'text-orange-600',
    icon: '💊'
  },
  {
    id: 'corruption',
    title: 'Corrupción',
    query: '(Colombia AND (corrupción OR transparencia OR "lavado de dinero" OR soborno)) OR (corruption OR transparency Colombia)',
    color: 'text-purple-600',
    icon: '⚖️'
  },
  {
    id: 'elections',
    title: 'Elecciones',
    query: '(Colombia AND (elecciones OR electoral OR candidatos OR "Gustavo Petro" OR política)) OR (elections OR electoral Colombia)',
    color: 'text-blue-600',
    icon: '🗳️'
  },
  {
    id: 'rightwing',
    title: 'Perspectiva Conservadora',
    query: '(Colombia AND (conservador OR "centro democrático" OR "derecha política")) OR ("right wing" OR conservative Colombia politics)',
    color: 'text-indigo-600',
    icon: '🏛️'
  },
  {
    id: 'general',
    title: 'Política General',
    query: 'Colombia AND (política OR gobierno OR congreso OR senado)',
    color: 'text-green-600',
    icon: '🇨🇴'
  }
];

const fetchNews = async (params: string) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?${params}&apiKey=${NEWS_API_KEY}`
    );
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export default function NewsFeed() {
  const [newsData, setNewsData] = useState<{[key: string]: Article[]}>({});
  const [loading, setLoading] = useState<{[key: string]: boolean}>({});
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadCategoryNews = async (category: NewsCategory) => {
    setLoading(prev => ({ ...prev, [category.id]: true }));
    const articles = await fetchNews(
      `q=${encodeURIComponent(category.query)}&language=es,en&sortBy=publishedAt&pageSize=10`
    );
    setNewsData(prev => ({ ...prev, [category.id]: articles }));
    setLoading(prev => ({ ...prev, [category.id]: false }));
  };

  useEffect(() => {
    // Load all categories
    newsCategories.forEach(category => {
      loadCategoryNews(category);
    });
  }, []);

  const filteredCategories = activeFilter === 'all' 
    ? newsCategories 
    : newsCategories.filter(cat => cat.id === activeFilter);

  const filteredArticles = (articles: Article[]) => {
    if (!searchTerm) return articles;
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderNewsCard = (article: Article, idx: number) => (
    <a key={idx} href={article.url} target="_blank" rel="noopener noreferrer"
      className="block bg-white hover:bg-blue-50 rounded-lg p-3 mb-3 shadow-md transition-all duration-200 hover:shadow-lg border-l-4 border-[#EF3340]">
      <div className="font-semibold text-[#0033A0] text-sm mb-1 line-clamp-2">{article.title}</div>
      <div className="text-gray-700 text-xs mt-1 line-clamp-3">{article.description}</div>
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span className="font-medium">{article.source?.name}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString('es-CO')}</span>
      </div>
    </a>
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg font-['Inter'] min-h-[80vh]">
      {/* Header and Controls */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[#0033A0] flex items-center">
          📰 Centro de Noticias Colombia
        </h2>
        
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0033A0] focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'all' 
                ? 'bg-[#0033A0] text-white shadow-md' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📋 Todas las Categorías
          </button>
          {newsCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category.id 
                  ? 'bg-[#EF3340] text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(category => {
          const articles = newsData[category.id] || [];
          const isLoading = loading[category.id];
          const displayArticles = filteredArticles(articles);
          
          return (
            <div key={category.id} className="h-[60vh] overflow-y-auto">
              <h3 className={`text-lg font-bold mb-3 ${category.color} flex items-center sticky top-0 bg-white/95 py-2`}>
                {category.icon} {category.title}
              </h3>
              
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0033A0]"></div>
                  <span className="ml-2 text-gray-600">Cargando...</span>
                </div>
              ) : displayArticles.length === 0 ? (
                <div className="text-gray-500 text-center p-4">
                  {searchTerm ? 'No se encontraron noticias que coincidan con tu búsqueda.' : 'No hay noticias disponibles.'}
                </div>
              ) : (
                displayArticles.slice(0, 8).map((article, idx) => renderNewsCard(article, idx))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}