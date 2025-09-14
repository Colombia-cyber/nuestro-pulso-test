import React from 'react';
import LiveChat from './LiveChat';
import Debate from './Debate';
import EnhancedNewsFeed from './EnhancedNewsFeed';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'chat' | 'debate' | 'news' | 'survey' | 'congress' | 'elections' | 'ai' | null;
}

const ModuleModal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const renderContent = () => {
    switch (type) {
      case 'chat':
        return <LiveChat />;
      case 'debate':
        return <Debate />;
      case 'news':
        return <EnhancedNewsFeed onClose={onClose} />;
      case 'survey':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">📊 Encuestas y Sondeos</h2>
                  <p className="opacity-90">Comparte tu opinión sobre temas importantes para Colombia</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Encuestas Disponibles</h3>
                <p className="text-gray-600 mb-8">Próximamente tendremos encuestas interactivas para que puedas expresar tu opinión.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2">Reforma Tributaria 2024</h4>
                    <p className="text-purple-700 text-sm mb-4">¿Qué opinas sobre la nueva propuesta de reforma tributaria?</p>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                      Participar Pronto
                    </button>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2">Transporte Público</h4>
                    <p className="text-blue-700 text-sm mb-4">Evalúa el sistema de transporte público en tu ciudad</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Participar Pronto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'congress':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">🏛️ Seguimiento del Congreso</h2>
                  <p className="opacity-90">Mantente informado sobre la actividad legislativa en tiempo real</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Proyectos de Ley Activos</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900">Reforma de Salud 2024</h4>
                      <p className="text-green-700 text-sm mt-1">En debate en Senado</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">Activo</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-900">Ley de Seguridad Ciudadana</h4>
                      <p className="text-yellow-700 text-sm mt-1">En comisión</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-yellow-600">En proceso</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Estadísticas del Congreso</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-900 font-medium">Leyes aprobadas este año</span>
                        <span className="text-2xl font-bold text-blue-600">47</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-900 font-medium">Sesiones activas</span>
                        <span className="text-2xl font-bold text-purple-600">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'elections':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">📈 Centro Electoral</h2>
                  <p className="opacity-90">Información electoral actualizada y análisis de resultados</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🗳️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Próximas Elecciones</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-200">
                    <h4 className="font-bold text-orange-900 mb-2">Elecciones Regionales 2025</h4>
                    <p className="text-orange-700 text-sm mb-4">Gobernadores y Alcaldes</p>
                    <div className="text-2xl font-bold text-orange-600">342 días</div>
                    <p className="text-xs text-orange-600">para votar</p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2">Consulta Ciudadana</h4>
                    <p className="text-blue-700 text-sm mb-4">Reforma Constitucional</p>
                    <div className="text-2xl font-bold text-blue-600">89 días</div>
                    <p className="text-xs text-blue-600">para participar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">🤖 Asistente AI Cívico</h2>
                  <p className="opacity-90">Tu compañero inteligente para navegar la política colombiana</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Asistente AI Próximamente</h3>
                <p className="text-gray-600 mb-8">
                  Nuestro asistente de inteligencia artificial te ayudará a entender mejor 
                  los temas políticos, encontrar información relevante y participar de manera más informada.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">💬</div>
                    <h4 className="font-semibold text-purple-900">Respuestas Instantáneas</h4>
                    <p className="text-purple-700 text-sm">Obtén explicaciones claras sobre temas políticos complejos</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold text-blue-900">Análisis de Datos</h4>
                    <p className="text-blue-700 text-sm">Comprende estadísticas y tendencias políticas</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold text-indigo-900">Recomendaciones</h4>
                    <p className="text-indigo-700 text-sm">Encuentra debates y contenido relevante para ti</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // For chat and debate, return them directly without wrapper modal
  if (type === 'chat' || type === 'debate') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className="min-h-screen py-8 px-4">
          {renderContent()}
        </div>
      </div>
    );
  }

  // For news, return the enhanced news feed which has its own modal wrapper
  if (type === 'news') {
    return renderContent();
  }

  // For other types, use the standard modal wrapper
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {renderContent()}
    </div>
  );
};

export default ModuleModal;