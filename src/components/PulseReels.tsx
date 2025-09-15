import React, { useState, useEffect } from 'react';
import { allPulseReels, PulseReel } from '../data/reelsData';

const PulseReels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reelsPerPage] = useState(12);
  const [selectedReel, setSelectedReel] = useState<PulseReel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'ambiente', name: 'Ambiente', icon: '🌱' },
    { id: 'participacion', name: 'Participación', icon: '👥' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'terror', name: 'Terror', icon: '🚨' },
    { id: 'tecnologia', name: 'Technology', icon: '💻' }
  ];

  // Simulate loading reels
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setCurrentPage(1);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (2% chance)
        if (Math.random() < 0.02) {
          throw new Error('Error al cargar los reels. Verifica tu conexión.');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Filter reels based on category and search query
  const getFilteredReels = () => {
    let filtered = selectedCategory === 'todos' 
      ? allPulseReels 
      : allPulseReels.filter(reel => reel.category === selectedCategory);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reel => 
        reel.title.toLowerCase().includes(query) ||
        reel.description.toLowerCase().includes(query) ||
        reel.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredReels = getFilteredReels();
  
  // Pagination logic
  const totalPages = Math.ceil(filteredReels.length / reelsPerPage);
  const startIndex = (currentPage - 1) * reelsPerPage;
  const endIndex = startIndex + reelsPerPage;
  const currentReels = filteredReels.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Video Player Modal Component
  const VideoPlayerModal = ({ reel, onClose }: { reel: PulseReel; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex-1 mr-4">{reel.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          {/* Video Player */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={reel.videoUrl}
              title={reel.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                reel.category === 'terror' ? 'bg-red-100 text-red-800' :
                reel.category === 'trump' ? 'bg-blue-100 text-blue-800' :
                reel.category === 'congreso' ? 'bg-purple-100 text-purple-800' :
                reel.category === 'tecnologia' ? 'bg-indigo-100 text-indigo-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {categories.find(c => c.id === reel.category)?.name}
              </span>
              <span className="text-sm text-gray-500">{reel.author}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{reel.duration}</span>
              {reel.isLive && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                  🔴 EN VIVO
                </span>
              )}
            </div>

            <p className="text-gray-700">{reel.description}</p>

            {reel.tags && (
              <div className="flex flex-wrap gap-2">
                {reel.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <span>👁️</span>
                <span>{reel.views.toLocaleString()} visualizaciones</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>❤️</span>
                <span>{reel.likes.toLocaleString()} me gusta</span>
              </span>
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <span>📤</span>
                <span>Compartir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading skeleton for reels
  const LoadingSkeletonReels = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="bg-gray-300 h-64"></div>
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-16 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-3 bg-gray-300 rounded"></div>
            </div>
            <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
            <div className="w-full h-4 bg-gray-300 rounded mb-3"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-3 bg-gray-300 rounded"></div>
                <div className="w-12 h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="w-16 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state for reels
  const ErrorStateReels = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📱</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar Reels</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Pulse Reels</h1>
          <p className="text-white/90">Videos cortos sobre temas cívicos y participación ciudadana</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🎥 {allPulseReels.length} videos disponibles</span>
            <span>👁️ Millones de visualizaciones</span>
            <span>📱 Contenido móvil optimizado</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar reels por título, descripción o etiquetas (ej: terror, Trump, tecnología)..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🔍 Buscar
            </button>
            {searchQuery && (
              <button 
                type="button"
                onClick={() => {setSearchQuery(''); setCurrentPage(1);}}
                className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </form>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              🔍 Buscando: "<strong>{searchQuery}</strong>" - {filteredReels.length} reels encontrados
            </p>
          )}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stream Alert */}
        {filteredReels.some(reel => reel.isLive) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse mr-3">
                🔴 TRANSMISIONES EN VIVO
              </span>
              <p className="text-red-800">
                {filteredReels.filter(reel => reel.isLive).length} videos en transmisión en vivo disponibles
              </p>
            </div>
          </div>
        )}

        {/* Reels Grid */}
        <div className="mb-8">
          {isLoading ? (
            <LoadingSkeletonReels />
          ) : error ? (
            <ErrorStateReels />
          ) : (
            <>
              {/* Reels Count and Page Info */}
              <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mb-6">
                <div className="text-sm text-gray-600">
                  📊 Mostrando {startIndex + 1}-{Math.min(endIndex, filteredReels.length)} de {filteredReels.length} reels
                  {searchQuery && ` para "${searchQuery}"`}
                  {selectedCategory !== 'todos' && ` en categoría "${categories.find(c => c.id === selectedCategory)?.name}"`}
                </div>
                <div className="text-sm text-gray-500">
                  📄 Página {currentPage} de {totalPages}
                </div>
              </div>

              {/* Reels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentReels.map((reel) => (
                  <div key={reel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                    {/* Thumbnail */}
                    <div 
                      className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center group-hover:scale-105 transition-transform"
                      onClick={() => setSelectedReel(reel)}
                    >
                      <div className="text-6xl">{reel.thumbnail}</div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {reel.duration}
                      </div>
                      {reel.isLive && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          🔴 LIVE
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <div className="text-white text-6xl opacity-0 group-hover:opacity-100 transition-opacity">
                          ▶️
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reel.category === 'politica' ? 'bg-blue-100 text-blue-800' :
                          reel.category === 'participacion' ? 'bg-green-100 text-green-800' :
                          reel.category === 'ambiente' ? 'bg-emerald-100 text-emerald-800' :
                          reel.category === 'educacion' ? 'bg-purple-100 text-purple-800' :
                          reel.category === 'terror' ? 'bg-red-100 text-red-800' :
                          reel.category === 'trump' ? 'bg-orange-100 text-orange-800' :
                          reel.category === 'congreso' ? 'bg-indigo-100 text-indigo-800' :
                          reel.category === 'tecnologia' ? 'bg-cyan-100 text-cyan-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(c => c.id === reel.category)?.name}
                        </span>
                        <span className="text-xs text-gray-500">{reel.author}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 cursor-pointer"
                          onClick={() => setSelectedReel(reel)}>
                        {reel.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reel.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <span>👁️</span>
                            <span>{reel.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>❤️</span>
                            <span>{reel.likes.toLocaleString()}</span>
                          </span>
                        </div>
                        <button 
                          onClick={() => setSelectedReel(reel)}
                          className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-2 py-1 rounded transition-colors">
                          Ver ahora
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                  <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Anterior
                    </button>

                    {/* Page Numbers */}
                    {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                      let pageNumber;
                      if (totalPages <= 7) {
                        pageNumber = index + 1;
                      } else if (currentPage <= 4) {
                        pageNumber = index + 1;
                      } else if (currentPage >= totalPages - 3) {
                        pageNumber = totalPages - 6 + index;
                      } else {
                        pageNumber = currentPage - 3 + index;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente →
                    </button>
                  </div>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    Página {currentPage} de {totalPages} • Total: {filteredReels.length} reels
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Trending Topics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Trending en Reels</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#TerrorNews',
              '#TrumpColombia',
              '#CongresoEnVivo',
              '#TecnologíaColombia',
              '#ParticipacionCiudadana',
              '#ReformasPoliticas',
              '#SeguridadNacional',
              '#InnovaciónDigital'
            ].map((hashtag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(hashtag.substring(1))}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {hashtag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedReel && (
        <VideoPlayerModal 
          reel={selectedReel} 
          onClose={() => setSelectedReel(null)} 
        />
      )}
    </div>
  );
};

export default PulseReels;