/**
 * Comprehensive mock data generator for Pulse Reels and News
 * Provides abundant content for all categories with realistic variety
 */

export interface ReelData {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  author: string;
  publishedDate: Date;
  tags: string[];
  videoUrl?: string;
  isLive?: boolean;
}

export interface NewsData {
  id: number;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  source: string;
  time: string;
  image: string;
  engagement: { likes: number; shares: number; comments: number };
  readTime: string;
  political_lean: string;
  publishedDate: Date;
  tags: string[];
  url?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  domain: string;
  publishedDate: Date;
  type: 'news' | 'video' | 'article' | 'social';
  country: string;
  language: string;
  relevanceScore: number;
}

// Realistic content templates for different categories
const contentTemplates = {
  terror: {
    titles: [
      'Alerta de seguridad: Nuevas amenazas en zona fronteriza',
      'Operativo antiterrorista desarticula red criminal',
      'Refuerzan seguridad tras amenazas a infraestructura crítica',
      'Inteligencia militar detecta movimientos sospechosos',
      'Evacuación preventiva en zona de alto riesgo',
      'Cooperación internacional contra grupos armados',
      'Tecnología satelital para monitoreo de fronteras',
      'Capacitación especializada para fuerzas de seguridad',
      'Análisis de amenazas cibernéticas a entidades estatales',
      'Protocolo de emergencia activado en región crítica'
    ],
    authors: ['Reuters Security', 'AP Security', 'EFE Defense', 'BBC Security', 'CNN Safety'],
    sources: ['Ministerio de Defensa', 'Fuerzas Militares', 'Policía Nacional', 'Intelligence Colombia']
  },
  trump: {
    titles: [
      'Trump propone nuevos aranceles que afectarían Colombia',
      'Impacto de políticas Trump en comercio bilateral',
      'Análisis: Relaciones Colombia-EE.UU. bajo nueva administración',
      'Sector exportador evalúa efectos de medidas Trump',
      'Diplomacia colombiana responde a declaraciones Trump',
      'Comunidad latina en EE.UU. ante políticas Trump',
      'Efecto Trump en inversiones estadounidenses en Colombia',
      'Migración colombiana y políticas de Trump',
      'Cooperación antinarcóticos en era Trump',
      'TLC Colombia-EE.UU. en contexto de políticas Trump'
    ],
    authors: ['Washington Post', 'Wall Street Journal', 'Miami Herald', 'CNN Español', 'Univisión'],
    sources: ['Casa Blanca', 'Embajada Colombia', 'Cancillería', 'Departamento de Estado']
  },
  tecnologia: {
    titles: [
      'Colombia lanza plan nacional de 5G para 2025',
      'Inteligencia artificial revoluciona sector público',
      'Startups colombianas captan $500M en inversión',
      'Transformación digital llega a zonas rurales',
      'Blockchain para transparencia en elecciones',
      'Ciberseguridad nacional: nuevas amenazas digitales',
      'Educación STEM: preparando futuro tecnológico',
      'Fintech colombianas lideran innovación regional',
      'Internet satelital conecta comunidades remotas',
      'IA para optimización de servicios gubernamentales'
    ],
    authors: ['TechCrunch Latino', 'Revista Dinero Tech', 'El Tiempo Digital', 'Portafolio Tech'],
    sources: ['MinTIC', 'Vicerrectoría Digital', 'iNNpulsa Colombia', 'Ruta N']
  },
  congreso: {
    titles: [
      'Congreso debate proyecto de reforma pensional',
      'Senado aprueba ley de transparencia gubernamental',
      'Cámara evalúa presupuesto nacional para 2025',
      'Comisión de paz revisa implementación de acuerdos',
      'Congresistas proponen reforma al sistema electoral',
      'Debate sobre descentralización fiscal en regiones',
      'Proyecto de ley digital avanza en primer debate',
      'Sesión extraordinaria sobre crisis energética',
      'Congreso analiza tratados de libre comercio',
      'Reforma a la justicia: debates en plenaria'
    ],
    authors: ['Canal Congreso', 'Congreso Visible', 'Radio Nacional', 'Caracol Radio'],
    sources: ['Senado República', 'Cámara Representantes', 'Secretaría General', 'Mesa Directiva']
  },
  ambiente: {
    titles: [
      'Amazonía colombiana: nuevas áreas protegidas',
      'Plan nacional contra cambio climático 2024-2030',
      'Energías renovables alcanzan 30% de matriz energética',
      'Reforestación masiva en cuencas hidrográficas',
      'Ley de residuos plásticos aprobada en Congreso',
      'Transición energética: Colombia líder regional',
      'Conservación marina en Pacífico colombiano',
      'Agricultura sostenible: incentivos para campesinos',
      'Calidad del aire mejora en principales ciudades',
      'Corredores biológicos conectan ecosistemas'
    ],
    authors: ['WWF Colombia', 'Greenpeace', 'SINCHI', 'IDEAM', 'Fundación ProAves'],
    sources: ['MinAmbiente', 'ANLA', 'Parques Nacionales', 'SINA']
  }
};

