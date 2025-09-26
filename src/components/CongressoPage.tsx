import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft, FaCalendarAlt, FaUsers, FaGavel, FaFile, 
  FaPlay, FaPause, FaExternalLinkAlt, FaSearch, FaFilter
} from 'react-icons/fa';

interface CongressoPageProps {
  onNavigate: (view: string) => void;
}

interface LegislativeActivity {
  id: string;
  title: string;
  type: 'proyecto' | 'sesion' | 'debate' | 'votacion';
  status: 'en-curso' | 'aprobado' | 'rechazado' | 'pendiente';
  date: string;
  chamber: 'senado' | 'camara' | 'conjunto';
  description: string;
  votes?: { favor: number; contra: number; abstencion: number };
  liveUrl?: string;
}

interface CongressMember {
  id: string;
  name: string;
  party: string;
  chamber: string;
  department: string;
  photo: string;
  recentActivity: number;
}

const CongressoPage: React.FC<CongressoPageProps> = ({ onNavigate }) => {
  const [activities, setActivities] = useState<LegislativeActivity[]>([]);
  const [members, setMembers] = useState<CongressMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'actividad' | 'sesiones' | 'miembros'>('actividad');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');

  useEffect(() => {
    // Mock data - in real app, this would come from APIs
    const mockActivities: LegislativeActivity[] = [
      {
        id: '1',
        title: 'Proyecto de Ley de Reforma a la Salud',
        type: 'proyecto',
        status: 'en-curso',
        date: '2024-09-26',
        chamber: 'senado',
        description: 'Reforma integral al sistema de salud colombiano, incluyendo cambios en el régimen de EPS y fortalecimiento de la red pública.',
        votes: { favor: 45, contra: 32, abstencion: 8 }
      },
      {
        id: '2',
        title: 'Sesión Ordinaria - Comisión Primera',
        type: 'sesion',
        status: 'en-curso',
        date: '2024-09-26',
        chamber: 'senado',
        description: 'Debate sobre el proyecto de reforma tributaria y sus implicaciones fiscales.',
        liveUrl: 'https://www.senado.gov.co/live'
      },
      {
        id: '3',
        title: 'Moción de Censura contra Ministro de Defensa',
        type: 'debate',
        status: 'pendiente',
        date: '2024-09-27',
        chamber: 'camara',
        description: 'Debate de moción de censura presentada por la oposición contra el Ministro de Defensa.'
      },
      {
        id: '4',
        title: 'Votación Ley de Presupuesto General 2025',
        type: 'votacion',
        status: 'aprobado',
        date: '2024-09-25',
        chamber: 'conjunto',
        description: 'Aprobación del presupuesto general de la nación para la vigencia 2025.',
        votes: { favor: 156, contra: 89, abstencion: 12 }
      }
    ];

    const mockMembers: CongressMember[] = [
      {
        id: '1',
        name: 'María Fernanda Cabal',
        party: 'Centro Democrático',
        chamber: 'Senado',
        department: 'Bogotá',
        photo: '/api/placeholder/64/64',
        recentActivity: 23
      },
      {
        id: '2',
        name: 'Gustavo Bolívar',
        party: 'Pacto Histórico',
        chamber: 'Senado', 
        department: 'Bogotá',
        photo: '/api/placeholder/64/64',
        recentActivity: 18
      },
      {
        id: '3',
        name: 'Catherine Juvinao',
        party: 'Alianza Verde',
        chamber: 'Cámara',
        department: 'Bogotá',
        photo: '/api/placeholder/64/64',
        recentActivity: 31
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setMembers(mockMembers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-curso': return 'bg-blue-100 text-blue-800';
      case 'aprobado': return 'bg-green-100 text-green-800';
      case 'rechazado': return 'bg-red-100 text-red-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'proyecto': return <FaFile className="w-4 h-4" />;
      case 'sesion': return <FaUsers className="w-4 h-4" />;
      case 'debate': return <FaGavel className="w-4 h-4" />;
      case 'votacion': return <FaCalendarAlt className="w-4 h-4" />;
      default: return <FaFile className="w-4 h-4" />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'todos' || activity.type === filterType;
    return matchesSearch && matchesType;
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
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
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
                🏛️
              </div>
              <div>
                <h1 className="text-4xl font-black">Congreso de Colombia</h1>
                <p className="text-blue-200 text-lg">
                  Actividad legislativa, sesiones en vivo y seguimiento
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">47</div>
              <div className="text-blue-200 text-sm">Proyectos Activos</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-blue-200 text-sm">Sesiones Hoy</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">268</div>
              <div className="text-blue-200 text-sm">Congresistas</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-blue-200 text-sm">Leyes Aprobadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-8">
            {[
              { id: 'actividad', label: 'Actividad Legislativa', icon: <FaGavel /> },
              { id: 'sesiones', label: 'Sesiones en Vivo', icon: <FaPlay /> },
              { id: 'miembros', label: 'Congresistas', icon: <FaUsers /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
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
              placeholder="Buscar proyectos, debates, congresistas..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {activeTab === 'actividad' && (
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="todos">Todos los tipos</option>
                <option value="proyecto">Proyectos</option>
                <option value="sesion">Sesiones</option>
                <option value="debate">Debates</option>
                <option value="votacion">Votaciones</option>
              </select>
              <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Actividad Legislativa Tab */}
        {activeTab === 'actividad' && (
          <div className="space-y-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))
            ) : (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          {getTypeIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                          <p className="text-gray-600 mb-3">{activity.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(activity.status)}`}>
                              {activity.status.replace('-', ' ').toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaCalendarAlt className="w-4 h-4" />
                              {new Date(activity.date).toLocaleDateString('es-CO')}
                            </span>
                            <span className="text-sm text-gray-500 capitalize">
                              {activity.chamber === 'conjunto' ? 'Congreso Pleno' : activity.chamber}
                            </span>
                          </div>
                        </div>
                      </div>

                      {activity.votes && (
                        <div className="bg-gray-50 rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Resultados de Votación</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-600">{activity.votes.favor}</div>
                              <div className="text-sm text-gray-600">A Favor</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-red-600">{activity.votes.contra}</div>
                              <div className="text-sm text-gray-600">En Contra</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-yellow-600">{activity.votes.abstencion}</div>
                              <div className="text-sm text-gray-600">Abstención</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {activity.liveUrl && (
                        <a
                          href={activity.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          <FaPlay className="w-4 h-4" />
                          Ver en Vivo
                        </a>
                      )}
                      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Sesiones en Vivo Tab */}
        {activeTab === 'sesiones' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sesiones en Vivo</h3>
            <p className="text-gray-600 mb-8">
              Aquí se mostrarán las transmisiones en vivo del Congreso
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Ver Programación
            </button>
          </div>
        )}

        {/* Miembros Tab */}
        {activeTab === 'miembros' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))
            ) : (
              members.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=64`;
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.party}</p>
                      <p className="text-sm text-gray-500">{member.chamber} - {member.department}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-sm text-gray-600 mb-1">Actividad Reciente</div>
                    <div className="text-xl font-bold text-blue-600">{member.recentActivity}</div>
                    <div className="text-xs text-gray-500">Intervenciones este mes</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CongressoPage;