import React, { useState } from 'react';

interface UserPreferences {
  newsTopics: string[];
  notifications: {
    debates: boolean;
    news: boolean;
    community: boolean;
    email: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    dataCollection: boolean;
    analytics: boolean;
  };
  feed: {
    politicalLean: 'all' | 'conservative' | 'liberal' | 'centrist';
    contentType: 'all' | 'news' | 'debates' | 'community';
    language: 'es' | 'en';
  };
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'notifications' | 'feed' | 'history'>('general');
  const [preferences, setPreferences] = useState<UserPreferences>({
    newsTopics: ['politics', 'economics'],
    notifications: {
      debates: true,
      news: true,
      community: false,
      email: true
    },
    privacy: {
      profileVisibility: 'public',
      dataCollection: true,
      analytics: true
    },
    feed: {
      politicalLean: 'all',
      contentType: 'all',
      language: 'es'
    }
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const newsTopicsOptions = [
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'economics', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'environment', name: 'Ambiente', icon: '🌱' },
    { id: 'education', name: 'Educación', icon: '📚' },
    { id: 'health', name: 'Salud', icon: '🏥' },
    { id: 'technology', name: 'Tecnología', icon: '💻' },
    { id: 'sports', name: 'Deportes', icon: '⚽' }
  ];

  const updatePreference = (section: keyof UserPreferences, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const toggleNewsTopic = (topicId: string) => {
    setPreferences(prev => ({
      ...prev,
      newsTopics: prev.newsTopics.includes(topicId)
        ? prev.newsTopics.filter(id => id !== topicId)
        : [...prev.newsTopics, topicId]
    }));
  };

  const clearHistory = (type: 'search' | 'viewing' | 'all') => {
    setShowConfirmation(true);
    // Simulate clearing history
    setTimeout(() => {
      setShowConfirmation(false);
      alert(`Historial ${type === 'all' ? 'completo' : type === 'search' ? 'de búsqueda' : 'de navegación'} eliminado exitosamente`);
    }, 2000);
  };

  const exportData = () => {
    const data = {
      preferences,
      exportDate: new Date().toISOString(),
      user: 'current_user'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nuestro-pulso-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">⚙️ Configuración</h1>
          <p className="text-blue-100">
            Personaliza tu experiencia en Nuestro Pulso - Similar a las configuraciones de Google
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {[
                  { key: 'general', label: '🏠 General', description: 'Configuraciones básicas' },
                  { key: 'feed', label: '📰 Feed y Contenido', description: 'Personaliza tu feed' },
                  { key: 'notifications', label: '🔔 Notificaciones', description: 'Alertas y avisos' },
                  { key: 'privacy', label: '🔒 Privacidad', description: 'Datos y seguridad' },
                  { key: 'history', label: '📚 Historial', description: 'Gestionar datos' }
                ].map(({ key, label, description }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeTab === key
                        ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{label}</div>
                    <div className="text-xs opacity-80">{description}</div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              
              {/* General Settings */}
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">🏠 Configuración General</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma de la interfaz
                      </label>
                      <select 
                        value={preferences.feed.language}
                        onChange={(e) => updatePreference('feed', 'language', e.target.value)}
                        className="w-full md:w-64 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="es">🇨🇴 Español (Colombia)</option>
                        <option value="en">🇺🇸 English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zona horaria
                      </label>
                      <select className="w-full md:w-64 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                        <option value="america/bogota">🇨🇴 América/Bogotá (COT)</option>
                        <option value="america/caracas">🇻🇪 América/Caracas</option>
                        <option value="america/lima">🇵🇪 América/Lima</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Temas de Interés</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Selecciona los temas sobre los que quieres recibir más contenido
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {newsTopicsOptions.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => toggleNewsTopic(topic.id)}
                            className={`p-3 rounded-lg border transition-colors ${
                              preferences.newsTopics.includes(topic.id)
                                ? 'bg-blue-100 border-blue-500 text-blue-700'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <div className="text-2xl mb-1">{topic.icon}</div>
                            <div className="text-sm font-medium">{topic.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feed Settings */}
              {activeTab === 'feed' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">📰 Configuración del Feed</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferencia política
                      </label>
                      <p className="text-sm text-gray-600 mb-3">
                        Personaliza el contenido según tu perspectiva política
                      </p>
                      <div className="space-y-3">
                        {[
                          { value: 'all', label: '🌐 Todas las perspectivas', desc: 'Contenido balanceado de todas las corrientes' },
                          { value: 'conservative', label: '🗳️ Conservador', desc: 'Énfasis en contenido conservador' },
                          { value: 'liberal', label: '🌹 Liberal', desc: 'Énfasis en contenido liberal' },
                          { value: 'centrist', label: '⚖️ Centrista', desc: 'Enfoque en posiciones moderadas' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name="politicalLean"
                              value={option.value}
                              checked={preferences.feed.politicalLean === option.value}
                              onChange={(e) => updatePreference('feed', 'politicalLean', e.target.value)}
                              className="mt-1"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de contenido preferido
                      </label>
                      <select 
                        value={preferences.feed.contentType}
                        onChange={(e) => updatePreference('feed', 'contentType', e.target.value)}
                        className="w-full md:w-64 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">🌐 Todo el contenido</option>
                        <option value="news">📰 Solo noticias</option>
                        <option value="debates">🗣️ Solo debates</option>
                        <option value="community">💬 Solo comunidad</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">🔔 Notificaciones</h2>
                  
                  <div className="space-y-6">
                    {[
                      { key: 'debates', label: '🗣️ Nuevos debates', desc: 'Cuando se abren debates sobre tus temas de interés' },
                      { key: 'news', label: '📰 Noticias importantes', desc: 'Breaking news y actualizaciones relevantes' },
                      { key: 'community', label: '💬 Actividad comunitaria', desc: 'Respuestas a tus publicaciones y menciones' },
                      { key: 'email', label: '📧 Resumen por email', desc: 'Resumen semanal de actividad' }
                    ].map((notification) => (
                      <div key={notification.key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{notification.label}</div>
                          <div className="text-sm text-gray-600">{notification.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.notifications[notification.key as keyof typeof preferences.notifications]}
                            onChange={(e) => updatePreference('notifications', notification.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">🔒 Privacidad y Datos</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-600 mr-2">⚠️</span>
                        <span className="font-medium text-yellow-800">Configuraciones importantes</span>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Estas configuraciones afectan cómo se recopilan y utilizan tus datos. Similar a las configuraciones de privacidad de Google.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Visibilidad del perfil
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: 'public', label: '🌐 Público', desc: 'Tu perfil es visible para todos los usuarios' },
                          { value: 'private', label: '🔒 Privado', desc: 'Solo tú puedes ver tu actividad' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={option.value}
                              checked={preferences.privacy.profileVisibility === option.value}
                              onChange={(e) => updatePreference('privacy', 'profileVisibility', e.target.value)}
                              className="mt-1"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'dataCollection', label: '📊 Recopilación de datos', desc: 'Permitir recopilación de datos para personalización' },
                        { key: 'analytics', label: '📈 Analytics', desc: 'Compartir datos anónimos para mejorar la plataforma' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{setting.label}</div>
                            <div className="text-sm text-gray-600">{setting.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={Boolean(preferences.privacy[setting.key as 'dataCollection' | 'analytics'])}
                              onChange={(e) => updatePreference('privacy', setting.key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* History Management */}
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Gestión del Historial</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-600 mr-2">ℹ️</span>
                        <span className="font-medium text-blue-800">Gestión similar a Google</span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Controla tu historial de búsquedas, navegación y actividad. Puedes eliminar datos específicos o exportar toda tu información.
                      </p>
                    </div>

                    {/* Clear History Options */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">🗑️ Eliminar Historial</h3>
                      <div className="space-y-4">
                        {[
                          { type: 'search', label: '🔍 Historial de búsqueda', desc: 'Eliminar todas las búsquedas realizadas', color: 'red' },
                          { type: 'viewing', label: '👁️ Historial de navegación', desc: 'Eliminar páginas visitadas y tiempo de permanencia', color: 'orange' },
                          { type: 'all', label: '🗑️ Todo el historial', desc: 'Eliminar completamente toda la actividad', color: 'red' }
                        ].map((option) => (
                          <div key={option.type} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-medium text-gray-900">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.desc}</div>
                            </div>
                            <button
                              onClick={() => clearHistory(option.type as any)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                option.color === 'red'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                              }`}
                            >
                              Eliminar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Export Data */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">📥 Exportar Datos</h3>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">💾 Descargar mis datos</div>
                            <div className="text-sm text-gray-600">Exportar todas tus preferencias y datos en formato JSON</div>
                          </div>
                          <button
                            onClick={exportData}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Descargar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Account Deletion */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Zona de Peligro</h3>
                      <p className="text-red-700 text-sm mb-4">
                        Estas acciones son permanentes y no se pueden deshacer.
                      </p>
                      <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors">
                        Eliminar cuenta permanentemente
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Los cambios se guardan automáticamente
                  </p>
                  <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
                    ✅ Configuración guardada
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="text-4xl mb-4">⏳</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Eliminando historial...</h3>
              <p className="text-gray-600">Esta acción puede tardar unos momentos en completarse.</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;