/**
 * Generates realistic mock reels data for a specific category
 */
export function generateMockReels(category: string, count: number = 50): ReelData[] {
  const reels: ReelData[] = [];
  const categoryData = contentTemplates[category as keyof typeof contentTemplates];
  
  for (let i = 0; i < count; i++) {
    const randomTemplate = categoryData || contentTemplates.tecnologia;
    const titleIndex = Math.floor(Math.random() * randomTemplate.titles.length);
    const authorIndex = Math.floor(Math.random() * randomTemplate.authors.length);
    
    reels.push({
      id: Date.now() + i,
      title: randomTemplate.titles[titleIndex] + ` - Parte ${i + 1}`,
      description: `Análisis detallado sobre ${randomTemplate.titles[titleIndex].toLowerCase()}. Contenido actualizado con datos oficiales y perspectivas expertas.`,
      category,
      duration: `${Math.floor(Math.random() * 8) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      views: Math.floor(Math.random() * 100000) + 1000,
      likes: Math.floor(Math.random() * 5000) + 100,
      thumbnail: getCategoryEmoji(category),
      author: randomTemplate.authors[authorIndex],
      publishedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Last 30 days
      tags: generateTags(category),
      isLive: Math.random() < 0.05 // 5% chance of being live
    });
  }
  
  return reels;
}

/**
 * Generates realistic mock news data for a specific category
 */
export function generateMockNews(category: string, count: number = 30): NewsData[] {
  const news: NewsData[] = [];
  const categoryData = contentTemplates[category as keyof typeof contentTemplates];
  
  for (let i = 0; i < count; i++) {
    const randomTemplate = categoryData || contentTemplates.tecnologia;
    const titleIndex = Math.floor(Math.random() * randomTemplate.titles.length);
    const sourceIndex = Math.floor(Math.random() * randomTemplate.sources.length);
    
    const publishedDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
    const timeAgo = getTimeAgo(publishedDate);
    
    news.push({
      id: Date.now() + i,
      title: randomTemplate.titles[titleIndex],
      summary: `Análisis exhaustivo sobre ${randomTemplate.titles[titleIndex].toLowerCase()}. Incluye declaraciones oficiales, datos estadísticos y perspectivas de expertos en la materia.`,
      fullContent: generateFullContent(randomTemplate.titles[titleIndex], category),
      category,
      source: randomTemplate.sources[sourceIndex],
      time: timeAgo,
      image: getCategoryEmoji(category),
      engagement: {
        likes: Math.floor(Math.random() * 1000) + 50,
        shares: Math.floor(Math.random() * 500) + 20,
        comments: Math.floor(Math.random() * 200) + 10
      },
      readTime: `${Math.floor(Math.random() * 10) + 3} min`,
      political_lean: getPoliticalLean(category),
      publishedDate,
      tags: generateTags(category)
    });
  }
  
  return news;
}

/**
 * Generates realistic search results for any query
 */
export function generateSearchResults(query: string, page: number = 1, limit: number = 10): SearchResult[] {
  const results: SearchResult[] = [];
  const baseId = Date.now();
  
  // Generate diverse result types
  const resultTypes = ['news', 'video', 'article', 'social'] as const;
  const countries = ['CO', 'US', 'UK', 'ES', 'AR', 'MX', 'CL', 'PE'];
  const domains = ['example.com', 'news.co', 'globalnews.com', 'reuters.com', 'bbc.com', 'cnn.com'];
  
  for (let i = 0; i < limit; i++) {
    const resultType = resultTypes[Math.floor(Math.random() * resultTypes.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    results.push({
      id: `${baseId}-${page}-${i}`,
      title: `${query} - ${getResultTitle(resultType, query)}`,
      snippet: generateSnippet(query, resultType),
      url: `https://${domain}/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
      domain,
      publishedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      type: resultType,
      country,
      language: country === 'US' || country === 'UK' ? 'en' : 'es',
      relevanceScore: Math.random() * 100
    });
  }
  
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Helper functions
function getCategoryEmoji(category: string): string {
  const emojiMap: { [key: string]: string } = {
    terror: '🚨',
    trump: '🇺🇸',
    tecnologia: '💻',
    congreso: '🏛️',
    ambiente: '🌱',
    politica: '🗳️',
    educacion: '📚',
    salud: '🏥',
    economia: '💰',
    social: '👥',
    participacion: '🤝',
    todas: '📰',
    todos: '🎬'
  };
  return emojiMap[category] || '📄';
}

function generateTags(category: string): string[] {
  const tagMap: { [key: string]: string[] } = {
    terror: ['seguridad', 'fronteras', 'inteligencia', 'defensa', 'militar'],
    trump: ['eeuu', 'comercio', 'diplomacia', 'aranceles', 'bilateral'],
    tecnologia: ['digital', 'innovacion', '5g', 'ia', 'startup'],
    congreso: ['legislativo', 'proyecto', 'debate', 'reforma', 'ley'],
    ambiente: ['sostenible', 'clima', 'conservacion', 'energia', 'verde']
  };
  return tagMap[category] || ['general', 'colombia', 'actualidad'];
}

function getPoliticalLean(category: string): string {
  if (category === 'trump' || category === 'terror') return 'independiente';
  if (category === 'ambiente') return 'izquierda';
  if (category === 'congreso') return 'independiente';
  return 'independiente';
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) return `${diffMinutes} minutos`;
  if (diffHours < 24) return `${diffHours} horas`;
  return `${diffDays} días`;
}

