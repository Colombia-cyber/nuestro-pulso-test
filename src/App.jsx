import React from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import News from './components/News.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Home Page Content */}
        <HomePage />
        
        {/* Civic News */}
        <section className="mt-12">
          <News />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🇨🇴 Nuestro Pulso</p>
          <p className="text-gray-400">Red Cívica de Colombia - Construyendo el futuro juntos</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>© 2024 Nuestro Pulso. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;