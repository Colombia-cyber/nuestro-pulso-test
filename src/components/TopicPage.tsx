import React, { useState, useEffect } from 'react';
import UniversalFeeds from './UniversalFeeds';
import UniversalReels from './UniversalReels';

interface TopicPageProps {
  topicId: string;
  onClose: () => void;
}

interface TopicInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  gradient: string;
  stats: {
    followers: number;
    posts: number;
    trending: number;
  };
  featuredContent: {
    title: string;
    description: string;
    image: string;
    type: 'video' | 'article' | 'live';
  }[];
  relatedTopics: string[];
}

const TopicPage: React.FC<TopicPageProps> = ({ topicId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'feeds' | 'reels'>('feeds');
  const [topicInfo, setTopicInfo] = useState<TopicInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Rich content generator based on topic
  const generateTopicInfo = (id: string): TopicInfo => {
    const topicData: { [key: string]: TopicInfo } = {
      'gustavo-petro': {
        id: 'gustavo-petro',
        name: 'Gustavo Petro',
        icon: '🇨🇴',
        description: 'Presidente de Colombia (2022-2026). Ex alcalde de Bogotá, senador y líder del Pacto Histórico. Síguelo en todas las noticias, discursos y políticas.',
        gradient: 'from-blue-600 via-green-500 to-yellow-400',
        stats: {
          followers: 2847593,
          posts: 15642,
          trending: 89
        },
        featuredContent: [
          {
            title: 'Último discurso presidencial sobre reforma tributaria',
            description: 'El presidente Petro presenta las nuevas medidas económicas para 2024',
            image: '🎙️',
            type: 'video'
          },
          {
            title: 'Política de Paz Total: Avances y retos',
            description: 'Análisis completo de la estrategia de paz del gobierno',
            image: '🕊️',
            type: 'article'
          },
          {
            title: 'En vivo: Rueda de prensa presidencial',
            description: 'Transmisión en directo desde Casa de Nariño',
            image: '🔴',
            type: 'live'
          }
        ],
        relatedTopics: ['política', 'paz-total', 'reforma-tributaria', 'colombia']
      },
      'donald-trump': {
        id: 'donald-trump',
        name: 'Donald Trump',
        icon: '🇺🇸',
        description: 'Ex presidente de Estados Unidos (2017-2021) y candidato presidencial 2024. Sigue su campaña, declaraciones y el impacto en las relaciones Colombia-EE.UU.',
        gradient: 'from-red-600 via-white to-blue-600',
        stats: {
          followers: 4562938,
          posts: 23847,
          trending: 156
        },
        featuredContent: [
          {
            title: 'Trump y las relaciones con Colombia',
            description: 'Análisis de las políticas de Trump hacia América Latina',
            image: '🤝',
            type: 'article'
          },
          {
            title: 'Campaña presidencial 2024: Últimas noticias',
            description: 'Cobertura completa de la carrera electoral estadounidense',
            image: '🗳️',
            type: 'video'
          },
          {
            title: 'Impacto en el comercio Colombia-EE.UU.',
            description: 'Cómo las políticas de Trump afectarían el comercio bilateral',
            image: '📊',
            type: 'article'
          }
        ],
        relatedTopics: ['elecciones-usa', 'comercio-internacional', 'diplomacia', 'america-latina']
      },
      'crime': {
        id: 'crime',
        name: 'Crime',
        icon: '🚔',
        description: 'Seguimiento de la criminalidad en Colombia: estadísticas, casos destacados, políticas de seguridad y prevención del delito.',
        gradient: 'from-red-500 to-orange-500',
        stats: {
          followers: 892456,
          posts: 8934,
          trending: 45
        },
        featuredContent: [
          {
            title: 'Estadísticas de criminalidad 2024',
            description: 'Análisis de los índices de criminalidad en las principales ciudades',
            image: '📊',
            type: 'article'
          },
          {
            title: 'Operativos policiales en tiempo real',
            description: 'Cobertura de operaciones contra el crimen organizado',
            image: '🚨',
            type: 'live'
          },
          {
            title: 'Programas de prevención del delito',
            description: 'Iniciativas comunitarias para reducir la criminalidad',
            image: '🛡️',
            type: 'video'
          }
        ],
        relatedTopics: ['seguridad', 'policia', 'justicia', 'prevencion']
      },
      'corruption': {
        id: 'corruption',
        name: 'Corruption',
        icon: '⚖️',
        description: 'Seguimiento de casos de corrupción, investigaciones, transparencia gubernamental y rendición de cuentas en Colombia.',
        gradient: 'from-gray-600 to-gray-800',
        stats: {
          followers: 1245789,
          posts: 12456,
          trending: 67
        },
        featuredContent: [
          {
            title: 'Caso Odebrecht: Últimos desarrollos',
            description: 'Seguimiento de las investigaciones y procesos judiciales',
            image: '⚖️',
            type: 'article'
          },
          {
            title: 'Transparencia en contratación pública',
            description: 'Herramientas para el control ciudadano',
            image: '🔍',
            type: 'video'
          },
          {
            title: 'Audiencias en vivo: Casos de corrupción',
            description: 'Transmisión de audiencias judiciales relevantes',
            image: '🏛️',
            type: 'live'
          }
        ],
        relatedTopics: ['transparencia', 'justicia', 'fiscalia', 'procuraduria']
      }
    };

    // Default topic if not found
    return topicData[id] || {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' '),
      icon: '📰',
      description: `Explora todo el contenido relacionado con ${id} en nuestra plataforma.`,
      gradient: 'from-blue-500 to-purple-600',
      stats: {
        followers: 45623,
        posts: 2847,
        trending: 23
      },
      featuredContent: [
        {
          title: `Últimas noticias sobre ${id}`,
          description: `Mantente al día con las últimas actualizaciones`,
          image: '📰',
          type: 'article'
        }
      ],
      relatedTopics: ['noticias', 'actualidad', 'colombia']
    };
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTopicInfo(generateTopicInfo(topicId));
      setLoading(false);
    }, 500);
  }, [topicId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⟳</div>
            <p className="text-gray-600">Cargando contenido...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!topicInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${topicInfo.gradient} p-6 text-white relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>

          <div className="flex items-start space-x-6">
            <div className="text-6xl">{topicInfo.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{topicInfo.name}</h1>
              <p className="text-white/90 text-lg mb-4 leading-relaxed">
                {topicInfo.description}
              </p>
              
              {/* Stats */}
              <div className="flex items-center space-x-8 text-white/80">
                <div className="text-center">
                  <div className="text-2xl font-bold">{topicInfo.stats.followers.toLocaleString()}</div>
                  <div className="text-sm">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{topicInfo.stats.posts.toLocaleString()}</div>
                  <div className="text-sm">Publicaciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{topicInfo.stats.trending}</div>
                  <div className="text-sm">Trending hoy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow button */}
          <div className="mt-6">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              ⭐ Seguir tema
            </button>
          </div>
        </div>

        {/* Featured content */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📌 Contenido destacado</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topicInfo.featuredContent.map((content, index) => (
              <div key={index} 
                   className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{content.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        content.type === 'live' ? 'bg-red-100 text-red-800' :
                        content.type === 'video' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {content.type === 'live' ? '🔴 EN VIVO' : content.type.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related topics */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">🏷️ Temas relacionados</h2>
          <div className="flex flex-wrap gap-2">
            {topicInfo.relatedTopics.map((topic, index) => (
              <button
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium 
                         hover:bg-blue-200 transition-colors"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="p-6">
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('feeds')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'feeds'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📰 Feeds
            </button>
            <button
              onClick={() => setActiveTab('reels')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'reels'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎬 Reels
            </button>
          </div>

          {/* Content */}
          <div className="min-h-96">
            {activeTab === 'feeds' ? (
              <UniversalFeeds topic={topicInfo.name} />
            ) : (
              <UniversalReels topic={topicInfo.name} />
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <span>📤</span>
                <span>Compartir tema</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <span>💬</span>
                <span>Discutir en Community Hub</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                <span>🔔</span>
                <span>Notificaciones</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Actualizado hace 2 minutos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;