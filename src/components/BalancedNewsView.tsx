import React, { useState } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  readTime: string;
  category: string;
  perspective: 'left' | 'right';
  url?: string;
}

interface BalancedNewsViewProps {
  topic: string;
  onBack?: () => void;
}

const BalancedNewsView: React.FC<BalancedNewsViewProps> = ({ topic, onBack }) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'tabs'>('side-by-side');
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Mock news data - in real implementation this would come from an API
  const mockNews: NewsArticle[] = [
    {
      id: '1-left',
      title: 'Reforma Tributaria: Una Oportunidad para la Justicia Social',
      summary: 'La nueva reforma tributaria representa un paso crucial hacia una sociedad más equitativa, donde los sectores con mayor capacidad económica contribuyan de manera proporcional al desarrollo del país.',
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
      summary: 'Expertos advierten que la nueva reforma tributaria podría afectar la competitividad empresarial y el crecimiento económico, poniendo en riesgo la generación de empleo en sectores clave.',
      source: 'Portafolio',
      publishedAt: '2024-01-15T11:00:00Z',
      readTime: '5 min',
      category: 'Política Fiscal',
      perspective: 'right',
      url: '#'
    },
    {
      id: '2-left',
      title: 'Avances en Política Ambiental: Colombia Hacia la Sostenibilidad',
      summary: 'Las nuevas medidas ambientales del gobierno muestran un compromiso real con la protección de ecosistemas y la lucha contra el cambio climático, priorizando el futuro del planeta.',
      source: 'Semana Sostenible',
      publishedAt: '2024-01-14T15:20:00Z',
      readTime: '6 min',
      category: 'Medio Ambiente',
      perspective: 'left',
      url: '#'
    }
  ];

  const leftNews = mockNews.filter(article => article.perspective === 'left');
  const rightNews = mockNews.filter(article => article.perspective === 'right');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const NewsCard: React.FC<{ article: NewsArticle; perspective: 'left' | 'right' }> = ({ 
    article, 
    perspective 
  }) => (
    <div className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
      perspective === 'left' ? 'border-blue-500' : 'border-red-500'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          perspective === 'left' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {perspective === 'left' ? 'Perspectiva Progresista' : 'Perspectiva Conservadora'}
        </span>
        <span className="text-xs text-gray-500">{article.readTime}</span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {article.summary}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{article.source}</span>
          <span>•</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Leer más →
        </button>
      </div>
    </div>
  );

  const MissingPerspectiveCard: React.FC<{ perspective: 'left' | 'right' }> = ({ perspective }) => (
    <div className={`bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center`}>
      <div className="text-4xl mb-4">📰</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Perspectiva {perspective === 'left' ? 'Progresista' : 'Conservadora'} No Disponible
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        No tenemos artículos desde esta perspectiva para este tema aún.
      </p>
      <button 
        onClick={() => setShowSubmissionForm(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
      >
        Sugerir Fuente
      </button>
    </div>
  );

  const SubmissionForm: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sugerir Fuente de Noticias</h3>
          <button 
            onClick={() => setShowSubmissionForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL del artículo
            </label>
            <input 
              type="url" 
              placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perspectiva
            </label>
            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccionar perspectiva</option>
              <option value="left">Progresista</option>
              <option value="right">Conservadora</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentarios (opcional)
            </label>
            <textarea 
              placeholder="¿Por qué consideras que este artículo representa esta perspectiva?"
              className="w-full border rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3">
            <button 
              type="button"
              onClick={() => setShowSubmissionForm(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Enviar Sugerencia
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {onBack && (
            <button 
              onClick={onBack}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Volver
            </button>
          )}
          
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-2">
              📰 Perspectivas Balanceadas: {topic}
            </h1>
            <p className="text-white/90">
              Ve múltiples perspectivas del mismo tema para formar tu propia opinión
            </p>
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

        {/* Content */}
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Wing Column */}
            <div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold text-blue-800 flex items-center">
                  <span className="mr-2">🔵</span>
                  Perspectiva Progresista
                </h2>
                <p className="text-blue-700 text-sm mt-1">
                  Artículos desde una perspectiva progresista o de izquierda
                </p>
              </div>
              <div className="space-y-4">
                {leftNews.length > 0 ? (
                  leftNews.map((article) => (
                    <NewsCard key={article.id} article={article} perspective="left" />
                  ))
                ) : (
                  <MissingPerspectiveCard perspective="left" />
                )}
              </div>
            </div>

            {/* Right Wing Column */}
            <div>
              <div className="bg-red-50 rounded-lg p-4 mb-4">
                <h2 className="text-xl font-semibold text-red-800 flex items-center">
                  <span className="mr-2">🔴</span>
                  Perspectiva Conservadora
                </h2>
                <p className="text-red-700 text-sm mt-1">
                  Artículos desde una perspectiva conservadora o de derecha
                </p>
              </div>
              <div className="space-y-4">
                {rightNews.length > 0 ? (
                  rightNews.map((article) => (
                    <NewsCard key={article.id} article={article} perspective="right" />
                  ))
                ) : (
                  <MissingPerspectiveCard perspective="right" />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Tabs View */
          <div>
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('left')}
                  className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition ${
                    activeTab === 'left'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  🔵 Perspectiva Progresista ({leftNews.length})
                </button>
                <button
                  onClick={() => setActiveTab('right')}
                  className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition ${
                    activeTab === 'right'
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  🔴 Perspectiva Conservadora ({rightNews.length})
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {activeTab === 'left' ? (
                    leftNews.length > 0 ? (
                      leftNews.map((article) => (
                        <NewsCard key={article.id} article={article} perspective="left" />
                      ))
                    ) : (
                      <MissingPerspectiveCard perspective="left" />
                    )
                  ) : (
                    rightNews.length > 0 ? (
                      rightNews.map((article) => (
                        <NewsCard key={article.id} article={article} perspective="right" />
                      ))
                    ) : (
                      <MissingPerspectiveCard perspective="right" />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* Submission Form Modal */}
        {showSubmissionForm && <SubmissionForm />}
      </div>
    </div>
  );
};

export default BalancedNewsView;