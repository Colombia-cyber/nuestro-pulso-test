import React from 'react';
import { getTrendingPolls } from './data/samplePolls';
import PollCard from './components/polls/PollCard';
import CategoryCard from './components/CategoryCard';
import InfoComingSoonBox from './components/InfoComingSoonBox';

const HomePage: React.FC = () => {
  const trendingPolls = getTrendingPolls().slice(0, 2); // Get top 2 trending polls

  const handleVote = (pollId: string, optionId: string) => {
    console.log(`Voted for option ${optionId} in poll ${pollId}`);
    // In a real app, this would make an API call
  };

  const handleViewDetails = (pollId: string) => {
    console.log(`View details for poll ${pollId}`);
    // In a real app, this would navigate to the poll details page
  };

  const handleCategoryClick = (category: string) => {
    console.log(`Navigate to ${category}`);
    // In a real app, this would navigate to the category page
  };

  const categories = [
    {
      title: "Gustavo Petro",
      description: "Análisis y noticias sobre el presidente y sus políticas",
      icon: "🏛️",
      bgColor: "bg-gradient-to-br from-green-400 to-green-600",
      textColor: "text-white",
      stats: "+25,000 debates activos",
      isPopular: true
    },
    {
      title: "Donald Trump",
      description: "Cobertura internacional y impacto en Colombia",
      icon: "🇺🇸",
      bgColor: "bg-gradient-to-br from-red-400 to-red-600",
      textColor: "text-white",
      stats: "+18,500 menciones semanales"
    },
    {
      title: "Crimen y Drogas",
      description: "Seguridad nacional y lucha contra el narcotráfico",
      icon: "🚨",
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
      textColor: "text-white",
      stats: "+12,300 reportes activos",
      isPopular: true
    },
    {
      title: "Empleo",
      description: "Mercado laboral, desempleo y oportunidades",
      icon: "💼",
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      textColor: "text-white",
      stats: "+8,900 propuestas laborales"
    },
    {
      title: "Terror",
      description: "Seguridad nacional y prevención del terrorismo",
      icon: "⚠️",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-800",
      textColor: "text-white",
      stats: "Monitoreo 24/7"
    },
    {
      title: "Derecha",
      description: "Políticas conservadoras y partidos de derecha",
      icon: "🔵",
      bgColor: "bg-gradient-to-br from-indigo-400 to-purple-600",
      textColor: "text-white",
      stats: "+15,200 seguidores"
    },
    {
      title: "Izquierda",
      description: "Políticas progresistas y movimientos sociales",
      icon: "🔴",
      bgColor: "bg-gradient-to-br from-pink-400 to-red-500",
      textColor: "text-white",
      stats: "+22,100 activistas"
    },
    {
      title: "Legislación",
      description: "Proyectos de ley y procesos legislativos",
      icon: "⚖️",
      bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500",
      textColor: "text-white",
      stats: "+45 proyectos en trámite"
    },
    {
      title: "Congreso",
      description: "Actividad parlamentaria y decisiones legislativas",
      icon: "🏛️",
      bgColor: "bg-gradient-to-br from-teal-400 to-cyan-600",
      textColor: "text-white",
      stats: "Sesión permanente",
      isPopular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-4">
            Bienvenido a Nuestro Pulso
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            La plataforma líder de participación cívica en Colombia
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 h-1 w-32 rounded-full"></div>
          </div>
        </div>
        
        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
              <span className="text-2xl">💬</span>
              Chat en Vivo
            </h3>
            <p className="text-gray-600 mb-4">
              Únete a conversaciones en tiempo real sobre temas de interés nacional.
            </p>
            <div className="text-sm text-blue-600 font-semibold">
              +1,250 usuarios conectados
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-green-600 flex items-center gap-2">
              <span className="text-2xl">🗣️</span>
              Debates
            </h3>
            <p className="text-gray-600 mb-4">
              Participa en debates estructurados sobre políticas públicas.
            </p>
            <div className="text-sm text-green-600 font-semibold">
              +89 debates activos
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 ring-2 ring-yellow-400 relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              🔥 POPULAR
            </div>
            <h3 className="text-xl font-bold mb-4 text-purple-600 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Encuestas
            </h3>
            <p className="text-gray-600 mb-4">
              Comparte tu opinión en encuestas sobre temas de actualidad y política nacional.
            </p>
            <div className="text-sm text-purple-600 font-semibold">
              +48,000 votos esta semana
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4 text-orange-600 flex items-center gap-2">
              <span className="text-2xl">📰</span>
              Noticias
            </h3>
            <p className="text-gray-600 mb-4">
              Mantente informado sobre perspectivas y cobertura electoral.
            </p>
            <div className="text-sm text-orange-600 font-semibold">
              Actualizado cada hora
            </div>
          </div>
        </div>

        {/* Category Cards Grid - Enhanced */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
              <span className="text-white text-2xl">🏷️</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">Categorías Principales</h2>
              <p className="text-gray-600">
                Explora los temas más importantes de Colombia
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                description={category.description}
                icon={category.icon}
                bgColor={category.bgColor}
                textColor={category.textColor}
                onClick={() => handleCategoryClick(category.title.toLowerCase())}
                isPopular={category.isPopular}
                stats={category.stats}
              />
            ))}
          </div>
        </div>

        {/* Info/Coming Soon Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InfoComingSoonBox
              title="Centro de Análisis IA"
              description="Próximamente: análisis automatizado de tendencias políticas y sentimiento ciudadano con inteligencia artificial."
              icon="🤖"
              features={[
                "Análisis de sentimiento en tiempo real",
                "Predicciones de tendencias políticas",
                "Resúmenes automáticos de debates",
                "Detección de noticias falsas",
                "Métricas de participación ciudadana"
              ]}
            />
            
            <InfoComingSoonBox
              title="Plataforma de Votación Blockchain"
              description="Sistema de votación descentralizado y transparente para encuestas ciudadanas verificables."
              icon="🗳️"
              features={[
                "Votación anónima y verificable",
                "Transparencia total con blockchain",
                "Resultados en tiempo real",
                "Prevención de fraude electoral",
                "Historial inmutable de votos"
              ]}
              bgColor="bg-gradient-to-br from-purple-50 to-pink-100"
            />
          </div>
        </div>

        {/* Featured Polls Preview Section - Enhanced */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500">
                <span className="text-white text-2xl">🔥</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Encuestas Trending</h2>
                <p className="text-gray-600">
                  Las encuestas más populares del momento
                </p>
              </div>
            </div>
            <a 
              href="/encuestas" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Ver todas →
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trendingPolls.map((poll) => (
              <div key={poll.id} className="transform hover:scale-105 transition-transform duration-300">
                <PollCard
                  poll={poll}
                  onVote={handleVote}
                  onViewDetails={handleViewDetails}
                  compact={true}
                />
              </div>
            ))}
          </div>

          {trendingPolls.length === 0 && (
            <div className="text-center py-12 bg-white/50 rounded-xl border border-gray-200">
              <span className="text-6xl mb-4 block">📊</span>
              <p className="text-gray-600 text-lg">No hay encuestas trending en este momento</p>
            </div>
          )}
        </div>

        {/* Enhanced Conservative News Section */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">🗳️</div>
            <h2 className="text-3xl font-black text-white">Noticias Conservadoras y Elecciones</h2>
          </div>
          <p className="text-white/90 mb-8 text-lg">
            Últimas noticias sobre política conservadora, candidatos, encuestas electorales y análisis de derecha
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 hover:bg-white/25 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span>📊</span>
                Encuestas Electorales
              </h4>
              <p className="text-white/85">
                Tendencias y proyecciones de candidatos conservadores en próximas elecciones
              </p>
              <div className="mt-4 text-yellow-300 font-semibold text-sm">
                +15 encuestas nuevas esta semana
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 hover:bg-white/25 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span>🏛️</span>
                Políticas Conservadoras
              </h4>
              <p className="text-white/85">
                Propuestas de reducción de impuestos, seguridad y valores tradicionales
              </p>
              <div className="mt-4 text-yellow-300 font-semibold text-sm">
                +23 propuestas en revisión
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 hover:bg-white/25 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <h4 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                <span>👥</span>
                Candidatos
              </h4>
              <p className="text-white/85">
                Perfiles y posiciones de candidatos conservadores destacados
              </p>
              <div className="mt-4 text-yellow-300 font-semibold text-sm">
                +8 candidatos registrados
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;