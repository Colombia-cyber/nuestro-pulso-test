import React, { useState, useEffect } from 'react';
import { FiMapPin, FiCamera, FiHeart, FiStar, FiNavigation } from 'react-icons/fi';

interface TravelDestination {
  id: string;
  name: string;
  region: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  rating: number;
  bestTime: string;
  tags: string[];
  coordinates: [number, number];
}

interface CulturalEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  category: 'festival' | 'music' | 'food' | 'art' | 'dance';
  imageUrl: string;
}

interface FoodItem {
  id: string;
  name: string;
  region: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
  prepTime: string;
}

const TravelCultureGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'travel' | 'culture' | 'food'>('travel');
  const [destinations, setDestinations] = useState<TravelDestination[]>([]);
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setIsLoading(true);
    
    // Mock data - in production would fetch from APIs
    setTimeout(() => {
      setDestinations([
        {
          id: 'cartagena',
          name: 'Cartagena de Indias',
          region: 'Caribe',
          description: 'Ciudad amurallada con arquitectura colonial, playas paradisíacas y rica historia.',
          highlights: ['Ciudad Amurallada', 'Islas del Rosario', 'Castillo San Felipe', 'Getsemaní'],
          imageUrl: '/api/placeholder/400/300',
          rating: 4.8,
          bestTime: 'Diciembre - Marzo',
          tags: ['historia', 'playa', 'colonial', 'patrimonio'],
          coordinates: [10.3910, -75.4794]
        },
        {
          id: 'medellin',
          name: 'Medellín',
          region: 'Antioquia',
          description: 'Ciudad de la eterna primavera, innovación urbana y transformación social.',
          highlights: ['Comuna 13', 'Metrocable', 'Museo Botero', 'Guatapé'],
          imageUrl: '/api/placeholder/400/300',
          rating: 4.7,
          bestTime: 'Todo el año',
          tags: ['innovación', 'urbano', 'arte', 'montañas'],
          coordinates: [6.2442, -75.5812]
        },
        {
          id: 'cocora',
          name: 'Valle del Cocora',
          region: 'Quindío',
          description: 'Hogar de las palmas de cera más altas del mundo en paisajes de ensueño.',
          highlights: ['Palmas de Cera', 'Senderismo', 'Bosque de Niebla', 'Salento'],
          imageUrl: '/api/placeholder/400/300',
          rating: 4.9,
          bestTime: 'Junio - Agosto',
          tags: ['naturaleza', 'senderismo', 'café', 'paisaje'],
          coordinates: [4.6333, -75.4833]
        }
      ]);

      setEvents([
        {
          id: 'carnaval-barranquilla',
          name: 'Carnaval de Barranquilla',
          description: 'Una de las fiestas folclóricas más importantes de Colombia, declarada Patrimonio de la Humanidad.',
          date: '24 Feb - 27 Feb 2024',
          location: 'Barranquilla',
          category: 'festival',
          imageUrl: '/api/placeholder/300/200'
        },
        {
          id: 'festival-vallenato',
          name: 'Festival de la Leyenda Vallenata',
          description: 'El evento musical más importante del vallenato en Colombia.',
          date: '26 Abr - 30 Abr 2024',
          location: 'Valledupar',
          category: 'music',
          imageUrl: '/api/placeholder/300/200'
        },
        {
          id: 'feria-flores',
          name: 'Feria de las Flores',
          description: 'Celebración anual que honra la tradición silletera y la belleza floral de Antioquia.',
          date: '2 Ago - 11 Ago 2024',
          location: 'Medellín',
          category: 'festival',
          imageUrl: '/api/placeholder/300/200'
        }
      ]);

      setFoods([
        {
          id: 'bandeja-paisa',
          name: 'Bandeja Paisa',
          region: 'Antioquia',
          description: 'El plato más representativo de Colombia, una abundante mezcla de sabores tradicionales.',
          ingredients: ['Frijoles', 'Arroz', 'Carne molida', 'Chicharrón', 'Huevo frito', 'Plátano maduro', 'Arepa', 'Aguacate'],
          imageUrl: '/api/placeholder/300/200',
          difficulty: 'medio',
          prepTime: '2 horas'
        },
        {
          id: 'ajiaco',
          name: 'Ajiaco Santafereño',
          region: 'Bogotá',
          description: 'Sopa tradicional bogotana con tres tipos de papa, pollo y guascas.',
          ingredients: ['Papa criolla', 'Papa sabanera', 'Papa pastusa', 'Pollo', 'Guascas', 'Crema', 'Alcaparras', 'Mazorca'],
          imageUrl: '/api/placeholder/300/200',
          difficulty: 'medio',
          prepTime: '1.5 horas'
        },
        {
          id: 'sancocho',
          name: 'Sancocho de Gallina',
          region: 'Nacional',
          description: 'Sopa tradicional que varía por regiones, perfecta para compartir en familia.',
          ingredients: ['Gallina', 'Plátano verde', 'Yuca', 'Mazorca', 'Cilantro', 'Cebolla', 'Ajo'],
          imageUrl: '/api/placeholder/300/200',
          difficulty: 'fácil',
          prepTime: '3 horas'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil': return 'text-green-600 bg-green-100';
      case 'medio': return 'text-yellow-600 bg-yellow-100';
      case 'difícil': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'festival': return '🎭';
      case 'music': return '🎵';
      case 'food': return '🍽️';
      case 'art': return '🎨';
      case 'dance': return '💃';
      default: return '🎉';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Guía Cultural de Colombia</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('travel')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'travel' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            ✈️ Turismo
          </button>
          <button
            onClick={() => setActiveTab('culture')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'culture' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            🎭 Cultura
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'food' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            🍽️ Gastronomía
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Travel Tab */}
          {activeTab === 'travel' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <div key={destination.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={destination.imageUrl}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <FiStar className="text-yellow-500" size={14} />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{destination.name}</h3>
                      <span className="text-sm text-blue-600 font-medium">{destination.region}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <FiMapPin className="text-blue-500" size={14} />
                        <span className="text-gray-600">Mejor época: {destination.bestTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {destination.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="text-sm font-medium text-gray-800 mb-1">Imperdibles:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {destination.highlights.slice(0, 2).map((highlight) => (
                            <li key={highlight} className="flex items-center space-x-1">
                              <FiNavigation size={10} className="text-blue-500" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Culture Tab */}
          {activeTab === 'culture' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden border border-purple-100 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={event.imageUrl}
                      alt={event.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-lg">{getCategoryIcon(event.category)}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <FiMapPin className="text-purple-500" size={14} />
                        <span className="text-gray-600">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <FiCamera className="text-purple-500" size={14} />
                        <span className="text-gray-600">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Food Tab */}
          {activeTab === 'food' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <div key={food.id} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg overflow-hidden border border-orange-100 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(food.difficulty)}`}>
                        {food.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>
                      <span className="text-sm text-orange-600 font-medium">{food.region}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{food.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <FiHeart className="text-orange-500" size={14} />
                        <span className="text-gray-600">Tiempo: {food.prepTime}</span>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 mb-1">Ingredientes principales:</h4>
                        <div className="flex flex-wrap gap-1">
                          {food.ingredients.slice(0, 4).map((ingredient) => (
                            <span
                              key={ingredient}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                          {food.ingredients.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{food.ingredients.length - 4} más
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TravelCultureGuide;