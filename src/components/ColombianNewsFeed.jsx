import React, { useState, useEffect } from 'react';
import { FaNewspaper, FaCalendarAlt, FaExternalLinkAlt, FaImage, FaSpinner, FaExclamationTriangle, FaRss, FaGlobe } from 'react-icons/fa';

/**
 * Colombian News Feed Component
 * 
 * Aggregates multi-source Colombian news RSS feeds from major media outlets:
 * - El Tiempo (multiple sections)
 * - Semana (various categories)
 * - Noticias Caracol (news sections)
 * - Noticias RCN (different feeds)
 * 
 * Features:
 * - Provider, section, and subsection filtering via dropdowns
 * - RSS XML parsing using fetch and DOMParser
 * - Robust error handling and loading indicators
 * - Date formatting in es-CO locale
 * - Image display from RSS enclosures
 * - Selected feed URL reference display
 */
const ColombianNewsFeed = () => {
  // Component state
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('eltiempo');
  const [selectedSection, setSelectedSection] = useState('nacional');
  const [selectedSubsection, setSelectedSubsection] = useState('');
  const [currentFeedUrl, setCurrentFeedUrl] = useState('');

  /**
   * RSS Feed Configuration
   * Organized by provider with sections and subsections
   */
  const rssFeeds = {
    eltiempo: {
      name: 'El Tiempo',
      baseUrl: 'https://www.eltiempo.com',
      sections: {
        nacional: {
          name: 'Nacional',
          url: 'https://www.eltiempo.com/rss/nacional.xml',
          subsections: {
            '': 'Todas las noticias nacionales',
            politica: 'Política',
            justicia: 'Justicia',
            congreso: 'Congreso'
          }
        },
        internacional: {
          name: 'Internacional',
          url: 'https://www.eltiempo.com/rss/internacional.xml',
          subsections: {
            '': 'Todas las noticias internacionales',
            america: 'América',
            europa: 'Europa',
            asia: 'Asia'
          }
        },
        economia: {
          name: 'Economía',
          url: 'https://www.eltiempo.com/rss/economia.xml',
          subsections: {
            '': 'Todas las noticias económicas',
            sectores: 'Sectores',
            finanzas: 'Finanzas',
            empresas: 'Empresas'
          }
        },
        opinion: {
          name: 'Opinión',
          url: 'https://www.eltiempo.com/rss/opinion.xml',
          subsections: {
            '': 'Todas las opiniones',
            columnistas: 'Columnistas',
            editorial: 'Editorial'
          }
        },
        deportes: {
          name: 'Deportes',
          url: 'https://www.eltiempo.com/rss/deportes.xml',
          subsections: {
            '': 'Todos los deportes',
            futbol: 'Fútbol',
            ciclismo: 'Ciclismo'
          }
        },
        tecnologia: {
          name: 'Tecnología',
          url: 'https://www.eltiempo.com/rss/tecnosfera.xml',
          subsections: {
            '': 'Todas las noticias de tecnología',
            innovacion: 'Innovación',
            dispositivos: 'Dispositivos'
          }
        }
      }
    },
    semana: {
      name: 'Semana',
      baseUrl: 'https://www.semana.com',
      sections: {
        nacion: {
          name: 'Nación',
          url: 'https://www.semana.com/rss/nacion.xml',
          subsections: {
            '': 'Todas las noticias nacionales',
            politica: 'Política',
            gobierno: 'Gobierno',
            congreso: 'Congreso'
          }
        },
        internacional: {
          name: 'Internacional',
          url: 'https://www.semana.com/rss/mundo.xml',
          subsections: {
            '': 'Todas las noticias internacionales',
            latinoamerica: 'Latinoamérica',
            estadosunidos: 'Estados Unidos',
            europa: 'Europa'
          }
        },
        economia: {
          name: 'Economía',
          url: 'https://www.semana.com/rss/economia.xml',
          subsections: {
            '': 'Todas las noticias económicas',
            empresas: 'Empresas',
            finanzas: 'Finanzas'
          }
        },
        cultura: {
          name: 'Cultura',
          url: 'https://www.semana.com/rss/cultura.xml',
          subsections: {
            '': 'Todas las noticias culturales',
            arte: 'Arte',
            literatura: 'Literatura'
          }
        }
      }
    },
    caracol: {
      name: 'Noticias Caracol',
      baseUrl: 'https://noticias.caracoltv.com',
      sections: {
        colombia: {
          name: 'Colombia',
          url: 'https://noticias.caracoltv.com/rss/colombia.xml',
          subsections: {
            '': 'Todas las noticias de Colombia',
            bogota: 'Bogotá',
            antioquia: 'Antioquia',
            valle: 'Valle del Cauca'
          }
        },
        internacional: {
          name: 'Internacional',
          url: 'https://noticias.caracoltv.com/rss/internacional.xml',
          subsections: {
            '': 'Todas las noticias internacionales',
            latinoamerica: 'Latinoamérica',
            mundial: 'Mundial'
          }
        },
        economia: {
          name: 'Economía',
          url: 'https://noticias.caracoltv.com/rss/economia.xml',
          subsections: {
            '': 'Todas las noticias económicas',
            negocios: 'Negocios'
          }
        },
        deportes: {
          name: 'Deportes',
          url: 'https://noticias.caracoltv.com/rss/deportes.xml',
          subsections: {
            '': 'Todos los deportes',
            futbol: 'Fútbol'
          }
        }
      }
    },
    rcn: {
      name: 'Noticias RCN',
      baseUrl: 'https://www.noticiasrcn.com',
      sections: {
        nacional: {
          name: 'Nacional',
          url: 'https://www.noticiasrcn.com/rss/nacional.xml',
          subsections: {
            '': 'Todas las noticias nacionales',
            bogota: 'Bogotá',
            regiones: 'Regiones'
          }
        },
        internacional: {
          name: 'Internacional',
          url: 'https://www.noticiasrcn.com/rss/internacional.xml',
          subsections: {
            '': 'Todas las noticias internacionales',
            venezuela: 'Venezuela',
            latinoamerica: 'Latinoamérica'
          }
        },
        economia: {
          name: 'Economía',
          url: 'https://www.noticiasrcn.com/rss/economia.xml',
          subsections: {
            '': 'Todas las noticias económicas',
            empleo: 'Empleo',
            empresas: 'Empresas'
          }
        },
        deportes: {
          name: 'Deportes',
          url: 'https://www.noticiasrcn.com/rss/deportes.xml',
          subsections: {
            '': 'Todos los deportes',
            futbol: 'Fútbol',
            ciclismo: 'Ciclismo'
          }
        },
        entretenimiento: {
          name: 'Entretenimiento',
          url: 'https://www.noticiasrcn.com/rss/entretenimiento.xml',
          subsections: {
            '': 'Todo el entretenimiento',
            musica: 'Música',
            television: 'Televisión'
          }
        }
      }
    }
  };

  /**
   * Effect to load feed when provider or section changes
   */
  useEffect(() => {
    fetchRSSFeed();
  }, [selectedProvider, selectedSection]);

  /**
   * Gets the current feed URL based on selected options
   */
  const getCurrentFeedUrl = () => {
    const provider = rssFeeds[selectedProvider];
    if (!provider || !provider.sections[selectedSection]) {
      return '';
    }
    return provider.sections[selectedSection].url;
  };

  /**
   * Fetches and parses RSS feed from the selected source
   * Includes robust error handling and fallback demo data
   */
  const fetchRSSFeed = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current feed URL
      const feedUrl = getCurrentFeedUrl();
      setCurrentFeedUrl(feedUrl);

      if (!feedUrl) {
        throw new Error('URL de feed no disponible para la selección actual');
      }

      let xmlText;
      try {
        // Attempt to fetch the RSS feed
        const response = await fetch(feedUrl, {
          mode: 'cors',
          headers: {
            'Accept': 'application/rss+xml, application/xml, text/xml'
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        xmlText = await response.text();
      } catch (fetchError) {
        console.warn('CORS o error de red, usando datos de demostración:', fetchError);
        
        // Provide comprehensive demo data when fetch fails
        const demoArticles = generateDemoArticles();
        setArticles(demoArticles);
        return;
      }

      // Parse RSS XML using DOMParser
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Check for XML parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Error al parsear el XML del RSS: ' + parserError.textContent);
      }

      // Extract articles from RSS feed
      const items = xmlDoc.querySelectorAll('item');
      const parsedArticles = Array.from(items).map((item, index) => {
        // Extract basic RSS elements
        const title = item.querySelector('title')?.textContent || 'Sin título';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || 'Sin descripción';
        const category = item.querySelector('category')?.textContent || 'General';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        
        // Extract image from various possible RSS elements
        let imageUrl = null;
        
        // Try enclosure tag first (most common for images)
        const enclosure = item.querySelector('enclosure');
        if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
          imageUrl = enclosure.getAttribute('url');
        }
        
        // Try media:content namespace
        if (!imageUrl) {
          const mediaContent = item.querySelector('media\\:content, content');
          if (mediaContent) {
            imageUrl = mediaContent.getAttribute('url');
          }
        }
        
        // Try media:thumbnail namespace
        if (!imageUrl) {
          const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
          if (mediaThumbnail) {
            imageUrl = mediaThumbnail.getAttribute('url');
          }
        }
        
        // Try image tag directly
        if (!imageUrl) {
          const imageTag = item.querySelector('image');
          if (imageTag) {
            imageUrl = imageTag.textContent || imageTag.getAttribute('url');
          }
        }

        // Clean description from HTML tags if present
        const cleanDescription = description.replace(/<[^>]*>/g, '').trim();

        return {
          id: `${selectedProvider}-${index + 1}`,
          title: title.trim(),
          link: link.trim(),
          description: cleanDescription,
          category: category.trim(),
          pubDate: new Date(pubDate),
          imageUrl: imageUrl,
          provider: rssFeeds[selectedProvider].name,
          section: rssFeeds[selectedProvider].sections[selectedSection].name
        };
      });

      setArticles(parsedArticles);
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      setError(err.message || 'Error al cargar el feed de noticias');
      
      // Set demo articles as fallback
      const demoArticles = generateDemoArticles();
      setArticles(demoArticles);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generates demo articles for fallback when RSS feeds are not accessible
   */
  const generateDemoArticles = () => {
    const provider = rssFeeds[selectedProvider];
    const section = provider.sections[selectedSection];
    
    return [
      {
        id: `${selectedProvider}-demo-1`,
        title: `${section.name}: Últimas noticias desde ${provider.name}`,
        link: `${provider.baseUrl}/demo-1`,
        description: `Este es un artículo de demostración para la sección ${section.name} de ${provider.name}. En una implementación real, este contenido vendría del feed RSS correspondiente.`,
        category: section.name,
        pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        imageUrl: `https://via.placeholder.com/400x250/1e40af/ffffff?text=${encodeURIComponent(provider.name)}`,
        provider: provider.name,
        section: section.name
      },
      {
        id: `${selectedProvider}-demo-2`,
        title: `Análisis: Perspectiva actual sobre ${section.name.toLowerCase()}`,
        link: `${provider.baseUrl}/demo-2`,
        description: `Un análisis profundo sobre los acontecimientos recientes en el área de ${section.name.toLowerCase()}. Esta información está siendo presentada como ejemplo de contenido del feed RSS.`,
        category: section.name,
        pubDate: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        imageUrl: `https://via.placeholder.com/400x250/059669/ffffff?text=Análisis`,
        provider: provider.name,
        section: section.name
      },
      {
        id: `${selectedProvider}-demo-3`,
        title: `Reportaje especial: Impacto en la sociedad colombiana`,
        link: `${provider.baseUrl}/demo-3`,
        description: `Un reportaje especial que examina el impacto de los eventos recientes en la sociedad colombiana, con enfoque particular en ${section.name.toLowerCase()}.`,
        category: section.name,
        pubDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        imageUrl: `https://via.placeholder.com/400x250/dc2626/ffffff?text=Reportaje`,
        provider: provider.name,
        section: section.name
      }
    ];
  };

  /**
   * Formats date in Colombian Spanish locale
   */
  const formatDate = (date) => {
    try {
      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Bogota'
      }).format(date);
    } catch (error) {
      // Fallback for older browsers
      return date.toLocaleDateString('es-CO') + ' ' + date.toLocaleTimeString('es-CO');
    }
  };

  /**
   * Handles provider selection change
   */
  const handleProviderChange = (e) => {
    const newProvider = e.target.value;
    setSelectedProvider(newProvider);
    
    // Reset section to first available
    const firstSection = Object.keys(rssFeeds[newProvider].sections)[0];
    setSelectedSection(firstSection);
    setSelectedSubsection('');
  };

  /**
   * Handles section selection change
   */
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setSelectedSubsection('');
  };

  /**
   * Handles subsection selection change
   */
  const handleSubsectionChange = (e) => {
    setSelectedSubsection(e.target.value);
  };

  /**
   * Gets filtered articles based on subsection selection
   */
  const getFilteredArticles = () => {
    if (!selectedSubsection) {
      return articles;
    }
    
    // For demo purposes, filter by category or title containing subsection
    return articles.filter(article => 
      article.category.toLowerCase().includes(selectedSubsection.toLowerCase()) ||
      article.title.toLowerCase().includes(selectedSubsection.toLowerCase())
    );
  };

  /**
   * Handles retry button click
   */
  const handleRetry = () => {
    fetchRSSFeed();
  };

  // Get current provider and section data
  const currentProvider = rssFeeds[selectedProvider];
  const currentSection = currentProvider?.sections[selectedSection];
  const filteredArticles = getFilteredArticles();

  // Loading state render
  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando noticias...</h3>
          <p className="text-gray-500">
            Obteniendo las últimas noticias de {currentProvider?.name}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Sección: {currentSection?.name}
          </p>
        </div>
      </div>
    );
  }

  // Error state render
  if (error && articles.length === 0) {
    return (
      <div className="min-h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-8">
          <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Error al cargar las noticias</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaGlobe className="text-3xl text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Feed de Noticias Colombianas</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Agregador de noticias RSS de los principales medios colombianos
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Fuentes: El Tiempo, Semana, Noticias Caracol, Noticias RCN
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaRss className="mr-2 text-orange-500" />
          Configuración del Feed
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proveedor de Noticias
            </label>
            <select
              value={selectedProvider}
              onChange={handleProviderChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(rssFeeds).map(([key, provider]) => (
                <option key={key} value={key}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          {/* Section Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sección
            </label>
            <select
              value={selectedSection}
              onChange={handleSectionChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currentProvider && Object.entries(currentProvider.sections).map(([key, section]) => (
                <option key={key} value={key}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subsection Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subsección
            </label>
            <select
              value={selectedSubsection}
              onChange={handleSubsectionChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currentSection && Object.entries(currentSection.subsections).map(([key, name]) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Feed URL Display */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Feed URL Actual:</h3>
              <p className="text-sm text-blue-600 font-mono break-all">
                {currentFeedUrl || 'No disponible'}
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-4"
            >
              Actualizar Feed
            </button>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-yellow-500 mr-2" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Advertencia:</strong> {error}
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Se están mostrando datos de demostración. En un entorno de producción, 
                  se necesitaría configurar un proxy para evitar restricciones CORS.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Articles Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaNewspaper className="mr-3 text-blue-600" />
            Artículos ({filteredArticles.length})
          </h2>
          <div className="text-sm text-gray-500">
            Última actualización: {formatDate(new Date())}
          </div>
        </div>

        {/* No articles message */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay artículos disponibles</h3>
            <p className="text-gray-500">
              No se encontraron artículos para la configuración actual del feed
            </p>
            <button
              onClick={handleRetry}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Intentar nuevamente
            </button>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="md:flex">
                  {/* Article Image */}
                  {article.imageUrl && (
                    <div className="md:w-1/3">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover"
                        onError={(e) => {
                          // Hide image if it fails to load
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Article Content */}
                  <div className={`p-6 ${article.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {article.provider}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {article.section}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                      <div className="flex items-center ml-auto text-gray-500 text-sm">
                        <FaCalendarAlt className="mr-1" />
                        {formatDate(article.pubDate)}
                      </div>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      <a 
                        href={article.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {article.title}
                      </a>
                    </h3>

                    {/* Article Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    {/* Article Actions */}
                    <div className="flex items-center justify-between">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Leer artículo completo
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </a>
                      
                      {article.imageUrl && (
                        <div className="flex items-center text-gray-400 text-sm">
                          <FaImage className="mr-1" />
                          Con imagen
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="text-center bg-gray-50 rounded-lg p-6">
        <p className="text-gray-600 mb-2">
          Este componente agrega feeds RSS de múltiples fuentes noticiosas colombianas
        </p>
        <p className="text-sm text-gray-500">
          Para uso en producción, configure un proxy para manejar las restricciones CORS de los feeds RSS
        </p>
      </div>
    </div>
  );
};

export default ColombianNewsFeed;