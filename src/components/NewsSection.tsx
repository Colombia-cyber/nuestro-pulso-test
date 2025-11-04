import React, { useEffect, useState } from "react";
import ErrorFallback from "./ErrorFallback";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
  category?: string;
}

// Colombian news sources
const LOCAL_NEWS_SOURCES = [
  "El Tiempo",
  "El Espectador",
  "Semana",
  "Portafolio",
  "RCN",
  "Caracol"
];

// Global news sources
const GLOBAL_NEWS_SOURCES = [
  "BBC News",
  "CNN",
  "Reuters",
  "Associated Press",
  "The Guardian"
];

/**
 * Generate demo news articles for immediate display (optimistic UI)
 */
const generateDemoNews = (context: "local" | "world"): NewsArticle[] => {
  const sources = context === "local" ? LOCAL_NEWS_SOURCES : GLOBAL_NEWS_SOURCES;
  const topics = context === "local" 
    ? ["Política", "Economía", "Seguridad", "Cultura"]
    : ["Politics", "Economy", "Technology", "Climate"];

  return sources.slice(0, 4).map((source, idx) => ({
    id: `demo-${context}-${idx}`,
    title: `${topics[idx]}: Cargando últimas noticias...`,
    summary: "Obteniendo las noticias más recientes. Por favor espera...",
    source,
    url: "#",
    publishedAt: new Date().toISOString(),
    category: topics[idx]
  }));
};

/**
 * Fetch local (Colombia) news
 * TODO: Replace with actual API calls to Colombian news sources
 */
const fetchLocalNews = async (): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Demo data - replace with actual API integration
  return [
    {
      id: "local-1",
      title: "Senado aprueba reforma tributaria con modificaciones importantes",
      summary: "El Senado de Colombia aprobó en primer debate la reforma tributaria con cambios significativos que beneficiarán a las pequeñas empresas.",
      source: "El Tiempo",
      url: "https://www.eltiempo.com",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Política"
    },
    {
      id: "local-2",
      title: "Bogotá implementa nuevas medidas para mejorar la movilidad",
      summary: "La alcaldía de Bogotá anunció un plan integral de movilidad que incluye nuevas ciclorrutas y rutas de transporte público.",
      source: "El Espectador",
      url: "https://www.elespectador.com",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Local"
    },
    {
      id: "local-3",
      title: "Inversión extranjera en Colombia aumenta un 15% este año",
      summary: "Datos del DANE revelan un crecimiento significativo en la inversión extranjera, especialmente en el sector tecnológico.",
      source: "Portafolio",
      url: "https://www.portafolio.co",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Economía"
    },
    {
      id: "local-4",
      title: "Colombia avanza en proyectos de energía renovable",
      summary: "El gobierno presenta nuevos proyectos de energía solar y eólica que buscan reducir la dependencia de combustibles fósiles.",
      source: "Semana",
      url: "https://www.semana.com",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Ambiente"
    }
  ];
};

/**
 * Fetch global/world news
 * TODO: Replace with actual API calls to global news sources
 */
const fetchWorldNews = async (): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Demo data - replace with actual API integration
  return [
    {
      id: "world-1",
      title: "Global climate summit reaches historic agreement",
      summary: "World leaders commit to ambitious carbon reduction targets in landmark environmental accord.",
      source: "BBC News",
      url: "https://www.bbc.com/news",
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Climate"
    },
    {
      id: "world-2",
      title: "Technology sector sees major merger announcement",
      summary: "Two tech giants announce merger that could reshape the industry landscape.",
      source: "Reuters",
      url: "https://www.reuters.com",
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Technology"
    },
    {
      id: "world-3",
      title: "Global markets react to new economic data",
      summary: "Stock markets worldwide show mixed reactions to latest economic indicators.",
      source: "Associated Press",
      url: "https://apnews.com",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Economy"
    },
    {
      id: "world-4",
      title: "International cooperation strengthens on health initiatives",
      summary: "Nations unite to address global health challenges with new funding commitment.",
      source: "The Guardian",
      url: "https://www.theguardian.com",
      publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      imageUrl: "/api/placeholder/400/250",
      category: "Health"
    }
  ];
};

interface NewsSectionProps {
  context: "local" | "world";
}

/**
 * NewsSection - News fetching component with local vs global sources
 * 
 * Features:
 * - Context-aware news fetching (local = Colombia, world = global)
 * - Error handling with friendly fallback UI
 * - Optimistic rendering with demo data
 * - Loading states
 * - Accessible news cards
 */
const NewsSection: React.FC<NewsSectionProps> = ({ context }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with demo data for optimistic UI
  useEffect(() => {
    setNews(generateDemoNews(context));
  }, [context]);

  // Fetch actual news in background
  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedNews = context === "local"
          ? await fetchLocalNews()
          : await fetchWorldNews();

        if (isMounted) {
          setNews(fetchedNews);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error al cargar noticias");
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isMounted = false;
    };
  }, [context]);

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
  };

  if (error) {
    return (
      <ErrorFallback
        error={error}
        resetError={() => {
          setError(null);
          setLoading(true);
        }}
        title="Error al cargar noticias"
      />
    );
  }

  return (
    <section 
      aria-labelledby="news-title" 
      className="my-10"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 
          id="news-title" 
          className="text-3xl font-bold text-gray-800"
        >
          {context === "local" ? "📰 Noticias Colombia" : "🌐 Noticias Mundo"}
        </h2>
        {loading && (
          <div 
            className="text-blue-600 font-medium animate-pulse"
            aria-live="polite"
            aria-busy="true"
          >
            Actualizando...
          </div>
        )}
      </div>

      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        role="list"
        aria-label={`Lista de noticias de ${context === "local" ? "Colombia" : "mundo"}`}
      >
        {news.map((article) => (
          <article
            key={article.id}
            role="listitem"
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {article.imageUrl && (
              <div className="aspect-video bg-gray-200">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="p-5">
              {article.category && (
                <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {article.category}
                </span>
              )}
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium">{article.source}</span>
                <time dateTime={article.publishedAt}>
                  {formatTimeAgo(article.publishedAt)}
                </time>
              </div>
              
              {article.url && article.url !== "#" && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Leer más →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {news.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No hay noticias disponibles en este momento.</p>
          <p className="mt-2">Intenta cambiar de pestaña o recarga la página.</p>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
