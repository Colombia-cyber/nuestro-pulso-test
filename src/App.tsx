import React, { useState } from "react";
import FlagshipNavigation from "./components/FlagshipNavigation";
import FlagshipLanding from "./components/FlagshipLanding";
import ChatModule from "./components/modules/ChatModule";
import PollsModule from "./components/modules/PollsModule";
import NewsModule from "./components/modules/NewsModule";

// Simple routing state management (for demo purposes)
type Route = 'home' | 'chat' | 'debate' | 'polls' | 'news' | 'marketplace' | 'care' | 'congress' | 'elections' | 'assistant' | 'alerts' | 'search' | 'feed';

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');

  // Simple route handler
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Route;
      if (hash) {
        setCurrentRoute(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderCurrentModule = () => {
    switch (currentRoute) {
      case 'chat':
        return <ChatModule />;
      case 'polls':
        return <PollsModule />;
      case 'news':
        return <NewsModule />;
      case 'debate':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-purple-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-purple-900 mb-4">🗣️ Módulo de Debates</h1>
              <p className="text-purple-700 text-lg">
                Debates estructurados con moderación IA sobre políticas públicas. 
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'marketplace':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-pink-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-pink-900 mb-4">🛒 Mercado Cívico</h1>
              <p className="text-pink-700 text-lg">
                Economía colaborativa con impacto social para emprendedores colombianos.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'care':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-rose-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-rose-900 mb-4">💝 Red de Cuidado</h1>
              <p className="text-rose-700 text-lg">
                Red de apoyo comunitario y servicios de bienestar para todos los colombianos.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'congress':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-indigo-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-indigo-900 mb-4">🏛️ Congreso Tracker</h1>
              <p className="text-indigo-700 text-lg">
                Seguimiento transparente de proyectos de ley y votaciones del Congreso.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'elections':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-orange-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-orange-900 mb-4">🗳️ Hub Electoral</h1>
              <p className="text-orange-700 text-lg">
                Centro completo de información electoral, candidatos y resultados.
                <br />Próximamente disponible para elecciones 2026.
              </p>
            </div>
          </div>
        );
      case 'assistant':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-cyan-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-cyan-900 mb-4">🤖 Asistente Cívico</h1>
              <p className="text-cyan-700 text-lg">
                Tu asistente personal con IA para navegación cívica y trámites gubernamentales.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-amber-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-amber-900 mb-4">🚨 Sistema de Alertas</h1>
              <p className="text-amber-700 text-lg">
                Notificaciones importantes sobre emergencias, convocatorias cívicas y cambios legislativos.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-gray-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">🔍 Motor de Búsqueda Cívica</h1>
              <p className="text-gray-700 text-lg">
                Búsqueda especializada en contenido cívico, funcionarios públicos y trámites.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'feed':
        return (
          <div className="max-w-7xl mx-auto p-6 text-center">
            <div className="bg-blue-50 rounded-xl p-12">
              <h1 className="text-3xl font-bold text-blue-900 mb-4">📱 Pulse Feed</h1>
              <p className="text-blue-700 text-lg">
                Feed personalizado de actividad cívica con algoritmo que prioriza contenido relevante.
                <br />Próximamente disponible.
              </p>
            </div>
          </div>
        );
      case 'home':
      default:
        return <FlagshipLanding />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <FlagshipNavigation />
      <main className="pt-0">
        {renderCurrentModule()}
      </main>
    </div>
  );
}

export default App;