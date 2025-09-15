import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TechnologyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const techArticles = [
    {
      id: 1,
      title: 'Colombia lidera transformación digital en América Latina con nuevas políticas de IA',
      summary: 'El gobierno nacional presenta estrategia integral para implementar inteligencia artificial en el sector público.',
      fullContent: `Colombia se posiciona como líder regional en transformación digital con el lanzamiento de la "Estrategia Nacional de Inteligencia Artificial 2024-2030", presentada por el Ministerio de Tecnologías de la Información y las Comunicaciones.

La estrategia contempla una inversión de 1.5 billones de pesos para modernizar la infraestructura tecnológica del Estado y formar a 100,000 colombianos en competencias digitales avanzadas.

Entre los proyectos destacados se encuentra la implementación de un sistema de IA para optimizar los trámites ciudadanos, reduciendo los tiempos de respuesta del 80% de los procedimientos gubernamentales. También se creará un centro de excelencia en IA en alianza con universidades nacionales.

El ministro de las TIC, Mauricio Lizcano, explicó que esta iniciativa busca que Colombia esté entre los 10 países más avanzados en IA para 2030. "Queremos democratizar el acceso a la tecnología y asegurar que ningún colombiano se quede atrás en la revolución digital", declaró.

La estrategia incluye programas especiales para mujeres y comunidades rurales, garantizando conectividad en el 95% del territorio nacional para 2026.`,
      category: 'tecnologia',
      source: 'MinTIC',
      time: '1 hora',
      image: '🤖',
      engagement: { likes: 456, shares: 234, comments: 89 },
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Startups colombianas reciben inversión récord de $500 millones USD en 2024',
      summary: 'El ecosistema emprendedor nacional atrae capital internacional sin precedentes en sectores de fintech y agtech.',
      fullContent: `El ecosistema de startups colombiano registró un crecimiento extraordinario en 2024, recibiendo inversiones por $500 millones de dólares, un aumento del 180% respecto al año anterior.

Según el informe de Colombia Fintech, las empresas de tecnología financiera lideraron las captaciones con $280 millones, seguidas por las agtech con $120 millones y las healthtech con $100 millones.

Destacan casos como Addi, que cerró una ronda Serie B de $75 millones para expandir su plataforma de crédito digital, y Frubana, que levantó $50 millones para revolucionar la cadena de suministro agrícola.

María Alejandra Copete, directora de Ruta N, explicó que este crecimiento se debe a la madurez del ecosistema y las políticas favorables implementadas por el gobierno. "Colombia se está consolidando como hub tecnológico regional", afirmó.

Las inversiones extranjeras provienen principalmente de fondos de Estados Unidos (40%), México (25%) y Brasil (20%), evidenciando la confianza internacional en el talento colombiano.

Para 2025, se proyecta superar los $800 millones en inversiones, con especial énfasis en tecnologías sostenibles y soluciones para la agricultura de precisión.`,
      category: 'tecnologia',
      source: 'Colombia Fintech',
      time: '3 horas',
      image: '💰',
      engagement: { likes: 678, shares: 345, comments: 156 },
      readTime: '6 min'
    },
    {
      id: 3,
      title: 'Bogotá se convierte en la primera ciudad inteligente de Latinoamérica',
      summary: 'La capital implementa IoT, 5G y análisis de datos para mejorar movilidad, seguridad y servicios públicos.',
      fullContent: `Bogotá oficialmente se convirtió en la primera ciudad inteligente certificada de Latinoamérica tras implementar exitosamente más de 50 proyectos de tecnología urbana en los últimos dos años.

La iniciativa "Bogotá Digital 4.0" incluye 10,000 sensores IoT distribuidos por la ciudad para monitorear calidad del aire, tráfico, ruido y consumo energético en tiempo real. Los datos se procesan en un centro de comando unificado que coordina respuestas automáticas a emergencias.

El alcalde Carlos Fernando Galán destacó la reducción del 35% en tiempos de respuesta de emergencias y la disminución del 28% en accidentalidad vial gracias a los semáforos inteligentes que se adaptan al flujo vehicular.

La red 5G, desplegada en alianza con operadores nacionales, cubre el 85% de la ciudad y permite aplicaciones como cirugías remotas en hospitales públicos y educación virtual inmersiva en colegios distritales.

Otros logros incluyen el sistema de pago unificado para transporte público con reconocimiento facial, alumbrado público inteligente que se ajusta según presencia peatonal, y un asistente virtual de IA que atiende el 70% de las consultas ciudadanas.

La ONU reconoció a Bogotá como modelo de desarrollo urbano sostenible, y ya 15 ciudades latinoamericanas han solicitado asesoría para replicar la experiencia.`,
      category: 'tecnologia',
      source: 'Alcaldía de Bogotá',
      time: '2 horas',
      image: '🏙️',
      engagement: { likes: 892, shares: 567, comments: 234 },
      readTime: '7 min'
    }
  ];

  const techStats = [
    { label: 'Startups Activas', value: '3,450', icon: '🚀' },
    { label: 'Inversión 2024', value: '$500M USD', icon: '💰' },
    { label: 'Empleos Tech', value: '280,000', icon: '👩‍💻' },
    { label: 'Cobertura 5G', value: '75%', icon: '📡' }
  ];

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 smooth-transition"
          >
            ← Volver a Tecnología
          </button>
          
          <article className="glass-morphism rounded-lg p-8">
            <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{selectedArticle.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-8">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Tecnología</span>
              <span>{selectedArticle.source}</span>
              <span>•</span>
              <span>hace {selectedArticle.time}</span>
              <span>•</span>
              <span>{selectedArticle.readTime} de lectura</span>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {selectedArticle.fullContent.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 smooth-transition">
                  <span>👍</span>
                  <span>{selectedArticle.engagement.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 smooth-transition">
                  <span>📤</span>
                  <span>{selectedArticle.engagement.shares}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 smooth-transition">
                  <span>💬</span>
                  <span>{selectedArticle.engagement.comments}</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with back navigation */}
          <div className="glass-morphism rounded-lg p-6 mb-8">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-white hover:text-colombia-yellow mb-4 smooth-transition"
            >
              ← Volver al inicio
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">🔬 Tecnología e Innovación</h1>
            <p className="text-white/90 text-lg">Transformación digital y startups en Colombia</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {techStats.map((stat, index) => (
              <div key={index} className="glass-morphism rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Featured articles */}
          <div className="space-y-6">
            {techArticles.map((article) => (
              <div key={article.id} className="glass-morphism rounded-lg p-6 smooth-transition hover:scale-[1.02]">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Tecnología
                      </span>
                      <span className="text-white/80 text-sm">{article.source}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80 text-sm">hace {article.time}</span>
                    </div>
                    
                    <h3 
                      className="text-2xl font-bold text-white mb-3 cursor-pointer hover:text-colombia-yellow smooth-transition"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {article.title}
                    </h3>
                    
                    <p className="text-white/90 mb-4 text-lg">{article.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/80">
                        <button className="flex items-center space-x-1 hover:text-white smooth-transition">
                          <span>👍</span>
                          <span>{article.engagement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-white smooth-transition">
                          <span>📤</span>
                          <span>{article.engagement.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-white smooth-transition">
                          <span>💬</span>
                          <span>{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 smooth-transition"
                      >
                        Leer más →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trending tech topics */}
          <div className="mt-8 glass-morphism rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">🔥 Trending en Tecnología</h3>
            <div className="flex flex-wrap gap-3">
              {['#IA', '#Startups', '#Fintech', '#5G', '#IoT', '#Blockchain', '#Agtech', '#Healthtech'].map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-white/30 smooth-transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;