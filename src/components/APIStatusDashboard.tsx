import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaClock,
  FaPlus,
  FaRedo,
  FaEye,
  FaEyeSlash,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { APIProvider } from '../types/api';
import apiManager from '../services/apiManager';

interface APIStatusDashboardProps {
  className?: string;
  showInstructions?: boolean;
  compact?: boolean;
}

const APIStatusDashboard: React.FC<APIStatusDashboardProps> = ({
  className = '',
  showInstructions = true,
  compact = false
}) => {
  const [providers, setProviders] = useState<APIProvider[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadProviders();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadProviders();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadProviders = () => {
    const currentProviders = apiManager.getProviders();
    setProviders(currentProviders);
    setLastUpdate(new Date());
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Force a status check
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API calls
      loadProviders();
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusIcon = (status: APIProvider['status']) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle className="text-green-500" />;
      case 'inactive':
        return <FaTimesCircle className="text-gray-400" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'rate_limited':
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaTimesCircle className="text-gray-400" />;
    }
  };

  const getStatusText = (status: APIProvider['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'error':
        return 'Error';
      case 'rate_limited':
        return 'Límite alcanzado';
      default:
        return 'Desconocido';
    }
  };

  const getStatusColor = (status: APIProvider['status']) => {
    switch (status) {
      case 'active':
        return 'border-green-200 bg-green-50';
      case 'inactive':
        return 'border-gray-200 bg-gray-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'rate_limited':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const activeCount = providers.filter(p => p.status === 'active').length;
  const totalCount = providers.length;

  const setupInstructions = [
    {
      id: 'youtube',
      name: 'YouTube Data API',
      steps: [
        'Ve a Google Cloud Console',
        'Crea un proyecto o selecciona uno existente',
        'Habilita la YouTube Data API v3',
        'Crea credenciales (API Key)',
        'Añade VITE_YOUTUBE_API_KEY=tu_api_key al archivo .env'
      ],
      docs: 'https://developers.google.com/youtube/v3/getting-started'
    },
    {
      id: 'google-news',
      name: 'Google Custom Search',
      steps: [
        'Ve a Google Cloud Console',
        'Habilita la Custom Search JSON API',
        'Crea un motor de búsqueda personalizado en cse.google.com',
        'Configura para buscar en toda la web',
        'Añade VITE_GOOGLE_API_KEY y VITE_GOOGLE_CSE_ID al .env'
      ],
      docs: 'https://developers.google.com/custom-search/v1/introduction'
    },
    {
      id: 'tiktok',
      name: 'TikTok Developer API',
      steps: [
        'Regístrate en TikTok for Developers',
        'Crea una aplicación',
        'Obtén Client Key y Client Secret',
        'Añade VITE_TIKTOK_CLIENT_KEY y VITE_TIKTOK_CLIENT_SECRET al .env'
      ],
      docs: 'https://developers.tiktok.com/doc/getting-started-create-an-app'
    },
    {
      id: 'instagram',
      name: 'Instagram Basic Display API',
      steps: [
        'Ve a Facebook Developers',
        'Crea una aplicación',
        'Añade Instagram Basic Display producto',
        'Configura OAuth redirect URIs',
        'Añade VITE_INSTAGRAM_APP_ID y VITE_INSTAGRAM_ACCESS_TOKEN al .env'
      ],
      docs: 'https://developers.facebook.com/docs/instagram-basic-display-api'
    },
    {
      id: 'facebook',
      name: 'Facebook Graph API',
      steps: [
        'Ve a Facebook Developers',
        'Crea una aplicación',
        'Genera un token de acceso',
        'Añade VITE_FACEBOOK_APP_ID y VITE_FACEBOOK_ACCESS_TOKEN al .env'
      ],
      docs: 'https://developers.facebook.com/docs/graph-api'
    },
    {
      id: 'twitter',
      name: 'X (Twitter) API v2',
      steps: [
        'Solicita acceso a Twitter Developer Portal',
        'Crea un proyecto y aplicación',
        'Genera Bearer Token y API Keys',
        'Añade VITE_TWITTER_BEARER_TOKEN, VITE_TWITTER_API_KEY al .env'
      ],
      docs: 'https://developer.twitter.com/en/docs/twitter-api'
    }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Mostrar estado de APIs"
      >
        <FaEye />
      </button>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-gray-900">Estado de APIs</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              activeCount === totalCount ? 'bg-green-500' : 
              activeCount > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-sm text-gray-600">
              {activeCount}/{totalCount} activas
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors disabled:opacity-50"
            title="Actualizar estado"
          >
            <FaRedo className={isRefreshing ? 'animate-spin' : ''} />
          </button>

          {!compact && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title={isExpanded ? 'Contraer' : 'Expandir'}
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
            title="Ocultar panel"
          >
            <FaEyeSlash />
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Provider Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`border rounded-lg p-3 transition-all ${getStatusColor(provider.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{provider.icon}</span>
                    <span className="font-medium text-sm">{provider.name}</span>
                  </div>
                  {getStatusIcon(provider.status)}
                </div>
                
                <div className="text-xs text-gray-600">
                  <div>{getStatusText(provider.status)}</div>
                  <div>Actualizado {new Date(provider.lastUpdate).toLocaleTimeString()}</div>
                  {provider.rateLimitRemaining !== undefined && (
                    <div>Límite: {provider.rateLimitRemaining}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Last Update */}
          <div className="text-xs text-gray-500 text-center mb-4">
            Última actualización: {lastUpdate.toLocaleTimeString()}
          </div>

          {/* Setup Instructions */}
          {showInstructions && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <FaPlus className="text-green-600" />
                <h4 className="font-medium text-gray-900">Configurar APIs</h4>
              </div>

              <div className="space-y-3">
                {setupInstructions.map((instruction) => {
                  const provider = providers.find(p => p.id === instruction.id);
                  const isActive = provider?.status === 'active';

                  return (
                    <details key={instruction.id} className="group">
                      <summary className={`cursor-pointer p-3 rounded-lg border ${
                        isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                      } hover:bg-opacity-80 transition-colors`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {isActive ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <FaTimesCircle className="text-gray-400" />
                            )}
                            <span className="font-medium">{instruction.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isActive ? 'Configurado' : 'Pendiente'}
                            </span>
                          </div>
                        </div>
                      </summary>

                      <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">Pasos de configuración:</h5>
                          <a
                            href={instruction.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <span>Documentación</span>
                            <FaExternalLinkAlt />
                          </a>
                        </div>

                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                          {instruction.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>

                        {!isActive && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center space-x-2 text-yellow-800">
                              <FaExclamationTriangle />
                              <span className="text-sm font-medium">
                                Esta API no está configurada. Configúrala para acceder a más contenido.
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">💡 Consejos:</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Configura al menos YouTube y Google News para obtener contenido básico</li>
                  <li>• Las APIs de redes sociales requieren aprobación y pueden tomar tiempo</li>
                  <li>• Revisa los límites de uso de cada API para evitar interrupciones</li>
                  <li>• Mantén tus claves API seguras y nunca las compartas públicamente</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default APIStatusDashboard;