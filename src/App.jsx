import React, { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import HomePage from './HomePage.tsx';
import NewsFeed from './NewsFeed.tsx';
import News from './components/News.tsx';
import GoogleWebSearchBar from './components/GoogleWebSearchBar.tsx';
import TopicsBar from './components/TopicsBar.jsx';
import CategoryCard from './components/CategoryCard.jsx';
import EnhancedNavBar from './components/EnhancedNavBar.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'news':
        return (
          <>
            <TopicsBar onTopicClick={handleTopicClick} />
            <div className="pt-4">
              <News />
            </div>
          </>
        );
      case 'home':
      default:
        return (
          <>
            {/* Hero Section */}
            <HeroSection />
            
            {/* Topics Bar under News */}
            <TopicsBar onTopicClick={handleTopicClick} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {/* Home Page Content */}
              <HomePage />
              
              {/* Enhanced Universal Search */}
              <section className="mt-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    🔍 Búsqueda Universal de Clase Mundial
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Busca contenido, usuarios, debates y noticias con tecnología avanzada
                  </p>
                  <GoogleWebSearchBar />
                </div>
              </section>
              
              {/* News Feed */}
              <section className="mt-12">
                <NewsFeed />
              </section>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Navigation */}
      <EnhancedNavBar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onCategoryClick={handleCategoryClick}
      />

      {/* Content */}
      <div className="pt-20">
        {renderCurrentView()}
      </div>

      {/* Topic Modal */}
      {selectedTopic && (
        <CategoryCard 
          topic={selectedTopic} 
          onClose={() => setSelectedTopic(null)} 
        />
      )}

      {/* Category Modal */}
      {selectedCategory && (
        <CategoryCard 
          topic={selectedCategory} 
          onClose={() => setSelectedCategory(null)} 
        />
      )}
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/colombia-flag.png" alt="Colombia Flag" className="w-12 h-8" />
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 bg-clip-text text-transparent">
                  Nuestro Pulso
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                La plataforma cívica más avanzada de Colombia. Conectando ciudadanos, 
                fomentando el debate democrático y construyendo el futuro juntos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Debates</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Encuestas</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Congreso</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Marketplace</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Conecta</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Nuestro Pulso. Todos los derechos reservados. 
              Hecho con ❤️ para Colombia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;