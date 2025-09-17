import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  content?: string;
}

interface DebateComment {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  likes: number;
}

const SearchResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<SearchResult | null>(null);
  const [comments, setComments] = useState<DebateComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading search result data
    // In a real app, this would fetch from an API using the ID
    const mockResult: SearchResult = {
      title: `Resultado de búsqueda #${id}`,
      link: `https://example.com/article/${id}`,
      snippet: 'Este es un resumen del contenido encontrado en la búsqueda...',
      content: `
        Este es el contenido completo del artículo o resultado de búsqueda.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
        veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      `
    };

    const mockComments: DebateComment[] = [
      {
        id: '1',
        user: 'María González',
        text: 'Muy interesante este artículo. Me parece que toca puntos importantes sobre la situación actual.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 5
      },
      {
        id: '2',
        user: 'Carlos Rodríguez',
        text: 'Estoy de acuerdo con algunos puntos, pero creo que falta más análisis sobre el impacto económico.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        likes: 3
      }
    ];

    setTimeout(() => {
      setResult(mockResult);
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: DebateComment = {
      id: Date.now().toString(),
      user: 'Usuario Actual',
      text: newComment.trim(),
      timestamp: new Date(),
      likes: 0
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');

    // Simulate posting to Community Hub
    console.log('Comentario enviado al Community Hub:', {
      comment: comment.text,
      articleLink: result?.link,
      articleTitle: result?.title
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `hace ${days} día${days > 1 ? 's' : ''}`;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-8"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Resultado no encontrado
          </h1>
          <button 
            onClick={() => navigate('/search')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a la búsqueda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Volver a resultados
          </button>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {result.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span>🔗 Fuente:</span>
              <a 
                href={result.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {result.link}
              </a>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Resumen:</h3>
                <p>{result.snippet}</p>
              </div>
              
              {result.content && (
                <div className="whitespace-pre-line">
                  {result.content}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
              <a 
                href={result.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                🔗 Leer artículo completo
              </a>
              <div className="text-sm text-gray-600">
                💬 {comments.length} comentarios
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              💬 Discusión sobre este resultado
              <span className="text-sm font-normal text-gray-600">
                ({comments.length} comentarios)
              </span>
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-700">ℹ️</span>
                  <span className="text-sm font-medium text-blue-800">
                    Integración con Community Hub
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  Tu comentario se publicará automáticamente en el Community Hub con referencia a este artículo.
                </p>
              </div>
              
              <div className="flex gap-3">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Comparte tu opinión sobre este resultado..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Comentar
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">💭</div>
                  <p className="text-lg font-medium mb-2">No hay comentarios aún</p>
                  <p className="text-sm">Sé el primero en comentar sobre este resultado</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">👤</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-800">{comment.user}</div>
                          <div className="text-sm text-gray-500">
                            {formatTimeAgo(comment.timestamp)}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            👍 {comment.likes}
                          </button>
                          <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;