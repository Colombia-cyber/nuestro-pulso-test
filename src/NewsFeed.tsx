import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  image?: string;
};

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '27aa99ad66064f04b9ef515c312a78eb';

// Fallback news data when API calls fail
const fallbackNews = {
  colombian: [
    {
      title: "Reforma tributaria avanza en el Congreso",
      description: "La nueva reforma busca aumentar la recaudación fiscal y reducir la evasión tributaria en Colombia.",
      source: { name: "El Tiempo" },
      publishedAt: new Date().toISOString(),
      url: "#",
      image: "🏛️"
    },
    {
      title: "Gustavo Petro presenta plan de gobierno social",
      description: "El presidente anunció nuevas políticas sociales para reducir la pobreza en el país.",
      source: { name: "El Espectador" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "#",
      image: "🇨🇴"
    },
    {
      title: "Avances en el proceso de paz en Colombia",
      description: "Nuevos acuerdos con grupos armados marcan un hito en la búsqueda de la paz total.",
      source: { name: "Semana" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      url: "#",
      image: "🕊️"
    }
  ],
  international: [
    {
      title: "Cumbre Latinoamericana sobre cambio climático",
      description: "Líderes regionales se reúnen para acordar políticas ambientales conjuntas.",
      source: { name: "BBC Mundo" },
      publishedAt: new Date().toISOString(),
      url: "#",
      image: "🌍"
    },
    {
      title: "Nuevos acuerdos comerciales en la región",
      description: "Colombia participa en nuevas alianzas comerciales con países vecinos.",
      source: { name: "Reuters" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "#",
      image: "🤝"
    }
  ],
  politics: [
    {
      title: "Elecciones regionales: preparativos en marcha",
      description: "Los organismos electorales anuncian las fechas y procedimientos para las próximas elecciones.",
      source: { name: "Registraduría" },
      publishedAt: new Date().toISOString(),
      url: "#",
      image: "🗳️"
    },
    {
      title: "Debate sobre reforma política en el Senado",
      description: "Propuestas para modernizar el sistema político colombiano generan debate.",
      source: { name: "W Radio" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "#",
      image: "⚖️"
    }
  ]
};

const fetchNews = async (params: string) => {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?${params}&apiKey=${NEWS_API_KEY}`
    );
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.warn('News API failed, using fallback data:', error);
    return [];
  }
};

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<Article[]>([]);
  const [internationalNews, setInternationalNews] = useState<Article[]>([]);
  const [politicsNews, setPoliticsNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const [co, intl, politics] = await Promise.all([
          fetchNews('q=Colombia+gobierno&language=es&sortBy=publishedAt'),
          fetchNews('q=Latin+America&language=en&sortBy=publishedAt'),
          fetchNews('q=politics+democracy&language=en&sortBy=publishedAt'),
        ]);
        
        // If any API call returns empty, use fallback
        if (co.length === 0 || intl.length === 0 || politics.length === 0) {
          setUsingFallback(true);
          setColombianNews(fallbackNews.colombian);
          setInternationalNews(fallbackNews.international);
          setPoliticsNews(fallbackNews.politics);
        } else {
          setColombianNews(co.slice(0, 6));
          setInternationalNews(intl.slice(0, 6));
          setPoliticsNews(politics.slice(0, 6));
        }
      } catch (error) {
        console.warn('All news APIs failed, using fallback data');
        setUsingFallback(true);
        setColombianNews(fallbackNews.colombian);
        setInternationalNews(fallbackNews.international);
        setPoliticsNews(fallbackNews.politics);
      }
      setLoading(false);
    }
    loadAll();
  }, []);

  const renderNewsSection = (title: string, articles: Article[], color: string) => (
    <div className="lg:w-1/3 w-full">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-lg font-bold ${color}`}>{title}</h2>
            {usingFallback && (
              <span 
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded" 
                title="Contenido de muestra"
                aria-label="Usando contenido de muestra offline"
              >
                📖
              </span>
            )}
          </div>
        </div>
        <div className="h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32 p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-hidden="true"></div>
              <span className="ml-2 text-gray-600">Cargando noticias...</span>
            </div>
          ) : (
            <div role="feed" aria-label={`Noticias de ${title}`}>
              {articles.map((article, idx) => (
                <article 
                  key={idx} 
                  className="block hover:bg-blue-50 p-3 border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:shadow-sm focus-within:bg-blue-50"
                >
                  <div className="flex items-start space-x-3">
                    {article.image && (
                      <div className="text-xl flex-shrink-0 mt-1" aria-hidden="true">{article.image}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 text-xs leading-relaxed mb-2 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="font-medium">{article.source?.name}</span>
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleString('es-CO', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section 
      className="flex flex-col lg:flex-row gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg font-['Inter']"
      aria-label="Centro de noticias cívicas"
    >
      {renderNewsSection("📰 Noticias Colombia", colombianNews, "text-blue-700")}
      {renderNewsSection("🌍 Internacional", internationalNews, "text-green-700")} 
      {renderNewsSection("🏛️ Política", politicsNews, "text-purple-700")}
    </section>
  );
}