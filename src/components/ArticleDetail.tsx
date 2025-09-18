import React, { useState, useEffect } from 'react';
import { FaTimes, FaHeart, FaShare, FaFlag, FaClock, FaUser, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
// import { db } from '../firebase';
// import { collection, addDoc, onSnapshot, query, orderBy, where, serverTimestamp } from 'firebase/firestore';

interface ArticleComment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  wing: 'right' | 'left';
  likes: number;
  dislikes: number;
  replies: ArticleComment[];
}

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  source: string;
  publishDate: Date;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  views: number;
  likes: number;
  shares: number;
}

interface ArticleDetailProps {
  articleId: string;
  onClose: () => void;
  onNavigate?: (view: string, data?: any) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onClose, onNavigate }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [activeTab, setActiveTab] = useState<'right' | 'left'>('right');
  const [rightComments, setRightComments] = useState<ArticleComment[]>([]);
  const [leftComments, setLeftComments] = useState<ArticleComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'Usuario Anónimo', avatar: '👤' });
  const [isLoading, setIsLoading] = useState(true);

  // Sample article data
  const sampleArticle: Article = {
    id: articleId,
    title: 'Reforma Tributaria 2024: Análisis de Impacto en la Clase Media Colombiana',
    content: `La reforma tributaria presentada por el gobierno de Gustavo Petro ha generado un intenso debate en el país. El proyecto, que busca recaudar 25 billones de pesos adicionales, plantea cambios significativos en la estructura impositiva que afectarían directamente a la clase media.

**Puntos Clave de la Reforma:**

1. **Impuesto a la Renta**: Se elimina el beneficio de las cuentas AFC y se reduce el tope de las deducciones por dependientes.

2. **IVA**: Se amplía la base gravable incluyendo algunos productos de la canasta familiar que actualmente están exentos.

3. **Patrimonio**: Se establece un nuevo impuesto al patrimonio para personas con activos superiores a 3.000 millones de pesos.

4. **Pensiones**: Se limitan los beneficios tributarios de los fondos privados de pensiones.

La propuesta ha dividido opiniones entre economistas, empresarios y ciudadanos. Mientras el gobierno argumenta que es necesaria para financiar programas sociales y reducir la desigualdad, los críticos señalan que podría frenar el crecimiento económico y afectar la competitividad del país.

**Impacto Esperado:**

Según estudios del Ministerio de Hacienda, la reforma podría generar recursos suficientes para financiar programas como el ingreso ciudadano y mejoras en infraestructura educativa. Sin embargo, gremios empresariales advierten sobre posibles efectos negativos en la inversión y el empleo.

La discusión en el Congreso promete ser intensa, con múltiples sectores expresando sus posiciones y proponiendo modificaciones al articulado original.`,
    author: 'María González',
    source: 'El Espectador',
    publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'Política',
    tags: ['reforma tributaria', 'impuestos', 'economia', 'petro', 'congreso'],
    readTime: 8,
    views: 15420,
    likes: 892,
    shares: 156
  };

  // Sample comments data
  const sampleRightComments: ArticleComment[] = [
    {
      id: '1',
      text: 'Esta reforma es un desastre para la economía colombiana. Va a espantar la inversión extranjera y generar más desempleo.',
      author: 'Carlos Mendoza',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      wing: 'right',
      likes: 23,
      dislikes: 5,
      replies: []
    },
    {
      id: '2',
      text: 'El gobierno no entiende que subir impuestos en una crisis económica es contraproducente. Necesitamos menos Estado, no más.',
      author: 'Ana Suárez',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      wing: 'right',
      likes: 31,
      dislikes: 8,
      replies: []
    },
    {
      id: '3',
      text: 'La clase media ya está suficientemente golpeada. Esta reforma la va a terminar de hundir. Es populismo puro.',
      author: 'Roberto Silva',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      wing: 'right',
      likes: 18,
      dislikes: 3,
      replies: []
    }
  ];

  const sampleLeftComments: ArticleComment[] = [
    {
      id: '4',
      text: 'Es hora de que los más ricos paguen lo que les corresponde. Esta reforma es justa y necesaria para reducir la desigualdad.',
      author: 'Laura Ramírez',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      wing: 'left',
      likes: 45,
      dislikes: 12,
      replies: []
    },
    {
      id: '5',
      text: 'Finalmente un gobierno que se preocupa por los más vulnerables. Los recursos de esta reforma van a transformar el país.',
      author: 'José Martínez',
      timestamp: new Date(Date.now() - 40 * 60 * 1000),
      wing: 'left',
      likes: 38,
      dislikes: 7,
      replies: []
    },
    {
      id: '6',
      text: 'La oposición siempre dice lo mismo: que van a quebrar el país. Pero nunca proponen alternativas para financiar la justicia social.',
      author: 'Claudia Torres',
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
      wing: 'left',
      likes: 29,
      dislikes: 9,
      replies: []
    }
  ];

  useEffect(() => {
    // Load article data
    setArticle(sampleArticle);
    setRightComments(sampleRightComments);
    setLeftComments(sampleLeftComments);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    return () => clearTimeout(timer);
  }, [articleId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const comment: ArticleComment = {
        id: Date.now().toString(),
        text: newComment.trim(),
        author: userProfile.name,
        timestamp: new Date(),
        wing: activeTab,
        likes: 0,
        dislikes: 0,
        replies: []
      };

      // Add to local state immediately for better UX
      if (activeTab === 'right') {
        setRightComments(prev => [comment, ...prev]);
      } else {
        setLeftComments(prev => [comment, ...prev]);
      }

      // Here you would typically save to Firebase:
      // await addDoc(collection(db, 'comments'), {
      //   articleId,
      //   text: comment.text,
      //   author: comment.author,
      //   wing: comment.wing,
      //   timestamp: serverTimestamp(),
      //   likes: 0,
      //   dislikes: 0
      // });

      setNewComment('');
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error al enviar comentario. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string, wing: 'right' | 'left') => {
    const updateComments = wing === 'right' ? setRightComments : setLeftComments;
    
    updateComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleDislikeComment = (commentId: string, wing: 'right' | 'left') => {
    const updateComments = wing === 'right' ? setRightComments : setLeftComments;
    
    updateComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, dislikes: comment.dislikes + 1 }
        : comment
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Ahora';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  const currentComments = activeTab === 'right' ? rightComments : leftComments;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando artículo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Artículo no encontrado</h3>
            <p className="text-gray-600 mb-4">No se pudo cargar el artículo solicitado.</p>
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{article.category}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{article.source}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-white/90 text-sm">
                <span className="flex items-center">
                  <FaUser className="mr-1" />
                  {article.author}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {formatTimeAgo(article.publishDate)}
                </span>
                <span>{article.readTime} min lectura</span>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(90vh-200px)]">
            {/* Article Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                  {article.content}
                </div>
              </div>
              
              {/* Article Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-gray-600">
                    <span className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{article.views.toLocaleString()} vistas</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaHeart className="text-red-500" />
                      <span>{article.likes} me gusta</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaShare className="text-blue-500" />
                      <span>{article.shares} compartidos</span>
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="w-96 border-l border-gray-200 flex flex-col">
              {/* Tab Header */}
              <div className="bg-gray-50 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Comentarios</h3>
                
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('right')}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                      activeTab === 'right'
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🗳️ Derecha ({rightComments.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('left')}
                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                      activeTab === 'left'
                        ? 'bg-red-600 text-white shadow'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    🌹 Izquierda ({leftComments.length})
                  </button>
                </div>
              </div>

              {/* Comment Form */}
              <div className="p-4 border-b border-gray-200">
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{userProfile.avatar}</span>
                    <span className="font-medium text-gray-700">{userProfile.name}</span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded inline-block ${
                    activeTab === 'right' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    Comentando desde perspectiva {activeTab === 'right' ? 'de derecha' : 'de izquierda'}
                  </div>
                </div>
                
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Comparte tu opinión desde una perspectiva ${activeTab === 'right' ? 'conservadora' : 'progresista'}...`}
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  maxLength={500}
                />
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {newComment.length}/500 caracteres
                  </span>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || isSubmitting}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !newComment.trim() || isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : activeTab === 'right'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Comentar'}
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto">
                {currentComments.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="text-4xl mb-2">💬</div>
                    <p>Sé el primero en comentar desde esta perspectiva</p>
                  </div>
                ) : (
                  <div className="space-y-4 p-4">
                    {currentComments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">👤</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimeAgo(comment.timestamp)}
                              </span>
                            </div>
                            
                            <p className="text-gray-800 text-sm leading-relaxed mb-3">
                              {comment.text}
                            </p>
                            
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleLikeComment(comment.id, comment.wing)}
                                className="flex items-center space-x-1 text-gray-500 hover:text-green-600 text-sm"
                              >
                                <FaThumbsUp />
                                <span>{comment.likes}</span>
                              </button>
                              <button
                                onClick={() => handleDislikeComment(comment.id, comment.wing)}
                                className="flex items-center space-x-1 text-gray-500 hover:text-red-600 text-sm"
                              >
                                <FaThumbsDown />
                                <span>{comment.dislikes}</span>
                              </button>
                              <button className="text-gray-500 hover:text-blue-600 text-sm">
                                Responder
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => onNavigate && onNavigate('community-hub')}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  👥 Ver en Community Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;