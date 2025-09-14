import React, { useState, useEffect } from 'react';

interface UserSettings {
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    activityTracking: boolean;
    personalizatedAds: boolean;
    dataSharing: boolean;
  };
  notifications: {
    newsUpdates: boolean;
    communityMessages: boolean;
    politicalAlerts: boolean;
    weeklyDigest: boolean;
  };
  feed: {
    preferredTopics: string[];
    contentTypes: string[];
    sourcePreferences: string[];
    autoPlayVideos: boolean;
  };
  account: {
    twoFactorAuth: boolean;
    loginNotifications: boolean;
    downloadData: boolean;
  };
}

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsComponent: React.FC<UserSettingsProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'notifications' | 'feed' | 'account'>('privacy');
  const [settings, setSettings] = useState<UserSettings>({
    privacy: {
      profileVisibility: 'public',
      activityTracking: true,
      personalizatedAds: false,
      dataSharing: false
    },
    notifications: {
      newsUpdates: true,
      communityMessages: true,
      politicalAlerts: false,
      weeklyDigest: true
    },
    feed: {
      preferredTopics: ['politics', 'economy'],
      contentTypes: ['news', 'videos'],
      sourcePreferences: ['verified'],
      autoPlayVideos: false
    },
    account: {
      twoFactorAuth: false,
      loginNotifications: true,
      downloadData: false
    }
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportData, setShowExportData] = useState(false);

  const topics = [
    { id: 'politics', name: 'Política', icon: '🏛️' },
    { id: 'economy', name: 'Economía', icon: '💰' },
    { id: 'crime', name: 'Crimen', icon: '🚔' },
    { id: 'corruption', name: 'Corrupción', icon: '⚖️' },
    { id: 'education', name: 'Educación', icon: '📚' },
    { id: 'health', name: 'Salud', icon: '🏥' },
    { id: 'environment', name: 'Medio Ambiente', icon: '🌱' },
    { id: 'technology', name: 'Tecnología', icon: '💻' }
  ];

  const contentTypes = [
    { id: 'news', name: 'Noticias', icon: '📰' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'polls', name: 'Encuestas', icon: '📊' },
    { id: 'discussions', name: 'Discusiones', icon: '💬' }
  ];

  const sourcePreferences = [
    { id: 'verified', name: 'Solo fuentes verificadas', icon: '✅' },
    { id: 'mainstream', name: 'Medios tradicionales', icon: '📺' },
    { id: 'independent', name: 'Medios independientes', icon: '🗞️' },
    { id: 'community', name: 'Contenido comunitario', icon: '👥' }
  ];

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const handleToggle = (section: keyof UserSettings, key: string) => {
    const newSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: !settings[section][key as keyof typeof settings[typeof section]]
      }
    };
    saveSettings(newSettings);
  };

  const handleArrayToggle = (section: keyof UserSettings, key: string, value: string) => {
    const currentArray = settings[section][key as keyof typeof settings[typeof section]] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    const newSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: newArray
      }
    };
    saveSettings(newSettings);
  };

  const handleSelectChange = (section: keyof UserSettings, key: string, value: string) => {
    const newSettings = {
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value
      }
    };
    saveSettings(newSettings);
  };

  const handleDeleteHistory = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todo tu historial? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('recentSearches');
      localStorage.removeItem('userHistory');
      localStorage.removeItem('communityPosts');
      alert('Historial eliminado exitosamente');
      setShowDeleteConfirm(false);
    }
  };

  const handleExportData = () => {
    const userData = {
      settings,
      history: localStorage.getItem('userHistory'),
      searches: localStorage.getItem('recentSearches'),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuestro-pulso-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportData(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">⚙️ Configuraciones</h1>
              <p className="text-white/90">Personaliza tu experiencia en Nuestro Pulso</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'privacy' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-3">🔒</span>
                Privacidad
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-3">🔔</span>
                Notificaciones
              </button>
              <button
                onClick={() => setActiveTab('feed')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'feed' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-3">📰</span>
                Feed personalizado
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'account' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-3">👤</span>
                Cuenta
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">🔒 Configuración de privacidad</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Visibilidad del perfil</div>
                          <div className="text-sm text-gray-600">Controla quién puede ver tu perfil</div>
                        </div>
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => handleSelectChange('privacy', 'profileVisibility', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="public">Público</option>
                          <option value="friends">Solo amigos</option>
                          <option value="private">Privado</option>
                        </select>
                      </label>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Seguimiento de actividad</div>
                          <div className="text-sm text-gray-600">Permitir análisis de uso para mejorar la experiencia</div>
                        </div>
                        <button
                          onClick={() => handleToggle('privacy', 'activityTracking')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.privacy.activityTracking ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.privacy.activityTracking ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Publicidad personalizada</div>
                          <div className="text-sm text-gray-600">Mostrar anuncios basados en tus intereses</div>
                        </div>
                        <button
                          onClick={() => handleToggle('privacy', 'personalizatedAds')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.privacy.personalizatedAds ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.privacy.personalizatedAds ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Compartir datos con terceros</div>
                          <div className="text-sm text-gray-600">Permitir compartir datos anónimos para investigación</div>
                        </div>
                        <button
                          onClick={() => handleToggle('privacy', 'dataSharing')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.privacy.dataSharing ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">⚠️ Zona de peligro</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-medium"
                    >
                      🗑️ Eliminar todo mi historial
                    </button>
                    <button
                      onClick={() => setShowExportData(true)}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      📥 Descargar mis datos
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🔔 Notificaciones</h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="bg-white border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {key === 'newsUpdates' && 'Actualizaciones de noticias'}
                            {key === 'communityMessages' && 'Mensajes de la comunidad'}
                            {key === 'politicalAlerts' && 'Alertas políticas importantes'}
                            {key === 'weeklyDigest' && 'Resumen semanal'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {key === 'newsUpdates' && 'Recibe notificaciones de noticias importantes'}
                            {key === 'communityMessages' && 'Notificaciones de respuestas y menciones'}
                            {key === 'politicalAlerts' && 'Alertas sobre eventos políticos críticos'}
                            {key === 'weeklyDigest' && 'Resumen semanal de actividad y trending topics'}
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggle('notifications', key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feed Customization */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">📰 Personalización del feed</h2>
                
                {/* Preferred Topics */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Temas de interés</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleArrayToggle('feed', 'preferredTopics', topic.id)}
                        className={`p-3 rounded-lg border transition-colors ${
                          settings.feed.preferredTopics.includes(topic.id)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{topic.icon}</div>
                        <div className="text-sm font-medium">{topic.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Types */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tipos de contenido</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {contentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleArrayToggle('feed', 'contentTypes', type.id)}
                        className={`p-3 rounded-lg border transition-colors ${
                          settings.feed.contentTypes.includes(type.id)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-play videos */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Reproducción automática de videos</div>
                      <div className="text-sm text-gray-600">Los videos se reproducirán automáticamente al hacer scroll</div>
                    </div>
                    <button
                      onClick={() => handleToggle('feed', 'autoPlayVideos')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.feed.autoPlayVideos ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.feed.autoPlayVideos ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">👤 Configuración de cuenta</h2>
                
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Autenticación de dos factores</div>
                        <div className="text-sm text-gray-600">Agrega una capa extra de seguridad a tu cuenta</div>
                      </div>
                      <button
                        onClick={() => handleToggle('account', 'twoFactorAuth')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.account.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.account.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Notificaciones de inicio de sesión</div>
                        <div className="text-sm text-gray-600">Recibe alertas cuando alguien acceda a tu cuenta</div>
                      </div>
                      <button
                        onClick={() => handleToggle('account', 'loginNotifications')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.account.loginNotifications ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.account.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save button */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Los cambios se guardan automáticamente
            </div>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-red-600 mb-4">⚠️ Confirmar eliminación</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que quieres eliminar todo tu historial? Esta acción no se puede deshacer.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteHistory}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export data modal */}
      {showExportData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">📥 Descargar datos</h3>
            <p className="text-gray-700 mb-6">
              Se descargará un archivo JSON con todos tus datos incluyendo configuraciones, historial y búsquedas.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleExportData}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Descargar
              </button>
              <button
                onClick={() => setShowExportData(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettingsComponent;