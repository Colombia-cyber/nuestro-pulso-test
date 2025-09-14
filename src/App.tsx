import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";
import ModuleCard from "./components/ModuleCard";
import ModuleModal from "./components/ModuleModal";
import EnhancedFooter from "./components/EnhancedFooter";
import NewsFeed from "./NewsFeed";

type ModalType = 'chat' | 'debate' | 'news' | 'survey' | 'congress' | 'elections' | 'ai' | null;

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Main Hero Card */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-blue-500/25">
              <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <span className="text-6xl mr-4">🇨🇴</span>
                  <h1 className="text-4xl md:text-6xl font-bold">Nuestro Pulso</h1>
                </div>
                <p className="text-xl md:text-2xl mb-4 opacity-95">Red Cívica de Colombia - Tu Voz Cuenta</p>
                <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Únete a la conversación nacional. Participa en debates, encuestas y chat en vivo 
                  para construir el futuro de Colombia juntos.
                </p>
                
                {/* Primary Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => openModal('chat')}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="text-2xl">💬</span>
                    <span>Chat en Vivo</span>
                  </button>
                  
                  <button
                    onClick={() => openModal('debate')}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="text-2xl">🗣️</span>
                    <span>Debates</span>
                  </button>
                  
                  <button
                    onClick={() => openModal('survey')}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="text-2xl">📊</span>
                    <span>Encuestas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ModuleCard
              icon="🏛️"
              title="Congreso"
              description="Sigue la actividad legislativa en tiempo real"
              onClick={() => openModal('congress')}
              gradient="from-blue-600 to-indigo-700"
            />
            
            <ModuleCard
              icon="📈"
              title="Elecciones"
              description="Centro de información electoral actualizada"
              onClick={() => openModal('elections')}
              gradient="from-orange-500 to-red-600"
            />
            
            <ModuleCard
              icon="📰"
              title="Noticias"
              description="Análisis y cobertura de eventos cívicos"
              onClick={() => openModal('news')}
              gradient="from-red-500 to-pink-600"
            />
            
            <ModuleCard
              icon="🤖"
              title="Asistente AI"
              description="Tu compañero inteligente para la política colombiana"
              onClick={() => openModal('ai')}
              gradient="from-purple-600 to-blue-600"
            />
            
            <ModuleCard
              icon="📊"
              title="Encuestas"
              description="Comparte tu opinión en sondeos nacionales"
              onClick={() => openModal('survey')}
              gradient="from-green-500 to-teal-600"
            />
            
            <ModuleCard
              icon="💬"
              title="Chat Cívico"
              description="Conversaciones en tiempo real sobre Colombia"
              onClick={() => openModal('chat')}
              gradient="from-blue-500 to-cyan-600"
            />
          </div>
        </div>
      </div>

      {/* Universal Search Bar */}
      <GoogleWebSearchBar />

      {/* Live News Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📰 Noticias en Tiempo Real</h2>
              <p className="text-gray-600">Mantente informado con las últimas noticias de Colombia y el mundo</p>
            </div>
            <NewsFeed />
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <EnhancedFooter
        onOpenChat={() => openModal('chat')}
        onOpenDebates={() => openModal('debate')}
        onOpenNews={() => openModal('news')}
        onOpenSurveys={() => openModal('survey')}
      />

      {/* Modal */}
      <ModuleModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        type={activeModal}
      />
    </div>
  );
}

export default App;