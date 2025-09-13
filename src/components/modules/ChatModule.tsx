import React from 'react';
import { FiMessageCircle, FiUsers, FiClock, FiTrendingUp, FiMapPin } from 'react-icons/fi';

const ChatModule: React.FC = () => {
  const trendingTopics = [
    { topic: 'Reforma Pensional', participants: 2847, region: 'Nacional' },
    { topic: 'Metro Bogotá Línea 2', participants: 1623, region: 'Bogotá' },
    { topic: 'Paz Total', participants: 3291, region: 'Nacional' },
    { topic: 'Educación Pública', participants: 1956, region: 'Nacional' }
  ];

  const activeRooms = [
    { name: 'Congreso en Vivo', members: 847, status: 'Sesión Activa' },
    { name: 'Jóvenes por el Clima', members: 1203, status: 'Debate' },
    { name: 'Emprendedores Colombia', members: 756, status: 'Chat Libre' },
    { name: 'Mujeres Lideresas', members: 934, status: 'Conversatorio' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full mb-4">
          <FiMessageCircle className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-900">Chat Cívico</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Conversaciones ciudadanas en tiempo real sobre los temas que importan a Colombia
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversaciones Activas</p>
              <p className="text-2xl font-bold text-gray-800">12,347</p>
            </div>
            <FiMessageCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usuarios Conectados</p>
              <p className="text-2xl font-bold text-gray-800">8,923</p>
            </div>
            <FiUsers className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Salas Públicas</p>
              <p className="text-2xl font-bold text-gray-800">247</p>
            </div>
            <FiMapPin className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Uptime Hoy</p>
              <p className="text-2xl font-bold text-gray-800">99.8%</p>
            </div>
            <FiClock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Topics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FiTrendingUp className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">Temas Trending</h2>
          </div>
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800">{topic.topic}</h3>
                  <p className="text-sm text-gray-600">{topic.region}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{topic.participants.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">participantes</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Ver Todos los Temas
          </button>
        </div>

        {/* Active Rooms */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FiUsers className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">Salas Activas</h2>
          </div>
          <div className="space-y-4">
            {activeRooms.map((room, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800">{room.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${room.status === 'Sesión Activa' ? 'bg-red-500' : room.status === 'Debate' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                    <p className="text-sm text-gray-600">{room.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{room.members}</p>
                  <p className="text-xs text-gray-500">miembros</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            Unirse a una Sala
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
            <FiMessageCircle className="w-6 h-6 mb-2 mx-auto" />
            <p className="font-semibold">Crear Sala</p>
            <p className="text-sm opacity-80">Nueva conversación</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
            <FiUsers className="w-6 h-6 mb-2 mx-auto" />
            <p className="font-semibold">Buscar Personas</p>
            <p className="text-sm opacity-80">Conectar con ciudadanos</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
            <FiTrendingUp className="w-6 h-6 mb-2 mx-auto" />
            <p className="font-semibold">Explorar Trending</p>
            <p className="text-sm opacity-80">Temas populares</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModule;