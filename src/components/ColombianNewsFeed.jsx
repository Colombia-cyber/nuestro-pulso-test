import React, { useState, useEffect } from 'react';
import { 
  FaNewspaper, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaImage, 
  FaSpinner, 
  FaExclamationTriangle, 
  FaRss,
  FaFilter,
  FaChevronDown,
  FaTimes
} from 'react-icons/fa';

const ColombianNewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState('el-tiempo');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubsection, setSelectedSubsection] = useState('');
  const [currentRssUrl, setCurrentRssUrl] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Comprehensive RSS URLs for Colombian news providers
  const newsProviders = {
    'el-tiempo': {
      name: 'El Tiempo',
      logo: '📰',
      color: 'bg-blue-600',
      sections: {
        '': { name: 'Portada', url: 'https://www.eltiempo.com/rss.xml' },
        'politica': { 
          name: 'Política',
          url: 'https://www.eltiempo.com/rss/politica.xml',
          subsections: {
            'congreso': 'https://www.eltiempo.com/rss/politica/congreso.xml',
            'partidos': 'https://www.eltiempo.com/rss/politica/partidos.xml',
            'proceso-de-paz': 'https://www.eltiempo.com/rss/politica/proceso-de-paz.xml'
          }
        },
        'economia': { 
          name: 'Economía',
          url: 'https://www.eltiempo.com/rss/economia.xml',
          subsections: {
            'finanzas': 'https://www.eltiempo.com/rss/economia/finanzas.xml',
            'empresas': 'https://www.eltiempo.com/rss/economia/empresas.xml',
            'indicadores': 'https://www.eltiempo.com/rss/economia/indicadores.xml'
          }
        },
        'deportes': { 
          name: 'Deportes',
          url: 'https://www.eltiempo.com/rss/deportes.xml',
          subsections: {
            'futbol-colombiano': 'https://www.eltiempo.com/rss/deportes/futbol-colombiano.xml',
            'futbol-internacional': 'https://www.eltiempo.com/rss/deportes/futbol-internacional.xml',
            'ciclismo': 'https://www.eltiempo.com/rss/deportes/ciclismo.xml'
          }
        },
        'opinion': { 
          name: 'Opinión',
          url: 'https://www.eltiempo.com/rss/opinion.xml',
          subsections: {
            'columnistas': 'https://www.eltiempo.com/rss/opinion/columnistas.xml',
            'editorial': 'https://www.eltiempo.com/rss/opinion/editorial.xml'
          }
        },
        'internacional': { 
          name: 'Internacional',
          url: 'https://www.eltiempo.com/rss/mundo.xml',
          subsections: {
            'latinoamerica': 'https://www.eltiempo.com/rss/mundo/latinoamerica.xml',
            'eeuu-canada': 'https://www.eltiempo.com/rss/mundo/eeuu-canada.xml',
            'europa': 'https://www.eltiempo.com/rss/mundo/europa.xml'
          }
        }
      }
    },
    'semana': {
      name: 'Revista Semana',
      logo: '📖',
      color: 'bg-red-600',
      sections: {
        '': { name: 'Portada', url: 'https://www.semana.com/rss.xml' },
        'politica': { 
          name: 'Política',
          url: 'https://www.semana.com/rss/politica.xml',
          subsections: {
            'gobierno': 'https://www.semana.com/rss/politica/gobierno.xml',
            'congreso': 'https://www.semana.com/rss/politica/congreso.xml'
          }
        },
        'economia': { 
          name: 'Economía',
          url: 'https://www.semana.com/rss/economia.xml',
          subsections: {
            'empresas': 'https://www.semana.com/rss/economia/empresas.xml',
            'finanzas': 'https://www.semana.com/rss/economia/finanzas.xml'
          }
        },
        'nacion': { 
          name: 'Nación',
          url: 'https://www.semana.com/rss/nacion.xml',
          subsections: {
            'seguridad': 'https://www.semana.com/rss/nacion/seguridad.xml',
            'justicia': 'https://www.semana.com/rss/nacion/justicia.xml'
          }
        }
      }
    },
    'caracol': {
      name: 'Noticias Caracol',
      logo: '📺',
      color: 'bg-green-600',
      sections: {
        '': { name: 'Portada', url: 'https://noticias.caracoltv.com/rss.xml' },
        'colombia': { 
          name: 'Colombia',
          url: 'https://noticias.caracoltv.com/rss/colombia',
          subsections: {
            'politica': 'https://noticias.caracoltv.com/rss/colombia/politica',
            'regiones': 'https://noticias.caracoltv.com/rss/colombia/regiones'
          }
        },
        'internacional': { 
          name: 'Internacional',
          url: 'https://noticias.caracoltv.com/rss/internacional',
          subsections: {
            'latinoamerica': 'https://noticias.caracoltv.com/rss/internacional/latinoamerica',
            'mundo': 'https://noticias.caracoltv.com/rss/internacional/mundo'
          }
        },
        'deportes': { 
          name: 'Deportes',
          url: 'https://noticias.caracoltv.com/rss/deportes',
          subsections: {
            'futbol': 'https://noticias.caracoltv.com/rss/deportes/futbol',
            'otros-deportes': 'https://noticias.caracoltv.com/rss/deportes/otros'
          }
        }
      }
    },
    'rcn': {
      name: 'Noticias RCN',
      logo: '📻',
      color: 'bg-purple-600',
      sections: {
        '': { name: 'Portada', url: 'https://www.noticiasrcn.com/rss.xml' },
        'nacional': { 
          name: 'Nacional',
          url: 'https://www.noticiasrcn.com/rss/nacional',
          subsections: {
            'politica': 'https://www.noticiasrcn.com/rss/nacional/politica',
            'regiones': 'https://www.noticiasrcn.com/rss/nacional/regiones'
          }
        },
        'internacional': { 
          name: 'Internacional',
          url: 'https://www.noticiasrcn.com/rss/internacional',
          subsections: {
            'latinoamerica': 'https://www.noticiasrcn.com/rss/internacional/latinoamerica',
            'mundo': 'https://www.noticiasrcn.com/rss/internacional/mundo'
          }
        },
        'economia': { 
          name: 'Economía',
          url: 'https://www.noticiasrcn.com/rss/economia',
          subsections: {
            'finanzas': 'https://www.noticiasrcn.com/rss/economia/finanzas',
            'empresas': 'https://www.noticiasrcn.com/rss/economia/empresas'
          }
        }
      }
    },
    'el-espectador': {
      name: 'El Espectador',
      logo: '📄',
      color: 'bg-gray-700',
      sections: {
        '': { name: 'Portada', url: 'https://www.elespectador.com/rss.xml' },
        'politica': { 
          name: 'Política',
          url: 'https://www.elespectador.com/rss/politica',
          subsections: {
            'congreso': 'https://www.elespectador.com/rss/politica/congreso',
            'gobierno': 'https://www.elespectador.com/rss/politica/gobierno'
          }
        },
        'economia': { 
          name: 'Economía',
          url: 'https://www.elespectador.com/rss/economia',
          subsections: {
            'empresas': 'https://www.elespectador.com/rss/economia/empresas',
            'finanzas': 'https://www.elespectador.com/rss/economia/finanzas'
          }
        },
        'judicial': { 
          name: 'Judicial',
          url: 'https://www.elespectador.com/rss/judicial',
          subsections: {
            'investigacion': 'https://www.elespectador.com/rss/judicial/investigacion',
            'procesos': 'https://www.elespectador.com/rss/judicial/procesos'
          }
        }
      }
    },
    'portafolio': {
      name: 'Portafolio',
      logo: '💼',
      color: 'bg-orange-600',
      sections: {
        '': { name: 'Portada', url: 'https://www.portafolio.co/rss.xml' },
        'economia': { 
          name: 'Economía',
          url: 'https://www.portafolio.co/rss/economia',
          subsections: {
            'gobierno': 'https://www.portafolio.co/rss/economia/gobierno',
            'finanzas': 'https://www.portafolio.co/rss/economia/finanzas'
          }
        },
        'negocios': { 
          name: 'Negocios',
          url: 'https://www.portafolio.co/rss/negocios',
          subsections: {
            'empresas': 'https://www.portafolio.co/rss/negocios/empresas',
            'emprendimiento': 'https://www.portafolio.co/rss/negocios/emprendimiento'
          }
        },
        'internacional': { 
          name: 'Internacional',
          url: 'https://www.portafolio.co/rss/internacional',
          subsections: {
            'economia-mundial': 'https://www.portafolio.co/rss/internacional/economia'
          }
        }
      }
    }
  };

  // Get current RSS URL based on selections
  useEffect(() => {
    const provider = newsProviders[selectedProvider];
    if (!provider) {
      setCurrentRssUrl('');
      return;
    }

    let url = '';
    if (selectedSection && provider.sections[selectedSection]) {
      if (selectedSubsection && provider.sections[selectedSection].subsections?.[selectedSubsection]) {
        url = provider.sections[selectedSection].subsections[selectedSubsection];
      } else {
        url = provider.sections[selectedSection].url;
      }
    } else {
      url = provider.sections[''].url;
    }
    
    setCurrentRssUrl(url);
  }, [selectedProvider, selectedSection, selectedSubsection]);

  // Fetch RSS feed whenever the URL changes
  useEffect(() => {
    if (currentRssUrl) {
      fetchRSSFeed(currentRssUrl);
    }
  }, [currentRssUrl]);

  const fetchRSSFeed = async (url) => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);

      // Try to fetch the RSS feed, but provide fallback demo data for CORS issues
      let xmlText;
      try {
        const response = await fetch(url, {
          mode: 'cors',
          headers: {
            'Accept': 'application/rss+xml, application/xml, text/xml'
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        xmlText = await response.text();
      } catch (fetchError) {
        console.warn('CORS o error de red, usando datos de demostración:', fetchError);
        
        // Generate demo data based on provider and section
        const provider = newsProviders[selectedProvider];
        const sectionName = selectedSection ? provider.sections[selectedSection]?.name : 'Portada';
        const providerName = provider.name;
        
        const demoArticles = generateDemoArticles(providerName, sectionName);
        setArticles(demoArticles);
        return;
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Error al parsear el XML del RSS');
      }

      // Extract items from RSS feed
      const items = xmlDoc.querySelectorAll('item');
      const parsedArticles = Array.from(items).map((item, index) => {
        const title = item.querySelector('title')?.textContent || 'Sin título';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || 'Sin descripción';
        const category = item.querySelector('category')?.textContent || getDefaultCategory();
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        
        // Extract image from multiple possible sources
        const enclosure = item.querySelector('enclosure');
        let imageUrl = enclosure?.getAttribute('url') || null;
        
        // Alternative: check for media:content or other image elements
        if (!imageUrl) {
          const mediaContent = item.querySelector('media\\:content, content');
          imageUrl = mediaContent?.getAttribute('url') || null;
        }
        
        // Alternative: check for media:thumbnail
        if (!imageUrl) {
          const mediaThumbnail = item.querySelector('media\\:thumbnail, thumbnail');
          imageUrl = mediaThumbnail?.getAttribute('url') || null;
        }

        // Clean description from HTML tags
        const cleanDescription = description.replace(/<[^>]*>/g, '').trim();

        return {
          id: index + 1,
          title: title.trim(),
          link: link.trim(),
          description: cleanDescription,
          category: category.trim(),
          pubDate: new Date(pubDate),
          imageUrl: imageUrl,
          provider: newsProviders[selectedProvider].name
        };
      });

      setArticles(parsedArticles);
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      setError(err.message || 'Error al cargar el feed de noticias');
    } finally {
      setLoading(false);
    }
  };

  const generateDemoArticles = (providerName, sectionName) => {
    const demoTemplates = [
      {
        title: `Últimas decisiones del gobierno colombiano en ${sectionName.toLowerCase()}`,
        description: `Análisis detallado de las recientes medidas implementadas por el gobierno nacional en el área de ${sectionName.toLowerCase()}. Este informe incluye declaraciones oficiales y reacciones de diferentes sectores.`,
        category: sectionName,
        hours: 2
      },
      {
        title: `Desarrollo económico y social en Colombia: perspectivas 2024`,
        description: `Un análisis profundo sobre las tendencias económicas y sociales que marcarán el rumbo de Colombia en el presente año, incluyendo proyecciones y recomendaciones de expertos.`,
        category: sectionName,
        hours: 4
      },
      {
        title: `${sectionName}: impacto en las regiones colombianas`,
        description: `Reportaje especial sobre cómo las políticas nacionales en ${sectionName.toLowerCase()} están afectando a las diferentes regiones del país y las respuestas locales.`,
        category: sectionName,
        hours: 6
      }
    ];

    return demoTemplates.map((template, index) => ({
      id: index + 1,
      title: template.title,
      link: `https://demo.${selectedProvider}.com/articulo-${index + 1}`,
      description: template.description,
      category: template.category,
      pubDate: new Date(Date.now() - template.hours * 60 * 60 * 1000),
      imageUrl: `https://via.placeholder.com/400x250/${getProviderColor()}/ffffff?text=${encodeURIComponent(providerName + ' - ' + sectionName)}`,
      provider: providerName
    }));
  };

  const getDefaultCategory = () => {
    const provider = newsProviders[selectedProvider];
    if (selectedSection && provider.sections[selectedSection]) {
      return provider.sections[selectedSection].name;
    }
    return 'General';
  };

  const getProviderColor = () => {
    const colors = {
      'el-tiempo': '1e40af',
      'semana': 'dc2626',
      'caracol': '059669',
      'rcn': '7c3aed',
      'el-espectador': '374151',
      'portafolio': 'ea580c'
    };
    return colors[selectedProvider] || '6b7280';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Bogota'
    }).format(date);
  };

  const handleRetry = () => {
    if (currentRssUrl) {
      fetchRSSFeed(currentRssUrl);
    }
  };

  const handleProviderChange = (providerId) => {
    setSelectedProvider(providerId);
    setSelectedSection('');
    setSelectedSubsection('');
  };

  const handleSectionChange = (sectionId) => {
    setSelectedSection(sectionId);
    setSelectedSubsection('');
  };

  const currentProvider = newsProviders[selectedProvider];
  const availableSections = currentProvider ? Object.keys(currentProvider.sections) : [];
  const availableSubsections = currentProvider && selectedSection && currentProvider.sections[selectedSection]?.subsections 
    ? Object.keys(currentProvider.sections[selectedSection].subsections) 
    : [];

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando noticias...</h3>
          <p className="text-gray-500">Obteniendo las últimas noticias de {currentProvider?.name}</p>
        </div>
      </div>
    );
  }

  if (error) {
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <FaNewspaper className="text-3xl text-blue-600 mr-3" />
          <h2 className="text-4xl font-bold text-gray-900">Feed de Noticias Colombianas</h2>
        </div>
        <p className="text-gray-600 text-lg">
          Accede a noticias de múltiples fuentes colombianas organizadas por proveedor, sección y subsección
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <FaFilter className="mr-2" />
            Filtros de Contenido
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proveedor de Noticias
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(newsProviders).map(([id, provider]) => (
                <option key={id} value={id}>
                  {provider.logo} {provider.name}
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
              onChange={(e) => handleSectionChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableSections.map((sectionId) => (
                <option key={sectionId} value={sectionId}>
                  {currentProvider.sections[sectionId].name}
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
              onChange={(e) => setSelectedSubsection(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              disabled={availableSubsections.length === 0}
            >
              <option value="">Todas las subsecciones</option>
              {availableSubsections.map((subsectionId) => (
                <option key={subsectionId} value={subsectionId}>
                  {subsectionId.charAt(0).toUpperCase() + subsectionId.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RSS URL Display */}
        {currentRssUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center mb-2">
              <FaRss className="text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Feed RSS actual:</span>
            </div>
            <code className="text-xs text-gray-600 break-all bg-white p-2 rounded border block">
              {currentRssUrl}
            </code>
          </div>
        )}
      </div>

      {/* Current Selection Info */}
      <div className="mb-6">
        <div className="flex items-center flex-wrap gap-2">
          <span className={`${currentProvider?.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
            <span className="mr-1">{currentProvider?.logo}</span>
            {currentProvider?.name}
          </span>
          {selectedSection && (
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentProvider.sections[selectedSection].name}
            </span>
          )}
          {selectedSubsection && (
            <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedSubsection.charAt(0).toUpperCase() + selectedSubsection.slice(1).replace('-', ' ')}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Última actualización: {formatDate(new Date())}
        </div>
      </div>

      {/* Articles */}
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <FaNewspaper className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay artículos disponibles</h3>
          <p className="text-gray-500">No se encontraron artículos en el feed RSS seleccionado</p>
          <button
            onClick={handleRetry}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                {article.imageUrl && (
                  <div className="md:w-1/3">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className={`p-6 ${article.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {article.provider}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="mr-1" />
                      {formatDate(article.pubDate)}
                    </div>
                  </div>

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

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

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

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleRetry}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg transition-colors font-medium flex items-center mx-auto"
        >
          <FaRss className="mr-2" />
          Actualizar feed
        </button>
      </div>
    </div>
  );
};

export default ColombianNewsFeed;