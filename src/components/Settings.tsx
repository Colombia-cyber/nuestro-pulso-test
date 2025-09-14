import React, { useState, useEffect } from 'react';

interface UserSettings {
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
    allowFriendRequests: boolean;
    activityTracking: boolean;
    dataCollection: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    comments: boolean;
    reactions: boolean;
    mentions: boolean;
    news: boolean;
    debates: boolean;
    polls: boolean;
  };
  feeds: {
    categories: string[];
    languages: string[];
    regions: string[];
    difficulty: 'basic' | 'intermediate' | 'advanced';
    showTrending: boolean;
    autoplay: boolean;
  };
  account: {
    name: string;
    email: string;
    phone: string;
    location: string;
    interests: string[];
  };
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  const [settings, setSettings] = useState<UserSettings>({
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      allowFriendRequests: true,
      activityTracking: true,
      dataCollection: false,
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      comments: true,
      reactions: true,
      mentions: true,
      news: true,
      debates: true,
      polls: true,
    },
    feeds: {
      categories: ['politica', 'economia', 'educacion', 'ambiente'],
      languages: ['es'],
      regions: ['nacional', 'bogota'],
      difficulty: 'intermediate',
      showTrending: true,
      autoplay: false,
    },
    account: {
      name: 'Usuario Demo',
      email: 'usuario@ejemplo.com',
      phone: '+57 300 123 4567',
      location: 'Bogotá, Colombia',
      interests: ['Política', 'Educación', 'Ambiente', 'Tecnología'],
    }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const tabs = [
    { id: 'privacy', name: 'Privacidad', icon: '🔒' },
    { id: 'notifications', name: 'Notificaciones', icon: '🔔' },
    { id: 'feeds', name: 'Feeds y Contenido', icon: '📺' },
    { id: 'account', name: 'Cuenta', icon: '👤' },
    { id: 'data', name: 'Mis Datos', icon: '📊' },
  ];

  const categories = [
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'salud', name: 'Salud', icon: '🏥' },
    { id: 'tecnologia', name: 'Tecnología', icon: '💻' },
    { id: 'cultura', name: 'Cultura', icon: '🎭' },
    { id: 'deportes', name: 'Deportes', icon: '⚽' },
  ];

  const regions = [
    { id: 'nacional', name: 'Nacional' },
    { id: 'bogota', name: 'Bogotá' },
    { id: 'medellin', name: 'Medellín' },
    { id: 'cali', name: 'Cali' },
    { id: 'barranquilla', name: 'Barranquilla' },
    { id: 'cartagena', name: 'Cartagena' },
    { id: 'bucaramanga', name: 'Bucaramanga' },
  ];

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('✅ Configuración guardada exitosamente');
  };

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    localStorage.removeItem('viewHistory');
    localStorage.removeItem('commentHistory');
    alert('🗑️ Historial eliminado exitosamente');
  };

  const exportData = () => {
    const data = {
      settings,
      searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuestro-pulso-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const deleteAccount = () => {
    // In a real app, this would make an API call
    localStorage.clear();
    alert('❌ Cuenta eliminada. Serás redirigido a la página principal.');
    setShowDeleteModal(false);
    window.location.href = '/';
  };

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-yellow-800">Controla tu privacidad</h4>
            <p className="text-yellow-700 text-sm">Estas configuraciones afectan cómo otros usuarios pueden encontrarte e interactuar contigo.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">👤 Perfil Público</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibilidad del perfil
              </label>
              <select 
                value={settings.privacy.profileVisibility}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, profileVisibility: e.target.value as any }
                }))}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">🌍 Público - Cualquiera puede ver</option>
                <option value="friends">👥 Solo amigos</option>
                <option value="private">🔒 Privado - Solo yo</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.privacy.showEmail}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, showEmail: e.target.checked }
                  }))}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">📧 Mostrar email en perfil</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.privacy.showPhone}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, showPhone: e.target.checked }
                  }))}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">📱 Mostrar teléfono en perfil</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">💬 Interacciones</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.privacy.allowMessages}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, allowMessages: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">Permitir mensajes directos</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.privacy.allowFriendRequests}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, allowFriendRequests: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">Permitir solicitudes de amistad</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">📊 Datos y Seguimiento</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.privacy.activityTracking}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, activityTracking: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <div className="flex-1">
                <span className="text-gray-700">Permitir seguimiento de actividad</span>
                <p className="text-sm text-gray-500">Ayuda a personalizar tu experiencia</p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.privacy.dataCollection}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, dataCollection: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <div className="flex-1">
                <span className="text-gray-700">Permitir recolección de datos para investigación</span>
                <p className="text-sm text-gray-500">Datos anónimos para estudios cívicos</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 text-xl">🔔</span>
          <div>
            <h4 className="font-semibold text-blue-800">Mantente informado</h4>
            <p className="text-blue-700 text-sm">Configura cómo y cuándo quieres recibir notificaciones sobre temas de tu interés.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">📱 Canales de Notificación</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, email: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">📧 Email</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, push: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">📱 Notificaciones push</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, sms: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">📲 SMS (solo alertas importantes)</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">🎯 Tipos de Notificación</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.comments}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, comments: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">💬 Comentarios en mis posts</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.reactions}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, reactions: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">👍 Reacciones a mis contenidos</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.mentions}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, mentions: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">@️ Menciones</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.news}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, news: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">📰 Noticias importantes</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.debates}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, debates: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">🗣️ Nuevos debates</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.notifications.polls}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, polls: e.target.checked }
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">📊 Nuevas encuestas</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedSettings = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-green-600 text-xl">📺</span>
          <div>
            <h4 className="font-semibold text-green-800">Personaliza tu experiencia</h4>
            <p className="text-green-700 text-sm">Configura qué contenido quieres ver y cómo se presenta en tu feed.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">📂 Categorías de Interés</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.feeds.categories.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSettings(prev => ({
                        ...prev,
                        feeds: {
                          ...prev.feeds,
                          categories: [...prev.feeds.categories, category.id]
                        }
                      }));
                    } else {
                      setSettings(prev => ({
                        ...prev,
                        feeds: {
                          ...prev.feeds,
                          categories: prev.feeds.categories.filter(c => c !== category.id)
                        }
                      }));
                    }
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">
                  {category.icon} {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">🗺️ Regiones de Interés</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {regions.map((region) => (
              <label key={region.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.feeds.regions.includes(region.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSettings(prev => ({
                        ...prev,
                        feeds: {
                          ...prev.feeds,
                          regions: [...prev.feeds.regions, region.id]
                        }
                      }));
                    } else {
                      setSettings(prev => ({
                        ...prev,
                        feeds: {
                          ...prev.feeds,
                          regions: prev.feeds.regions.filter(r => r !== region.id)
                        }
                      }));
                    }
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">{region.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">⚙️ Preferencias de Contenido</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de complejidad
              </label>
              <select 
                value={settings.feeds.difficulty}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  feeds: { ...prev.feeds, difficulty: e.target.value as any }
                }))}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">🟢 Básico - Información general</option>
                <option value="intermediate">🟡 Intermedio - Análisis moderado</option>
                <option value="advanced">🔴 Avanzado - Análisis profundo</option>
              </select>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.feeds.showTrending}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    feeds: { ...prev.feeds, showTrending: e.target.checked }
                  }))}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">🔥 Mostrar temas trending</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.feeds.autoplay}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    feeds: { ...prev.feeds, autoplay: e.target.checked }
                  }))}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">▶️ Reproducir videos automáticamente</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-purple-600 text-xl">👤</span>
          <div>
            <h4 className="font-semibold text-purple-800">Información de cuenta</h4>
            <p className="text-purple-700 text-sm">Mantén actualizada tu información personal para una mejor experiencia.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">📝 Información Personal</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={settings.account.name}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                account: { ...prev.account, name: e.target.value }
              }))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.account.email}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                account: { ...prev.account, email: e.target.value }
              }))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={settings.account.phone}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                account: { ...prev.account, phone: e.target.value }
              }))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              value={settings.account.location}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                account: { ...prev.account, location: e.target.value }
              }))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">⚠️ Zona de Peligro</h3>
        <div className="space-y-4">
          <button
            onClick={clearHistory}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 font-medium"
          >
            🗑️ Eliminar todo el historial
          </button>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
          >
            📦 Exportar mis datos
          </button>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-medium"
          >
            ❌ Eliminar cuenta permanentemente
          </button>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-indigo-600 text-xl">📊</span>
          <div>
            <h4 className="font-semibold text-indigo-800">Tus datos en Nuestro Pulso</h4>
            <p className="text-indigo-700 text-sm">Revisa y gestiona toda la información que has compartido en la plataforma.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">📈 Estadísticas de uso</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Posts publicados:</span>
              <span className="font-semibold">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Comentarios realizados:</span>
              <span className="font-semibold">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Debates participados:</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Encuestas completadas:</span>
              <span className="font-semibold">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Días activo:</span>
              <span className="font-semibold">127</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">🔍 Actividad reciente</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-500">💬</span>
              <span>Comentó en "Reforma Tributaria"</span>
              <span className="text-gray-500 ml-auto">2h</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">👍</span>
              <span>Reaccionó a "Educación Digital"</span>
              <span className="text-gray-500 ml-auto">5h</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-500">📊</span>
              <span>Participó en encuesta nacional</span>
              <span className="text-gray-500 ml-auto">1d</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">🗣️</span>
              <span>Se unió al debate sobre salud</span>
              <span className="text-gray-500 ml-auto">2d</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">🔄 Gestión de datos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium">
            📥 Descargar mis datos
          </button>
          <button className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 font-medium">
            📤 Transferir datos
          </button>
          <button className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-medium">
            🗑️ Solicitar eliminación
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">📋 Resumen de derechos</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Derecho de acceso a tus datos personales</li>
            <li>• Derecho de rectificación de datos incorrectos</li>
            <li>• Derecho de eliminación de datos</li>
            <li>• Derecho de portabilidad de datos</li>
            <li>• Derecho de oposición al procesamiento</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">⚙️ Configuración</h1>
          <p className="text-white/90">Personaliza tu experiencia y controla tu privacidad</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeTab === 'privacy' && renderPrivacySettings()}
              {activeTab === 'notifications' && renderNotificationSettings()}
              {activeTab === 'feeds' && renderFeedSettings()}
              {activeTab === 'account' && renderAccountSettings()}
              {activeTab === 'data' && renderDataSettings()}
              
              {/* Save button */}
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={saveSettings}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 font-semibold"
                >
                  💾 Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Eliminar cuenta</h3>
              <p className="text-gray-700 mb-6">
                Esta acción es permanente e irreversible. Se eliminarán todos tus datos, posts, comentarios y configuraciones.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteAccount}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        )}

        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">📦 Exportar datos</h3>
              <p className="text-gray-700 mb-6">
                Se descargará un archivo JSON con todos tus datos: configuraciones, historial, posts y actividad.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={exportData}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Descargar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;