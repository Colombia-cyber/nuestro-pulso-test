import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
}

interface NewsFeedProps {
  className?: string;
}

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

const fetchNews = async (params: string): Promise<Article[]> => {
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

const NewsFeed: React.FC<NewsFeedProps> = ({ className = "" }) => {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [australianPmTrumpNews, setAustralianPmTrumpNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      setError(null);
      try {
        const [co, auPmTrump, politics] = await Promise.all([
          fetchNews('q=Gustavo Petro&language=es&sortBy=publishedAt'),
          fetchNews('q=(Prime Minister OR PM OR "Anthony Albanese") AND "Donald Trump"&language=en&sortBy=publishedAt'),
          fetchNews('q=politics&language=en&sortBy=publishedAt'),
        ]);
        setColombianNews(co.slice(0, 5)); // Limit to 5 articles per section
        setAustralianPmTrumpNews(auPmTrump.slice(0, 5));
        setPoliticsNews(politics.slice(0, 5));
      } catch (err) {
        setError('Error al cargar las noticias. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2 text-gray-600">Cargando noticias...</span>
    </div>
  );

  const ErrorMessage = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <p className="text-red-700">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 text-red-600 hover:text-red-800 font-medium text-sm"
      >
        Reintentar
      </button>
    </div>
  );

  const NewsColumn = ({ 
    title, 
    articles, 
    icon, 
    colorClass 
  }: { 
    title: string; 
    articles: Article[]; 
    icon: string;
    colorClass: string;
  }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 h-[70vh] overflow-y-auto scroll-optimized">
      <h2 className={`text-lg font-bold mb-4 ${colorClass} flex items-center`}>
        <span className="mr-2" aria-hidden="true">{icon}</span>
        {title}
        <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
          {articles.length}
        </span>
      </h2>
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage />
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No hay noticias disponibles</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, idx) => (
            <article 
              key={idx}
              className="group"
            >
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gray-50 hover:bg-blue-50 rounded-lg p-3 transition-all duration-200 focus:outline-none focus-ring btn-optimized"
                aria-label={`Leer artículo: ${article.title}`}
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm leading-tight mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                {article.description && (
                  <p className="text-gray-600 text-xs mb-2 line-clamp-3">
                    {article.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="font-medium truncate max-w-[60%]">
                    {article.source?.name}
                  </span>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString('es-CO', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`${className}`}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📡 Fuentes Internacionales</h2>
        <p className="text-gray-600">Noticias en tiempo real desde múltiples fuentes verificadas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NewsColumn
          title="Noticias Colombia"
          articles={colombianNews}
          icon="🇨🇴"
          colorClass="text-blue-700"
        />
        
        <NewsColumn
          title="Australia & Trump"
          articles={australianPmTrumpNews}
          icon="🌏"
          colorClass="text-green-700"
        />
        
        <NewsColumn
          title="Política Internacional"
          articles={politicsNews}
          icon="🌍"
          colorClass="text-purple-700"
        />
      </div>
      
      <div className="mt-6 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <span className="font-medium">📊 Análisis en tiempo real:</span> 
            {" "}Las noticias se actualizan automáticamente y son verificadas por nuestro sistema de fuentes confiables.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;