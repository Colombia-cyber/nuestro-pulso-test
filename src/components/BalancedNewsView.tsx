import React, { useState } from 'react';
import { FiShare2, FiCopy, FiExternalLink, FiClock, FiTrendingUp, FiUser } from 'react-icons/fi';

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
  authorName?: string;
  authorAvatar?: string;
  trending?: boolean;
  locality?: string;
}

interface BalancedNewsViewProps {
  topic: string;
  onBack?: () => void;
}

const BalancedNewsView: React.FC<BalancedNewsViewProps> = ({ topic, onBack }) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'tabs'>('side-by-side');
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

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
      url: '#',
      authorName: 'María Rodríguez',
      authorAvatar: 'https://ui-avatars.com/api/?name=María+Rodríguez&background=3b82f6&color=fff',
      trending: true,
      locality: 'Bogotá',
      imageUrl: 'https://picsum.photos/400/250?random=1'
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
      url: '#',
      authorName: 'Carlos Mendoza',
      authorAvatar: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=ef4444&color=fff',
      trending: false,
      locality: 'Medellín',
      imageUrl: 'https://picsum.photos/400/250?random=2'
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
      url: '#',
      authorName: 'Ana García',
      authorAvatar: 'https://ui-avatars.com/api/?name=Ana+García&background=10b981&color=fff',
      trending: false,
      locality: 'Cali',
      imageUrl: 'https://picsum.photos/400/250?random=3'
    },
    {
      id: '2-right',
      title: 'Políticas Ambientales: Balance entre Conservación y Desarrollo',
      summary: 'Aunque las medidas ambientales son importantes, es crucial encontrar un equilibrio que no limite el crecimiento económico y la generación de empleo en sectores productivos.',
      source: 'La República',
      publishedAt: '2024-01-14T16:15:00Z',
      readTime: '5 min',
      category: 'Medio Ambiente',
      perspective: 'right',
      url: '#',
      authorName: 'Luis Hernández',
      authorAvatar: 'https://ui-avatars.com/api/?name=Luis+Hernández&background=f59e0b&color=fff',
      trending: true,
      locality: 'Barranquilla',
      imageUrl: 'https://picsum.photos/400/250?random=4'
    },
    {
      id: '3-left',
      title: 'Programas Sociales: Invirtiendo en el Futuro de Colombia',
      summary: 'La expansión de programas sociales representa una inversión estratégica en capital humano que generará beneficios económicos y sociales a largo plazo para el país.',
      source: 'El Tiempo',
      publishedAt: '2024-01-13T09:45:00Z',
      readTime: '4 min',
      category: 'Política Social',
      perspective: 'left',
      url: '#',
      authorName: 'Patricia Morales',
      authorAvatar: 'https://ui-avatars.com/api/?name=Patricia+Morales&background=8b5cf6&color=fff',
      trending: false,
      locality: 'Cartagena',
      imageUrl: 'https://picsum.photos/400/250?random=5'
    },
    {
      id: '3-right',
      title: 'Programas Sociales: Sostenibilidad Fiscal y Eficiencia',
      summary: 'Es fundamental evaluar la sostenibilidad fiscal de los programas sociales y asegurar que los recursos se utilicen de manera eficiente para maximizar su impacto.',
      source: 'Dinero',
      publishedAt: '2024-01-13T11:20:00Z',
      readTime: '4 min',
      category: 'Política Social',
      perspective: 'right',
      url: '#',
      authorName: 'Roberto Silva',
      authorAvatar: 'https://ui-avatars.com/api/?name=Roberto+Silva&background=ec4899&color=fff',
      trending: false,
      locality: 'Bucaramanga',
      imageUrl: 'https://picsum.photos/400/250?random=6'
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

  const handleCopyLink = async (article: NewsArticle) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + article.url);
      setCopiedLink(article.id);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleShare = async (article: NewsArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.origin + article.url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink(article);
    }
  };

  const NewsCard: React.FC<{ article: NewsArticle; perspective: 'left' | 'right' }> = ({ 
    article, 
    perspective 
  }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300 ${
      perspective === 'left' ? 'border-blue-500' : 'border-red-500'
    }`}>
      {/* Article Image */}
      {article.imageUrl && (
        <div className="mb-4">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Header with tags and author */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            perspective === 'left' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {perspective === 'left' ? '🔵 Perspectiva Progresista' : '🔴 Perspectiva Conservadora'}
          </span>
          {article.trending && (
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <FiTrendingUp size={10} />
              Trending
            </span>
          )}
          {article.locality && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              📍 {article.locality}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <FiClock size={12} />
          {article.readTime}
        </span>
      </div>

      {/* Author info */}
      {article.authorName && (
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={article.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.authorName)}&background=gray&color=fff`} 
            alt={article.authorName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{article.authorName}</p>
            <p className="text-xs text-gray-500">{article.source}</p>
          </div>
        </div>
      )}
      
      {/* Title and summary */}
      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
        {article.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {article.summary}
      </p>
      
      {/* Footer with metadata and actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500 gap-1">
          {!article.authorName && (
            <>
              <span className="font-medium">{article.source}</span>
              <span>•</span>
            </>
          )}
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShare(article)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Compartir"
          >
            <FiShare2 size={16} />
          </button>
          <button
            onClick={() => handleCopyLink(article)}
            className={`p-2 rounded-full transition-colors ${
              copiedLink === article.id
                ? 'text-green-600 bg-green-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            title="Copiar enlace"
          >
            <FiCopy size={16} />
          </button>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
            <FiExternalLink size={14} />
            Leer más
          </button>
        </div>
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
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Volver
            </button>
          )}
          
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-3">
                  📰 Perspectivas Balanceadas: {topic}
                </h1>
                <p className="text-white/90 text-lg mb-4">
                  Ve múltiples perspectivas del mismo tema para formar tu propia opinión
                </p>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <FiUser size={16} />
                    {leftNews.length + rightNews.length} artículos
                  </span>
                  <span className="flex items-center gap-2">
                    <FiTrendingUp size={16} />
                    {mockNews.filter(a => a.trending).length} trending
                  </span>
                  <span className="flex items-center gap-2">
                    <FiClock size={16} />
                    Actualizado recientemente
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white">⚖️</div>
                  <div className="text-white/90 text-sm mt-2">Balance</div>
                </div>
              </div>
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

        {/* Related Articles Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🔗</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Artículos Relacionados</h3>
              <p className="text-gray-600 text-sm">
                Otros temas que podrían interesarte basados en esta perspectiva balanceada
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Análisis Económico 2024", category: "Economía", readTime: "3 min" },
              { title: "Política de Salud Pública", category: "Salud", readTime: "5 min" },
              { title: "Educación y Tecnología", category: "Educación", readTime: "4 min" }
            ].map((related, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-sm text-blue-600 font-medium mb-1">{related.category}</div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">{related.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{related.readTime}</span>
                  <span className="text-blue-600">Leer →</span>
                </div>
              </div>
            ))}
          </div>
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

        {/* Submission Form Modal */}
        {showSubmissionForm && <SubmissionForm />}
      </div>
    </div>
  );
};

export default BalancedNewsView;