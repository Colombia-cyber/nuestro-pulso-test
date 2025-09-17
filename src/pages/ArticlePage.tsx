import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  readTime: string;
  category: string;
  perspective: 'left' | 'right';
  url?: string;
}

interface ArticlePageProps {
  articleId: string;
  onBack?: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId, onBack }) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'tabs'>('side-by-side');
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock article data - in real implementation this would come from an API
  const mockArticles: Record<string, NewsArticle[]> = {
    '1': [
      {
        id: '1-left',
        title: 'Reforma Tributaria: Una Oportunidad para la Justicia Social',
        summary: 'La nueva reforma tributaria representa un paso crucial hacia una sociedad más equitativa.',
        fullContent: `La nueva reforma tributaria presentada por el gobierno nacional ha generado un intenso debate en todos los sectores de la sociedad colombiana. Desde una perspectiva progresista, esta iniciativa representa una oportunidad histórica para construir un país más justo y equitativo.

**Aspectos Destacados de la Reforma:**

La reforma tributaria busca principalmente:
- Aumentar la progresividad del sistema fiscal
- Garantizar que quienes más tienen, más contribuyan
- Generar recursos para programas sociales prioritarios
- Reducir la desigualdad de ingresos en el país

**Impacto Social Positivo:**

Los recursos generados por esta reforma permitirán:
- Financiar programas de educación gratuita
- Ampliar la cobertura de salud pública
- Invertir en infraestructura social
- Apoyar a las poblaciones más vulnerables

**Justicia Distributiva:**

Es fundamental que Colombia avance hacia un sistema tributario más justo, donde la carga fiscal se distribuya de manera equitativa según la capacidad de pago de cada ciudadano y empresa.

Esta reforma no solo es necesaria desde el punto de vista fiscal, sino que representa un compromiso con la justicia social y la construcción de un país más inclusivo para todos los colombianos.`,
        source: 'El Espectador',
        publishedAt: '2024-01-15T10:30:00Z',
        readTime: '4 min',
        category: 'Política Fiscal',
        perspective: 'left',
        url: '#'
      },
      {
        id: '1-right',
        title: 'Reforma Tributaria: Preocupaciones sobre el Impacto Económico',
        summary: 'Expertos advierten que la nueva reforma tributaria podría afectar la competitividad empresarial.',
        fullContent: `La propuesta de reforma tributaria del gobierno ha generado serias preocupaciones en el sector empresarial y entre los analistas económicos sobre sus potenciales efectos negativos en la economía nacional.

**Principales Preocupaciones:**

Los expertos señalan varios riesgos:
- Aumento excesivo de la carga tributaria empresarial
- Posible fuga de capitales y desinversión
- Reducción de la competitividad internacional
- Impacto negativo en la generación de empleo

**Efectos en la Inversión:**

Las nuevas cargas fiscales podrían resultar en:
- Menor atractivo para inversión extranjera
- Reducción de la capacidad de inversión empresarial
- Limitaciones para el crecimiento de las PYMES
- Posible traslado de operaciones a otros países

**Alternativas Propuestas:**

El sector privado sugiere enfoques alternativos:
- Mejorar la eficiencia en el gasto público
- Combatir más efectivamente la evasión fiscal
- Implementar reformas graduales y consensuadas
- Buscar equilibrio entre recaudo y crecimiento económico

**Llamado al Diálogo:**

Es crucial que el gobierno considere estas preocupaciones legítimas y busque un balance que permita tanto el recaudo necesario como el mantenimiento de un ambiente favorable para los negocios y la generación de empleo.

La sostenibilidad económica debe ser una prioridad en cualquier reforma fiscal que se implemente.`,
        source: 'Portafolio',
        publishedAt: '2024-01-15T11:00:00Z',
        readTime: '5 min',
        category: 'Política Fiscal',
        perspective: 'right',
        url: '#'
      }
    ],
    '2': [
      {
        id: '2-left',
        title: 'Colombia Anuncia Nueva Estrategia de Transición Energética',
        summary: 'El gobierno presenta un plan ambicioso para reducir la dependencia de combustibles fósiles.',
        fullContent: `El gobierno colombiano ha presentado una estrategia integral de transición energética que posiciona al país como líder regional en energías renovables y sostenibilidad ambiental.

**Objetivos de la Transición:**

La nueva estrategia busca:
- Alcanzar 70% de energías renovables para 2030
- Reducir emisiones de CO2 en un 51% para 2030
- Crear 500,000 empleos verdes
- Posicionar a Colombia como exportador de energía limpia

**Inversiones Programadas:**

El plan incluye inversiones por USD 40,000 millones en:
- Parques solares y eólicos
- Modernización de redes eléctricas
- Investigación y desarrollo tecnológico
- Capacitación de capital humano especializado

**Beneficios Ambientales y Sociales:**

Esta transición generará:
- Aire más limpio en ciudades principales
- Reducción de la dependencia de combustibles fósiles
- Nuevas oportunidades de empleo en sectores rurales
- Posicionamiento internacional como país verde

La transición energética no solo es una necesidad ambiental, sino una oportunidad única para transformar la matriz productiva del país hacia un modelo más sostenible e inclusivo.`,
        source: 'Portafolio',
        publishedAt: '2024-01-15T12:15:00Z',
        readTime: '6 min',
        category: 'Ambiente',
        perspective: 'left',
        url: '#'
      }
    ]
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const articleData = mockArticles[articleId] || [];
      setArticles(articleData);
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 500);

    // Set up polling for live updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [articleId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ArticleCard: React.FC<{ article: NewsArticle; perspective: 'left' | 'right' }> = ({ 
    article, 
    perspective 
  }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
      perspective === 'left' ? 'border-blue-500' : 'border-red-500'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          perspective === 'left' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {perspective === 'left' ? 'Perspectiva Progresista' : 'Perspectiva Conservadora'}
        </span>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{article.readTime}</span>
          <span>•</span>
          <span>Actualizado: {formatTime(lastUpdated)}</span>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {article.title}
      </h1>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{article.source}</span>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>•</span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {article.fullContent.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return (
              <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                {paragraph.replace(/\*\*/g, '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n- ').map(item => item.replace('- ', ''));
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );

  const leftArticles = articles.filter(article => article.perspective === 'left');
  const rightArticles = articles.filter(article => article.perspective === 'right');
  const mainArticle = leftArticles[0] || rightArticles[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando artículo...</h3>
              <p className="text-gray-500">Obteniendo perspectivas balanceadas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mainArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Artículo no encontrado</h3>
              <p className="text-gray-600 mb-6">El artículo que buscas no está disponible.</p>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Volver a Noticias
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            {onBack && (
              <button 
                onClick={onBack}
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Volver a Noticias
              </button>
            )}
            
            <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg">
              <h1 className="text-3xl font-bold text-white mb-2">
                📰 {mainArticle.title}
              </h1>
              <p className="text-white/90">
                Análisis completo con perspectivas balanceadas y discusión comunitaria
              </p>
              <div className="mt-4 flex items-center space-x-6 text-white/80 text-sm">
                <span>🔄 Actualizado: {formatTime(lastUpdated)}</span>
                <span>💬 Comentarios en tiempo real</span>
                <span>⚖️ Perspectivas múltiples</span>
              </div>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Modo de Vista</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('side-by-side')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'side-by-side'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Lado a Lado
                  </button>
                  <button
                    onClick={() => setViewMode('tabs')}
                    className={`px-4 py-2 rounded text-sm font-medium transition ${
                      viewMode === 'tabs'
                        ? 'bg-white text-blue-600 shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Pestañas
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Left Wing Column */}
              <div>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold text-blue-800 flex items-center">
                    <span className="mr-2">🔵</span>
                    Perspectiva Progresista
                  </h2>
                  <p className="text-blue-700 text-sm mt-1">
                    Análisis desde una perspectiva progresista
                  </p>
                </div>
                {leftArticles.length > 0 ? (
                  leftArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} perspective="left" />
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <div className="text-4xl mb-4">📰</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Perspectiva Progresista No Disponible
                    </h3>
                    <p className="text-gray-600 text-sm">
                      No tenemos artículos desde esta perspectiva para este tema aún.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Wing Column */}
              <div>
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <h2 className="text-xl font-semibold text-red-800 flex items-center">
                    <span className="mr-2">🔴</span>
                    Perspectiva Conservadora
                  </h2>
                  <p className="text-red-700 text-sm mt-1">
                    Análisis desde una perspectiva conservadora
                  </p>
                </div>
                {rightArticles.length > 0 ? (
                  rightArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} perspective="right" />
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <div className="text-4xl mb-4">📰</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Perspectiva Conservadora No Disponible
                    </h3>
                    <p className="text-gray-600 text-sm">
                      No tenemos artículos desde esta perspectiva para este tema aún.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Tabs View */
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('left')}
                    className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition ${
                      activeTab === 'left'
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🔵 Perspectiva Progresista ({leftArticles.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('right')}
                    className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition ${
                      activeTab === 'right'
                        ? 'border-red-500 text-red-600 bg-red-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🔴 Perspectiva Conservadora ({rightArticles.length})
                  </button>
                </div>
                
                <div className="p-6">
                  {activeTab === 'left' ? (
                    leftArticles.length > 0 ? (
                      leftArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} perspective="left" />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">📰</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Perspectiva Progresista No Disponible
                        </h3>
                        <p className="text-gray-600 text-sm">
                          No tenemos artículos desde esta perspectiva para este tema aún.
                        </p>
                      </div>
                    )
                  ) : (
                    rightArticles.length > 0 ? (
                      rightArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} perspective="right" />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">📰</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Perspectiva Conservadora No Disponible
                        </h3>
                        <p className="text-gray-600 text-sm">
                          No tenemos artículos desde esta perspectiva para este tema aún.
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="mr-3">💬</span>
                Discusión Comunitaria
              </h2>
              <p className="text-gray-600 mt-1">
                Comparte tu opinión y debate con otros ciudadanos sobre este tema
              </p>
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                <span>🔄 Actualización en tiempo real</span>
                <span>💭 Los comentarios aparecen automáticamente en el Community Hub</span>
              </div>
            </div>
            
            <Comments 
              articleId={parseInt(articleId)} 
              articleTitle={mainArticle.title}
            />
          </div>

          {/* Educational Note */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">💡</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sobre las Perspectivas Balanceadas</h3>
                <p className="text-gray-700 text-sm">
                  Presentamos múltiples perspectivas del mismo tema para fomentar el pensamiento crítico 
                  y ayudarte a formar una opinión informada. Ninguna perspectiva es inherentemente correcta o incorrecta; 
                  todas contribuyen al debate democrático.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;