function generateFullContent(title: string, category: string): string {
  const intro = `El tema de ${title.toLowerCase()} ha cobrado especial relevancia en el contexto colombiano actual. `;
  const body = `Esta situación requiere un análisis detallado de sus implicaciones para el país y la región. `;
  const details = `Los expertos coinciden en que es fundamental abordar este tema con una perspectiva integral que considere tanto los aspectos técnicos como los impactos sociales. `;
  const conclusion = `El gobierno nacional ha manifestado su compromiso de trabajar en soluciones efectivas que beneficien a todos los colombianos.`;
  
  return intro + body + details + conclusion;
}

function getResultTitle(type: string, query: string): string {
  const titleMap: { [key: string]: string } = {
    news: 'Últimas Noticias Globales',
    video: 'Videos y Documentales',
    article: 'Análisis Especializado',
    social: 'Discusión Social'
  };
  return titleMap[type] || 'Contenido Relevante';
}

function generateSnippet(query: string, type: string): string {
  const snippetTemplates = {
    news: `Cobertura completa sobre ${query}. Información actualizada desde múltiples fuentes confiables a nivel global.`,
    video: `Videos explicativos y documentales sobre ${query}. Contenido visual de alta calidad para mejor comprensión.`,
    article: `Análisis profundo de ${query} por expertos reconocidos. Perspectivas académicas y profesionales.`,
    social: `Discusión y opiniones de la comunidad sobre ${query}. Múltiples puntos de vista y debates constructivos.`
  };
  return snippetTemplates[type as keyof typeof snippetTemplates] || `Información relevante sobre ${query}.`;
}

/**
 * Fallback data generator - ensures there's always content available
 */
export function getFallbackData(type: 'reels' | 'news' | 'search', category?: string): any[] {
  if (type === 'reels') {
    return generateMockReels(category || 'todos', 20);
  }
  if (type === 'news') {
    return generateMockNews(category || 'todas', 15);
  }
  return generateSearchResults('contenido relevante', 1, 10);
}