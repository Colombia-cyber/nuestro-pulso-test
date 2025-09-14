import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  location: string;
  interests: string[];
  avatar: string;
  isOnline: boolean;
  mutualFriends?: number;
}

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: 'politics' | 'conservative' | 'local' | 'business' | 'civic';
  isJoined: boolean;
  icon: string;
  recentActivity: string;
}

const CommunityModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const suggestedFriends: User[] = [
    {
      id: '1',
      name: 'María González',
      location: 'Bogotá, Colombia',
      interests: ['Política', 'Economía', 'Conservador'],
      avatar: '👩‍💼',
      isOnline: true,
      mutualFriends: 3
    },
    {
      id: '2',
      name: 'Carlos Mendoza',
      location: 'Medellín, Antioquia',
      interests: ['Empresarios', 'Libre Mercado', 'Elecciones'],
      avatar: '👨‍💼',
      isOnline: false,
      mutualFriends: 7
    },
    {
      id: '3',
      name: 'Ana Rodríguez',
      location: 'Cali, Valle del Cauca',
      interests: ['Política Local', 'Conservador', 'Seguridad'],
      avatar: '👩‍💻',
      isOnline: true,
      mutualFriends: 2
    },
    {
      id: '4',
      name: 'Roberto Silva',
      location: 'Barranquilla, Atlántico',
      interests: ['Candidatos', 'Análisis Electoral', 'Economía'],
      avatar: '👨‍🎓',
      isOnline: true,
      mutualFriends: 5
    }
  ];

  const communities: Community[] = [
    {
      id: '1',
      name: 'Empresarios por Colombia',
      description: 'Comunidad de empresarios que promueven políticas de libre mercado y crecimiento económico',
      memberCount: 1247,
      category: 'business',
      isJoined: false,
      icon: '💼',
      recentActivity: 'Nueva propuesta fiscal discutida hace 2h'
    },
    {
      id: '2',
      name: 'Conservadores de Antioquia',
      description: 'Ciudadanos conservadores de Antioquia organizándose para las elecciones regionales',
      memberCount: 892,
      category: 'conservative',
      isJoined: true,
      icon: '🟠',
      recentActivity: 'Encuentro ciudadano programado para el sábado'
    },
    {
      id: '3',
      name: 'Observadores Electorales',
      description: 'Red de ciudadanos comprometidos con la transparencia electoral y veeduría ciudadana',
      memberCount: 2156,
      category: 'civic',
      isJoined: false,
      icon: '👁️',
      recentActivity: 'Capacitación sobre veeduría electoral'
    },
    {
      id: '4',
      name: 'Jóvenes por el Cambio',
      description: 'Jóvenes profesionales interesados en participación política y desarrollo del país',
      memberCount: 756,
      category: 'politics',
      isJoined: true,
      icon: '🌟',
      recentActivity: 'Debate sobre educación superior hace 1h'
    },
    {
      id: '5',
      name: 'Ciudadanos de Bogotá',
      description: 'Comunidad local para discutir temas de la capital y participar en política distrital',
      memberCount: 3421,
      category: 'local',
      isJoined: false,
      icon: '🏙️',
      recentActivity: 'Propuesta de movilidad en discusión'
    }
  ];

  const getCategoryColor = (category: Community['category']) => {
    switch (category) {
      case 'conservative': return 'bg-orange-100 text-orange-800';
      case 'politics': return 'bg-blue-100 text-blue-800';
      case 'business': return 'bg-green-100 text-green-800';
      case 'civic': return 'bg-purple-100 text-purple-800';
      case 'local': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'discover', name: 'Descubrir', icon: '🔍' },
    { id: 'friends', name: 'Amigos', icon: '👥' },
    { id: 'communities', name: 'Comunidades', icon: '🏘️' },
    { id: 'events', name: 'Eventos', icon: '📅' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">👥 Comunidad Cívica</h1>
          <p className="text-white/90">Conecta con ciudadanos comprometidos y únete a comunidades de interés</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🌐 {communities.length} comunidades activas</span>
            <span>👥 15,423 miembros conectados</span>
            <span>💬 234 conversaciones hoy</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">🔍 Descubre Personas y Comunidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Personas Sugeridas</h3>
                  <div className="space-y-3">
                    {suggestedFriends.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{user.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{user.name}</h4>
                            {user.isOnline && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                          </div>
                          <p className="text-sm text-gray-600">{user.location}</p>
                          <p className="text-xs text-gray-500">{user.mutualFriends} amigos en común</p>
                        </div>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                          Conectar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Comunidades Recomendadas</h3>
                  <div className="space-y-3">
                    {communities.slice(0, 3).map((community) => (
                      <div key={community.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{community.icon}</span>
                          <h4 className="font-medium text-gray-900">{community.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{community.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{community.memberCount} miembros</span>
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                            Unirse
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">👥 Conectar con Ciudadanos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedFriends.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{user.avatar}</div>
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.isOnline && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                    </div>
                    <p className="text-sm text-gray-600">{user.location}</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Intereses:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.interests.map((interest, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {user.mutualFriends && (
                    <p className="text-xs text-gray-500 mb-3">{user.mutualFriends} amigos en común</p>
                  )}
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                      Conectar
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                      💬
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'communities' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">🏘️ Comunidades</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                + Crear Comunidad
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communities.map((community) => (
                <div key={community.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3 mb-3">
                    <span className="text-2xl">{community.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{community.name}</h3>
                        {community.isJoined && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            Miembro
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(community.category)}`}>
                        {community.category.charAt(0).toUpperCase() + community.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{community.description}</p>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    <p>{community.memberCount.toLocaleString()} miembros</p>
                    <p>🔄 {community.recentActivity}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {community.isJoined ? (
                      <>
                        <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm hover:bg-green-700 transition-colors">
                          Ver Comunidad
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                          Configurar
                        </button>
                      </>
                    ) : (
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                        Unirse
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📅 Eventos Cívicos</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">15</div>
                    <div className="text-xs text-blue-600">NOV</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Encuentro Conservadores de Antioquia</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Reunión para coordinar estrategias electorales y discutir propuestas de candidatos conservadores
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 Medellín, Antioquia</span>
                      <span>🕒 2:00 PM - 5:00 PM</span>
                      <span>👥 127 asistirán</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                    Asistir
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">18</div>
                    <div className="text-xs text-green-600">NOV</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Taller de Veeduría Electoral</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Capacitación para ciudadanos interesados en ejercer veeduría durante las próximas elecciones
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 Virtual</span>
                      <span>🕒 7:00 PM - 9:00 PM</span>
                      <span>👥 89 asistirán</span>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                    Asistir
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Ver Todos los Eventos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityModule;