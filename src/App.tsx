import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomePage from "./HomePage";
import NewsFeed from "./NewsFeed";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <Hero />
      </div>
      
      {/* Main Content */}
      <main>
        <HomePage />
        <div className="container mx-auto px-4">
          <NewsFeed />
        </div>
      </main>
      
      {/* Footer with Colombian theme */}
      <footer className="bg-overlay-dark mt-16 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="text-4xl">🇨🇴</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Nuestro Pulso</h3>
          <p className="text-white/80 mb-4">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Términos de Uso</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Contacto</a>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/60 text-sm">
              © 2024 Nuestro Pulso. Todos los derechos reservados. 
              <span className="block mt-1">Orgullosamente colombiano 🇨🇴</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;