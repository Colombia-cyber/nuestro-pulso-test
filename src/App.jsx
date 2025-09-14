import React from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import Button from './components/Button';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <main className="relative -mt-32 z-30">
        {/* Home Page Content */}
        <HomePage />
        
        {/* News Feed */}
        <section className="container mx-auto px-4 py-12">
          <NewsFeed />
        </section>
      </main>
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold">🇨🇴 Nuestro Pulso</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-lg">
                Red Cívica de Colombia - Construyendo el futuro juntos a través de la participación ciudadana activa y el diálogo democrático.
              </p>
              <div className="flex space-x-4">
                <Button variant="primary" size="sm">
                  📱 Descargar App
                </Button>
                <Button variant="secondary" size="sm">
                  📧 Newsletter
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Debates</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Encuestas</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Chat en Vivo</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Noticias</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Congreso</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Accesibilidad</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-300">Síguenos en nuestras redes sociales</p>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">📘</a>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">🐦</a>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-xl">📷</a>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors text-xl">📺</a>
                  <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors text-xl">💼</a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-300">¿Tienes preguntas?</p>
                <a href="mailto:contacto@nuestropulso.co" className="text-blue-400 hover:text-blue-300 transition-colors">
                  contacto@nuestropulso.co
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-gray-700 pt-8">
            <p className="text-gray-400 mb-2">
              © 2024 Nuestro Pulso. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-500">
              Hecho con ❤️ para la democracia colombiana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;