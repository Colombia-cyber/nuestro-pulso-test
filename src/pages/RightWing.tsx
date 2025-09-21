import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaShare, FaBookmark, FaCommentAlt, FaNewspaper, FaUsers } from 'react-icons/fa';
import { BiNews, BiTime, BiTrendingUp } from 'react-icons/bi';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import Comments from '../components/Comments';

interface RightWingPageProps {
  onNavigate: (view: string) => void;
}

interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  timestamp: string;
  category: string;
  author?: string;
  readTime?: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  trending?: boolean;
}

const RightWingPage: React.FC<RightWingPageProps> = ({ onNavigate }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'trending' | 'recent'>('all');

  useEffect(() => {
    loadRightWingContent();
  }, [filter]);

  const loadRightWingContent = () => {
    setLoading(true);
    
    // Simulate loading conservative/right-wing content
    setTimeout(() => {
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'Fortalecimiento Empresarial: El Motor del Crecimiento Económico Colombiano',
          description: 'Análisis sobre la importancia de fortalecer el sector empresarial privado como generador de empleo y desarrollo económico sostenible en Colombia.',
          source: 'Empresa y Tradición',
          timestamp: 'Hace 1 hora',
          category: 'Economía Empresarial',
          author: 'Carlos Eduardo Vargas',
          readTime: '7 min',
          likes: 312,
          dislikes: 28,
          comments: 124,
          trending: true
        },
        {
          id: '2',
          title: 'Seguridad Ciudadana: Prioridades para un Colombia Próspero y Ordenado',
          description: 'Propuestas conservadoras para fortalecer la seguridad ciudadana, el orden público y la lucha efectiva contra el crimen organizado en Colombia.',
          source: 'Orden y Progreso',
          timestamp: 'Hace 3 horas',
          category: 'Seguridad Nacional',
          author: 'General (r) Roberto Fernández',
          readTime: '10 min',
          likes: 267,
          dislikes: 35,
          comments: 98,
          trending: true
        },
        {
          id: '3',
          title: 'Inversión Extranjera: Atrayendo Capital para el Desarrollo Nacional',
          description: 'La importancia de crear un ambiente favorable para la inversión extranjera como estrategia para modernizar la economía colombiana.',
          source: 'Capital y Crecimiento',
          timestamp: 'Hace 5 horas',
          category: 'Inversión',
          author: 'María Cristina Ospina',
          readTime: '8 min',
          likes: 198,
          dislikes: 22,
          comments: 67
        },
        {
          id: '4',
          title: 'Tradición y Valores: Preservando la Identidad Cultural Colombiana',
          description: 'Reflexión sobre la importancia de mantener nuestras tradiciones culturales y valores familiares en una sociedad en constante cambio.',
          source: 'Tradición Colombiana',
          timestamp: 'Hace 7 horas',
          category: 'Cultura y Valores',
          author: 'Monseñor Alberto Restrepo',
          readTime: '6 min',
          likes: 234,
          dislikes: 19,
          comments: 89
        },
        {
          id: '5',
          title: 'Reducción de Impuestos: Estimulando la Productividad Nacional',
          description: 'Propuesta para reducir la carga tributaria como mecanismo para incentivar la inversión privada y el crecimiento económico.',
          source: 'Libertad Económica',
          timestamp: 'Hace 9 horas',
          category: 'Política Fiscal',
          author: 'Dr. Alejandro Martínez',
          readTime: '9 min',
          likes: 189,
          dislikes: 31,
          comments: 73
        },
        {
          id: '6',
          title: 'Educación de Calidad: Meritocracia y Excelencia Académica',
          description: 'La necesidad de un sistema educativo basado en la meritocracia y la excelencia académica para formar ciudadanos competitivos.',
          source: 'Educación Excelente',
          timestamp: 'Hace 11 horas',
          category: 'Educación',
          author: 'Dra. Patricia Londoño',
          readTime: '8 min',
          likes: 156,
          dislikes: 24,
          comments: 54
        },
        {
          id: '7',
          title: 'Defensa Nacional: Fortaleciendo Nuestras Fuerzas Armadas',
          description: 'Análisis sobre la importancia de modernizar y fortalecer las Fuerzas Armadas como garantes de la soberanía nacional.',
          source: 'Defensa Patria',
          timestamp: 'Hace 1 día',
          category: 'Defensa',
          author: 'Almirante (r) José García',
          readTime: '11 min',
          likes: 278,
          dislikes: 33,
          comments: 112
        }
      ];
      
      let filteredArticles = mockArticles;
      if (filter === 'trending') {
        filteredArticles = mockArticles.filter(a => a.trending);
      } else if (filter === 'recent') {
        filteredArticles = mockArticles.sort((a, b) => {
          // Simple sort by timestamp (in real app, would parse actual dates)
          return a.timestamp.includes('hora') ? -1 : 1;
        });
      }
      
      setArticles(filteredArticles);
      setLoading(false);
    }, 800);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCommentSubmit = (comment: string) => {
    if (!selectedArticle) return;
    
    // INSTANT COMMENT POSTING
    const newCommentCount = (selectedArticle.comments || 0) + 1;
    const updatedArticle = { ...selectedArticle, comments: newCommentCount };
    setSelectedArticle(updatedArticle);
    
    // Update in articles list
    setArticles(prev => prev.map(a => 
      a.id === selectedArticle.id ? updatedArticle : a
    ));
    
    console.log('Comment posted instantly:', comment);
  };

  const formatTimeAgo = (timestamp: string) => {
    return timestamp;
  };

  const getFilterLabel = (filterType: string) => {
    switch (filterType) {
      case 'trending': return 'Tendencias';
      case 'recent': return 'Recientes';
      default: return 'Todo';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando Perspectiva de Derecha</h3>
          <p className="text-gray-500">Preparando contenido conservador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 text-red-100 hover:text-white transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>
              <div>
                <h1 className="text-3xl font-bold">Perspectiva de Derecha</h1>
                <p className="text-red-100">Análisis conservador y tradicional • Colombia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-red-100">Artículos activos</div>
                <div className="text-2xl font-bold">{articles.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-gray-700">Filtros:</span>
              {['all', 'trending', 'recent'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all border-2 ${
                    filter === filterType
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  {getFilterLabel(filterType)}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {articles.map((article) => (
                <article 
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                        {article.category}
                      </span>
                      {article.trending && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold flex items-center gap-1">
                          <BiTrendingUp className="w-3 h-3" />
                          Tendencia
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <BiTime className="w-4 h-4" />
                      {formatTimeAgo(article.timestamp)}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">{article.source}</span>
                      {article.author && (
                        <>
                          <span>•</span>
                          <span>Por {article.author}</span>
                        </>
                      )}
                      {article.readTime && (
                        <>
                          <span>•</span>
                          <span>{article.readTime} lectura</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <MdThumbUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">{article.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCommentAlt className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium">{article.comments}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Artículos hoy</span>
                    <span className="font-bold text-red-600">{articles.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">En tendencia</span>
                    <span className="font-bold text-orange-600">{articles.filter(a => a.trending).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total comentarios</span>
                    <span className="font-bold text-green-600">{articles.reduce((sum, a) => sum + (a.comments || 0), 0)}</span>
                  </div>
                </div>
              </div>

              {/* Popular Topics */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4">Temas Populares</h3>
                <div className="space-y-2">
                  {['Fortalecimiento Empresarial', 'Seguridad Ciudadana', 'Inversión Extranjera', 'Tradición Cultural', 'Reducción Impuestos'].map((topic) => (
                    <button
                      key={topic}
                      className="block w-full text-left text-sm px-3 py-2 rounded hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal with Instant Comments */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedArticle.description}</p>
              
              {/* Comments Section with Instant Posting */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Comentarios ({selectedArticle.comments})</h3>
                <Comments 
                  onCommentSubmit={handleCommentSubmit}
                  allowInstantPosting={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightWingPage;