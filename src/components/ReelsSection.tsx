import React, { useEffect, useState } from "react";
import ErrorFallback from "./ErrorFallback";

interface Reel {
  id: string;
  type: "video" | "image" | "news";
  src: string;
  title: string;
  description?: string;
  link?: string;
  source?: string;
  platform?: string;
  country?: string;
}

// Colombian news sources
const LOCAL_SOURCES = [
  { id: "semana", name: "Semana", url: "https://www.semana.com" },
  { id: "portafolio", name: "Portafolio", url: "https://www.portafolio.co" },
  { id: "eltiempo", name: "El Tiempo", url: "https://www.eltiempo.com" },
  { id: "elespectador", name: "El Espectador", url: "https://www.elespectador.com" },
  { id: "caracol", name: "Caracol", url: "https://www.caracoltv.com" },
  { id: "rcn", name: "RCN", url: "https://www.canalrcn.com" },
];

// Global news sources
const GLOBAL_SOURCES = [
  { id: "bbc", name: "BBC News", url: "https://www.bbc.com/news" },
  { id: "cnn", name: "CNN", url: "https://www.cnn.com" },
  { id: "reuters", name: "Reuters", url: "https://www.reuters.com" },
  { id: "ap", name: "Associated Press", url: "https://apnews.com" },
];

// Social media platforms
const SOCIAL_PLATFORMS = [
  { id: "youtube", name: "YouTube", url: "https://www.youtube.com" },
  { id: "tiktok", name: "TikTok", url: "https://www.tiktok.com" },
];

/**
 * Fetch local (Colombia) reels from various sources
 * In production, this would call actual APIs
 */
const fetchLocalReels = async (): Promise<Reel[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    ...LOCAL_SOURCES.map((src, idx) => ({
      id: `local-news-${src.id}`,
      type: "news" as const,
      src: "",
      title: `Últimas noticias - ${src.name}`,
      description: `Contenido destacado de ${src.name}`,
      link: src.url,
      source: src.name,
      country: "Colombia",
    })),
    ...SOCIAL_PLATFORMS.map((platform, idx) => ({
      id: `local-social-${platform.id}`,
      type: "video" as const,
      src: `https://www.${platform.id}.com/embed/colombia-trending`,
      title: `Tendencias ${platform.name} - Colombia`,
      description: `Videos populares sobre Colombia en ${platform.name}`,
      link: `${platform.url}/results?search_query=Colombia+noticias`,
      platform: platform.name,
      country: "Colombia",
    })),
  ];
};

/**
 * Fetch global/world reels
 * In production, this would call actual APIs
 */
const fetchWorldReels = async (): Promise<Reel[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    ...GLOBAL_SOURCES.map((src, idx) => ({
      id: `world-news-${src.id}`,
      type: "news" as const,
      src: "",
      title: `Latest from ${src.name}`,
      description: `Global news coverage from ${src.name}`,
      link: src.url,
      source: src.name,
      country: "Global",
    })),
    ...SOCIAL_PLATFORMS.map((platform, idx) => ({
      id: `world-social-${platform.id}`,
      type: "video" as const,
      src: `https://www.${platform.id}.com/embed/world-trending`,
      title: `Trending ${platform.name} - World`,
      description: `Popular global videos on ${platform.name}`,
      link: `${platform.url}/results?search_query=world+news`,
      platform: platform.name,
      country: "Global",
    })),
  ];
};

interface ReelsSectionProps {
  context: "local" | "world";
}

/**
 * ReelsSection - Robust video/news reels component
 * 
 * Features:
 * - Supports local (Colombia) and world contexts
 * - Graceful API fallbacks with demo data
 * - Loading and error states
 * - External link handling
 * - Accessible UI with ARIA labels
 * - Optimistic rendering (shows demo data immediately)
 */
export const ReelsSection: React.FC<ReelsSectionProps> = ({ context }) => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with demo data immediately for optimistic UI
  useEffect(() => {
    // Set demo data instantly
    const demoReels: Reel[] = context === "local" 
      ? [
          {
            id: "demo-local-1",
            type: "news",
            src: "",
            title: "Cargando contenido local...",
            description: "Obteniendo las últimas noticias de Colombia",
            link: "#",
            source: "Demo",
            country: "Colombia",
          }
        ]
      : [
          {
            id: "demo-world-1",
            type: "news",
            src: "",
            title: "Loading world content...",
            description: "Fetching global news",
            link: "#",
            source: "Demo",
            country: "Global",
          }
        ];
    
    setReels(demoReels);
  }, [context]);

  // Fetch actual data in background
  useEffect(() => {
    let isMounted = true;
    
    const loadReels = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const fetchedReels = context === "local" 
          ? await fetchLocalReels()
          : await fetchWorldReels();
        
        if (isMounted) {
          setReels(fetchedReels);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error al cargar reels");
          setLoading(false);
        }
      }
    };

    loadReels();

    return () => {
      isMounted = false;
    };
  }, [context]);

  const handleReelClick = (reel: Reel) => {
    if (reel.link && reel.link !== "#") {
      window.open(reel.link, "_blank", "noopener,noreferrer");
    }
  };

  if (error) {
    return (
      <ErrorFallback
        error={error}
        resetError={() => {
          setError(null);
          setLoading(true);
        }}
        title="Error al cargar Reels"
      />
    );
  }

  return (
    <section 
      aria-labelledby="reels-title" 
      className="my-10"
      id="content-panel"
      role="tabpanel"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 
          id="reels-title" 
          className="text-3xl font-bold text-gray-800"
        >
          {context === "local" ? "🇨🇴 Reels Colombia" : "🌍 Reels Mundo"}
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label={`Lista de reels de ${context === "local" ? "Colombia" : "mundo"}`}
      >
        {reels.map((reel) => (
          <div
            key={reel.id}
            role="listitem"
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
            onClick={() => handleReelClick(reel)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleReelClick(reel);
              }
            }}
            tabIndex={0}
            aria-label={`${reel.title} - ${reel.description || 'Ver más'}`}
          >
            {reel.type === "video" && reel.src && reel.src.includes("embed") ? (
              <div className="aspect-video bg-gray-200">
                <iframe
                  src={reel.src}
                  title={reel.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl" aria-hidden="true">
                  {reel.type === "video" ? "📹" : "📰"}
                </span>
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {reel.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {reel.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium">
                  {reel.source || reel.platform}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {reel.country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reels.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No hay reels disponibles en este momento.</p>
          <p className="mt-2">Intenta cambiar de pestaña o recarga la página.</p>
        </div>
      )}
    </section>
  );
};
