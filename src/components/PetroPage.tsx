import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft, FaUser, FaNewspaper, FaCalendarAlt, FaExternalLinkAlt,
  FaGoogle, FaWikipediaW, FaTwitter, FaSearch, FaFilter, FaTv
} from 'react-icons/fa';

interface PetroPageProps {
  onNavigate: (view: string) => void;
}

interface PetroNews {
  id: string;
  title: string;
  source: string;
  sourceType: 'google' | 'wikipedia' | 'local' | 'social';
  date: string;
  description: string;
  url: string;
  image?: string;
  category: 'politica' | 'economia' | 'social' | 'internacional' | 'decretos';
}

interface PolicyUpdate {
  id: string;
  title: string;
  type: 'decreto' | 'ley' | 'proyecto' | 'anuncio';
  date: string;
  description: string;
  impact: 'alto' | 'medio' | 'bajo';
  status: 'vigente' | 'en-tramite' | 'propuesto';
}

const PetroPage: React.FC<PetroPageProps> = ({ onNavigate }) => {
  const [news, setNews] = useState<PetroNews[]>([]);
  const [policies, setPolicies] = useState<PolicyUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'noticias' | 'politicas' | 'cronologia'>('noticias');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState<string>('todos');

  useEffect(() => {
    // Mock data - in real app, this would come from Google, Wikipedia, and local APIs
    const mockNews: PetroNews[] = [
      {
        id: '1',
        title: 'Presidente Petro anuncia reforma tributaria progresiva',
        source: 'El Tiempo',
        sourceType: 'local',
        date: '2024-09-26',
        description: 'Nueva propuesta de reforma tributaria busca mayor equidad y recaudación para programas sociales.',
        url: 'https://eltiempo.com/petro-reforma-tributaria',
        category: 'economia'
      },
      {
        id: '2',
        title: 'Gustavo Petro - Presidente de Colombia',
        source: 'Wikipedia',
        sourceType: 'wikipedia',
        date: '2024-09-26',
        description: 'Información actualizada sobre la biografía y mandato presidencial de Gustavo Petro.',
        url: 'https://es.wikipedia.org/wiki/Gustavo_Petro',
        category: 'politica'
      },
      {
        id: '3',
        title: 'Petro en cumbre internacional sobre cambio climático',
        source: 'Google News',
        sourceType: 'google',
        date: '2024-09-25',
        description: 'El presidente colombiano participa en foro internacional sobre políticas ambientales.',
        url: 'https://news.google.com/petro-climate',
        category: 'internacional'
      },
      {
        id: '4',
        title: 'Decretos presidenciales sobre paz total',
        source: 'Presidencia',
        sourceType: 'local',
        date: '2024-09-25',
        description: 'Nuevos decretos para implementar la política de paz total en territorios afectados por la violencia.',
        url: 'https://presidencia.gov.co/decretos',
        category: 'decretos'
      }
    ];

    const mockPolicies: PolicyUpdate[] = [
      {
        id: '1',
        title: 'Reforma de Salud Integral',
        type: 'proyecto',
        date: '2024-09-20',
        description: 'Proyecto de ley para transformar el sistema de salud, eliminando intermediarios y fortaleciendo la red pública.',
        impact: 'alto',
        status: 'en-tramite'
      },
      {
        id: '2',
        title: 'Decreto de Emergencia Económica',
        type: 'decreto',
        date: '2024-09-15',
        description: 'Medidas extraordinarias para enfrentar la crisis económica post-pandemia.',
        impact: 'alto',
        status: 'vigente'
      },
      {
        id: '3',
        title: 'Ley de Transición Energética',
        type: 'ley',
        date: '2024-09-10',
        description: 'Normativa para acelerar la transición hacia energías renovables y reducir dependencia de combustibles fósiles.',
        impact: 'medio',
        status: 'vigente'
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setPolicies(mockPolicies);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'google': return <FaGoogle className="w-4 h-4 text-blue-600" />;
      case 'wikipedia': return <FaWikipediaW className="w-4 h-4 text-gray-700" />;
      case 'social': return <FaTwitter className="w-4 h-4 text-blue-400" />;
      case 'local': return <FaNewspaper className="w-4 h-4 text-gray-600" />;
      default: return <FaNewspaper className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'alto': return 'bg-red-100 text-red-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'bajo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vigente': return 'bg-green-100 text-green-800';
      case 'en-tramite': return 'bg-blue-100 text-blue-800';
      case 'propuesto': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = filterSource === 'todos' || item.sourceType === filterSource;
    return matchesSearch && matchesSource;
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
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white">
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
                🇨🇴
              </div>
              <div>
                <h1 className="text-4xl font-black">Gustavo Petro</h1>
                <p className="text-green-200 text-lg">
                  Presidente de Colombia - Noticias, decretos y políticas
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-green-200 text-sm">Noticias Hoy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-green-200 text-sm">Decretos Nuevos</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-green-200 text-sm">Proyectos Activos</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">73%</div>
              <div className="text-green-200 text-sm">Aprobación</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-8">
            {[
              { id: 'noticias', label: 'Noticias y Medios', icon: <FaNewspaper /> },
              { id: 'politicas', label: 'Políticas y Decretos', icon: <FaUser /> },
              { id: 'cronologia', label: 'Cronología', icon: <FaCalendarAlt /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
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
              placeholder="Buscar noticias sobre Gustavo Petro..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          {activeTab === 'noticias' && (
            <div className="relative">
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="todos">Todas las fuentes</option>
                <option value="google">Google</option>
                <option value="wikipedia">Wikipedia</option>
                <option value="local">Medios Locales</option>
                <option value="social">Redes Sociales</option>
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
                        <div className="p-2 bg-gray-50 rounded-lg">
                          {getSourceIcon(item.sourceType)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              {getSourceIcon(item.sourceType)}
                              {item.source}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaCalendarAlt className="w-4 h-4" />
                              {new Date(item.date).toLocaleDateString('es-CO')}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.category === 'economia' ? 'bg-blue-100 text-blue-800' :
                              item.category === 'politica' ? 'bg-purple-100 text-purple-800' :
                              item.category === 'social' ? 'bg-green-100 text-green-800' :
                              item.category === 'internacional' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {item.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Ver Original
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Políticas Tab */}
        {activeTab === 'politicas' && (
          <div className="space-y-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))
            ) : (
              policies.map((policy) => (
                <div key={policy.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{policy.title}</h3>
                      <p className="text-gray-600 mb-4">{policy.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getImpactColor(policy.impact)}`}>
                          Impacto {policy.impact.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(policy.status)}`}>
                          {policy.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <FaCalendarAlt className="w-4 h-4" />
                          {new Date(policy.date).toLocaleDateString('es-CO')}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">
                          {policy.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
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

        {/* Cronología Tab */}
        {activeTab === 'cronologia' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cronología del Mandato</h3>
            <p className="text-gray-600 mb-8">
              Línea de tiempo detallada del gobierno de Gustavo Petro
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Ver Cronología Completa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetroPage;