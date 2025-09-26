import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft, FaShieldAlt, FaExclamationTriangle, FaMapMarkerAlt, 
  FaCalendarAlt, FaUsers, FaClock, FaNewspaper, FaSearch, FaFilter
} from 'react-icons/fa';

interface SeguridadNacionalPageProps {
  onNavigate: (view: string) => void;
}

interface SecurityNews {
  id: string;
  title: string;
  category: 'narcotrafico' | 'crimen' | 'operativo' | 'terrorismo' | 'seguridad';
  severity: 'baja' | 'media' | 'alta' | 'critica';
  location: string;
  date: string;
  source: string;
  description: string;
  image?: string;
  casualties?: number;
  arrests?: number;
}

interface SecurityAlert {
  id: string;
  title: string;
  level: 'verde' | 'amarillo' | 'naranja' | 'rojo';
  region: string;
  description: string;
  timestamp: string;
  active: boolean;
}

const SeguridadNacionalPage: React.FC<SeguridadNacionalPageProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<SecurityNews[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'noticias' | 'alertas' | 'operativos'>('noticias');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  useEffect(() => {
    // Mock data - in real app, this would come from security APIs
    const mockNews: SecurityNews[] = [
      {
        id: '1',
        title: 'Operativo antinarcóticos captura a 15 personas en Antioquia',
        category: 'narcotrafico',
        severity: 'alta',
        location: 'Medellín, Antioquia',
        date: '2024-09-26',
        source: 'Policía Nacional',
        description: 'Gran operativo conjunto entre Policía Nacional y DEA logra desarticular red de tráfico internacional de cocaína.',
        arrests: 15,
        casualties: 0
      },
      {
        id: '2',
        title: 'Ataque con explosivos en Arauca deja 3 militares heridos',
        category: 'terrorismo',
        severity: 'critica',
        location: 'Arauca, Arauca',
        date: '2024-09-26',
        source: 'Ministerio de Defensa',
        description: 'Grupos ilegales atacan patrulla militar con artefacto explosivo improvisado.',
        casualties: 3,
        arrests: 0
      },
      {
        id: '3',
        title: 'Desmantelada banda criminal en Cali',
        category: 'crimen',
        severity: 'media',
        location: 'Cali, Valle del Cauca',
        date: '2024-09-25',
        source: 'CTI',
        description: 'Capturados 8 integrantes de banda dedicada al microtráfico y extorsión.',
        arrests: 8,
        casualties: 0
      },
      {
        id: '4',
        title: 'Incautación récord de cocaína en puerto de Buenaventura',
        category: 'narcotrafico',
        severity: 'alta',
        location: 'Buenaventura, Valle del Cauca',
        date: '2024-09-25',
        source: 'DIAN',
        description: 'Autoridades incautan 2.3 toneladas de cocaína ocultas en contenedor con destino a Europa.',
        arrests: 3,
        casualties: 0
      }
    ];

    const mockAlerts: SecurityAlert[] = [
      {
        id: '1',
        title: 'Alerta Roja - Actividad de Grupos Armados',
        level: 'rojo',
        region: 'Norte de Santander',
        description: 'Incremento significativo de actividad de grupos armados ilegales en zona fronteriza.',
        timestamp: '2024-09-26T10:30:00Z',
        active: true
      },
      {
        id: '2',
        title: 'Alerta Naranja - Riesgo de Atentados',
        level: 'naranja',
        region: 'Bogotá D.C.',
        description: 'Inteligencia indica posible riesgo de atentados en centros comerciales.',
        timestamp: '2024-09-26T08:15:00Z',
        active: true
      },
      {
        id: '3',
        title: 'Alerta Amarilla - Tráfico de Drogas',
        level: 'amarillo',
        region: 'Putumayo',
        description: 'Aumento en actividades de procesamiento de pasta base de coca.',
        timestamp: '2024-09-25T16:45:00Z',
        active: true
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'baja': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'critica': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'verde': return 'bg-green-500';
      case 'amarillo': return 'bg-yellow-500';
      case 'naranja': return 'bg-orange-500';
      case 'rojo': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'narcotrafico': return '💊';
      case 'crimen': return '🔫';
      case 'operativo': return '👮';
      case 'terrorismo': return '💣';
      case 'seguridad': return '🛡️';
      default: return '📰';
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'todos' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const SkeletonLoader = () => (
    <div className="animate-pulse bg-white rounded-2xl p-6 shadow-lg">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🚔
              </div>
              <div>
                <h1 className="text-4xl font-black">Seguridad Nacional</h1>
                <p className="text-red-200 text-lg">
                  Noticias de seguridad, crimen y narcotráfico en Colombia
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-red-200 text-sm">Operativos Hoy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-red-200 text-sm">Alertas Activas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">47</div>
              <div className="text-red-200 text-sm">Capturas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">2.3T</div>
              <div className="text-red-200 text-sm">Droga Incautada</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-8">
            {[
              { id: 'noticias', label: 'Noticias de Seguridad', icon: <FaNewspaper /> },
              { id: 'alertas', label: 'Alertas de Seguridad', icon: <FaExclamationTriangle /> },
              { id: 'operativos', label: 'Operativos en Curso', icon: <FaShieldAlt /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar noticias de seguridad, operativos..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          {activeTab === 'noticias' && (
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="todos">Todas las categorías</option>
                <option value="narcotrafico">Narcotráfico</option>
                <option value="crimen">Crimen Organizado</option>
                <option value="operativo">Operativos</option>
                <option value="terrorismo">Terrorismo</option>
                <option value="seguridad">Seguridad</option>
              </select>
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Noticias Tab */}
        {activeTab === 'noticias' && (
          <div className="space-y-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))
            ) : (
              filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-3xl">{getCategoryIcon(item.category)}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(item.severity)}`}>
                              {item.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaMapMarkerAlt className="w-4 h-4" />
                              {item.location}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaCalendarAlt className="w-4 h-4" />
                              {new Date(item.date).toLocaleDateString('es-CO')}
                            </span>
                            <span className="text-sm text-gray-500">
                              Fuente: {item.source}
                            </span>
                          </div>

                          {(item.arrests || item.casualties) && (
                            <div className="bg-gray-50 rounded-xl p-4">
                              <div className="grid grid-cols-2 gap-4">
                                {item.arrests && (
                                  <div className="text-center">
                                    <div className="text-xl font-bold text-blue-600">{item.arrests}</div>
                                    <div className="text-sm text-gray-600">Capturas</div>
                                  </div>
                                )}
                                {item.casualties && (
                                  <div className="text-center">
                                    <div className="text-xl font-bold text-red-600">{item.casualties}</div>
                                    <div className="text-sm text-gray-600">Heridos</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        <FaNewspaper className="w-4 h-4" />
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Alertas Tab */}
        {activeTab === 'alertas' && (
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-2xl p-6 shadow-lg border-l-4" style={{borderLeftColor: getAlertColor(alert.level).replace('bg-', '#')}}>
                  <div className="flex items-start gap-4">
                    <div className={`w-4 h-4 rounded-full ${getAlertColor(alert.level)} mt-1`}></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{alert.title}</h3>
                      <p className="text-gray-600 mb-3">{alert.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          {alert.region}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="w-4 h-4" />
                          {new Date(alert.timestamp).toLocaleString('es-CO')}
                        </span>
                        {alert.active && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            ACTIVA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Operativos Tab */}
        {activeTab === 'operativos' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚁</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Operativos en Curso</h3>
            <p className="text-gray-600 mb-8">
              Información clasificada sobre operativos en curso
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Acceso Restringido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeguridadNacionalPage;