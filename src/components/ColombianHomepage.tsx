import React, { useState, useEffect } from 'react';
import { NEWS_CATEGORIES, COLOMBIA_GRADIENT, SOCIAL_PLATFORMS } from '../config/categories';
import { NewsCategory } from '../types/news';

interface ColombianHomepageProps {
  onNavigate: (view: string) => void;
  onCategorySelect: (category: NewsCategory) => void;
}

const ColombianHomepage: React.FC<ColombianHomepageProps> = ({ onNavigate, onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = (category: NewsCategory) => {
    setIsLoading(true);
    setActiveCategory(category);
    
    // Simulate loading and navigate to news feed with category
    setTimeout(() => {
      onCategorySelect(category);
      onNavigate('feeds');
      setIsLoading(false);
    }, 500);
  };

  const handleReelsClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      onNavigate('reels');
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Colombian Flag Theme */}
      <section className={`relative ${COLOMBIA_GRADIENT} py-20 px-4`}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              🇨🇴 Nuestro Pulso
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-6">
              Plataforma de Noticias de Colombia
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Tu fuente confiable de noticias colombianas con perspectivas políticas balanceadas. 
              Mantente informado sobre el congreso, seguridad, economía y más.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={handleReelsClick}
              className="bg-white bg-opacity-20 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎬 Ver Reels
            </button>
            <button 
              onClick={() => onNavigate('search')}
              className="bg-white bg-opacity-20 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔍 Buscar Noticias
            </button>
            <button 
              onClick={() => onNavigate('community-hub')}
              className="bg-white bg-opacity-20 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              💭 Comunidad
            </button>
          </div>

          {/* Social Platform Icons */}
          <div className="flex justify-center gap-6 mb-8">
            {Object.entries(SOCIAL_PLATFORMS).map(([key, platform]) => (
              <div
                key={key}
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-4 hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                title={platform.name}
              >
                <span className="text-2xl">{platform.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Explora por Categorías
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {NEWS_CATEGORIES.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`${category.color} hover:opacity-90 transition-all duration-300 transform hover:scale-105 rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl group ${
                  isLoading && activeCategory === category.id ? 'animate-pulse' : ''
                }`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {category.description}
                </p>
                
                {isLoading && activeCategory === category.id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Características de la Plataforma
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-4">📰</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Noticias en Tiempo Real</h3>
              <p className="text-gray-600 leading-relaxed">
                Accede a las últimas noticias de Colombia con actualizaciones en tiempo real desde múltiples fuentes verificadas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-4">💭</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Comentarios Políticos</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada artículo incluye espacios separados para comentarios de derecha e izquierda política, fomentando el debate respetuoso.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Reels de Noticias</h3>
              <p className="text-gray-600 leading-relaxed">
                Disfruta de contenido de noticias en formato corto estilo TikTok desde YouTube, Facebook, Twitter y WhatsApp.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-4">🏛️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Seguimiento del Congreso</h3>
              <p className="text-gray-600 leading-relaxed">
                Mantente al día con la actividad legislativa, proyectos de ley y decisiones importantes del Congreso colombiano.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Búsqueda Avanzada</h3>
              <p className="text-gray-600 leading-relaxed">
                Busca noticias por categoría, fecha, fuente y más. Accede a archivos de hasta 30 años de historia noticiosa.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Multiplataforma</h3>
              <p className="text-gray-600 leading-relaxed">
                Experiencia optimizada para móvil y escritorio con diseño responsivo y navegación intuitiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800">Cargando contenido...</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColombianHomepage;