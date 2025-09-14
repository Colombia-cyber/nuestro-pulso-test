import React, { useState, useEffect } from 'react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  publishedAt: Date;
  category: 'economics' | 'elections' | 'candidates' | 'policies' | 'analysis';
  tags: string[];
  imageUrl?: string;
  isBreaking?: boolean;
  readTime: number;
}

const RightWingNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const categories = [
    { id: 'all', name: 'Todas', icon: '🗞️' },
    { id: 'elections', name: 'Elecciones', icon: '🗳️' },
    { id: 'candidates', name: 'Candidatos', icon: '👔' },
    { id: 'economics', name: 'Economía', icon: '💰' },
    { id: 'policies', name: 'Políticas', icon: '📋' },
    { id: 'analysis', name: 'Análisis', icon: '📊' }
  ];

  // Mock conservative news articles
  useEffect(() => {
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Candidatos conservadores consolidan liderazgo en encuestas regionales',
        summary: 'Últimas mediciones muestran crecimiento sostenido de partidos de derecha en Antioquia, Valle del Cauca y Santander.',
        content: `Las más recientes encuestas electorales revelan una tendencia favorable hacia candidatos conservadores en las principales regiones del país. 

En Antioquia, el candidato conservador lidera con 45% de intención de voto, seguido por candidatos de centro con 28%. Los analistas atribuyen este resultado a las propuestas de reducción fiscal y fortalecimiento de la seguridad ciudadana.

Valle del Cauca presenta números similares, donde propuestas de libre mercado y apoyo al sector empresarial han resonado entre los votantes. La promesa de reducir la carga tributaria a las empresas ha sido particularmente bien recibida.

En Santander, tradicional bastión conservador, se mantiene la preferencia por candidatos de derecha con propuestas claras sobre desarrollo económico y atracción de inversión extranjera.

Los expertos señalan que estos resultados reflejan una búsqueda de estabilidad económica y políticas pro-empresa en medio de la incertidumbre económica actual.`,
        author: 'María Elena Rodríguez',
        source: 'Análisis Electoral Colombia',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'elections',
        tags: ['encuestas', 'conservadores', 'regionales'],
        readTime: 4,
        isBreaking: true
      },
      {
        id: '2',
        title: 'Propuesta conservadora de reforma tributaria gana apoyo empresarial',
        summary: 'Gremios económicos respaldan iniciativa de reducir impuesto de renta corporativo del 35% al 25%.',
        content: `La propuesta conservadora de reforma tributaria ha recibido el respaldo de importantes gremios empresariales del país. La iniciativa contempla una reducción significativa del impuesto de renta corporativo del actual 35% al 25%, lo que representaría uno de los cambios más importantes en política fiscal de los últimos años.

"Esta reforma es fundamental para mejorar la competitividad del país y atraer inversión extranjera", declaró el presidente de la ANDI. La propuesta también incluye incentivos especiales para startups y empresas de tecnología.

El plan económico conservador incluye:
- Reducción del impuesto de renta corporativo
- Eliminación de la sobretasa temporal al CREE
- Incentivos fiscales para inversión en I+D
- Simplificación del régimen tributario para PYMES

Los analistas económicos consideran que estas medidas podrían generar un crecimiento del PIB del 1.5% adicional en los próximos dos años, además de crear aproximadamente 150,000 nuevos empleos formales.

Sin embargo, críticos señalan que será necesario evaluar el impacto fiscal y compensar la reducción de ingresos mediante eficiencia en el gasto público.`,
        author: 'Carlos Mendoza',
        source: 'Economía y Empresa',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        category: 'economics',
        tags: ['reforma tributaria', 'empresas', 'economia'],
        readTime: 5
      },
      {
        id: '3',
        title: 'Perfil: Los candidatos conservadores que lideran las intenciones de voto',
        summary: 'Análisis detallado de trayectorias, propuestas y estrategias de los principales candidatos de derecha.',
        content: `Un análisis exhaustivo de los candidatos conservadores que actualmente lideran las encuestas electorales revela perfiles diversos pero con agenda común centrada en el crecimiento económico, la seguridad y los valores tradicionales.

**Ana María Gutiérrez** (Antioquia):
Ex alcaldesa de Medellín, lidera con propuestas de modernización urbana y atracción de inversión tecnológica. Su experiencia en gestión pública y relaciones con el sector privado la posicionan como favorita.

**Roberto Pinzón** (Valle del Cauca):
Empresario del sector azucarero, propone políticas de libre comercio y fortalecimiento del agro. Su red de contactos internacionales es vista como una ventaja para atraer inversión extranjera.

**Luis Fernando Torres** (Santander):
Ex ministro de Hacienda, conocido por su experiencia en política fiscal. Sus propuestas de disciplina fiscal y reducción del gasto público han resonado entre votantes conservadores.

Estos candidatos comparten elementos clave:
- Experiencia en gestión pública o privada
- Propuestas claras de crecimiento económico
- Enfoque en seguridad ciudadana
- Apoyo del sector empresarial
- Valores tradicionales familiares

Los analistas políticos consideran que esta diversidad de perfiles fortalece las opciones conservadoras y amplía su base electoral más allá de sus seguidores tradicionales.`,
        author: 'Patricia Vargas',
        source: 'Perfiles Políticos',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        category: 'candidates',
        tags: ['candidatos', 'perfiles', 'conservadores'],
        readTime: 6
      },
      {
        id: '4',
        title: 'Estrategia conservadora: Políticas de seguridad ciudadana como eje central',
        summary: 'Candidatos de derecha presentan plan integral de seguridad que incluye tecnología, policía comunitaria y justicia eficaz.',
        content: `Los candidatos conservadores han puesto la seguridad ciudadana en el centro de su agenda política, presentando un plan integral que combina tecnología, fortalecimiento institucional y participación comunitaria.

El plan incluye cinco pilares fundamentales:

**1. Modernización Policial**
Inversión en tecnología de punta, sistemas de videovigilancia inteligente y equipamiento moderno para las fuerzas de seguridad.

**2. Policía Comunitaria**
Fortalecimiento de programas de policía de barrio y mayor interacción entre uniformados y comunidades locales.

**3. Justicia Eficaz**
Mejora en los tiempos de respuesta judicial y reducción de la impunidad mediante digitalización de procesos.

**4. Prevención Social**
Programas de prevención del delito dirigidos a jóvenes en situación de vulnerabilidad, incluyendo educación y oportunidades laborales.

**5. Cooperación Internacional**
Fortalecimiento de la lucha contra el narcotráfico mediante cooperación con Estados Unidos y Europa.

Las propuestas han recibido apoyo de organizaciones de víctimas y comerciantes, quienes ven en estas medidas una respuesta integral al problema de la inseguridad urbana.

Los recursos para financiar este plan provendrían de una reasignación del presupuesto nacional, priorizando la seguridad sobre otros gastos considerados menos prioritarios.`,
        author: 'General (r) Alejandro Ruiz',
        source: 'Seguridad y Defensa',
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        category: 'policies',
        tags: ['seguridad', 'políticas públicas', 'prevención'],
        readTime: 7
      }
    ];
    setArticles(mockArticles);
  }, []);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (60 * 60 * 1000));
    
    if (hours < 1) return 'Hace menos de 1 hora';
    if (hours < 24) return `Hace ${hours} horas`;
    const days = Math.floor(hours / 24);
    return `Hace ${days} días`;
  };

  if (selectedArticle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <span>←</span>
            <span>Volver a noticias</span>
          </button>

          {/* Article Content */}
          <article className="bg-white rounded-lg shadow-lg p-8">
            {selectedArticle.isBreaking && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-6">
                <span className="text-red-800 font-bold">🚨 NOTICIA DE ÚLTIMA HORA</span>
              </div>
            )}
            
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>Por {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.source}</span>
                <span>•</span>
                <span>{getTimestamp(selectedArticle.publishedAt)}</span>
                <span>•</span>
                <span>{selectedArticle.readTime} min de lectura</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedArticle.tags.map((tag, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <p className="text-lg text-gray-700 italic">{selectedArticle.summary}</p>
            </header>
            
            <div className="prose max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <span>👍</span>
                    <span>Me gusta</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <span>📤</span>
                    <span>Compartir</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <span>💬</span>
                    <span>Comentar</span>
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Categoría: {categories.find(c => c.id === selectedArticle.category)?.name}
                </span>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-8 rounded-lg mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">🟠 Noticias Conservadoras</h1>
          <p className="text-white/95 text-lg mb-4">
            Análisis, elecciones y perspectivas conservadoras en Colombia
          </p>
          <div className="flex items-center space-x-6 text-white/90">
            <span>📰 {articles.length} artículos</span>
            <span>🔥 {articles.filter(a => a.isBreaking).length} de última hora</span>
            <span>👀 +25K lectores diarios</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Breaking News */}
        {articles.filter(a => a.isBreaking).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">🚨 Noticias de Última Hora</h3>
            <div className="space-y-2">
              {articles.filter(a => a.isBreaking).map((article) => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="block w-full text-left text-red-700 hover:text-red-900 transition-colors"
                >
                  {article.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {categories.find(c => c.id === article.category)?.name}
                  </span>
                  {article.isBreaking && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                      URGENTE
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.source}</span>
                  <span>{article.readTime} min</span>
                </div>
                
                <div className="mt-3 text-xs text-gray-400">
                  {getTimestamp(article.publishedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📧 Suscríbete a nuestro boletín conservador
            </h3>
            <p className="text-gray-700 mb-6">
              Recibe las últimas noticias, análisis políticos y cobertura electoral directamente en tu email
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightWingNews;