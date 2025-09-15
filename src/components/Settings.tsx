import React, { useState } from 'react';
import { FiUser, FiBell, FiShield, FiDownload, FiTrash2, FiEye, FiMail, FiSmartphone, FiMessageSquare } from 'react-icons/fi';

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showActivity: boolean;
  allowDirectMessages: boolean;
  dataSharing: boolean;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  debates: boolean;
  polls: boolean;
  communityUpdates: boolean;
  breakingNews: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'data'>('profile');
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showActivity: true,
    allowDirectMessages: true,
    dataSharing: false
  });
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    debates: true,
    polls: true,
    communityUpdates: true,
    breakingNews: true
  });

  const [profileData, setProfileData] = useState({
    name: 'Usuario Ejemplo',
    email: 'usuario@example.com',
    location: 'Bogotá, Colombia',
    bio: 'Ciudadano comprometido con la participación cívica'
  });

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const exportData = () => {
    alert('Tu solicitud de exportación de datos ha sido procesada. Recibirás un enlace de descarga en tu email en las próximas 24 horas.');
  };

  const deleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      alert('Tu solicitud de eliminación de cuenta ha sido procesada. Tu cuenta será eliminada en 30 días como lo requiere la ley colombiana de protección de datos.');
    }
  };

  const tabs = [
    { key: 'profile', label: 'Perfil', icon: FiUser },
    { key: 'privacy', label: 'Privacidad', icon: FiShield },
    { key: 'notifications', label: 'Notificaciones', icon: FiBell },
    { key: 'data', label: 'Datos', icon: FiDownload },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">⚙️ Configuración</h1>
            <p className="text-white/90">
              Gestiona tu privacidad, notificaciones y preferencias de la plataforma
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Sidebar */}
              <div className="md:w-1/4 bg-gray-50">
                <div className="p-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as any)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                            activeTab === tab.key
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-3/4 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Información del Perfil</h2>
                      <p className="text-gray-600 mb-6">
                        Actualiza tu información personal y configura cómo otros ciudadanos te ven en la plataforma.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ubicación
                        </label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ciudad, Departamento"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Biografía
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Cuéntanos un poco sobre ti y tu interés en la participación cívica"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración de Privacidad</h2>
                      <p className="text-gray-600 mb-6">
                        Controla quién puede ver tu información y cómo se utiliza. Cumplimos con GDPR y la ley colombiana de protección de datos.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Visibilidad del perfil
                        </label>
                        <div className="space-y-2">
                          {[
                            { value: 'public', label: 'Público - Cualquiera puede ver tu perfil' },
                            { value: 'friends', label: 'Contactos - Solo personas que sigues' },
                            { value: 'private', label: 'Privado - Solo tú puedes ver tu información' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value={option.value}
                                checked={privacySettings.profileVisibility === option.value}
                                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                className="mr-3"
                              />
                              <span className="text-gray-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Mostrar email públicamente</h4>
                            <p className="text-sm text-gray-600">Permite que otros ciudadanos vean tu email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.showEmail}
                              onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Mostrar actividad</h4>
                            <p className="text-sm text-gray-600">Permite que otros vean en qué debates y encuestas participas</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.showActivity}
                              onChange={(e) => handlePrivacyChange('showActivity', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Permitir mensajes directos</h4>
                            <p className="text-sm text-gray-600">Otros ciudadanos pueden enviarte mensajes privados</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.allowDirectMessages}
                              onChange={(e) => handlePrivacyChange('allowDirectMessages', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Compartir datos para investigación</h4>
                            <p className="text-sm text-gray-600">Ayuda a mejorar la democracia con datos anónimos</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.dataSharing}
                              onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Notificaciones</h2>
                      <p className="text-gray-600 mb-6">
                        Configura cómo y cuándo quieres recibir notificaciones sobre actividad cívica.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Métodos de notificación</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FiMail className="w-5 h-5 text-gray-600" />
                              <div>
                                <h4 className="font-medium text-gray-900">Email</h4>
                                <p className="text-sm text-gray-600">Recibir notificaciones por correo electrónico</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.email}
                                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FiBell className="w-5 h-5 text-gray-600" />
                              <div>
                                <h4 className="font-medium text-gray-900">Push</h4>
                                <p className="text-sm text-gray-600">Notificaciones push en el navegador</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.push}
                                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FiSmartphone className="w-5 h-5 text-gray-600" />
                              <div>
                                <h4 className="font-medium text-gray-900">SMS</h4>
                                <p className="text-sm text-gray-600">Mensajes de texto para noticias urgentes</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings.sms}
                                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de notificación</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'debates', label: 'Nuevos debates', desc: 'Cuando se crean debates sobre temas que te interesan' },
                            { key: 'polls', label: 'Encuestas', desc: 'Nuevas encuestas y resultados importantes' },
                            { key: 'communityUpdates', label: 'Actualizaciones de comunidad', desc: 'Respuestas a tus comentarios y menciones' },
                            { key: 'breakingNews', label: 'Noticias de última hora', desc: 'Eventos importantes que afectan la democracia colombiana' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{item.label}</h4>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={notificationSettings[item.key as keyof NotificationSettings] as boolean}
                                  onChange={(e) => handleNotificationChange(item.key as keyof NotificationSettings, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Tab */}
                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Datos</h2>
                      <p className="text-gray-600 mb-6">
                        Controla tus datos personales de acuerdo con la legislación colombiana y europea (GDPR).
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <FiDownload className="w-6 h-6 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Exportar mis datos</h3>
                            <p className="text-gray-600 mb-4">
                              Descarga una copia de todos tus datos en formato JSON. Incluye perfil, comentarios, votos y actividad.
                            </p>
                            <button
                              onClick={exportData}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                              Solicitar exportación
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <FiEye className="w-6 h-6 text-gray-600 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ver mis datos</h3>
                            <p className="text-gray-600 mb-4">
                              Revisa qué información tenemos sobre ti y cómo la utilizamos.
                            </p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>• Información de perfil y contacto</p>
                              <p>• Historial de participación en debates y encuestas</p>
                              <p>• Configuraciones de privacidad y notificaciones</p>
                              <p>• Logs de actividad (últimos 90 días)</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <FiTrash2 className="w-6 h-6 text-red-600 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Eliminar mi cuenta</h3>
                            <p className="text-gray-600 mb-4">
                              Elimina permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.
                            </p>
                            <div className="bg-red-100 border border-red-300 rounded p-3 mb-4">
                              <p className="text-sm text-red-800">
                                <strong>Importante:</strong> Según la ley colombiana, tendrás 30 días para cancelar esta solicitud. 
                                Después de este período, todos tus datos serán eliminados permanentemente.
                              </p>
                            </div>
                            <button
                              onClick={deleteAccount}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            >
                              Eliminar cuenta
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Cumplimiento legal</h4>
                        <p className="text-sm text-gray-600">
                          Nuestro Pulso cumple con la Ley 1581 de 2012 (Habeas Data) de Colombia y el Reglamento General 
                          de Protección de Datos (GDPR) de la Unión Europea. Tienes derecho a acceder, rectificar, 
                          actualizar y suprimir tus datos personales.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;