import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import DebatePage from './pages/DebatePage';
import SurveyPage from './pages/SurveyPage';
import NewsPage from './pages/NewsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/debate" element={<DebatePage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold">🇨🇴 Nuestro Pulso</span>
                </div>
                <p className="text-gray-300 mb-4 max-w-md">
                  La plataforma líder de participación cívica en Colombia. 
                  Construyendo el futuro juntos con tu voz y participación.
                </p>
                <div className="text-sm text-gray-400">
                  <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Plataforma</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
                  <li><a href="/chat" className="hover:text-white transition-colors">Chat</a></li>
                  <li><a href="/debate" className="hover:text-white transition-colors">Debates</a></li>
                  <li><a href="/survey" className="hover:text-white transition-colors">Encuestas</a></li>
                  <li><a href="/news" className="hover:text-white transition-colors">Noticias</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Comunidad</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Acerca de</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-sm">
                Futuro Colombia - Donde cada voz cuenta para construir nuestro mañana
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;